# Dependances Inter-Etapes

Matrice des inputs/outputs par etape du pipeline n8n.

## Vue d'Ensemble

```
═══════════════════════════════════════════════════════════════════════════════
              IMPORTS INTER-TEMPLATES (app-architecture-template)
═══════════════════════════════════════════════════════════════════════════════

app-architecture-template/pipeline/output/
├── 01-brief/features.md          ──┐
├── 04-api/api-contracts.md        ──┼──→  pipeline/input/imports/
├── 04-api/webhook-map.md          ──┤
└── 04-api/integrations.md         ──┘

═══════════════════════════════════════════════════════════════════════════════
                 PHASE N : CONCEPTION & GENERATION WORKFLOWS
                      (Specs + JSONs n8n importables)
═══════════════════════════════════════════════════════════════════════════════

pipeline/input/imports/
        │
        ▼
┌──────────────────────────┐
│  N01: Workflow            │ → pipeline/output/01-architecture/
│       Architecture        │   (workflow-tree.md + workflow-specs/)
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│  N02: Node Design         │ → pipeline/output/02-node-configs/
│                           │   (1 dossier par workflow, 1 fichier par node)
└──────────────────────────┘
        │
        ├──────────────────────────────────────┐
        ▼                                      ▼
┌──────────────────────────┐   pipeline/input/imports/integrations.md
│  N03: Credential Mapping  │ ←────────────────┘
└──────────────────────────┘
        │  pipeline/output/03-credentials/credentials-map.md
        │
        ├── N01 + N02 + N03 rassembles
        ▼
┌──────────────────────────┐
│  N04: JSON Generation     │ → pipeline/output/04-workflows/
│                           │   (1 JSON par workflow)
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│  N05: Validation          │ → pipeline/output/05-validation/
│                           │   validation-report.md
└──────────────────────────┘
        │         ▲
        │         │ (boucle si erreurs)
        └─────────┘

═══════════════════════════════════════════════════════════════════════════════
                      POST-DEPLOIEMENT (ONGOING)
═══════════════════════════════════════════════════════════════════════════════

              ┌──────────────────────────┐
              │  N06: Maintenance         │ → pipeline/output/06-patches/
              │       (ongoing)           │   (WFXX-PATCH-NOTES.md)
              └──────────────────────────┘
                      │         ▲
                      │         │
                      ▼         │
              ┌──────────────────────────┐
              │  Re-validation N05       │
              └──────────────────────────┘
```

## Matrice Detaillee

### Phase N : Conception & Generation

| Etape | Stage | Inputs Requis | Outputs | Depend de |
|-------|-------|---------------|---------|-----------|
| **N01** | `N01-workflow-architecture.md` | `imports/features.md`, `imports/api-contracts.md`, `imports/webhook-map.md` | `output/01-architecture/` (workflow-tree.md + workflow-specs/) | Imports |
| **N02** | `N02-node-design.md` | `output/01-architecture/workflow-specs/` | `output/02-node-configs/` (1 dossier/workflow, 1 fichier/node) | N01 |
| **N03** | `N03-credential-mapping.md` | `output/02-node-configs/`, `imports/integrations.md` | `output/03-credentials/credentials-map.md` | N02, Imports |
| **N04** | `N04-json-generation.md` | `output/01-architecture/workflow-specs/`, `output/02-node-configs/`, `output/03-credentials/credentials-map.md` | `output/04-workflows/` (1 JSON/workflow) | N01, N02, N03 |
| **N05** | `N05-validation.md` | `output/04-workflows/` | `output/05-validation/validation-report.md` | N04 |
| **N06** | `N06-maintenance.md` | `output/04-workflows/`, retours production | `output/06-patches/` (WFXX-PATCH-NOTES.md) + MAJ `output/04-workflows/` | N04, N05, Production |

### Parallelisme

- **N01 a N05** : execution strictement sequentielle (chaque etape depend de la precedente)
- **N06** : ongoing, execute independamment apres deploiement

### Imports Inter-Templates

| Fichier | Source (architecture) | Destination (n8n) | Utilise par |
|---------|----------------------|-------------------|-------------|
| `features.md` | `01-brief/features.md` | `pipeline/input/imports/features.md` | N01 |
| `api-contracts.md` | `04-api/api-contracts.md` | `pipeline/input/imports/api-contracts.md` | N01 |
| `webhook-map.md` | `04-api/webhook-map.md` | `pipeline/input/imports/webhook-map.md` | N01 |
| `integrations.md` | `04-api/integrations.md` | `pipeline/input/imports/integrations.md` | N03 |

## Regles d'Import

1. **Copier ou symlnker** les fichiers depuis le projet architecture vers `pipeline/input/imports/`
2. **Ne jamais modifier** les fichiers importes pendant le pipeline n8n
3. **Re-importer** si l'architecture est mise a jour, puis re-executer depuis N01
4. **Verifier la checklist** dans `pipeline/input/README.md` avant de demarrer

---

*Template Workflow v1.0 - 2026-02-19*
