# API Contracts - Neurolia-Immo

## Configuration

| Element | Valeur |
|---------|--------|
| Backend | Supabase (PostgREST + Auth + Edge Functions) |
| Base URL API | `https://<project-ref>.supabase.co` |
| Base URL App | `https://app.neurolia-immo.fr` |
| Format | REST / JSON |
| Auth | Bearer Token (JWT) via Supabase Auth |
| Versioning | Non (gere par Supabase, migrations DB pour evolution) |
| Rate Limiting | 100 req/min (anon), 1000 req/min (authenticated) |
| CORS | Origins : app.neurolia-immo.fr, localhost:3000 |

> **Architecture** : Le frontend Next.js communique directement avec Supabase via le client JS (`@supabase/supabase-js`). Les webhooks n8n passent par des API routes Next.js (`/api/webhooks/n8n/*`). Les operations sensibles utilisent des Edge Functions Supabase.

## Conventions

- **Nommage** : snake_case pour les tables/colonnes Supabase, camelCase pour les champs JSON cote Next.js API routes
- **Pagination** : `.range(from, to)` cote Supabase → `{ data: [], count: number }`
- **Filtres** : `.eq()`, `.gte()`, `.lte()`, `.in()`, `.order()` via Supabase client
- **Erreurs Supabase** : `{ error: { message: "string", code: "string", details: "string" } }`
- **Erreurs API Routes** : `{ error: { code: "ERROR_CODE", message: "Description" } }`
- **Dates** : ISO 8601 (`2026-02-19T10:30:00Z`) pour les timestamps, `YYYY-MM-DD` pour les dates simples
- **IDs** : UUID v4 generes par Supabase (default `gen_random_uuid()`)
- **RLS** : Toutes les requetes client sont filtrees automatiquement par `owner_id` via Row Level Security

---

## Endpoints

### Auth (Supabase Auth)

> Gere nativement par Supabase Auth. Le client JS appelle `supabase.auth.*`.

#### POST /auth/v1/magiclink
Envoyer un magic link par email.

**Client** : `supabase.auth.signInWithOtp({ email })`

**Body** :
```json
{
  "email": "string (required)"
}
```

**Response 200** :
```json
{
  "message": "Magic link sent"
}
```

**Errors** : `429 RATE_LIMIT_EXCEEDED`

#### POST /auth/v1/token?grant_type=magiclink
Callback apres clic sur le magic link (automatique via redirect URL).

**Response 200** :
```json
{
  "access_token": "string (JWT)",
  "refresh_token": "string",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": "uuid",
    "email": "string",
    "app_metadata": { "role": "owner | cleaning_staff | admin" },
    "user_metadata": { "display_name": "string" }
  }
}
```

#### POST /auth/v1/token?grant_type=refresh_token
Renouveler le token d'acces.

**Client** : `supabase.auth.refreshSession()`

**Body** :
```json
{
  "refresh_token": "string (required)"
}
```

**Response 200** :
```json
{
  "access_token": "string",
  "refresh_token": "string",
  "expires_in": 3600
}
```

**Errors** : `401 INVALID_REFRESH_TOKEN`

#### POST /auth/v1/signup
Inscription owner (magic link) ou staff (via invitation).

**Client** : `supabase.auth.signUp({ email, options: { data: { display_name, role } } })`

**Body** :
```json
{
  "email": "string (required)",
  "options": {
    "data": {
      "display_name": "string (required)",
      "role": "owner | cleaning_staff"
    }
  }
}
```

**Response 200** :
```json
{
  "user": { "id": "uuid", "email": "string" },
  "session": null
}
```

> **Note** : Avec magic link, `session` est null a l'inscription. Le user recoit un email et s'authentifie via le lien.

**Errors** : `422 USER_ALREADY_EXISTS`, `429 RATE_LIMIT_EXCEEDED`

#### POST /auth/v1/signup (OAuth Google)
Connexion via Google OAuth.

**Client** : `supabase.auth.signInWithOAuth({ provider: 'google' })`

**Response** : Redirect vers Google → callback → session creee

#### POST /auth/v1/logout
Revoquer les tokens.

**Client** : `supabase.auth.signOut()`

**Headers** : `Authorization: Bearer {access_token}`

**Response 204** : No content

---

### Profiles

