# n8n Workflows — Conventions

## Stack n8n

| Parametre | Valeur |
|-----------|--------|
| **Version** | n8n v2.8.3 |
| **Hebergement** | Self-hosted sur Hostinger KVM2 |
| **OS** | Ubuntu (Docker ou PM2) |
| **Base de donnees n8n** | PostgreSQL (recommande) ou SQLite |
| **Reverse proxy** | Nginx avec SSL Let's Encrypt |
| **Configuration** | Voir skill `dashboard-n8n-hostinger` |

## Structure

Chaque workflow est documente dans un fichier Markdown (pas de JSON dans ce dossier) :

```
n8n-workflows/
├── README.md                    # Ce fichier (conventions)
├── WF00-error-handler.md        # Workflow error handler
├── WF01-[nom].md                # Workflow 1
├── WF02-[nom].md                # Workflow 2
└── ...
```

## Regle Critique

> **Ne JAMAIS modifier un fichier JSON n8n complet directement.**
> Toujours utiliser le systeme de **patch notes** pour documenter les changements.

Les workflows n8n sont geres dans l'interface n8n. Ce dossier contient uniquement la documentation.

---

## Langue : tout en francais

**OBLIGATOIRE** : tout ce qui est visible dans l'interface n8n doit etre redige en francais :

### Noms de workflows
```
Bon  : "WF01 — Parseur d'emails Airbnb"
Bon  : "WF03 — Notifications quotidiennes"
Mauvais : "WF01 — Email Parser"
Mauvais : "WF03 — Daily Notifications"
```

### Noms de nodes
```
Bon  : "Recuperer les reservations"
Bon  : "Verifier si check-in aujourd'hui"
Bon  : "Envoyer email confirmation"
Mauvais : "Fetch Reservations"
Mauvais : "Check if checkin today"
```

### Regles de nommage des nodes
- **Verbe a l'infinitif** en debut de nom : Recuperer, Verifier, Envoyer, Creer, Mettre a jour, Supprimer, Filtrer, Transformer
- **Descriptif et concis** : le nom doit expliquer ce que fait le node sans avoir a l'ouvrir
- **Pas d'accents dans les noms de fichiers** (mais accents autorises dans les noms de nodes n8n et sticky notes)

### Sticky notes
Redigees en francais avec un titre markdown `##` et un contenu explicatif (voir section dediee ci-dessous).

---

## Sticky Notes (OBLIGATOIRE)

Chaque workflow doit contenir entre **2 et 4 sticky notes** qui expliquent son fonctionnement de maniere coherente.

### Objectif

Les sticky notes forment une **documentation visuelle** du workflow directement dans l'interface n8n. L'ensemble des sticky notes d'un workflow doit repondre a une logique d'explication cohérente : quelqu'un qui lit les sticky notes de gauche a droite doit comprendre le workflow sans ouvrir les nodes.

### Regles

1. **2 a 4 sticky notes par workflow** — pas moins (insuffisant), pas plus (surcharge visuelle)
2. **Chaque sticky note couvre un groupement de nodes** — elle explique une phase/etape du workflow
3. **Placement** : la sticky note est positionnee derriere le groupe de nodes qu'elle documente (dimensions suffisantes pour englober les nodes visuellement)
4. **Langue** : francais, avec accents
5. **Format** : titre `##` + contenu concis (3-8 lignes max)
6. **Coherence** : les sticky notes lues dans l'ordre (gauche → droite) racontent le workflow

### Structure type d'une sticky note

```markdown
## [Phase/Etape du workflow]

[Ce que font les nodes de ce groupe — 2-4 phrases]
[Donnees en entree → donnees en sortie]
[Condition ou regle metier importante]
```

### Exemples

#### Workflow simple (2 sticky notes)

```
Sticky 1 : "## Declenchement et collecte"
           "Declenche toutes les heures. Recupere les reservations
            du jour depuis Supabase et verifie s'il y a des
            check-ins dans les 4 prochaines heures."

Sticky 2 : "## Notification et mise a jour"
           "Pour chaque check-in imminent, envoie un email de
            rappel au proprietaire avec les details du voyageur.
            Met a jour le statut de la reservation en 'notifie'."
```

#### Workflow complexe (4 sticky notes)

```
Sticky 1 : "## Trigger et validation"
           "Webhook recu depuis l'app Next.js. Valide le secret
            et le format du body avant traitement."

Sticky 2 : "## Recuperation des donnees"
           "Charge les informations complementaires depuis Supabase :
            details de la propriete, preferences du proprietaire,
            historique des reservations."

Sticky 3 : "## Traitement et logique metier"
           "Calcule le montant net, applique la commission, determine
            les taches de menage a creer. Branche selon la plateforme
            d'origine (Airbnb, Booking, direct)."

Sticky 4 : "## Actions et notifications"
           "Cree les taches de menage dans Supabase, envoie l'email
            de confirmation au proprietaire, et log le traitement
            dans la table sync_logs."
```

