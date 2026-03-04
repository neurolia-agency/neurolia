#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
RESOLVER="$ROOT_DIR/scripts/ai/resolve-design-context.sh"

project_arg=""
dry_run="0"

usage() {
  cat <<'USAGE'
Usage: scripts/ai/run-gemini-design.sh [--project <path>] [--dry-run] [message...]

Examples:
  scripts/ai/run-gemini-design.sh "Revois la Hero section"
  scripts/ai/run-gemini-design.sh --project neurolia-site "Audit design homepage"
  scripts/ai/run-gemini-design.sh --dry-run --project neurolia-site
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
    --dry-run)
      dry_run="1"
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      break
      ;;
    -* )
      echo "Unknown flag: $1" >&2
      usage >&2
      exit 1
      ;;
    *)
      break
      ;;
  esac
  shift
done

user_message="$*"
"$ROOT_DIR/scripts/ai/preflight.sh"

if ! command -v gemini >/dev/null 2>&1; then
  echo "Gemini CLI not found. Install or add it to PATH." >&2
  exit 1
fi

if [ ! -x "$RESOLVER" ]; then
  echo "Missing resolver script: $RESOLVER" >&2
  exit 1
fi

resolver_args=()
if [ -n "$project_arg" ]; then
  resolver_args+=(--project "$project_arg")
fi

resolved_project_root=""
resolved_context_file=""
resolved_mode=""
read_files=()
exclude_patterns=()

if [ "${#resolver_args[@]}" -gt 0 ]; then
  while IFS=$'\t' read -r kind value; do
    case "$kind" in
      PROJECT_ROOT) resolved_project_root="$value" ;;
      CONTEXT_FILE) resolved_context_file="$value" ;;
      MODE) resolved_mode="$value" ;;
      READ_FILE) read_files+=("$value") ;;
      EXCLUDE) exclude_patterns+=("$value") ;;
    esac
  done < <("$RESOLVER" "${resolver_args[@]}")
else
  while IFS=$'\t' read -r kind value; do
    case "$kind" in
      PROJECT_ROOT) resolved_project_root="$value" ;;
      CONTEXT_FILE) resolved_context_file="$value" ;;
      MODE) resolved_mode="$value" ;;
      READ_FILE) read_files+=("$value") ;;
      EXCLUDE) exclude_patterns+=("$value") ;;
    esac
  done < <("$RESOLVER")
fi

if [ -z "$resolved_project_root" ]; then
  echo "Failed to resolve project root." >&2
  exit 1
fi

if [ "${#read_files[@]}" -eq 0 ]; then
  echo "No context files resolved. Aborting to avoid low-context design session." >&2
  exit 1
fi

if [ "$resolved_mode" = "fallback" ]; then
  echo "[gemini-design] WARNING: AI_CONTEXT_DESIGN.md not found for detected project. Using fallback context." >&2
fi

build_list() {
  local output=""
  local item=""

  for item in "$@"; do
    output+="- \`$item\`"$'\n'
  done

  printf '%s' "$output"
}

context_list="$(build_list "${read_files[@]}")"
exclude_list="$(build_list "${exclude_patterns[@]}")"

session_prompt=$(cat <<EOF_PROMPT
You are starting a design-focused session for this repository.

Operating constraints:
- Read the context files listed below before proposing changes.
- Prioritize design analysis, critique, and optioning first.
- Ask for confirmation before file edits.
- Never modify pipeline artifacts under \`pipeline/output/**\`.
- Ignore noisy/generated directories and files.

Resolved project root:
- \`$resolved_project_root\`

Resolution mode:
- \`$resolved_mode\`

Primary context file:
- \`${resolved_context_file:-<none>}\`

Read these files/paths first:
$context_list
Do not use these paths unless explicitly requested:
$exclude_list
Response format for your first answer:
1. Short diagnosis of current Hero/design state.
2. 2-3 concrete design options with tradeoffs.
3. Recommended option and exact files to edit.
EOF_PROMPT
)

if [ -n "$user_message" ]; then
  session_prompt+=$'\n\nUser request:\n'
  session_prompt+="$user_message"
fi

if [ "$dry_run" = "1" ]; then
  echo "[gemini-design] project_root: $resolved_project_root"
  echo "[gemini-design] mode: $resolved_mode"
  echo "[gemini-design] context_file: ${resolved_context_file:-<none>}"
  echo "[gemini-design] read_files_count: ${#read_files[@]}"
  printf '%s\n' "$context_list"
  echo "[gemini-design] exclude_count: ${#exclude_patterns[@]}"
  printf '%s\n' "$exclude_list"
  if [ -n "$user_message" ]; then
    echo "[gemini-design] user_message: $user_message"
  fi
  exit 0
fi

cd "$resolved_project_root"

export AI_TOOL="gemini"
export AI_TOOL_CONFIG="$ROOT_DIR/.ai/gemini/GEMINI.md"
export AI_SESSION_MODE="design"

exec gemini --approval-mode default -i "$session_prompt"