> Table `profiles` — Extension de `auth.users`. Trigger `on_auth_user_created` cree automatiquement le profil.

#### GET /rest/v1/profiles?select=*&id=eq.{user_id}
Recuperer le profil de l'utilisateur connecte.

**Client** : `supabase.from('profiles').select('*').eq('id', user.id).single()`

**Response 200** :
```json
{
  "id": "uuid",
  "email": "marc@exemple.fr",
  "display_name": "Marc Dupont",
  "avatar_url": "string | null",
  "phone": "string | null",
  "role": "owner",
  "owner_id": "null (owner) | uuid (staff)",
  "push_token": "string | null",
  "preferences": {},
  "is_active": true,
  "created_at": "2026-02-19T10:30:00Z",
  "updated_at": "2026-02-19T10:30:00Z",
  "last_login_at": "2026-02-19T10:30:00Z"
}
```

#### PATCH /rest/v1/profiles?id=eq.{user_id}
Mettre a jour le profil.

**Client** : `supabase.from('profiles').update({ display_name, avatar_url, phone, preferences }).eq('id', user.id)`

**Body** (partiel) :
```json
{
  "display_name": "string (optional)",
  "avatar_url": "string (optional)",
  "phone": "string (optional)",
  "preferences": "jsonb (optional)"
}
```

**Response 200** : Profil mis a jour

#### GET /rest/v1/profiles?select=*&owner_id=eq.{user_id}&role=eq.cleaning_staff
Lister les membres de l'equipe (staff d'un owner).

**Client** : `supabase.from('profiles').select('*').eq('owner_id', user.id).eq('role', 'cleaning_staff')`

**RLS** : Owner voit uniquement son equipe

**Response 200** :
```json
[
  {
    "id": "uuid",
    "display_name": "Sarah Martin",
    "email": "sarah@exemple.fr",
    "phone": "+33612345678",
    "is_active": true,
    "last_login_at": "2026-02-19T08:00:00Z"
  }
]
```

---

### Properties

#### GET /rest/v1/properties?select=*&is_active=eq.true&order=name.asc
Lister les biens du owner.

**Client** : `supabase.from('properties').select('*').eq('is_active', true).order('name')`

**RLS** : Filtre automatique `owner_id = auth.uid()` (owner) ou `owner_id = profiles.owner_id` (staff)

**Response 200** :
```json
{
  "data": [
    {
      "id": "uuid",
      "owner_id": "uuid",
      "name": "Studio Marais",
      "address": "12 rue de Rivoli, 75004 Paris",
      "city": "Paris",
      "postal_code": "75004",
      "country": "France",
      "access_code": "A1234",
      "wifi_ssid": "Studio_WiFi",
      "wifi_password": "secret123",
      "instructions": "Poubelles au fond de la cour",
      "max_guests": 4,
      "ical_airbnb_url": "https://airbnb.com/calendar/ical/...",
      "ical_booking_url": "https://admin.booking.com/...",
      "imap_configured": true,
      "is_active": true,
      "created_at": "2026-01-15T10:00:00Z",
      "updated_at": "2026-02-19T10:30:00Z"
    }
  ],
  "count": 3
}
```

#### GET /rest/v1/properties?select=*&id=eq.{property_id}
Recuperer un bien par ID.

**Client** : `supabase.from('properties').select('*').eq('id', propertyId).single()`

#### POST /rest/v1/properties
Creer un nouveau bien.

**Client** : `supabase.from('properties').insert({ name, address, ... })`

**Body** :
```json
{
  "name": "string (required)",
  "address": "string (required)",
  "city": "string (optional)",
  "postal_code": "string (optional)",
  "access_code": "string (optional)",
  "wifi_ssid": "string (optional)",
  "wifi_password": "string (optional)",
  "instructions": "string (optional)",
  "max_guests": "integer (optional)",
  "ical_airbnb_url": "string (optional)",
  "ical_booking_url": "string (optional)"
}
```

> **Note** : `owner_id` est injecte automatiquement via un trigger `before insert` utilisant `auth.uid()`.

**Response 201** : Bien cree

**Webhook declenche** : `property.created` → n8n (demarre iCal sync)

#### PATCH /rest/v1/properties?id=eq.{property_id}
Mettre a jour un bien.

**Client** : `supabase.from('properties').update({ ... }).eq('id', propertyId)`

