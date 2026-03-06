# Webhook Map - Neurolia-Immo

## Configuration n8n

| Element | Valeur |
|---------|--------|
| n8n Instance | `https://n8n.neurolia-immo.fr` (self-hosted) |
| Auth Webhook (n8n → App) | Header `x-api-key: {N8N_WEBHOOK_API_KEY}` |
| Auth Webhook (App → n8n) | Header `x-api-key: {N8N_WEBHOOK_API_KEY}` |
| Format Payload | JSON |
| Retry Policy | 3 tentatives, backoff exponentiel (1s, 5s, 30s) |
| Timeout | 30 secondes |
| Idempotence | Header `x-idempotency-key` sur chaque appel |

---

## Webhooks : App → n8n

> Appeles par l'app (Next.js API routes ou Supabase Database Webhooks) pour declencher des workflows n8n.

| Webhook | Trigger | Methode | URL n8n | Payload | Workflow |
|---------|---------|---------|---------|---------|----------|
| user.created (owner) | Inscription owner validee | POST | `/webhook/user-created` | `{ user_id, email, display_name, role: "owner" }` | WF03 : Email bienvenue + lancement premiere sync iCal |
| user.created (staff) | Inscription staff validee | POST | `/webhook/user-created` | `{ user_id, email, display_name, role: "cleaning_staff", owner_id }` | WF03 : Notification au owner "Nouveau membre" |
| property.created | Nouveau bien cree | POST | `/webhook/property-created` | `{ property_id, owner_id, name, ical_airbnb_url, ical_booking_url }` | WF02 : Demarrage sync iCal immediate |
| imap.configured | Config IMAP ajoutee/modifiee | POST | `/webhook/imap-configured` | `{ property_id, owner_id, imap_host, imap_email }` | WF01 : Premier parsing email |
| issue.created | Probleme signale par staff | POST | `/webhook/issue-created` | `{ issue_id, property_id, reported_by, type, description, photo_path }` | WF03 : Email urgent au owner avec photo |

### Implementation : Database Webhooks (Supabase)

Les webhooks App → n8n sont declenches par des **Database Webhooks Supabase** (pg_net) :

