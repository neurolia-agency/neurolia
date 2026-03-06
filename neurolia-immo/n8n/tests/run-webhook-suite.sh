#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PAYLOAD_DIR="$SCRIPT_DIR/payloads"

MODE="test"
DRY_RUN=0
N8N_BASE_URL="${N8N_WEBHOOK_URL:-}"
API_KEY="${N8N_WEBHOOK_API_KEY:-}"
INCLUDE=()

usage() {
  cat <<'EOF'
Usage:
  run-webhook-suite.sh [options]

Options:
  --mode test|prod        Webhook mode (default: test)
  --n8n-url URL           Base webhook URL (ex: https://n8n.example.com/webhook)
  --api-key KEY           x-api-key header value
  --include CASE_ID       Run only one case (repeatable)
  --dry-run               Print calls without executing curl
  --help                  Show this help

Case IDs:
  wf01-imap-configured
  wf02-property-created
  wf04-cleaning-task
  wf07-user-created-owner
  wf07-user-created-staff
  wf08-issue-created
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mode)
      MODE="${2:-}"
      shift 2
      ;;
    --n8n-url)
      N8N_BASE_URL="${2:-}"
      shift 2
      ;;
    --api-key)
      API_KEY="${2:-}"
      shift 2
      ;;
    --include)
      INCLUDE+=("${2:-}")
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ "$MODE" != "test" && "$MODE" != "prod" ]]; then
  echo "Invalid --mode value: $MODE (expected test|prod)" >&2
  exit 1
fi

if [[ -z "$N8N_BASE_URL" ]]; then
  echo "Missing n8n webhook base URL. Use --n8n-url or export N8N_WEBHOOK_URL." >&2
  exit 1
fi

if [[ -z "$API_KEY" ]]; then
  echo "Missing API key. Use --api-key or export N8N_WEBHOOK_API_KEY." >&2
  exit 1
fi

normalize_base_url() {
  local raw="$1"
  local mode="$2"

  raw="${raw%/}"

  if [[ "$raw" == */webhook ]]; then
    if [[ "$mode" == "test" ]]; then
      echo "${raw%/webhook}/webhook-test"
    else
      echo "$raw"
    fi
    return
  fi

  if [[ "$raw" == */webhook-test ]]; then
    if [[ "$mode" == "prod" ]]; then
      echo "${raw%/webhook-test}/webhook"
    else
      echo "$raw"
    fi
    return
  fi

  if [[ "$mode" == "test" ]]; then
    echo "$raw/webhook-test"
  else
    echo "$raw/webhook"
  fi
}

BASE_URL="$(normalize_base_url "$N8N_BASE_URL" "$MODE")"

has_include() {
  local id="$1"
  if [[ ${#INCLUDE[@]} -eq 0 ]]; then
    return 0
  fi
  for item in "${INCLUDE[@]}"; do
    [[ "$item" == "$id" ]] && return 0
  done
  return 1
}

run_case() {
  local id="$1"
  local path="$2"
  local payload_file="$3"

  if ! has_include "$id"; then
    return 0
  fi

  local endpoint="$BASE_URL/$path"
  local payload_path="$PAYLOAD_DIR/$payload_file"
  local response_file
  response_file="$(mktemp)"

  if [[ ! -f "$payload_path" ]]; then
    echo "[FAIL] $id - payload not found: $payload_path"
    return 1
  fi

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[DRY] $id"
    echo "      POST $endpoint"
    echo "      payload: $payload_path"
    return 0
  fi

  local code
  if ! code="$(curl -sS -o "$response_file" -w "%{http_code}" \
    -X POST "$endpoint" \
    -H "Content-Type: application/json" \
    -H "x-api-key: $API_KEY" \
    --data "@$payload_path")"; then
    echo "[FAIL] $id - curl execution failed"
    rm -f "$response_file"
    return 1
  fi

  if [[ "$code" =~ ^2[0-9][0-9]$ ]]; then
    echo "[PASS] $id - HTTP $code"
  else
    echo "[FAIL] $id - HTTP $code"
    local body
    body="$(cat "$response_file")"
    echo "       response: $body"
    if [[ "$MODE" == "test" && "$code" == "404" && "$body" == *"is not registered"* ]]; then
      echo "       hint: open the workflow in n8n and click 'Execute workflow', then re-run this case"
    fi
    if [[ "$code" == "401" || "$code" == "403" ]]; then
      echo "       hint: verify x-api-key value in n8n and in your local .env.local"
    fi
    rm -f "$response_file"
    return 1
  fi

  rm -f "$response_file"
  return 0
}

echo "Running n8n webhook suite"
echo "  mode: $MODE"
echo "  base: $BASE_URL"
echo "  selected: ${INCLUDE[*]:-all}"
if [[ "$MODE" == "test" ]]; then
  echo "  note: each webhook requires n8n 'Execute workflow' / 'Listen for test event' before call"
fi

pass=0
fail=0

for case_id in \
  wf01-imap-configured \
  wf02-property-created \
  wf04-cleaning-task \
  wf07-user-created-owner \
  wf07-user-created-staff \
  wf08-issue-created
do
  if ! has_include "$case_id"; then
    continue
  fi
  case "$case_id" in
    wf01-imap-configured)
      if run_case "$case_id" "imap-configured" "wf01-imap-configured.json"; then ((pass+=1)); else ((fail+=1)); fi
      ;;
    wf02-property-created)
      if run_case "$case_id" "property-created" "wf02-property-created.json"; then ((pass+=1)); else ((fail+=1)); fi
      ;;
    wf04-cleaning-task)
      if run_case "$case_id" "wf04-cleaning-task" "wf04-cleaning-task.json"; then ((pass+=1)); else ((fail+=1)); fi
      ;;
    wf07-user-created-owner)
      if run_case "$case_id" "user-created" "wf07-user-created-owner.json"; then ((pass+=1)); else ((fail+=1)); fi
      ;;
    wf07-user-created-staff)
      if run_case "$case_id" "user-created" "wf07-user-created-staff.json"; then ((pass+=1)); else ((fail+=1)); fi
      ;;
    wf08-issue-created)
      if run_case "$case_id" "issue-created" "wf08-issue-created.json"; then ((pass+=1)); else ((fail+=1)); fi
      ;;
  esac
done

echo "Summary: pass=$pass fail=$fail"

if [[ "$fail" -gt 0 ]]; then
  exit 1
fi