**Response 200** : Bien mis a jour

#### DELETE /rest/v1/properties?id=eq.{property_id}
Desactiver un bien (soft delete : `is_active = false`).

**Client** : `supabase.from('properties').update({ is_active: false }).eq('id', propertyId)`

**Response 200** : Bien desactive

---

### Property Checklists

#### GET /rest/v1/property_checklists?select=*&property_id=eq.{property_id}
Lister les templates de checklist d'un bien.

**Client** : `supabase.from('property_checklists').select('*').eq('property_id', propertyId)`

#### POST /rest/v1/property_checklists
Creer un template de checklist.

**Body** :
```json
{
  "property_id": "uuid (required)",
  "type": "checkin_prep | checkout_clean (required)",
  "items": [
    { "label": "Verifier la proprete generale", "order": 1 },
    { "label": "Changer les draps", "order": 2 },
    { "label": "Remplacer les serviettes", "order": 3 }
  ]
}
```

#### PATCH /rest/v1/property_checklists?id=eq.{checklist_id}
Modifier un template de checklist.

#### DELETE /rest/v1/property_checklists?id=eq.{checklist_id}
Supprimer un template.

---

### Reservations

#### GET /rest/v1/reservations?select=*,properties(name)&order=check_in.asc
Lister les reservations avec nom du bien (join).

**Client** : `supabase.from('reservations').select('*, properties(name)').order('check_in')`

**Filtres courants** :
- Par bien : `.eq('property_id', id)`
- Par dates : `.gte('check_in', date).lte('check_out', date)`
- Par statut : `.in('status', ['confirmed', 'pending'])`
- Futures uniquement : `.gte('check_in', today)`

**Response 200** :
```json
{
  "data": [
    {
      "id": "uuid",
      "property_id": "uuid",
      "properties": { "name": "Studio Marais" },
      "platform": "airbnb",
      "platform_ref_id": "HMABCDEF123",
      "status": "confirmed",
      "source": "email",
      "guest_name": "Jean Dupont",
      "nb_guests": 2,
      "check_in": "2026-03-15",
      "check_out": "2026-03-18",
      "amount": 450.00,
      "reconciliation_status": "matched",
      "reconciliation_confidence": 0.95,
      "created_at": "2026-02-19T10:30:00Z"
    }
  ],
  "count": 12
}
```

#### GET /rest/v1/reservations?select=*&id=eq.{reservation_id}
Detail d'une reservation.

#### POST /rest/v1/reservations
Creer une reservation manuelle.

**Body** :
```json
{
  "property_id": "uuid (required)",
  "platform": "manual",
  "status": "confirmed",
  "source": "manual",
  "guest_name": "string (required)",
  "check_in": "date (required)",
  "check_out": "date (required)",
  "nb_guests": "integer (optional)",
  "amount": "number (optional)",
  "special_requests": "string (optional)"
}
```

**Response 201** : Reservation creee

#### PATCH /rest/v1/reservations?id=eq.{reservation_id}
Modifier une reservation (statut, reconciliation, notes).

> **Note** : Les reservations importees via iCal/email sont modifiees uniquement par n8n (via service_role key). Le owner peut modifier les reservations manuelles et les statuts de reconciliation.

---

### Cleaning Tasks

#### GET /rest/v1/cleaning_tasks?select=*,properties(name,address),profiles!assigned_to(display_name)&order=scheduled_date.asc
Lister les taches avec joins.

**Client (owner)** : `supabase.from('cleaning_tasks').select('*, properties(name, address), profiles!assigned_to(display_name)').order('scheduled_date')`

**Client (staff)** : `supabase.from('cleaning_tasks').select('*, properties(name, address, access_code, wifi_ssid, wifi_password, instructions)').eq('assigned_to', user.id).order('scheduled_date')`

**Filtres courants** :
- Par date : `.eq('scheduled_date', today)`
- Par statut : `.eq('status', 'pending')`
- Par agent : `.eq('assigned_to', staffId)`
- Par bien : `.eq('property_id', propertyId)`

