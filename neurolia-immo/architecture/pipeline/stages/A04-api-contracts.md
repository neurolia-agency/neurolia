# Etape A04 : API & Integrations

> **Phase A : Architecture** - Definition des contrats API, webhooks n8n et integrations tierces.

## Objectif

Definir les endpoints REST/GraphQL, mapper les webhooks n8n, et lister les integrations tierces avec leurs contrats d'interface.

## Skill

`app-data-architect` (scope etendu)

## Input

- `pipeline/output/03-data/data-model.md`
- `pipeline/output/01-brief/features.md`
- `pipeline/output/02-user-flows/` (tous les fichiers)

## Output

Creer 3 fichiers dans `pipeline/output/04-api/` :

### 1. api-contracts.md

```markdown
# API Contracts - [Nom du Projet]

## Configuration

| Element | Valeur |
|---------|--------|
| Base URL | `https://api.[domain].com/v1` |
| Format | REST / JSON |
| Auth | Bearer Token (JWT) |
| Versioning | URL path (`/v1/`) |
| Rate Limiting | 100 req/min (user), 1000 req/min (admin) |

## Conventions

- **Nommage** : kebab-case pour les URLs, camelCase pour les champs JSON
- **Pagination** : `?page=1&limit=20` → `{ data: [], meta: { page, limit, total } }`
- **Erreurs** : `{ error: { code: "ERROR_CODE", message: "Description" } }`
- **Dates** : ISO 8601 (`2026-02-19T10:30:00Z`)

## Endpoints

### Auth

#### POST /auth/register
Creer un nouveau compte utilisateur.

**Body** :
```json
{
  "email": "string (required)",
  "password": "string (required, min 8)",
  "display_name": "string (required)"
}
```

**Response 201** :
```json
{
  "data": {
    "user": { "id": "uuid", "email": "string", "display_name": "string" },
    "access_token": "string",
    "refresh_token": "string"
  }
}
```

**Errors** : `409 EMAIL_ALREADY_EXISTS`, `422 VALIDATION_ERROR`

#### POST /auth/login
Authentifier un utilisateur existant.

**Body** :
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response 200** :
```json
{
  "data": {
    "user": { "id": "uuid", "email": "string", "display_name": "string", "role": "string" },
    "access_token": "string",
    "refresh_token": "string"
  }
}
```

**Errors** : `401 INVALID_CREDENTIALS`, `429 TOO_MANY_ATTEMPTS`

#### POST /auth/refresh
Renouveler le token d'acces.

**Body** :
```json
{
  "refresh_token": "string (required)"
}
```

**Response 200** :
```json
{
  "data": {
    "access_token": "string",
    "refresh_token": "string"
  }
}
```

**Errors** : `401 INVALID_REFRESH_TOKEN`

#### POST /auth/logout
Revoquer les tokens.

**Headers** : `Authorization: Bearer {access_token}`

**Response 204** : No content

### Users

#### GET /users/me
Recuperer le profil de l'utilisateur connecte.

**Headers** : `Authorization: Bearer {access_token}`

**Response 200** :
```json
{
  "data": {
    "id": "uuid",
    "email": "string",
    "display_name": "string",
    "avatar_url": "string | null",
    "role": "string",
    "preferences": {},
    "created_at": "ISO 8601"
  }
}
```

#### PATCH /users/me
Mettre a jour le profil.

**Headers** : `Authorization: Bearer {access_token}`

**Body** :
```json
{
  "display_name": "string (optional)",
  "avatar_url": "string (optional)",
  "preferences": "object (optional)"
}
```

**Response 200** : Profil mis a jour

### [Entity] (a adapter selon le projet)

#### GET /[entities]
Lister les [entities] avec pagination et filtres.

**Headers** : `Authorization: Bearer {access_token}`
**Query** : `?page=1&limit=20&status=active&sort=created_at:desc`

**Response 200** :
```json
{
  "data": [],
  "meta": { "page": 1, "limit": 20, "total": 42 }
}
```

#### GET /[entities]/:id
Recuperer une [entity] par ID.

#### POST /[entities]
Creer une nouvelle [entity].

#### PATCH /[entities]/:id
Mettre a jour une [entity].

#### DELETE /[entities]/:id
Supprimer une [entity].

[Repeter pour chaque entite du data model]

## Mapping Features → Endpoints

| Feature | Endpoints |
|---------|-----------|
| F01 | POST /auth/register, POST /auth/login |
| F02 | GET /users/me, PATCH /users/me |
| F03 | CRUD /[entities] |
| ... | ... |
```

### 2. webhook-map.md

```markdown
# Webhook Map - [Nom du Projet]

## Configuration n8n

| Element | Valeur |
|---------|--------|
| n8n Instance | `https://n8n.[domain].com` |
| Auth Webhook | Header `X-Webhook-Secret: {secret}` |
| Format Payload | JSON |
| Retry Policy | 3 tentatives, backoff exponentiel |

## Webhooks

