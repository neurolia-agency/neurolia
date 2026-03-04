# Pipeline Workflow

> **Consommateur** : Agent Claude | **Fonction** : Documentation du pipeline

## Fichiers

| Fichier | Contenu | Consommateur |
|---------|---------|--------------|
| `DESIGN_STACK.md` | Stack technique | Développeur |
| `DEPENDENCIES.md` | Matrice inputs/outputs | Agent (lecture de fichiers) |

## Exécution

**Phase A** : `/apex -a -s exécuter étape [XX] depuis stages/[XX].md`
**Phase B** : `/frontend-design` pour tout UI
