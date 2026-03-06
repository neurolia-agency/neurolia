# n8n workflow test kit (WF00-04, WF07-09)

Scope:
- Included: `WF00`, `WF01`, `WF02`, `WF03`, `WF04`, `WF07`, `WF08`, `WF09`
- Excluded: `WF05`, `WF06`

## 1) Prerequisites

1. Import active workflows from `n8n/pipeline/output/04-workflows/`.
2. Configure n8n credentials (Supabase, SMTP, IMAP, Header Auth).
3. Set local env in `neurolia-immo/.env.local`:
   - `N8N_WEBHOOK_API_KEY`
   - `N8N_WEBHOOK_URL`
   - `NEXT_PUBLIC_APP_URL`
4. Start Next.js app locally (`npm run dev`).
5. Validate env values:

```bash
bash n8n/tests/validate-env.sh
```

## 2) Validate app webhook auth

```bash
bash n8n/tests/check-local-app-webhooks.sh http://localhost:3001
```

Expected per endpoint:
- no key => `401`
- with key => `200`

## 3) Run webhook-triggered workflow suite

Use `--mode test` if you run n8n "Listen for test event".
Use `--mode prod` for active production-style webhooks.

```bash
bash n8n/tests/run-webhook-suite.sh --mode test
```

Run one case only:

```bash
bash n8n/tests/run-webhook-suite.sh --mode test --include wf04-cleaning-task
```

Dry run:

```bash
bash n8n/tests/run-webhook-suite.sh --mode test --dry-run
```

Troubleshooting:
- `404 webhook ... not registered` in test mode: click `Execute workflow` in n8n for that workflow, then rerun.
- `401/403`: `N8N_WEBHOOK_API_KEY` mismatch between n8n variables and `.env.local`.

## 4) Manual steps for non-webhook flows

1. `WF03 Daily Notifications`
   - Run manually in n8n UI.
   - Validate staff + owner email branches.
2. `WF09 Health Monitor`
   - Run manually in n8n UI.
   - Validate warning/error aggregation email when issues exist.
3. `WF00 Error Handler`
   - Force one workflow failure (invalid credential or bad endpoint).
   - Validate alert email format and routing.

## 5) Data verification queries

Use `n8n/tests/sql/checks.sql` after test runs.
