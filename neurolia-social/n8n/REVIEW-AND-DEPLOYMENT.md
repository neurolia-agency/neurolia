# Review Results & Deployment Guide

## Review Summary

- **Total workflows**: 8
- **Total functional nodes**: 98 (+ 8 sticky notes = 106 total)
- **Issues found**: 7 critical, 6 warnings, 5 info

### Workflow Inventory

| # | File | Name | Nodes | Trigger |
|---|------|------|-------|---------|
| 1 | `error-social-handler.json` | Error - Social - Handler | 10 | Error Trigger |
| 2 | `sub-social-claude-api-call.json` | Sub - Social - Claude API Call | 8 | Execute Workflow Trigger |
| 3 | `sub-social-brand-memory-assembly.json` | Sub - Social - Brand Memory Assembly | 9 | Execute Workflow Trigger |
| 4 | `sub-social-platform-router.json` | Sub - Social - Platform Router | 13 | Execute Workflow Trigger |
| 5 | `sched-social-weekly-planning.json` | Sched - Social - Weekly Planning | 13 | Schedule (Mon 6:00 CET) |
| 6 | `sched-social-daily-generation.json` | Sched - Social - Daily Generation | 16 | Schedule (Daily 7:00 CET) |
| 7 | `sched-social-hourly-publication.json` | Sched - Social - Hourly Publication | 11 | Schedule (Every hour) |
| 8 | `sched-social-nightly-analytics.json` | Sched - Social - Nightly Analytics | 18 | Schedule (Daily 2:00 CET) |

---

## Issues Found

### Critical Issues (Fixed)

**C1. Error handler: Postgres query uses positional parameters `$1`, `$2`**
- File: `error-social-handler.json`, node: "Log Error To Database"
- The `executeQuery` mode in Postgres v2.5 does not support `$1/$2` positional parameters. These require parameterized mode or expression substitution.
- **Fix applied**: Changed to use n8n expression syntax `={{ $json.error_type }}` with `=` prefix for dynamic query.

**C2. Schedule Trigger format inconsistency**
- File: `sched-social-weekly-planning.json`, node: "Weekly Planning Trigger"
- Used `{ "cronExpression": "0 6 * * 1" }` while all other schedule triggers use `{ "field": "cronExpression", "expression": "..." }` format (the correct format for `scheduleTrigger` v1.2).
- **Fix applied**: Changed to `{ "field": "cronExpression", "expression": "0 6 * * 1" }`.

**C3. Weekly Planning: SplitInBatches missing second output (done)**
- File: `sched-social-weekly-planning.json`, node: "Loop Over Restaurants"
- SplitInBatches v3 has 2 outputs: `[0]` = current batch, `[1]` = done. The connections only defined output `[0]`, meaning the "done" branch was undefined.
- **Fix applied**: Added empty `[]` for output `[1]` in connections.

**C4. Weekly Planning: Execute Workflow not passing `restaurant_id`**
- File: `sched-social-weekly-planning.json`, node: "Call Brand Memory Assembly"
- The restaurant query returns `id` (not `restaurant_id`), but Brand Memory Assembly expects `restaurant_id`. No `fieldsUi` was configured to map the field.
- **Fix applied**: Added `fieldsUi` mapping `restaurant_id` to `={{ $json.id }}`.

**C5. Nightly Analytics: Merge node with 3 inputs in "append" mode**
- File: `sched-social-nightly-analytics.json`, node: "Merge Metrics"
- Merge v3 in "append" mode only supports 2 inputs, but 3 platform API nodes connected to it (at indexes 0, 1, 2). Since the Switch routes to only one platform at a time, a Merge is unnecessary.
- **Fix applied**: Removed Merge node entirely. Connected all three API nodes directly to "Normalize Metrics".

**C6. Nightly Analytics: TikTok HTTP node uses `predefinedCredentialType` with hardcoded Bearer token**
- File: `sched-social-nightly-analytics.json`, node: "Fetch TikTok Analytics"
- Used `authentication: "predefinedCredentialType"` with `nodeCredentialType: "ayrshareApi"` but had no credentials block, plus a hardcoded `Bearer AYRSHARE_KEY` header.
- **Fix applied**: Changed to `genericCredentialType` + `httpHeaderAuth` with proper credentials block matching the Platform Router's Ayrshare configuration.

**C7. Nightly Analytics: Retry option double-nested**
- File: `sched-social-nightly-analytics.json`, nodes: "Fetch Instagram Insights", "Fetch Facebook Insights"
- Had `{ "retry": { "retry": { "maxRetries": 3 } } }` (double nesting), which is invalid.
- **Fix applied**: Flattened to `{ "retry": { "maxRetries": 3 } }`.

