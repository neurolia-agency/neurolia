# Etape N04 : JSON Generation

> **Phase N : Conception & Generation** - Generation des fichiers JSON n8n importables.

## Objectif

Generer un fichier JSON par workflow, au format d'export n8n, directement importable via "Import from File". Chaque JSON contient les nodes, connexions, parametres, et references de credentials.

## Skills

- `n8n-json-generator` : Generation de fichiers JSON n8n importables depuis les specifications
- `n8n-architect` : Architecture et patterns de workflows n8n

## Input

- `pipeline/output/01-architecture/workflow-specs/` : Specifications de chaque workflow
- `pipeline/output/02-node-configs/` : Configuration detaillee de chaque node
- `pipeline/output/03-credentials/credentials-map.md` : Mapping des credentials

## Instructions

### 1. Assembler les donnees par workflow

Pour chaque workflow, rassembler :
- Le workflow-spec (N01) pour la structure generale
- Les node-configs (N02) pour les parametres detailles
- Le credentials-map (N03) pour les references de credentials

### 2. Generer le tableau de nodes

Construire le tableau `nodes[]` du JSON n8n :
- Chaque node avec son type, parametres, position (x, y)
- Les expressions dans les champs dynamiques
- Le code pour les Code nodes
- Les references de credentials (par nom, sans valeurs)

### 3. Generer les connexions

Construire l'objet `connections{}` :
- Chaque connexion entre nodes (source → destination)
- Gerer les branchements (IF, Switch) avec les sorties multiples

### 4. Assembler le JSON complet

Combiner nodes, connexions, settings et metadonnees au format d'export n8n.

### 5. Valider le format

Verifier que chaque JSON est :
- Du JSON valide (parseable)
- Conforme au format d'export n8n
- Importable sans erreur

## Output

### `04-workflows/`

Un fichier JSON par workflow :

```
04-workflows/
├── WF01-nom-workflow.json
├── WF02-nom-workflow.json
├── SW01-nom-sub.json
├── SW02-nom-sub.json
└── ...
```

**Convention de nommage** :
- Main workflows : `WFXX-nom-en-kebab.json`
- Sub-workflows : `SWXX-nom-en-kebab.json`

### Structure JSON n8n

```json
{
  "name": "WF01 — Nom du workflow",
  "nodes": [
    {
      "parameters": {
        "// parametres specifiques au type de node"
      },
      "id": "uuid-unique",
      "name": "Nom du node",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [250, 300],
      "credentials": {
        "httpBasicAuth": {
          "id": "ref-credential-id",
          "name": "CRED-XX — Nom"
        }
      }
    }
  ],
  "connections": {
    "Nom Node Source": {
      "main": [
        [
          {
            "node": "Nom Node Destination",
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

### Regles de generation

1. **Positions** : Disposer les nodes de gauche a droite, espaces de 250px horizontalement
2. **IDs** : Generer des UUIDs uniques pour chaque node
3. **typeVersion** : Utiliser la version la plus recente du node pour la version n8n cible
4. **Credentials** : Referencees par nom (`CRED-XX — Nom`), jamais par valeur
5. **Expressions** : Encapsulees dans `={{ expression }}` dans les champs parametres
6. **Code nodes** : Code complet inline dans le parametre `jsCode` ou `pythonCode`

## Validation

- [ ] Chaque JSON est du JSON valide (parseable sans erreur)
- [ ] Tous les nodes du workflow-spec sont presents dans le JSON
- [ ] Les connexions entre nodes sont correctes et completes
- [ ] Les credentials sont referencees par nom (aucun secret dans le JSON)
- [ ] Le trigger est configure correctement (premier node du workflow)
- [ ] L'error handling est present (nodes Error Trigger ou try/catch selon strategie)
- [ ] La convention de nommage est respectee (WFXX-nom.json / SWXX-nom.json)

## Prochaine Etape

Une fois `output/04-workflows/` cree → Passer a `stages/N05-validation.md`

---

**Version** : 1.0
**Phase** : N04 (Conception & Generation)
**Dependances** : N01 (workflow-specs), N02 (node-configs), N03 (credentials-map)
**Produit pour** : N05 (Validation)