**Response 200** :
```json
{
  "data": [
    {
      "id": "uuid",
      "reservation_id": "uuid | null",
      "property_id": "uuid",
      "properties": { "name": "Studio Marais", "address": "12 rue de Rivoli" },
      "assigned_to": "uuid",
      "profiles": { "display_name": "Sarah Martin" },
      "type": "checkout_clean",
      "status": "pending",
      "scheduled_date": "2026-03-18",
      "scheduled_time": "11:00",
      "started_at": null,
      "completed_at": null,
      "notes": null,
      "created_at": "2026-02-19T10:30:00Z"
    }
  ]
}
```

#### PATCH /rest/v1/cleaning_tasks?id=eq.{task_id}
Mettre a jour une tache (statut, assignation, notes).

**Actions staff** :
- Demarrer : `{ status: 'in_progress', started_at: new Date().toISOString() }`
- Terminer : `{ status: 'completed', completed_at: new Date().toISOString() }`

**Actions owner** :
- Assigner : `{ assigned_to: staffId }`
- Modifier date : `{ scheduled_date: '2026-03-19', scheduled_time: '10:00' }`

**Realtime** : Le owner recoit les changements de statut en temps reel via `supabase.channel('tasks').on('postgres_changes', ...)`

#### POST /rest/v1/cleaning_tasks
Creer une tache ad-hoc (owner uniquement).

**Body** :
```json
{
  "property_id": "uuid (required)",
  "type": "ad_hoc",
  "scheduled_date": "date (required)",
  "scheduled_time": "time (optional)",
  "assigned_to": "uuid (optional)",
  "notes": "string (optional)"
}
```

---

### Task Checklist Items

#### GET /rest/v1/task_checklist_items?select=*&task_id=eq.{task_id}&order=sort_order.asc
Lister les items de checklist d'une tache.

**Client** : `supabase.from('task_checklist_items').select('*').eq('task_id', taskId).order('sort_order')`

#### PATCH /rest/v1/task_checklist_items?id=eq.{item_id}
Cocher/decocher un item (staff).

**Body** :
```json
{
  "is_done": true,
  "completed_at": "2026-03-18T11:15:00Z"
}
```

---

### Task Photos

#### POST /storage/v1/object/task-photos/{task_id}/{filename}
Upload une photo (Supabase Storage).

**Client** : `supabase.storage.from('task-photos').upload(path, file)`

#### POST /rest/v1/task_photos
Enregistrer la reference de la photo.

**Body** :
```json
{
  "task_id": "uuid (required)",
  "checklist_item_id": "uuid (optional)",
  "storage_path": "task-photos/{task_id}/photo-001.jpg",
  "caption": "string (optional)"
}
```

#### GET /rest/v1/task_photos?select=*&task_id=eq.{task_id}
Lister les photos d'une tache.

---

### Issues

#### POST /rest/v1/issues
Signaler un probleme (staff).

**Body** :
```json
{
  "task_id": "uuid (optional)",
  "property_id": "uuid (required)",
  "type": "leak | breakage | missing | other (required)",
  "description": "string (required)",
  "photo_path": "string (optional)"
}
```

> `reported_by` et `owner_id` sont injectes via trigger (auth.uid() et properties.owner_id).

**Webhook declenche** : `issue.created` → n8n (email au owner avec photo)

#### GET /rest/v1/issues?select=*,profiles!reported_by(display_name),properties(name)&order=created_at.desc
Lister les signalements (owner).

#### PATCH /rest/v1/issues?id=eq.{issue_id}
Mettre a jour le statut (owner).

**Body** :
```json
{
  "status": "acknowledged | resolved",
  "resolved_at": "2026-03-18T14:00:00Z (si resolved)"
}
```

---

### Anomalies

#### GET /rest/v1/anomalies?select=*,properties(name),reservations!reservation_a_id(guest_name,check_in,check_out,platform)&status=eq.pending&order=created_at.desc
Lister les anomalies non resolues.

**Response 200** :
```json
{
  "data": [
    {
      "id": "uuid",
      "property_id": "uuid",
      "properties": { "name": "Studio Marais" },
      "type": "double_reservation",
      "reservation_a_id": "uuid",
      "reservations": { "guest_name": "Jean", "check_in": "2026-03-15", "check_out": "2026-03-18", "platform": "airbnb" },
      "reservation_b_id": "uuid",
      "description": "Double reservation detectee : Airbnb + Booking sur les memes dates",
      "status": "pending",
      "created_at": "2026-02-19T10:30:00Z"
    }
  ]
}
```

#### PATCH /rest/v1/anomalies?id=eq.{anomaly_id}
Resoudre une anomalie.

