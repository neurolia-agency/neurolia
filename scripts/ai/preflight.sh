#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

required_cmds=(git)
for cmd in "${required_cmds[@]}"; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "[preflight] missing required command: $cmd" >&2
    exit 1
  fi
done

echo "[preflight] repo: $ROOT_DIR"
git rev-parse --is-inside-work-tree >/dev/null

if [ ! -f ".ai/shared/standards.md" ]; then
  echo "[preflight] missing .ai/shared/standards.md" >&2
  exit 1
fi

if [ ! -f ".ai/shared/architecture.md" ]; then
  echo "[preflight] missing .ai/shared/architecture.md" >&2
  exit 1
fi

if [ -f ".env" ]; then
  echo "[preflight] .env found"
else
  echo "[preflight] .env not found (optional)"
fi

current_branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
if [ -n "$current_branch" ]; then
  echo "[preflight] branch: $current_branch"
fi

echo "[preflight] ok"
