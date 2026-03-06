# Credentials Map — Neurolia-Immo n8n

## Resume

Total : **5 credentials** pour **4 services** (IMAP, SMTP, Supabase x2, Header Auth)

Supabase utilise un **mode mixte** : credential native `supabaseApi` (CRED-03-NATIVE) pour les requetes CRUD simples + HTTP Request avec headers manuels (CRED-03) pour les JOINs PostgREST et Storage API.

Tous les workflows (WF00-WF09) sont couverts. Aucun node authentifie n'est sans CRED-XX.

---

## Matrice des Credentials

| ID | Service | Type n8n | Methode Auth | Scopes / Permissions | Var Env | Workflows |
|----|---------|----------|-------------|---------------------|---------|-----------|
| CRED-01 | IMAP - Loc Immo | emailReadImap (Imap) | Login (user + app password) | Lecture INBOX, marquer lu | `N8N_CRED_IMAP_HOST`, `N8N_CRED_IMAP_PORT`, `N8N_CRED_IMAP_USER`, `N8N_CRED_IMAP_PASSWORD` | WF01 |
| CRED-02 | SMTP - Loc Immo | emailSend (Smtp) | Login (user + app password) | Envoi emails sortants | `N8N_CRED_SMTP_HOST`, `N8N_CRED_SMTP_PORT`, `N8N_CRED_SMTP_USER`, `N8N_CRED_SMTP_PASSWORD`, `N8N_CRED_SMTP_FROM_NAME`, `N8N_CRED_SMTP_FROM_EMAIL` | WF00, WF02, WF03, WF04, ~~WF05~~ (DEPRECATED), ~~WF06~~ (DEPRECATED), WF07, WF08, WF09 |
| CRED-03 | Supabase - Loc Immo (HTTP) | httpRequest (Header Auth inline) | API Key + Bearer Token (service_role) | JOINs PostgREST, Storage signed URLs, ecriture fetch() | `N8N_CRED_SUPABASE_URL`, `N8N_CRED_SUPABASE_SERVICE_KEY` | WF03, WF04, ~~WF05~~ (DEPRECATED), ~~WF06~~ (DEPRECATED), WF08, WF09 |
| CRED-03-NATIVE | Supabase - Loc Immo (natif) | supabaseApi (Supabase) | Host + Service Role Key | Lecture/ecriture CRUD simple (toutes tables) | *(credential n8n, pas de var env)* | WF01, WF02, WF03, WF04, ~~WF05~~ (DEPRECATED), WF07, WF08, WF09 |
| CRED-04 | Header Auth - API Key Dashboard | headerAuth | Header `x-api-key` | Validation webhooks entrants (App → n8n, inter-WF) | `N8N_CRED_WEBHOOK_API_KEY` | WF01, WF02, WF04, ~~WF06~~ (DEPRECATED), WF07, WF08 |

---

## Details par Credential

### CRED-01 — IMAP - Loc Immo (emailReadImap)

- **Type n8n** : `Imap` (credential type built-in)
- **Methode** : Login (user + app password) over SSL/TLS
- **Scopes** : Lecture INBOX, marquer comme lu (postProcessAction: markAsRead)
- **Variables d'environnement** :
  - `N8N_CRED_IMAP_HOST` — Serveur IMAP (ex: `imap.gmail.com`)
  - `N8N_CRED_IMAP_PORT` — Port IMAP (ex: `993`)
  - `N8N_CRED_IMAP_USER` — Adresse email (ex: `reservations@locimmo.fr`)
  - `N8N_CRED_IMAP_PASSWORD` — App Password (pas le mot de passe principal)
- **URL de base** : `imaps://{host}:{port}` (connexion chiffree SSL/TLS)
- **Workflows concernes** : WF01 (Email Parser — IMAP Trigger node)
- **Notes** :
  - Polling toutes les 2 minutes via le node `emailReadImap`
  - Necessite un App Password si Gmail (2FA active obligatoire)
  - `forceReconnect: true` pour eviter les sessions IMAP zombies
  - Providers supportes : Gmail, Outlook, Yahoo, OVH
  - Credential configuree directement dans l'interface n8n (champs host, port, user, password, secure: true)

### CRED-02 — SMTP - Loc Immo (emailSend)

