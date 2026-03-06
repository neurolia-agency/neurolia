# Variables d'environnement -- n8n Workflows

> Liste complete des variables d'environnement requises par les workflows n8n
> Dashboard Loc Immo | Version : 3.0 (multi-tenant, zero secret en Variable) | Date : 2026-02-13

---

## 0. Architecture multi-tenant

A partir de la v2, l'application supporte **plusieurs proprietaires**. L'email du proprietaire n'est plus une variable d'environnement statique (`OWNER_EMAIL`) mais est **recupere dynamiquement** depuis la base de donnees via la relation `properties.owner_id` → `users.email`.

**Consequence** : La variable `OWNER_EMAIL` n'existe plus. Chaque workflow qui envoie un email au proprietaire effectue un lookup dans la table `users` pour obtenir l'email du bon owner.

### Acces aux variables

Les workflows utilisent un **noeud Code "Config"** au debut de chaque workflow.
Les autres noeuds y accedent via `$('Config').item.json.NOM_VARIABLE`.

Cette approche evite le besoin de `$vars` (plan payant) ou `$env` (partage entre projets).

Voir `fix-env-to-vars.md` pour les details de configuration.

---

## 1. Variables n8n (Settings → Variables)

Ces variables doivent etre configurees dans l'interface n8n (Settings → Variables).

### 1.1 Authentification API

```env
# Cle API pour authentifier les appels aux webhooks Next.js
# Doit correspondre a N8N_WEBHOOK_API_KEY dans le .env de l'application Next.js
# Generer avec : openssl rand -hex 32
N8N_WEBHOOK_API_KEY=

# URL de base du dashboard (sans slash final)
# Utilisee pour construire les URLs des webhooks et les liens dans les emails
DASHBOARD_URL=https://app.locimmo.fr
```

### ~~1.2 Supabase~~ (supprime en v3)

> **Supprime** : `SUPABASE_URL` et `SUPABASE_SERVICE_KEY` ne sont plus necessaires
> dans les Variables n8n. WF02 utilise maintenant le noeud natif Supabase avec le
> credential chiffre `Supabase - Loc Immo`. Les autres workflows (WF03-WF06)
> utilisaient deja le noeud natif Supabase.

### 1.3 Webhooks internes n8n

```env
# URLs des webhooks internes pour le chainage inter-workflows
# WF04 : Creation automatique des taches de menage
N8N_WF04_WEBHOOK_URL=https://n8n.locimmo.fr/webhook/wf04-cleaning-task

# WF05 : Envoi automatique de messages aux voyageurs
N8N_WF05_WEBHOOK_URL=https://n8n.locimmo.fr/webhook/wf05-auto-message
```

### 1.4 Email IMAP (reception)

```env
# Serveur IMAP pour la reception des emails de reservation
# Gmail : imap.gmail.com
# Outlook : outlook.office365.com
# OVH : ssl0.ovh.net
IMAP_HOST=imap.gmail.com

# Port IMAP (993 pour TLS, 143 pour STARTTLS)
IMAP_PORT=993

# Adresse email dediee aux reservations
# Le proprietaire configure le transfert automatique vers cette adresse
IMAP_USER=reservations@locimmo.fr

# Mot de passe de l'application email
# Gmail : Generer un "Mot de passe d'application" dans les parametres Google
#   1. Aller sur https://myaccount.google.com/apppasswords
#   2. Selectionner "Mail" et "Other (Custom name)" -> "n8n Loc Immo"
#   3. Copier le mot de passe genere (16 caracteres sans espaces)
# Outlook : Utiliser le mot de passe du compte ou un App Password
IMAP_PASSWORD=
```

### 1.5 Email SMTP (envoi)

```env
# Serveur SMTP pour l'envoi des emails
# Gmail : smtp.gmail.com
# Outlook : smtp.office365.com
# OVH : ssl0.ovh.net
# Sendgrid : smtp.sendgrid.net
SMTP_HOST=smtp.gmail.com

# Port SMTP (587 pour STARTTLS, 465 pour TLS)
SMTP_PORT=587

# Compte d'envoi des emails
# Peut etre different de l'adresse IMAP
SMTP_USER=noreply@locimmo.fr

# Mot de passe de l'application email d'envoi
# Meme procedure que pour IMAP si on utilise Gmail
SMTP_PASSWORD=

# Nom d'affichage de l'expediteur dans les emails
SMTP_FROM_NAME=Loc Immo

# Adresse email d'expedition (reply-to)
SMTP_FROM_EMAIL=noreply@locimmo.fr
```

### 1.6 Notifications

```env
# Adresse email de l'administrateur technique (Neurolia)
# Recoit : erreurs techniques detaillees (WF00), emails non reconnus (WF01)
ADMIN_EMAIL=dorian@neurolia.fr

# NOTE MULTI-TENANT : La variable OWNER_EMAIL n'existe plus.
# L'email de chaque proprietaire est recupere dynamiquement depuis la table `users`
# via la relation `properties.owner_id` → `users.email`.
# Chaque workflow effectue un lookup automatique pour envoyer au bon proprietaire.
```