```sql
-- Exemple : Declenchement sur INSERT dans properties
CREATE OR REPLACE FUNCTION notify_property_created()
RETURNS trigger AS $$
BEGIN
  PERFORM net.http_post(
    url := current_setting('app.n8n_webhook_url') || '/webhook/property-created',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-api-key', current_setting('app.n8n_api_key')
    ),
    body := jsonb_build_object(
      'property_id', NEW.id,
      'owner_id', NEW.owner_id,
      'name', NEW.name,
      'ical_airbnb_url', NEW.ical_airbnb_url,
      'ical_booking_url', NEW.ical_booking_url
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## Webhooks : n8n → App

> Appeles par les workflows n8n pour ecrire dans Supabase via les API routes Next.js.

| Webhook | Source n8n | Methode | URL App | Payload | Action |
|---------|-----------|---------|---------|---------|--------|
| reservation.upsert | WF01 (Email Parser), WF02 (iCal Sync) | POST | `/api/webhooks/n8n/reservation` | Voir ci-dessous | Upsert reservation + notification owner |
| ical-alert | WF02 (iCal Sync) | POST | `/api/webhooks/n8n/ical-alert` | Voir ci-dessous | Creer anomalie + notification owner |
| task-created | WF04 (Cleaning Tasks) | POST | `/api/webhooks/n8n/task-created` | Voir ci-dessous | Confirmer creation tache |

### Payloads Detailles

#### reservation.upsert (WF01 / WF02 → App)

```json
{
  "property_id": "uuid",
  "platform": "airbnb | booking",
  "platform_ref_id": "HMABCDEF123",
  "status": "confirmed | modified | cancelled",
  "source": "email | ical",
  "guest_name": "Jean Dupont",
  "guest_email": "jean@mail.com | null",
  "nb_guests": 2,
  "check_in": "2026-03-15",
  "check_out": "2026-03-18",
  "amount": 450.00,
  "arrival_time": "15:00 | null",
  "special_requests": "string | null",
  "ical_uid": "airbnb-event-uid-123 | null",
  "email_message_id": "<msg-id@airbnb.com> | null",
  "raw_ical_data": {},
  "raw_email_data": {}
}
```

**Logique de traitement** :
1. Chercher reservation existante par `(property_id, platform, platform_ref_id)`
2. Si trouvee : UPDATE (enrichir champs manquants, mettre a jour statut)
3. Si non trouvee : INSERT
4. Si `source=email` et reservation iCal existante : reconcilier (`reconciliation_status=matched`)
5. Creer notification owner (`new_reservation` ou `cancellation`)
6. Si `status=confirmed` et `action=created` : appeler WF04 (creation tache) + ~~WF05 (email confirmation guest)~~ (DEPRECATED v2.1)

#### ical-alert (WF02 → App)

```json
{
  "property_id": "uuid",
  "type": "double_reservation | missing_reservation | date_mismatch | sync_failure",
  "description": "Double reservation detectee : Airbnb 15-18 mars + Booking 16-19 mars",
  "reservation_a_id": "uuid | null",
  "reservation_b_id": "uuid | null",
  "severity": "high | medium | low"
}
```

#### task-created (WF04 → App)

```json
{
  "task_id": "uuid",
  "reservation_id": "uuid",
  "property_id": "uuid",
  "type": "checkin_prep | checkout_clean",
  "assigned_to": "uuid | null",
  "scheduled_date": "2026-03-18"
}
```

---

## Webhooks Internes n8n (inter-workflows)

> Appels entre workflows n8n sans passer par l'app.

| Source | Destination | Methode | URL n8n | Declencheur |
|--------|-------------|---------|---------|-------------|
| WF01 (Email Parser) | WF04 (Cleaning Tasks) | POST | `/webhook/wf04-cleaning-task` | Nouvelle reservation confirmee |
| WF01 (Email Parser) | WF05 (Auto Messages) | POST | `/webhook/wf05-auto-message` | Email confirmation guest a envoyer | **(DEPRECATED v2.1 — PRD interdit emails voyageurs directs)** |

### Payload WF01 → WF04

```json
{
  "id": "uuid (reservation_id)",
  "property_id": "uuid",
  "check_in": "2026-03-15",
  "check_out": "2026-03-18",
  "nb_guests": 2,
  "status": "confirmed",
  "guest_name": "Jean Dupont"
}
```

### Payload WF01 → WF05 (DEPRECATED v2.1)

> **⚠️ DEPRECATED v2.1** — Ce webhook inter-workflow est deprecie. Le PRD interdit les emails voyageurs directs.

```json
{
  "reservation_id": "uuid",
  "property_id": "uuid",
  "guest_name": "Jean Dupont",
  "guest_email": "jean@mail.com | null",
  "check_in": "2026-03-15",
  "check_out": "2026-03-18",
  "flow": "confirmation"
}
```

---

## Triggers Cron (Schedules)

| Schedule | Cron Expression | Timezone | Workflow | Action |
|----------|----------------|----------|----------|--------|
| iCal Sync | `*/30 * * * *` | Europe/Paris | WF02 | Fetch iCal feeds, detecter anomalies |
| Email Parsing | `*/2 * * * *` | Europe/Paris | WF01 | Polling IMAP, parser nouveaux emails |
| Planning Staff | `0 7 * * *` | Europe/Paris | WF03 | Email planning du jour a chaque staff |
| Digest Owner | `0 8 * * *` | Europe/Paris | WF03 | Email resume quotidien au owner |
| Pre-arrival Guest | `0 10 * * *` | Europe/Paris | WF05 | Email pre-arrivee J-1 aux guests **(DEPRECATED v2.1)** |
| Post-departure Guest | `0 14 * * *` | Europe/Paris | WF05 | Email post-depart aux guests **(DEPRECATED v2.1)** |
| Health Check | `0 */6 * * *` | Europe/Paris | WF02 | Verifier derniere sync reussie par bien |

---

## Realtime Subscriptions (Supabase)

> Abonnements temps reel via `supabase.channel().on('postgres_changes', ...)`.

| Table | Evenement | Filtre | Abonne | Usage |
|-------|-----------|--------|--------|-------|
| cleaning_tasks | UPDATE | `owner_id=eq.{uid}` | Owner | Statut menage en temps reel sur dashboard |
| cleaning_tasks | INSERT | `assigned_to=eq.{uid}` | Staff | Nouvelle tache assignee |
| notifications | INSERT | `user_id=eq.{uid}` | Owner + Staff | Notification instantanee |
| reservations | INSERT, UPDATE | `owner_id=eq.{uid}` | Owner | Nouvelles reservations, modifications |
| anomalies | INSERT | `owner_id=eq.{uid}` | Owner | Alertes anomalies temps reel |

---

## Diagramme de Flux

```
┌─────────────┐                  ┌─────────────┐                  ┌─────────────┐
│  App Mobile  │                  │  Next.js    │                  │    n8n      │
│  / Web       │                  │  API Routes │                  │  Workflows  │
└──────┬──────┘                  └──────┬──────┘                  └──────┬──────┘
       │                                │                                │
       │  Supabase Client (RLS)         │                                │
       ├───────────────────────────────→│  Supabase (PostgREST)          │
       │  CRUD properties, tasks, etc.  │                                │
       │                                │                                │
       │  Realtime subscriptions        │                                │
       │←───────────────────────────────│  Supabase Realtime             │
       │  tasks.status, notifications   │                                │
       │                                │                                │
       │                                │  Database Webhooks (pg_net)    │
       │                                │───────────────────────────────→│
       │                                │  user.created, property.created│
       │                                │  imap.configured, issue.created│
       │                                │                                │
       │                                │  Cron Triggers                 │
       │                                │                    ┌───────────┤
       │                                │                    │  WF01: */2min (IMAP)
       │                                │                    │  WF02: */30min (iCal)
       │                                │                    │  WF03: 7h + 8h (digest)
       │                                │                    │  WF05: 10h + 14h (DEPRECATED)
       │                                │                    └───────────┤
       │                                │                                │
       │                                │  POST /api/webhooks/n8n/*     │
       │                                │←───────────────────────────────│
       │                                │  reservation, ical-alert,      │
       │                                │  task-created                  │
       │                                │                                │
       │                                │  Inter-workflow webhooks       │
       │                                │                    ┌───────────┤
       │                                │                    │  WF01→WF04 (task)
       │                                │                    │  WF01→WF05 (DEPRECATED)
       │                                │                    └───────────┤
       │                                │                                │
       │                                │  Supabase (service_role)      │
       │                                │  n8n ecrit directement ──────→│
       │                                │  cleaning_tasks, sent_messages │
       │                                │  sync_logs                     │
```

---

## Securite Webhooks

### Authentification

| Direction | Methode | Header | Valeur |
|-----------|---------|--------|--------|
| App → n8n | API Key | `x-api-key` | `{N8N_WEBHOOK_API_KEY}` (64 hex chars) |
| n8n → App | API Key | `x-api-key` | `{N8N_WEBHOOK_API_KEY}` (meme cle partagee) |

### Mesures de Protection

- **HTTPS obligatoire** : Tout trafic webhook en HTTPS (force par Vercel + n8n reverse proxy)
- **API Key partagee** : Cle unique 64 hex chars, identique cote n8n et Next.js
- **Validation cote App** : Middleware Next.js verifie `x-api-key` avant traitement
- **Validation cote n8n** : Header Auth credential verifie sur chaque webhook entrant
- **Idempotency Key** : Header `x-idempotency-key` avec UUID unique par appel pour eviter les doublons en cas de retry
- **Timestamp** : Champ `timestamp` dans chaque payload, rejete si > 5 minutes d'ecart
- **Rate Limiting** : 10 req/s max par webhook endpoint (protection DDoS basique)
- **Logging** : Tous les appels webhook logges dans `sync_logs` pour audit

### Validation Middleware (Next.js)

```typescript
// Pattern de validation pour /api/webhooks/n8n/*
export function validateWebhook(request: Request): boolean {
  const apiKey = request.headers.get('x-api-key');
  return apiKey === process.env.N8N_WEBHOOK_API_KEY;
}
```

---

*Derniere mise a jour : 2026-02-19*
