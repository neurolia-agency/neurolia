# B04 — Automations : n8n Workflows

## Objectif

Configurer les workflows n8n et les API routes webhook pour connecter le dashboard aux systemes externes.

## Inputs

- `pipeline/output/03-structure/workflow-map.md` — triage features + specs workflows (**input principal**)
- `pipeline/output/03-structure/webhook-map.md` — contrats webhook (endpoints API)
- `pipeline/output/03-structure/integrations.md` — specs techniques integrations externes
- `pipeline/output/01-brief/features.md` — features PRD (cross-check)
- `n8n-workflows/README.md` — conventions n8n
- `.claude/rules/api-patterns.md` — patterns API routes

## Agent

**`integration-builder`** (sonnet, opus pour auth webhook)

## Processus

### 1. Verification et Inventaire Workflows

#### 1.1 Cross-check PRD → Workflow Map

Avant toute implementation, ouvrir `features.md` et `workflow-map.md` cote a cote. Verifier :

- [ ] Chaque feature Must Have et Should Have du PRD apparait dans le tableau de triage du workflow-map
- [ ] Aucune feature marquee "n8n requis" ou "Hybride" n'a ete oubliee dans les specs workflows
- [ ] Les workflows documentes couvrent tous les besoins identifies (collecte, traitement, notification, sync)
- [ ] Les endpoints App des specs workflow sont bien presents dans le webhook-map

**Si des ecarts sont detectes** : corriger le `workflow-map.md` AVANT de continuer. Ne pas implementer un workflow incomplet.

#### 1.2 Inventaire consolide

A partir du workflow-map, consolider l'inventaire final des workflows a implementer :

| WF | Nom | Feature source | Type | Trigger | Priorite |
|----|-----|---------------|------|---------|----------|
| WF00 | Gestionnaire d'erreurs | Transversal | Error handling | Error Trigger | Must |
| WF01 | [Nom] | F0X — [Feature] | [Collecte/Traitement/Notification/Sync/Orchestrateur] | [Trigger] | [Must/Should] |
| ... | ... | ... | ... | ... | ... |

> **Regle** : L'inventaire doit correspondre exactement aux workflows documentes dans le workflow-map. Pas de workflow invente ici, pas de workflow oublie.

### 2. API Routes (Webhooks entrants)

Pour chaque webhook n8n → App, creer une API route :

```
src/app/api/webhooks/[provider]/route.ts
```

**Pattern** (voir `.claude/rules/api-patterns.md`) :
1. Valider `x-webhook-secret`
2. Valider body avec zod
3. Traiter (upsert Supabase via admin client)
4. Repondre `{ success: true }`

### 3. Documentation n8n (enrichie pour Batch G)

Pour chaque workflow, creer un fichier dans `n8n-workflows/` avec le **format enrichi** ci-dessous. Ce format inclut le detail des nodes n8n, ce qui permet au `n8n-workflow-builder` (Batch G) de generer les JSON importables.

```markdown
# WF0X — [Nom du workflow en francais]

## Statut
[En developpement / Actif / Deprecie]

## Trigger
- Type : [Schedule / Webhook / IMAP / Error Trigger / Sub-workflow]
- Frequence : [*/Xmin / Temps reel / HH:MM]
- URL (si webhook) : `https://[n8n-url]/webhook/[path]`

## Description
[Ce que fait ce workflow en 2-3 phrases]

## Pattern
[Webhook Processing / HTTP API Integration / Database Operations / AI Agent Workflow / Scheduled Tasks]
> Derive de la section "Architecture n8n" du workflow-map (A03)

## Nodes

| # | Nom (francais) | Type n8n | Operation | Parametres cles | Expressions |
|---|----------------|----------|-----------|-----------------|-------------|
| 1 | [Verbe + description] | [n8n-nodes-base.XXX] | [operation] | [champs requis] | [expressions {{ }}] |
| 2 | ... | ... | ... | ... | ... |

> **Regles** :
> - Noms en francais, verbe a l'infinitif (Recuperer, Verifier, Envoyer...)
> - Types n8n exacts (pas de noms generiques)
> - Parametres cles = champs requis pour l'operation choisie
> - Expressions = champs utilisant `={{ }}` avec le chemin complet

### Code nodes (si applicable)

Pour chaque Code node, documenter le code JavaScript :

```javascript
// Node "[Nom du node]" — Mode : [Run Once for All Items / Run Once for Each Item]
// Description : [ce que fait ce code]

const items = $input.all();
// ... logique ...
return [{ json: { /* ... */ } }];
```

### Connexions

```
[Node 1] → [Node 2] → [Node 3]
                    └→ [Node 4] (si branchement)
```

## Sticky Notes

| # | Titre | Nodes couverts | Contenu (resume) |
|---|-------|---------------|------------------|
| 1 | [Phase 1] | [Node 1, Node 2] | [Ce que font ces nodes] |
| 2 | [Phase 2] | [Node 3, Node 4] | [Ce que font ces nodes] |

## Donnees