**Body** :
```json
{
  "status": "resolved | false_positive",
  "resolved_at": "2026-03-18T14:00:00Z"
}
```

---

### Staff Invitations

#### POST /rest/v1/rpc/create_invitation
Creer une invitation (Edge Function pour generer le token securise).

**Client** : `supabase.rpc('create_invitation', { email })`

**Body** :
```json
{
  "email": "string (optional)"
}
```

**Response 201** :
```json
{
  "data": {
    "id": "uuid",
    "token": "string (URL-safe, unique)",
    "invitation_url": "https://app.neurolia-immo.fr/invite/{token}",
    "expires_at": "2026-02-26T10:30:00Z"
  }
}
```

#### GET /rest/v1/staff_invitations?select=*&order=created_at.desc
Lister les invitations envoyees par le owner.

#### GET /rest/v1/rpc/validate_invitation
Valider un token d'invitation (public, pas d'auth requise).

**Client** : `supabase.rpc('validate_invitation', { token })`

**Response 200** :
```json
{
  "valid": true,
  "owner_display_name": "Marc Dupont",
  "email": "sarah@exemple.fr | null"
}
```

**Errors** : `{ valid: false, reason: "expired | already_used | not_found" }`

---

### Notifications

#### GET /rest/v1/notifications?select=*&is_read=eq.false&order=created_at.desc
Lister les notifications non lues.

**Client** : `supabase.from('notifications').select('*').eq('is_read', false).order('created_at', { ascending: false })`

**Realtime** : `supabase.channel('notifications').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: 'user_id=eq.' + user.id }, callback)`

#### PATCH /rest/v1/notifications?id=eq.{notification_id}
Marquer comme lu.

**Body** :
```json
{
  "is_read": true
}
```

#### PATCH /rest/v1/rpc/mark_all_notifications_read
Marquer toutes les notifications comme lues.

**Client** : `supabase.rpc('mark_all_notifications_read')`

---

### Welcome Guides

#### GET /rest/v1/welcome_guides?select=*&property_id=eq.{property_id}
Recuperer le livret d'accueil d'un bien (owner, edit mode).

#### POST /rest/v1/welcome_guides
Creer un livret d'accueil.

**Body** :
```json
{
  "property_id": "uuid (required)",
  "slug": "string (required, unique, URL-safe)",
  "content": {
    "wifi": { "ssid": "Studio_WiFi", "password": "secret123" },
    "house_rules": ["Pas de fete", "Silence apres 22h"],
    "useful_numbers": [{ "label": "Urgences", "number": "112" }],
    "local_recommendations": [{ "name": "Boulangerie Paul", "type": "restaurant", "address": "5 rue de Turbigo" }],
    "custom_sections": []
  },
  "is_published": false
}
```

#### PATCH /rest/v1/welcome_guides?id=eq.{guide_id}
Modifier le livret (contenu, publication).

