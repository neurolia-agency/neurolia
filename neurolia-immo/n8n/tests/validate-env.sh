#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

if [[ -f "$REPO_ROOT/.env.local" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$REPO_ROOT/.env.local"
  set +a
fi

ok=0
warn=0

check_present() {
  local name="$1"
  local value="${!name:-}"
  if [[ -z "$value" ]]; then
    echo "[ERROR] $name is missing"
    ((ok+=0))
    ((warn+=1))
  else
    echo "[OK] $name is set"
    ((ok+=1))
  fi
}

check_present "N8N_WEBHOOK_URL"
check_present "N8N_WEBHOOK_API_KEY"
check_present "NEXT_PUBLIC_APP_URL"

if [[ -n "${N8N_WEBHOOK_API_KEY:-}" ]]; then
  if [[ "$N8N_WEBHOOK_API_KEY" =~ ^[0-9a-fA-F]{64}$ ]]; then
    echo "[OK] N8N_WEBHOOK_API_KEY format looks like a 64-char hex key"
  else
    echo "[WARN] N8N_WEBHOOK_API_KEY is not 64-char hex (current length: ${#N8N_WEBHOOK_API_KEY})"
    echo "       verify the same key is configured on both n8n and Next.js"
    ((warn+=1))
  fi
fi

if [[ "${warn:-0}" -gt 0 ]]; then
  exit 1
fi

exit 0
