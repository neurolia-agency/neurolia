#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
INIT_CONTEXT="$ROOT_DIR/scripts/ai/init-design-context.sh"

target_dir=""
force_wrapper="0"
force_context="0"

usage() {
  cat <<'USAGE'
Usage: scripts/ai/bootstrap-design-project.sh [--project <path>] [--force-wrapper] [--force-context]

Initializes design automation for a project:
- creates <project>/gemini-design (local launcher)
- creates <project>/AI_CONTEXT_DESIGN.md if missing

Options:
  --project <path>   Target project directory (default: current directory)
  --force-wrapper    Overwrite local gemini-design script if it exists
  --force-context    Overwrite AI_CONTEXT_DESIGN.md if it exists
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
      target_dir="$1"
      ;;
    --force-wrapper)
      force_wrapper="1"
      ;;
    --force-context)
      force_context="1"
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

if [ -z "$target_dir" ]; then
  target_dir="$PWD"
fi

if [ ! -d "$target_dir" ]; then
  echo "Project directory does not exist: $target_dir" >&2
  exit 1
fi

project_root="$(cd "$target_dir" && pwd)"
wrapper_file="$project_root/gemini-design"
context_file="$project_root/AI_CONTEXT_DESIGN.md"

if [ ! -x "$INIT_CONTEXT" ]; then
  echo "Missing initializer script: $INIT_CONTEXT" >&2
  exit 1
fi

wrapper_status="kept"
context_status="kept"

if [ ! -f "$wrapper_file" ] || [ "$force_wrapper" = "1" ]; then
  cat > "$wrapper_file" <<'WRAPPER'
#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SEARCH_DIR="$PROJECT_DIR"
REPO_ROOT=""

while true; do
  if [ -x "$SEARCH_DIR/scripts/ai/run-gemini-design.sh" ]; then
    REPO_ROOT="$SEARCH_DIR"
    break
  fi

  if [ "$SEARCH_DIR" = "/" ]; then
    echo "Unable to locate repository root containing scripts/ai/run-gemini-design.sh" >&2
    exit 1
  fi

  SEARCH_DIR="$(dirname "$SEARCH_DIR")"
done

exec "$REPO_ROOT/scripts/ai/run-gemini-design.sh" --project "$PROJECT_DIR" "$@"
WRAPPER
  chmod +x "$wrapper_file"
  wrapper_status="created"
fi

if [ ! -f "$context_file" ]; then
  "$INIT_CONTEXT" --project "$project_root"
  context_status="created"
elif [ "$force_context" = "1" ]; then
  "$INIT_CONTEXT" --project "$project_root" --force
  context_status="overwritten"
fi

echo "[bootstrap] project: $project_root"
echo "[bootstrap] wrapper: $wrapper_status ($wrapper_file)"
echo "[bootstrap] context: $context_status ($context_file)"
echo "[bootstrap] ready: run ./gemini-design \"Ta consigne\""