### Warnings (Not Fixed - Require Manual Attention)

**W1. Nightly Analytics: Data flow loss after HTTP API calls**
- Nodes: "Normalize Metrics" and downstream
- The HTTP response from platform APIs replaces `$json` with API response data, losing `publication_id`, `content_id`, and `restaurant_id` from "Get Publication Details".
- **Partial fix applied**: Changed Normalize Metrics to reference `$('Get Publication Details').first().json` for metadata. However, the `$()` reference in a SplitInBatches loop may reference the wrong item if batches overlap. **Test this carefully with real data.**

**W2. Hourly Publication: Data flow loss after Platform Router sub-workflow**
- Nodes: "Record Publication", "Update Post Status", "Log Publication"
- The Platform Router returns `{ success, platform, external_id, published_at }` but downstream nodes need `content_id` and `restaurant_id` which are lost after the sub-workflow call.
- **Recommended fix**: Either modify the Platform Router to pass through additional fields, or use `$('Prepare Post Data').first().json.content_id` in downstream queries.

**W3. Postgres credential names are inconsistent across workflows**
- 4 different postgres credential names used across 8 workflows:
  - `"Neurolia Social Postgres"` (error handler)
  - `"Supabase Postgres - Neurolia Social"` (brand memory assembly)
  - `"Postgres account"` (weekly planning, hourly publication)
  - `"Postgres - Neurolia Social"` (daily generation)
  - `"Supabase Postgres"` (nightly analytics)
- All should use the same credential. Unify to a single name during deployment.

**W4. SQL injection risk in Brand Memory Assembly**
- File: `sub-social-brand-memory-assembly.json`, nodes: "Fetch Restaurant Profile", "Fetch Brand DNA", "Fetch Brand Visual"
- Queries use string interpolation: `WHERE id = '{{ $json.restaurant_id }}'`. Although the input is UUID-validated, this pattern is fragile. Consider using parameterized queries in production.

**W5. Daily Generation: `callerPolicy` set to `workflowsFromSameOwner`**
- File: `sched-social-daily-generation.json`
- Scheduled workflows are not called by other workflows, so `callerPolicy` is unnecessary. Not harmful but misleading.

**W6. Platform Router: Merge node receives 3 inputs at same index (0)**
- File: `sub-social-platform-router.json`, node: "Merge Platform Responses"
- All three platform outputs connect to index 0 of the Merge. Since the Switch only routes to one branch at a time, this works but is semantically incorrect. The Merge receives only one input item per execution and functions as a simple pass-through. Consider removing the Merge and connecting each platform output directly to "Extract External ID".

### Info (Suggestions)

**I1. Error handler could log more context**
- The `generation_log` table insertion sets `restaurant_id` to NULL. Consider logging the workflow source or execution URL for easier debugging.

**I2. Nightly analytics node count is 18 (approaching 20 limit)**
- Per architecture patterns, workflows should stay under 20 nodes. Currently at 18 after Merge removal. Monitor if future changes push it over.

**I3. No tags defined on any workflow**
- All workflows have empty `"tags": []`. Consider adding domain (`social`), type (`scheduled`, `sub-workflow`, `error-handler`), and status (`staging`) tags for organization.

**I4. Platform Router: access_token passed in URL query params for Instagram/Facebook Insights**
- File: `sched-social-nightly-analytics.json`
- Access tokens in URL parameters can appear in server logs. Consider passing via headers or body instead when possible.

**I5. Code nodes use `runOnceForAllItems` but return single objects**
- Several Code nodes (e.g., "Parse Error Details", "Determine Severity") use `runOnceForAllItems` mode but return a plain object instead of an array. n8n wraps these automatically, but for clarity, prefer returning `[{ json: {...} }]`.

---

## Fixes Applied

| # | File | Fix |
|---|------|-----|
| C1 | `error-social-handler.json` | Replaced `$1/$2` params with n8n expression syntax in "Log Error To Database" query |
| C2 | `sched-social-weekly-planning.json` | Fixed schedule trigger interval format to `field/expression` structure |
| C3 | `sched-social-weekly-planning.json` | Added empty `[]` for SplitInBatches done output in connections |
| C4 | `sched-social-weekly-planning.json` | Added `fieldsUi` to "Call Brand Memory Assembly" mapping `id` to `restaurant_id` |
| C5 | `sched-social-nightly-analytics.json` | Removed Merge node; connected API outputs directly to Normalize Metrics |
| C6 | `sched-social-nightly-analytics.json` | Fixed TikTok auth to use `httpHeaderAuth` with credentials block |
| C7 | `sched-social-nightly-analytics.json` | Fixed double-nested retry options on Instagram/Facebook Insights nodes |

