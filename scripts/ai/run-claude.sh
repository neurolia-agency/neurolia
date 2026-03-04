#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

"$ROOT_DIR/scripts/ai/preflight.sh"

if ! command -v claude >/dev/null 2>&1; then
  echo "Claude CLI not found. Install or add it to PATH." >&2
  exit 1
fi

export AI_TOOL="claude"
export AI_TOOL_CONFIG=".ai/claude/AGENTS.md"

claude "$@"
