---
name: app-data-architect
description: Concoit le data model, auth strategy, API contracts et webhook map pour application mobile
argument-hint: "<A03|A04> <chemin-vers-inputs/>"
---

<objective>
Concevoir l'architecture de donnees complete pour une application mobile : modele de donnees (tables, relations, types), strategie d'authentification (methodes, roles, permissions), contrats API (REST endpoints), mapping webhooks n8n, et integrations tierces. Ce skill couvre les etapes A03 (Data Architecture) et A04 (API & Integrations) du pipeline.
</objective>

<quick_start>
**Usage via APEX (A03 - Data Architecture) :**

```bash
/apex -a -s executer A03-data-architecture depuis pipeline/stages/A03-data-architecture.md
```

**Usage via APEX (A04 - API & Integrations) :**

```bash
/apex -a -s executer A04-api-contracts depuis pipeline/stages/A04-api-contracts.md
```
</quick_start>

<inputs>

### Pour A03 (Data Architecture)
| Fichier | Requis | Description |
|---------|--------|-------------|
| `pipeline/output/01-brief/features.md` | Oui | Features priorisees |
| `pipeline/output/02-user-flows/` | Oui | Tous les flows et navigation map |

### Pour A04 (API & Integrations)
| Fichier | Requis | Description |
|---------|--------|-------------|
| `pipeline/output/03-data/data-model.md` | Oui | Schema de donnees |
| `pipeline/output/01-brief/features.md` | Oui | Features priorisees |
| `pipeline/output/02-user-flows/` | Oui | Flows avec points de contact n8n |

</inputs>

<outputs>

### A03 : Data Architecture

#### data-model.md
- **Vue d'ensemble** : diagramme ASCII des entites et relations
- **Tables/Collections** : pour chaque entite, tableau champ/type/requis/description + index + features associees
- **Relations** : tableau table A/relation/table B/description
- **Enums** : pour chaque champ a valeurs fixes
- **Donnees Offline** : tableau table/sync strategy/priorite
- **Mapping Features → Donnees** : tableau feature/tables/operations

#### auth-strategy.md
- **Methodes d'authentification** : principale + secondaires avec justification
- **Roles & Permissions** : matrice action/role + regles metier
- **Flow d'authentification** : diagramme ASCII du flux complet
- **Gestion des tokens** : type, duree, stockage, renouvellement, revocation
- **Securite** : checklist des mesures

### A04 : API & Integrations

#### api-contracts.md
- **Configuration** : base URL, format, auth, versioning, rate limiting
- **Conventions** : nommage, pagination, erreurs, dates
- **Endpoints** : pour chaque entite, CRUD complet avec body/response/errors
- **Mapping Features → Endpoints** : tableau feature/endpoints

#### webhook-map.md
- **Configuration n8n** : instance, auth, format, retry
- **Webhooks** : tableau webhook/trigger/methode/URL/payload/workflow
- **Diagramme de flux** : app → API → n8n
- **Securite webhooks** : header secret, HMAC, IPs, timestamps

#### integrations.md
- **Vue d'ensemble** : tableau service/usage/priorite/etape
- **Detail par service** : config, endpoints utilises, variables d'env
- **Resume variables d'environnement** : toutes les env vars du projet

</outputs>

<workflow>

### A03 : Data Architecture (3 etapes)

#### Etape 1 : Identifier les entites
- Lire `features.md` : chaque feature implique des donnees
- Lire les user flows : chaque action CRUD revele une entite
- Lister toutes les entites avec leurs champs

#### Etape 2 : Concevoir le schema
- Definir les tables avec champs, types et contraintes
- Etablir les relations (1:1, 1:N, N:M avec tables de jointure)
- Creer les enums pour les champs a valeurs fixes
- Definir les index pour les requetes frequentes
- Mapper les features aux tables (operations CRUD)

#### Etape 3 : Definir l'authentification
- Choisir la methode principale (email/password, OAuth, magic link)
- Definir les roles et la matrice de permissions
- Documenter la gestion des tokens (JWT, duree, stockage securise)
- Lister les mesures de securite

### A04 : API & Integrations (3 etapes)

#### Etape 4 : Definir les endpoints API
- CRUD pour chaque entite du data model
- Endpoints d'authentification (register, login, refresh, logout)
- Conventions (pagination, erreurs, dates, nommage)

#### Etape 5 : Mapper les webhooks n8n
- Identifier chaque evenement metier declenchant un webhook
- Definir le payload (donnees envoyees a n8n)
- Decrire le workflow n8n associe
- Documenter la securite (header secret, HMAC)

#### Etape 6 : Lister les integrations
- Documenter chaque service tiers (config, endpoints, env vars)
- Produire le resume de toutes les variables d'environnement

</workflow>

<constraints>
- **Offline-first** : si le PRD mentionne le mode offline, definir la strategie de sync pour chaque table (cache-first, sync-on-connect, online-only)
- **Token refresh** : toujours prevoir le renouvellement silencieux des tokens avant expiration
- **API caching** : identifier les endpoints pouvant beneficier de cache (GET sur listes stables)
- **Stockage securise** : tokens dans Keychain (iOS) / Keystore (Android) / httpOnly cookie (PWA)
- **Rate limiting** : definir des limites par role (user vs admin)
- **Webhook idempotence** : chaque webhook doit inclure un ID unique pour eviter le double-traitement
- **Pas de code** : output = documentation uniquement
- **Tech-agnostique** : ne pas presumer de la stack (decrite en termes generiques)
</constraints>

<quality_gates>

### A03 : Data Architecture
- [ ] Toutes les entites identifiees depuis les features
- [ ] Chaque table a un id, created_at, updated_at
- [ ] Relations documentees avec cardinalite
- [ ] Index definis pour les requetes frequentes
- [ ] Enums documentes pour les champs a valeurs fixes
- [ ] Strategie offline definie (si applicable)
- [ ] Mapping features → tables complet
- [ ] Methode d'auth principale justifiee
- [ ] Matrice de permissions complete
- [ ] Gestion des tokens documentee
- [ ] Mesures de securite listees

### A04 : API & Integrations
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

</quality_gates>
