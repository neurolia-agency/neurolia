---
name: n8n-json-generator
description: Genere des fichiers JSON n8n importables depuis les specifications documentees de workflows
argument-hint: "<workflow-id> depuis <node-configs-path>"
---

<objective>
Generer des fichiers JSON au format d'export n8n, directement importables via "Import from File", a partir des specifications documentees de workflows (workflow-specs, node-configs, credentials-map).
</objective>

<quick_start>
**Usage dans le pipeline :**

```bash
/apex -a -s executer N04-json-generation depuis pipeline/stages/N04-json-generation.md
```

**Usage direct :**

Fournir les specifications d'un workflow et ce skill genere le JSON n8n correspondant.
</quick_start>

<inputs>
| Source | Fichier | Description |
|--------|---------|-------------|
| N01 | `01-architecture/workflow-specs/WFXX-nom.md` | Specification du workflow (trigger, flux, nodes) |
| N02 | `02-node-configs/WFXX-nom/*.md` | Configuration de chaque node (type, parametres, expressions, code) |
| N03 | `03-credentials/credentials-map.md` | Mapping des credentials (references par nom) |
</inputs>

<outputs>
| Fichier | Format | Description |
|---------|--------|-------------|
| `04-workflows/WFXX-nom.json` | JSON | Fichier n8n importable pour un main workflow |
| `04-workflows/SWXX-nom.json` | JSON | Fichier n8n importable pour un sub-workflow |
</outputs>

<workflow>
1. **Lire les specifications** : Charger le workflow-spec (N01) pour connaitre la structure globale, les node-configs (N02) pour les parametres detailles, et le credentials-map (N03) pour les references
2. **Construire le tableau de nodes** : Pour chaque node dans le workflow-spec, creer l'objet node JSON avec type, parametres, position, credentials. Generer un UUID unique pour chaque node. Disposer les nodes de gauche a droite (increment de 250px en x)
3. **Ajouter les sticky notes** : Identifier 2 a 4 groupes logiques de nodes dans le workflow. Pour chaque groupe, creer une sticky note positionnee derriere les nodes qu'elle couvre. Le contenu explique le role de ce groupe. L'ensemble des sticky notes lues de gauche a droite doit raconter le fonctionnement du workflow de maniere coherente
4. **Construire les connexions** : Mapper les connexions entre nodes selon le flux defini dans le workflow-spec. Gerer les branchements (IF → 2 sorties, Switch → N sorties). Verifier que chaque connexion reference des nodes existants
5. **Assembler le JSON final** : Combiner nodes[] (inclut les sticky notes), connections{}, settings{} et meta{}. Ajouter le nom du workflow et les tags. Valider que le JSON est parseable
</workflow>

<json_structure>
Format d'export n8n :

```json
{
  "name": "string — Nom affiche dans n8n",
  "nodes": [
    {
      "parameters": {},
      "id": "string — UUID unique",
      "name": "string — Nom du node",
      "type": "string — Type n8n (ex: n8n-nodes-base.httpRequest)",
      "typeVersion": "number — Version du node",
      "position": [0, 0],
      "credentials": {
        "credentialType": {
          "id": "string",
          "name": "string — CRED-XX nom"
        }
      }
    }
  ],
  "connections": {
    "Node Source Name": {
      "main": [
        [
          {
            "node": "Node Destination Name",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1"
  },
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

### Sticky Notes (OBLIGATOIRE — 2 a 4 par workflow)

Chaque workflow doit contenir entre 2 et 4 sticky notes qui documentent visuellement le fonctionnement du workflow.

```json
{
  "parameters": {
    "content": "## Titre de la phase\n\nExplication du groupe de nodes en francais.\nDonnees traitees et logique appliquee.",
    "height": 380,
    "width": 420
  },
  "id": "UUID unique",
  "name": "Sticky Note",
  "type": "n8n-nodes-base.stickyNote",
  "typeVersion": 1,
  "position": [x, y]
}
```

**Regles** :
- **Contenu en francais** avec accents
- **Titre** : `## [Phase du workflow]`
- **Corps** : 3-8 lignes explicatives (ce que font les nodes, les donnees traitees, les regles metier)
- **Position** : ~60px au-dessus et ~30px a gauche du premier node du groupe
- **Dimensions** : petite (350x300), moyenne (500x380), grande (700x400) selon le nombre de nodes
- **Coherence** : les sticky notes lues dans l'ordre (gauche → droite) racontent le workflow
- Les sticky notes ne sont PAS dans `connections` (pas de liens)
- Le `name` peut rester "Sticky Note", "Sticky Note1", "Sticky Note2" etc.

### Convention de nommage — FRANCAIS OBLIGATOIRE

Tout ce qui est visible dans l'interface n8n doit etre en francais :

