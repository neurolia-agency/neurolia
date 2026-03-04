#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "[run-gemini] Delegating to design wrapper: scripts/ai/run-gemini-design.sh"
exec "$ROOT_DIR/scripts/ai/run-gemini-design.sh" "$@"
