# Integrations Tierces - Neurolia-Immo

## Vue d'Ensemble

| Service | Usage | Priorite | Phase |
|---------|-------|----------|-------|
| Supabase | BDD + Auth + Realtime + Storage + Edge Functions | MVP | A04 |
| n8n (self-hosted) | Orchestration automations (email parsing, iCal sync, taches, notifications) | MVP | A04 |
| iCal Feeds (Airbnb/Booking) | Ingestion reservations en lecture seule | MVP | A04 |
| IMAP (email proprietaire) | Parsing emails de confirmation/modification/annulation | MVP | A04 |
| SMTP (email sortant) | Envoi emails (bienvenue, digest, guests, alertes) | MVP | A04 |
| Vercel | Hebergement Next.js (frontend + API routes) | MVP | A05 |
| Web Push API | Notifications push navigateur/mobile | Phase 2 | - |
| Apple Sign-In | OAuth iOS (requis App Store) | Phase 2 | - |

---

## Supabase

### Configuration

- **URL** : `https://<project-ref>.supabase.co`
- **Auth** : JWT via `anon` key (client) + `service_role` key (serveur/n8n)
- **Documentation** : https://supabase.com/docs

### Services Utilises

| Service | Usage dans l'app | Feature |
|---------|-----------------|---------|
| PostgreSQL | Base de donnees principale (13 tables) | Toutes |
| Auth | Magic Link + OAuth Google + gestion sessions JWT | F01 |
| Row Level Security (RLS) | Isolation multi-tenant par owner_id | F09 |
| Realtime | Subscriptions temps reel (tasks, notifications, reservations) | F06, F07, F10 |
| Storage | Photos taches, avatars, assets livrets, QR codes | F07, F11 |
| Edge Functions | Logique serveur (invitations, livret public, batch operations) | F01, F11 |
| Database Webhooks (pg_net) | Declenchement webhooks n8n sur INSERT/UPDATE | F03, F04, F10 |

### Buckets Storage

| Bucket | Acces | Usage | Feature |
|--------|-------|-------|---------|
| `task-photos` | Prive (RLS) | Photos d'intervention staff | F07 |
| `avatars` | Prive (RLS) | Photos de profil | F01 |
| `welcome-guides` | Public (si publie) | Assets livrets d'accueil | F11 |
| `qr-codes` | Public | QR codes generes | F11 |

### Variables d'Environnement

```env
# Client (expose au navigateur)
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Serveur uniquement (Next.js API routes)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## n8n (Self-Hosted)

### Configuration

- **URL** : `https://n8n.neurolia-immo.fr`
- **Auth** : Basic Auth (UI) + API Key (webhooks)
- **Hebergement** : VPS ou Railway (Docker)
- **Documentation** : https://docs.n8n.io

### Workflows

| ID | Nom | Trigger | Frequence | Feature |
|----|-----|---------|-----------|---------|
| WF01 | Email Parser | IMAP Trigger | Toutes les 2 min | F04 |
| WF02 | iCal Sync | Schedule | Toutes les 30 min | F03 |
| WF03 | Daily Notifications | Schedule | 7h (staff) + 8h (owner) | F10 |
| WF04 | Cleaning Tasks | Webhook (depuis WF01) | A la demande | F12 |
| WF05 | Auto Messages | Webhook + Schedule | A la demande + 10h + 14h | F10 |
| WF06 | Pre-arrival Form | Webhook (depuis App) | A la demande | F11 |

### Credentials n8n

| Credential | Type | Usage |
|------------|------|-------|
| IMAP - Reservations | IMAP | Lecture boite email proprietaire |
| SMTP - Loc Immo | SMTP | Envoi emails sortants |
| Supabase - Loc Immo | Header Auth | Acces Supabase via service_role |
| API Key - Dashboard | Header Auth | Validation webhooks app ↔ n8n |

### Variables d'Environnement (n8n)

```env
# Webhooks
N8N_WEBHOOK_API_KEY=<64-hex-chars>
DASHBOARD_URL=https://app.neurolia-immo.fr

# Inter-workflows
N8N_WF04_WEBHOOK_URL=https://n8n.neurolia-immo.fr/webhook/wf04-cleaning-task
N8N_WF05_WEBHOOK_URL=https://n8n.neurolia-immo.fr/webhook/wf05-auto-message

# IMAP
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=reservations@locimmo.fr
IMAP_PASSWORD=<app-password>

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=reservations@locimmo.fr
SMTP_PASSWORD=<app-password>
SMTP_FROM_NAME=Neurolia-Immo
SMTP_FROM_EMAIL=reservations@locimmo.fr

# Admin
ADMIN_EMAIL=support@neurolia.fr
```

---

## iCal Feeds (Airbnb / Booking)

### Configuration

- **Protocole** : HTTPS (lecture seule)
- **Format** : iCalendar RFC 5545 (.ics)
- **Auth** : Aucune (URLs avec token integre, generes par les plateformes)
- **Documentation** : Specifique a chaque plateforme (panneau hote)