| Element | Exemple correct | Exemple incorrect |
|---------|----------------|-------------------|
| Nom du workflow | "WF01 — Parseur d'emails Airbnb" | "WF01 — Email Parser" |
| Nom du node | "Recuperer les reservations" | "Fetch Reservations" |
| Sticky note | "## Collecte et validation" | "## Data Collection" |

**Verbes recommandes** pour les noms de nodes : Recuperer, Verifier, Envoyer, Creer, Mettre a jour, Supprimer, Filtrer, Transformer, Calculer, Notifier, Logger

### Types de nodes courants

| Type n8n | Usage |
|----------|-------|
| `n8n-nodes-base.webhook` | Trigger webhook |
| `n8n-nodes-base.scheduleTrigger` | Trigger cron/planifie |
| `n8n-nodes-base.httpRequest` | Appel HTTP/API |
| `n8n-nodes-base.code` | Code JavaScript/Python |
| `n8n-nodes-base.if` | Condition IF |
| `n8n-nodes-base.switch` | Switch multi-branches |
| `n8n-nodes-base.set` | Definir des valeurs |
| `n8n-nodes-base.merge` | Fusionner des flux |
| `n8n-nodes-base.noOp` | No operation (placeholder) |
| `n8n-nodes-base.stickyNote` | Note explicative visuelle |
| `n8n-nodes-base.executeWorkflow` | Appeler un sub-workflow |
| `n8n-nodes-base.executeWorkflowTrigger` | Trigger de sub-workflow |
| `n8n-nodes-base.errorTrigger` | Trigger d'erreur |

### typeVersion par node (n8n v2.8.3)

TOUJOURS specifier le `typeVersion` correct pour eviter les prompts de migration a l'import :

| Type n8n | typeVersion | Notes |
|----------|-------------|-------|
| `n8n-nodes-base.webhook` | 2 | v2 = meilleure gestion des headers |
| `n8n-nodes-base.scheduleTrigger` | 1.2 | |
| `n8n-nodes-base.httpRequest` | 4.2 | v4+ = interface simplifiee |
| `n8n-nodes-base.code` | 2 | v2 = support Python + meilleur sandboxing |
| `n8n-nodes-base.if` | 2.2 | v2+ = conditions flat array (pas `conditions.string[]`) |
| `n8n-nodes-base.switch` | 3.2 | v3+ = auto-sanitization |
| `n8n-nodes-base.set` | 3.4 | v3+ = `assignments.assignments[]` (pas `values.string[]`) |
| `n8n-nodes-base.merge` | 3.0 | v3 = modes combine/append/chooseBranch |
| `n8n-nodes-base.noOp` | 1 | Inchange |
| `n8n-nodes-base.executeWorkflow` | 1.1 | |
| `n8n-nodes-base.errorTrigger` | 1 | Inchange |
| `n8n-nodes-base.emailSend` | 2.2 | v2+ = support HTML natif |
| `n8n-nodes-base.stickyNote` | 1 | Note visuelle (pas de connexions) |
| `n8n-nodes-base.supabase` | 1 | |

**Regle** : Si le `typeVersion` n'est pas specifie, n8n utilise la version la plus ancienne, ce qui declenche un bandeau "Update this node" a l'import.
</json_structure>

<constraints>
- **Aucun secret** dans le JSON : les credentials sont referencees par nom, jamais par valeur
- **JSON valide** : chaque fichier doit etre parseable par `JSON.parse()` sans erreur
- **Format n8n** : le JSON doit etre importable via "Import from File" dans n8n
- **References uniquement** : les credentials utilisent `"name": "CRED-XX — Nom"`, pas les vraies valeurs
- **UUIDs uniques** : chaque node a un `id` unique au format UUID v4
- **Positions coherentes** : les nodes sont disposes de gauche a droite, sans chevauchement
- **Convention de nommage** : `WFXX-nom-en-kebab.json` pour main, `SWXX-nom-en-kebab.json` pour sub
</constraints>

<quality_gates>
- [ ] Le JSON est parseable sans erreur (`JSON.parse()`)
- [ ] Tous les nodes du workflow-spec sont presents dans le JSON
- [ ] Les connexions correspondent au flux defini dans le workflow-spec
- [ ] Les credentials sont mappees par reference (nom), pas par valeur (secret)
- [ ] Le trigger est le premier node du workflow
- [ ] Les positions de nodes sont coherentes (pas de chevauchement)
- [ ] Le typeVersion est compatible avec la version n8n cible (v2.8.3)
- [ ] Les expressions utilisent la syntaxe `={{ }}` correcte
- [ ] **2 a 4 sticky notes** presentes, en francais, avec contenu coherent
- [ ] **Nom du workflow en francais** (ex: "WF01 — Parseur d'emails Airbnb")
- [ ] **Noms de nodes en francais** (verbe a l'infinitif + description)
- [ ] Les sticky notes ne sont PAS referencees dans `connections`
</quality_gates>
