# Etape N03 : Credential Mapping

> **Phase N : Conception & Generation** - Cartographie des credentials necessaires.

## Objectif

Lister toutes les credentials necessaires aux workflows, avec leurs types, scopes, variables d'environnement, et les workflows qui les utilisent. Aucun secret ne doit apparaitre dans les fichiers.

## Input

- `pipeline/output/02-node-configs/` : Configuration detaillee de chaque node
- `pipeline/input/imports/integrations.md` : Services tiers integres et leurs methodes d'authentification

## Instructions

### 1. Inventorier les nodes authentifies

Parcourir tous les fichiers de `02-node-configs/` et identifier chaque node qui necessite une credential :
- Nodes HTTP Request avec `authentication: predefinedCredentialType`
- Nodes de services tiers (Slack, Gmail, Stripe, etc.)
- Nodes OAuth2
- Nodes API Key

### 2. Croiser avec les integrations

Utiliser `integrations.md` pour enrichir chaque credential :
- Methode d'authentification exacte (API Key, OAuth2, Bearer Token, etc.)
- Scopes/permissions necessaires
- URL de base du service

### 3. Definir les variables d'environnement

Pour chaque credential, definir le nom de la variable d'environnement correspondante :
- Convention : `N8N_CRED_[SERVICE]_[TYPE]` (ex: `N8N_CRED_STRIPE_API_KEY`)
- Lister les variables dans un format exploitable pour le `.env`

### 4. Mapper aux workflows

Indiquer quels workflows utilisent chaque credential pour faciliter le deploiement et le debug.

## Output

### `03-credentials/credentials-map.md`

```markdown
# Credentials Map

## Resume

Total : [X] credentials pour [Y] services

## Matrice des Credentials

| ID | Service | Type n8n | Methode Auth | Scopes / Permissions | Var Env | Workflows |
|----|---------|----------|-------------|---------------------|---------|-----------|
| CRED-01 | [Service] | [Type credential n8n] | [API Key / OAuth2 / Bearer / Basic] | [Scopes requis] | `N8N_CRED_[...]` | WF01, WF03 |
| CRED-02 | [Service] | [Type credential n8n] | [Methode] | [Scopes] | `N8N_CRED_[...]` | WF02, SW01 |
| ... | ... | ... | ... | ... | ... | ... |

## Details par Credential

### CRED-01 — [Service] ([Type])

- **Type n8n** : [Type de credential dans n8n]
- **Methode** : [API Key / OAuth2 / etc.]
- **Scopes** : [Liste des permissions requises]
- **Variable d'environnement** : `N8N_CRED_[...]`
- **URL de base** : [URL API du service]
- **Workflows concernes** : WF01, WF03
- **Notes** : [Considerations particulieres]

### CRED-02 — [Service] ([Type])
...

## Variables d'Environnement (.env)

```env
# Credentials n8n — NE PAS COMMITER
# Copier dans .env et remplir les valeurs

# CRED-01: [Service]
N8N_CRED_[...]=

# CRED-02: [Service]
N8N_CRED_[...]=
```

## Securite

- **Aucun secret** dans ce fichier ni dans aucun fichier du pipeline
- Les credentials sont configurees directement dans l'interface n8n
- Les variables d'environnement servent de reference pour le deploiement
- Utiliser le gestionnaire de secrets de n8n en production
```

## Validation

- [ ] Toutes les credentials necessaires sont listees (aucun node authentifie sans CRED-XX)
- [ ] Aucun secret, token, ou cle API n'apparait dans le fichier
- [ ] Chaque credential a une variable d'environnement nommee
- [ ] Les scopes/permissions sont documentes pour chaque credential
- [ ] Chaque credential est mappee aux workflows qui l'utilisent

## Prochaine Etape

Une fois `output/03-credentials/credentials-map.md` cree → Passer a `stages/N04-json-generation.md`

---

**Version** : 1.0
**Phase** : N03 (Conception & Generation)
**Dependances** : N02 (node-configs), imports (integrations.md)
**Produit pour** : N04 (JSON Generation)