#### GET /rest/v1/rpc/get_public_welcome_guide
Lecture publique du livret (pas d'auth requise).

**Client** : `supabase.rpc('get_public_welcome_guide', { slug })`

**Response 200** :
```json
{
  "property_name": "Studio Marais",
  "content": { "wifi": {}, "house_rules": [], "useful_numbers": [], "local_recommendations": [], "custom_sections": [] }
}
```

**Errors** : `404 NOT_FOUND`, `403 NOT_PUBLISHED`

---

### Sync Logs

#### GET /rest/v1/sync_logs?select=*&property_id=eq.{property_id}&order=synced_at.desc&limit=20
Consulter l'historique de synchronisation d'un bien (owner).

**Response 200** :
```json
{
  "data": [
    {
      "id": "uuid",
      "property_id": "uuid",
      "source": "ical_airbnb",
      "status": "success",
      "events_processed": 15,
      "events_created": 2,
      "events_updated": 1,
      "error_message": null,
      "duration_ms": 1250,
      "synced_at": "2026-02-19T10:00:00Z"
    }
  ]
}
```

---

### Next.js API Routes (Webhooks n8n → App)

> Ces endpoints recoivent les payloads de n8n et ecrivent dans Supabase via `service_role` key.

#### POST /api/webhooks/n8n/reservation
Reception d'une reservation parsee (email ou iCal).

**Headers** : `x-api-key: {N8N_WEBHOOK_API_KEY}`

**Body** :
```json
{
  "property_id": "uuid",
  "platform": "airbnb | booking",
  "platform_ref_id": "HMABCDEF123",
  "status": "confirmed | modified | cancelled",
  "source": "email | ical",
  "guest_name": "Jean Dupont",
  "guest_email": "string | null",
  "nb_guests": 2,
  "check_in": "2026-03-15",
  "check_out": "2026-03-18",
  "amount": 450.00,
  "ical_uid": "string | null",
  "email_message_id": "string | null",
  "raw_data": {}
}
```

**Response 200** :
```json
{
  "action": "created | updated | ignored",
  "reservation_id": "uuid"
}
```

**Logique** : Upsert par `(property_id, platform, platform_ref_id)`. Si deja existant, enrichit les champs manquants.

#### POST /api/webhooks/n8n/ical-alert
Reception d'une alerte de synchronisation iCal.

**Headers** : `x-api-key: {N8N_WEBHOOK_API_KEY}`

**Body** :
```json
{
  "property_id": "uuid",
  "type": "double_reservation | missing_reservation | date_mismatch | sync_failure",
  "description": "string",
  "reservation_a_id": "uuid | null",
  "reservation_b_id": "uuid | null"
}
```

**Response 200** : `{ anomaly_id: "uuid" }`

#### POST /api/webhooks/n8n/task-created
Confirmation de creation de tache par n8n (WF04).

**Headers** : `x-api-key: {N8N_WEBHOOK_API_KEY}`

**Body** :
```json
{
  "task_id": "uuid",
  "reservation_id": "uuid",
  "type": "checkin_prep | checkout_clean",
  "assigned_to": "uuid | null",
  "scheduled_date": "2026-03-18"
}
```

**Response 200** : `{ status: "ok" }`

---

### Edge Functions Supabase

#### create_invitation
Genere un token securise et cree l'invitation.

**Trigger** : Appel RPC depuis le client

#### validate_invitation
Verifie la validite d'un token d'invitation (expiration, usage unique).

**Trigger** : Appel RPC depuis la page d'inscription staff (public)

#### on_auth_user_created (Database Trigger)
Cree automatiquement le profil dans `profiles` apres inscription Supabase Auth.

**Trigger** : `auth.users` INSERT

#### get_public_welcome_guide
Retourne le livret d'accueil public sans authentification.

**Trigger** : Appel RPC public

#### mark_all_notifications_read
Batch update de toutes les notifications non lues.

**Trigger** : Appel RPC authentifie

---

## Mapping Features → Endpoints

| Feature | Endpoints Principaux |
|---------|---------------------|
| F01 (Auth & Roles) | POST /auth/magiclink, POST /auth/signup, POST /auth/logout, POST /auth/token, RPC create_invitation, RPC validate_invitation |
| F02 (Gestion Proprietes) | CRUD /properties, CRUD /property_checklists |
| F03 (Ingestion iCal) | POST /api/webhooks/n8n/reservation (source: ical), GET /sync_logs |
| F04 (Ingestion Email) | POST /api/webhooks/n8n/reservation (source: email), GET /sync_logs |
| F05 (Reconciliation) | POST /api/webhooks/n8n/ical-alert, GET /anomalies, PATCH /anomalies, PATCH /reservations (reconciliation_status) |
| F06 (Dashboard Proprio) | GET /reservations (filtres dates), GET /cleaning_tasks (statut), GET /anomalies (pending), GET /properties |
| F07 (Dashboard Entretien) | GET /cleaning_tasks (assigned_to), PATCH /cleaning_tasks (status), GET /task_checklist_items, PATCH /task_checklist_items, POST /task_photos, POST /issues |
| F08 (Planning Intelligent) | GET /profiles (staff), PATCH /cleaning_tasks (assigned_to) |
| F09 (Multi-tenant) | RLS automatique sur toutes les requetes |
| F10 (Notifications) | GET /notifications, PATCH /notifications (is_read), Realtime subscription, RPC mark_all_notifications_read |
| F11 (Livret Accueil) | CRUD /welcome_guides, RPC get_public_welcome_guide |
| F12 (Creation Auto Taches) | POST /api/webhooks/n8n/task-created, Realtime cleaning_tasks |

---

*Derniere mise a jour : 2026-02-19*
