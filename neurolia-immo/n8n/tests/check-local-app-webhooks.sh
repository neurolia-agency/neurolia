#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

usage() {
  cat <<'EOF'
Usage:
  check-local-app-webhooks.sh [APP_URL]

Examples:
  check-local-app-webhooks.sh
  check-local-app-webhooks.sh http://localhost:3001
EOF
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi

if [[ -f "$REPO_ROOT/.env.local" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$REPO_ROOT/.env.local"
  set +a
fi

APP_URL="${1:-${NEXT_PUBLIC_APP_URL:-http://localhost:3000}}"
API_KEY="${N8N_WEBHOOK_API_KEY:-}"

if [[ -z "$API_KEY" ]]; then
  echo "Missing N8N_WEBHOOK_API_KEY in environment or .env.local" >&2
  exit 1
fi

echo "Checking app webhook endpoints on: $APP_URL"

pass=0
fail=0

for ep in reservation task-created ical-alert; do
  code_without="$(curl -s -o /tmp/${ep}_without_key.json -w "%{http_code}" \
    -X POST "$APP_URL/api/webhooks/n8n/$ep" \
    -H "Content-Type: application/json" \
    -d '{}')"

  code_with="$(curl -s -o /tmp/${ep}_with_key.json -w "%{http_code}" \
    -X POST "$APP_URL/api/webhooks/n8n/$ep" \
    -H "Content-Type: application/json" \
    -H "x-api-key: $API_KEY" \
    -d '{}')"

  if [[ "$code_without" == "401" && "$code_with" == "200" ]]; then
    echo "[PASS] $ep (without=$code_without with=$code_with)"
    ((pass+=1))
  else
    echo "[FAIL] $ep (without=$code_without with=$code_with)"
    echo "  without body: $(cat /tmp/${ep}_without_key.json 2>/dev/null || true)"
    echo "  with body: $(cat /tmp/${ep}_with_key.json 2>/dev/null || true)"
    ((fail+=1))
  fi
done

echo "Summary: pass=$pass fail=$fail"

if [[ "$fail" -gt 0 ]]; then
  exit 1
fi