- **Type n8n** : `Smtp` (credential type built-in)
- **Methode** : Login (user + app password) over TLS (STARTTLS)
- **Scopes** : Envoi d'emails sortants (tous types : alertes, digests, notifications, onboarding, guests)
- **Variables d'environnement** :
  - `N8N_CRED_SMTP_HOST` — Serveur SMTP (ex: `smtp.gmail.com`)
  - `N8N_CRED_SMTP_PORT` — Port SMTP (ex: `587`)
  - `N8N_CRED_SMTP_USER` — Adresse email (ex: `reservations@locimmo.fr`)
  - `N8N_CRED_SMTP_PASSWORD` — App Password (meme compte que IMAP)
  - `N8N_CRED_SMTP_FROM_NAME` — Nom d'affichage expediteur (ex: `Neurolia-Immo`)
  - `N8N_CRED_SMTP_FROM_EMAIL` — Adresse expediteur (ex: `reservations@locimmo.fr`)
- **URL de base** : `smtp://{host}:{port}` (connexion TLS/STARTTLS)
- **Workflows concernes** : WF00, WF02, WF03, WF04, ~~WF05~~ (DEPRECATED v2.1), ~~WF06~~ (DEPRECATED v2.2), WF07, WF08, WF09
- **Nodes utilisant cette credential** :
  - WF00 — `Send Email` (alerte erreur admin)
  - WF02 — `Send Email: iCal Alert` (alerte anomalie owner)
  - WF03 — `Send Email Staff` (planning quotidien) + `Send Email Owner` (digest quotidien)
  - WF04 — `Send Email` (notification tache assignee staff)
  - ~~WF05~~ — `Send Email Guest` (pre-arrivee + post-depart voyageurs) **(DEPRECATED v2.1)**
  - ~~WF06~~ — `Send Email Owner` (formulaire pre-arrivee standard/urgent) **(DEPRECATED v2.2)**
  - WF07 — `Send Email Owner Welcome` + `Split Send Emails` (bienvenue owner/staff)
  - WF08 — `Send Email Urgent` (signalement urgent owner)
  - WF09 — `Send Email Admin` (alerte health check admin)
- **Notes** :
  - Credential partagee par 7 workflows actifs sur 10 (WF01 n'envoie pas d'email, WF05 deprecated v2.1, WF06 deprecated v2.2)
  - `fromEmail` et `replyTo` lus depuis le noeud Config (`$env.SMTP_FROM_EMAIL`)
  - Meme compte que IMAP (lecture + envoi depuis la meme boite)

### CRED-03 — Supabase - Loc Immo (HTTP Request — JOINs + Storage + fetch POST)

- **Type n8n** : Non pas une credential n8n formelle — acces via HTTP Request avec headers manuels ou `fetch()` dans Code nodes
- **Methode** : API Key + Bearer Token (Supabase `service_role` key)
- **Scopes restants apres migration** :
  - **JOINs PostgREST** : requetes avec `select=*,table(col)` (embedded resources) — non supportees par le node natif
  - **Storage** : `sign` (generation URLs signees pour photos — WF08)
  - **Ecriture fetch()** : `cleaning_tasks` (POST), `task_checklist_items` (POST) dans Code nodes WF04
  - **RLS bypass** : la cle `service_role` contourne le Row Level Security (acces total)
- **Variables d'environnement** :
  - `N8N_CRED_SUPABASE_URL` — URL du projet Supabase (ex: `https://<project-ref>.supabase.co`)
  - `N8N_CRED_SUPABASE_SERVICE_KEY` — Cle `service_role` JWT (ex: `eyJ...`)
- **URL de base** : `https://<project-ref>.supabase.co/rest/v1/` (PostgREST API)
- **Workflows concernes** (uniquement ceux ayant encore des HTTP Request / fetch Supabase) : WF03, WF04, ~~WF05~~ (DEPRECATED v2.1), ~~WF06~~ (DEPRECATED v2.2), WF08, WF09
- **Nodes utilisant encore cette credential** (par workflow) :
  - WF03 — `HTTP: Get Cleaning Tasks Today`, `HTTP: Get Check-ins Today`, `HTTP: Get Check-outs Today`, `HTTP: Get Check-ins Tomorrow`, `HTTP: Get Pending Tasks` (tous avec JOINs)
  - WF04 — `Code: Create Tasks` (fetch POST cleaning_tasks + task_checklist_items), `Code: Assign Round-Robin` (fetch PATCH cleaning_tasks)
  - ~~WF05~~ — `HTTP: Get Reservations` (JOIN) **(DEPRECATED v2.1)**
  - ~~WF06~~ — `Code: Validate & Detect Priority` (inline fetch) **(DEPRECATED v2.2)**
  - WF08 — `Code: Build Urgent Email` (fetch Storage signed URL uniquement)
  - WF09 — `HTTP: Get Active Properties` (JOIN profiles), `Code: Health Checks` (fetch iCal — pas Supabase)