### Structure JSON d'une sticky note (pour generation)

```json
{
  "parameters": {
    "content": "## Titre de la phase\n\nExplication du groupe de nodes.\nDonnees traitees et logique appliquee.",
    "height": 380,
    "width": 420
  },
  "id": "[UUID]",
  "name": "Sticky Note",
  "type": "n8n-nodes-base.stickyNote",
  "typeVersion": 1,
  "position": [x, y]
}
```

**Dimensions recommandees** :
- Petite (2-3 nodes) : `width: 350, height: 300`
- Moyenne (3-5 nodes) : `width: 500, height: 380`
- Grande (5+ nodes) : `width: 700, height: 400`

**Positionnement** : la sticky note doit etre placee ~60px au-dessus et ~30px a gauche du premier node du groupe, avec des dimensions suffisantes pour englober visuellement tous les nodes du groupe.

---

## Format Documentation

```markdown
# WF0X — [Nom du workflow en francais]

## Statut
[Actif / Deprecie / En developpement]

## Trigger
- Type : [Schedule / Webhook / IMAP / Error Trigger]
- Frequence : [*/Xmin / HH:MM CET / Temps reel]
- URL (si webhook) : `https://[n8n-url]/webhook/[path]`

## Description
[Ce que fait ce workflow en 2-3 phrases]

## Sticky Notes
| # | Titre | Nodes couverts |
|---|-------|---------------|
| 1 | [Titre sticky note 1] | [Node A, Node B, Node C] |
| 2 | [Titre sticky note 2] | [Node D, Node E] |

## Nodes
1. **[Nom du node en francais]** — [description]
2. **[Nom du node 2]** — [description]
3. **[Nom du node 3]** — [description]
...

## Donnees

### Input
```json
{
  "field": "type"
}
```

### Output
```json
{
  "success": true,
  "data": {}
}
```

## Dependances
- **Credentials** : [IMAP, SMTP, Supabase, API Key]
- **Workflows appeles** : [WF0X]
- **Workflows appelants** : [WF0X]

## Error Handling
- Utilise WF00 (Gestionnaire d'erreurs)
- Fallback : [comportement si echec]

## Test
```bash
curl -X POST https://[n8n-url]/webhook/[path] \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: $WEBHOOK_SECRET" \
  -d '{"field": "value"}'

# Reponse attendue : 200 { "success": true }
```

## Patch Notes
| Date | Type | Description |
|------|------|-------------|
| [DATE] | Creation | Version initiale |
```

---

## Conventions

### Nommage fichiers

#### Main workflows
- `WF00` : Gestionnaire d'erreurs (obligatoire, premier a deployer)
- `WF01-WF09` : Workflows principaux
- Prefixe DEPRECIE dans le titre pour les workflows deprecies
- Noms de fichiers en kebab-case sans accents : `WF01-parseur-emails.md`

#### Sub-workflows
- Prefixe `SW` : `SW01-envoi-notification.md`, `SW02-formatage-donnees.md`
- Numeration independante des WF principaux (SW01, SW02...)

#### Fichiers JSON (generes par Batch G)
- Meme nom que le `.md` correspondant : `WF01-parseur-emails.json`
- Generes par l'agent `n8n-workflow-builder` (Batch G)
- Importables via "Import from File" dans n8n
- **Ne jamais modifier manuellement** — utiliser le systeme de patch-notes + regeneration

### Quand creer un sub-workflow

Creer un sub-workflow (SW) quand :
- Une logique est reutilisee par **2+ workflows** (DRY)
- Un bloc est suffisamment complexe pour etre isole (>5 nodes, logique autonome)
- Une notification generique est envoyee depuis plusieurs contextes (email, SMS, push)

**Structure d'un sub-workflow** :
- Trigger : `n8n-nodes-base.executeWorkflowTrigger` (pas de webhook/schedule)
- Parametres d'entree documentes (quels champs le sub-workflow attend)
- Parametres de sortie documentes (quels champs il retourne)
- Appele via `n8n-nodes-base.executeWorkflow` dans le workflow parent

### Credentials
Documenter dans chaque workflow les credentials necessaires.
Les credentials sont configurees dans n8n, jamais dans le code.
Utiliser un nommage coherent : `CRED-01 — Supabase`, `CRED-02 — SMTP Brevo`, etc.

### Webhook Secrets
- Chaque webhook expose doit avoir un secret (`x-webhook-secret`)
- Le secret est stocke dans `.env.local` (cote app) et dans n8n credentials
- Valider le secret dans l'API route AVANT tout traitement

### Patch Notes
Pour chaque modification d'un workflow :

```markdown
## Patch — [WF0X] [Nom en francais]
**Date** : [DATE]
**Type** : [Ajout / Modification / Fix / Depreciation]

### Changement
[Description]

### Nodes affectes
- [Nom du node] : [ce qui change]

### Test
- [ ] curl test OK
- [ ] Donnees arrivent en base

### Impact
- [Pages/workflows affectes]
```
