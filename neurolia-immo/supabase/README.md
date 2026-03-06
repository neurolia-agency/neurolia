# Supabase Setup - Neurolia Immo

This folder contains the complete DB setup for `neurolia-immo`:

- schema + enums + indexes
- triggers + RPC functions
- RLS policies (owner/staff/admin/public)
- storage buckets + storage policies
- optional seed for workflow tests

## 1) Migrations in order

Apply in this exact order:

1. `supabase/migrations/20260220170000_init_schema.sql`
2. `supabase/migrations/20260220170100_functions_triggers_rpc.sql`
3. `supabase/migrations/20260220170200_rls_policies.sql`
4. `supabase/migrations/20260220170300_storage_buckets_policies.sql`
5. `supabase/migrations/20260220170400_rpc_parameter_compat.sql`

Optional seed:

1. `supabase/seeds/001_workflow_test_data.sql`

## 2) Apply on hosted Supabase (SQL Editor)

In Supabase Dashboard -> SQL Editor:

1. Run migration `20260220170000_init_schema.sql`
2. Run migration `20260220170100_functions_triggers_rpc.sql`
3. Run migration `20260220170200_rls_policies.sql`
4. Run migration `20260220170300_storage_buckets_policies.sql`
5. Run migration `20260220170400_rpc_parameter_compat.sql`
6. (Optional) Run `supabase/seeds/001_workflow_test_data.sql`

## 3) Apply with Supabase CLI (local or linked project)

If you use CLI:

```bash
cd /Users/dorian.gz/dev/neurolia/neurolia-immo
supabase db push
```

For local stack:

```bash
supabase start
supabase db reset
```

## 4) Required environment variables

### Next.js / Vercel

Set these in Vercel Project Settings -> Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
NEXT_PUBLIC_APP_URL=https://neurolia-immo.vercel.app
N8N_WEBHOOK_API_KEY=<shared-webhook-key>
N8N_WEBHOOK_URL=https://n8n.<your-domain>/webhook
```

### n8n self-hosted (Hostinger KVM)

In your n8n container/service environment:

```env
N8N_BLOCK_ENV_ACCESS_IN_NODE=false
DASHBOARD_URL=https://neurolia-immo.vercel.app
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_KEY=<service-role-key>
N8N_WEBHOOK_API_KEY=<shared-webhook-key>
SMTP_FROM_EMAIL=<sender-email>
SMTP_FROM_NAME=<sender-name>
ADMIN_EMAIL=<admin-email>
```

Important:

- `N8N_BLOCK_ENV_ACCESS_IN_NODE=false` must be present in the **n8n service env** and container restarted.
- In n8n Set node, expressions should use `{{ $env.VARIABLE_NAME }}`.

## 5) Quick validation queries

Run these in SQL Editor after migrations:

```sql
select tablename
from pg_tables
where schemaname = 'public'
order by tablename;

select proname
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and proname in (
    'create_invitation',
    'validate_invitation',
    'get_public_welcome_guide',
    'mark_all_notifications_read'
  )
order by proname;

select schemaname, tablename, rowsecurity
from pg_tables
where schemaname = 'public'
order by tablename;

select id, public
from storage.buckets
where id in ('task-photos', 'avatars', 'welcome-guides', 'qr-codes')
order by id;
```

## 6) Test data for workflow suite

`supabase/seeds/001_workflow_test_data.sql` creates/updates:

- property: `06f47a84-9b8f-4da2-9316-9783b5259398`
- reservation: `00000000-0000-0000-0000-000000000001`

These IDs match payloads in `n8n/tests/payloads/`.

## 7) Run webhook test suite

From project root:

```bash
cd /Users/dorian.gz/dev/neurolia/neurolia-immo
bash n8n/tests/run-webhook-suite.sh --mode test
```

Single case example:

```bash
bash n8n/tests/run-webhook-suite.sh --mode test --include wf04-cleaning-task
```

## 8) Generate TypeScript DB types

After migrations are applied:

```bash
supabase gen types typescript --schema public > src/types/database.ts
```

If CLI is not installed yet:

```bash
npm i -g supabase
```