- **Notes** :
  - Utilise uniquement pour les cas non couverts par le node natif (JOINs, Storage API, fetch POST dans Code)
  - Les requetes CRUD simples ont ete migrees vers CRED-03-NATIVE (node natif `supabaseApi`)
  - La cle `service_role` donne un acces complet sans RLS — usage exclusivement serveur
  - **Securite critique** : cette cle ne doit JAMAIS etre exposee cote client

### CRED-03-NATIVE — Supabase - Loc Immo (node natif supabaseApi)

- **Type n8n** : `Supabase` (credential type built-in `supabaseApi`)
- **Methode** : Host URL + Service Role Key (configuree dans l'interface n8n)
- **Configuration** :
  - `host` — URL du projet Supabase (ex: `https://<project-ref>.supabase.co`)
  - `serviceRole` — Cle `service_role` JWT (meme cle que CRED-03)
- **ID placeholder** : `CRED-03-NATIVE` — a remplacer par l'ID reel apres creation dans n8n UI
- **Scopes** :
  - **Lecture** : `profiles`, `properties`, `property_checklists`, `reservations`, `cleaning_tasks`, `sent_messages`, `sync_logs`
  - **Ecriture** : `sent_messages` (create, update — WF05)
  - **RLS bypass** : la cle `service_role` contourne le Row Level Security (acces total)
- **Workflows concernes** : WF01, WF02, WF03, WF04, ~~WF05~~ (DEPRECATED v2.1), WF07, WF08, WF09
- **Nodes utilisant cette credential** (par workflow) :
  - WF01 — `Supabase: Get Property by Name` (property lookup par nom, ilike)
  - WF02 — `Supabase: Get Active Properties`, `Supabase: Get Owner`, `Supabase: Get DB Reservations`
  - WF03 — `Supabase: Get Staff Profiles`, `Supabase: Get Owners`
  - WF04 — `Supabase: Get Property`, `Supabase: Get Existing Task`, `Supabase: Get Property Checklists`, `Supabase: Get Available Staff`
  - ~~WF05~~ — `Supabase: Check Duplicate`, `Supabase: Insert sent_message`, `Supabase: Update sent_message` **(DEPRECATED v2.1)**
  - WF07 — `Supabase: Get Owner Profile`
  - WF08 — `Supabase: Get Property`, `Supabase: Get Reporter`, `Supabase: Get Owner`
  - WF09 — `Supabase: Get IMAP Sync Logs`
- **Notes** :
  - Utilise pour toutes les requetes CRUD simples (getAll avec filterString, create, update)
  - Le node natif retourne **1 item par row** (pas un tableau JSON) — impact sur les expressions downstream
  - Les requetes avec JOINs PostgREST, Storage API, ou fetch POST dans Code nodes restent sur CRED-03 (HTTP)
  - Meme cle `service_role` que CRED-03 — une seule cle pour les deux credentials
  - A creer dans n8n UI avant import des workflows : Settings > Credentials > New > Supabase

### CRED-04 — Header Auth - API Key Dashboard (headerAuth)

- **Type n8n** : `headerAuth` (credential type built-in)
- **Methode** : Header `x-api-key` avec cle partagee 64 caracteres hex
- **Scopes** : Validation des requetes entrantes sur les webhooks n8n
- **Variable d'environnement** :
  - `N8N_CRED_WEBHOOK_API_KEY` — Cle API 64 hex chars (partagee avec l'App Next.js)
- **URL de base** : N/A (credential de validation, pas d'appel sortant)
- **Workflows concernes** : WF01, WF02, WF04, ~~WF06~~ (DEPRECATED v2.2), WF07, WF08
- **Nodes utilisant cette credential** :
  - WF01 — `Webhook: imap.configured` (path: `/webhook/imap-configured`)
  - WF02 — `Webhook: property.created` (path: `/webhook/property-created`)
  - WF04 — `Webhook Trigger` (path: `/webhook/wf04-cleaning-task`)
  - ~~WF06~~ — `Webhook Trigger` (path: `/webhook/wf06-checkin-notify`) **(DEPRECATED v2.2)**
  - WF07 — `Webhook Trigger` (path: `/webhook/user-created`)
  - WF08 — `Webhook Trigger` (path: `/webhook/issue-created`)
- **Notes** :
  - La meme cle est utilisee pour les webhooks App → n8n ET les webhooks inter-workflows (WF01 → WF04)
  - Configuree dans l'interface n8n comme credential de type "Header Auth" avec `name: x-api-key` et `value: <key>`
  - La meme cle doit etre configuree cote Next.js (`N8N_WEBHOOK_API_KEY` dans Vercel)
  - WF01 et WF02 utilisent aussi cette cle en header sortant (`x-api-key`) pour les appels vers l'API App — ces appels sont faits via le noeud Config, pas via la credential n8n formelle
  - Generation : `openssl rand -hex 32`

---

## Matrice Credential x Workflow

| Workflow | CRED-01 (IMAP) | CRED-02 (SMTP) | CRED-03 (Supabase HTTP) | CRED-03-NATIVE (Supabase natif) | CRED-04 (Header Auth) |
|----------|:--------------:|:--------------:|:-----------------------:|:-------------------------------:|:---------------------:|
| WF00 — Error Handler | - | SEND | - | - | - |
| WF01 — Email Parser | TRIGGER | - | - | READ | WEBHOOK |
| WF02 — iCal Sync | - | SEND | - | READ | WEBHOOK |
| WF03 — Daily Notifications | - | SEND | READ (JOINs) | READ | - |
| WF04 — Cleaning Tasks | - | SEND | WRITE (fetch POST) | READ | WEBHOOK |
| ~~WF05 — Guest Messages~~ (DEPRECATED v2.1) | - | ~~SEND~~ | ~~READ (JOIN)~~ | ~~READ+WRITE~~ | - |
| ~~WF06 — Check-in Form~~ (DEPRECATED v2.2) | - | ~~SEND~~ | ~~READ~~ | - | ~~WEBHOOK~~ |
| WF07 — User Onboarding | - | SEND | - | READ | WEBHOOK |
| WF08 — Issue Handler | - | SEND | STORAGE | READ | WEBHOOK |
| WF09 — Health Monitor | - | SEND | READ (JOIN) | READ | - |

Legende :
- **TRIGGER** : IMAP polling (lecture boite email)
- **SEND** : Envoi email SMTP
- **READ** : Requetes GET Supabase (PostgREST ou native node)
- **READ (JOINs)** : Requetes GET avec embedded select PostgREST (HTTP Request)
- **WRITE** : Requetes POST/PATCH Supabase (native node)
- **WRITE (fetch POST)** : Requetes POST/PATCH via fetch() dans Code nodes (HTTP)
- **STORAGE** : Generation signed URL Supabase Storage (HTTP/fetch)
- **WEBHOOK** : Validation x-api-key sur webhook entrant

---

## Variables d'Environnement Additionnelles (non-credentials)

Ces variables sont chargees par les noeuds Config (`$env.VARIABLE_NAME`) mais ne sont pas des credentials au sens n8n. Elles sont necessaires au fonctionnement des workflows :

| Variable | Usage | Workflows | Notes |
|----------|-------|-----------|-------|
| `DASHBOARD_URL` | URL base de l'App Next.js | WF00-WF09 | Webhooks sortants + liens emails |
| `ADMIN_EMAIL` | Email admin technique Neurolia | WF00, WF01, WF09 | Destinataire alertes systeme |
| `N8N_WF04_WEBHOOK_URL` | URL webhook WF04 (inter-workflow) | WF01 | Appel WF01 → WF04 |
| `N8N_WF05_WEBHOOK_URL` | URL webhook WF05 (reserve Phase 2) | -- | Non utilise en v2 MVP |

---

## Variables d'Environnement (.env)

```env
# ============================================================
# Credentials n8n — Neurolia-Immo
# NE PAS COMMITER — Copier dans .env et remplir les valeurs
# ============================================================

# ----------------------------------------------------------
# CRED-01: IMAP - Loc Immo (lecture emails reservations)
# ----------------------------------------------------------
N8N_CRED_IMAP_HOST=imap.gmail.com
N8N_CRED_IMAP_PORT=993
N8N_CRED_IMAP_USER=
N8N_CRED_IMAP_PASSWORD=

# ----------------------------------------------------------
# CRED-02: SMTP - Loc Immo (envoi emails sortants)
# ----------------------------------------------------------
N8N_CRED_SMTP_HOST=smtp.gmail.com
N8N_CRED_SMTP_PORT=587
N8N_CRED_SMTP_USER=
N8N_CRED_SMTP_PASSWORD=
N8N_CRED_SMTP_FROM_NAME=Neurolia-Immo
N8N_CRED_SMTP_FROM_EMAIL=

# ----------------------------------------------------------
# CRED-03: Supabase - Loc Immo (acces base de donnees)
# ----------------------------------------------------------
N8N_CRED_SUPABASE_URL=
N8N_CRED_SUPABASE_SERVICE_KEY=

# ----------------------------------------------------------
# CRED-04: Header Auth - API Key Dashboard (webhooks)
# ----------------------------------------------------------
# Generer avec: openssl rand -hex 32
N8N_CRED_WEBHOOK_API_KEY=

# ----------------------------------------------------------
# Variables additionnelles (non-credentials)
# ----------------------------------------------------------
DASHBOARD_URL=https://app.neurolia-immo.fr
ADMIN_EMAIL=support@neurolia.fr
N8N_WF04_WEBHOOK_URL=https://n8n.neurolia-immo.fr/webhook/wf04-cleaning-task
N8N_WF05_WEBHOOK_URL=https://n8n.neurolia-immo.fr/webhook/wf05-auto-message
```

---

## Correspondance avec les Variables Existantes

Les noeuds Config des workflows utilisent les noms de variables suivants (via `$env.XXX`). Voici la correspondance avec les noms N8N_CRED normalises :

| Variable dans Config node | Credential | Variable .env normalisee |
|--------------------------|------------|--------------------------|
| `$env.IMAP_HOST` | CRED-01 | `N8N_CRED_IMAP_HOST` |
| `$env.IMAP_PORT` | CRED-01 | `N8N_CRED_IMAP_PORT` |
| `$env.IMAP_USER` | CRED-01 | `N8N_CRED_IMAP_USER` |
| `$env.IMAP_PASSWORD` | CRED-01 | `N8N_CRED_IMAP_PASSWORD` |
| `$env.SMTP_HOST` | CRED-02 | `N8N_CRED_SMTP_HOST` |
| `$env.SMTP_PORT` | CRED-02 | `N8N_CRED_SMTP_PORT` |
| `$env.SMTP_USER` | CRED-02 | `N8N_CRED_SMTP_USER` |
| `$env.SMTP_PASSWORD` | CRED-02 | `N8N_CRED_SMTP_PASSWORD` |
| `$env.SMTP_FROM_NAME` | CRED-02 | `N8N_CRED_SMTP_FROM_NAME` |
| `$env.SMTP_FROM_EMAIL` | CRED-02 | `N8N_CRED_SMTP_FROM_EMAIL` |
| `$env.SUPABASE_URL` | CRED-03 | `N8N_CRED_SUPABASE_URL` |
| `$env.SUPABASE_SERVICE_KEY` | CRED-03 | `N8N_CRED_SUPABASE_SERVICE_KEY` |
| `$env.N8N_WEBHOOK_API_KEY` | CRED-04 | `N8N_CRED_WEBHOOK_API_KEY` |

> **Note** : Dans les workflows JSON (N04), les noeuds Config utiliseront les noms `$env.XXX` sans le prefixe `N8N_CRED_`. Les noms normalises ci-dessus sont pour la documentation et le fichier `.env.example`. Les deux conventions sont equivalentes — l'important est la coherence au sein du deploiement.

---

## Securite

- **Aucun secret** dans ce fichier ni dans aucun fichier du pipeline
- Les credentials sont configurees directement dans l'interface n8n (Settings > Credentials)
- Les variables d'environnement servent de reference pour le deploiement Docker / Railway
- Utiliser le gestionnaire de secrets de n8n en production (`N8N_CREDENTIALS_OVERWRITE_DATA`)
- La cle `service_role` Supabase (`CRED-03`) contourne le RLS — usage exclusivement serveur
- La cle API webhook (`CRED-04`) doit etre identique cote n8n et cote Next.js (Vercel)
- Les App Passwords Gmail sont recommandes (pas le mot de passe principal du compte)
- Rotation des cles API tous les 6 mois
- HTTPS obligatoire sur tous les endpoints (webhooks, Supabase, IMAP/SMTP TLS)
- `.env` dans `.gitignore` — baser sur `.env.example`

---

## Validation

- [x] Toutes les credentials necessaires sont listees (aucun node authentifie sans CRED-XX)
- [x] Aucun secret, token, ou cle API n'apparait dans le fichier
- [x] Chaque credential a une (ou plusieurs) variable(s) d'environnement nommee(s)
- [x] Les scopes/permissions sont documentes pour chaque credential
- [x] Chaque credential est mappee aux workflows qui l'utilisent

---

*Neurolia-Immo v2.0 — N03 Credential Mapping (mis a jour N06 migration Supabase natif)*
*Genere le : 2026-02-20 — Mis a jour : 2026-02-20*