---

## Deployment Guide

### Prerequisites

- **n8n instance**: Self-hosted, v1.60+ recommended (for Postgres v2.5, Switch v3, SplitInBatches v3 support)
- **Database**: Supabase PostgreSQL with all migrations applied (see `supabase/migrations/`)
- **External services**: Anthropic API key, Meta Graph API tokens, Ayrshare API key, Slack webhook URL

### Credentials to Create in n8n

Before importing workflows, create these credentials in n8n:

| Credential Type | Suggested Name | Configuration |
|-----------------|----------------|---------------|
| Postgres | `Supabase Postgres - Neurolia Social` | Host, port, database, user, password from Supabase |
| HTTP Header Auth | `Anthropic API Key` | Header Name: `x-api-key`, Header Value: `sk-ant-...` |
| HTTP Header Auth | `Ayrshare API` | Header Name: `Authorization`, Header Value: `Bearer YOUR_KEY` |

> **Important**: Use the SAME Postgres credential name across all workflows. After import, update any mismatched credential references.

### Import Order (CRITICAL)

Workflows must be imported in this exact order due to sub-workflow dependencies.

#### Step 1: Error Handler

1. Import `error-social-handler.json`
2. **Note the workflow ID** assigned by n8n (visible in URL after import: `/workflow/XXXXX`)
3. Verify `settings.callerPolicy` is `"any"` (allows any workflow to trigger it)
4. **Do NOT activate yet**

#### Step 2: Sub-workflows (order within step does not matter)

**2a. Sub - Social - Brand Memory Assembly**
1. Import `sub-social-brand-memory-assembly.json`
2. **Note the workflow ID** (this is `BRAND_MEMORY_WORKFLOW_ID`)
3. Update all 3 Postgres nodes to use your unified credential name
4. Verify `callerPolicy` is `"workflowsFromSameOwner"`

**2b. Sub - Social - Claude API Call**
1. Import `sub-social-claude-api-call.json`
2. **Note the workflow ID** (this is `CLAUDE_API_WORKFLOW_ID`)
3. Assign the "Anthropic API Key" credential to "Call Claude API" node
4. Verify `callerPolicy` is `"workflowsFromSameOwner"`

**2c. Sub - Social - Platform Router**
1. Import `sub-social-platform-router.json`
2. **Note the workflow ID** (this is `PLATFORM_ROUTER_WORKFLOW_ID`)
3. Assign the "Ayrshare API" credential to "Post To TikTok" node
4. Verify `callerPolicy` is `"workflowsFromSameOwner"`

#### Step 3: Main Scheduled Workflows

**3a. Sched - Social - Weekly Planning**
1. Import `sched-social-weekly-planning.json`
2. Open workflow settings and replace `ERROR_WORKFLOW_ID` with the actual error handler workflow ID from Step 1
3. In "Call Brand Memory Assembly" node: replace `BRAND_MEMORY_WORKFLOW_ID` with actual ID from Step 2a
4. In "Call Claude Planning" node: replace `CLAUDE_API_WORKFLOW_ID` with actual ID from Step 2b
5. Update all Postgres nodes to use your unified credential name

**3b. Sched - Social - Daily Generation**
1. Import `sched-social-daily-generation.json`
2. Replace `ERROR_WORKFLOW_ID` in workflow settings
3. In "Call Brand Memory Assembly": replace `BRAND_MEMORY_WORKFLOW_ID`
4. In "Call Claude Caption": replace `CLAUDE_API_WORKFLOW_ID`
5. Update all Postgres nodes to use your unified credential name

**3c. Sched - Social - Hourly Publication**
1. Import `sched-social-hourly-publication.json`
2. Replace `ERROR_WORKFLOW_ID` in workflow settings
3. In "Call Platform Router": replace `PLATFORM_ROUTER_WORKFLOW_ID`
4. Update all Postgres nodes to use your unified credential name
5. **Important**: Review W2 warning above -- `content_id` and `restaurant_id` may be lost after Platform Router call. Test with a sample post before activating.

**3d. Sched - Social - Nightly Analytics**
1. Import `sched-social-nightly-analytics.json`
2. Replace `ERROR_WORKFLOW_ID` in workflow settings
3. Update all Postgres nodes to use your unified credential name
4. Assign "Ayrshare API" credential to "Fetch TikTok Analytics" node

### Post-Import Configuration Checklist