### Input
```json
{
  "field": "type — description"
}
```

### Output / Effets
- Table Supabase : `[table].[colonne]` — [Insert/Upsert/Update]
- Email : [destinataire] — [template]
- Webhook : `[url]` — [body]
- Revalidation Next.js : `[path]`

## Dependances
- **Credentials** : [liste avec noms CRED-XX]
- **Workflows appeles** : [WF0X / SW0X]
- **Workflows appelants** : [WF0X]
- **API routes** : [POST /api/webhooks/...]

## Error Handling
- Utilise WF00 (Error Handler)
- Fallback : [comportement si echec]
- Retry : [oui/non, combien]

## Test
```bash
curl -X POST [url] \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: $WEBHOOK_SECRET" \
  -d '{ [body] }'

# Reponse attendue : 200 { "success": true }
```

## Patch Notes
| Date | Type | Description |
|------|------|-------------|
| [DATE] | Creation | Version initiale |
```

> **Important** : Le niveau de detail des nodes (types, operations, parametres, expressions) est ce qui differencie une documentation "utile pour Batch G" d'une documentation "generique". Plus le tableau Nodes est precis, plus la generation JSON sera fiable.

### 4. Emails Transactionnels

Si des emails sont prevus :

| Email | Trigger | Destinataire | Template | Agent design | Agent wiring |
|-------|---------|-------------|----------|--------------|--------------|
| [Nom] | [Evenement] | [Role] | [Description contenu] | `dashboard-ui-builder` | `integration-builder` |

**Processus en 2 etapes** :

1. **Design HTML** (`dashboard-ui-builder` + skills `dashboard-email-design` + `dashboard-email-templates`) :
   - Remplir le brief email (skill `dashboard-email-design`, section 1)
   - Rediger le contenu textuel et le faire valider AVANT le HTML
   - Extraire les tokens CSS de `globals.css` et convertir en valeurs HEX inline
   - Assembler avec le template de base + composants (skill `dashboard-email-templates`)
   - Produire le HTML complet pour chaque type d'email

2. **Wiring n8n** (`integration-builder` + skill `dashboard-email-n8n`) :
   - Integrer le HTML dans le champ `html` du noeud `emailSend` (v2.2+)
   - Configurer les variables dynamiques n8n `{{ $json.field }}`
   - Ajouter la version texte (champ `text`)
   - Configurer le trigger (webhook, schedule, Supabase event)
   - Tester avec Mailtrap/Ethereal avant production

**Regles** :
- Templates HTML table-based (pas de CSS Grid/Flexbox)
- Largeur max 600px
- Version texte obligatoire
- Variables dynamiques balisees avec `{{ $json.field }}`
- Polices : Arial, Helvetica, sans-serif (pas de Google Fonts)
- Emails Supabase auth (confirm, reset) : personnaliser dans Supabase Dashboard

### 5. Sync Externe (si applicable)

Pour les integrations polling (iCal, IMAP, APIs) :
- Documenter la frequence de sync
- Gerer les conflits (dernier ecrit gagne, ou reconciliation)
- Logger chaque sync (table `sync_logs`)

## Output

```
src/app/api/
└── webhooks/
    └── [provider]/
        └── route.ts        # Par endpoint

n8n-workflows/
├── README.md               # Conventions (deja existant)
├── WF00-error-handler.md   # Documentation par workflow
├── WF01-[nom].md
└── ...
```

## Verification Placeholders

### .env.example
- [ ] Toutes les variables d'environnement nommees (meme si valeurs vides)
- [ ] `[PROJECT_REF]`, `[HOSTINGER_DOMAIN]` remplaces ou documentes

### n8n-workflows/*.md
- [ ] `[WF0X]` remplace par les vrais IDs (WF01, WF02...)
- [ ] `[Nom]` remplace par les noms de workflows
- [ ] `[Trigger]`, `[Action]` remplaces par les valeurs concretes

### Emails (si applicable)
- [ ] `[DOMAIN]` remplace dans la config SMTP
- [ ] `[CRED_ID]`, `[PROVIDER]` remplaces dans la config emailSend

## Validation

- [ ] **Cross-check** : toutes les features "n8n requis"/"Hybride" du workflow-map ont leurs workflows implementes
- [ ] **Cross-check** : aucun workflow du workflow-map n'a ete oublie dans l'inventaire
- [ ] `npm run build` sans erreurs
- [ ] Chaque webhook repond 200 avec secret valide
- [ ] Chaque webhook repond 401 sans secret
- [ ] Chaque webhook repond 400 avec body invalide
- [ ] Donnees arrivent en base apres webhook
- [ ] Documentation n8n complete pour chaque workflow (dans `n8n-workflows/`)
- [ ] Test curl documente et fonctionnel pour chaque webhook
- [ ] `.env.example` a jour avec les nouvelles variables
- [ ] Pas de credentials dans le code versionne
- [ ] Error handler (WF00) configure
- [ ] Graphe de dependances inter-workflows respecte dans l'ordre d'implementation