---

## 2. Variables d'environnement Next.js

Ces variables sont configurees dans le fichier `.env.local` de l'application Next.js et doivent etre synchronisees avec les variables n8n.

```env
# === Supabase ===
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# === Webhooks n8n ===
# Cle API partagee entre Next.js et n8n
# Doit correspondre a N8N_WEBHOOK_API_KEY dans n8n
N8N_WEBHOOK_API_KEY=cle-secrete-generee

# URL de base de n8n pour appeler les webhooks internes (WF04, WF05, WF06)
# Self-hosted : http://localhost:5678 ou https://n8n.locimmo.fr
# n8n Cloud : https://xxx.app.n8n.cloud
N8N_WEBHOOK_URL=https://n8n.locimmo.fr/webhook

# === App ===
NEXT_PUBLIC_APP_URL=https://app.locimmo.fr
```

---

## 3. Correspondance variables n8n <-> Next.js

| Contexte | Variable n8n | Variable Next.js |
|----------|--------------|------------------|
| API Key webhooks | `N8N_WEBHOOK_API_KEY` | `N8N_WEBHOOK_API_KEY` |
| URL dashboard | `DASHBOARD_URL` | `NEXT_PUBLIC_APP_URL` |
| Supabase URL | Credential `Supabase - Loc Immo` | `NEXT_PUBLIC_SUPABASE_URL` |
| Supabase Service Key | Credential `Supabase - Loc Immo` | `SUPABASE_SERVICE_ROLE_KEY` |
| URL webhooks n8n | `N8N_WF04_WEBHOOK_URL`, `N8N_WF05_WEBHOOK_URL` | `N8N_WEBHOOK_URL` |
| Email proprietaire | ~~`OWNER_EMAIL`~~ (supprime) | — dynamique via DB |

> **Important** : Les valeurs de `N8N_WEBHOOK_API_KEY` doivent etre **identiques** des deux cotes.

---

## 4. Credentials n8n (a configurer dans l'UI)

En plus des variables d'environnement, les credentials suivantes doivent etre creees dans l'interface n8n :

| Nom | Type | Contenu | Utilise par |
|-----|------|---------|-------------|
| `IMAP - Reservations` | IMAP | Host, port, user, password | WF01 |
| `SMTP - Loc Immo` | SMTP | Host, port, user, password | WF00-WF06 |
| `Supabase - Loc Immo` | Supabase | URL + Service Role Key (chiffre) | WF02-WF06 |
| `API Key - Dashboard` | Header Auth | `x-api-key` pour webhooks Next.js | WF01, WF02 |

---

## 5. Generation des secrets

### 5.1 API Key

Generer une cle API securisee :

```bash
# Methode 1 : OpenSSL (recommandee)
openssl rand -hex 32

# Methode 2 : Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Methode 3 : Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

Resultat : une chaine de 64 caracteres hexadecimaux (ex: `a1b2c3d4...`).

### 5.2 Mots de passe d'application Gmail

1. Aller sur https://myaccount.google.com/security
2. Activer la validation en 2 etapes si ce n'est pas deja fait
3. Aller sur https://myaccount.google.com/apppasswords
4. Creer un mot de passe pour "Mail" / "Other" -> nom "n8n Loc Immo"
5. Copier le mot de passe de 16 caracteres (sans espaces)

> **Creer deux mots de passe d'application distincts** : un pour l'IMAP (reception) et un pour le SMTP (envoi), si les comptes sont differents.

---

## 6. Securite

### 6.1 Regles de securite

- **Ne jamais committer** les fichiers `.env` contenant des secrets
- **Rotationner** les cles API tous les 6 mois
- **Service Role Key** : Ne jamais exposer cote client (prefixe `NEXT_PUBLIC_` interdit)
- **Mots de passe d'application** : Plus securises que les mots de passe principaux
- **HTTPS** : Toutes les communications entre n8n et Next.js doivent etre en HTTPS en production

### 6.2 Fichiers a exclure du versionnement

Verifier que le `.gitignore` contient :

```
.env
.env.local
.env.production
.env.*.local
```

---

## 7. Configuration par environnement

### 7.1 Developpement local

```env
DASHBOARD_URL=http://localhost:3000
N8N_WEBHOOK_URL=http://localhost:5678/webhook
SUPABASE_URL=http://localhost:54321  # ou URL Supabase Cloud
```

### 7.2 Staging

```env
DASHBOARD_URL=https://staging.locimmo.fr
N8N_WEBHOOK_URL=https://n8n-staging.locimmo.fr/webhook
```

### 7.3 Production

```env
DASHBOARD_URL=https://app.locimmo.fr
N8N_WEBHOOK_URL=https://n8n.locimmo.fr/webhook
```

---

*Document genere le 2026-02-13 -- Pipeline B04-Automations / Env Variables v3 (multi-tenant, zero secret en Variable)*