- [ ] All `ERROR_WORKFLOW_ID` placeholders replaced with actual error handler ID
- [ ] All `BRAND_MEMORY_WORKFLOW_ID` placeholders replaced (weekly planning + daily generation)
- [ ] All `CLAUDE_API_WORKFLOW_ID` placeholders replaced (weekly planning + daily generation)
- [ ] All `PLATFORM_ROUTER_WORKFLOW_ID` placeholders replaced (hourly publication)
- [ ] All Postgres credential references unified to single credential name
- [ ] Slack webhook URL updated in error handler node "Send Slack Alert" (`https://hooks.slack.com/services/YOUR_WEBHOOK_URL`)
- [ ] Anthropic API key credential configured
- [ ] Ayrshare API key credential configured
- [ ] Meta Graph API access tokens stored in `social_accounts` table (not in n8n)

### Testing Checklist

Test each workflow individually before activating schedules:

#### Error Handler
- [ ] Open error handler workflow, click "Test Workflow"
- [ ] Verify Slack message format (will fail on Slack delivery if webhook not configured -- that is expected)
- [ ] Verify database insert executes without error

#### Sub-workflows
- [ ] **Brand Memory Assembly**: Manually execute with `{ "restaurant_id": "<valid-uuid>" }`. Verify it returns `brand_dna`, `brand_visual`, `profile`, `summary`
- [ ] **Claude API Call**: Manually execute with `{ "prompt": "Say hello", "max_tokens": 100 }`. Verify response contains text
- [ ] **Platform Router**: Skip until you have valid platform tokens. Test with a test Instagram/Facebook account first

#### Weekly Planning
- [ ] Insert a test restaurant into `restaurants` table with `is_active = true`
- [ ] Insert corresponding `brand_dna` and `brand_visual` records
- [ ] Run the workflow manually
- [ ] Verify 7 entries created in `content_calendar` with status `planned`
- [ ] Verify `generation_log` entry created

#### Daily Generation
- [ ] Insert a test `content_calendar` entry with `status = 'planned'` and `scheduled_at` = today
- [ ] Run the workflow manually
- [ ] Verify the post is updated with `caption`, `hashtags`, `status = 'ready'`
- [ ] Verify `visual_assets.used_count` incremented

#### Hourly Publication
- [ ] Insert a test `content_calendar` entry with `status = 'ready'` and `scheduled_at` <= now
- [ ] Ensure a matching `social_accounts` record exists
- [ ] Run manually (will attempt real publication -- use test accounts!)
- [ ] Verify `post_publications` record created
- [ ] Verify `content_calendar.status` updated to `published`

#### Nightly Analytics
- [ ] Ensure at least one `post_publications` record exists from the last 7 days
- [ ] Run manually
- [ ] Verify `post_analytics` record created with metrics
- [ ] Verify `generation_log` entry created

### Activation Order

Activate workflows in this order, waiting at least one execution cycle between each:

1. **Error Handler** -- activate first (must be running to catch errors from others)
2. **Sub-workflows** (Brand Memory, Claude API, Platform Router) -- these are called on-demand, activating makes them callable
3. **Weekly Planning** -- activate on a Monday before 6:00 CET, or trigger manually first
4. **Daily Generation** -- activate after weekly planning has created `planned` entries
5. **Hourly Publication** -- activate after daily generation has created `ready` entries
6. **Nightly Analytics** -- activate after publications exist

### Monitoring

- **Slack channel**: Monitor the configured Slack channel for error alerts
- **n8n execution log**: Check `/executions` page daily during initial rollout
- **Database**: Query `generation_log` table for execution history:
  ```sql
  SELECT generation_type, COUNT(*), MAX(created_at)
  FROM generation_log
  GROUP BY generation_type
  ORDER BY MAX(created_at) DESC;
  ```
- **Execution timeouts**: Weekly Planning may take 5-10 minutes per restaurant (API calls + rate limiting). Set `executionTimeout` in workflow settings if needed.

### Known Limitations

1. **W2 - Data flow in Hourly Publication**: The `content_id` and `restaurant_id` fields may not survive the Platform Router sub-workflow call. Before activating, verify with a test run that "Record Publication" and downstream nodes receive these values. If not, add `$('Prepare Post Data').first().json.content_id` references in the SQL queries.

2. **Rate limiting**: Claude API and Meta Graph API have rate limits. The Wait nodes (2-3 seconds between batches) provide basic throttling. For high-volume usage (>10 restaurants), increase wait times or implement per-restaurant daily quotas.

3. **Token refresh**: Meta Graph API access tokens expire. The current architecture stores tokens in `social_accounts` table but has no automated refresh mechanism. Implement a separate token refresh workflow or use long-lived tokens.
