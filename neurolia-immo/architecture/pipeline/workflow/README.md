# Pipeline Workflow

Index des fichiers de documentation du workflow.

## Structure en 1 Phase

### Phase A : Architecture (Documentation uniquement)
```
A01-Init → A02-User Flows → { A03-Data + A04-API en parallele } → A05-Tech Stack
```

## Fichiers

| Fichier | Contenu |
|---------|---------|
| `DEPENDENCIES.md` | Matrice inputs/outputs par etape, regles de lecture |

## Source Unique

**Statut pipeline et flux de contexte** : voir `CLAUDE.md` (racine du projet)

## Executer une Etape

```bash
# Phase A (Architecture) - Production de documents Markdown
/apex -a -s executer etape [AXX]-[nom] depuis stages/[AXX]-[nom].md
```

**Workflow** :
1. Lire le stage file de l'etape
2. Verifier que les inputs existent
3. Executer avec `/apex`
4. Valider les outputs contre la checklist
5. Mettre a jour le statut dans `CLAUDE.md`
6. Passer a l'etape suivante

**Regle** : Ne jamais modifier un output valide. Les artifacts sont immutables.

## Contrats Inter-Templates

Ce template alimente :
- `app-n8n-template` : recoit `01-brief/features.md`, `04-api/api-contracts.md`, `04-api/webhook-map.md`
- `app-design-template` : recoit `01-brief/prd.md`, `01-brief/features.md`, `02-user-flows/`, `05-tech/tech-stack.md`

---

*App Architecture Template v1.0*
