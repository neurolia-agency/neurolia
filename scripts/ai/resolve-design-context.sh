#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

project_arg=""

usage() {
  cat <<'USAGE'
Usage: scripts/ai/resolve-design-context.sh [--project <path>]

Outputs TSV lines:
  PROJECT_ROOT\t<absolute_path>
  CONTEXT_FILE\t<absolute_path_or_empty>
  MODE\t<ai_context|fallback>
  READ_FILE\t<absolute_path_or_pattern>
  EXCLUDE\t<absolute_path_or_pattern>
USAGE
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --project)
      shift
      if [ "$#" -eq 0 ]; then
        echo "Missing value for --project" >&2
        exit 1
      fi
      project_arg="$1"
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
  shift
done

abs_path() {
  local target="$1"
  if [ -d "$target" ]; then
    (cd "$target" && pwd)
  else
    local dir
    dir="$(cd "$(dirname "$target")" && pwd)"
    printf '%s/%s\n' "$dir" "$(basename "$target")"
  fi
}

find_nearest_parent_with_file() {
  local start="$1"
  local filename="$2"
  local dir="$start"

  while true; do
    if [ -f "$dir/$filename" ]; then
      printf '%s\n' "$dir"
      return 0
    fi

    if [ "$dir" = "/" ] || [ "$dir" = "$ROOT_DIR" ]; then
      break
    fi

    dir="$(dirname "$dir")"
  done

  if [ -f "$ROOT_DIR/$filename" ]; then
    printf '%s\n' "$ROOT_DIR"
    return 0
  fi

  return 1
}

find_nearest_project_candidate() {
  local start="$1"
  local dir="$start"

  while true; do
    if [ -f "$dir/CLAUDE.md" ] && { [ -d "$dir/app" ] || [ -d "$dir/components" ]; }; then
      printf '%s\n' "$dir"
      return 0
    fi

    if [ "$dir" = "/" ] || [ "$dir" = "$ROOT_DIR" ]; then
      break
    fi

    dir="$(dirname "$dir")"
  done

  if [ -f "$ROOT_DIR/CLAUDE.md" ]; then
    printf '%s\n' "$ROOT_DIR"
    return 0
  fi

  return 1
}

extract_backtick_paths_for_mode() {
  local context_file="$1"
  local target_mode="$2"

  awk -v target_mode="$target_mode" '
    BEGIN { mode = "" }

    /^## / {
      if ($0 ~ /^## Lecture .*autoris/) {
        mode = "allow"
        next
      }
      if ($0 ~ /^## Lecture .*([eE]viter|[éÉ]viter)/) {
        mode = "deny"
        next
      }
      mode = ""
    }

    mode == target_mode {
      while (match($0, /`[^`]+`/)) {
        item = substr($0, RSTART + 1, RLENGTH - 2)
        print item
        $0 = substr($0, RSTART + RLENGTH)
      }
    }
  ' "$context_file"
}

normalize_project_pattern() {
  local project_root="$1"
  local raw_pattern="$2"
  local project_name
  project_name="$(basename "$project_root")"

  case "$raw_pattern" in
    "$project_name"/*) printf '%s\n' "${raw_pattern#"$project_name"/}" ;;
    ./*) printf '%s\n' "${raw_pattern#./}" ;;
    *) printf '%s\n' "$raw_pattern" ;;
  esac
}

expand_patterns_to_paths() {
  local project_root="$1"
  shift

  local raw_pattern=""
  local normalized_pattern=""
  local abs_pattern=""

  for raw_pattern in "$@"; do
    [ -n "$raw_pattern" ] || continue
    normalized_pattern="$(normalize_project_pattern "$project_root" "$raw_pattern")"

    case "$normalized_pattern" in
      /*) abs_pattern="$normalized_pattern" ;;
      *) abs_pattern="$project_root/$normalized_pattern" ;;
    esac

    printf '%s\n' "$abs_pattern"
  done
}

dedupe_lines() {
  awk '!seen[$0]++'
}

start_dir=""
if [ -n "$project_arg" ]; then
  start_dir="$(abs_path "$project_arg")"
else
  start_dir="$PWD"
fi

if [ ! -d "$start_dir" ]; then
  echo "Project directory does not exist: $start_dir" >&2
  exit 1
fi

project_root=""
if project_root="$(find_nearest_parent_with_file "$start_dir" "AI_CONTEXT_DESIGN.md" 2>/dev/null)"; then
  :
else
  if project_root="$(find_nearest_project_candidate "$start_dir" 2>/dev/null)"; then
    :
  else
    project_root="$ROOT_DIR"
  fi
fi

context_file=""
mode="fallback"
if [ -f "$project_root/AI_CONTEXT_DESIGN.md" ]; then
  context_file="$project_root/AI_CONTEXT_DESIGN.md"
  mode="ai_context"
fi

printf 'PROJECT_ROOT\t%s\n' "$project_root"
printf 'CONTEXT_FILE\t%s\n' "$context_file"
printf 'MODE\t%s\n' "$mode"

if [ "$mode" = "ai_context" ]; then
  allow_patterns=()
  deny_patterns=()

  while IFS= read -r allow_line; do
    [ -n "$allow_line" ] || continue
    allow_patterns+=("$allow_line")
  done < <(extract_backtick_paths_for_mode "$context_file" "allow" | dedupe_lines)

  while IFS= read -r deny_line; do
    [ -n "$deny_line" ] || continue
    deny_patterns+=("$deny_line")
  done < <(extract_backtick_paths_for_mode "$context_file" "deny" | dedupe_lines)

  if [ "${#allow_patterns[@]}" -gt 0 ]; then
    while IFS= read -r path_line; do
      [ -n "$path_line" ] || continue
      printf 'READ_FILE\t%s\n' "$path_line"
    done < <(expand_patterns_to_paths "$project_root" "${allow_patterns[@]}" | dedupe_lines)
  fi

  if [ "${#deny_patterns[@]}" -gt 0 ]; then
    local_denied=""
    for local_denied in "${deny_patterns[@]}"; do
      [ -n "$local_denied" ] || continue
      case "$local_denied" in
        /*) printf 'EXCLUDE\t%s\n' "$local_denied" ;;
        *) printf 'EXCLUDE\t%s\n' "$project_root/$local_denied" ;;
      esac
    done | dedupe_lines
  fi
else
  fallback_candidates=(
    "$project_root/CLAUDE.md"
    "$project_root/README.md"
    "$project_root/app/globals.css"
    "$project_root/app/page.tsx"
    "$project_root/components/sections"
  )

  candidate=""
  for candidate in "${fallback_candidates[@]}"; do
    if [ -e "$candidate" ]; then
      printf 'READ_FILE\t%s\n' "$candidate"
    fi
  done

  printf 'EXCLUDE\t%s\n' "$project_root/node_modules"
  printf 'EXCLUDE\t%s\n' "$project_root/.next"
fi