### Endpoints Utilises

| Plateforme | URL Type | Contenu | Feature |
|------------|----------|---------|---------|
| Airbnb | `https://www.airbnb.com/calendar/ical/{listing_id}.ics?s={secret}` | Evenements VEVENT avec dates, nom guest, statut | F03 |
| Booking | `https://admin.booking.com/hotel/hoteladmin/ical.html?t={token}` | Evenements VEVENT avec dates, reference, statut | F03 |

### Donnees Extraites (par VEVENT)

| Champ iCal | Champ App | Description |
|------------|-----------|-------------|
| DTSTART (VALUE=DATE) | check_in | Date d'arrivee (format YYYYMMDD) |
| DTEND (VALUE=DATE) | check_out | Date de depart (format YYYYMMDD) |
| SUMMARY | guest_name | Nom du voyageur (ou "Not available" si bloque) |
| UID | ical_uid | Identifiant unique de l'evenement |
| DESCRIPTION | (enrichissement) | Details supplementaires (reference, nb guests) |

### Limitations

- Lecture seule (pas d'ecriture vers les plateformes)
- Mise a jour non instantanee (delai de propagation 5-30 min)
- Donnees basiques (pas de montant, pas d'email guest, pas de nb guests fiable)
- Format varie entre Airbnb et Booking (parsing specifique requis)
- URLs expirent parfois (necessitent regeneration manuelle par le proprietaire)

### Stockage

Les URLs iCal sont stockees dans la table `properties` :
- `ical_airbnb_url` : URL iCal Airbnb
- `ical_booking_url` : URL iCal Booking

---

## IMAP (Email Proprietaire)

### Configuration

- **Protocole** : IMAP over SSL/TLS (port 993)
- **Auth** : App Password (Gmail) ou mot de passe standard
- **Polling** : Toutes les 2 minutes (WF01)
- **Documentation** : https://support.google.com/mail/answer/7126229

### Providers Supportes

| Provider | IMAP Host | Port | Notes |
|----------|-----------|------|-------|
| Gmail | `imap.gmail.com` | 993 | Necessite App Password (2FA active) |
| Outlook | `outlook.office365.com` | 993 | Mot de passe standard ou OAuth2 |
| Yahoo | `imap.mail.yahoo.com` | 993 | App Password |
| OVH | `ssl0.ovh.net` | 993 | Mot de passe standard |

### Donnees Extraites (par email)

| Email Type | Champs Extraits | Pattern Detection |
|------------|----------------|-------------------|
| Confirmation Airbnb | guest_name, check_in, check_out, nb_guests, amount, platform_ref_id, property_name | Expediteur @airbnb.com, sujet contient "reservation confirmee" |
| Confirmation Booking | guest_name, check_in, check_out, nb_guests, amount, platform_ref_id | Expediteur @booking.com, sujet contient "nouvelle reservation" |
| Modification | dates modifiees, montant modifie | Sujet contient "modifie" / "modification" |
| Annulation | platform_ref_id, motif | Sujet contient "annul" / "cancellation" |

### Limitations

- Parsing regex dependant du format des emails (fragile si Airbnb/Booking change le template)
- Pas d'acces aux messages internes des plateformes (chat in-app)
- Pas d'acces aux emails directs des voyageurs
- Delai IMAP : polling toutes les 2 min (pas de push)
- Phase 2 : LLM fallback pour les emails non parses par regex

### Securite

- Credentials IMAP stockees uniquement dans n8n (variables d'environnement)
- Jamais dans la base de donnees Supabase
- App Passwords recommandees (pas le mot de passe principal)
- Configuration par le owner dans les parametres de l'app (host + email stockes en base, mot de passe en variable n8n)

---

## SMTP (Email Sortant)

### Configuration

- **Protocole** : SMTP over TLS (port 587)
- **Auth** : App Password (meme compte que IMAP)

### Types d'Emails Envoyes

| Type | Destinataire | Trigger | Template | Workflow |
|------|-------------|---------|----------|----------|
| Bienvenue Owner | Owner | Inscription | Personnalise | WF03 |
| Bienvenue Staff | Staff | Invitation acceptee | Personnalise | WF03 |
| Invitation Staff | Email invite | Owner invite | Lien d'invitation | WF03 |
| Planning Jour | Staff | Cron 7h | Liste taches du jour | WF03 |
| Digest Quotidien | Owner | Cron 8h | Resume + alertes | WF03 |
| Alerte Anomalie | Owner | Anomalie detectee | Detail anomalie | WF02/WF03 |
| Alerte Issue | Owner | Signalement staff | Description + photo | WF03 |
| Confirmation Guest | Guest | Reservation creee | Confirmation + welcome link | WF05 |
| Pre-arrivee Guest | Guest | J-1 a 10h | Infos pratiques + formulaire | WF05 |
| Post-depart Guest | Guest | J+0 a 14h | Remerciement | WF05 |

### Variables d'Environnement

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=reservations@locimmo.fr
SMTP_PASSWORD=<app-password>
SMTP_FROM_NAME=Neurolia-Immo
SMTP_FROM_EMAIL=reservations@locimmo.fr
```

---

## Vercel (Hebergement)

### Configuration

- **URL** : `https://app.neurolia-immo.fr`
- **Framework** : Next.js 15+
- **Runtime** : Node.js (API Routes) + Edge (middleware)
- **Documentation** : https://vercel.com/docs

### Services Utilises

| Service | Usage | Feature |
|---------|-------|---------|
| Hosting | Deploiement Next.js (SSR + Static) | Toutes |
| API Routes | Endpoints webhook `/api/webhooks/n8n/*` | F03, F04, F05 |
| Edge Middleware | Auth check, CORS, webhook validation | F01, F09 |
| Analytics | Performance monitoring (optionnel) | - |

### Variables d'Environnement (Vercel)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# n8n
N8N_WEBHOOK_API_KEY=<64-hex-chars>
N8N_WEBHOOK_URL=https://n8n.neurolia-immo.fr

# App
NEXT_PUBLIC_APP_URL=https://app.neurolia-immo.fr
```

---

## Web Push API (Phase 2)

### Configuration Prevue

- **Standard** : Web Push Protocol (RFC 8030)
- **Service Worker** : Enregistrement cote client
- **Serveur** : web-push library (Node.js) via Edge Function Supabase

### Stockage Tokens

- Champ `push_token` dans table `profiles`
- Mis a jour a chaque connexion / changement de device

### Notifications Push Prevues

| Event | Destinataire | Contenu |
|-------|-------------|---------|
| Nouvelle reservation | Owner | "Nouvelle reservation : {guest_name} du {check_in} au {check_out}" |
| Tache assignee | Staff | "Nouvelle tache : {type} a {property_name}" |
| Tache terminee | Owner | "Menage termine : {property_name}" |
| Anomalie | Owner | "Alerte : {anomaly_type} sur {property_name}" |
| Signalement | Owner | "Probleme signale : {issue_type} a {property_name}" |

---

## Variables d'Environnement (Resume)

### Next.js (Vercel)

```env
# Supabase (client)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase (serveur)
SUPABASE_SERVICE_ROLE_KEY=

# n8n (serveur)
N8N_WEBHOOK_API_KEY=
N8N_WEBHOOK_URL=

# App
NEXT_PUBLIC_APP_URL=
```

### n8n (Self-Hosted)

```env
# Auth
N8N_WEBHOOK_API_KEY=
DASHBOARD_URL=

# Inter-workflows
N8N_WF04_WEBHOOK_URL=
N8N_WF05_WEBHOOK_URL=

# IMAP
IMAP_HOST=
IMAP_PORT=
IMAP_USER=
IMAP_PASSWORD=

# SMTP
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_NAME=
SMTP_FROM_EMAIL=

# Admin
ADMIN_EMAIL=
```

### Correspondance Cles Partagees

| Variable | Next.js | n8n | Description |
|----------|---------|-----|-------------|
| API Key Webhook | `N8N_WEBHOOK_API_KEY` | `N8N_WEBHOOK_API_KEY` | Doit etre identique des deux cotes |
| Supabase service_role | `SUPABASE_SERVICE_ROLE_KEY` | Via credential "Supabase - Loc Immo" | Meme cle, stockage different |
| App URL | `NEXT_PUBLIC_APP_URL` | `DASHBOARD_URL` | Meme URL, nom different |

### Generation des Secrets

```bash
# API Key (64 hex chars)
openssl rand -hex 32

# Ou via Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Regles de Securite

- Jamais de secrets dans le code source ou le repo Git
- `service_role` key exclusivement cote serveur (Next.js API routes + n8n)
- `anon` key uniquement cote client (protegee par RLS)
- Rotation des API keys tous les 6 mois
- App Passwords plutot que mots de passe principaux pour IMAP/SMTP
- HTTPS obligatoire partout
- `.env.local` dans `.gitignore` (base sur `.env.example`)

---

### Configuration par Environnement

| Variable | Dev | Staging | Production |
|----------|-----|---------|------------|
| NEXT_PUBLIC_APP_URL | `http://localhost:3000` | `https://staging.neurolia-immo.fr` | `https://app.neurolia-immo.fr` |
| DASHBOARD_URL | `http://localhost:3000` | `https://staging.neurolia-immo.fr` | `https://app.neurolia-immo.fr` |
| N8N_WEBHOOK_URL | `http://localhost:5678` | `https://n8n-staging.neurolia-immo.fr` | `https://n8n.neurolia-immo.fr` |
| SUPABASE_URL | Projet Supabase dev | Projet Supabase staging | Projet Supabase prod |

---

*Derniere mise a jour : 2026-02-19*