| Webhook | Trigger | Methode | URL | Payload | Workflow n8n |
|---------|---------|---------|-----|---------|-------------|
| user-registered | Apres inscription reussie | POST | `/webhooks/user-registered` | `{ user_id, email, display_name, registered_at }` | Email bienvenue + Notification admin |
| user-login | Apres connexion | POST | `/webhooks/user-login` | `{ user_id, login_at, device }` | Analytics + Detection anomalie |
| [entity]-created | Apres creation [entity] | POST | `/webhooks/[entity]-created` | `{ [entity]_id, user_id, data, created_at }` | Notification + Sync externe |
| [entity]-updated | Apres modification [entity] | POST | `/webhooks/[entity]-updated` | `{ [entity]_id, user_id, changes, updated_at }` | Sync externe |
| [entity]-deleted | Apres suppression [entity] | POST | `/webhooks/[entity]-deleted` | `{ [entity]_id, user_id, deleted_at }` | Cleanup + Notification |
| error-critical | Erreur critique detectee | POST | `/webhooks/error-critical` | `{ error_code, message, user_id, context, timestamp }` | Alerte equipe technique |
| daily-report | Cron quotidien | GET | `/webhooks/daily-report` | - | Generation rapport + Email admin |

## Diagramme de Flux

```
App Mobile                      API Backend                    n8n
    │                               │                           │
    ├── POST /auth/register ──────→ │                           │
    │                               ├── Webhook ──────────────→ │
    │                               │   user-registered         ├── Email bienvenue
    │                               │                           ├── Notification admin
    │                               │                           │
    ├── POST /[entities] ─────────→ │                           │
    │                               ├── Webhook ──────────────→ │
    │                               │   [entity]-created        ├── Notification
    │                               │                           ├── Sync CRM
    │                               │                           │
    │                               │      Cron quotidien ────→ │
    │                               │                           ├── Rapport PDF
    │                               │                           └── Email admin
```

## Securite Webhooks

- Tous les webhooks incluent le header `X-Webhook-Secret`
- Payloads signes avec HMAC-SHA256 (header `X-Webhook-Signature`)
- IPs source restreintes au backend
- Timestamps inclus pour eviter les replays (fenetre de 5 minutes)
```

### 3. integrations.md

```markdown
# Integrations Tierces - [Nom du Projet]

## Vue d'Ensemble

| Service | Usage | Priorite | Etape |
|---------|-------|----------|-------|
| [Service 1] | [Usage] | MVP | A04 |
| [Service 2] | [Usage] | MVP | A04 |
| [Service 3] | [Usage] | Phase 2 | - |

## [Service 1] - [Nom]

### Configuration
- **URL** : `https://api.[service].com/v1`
- **Auth** : API Key / OAuth2
- **Documentation** : [URL docs]

### Endpoints Utilises
| Endpoint | Usage dans l'app | Feature |
|----------|-----------------|---------|
| `GET /[resource]` | [Description] | F0X |
| `POST /[resource]` | [Description] | F0X |

### Variables d'Environnement
```
[SERVICE]_API_KEY=
[SERVICE]_API_URL=
[SERVICE]_WEBHOOK_SECRET=
```

## [Service 2] - [Nom]
[Meme structure]

## Variables d'Environnement (Resume)

```env
# Auth
JWT_SECRET=
JWT_REFRESH_SECRET=

# Base de donnees
DATABASE_URL=

# n8n
N8N_WEBHOOK_SECRET=
N8N_BASE_URL=

# Services tiers
[SERVICE_1]_API_KEY=
[SERVICE_2]_API_KEY=

# Push Notifications
PUSH_NOTIFICATION_KEY=
```
```

## Instructions

1. **Lire** le data model (`03-data/data-model.md`) pour identifier les entites et operations
2. **Lire** les features (`01-brief/features.md`) pour mapper les endpoints
3. **Lire** les user flows (`02-user-flows/`) pour identifier les transitions declenchant des webhooks
4. **Definir les endpoints REST** :
   - CRUD pour chaque entite du data model
   - Endpoints d'authentification (register, login, refresh, logout)
   - Conventions (pagination, erreurs, dates)
5. **Mapper les webhooks n8n** :
   - Chaque evenement metier = 1 webhook potentiel
   - Definir trigger, payload et workflow n8n associe
   - Documenter le flux app → API → n8n
6. **Lister les integrations tierces** :
   - Endpoints utilises par service
   - Configuration et variables d'environnement
   - Mapping vers les features

## Validation

- [ ] Endpoints auth complets (register, login, refresh, logout)
- [ ] CRUD pour chaque entite du data model
- [ ] Conventions API documentees (pagination, erreurs, dates)
- [ ] Mapping features → endpoints complet
- [ ] Au moins 3 webhooks n8n identifies
- [ ] Chaque webhook a un trigger, payload et workflow defini
- [ ] Diagramme de flux app → API → n8n present
- [ ] Securite webhooks documentee
- [ ] Integrations tierces listees avec config
- [ ] Variables d'environnement resumees
- [ ] Aucun placeholder `[texte]` restant dans les outputs

## Prochaine Etape

Une fois `pipeline/output/04-api/` complet → Passer a `stages/A05-tech-stack.md`

Note : A03 et A04 peuvent etre executes en parallele. A05 depend principalement de A01.

---

**Version** : 1.0
**Phase** : A04 (Architecture)
**Dependances** : A01 (Features), A02 (User Flows), A03 (Data Model)
**Produit pour** : app-n8n-template (webhook-map.md, api-contracts.md)
