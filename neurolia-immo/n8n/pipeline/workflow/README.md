# Pipeline Workflow

Index des fichiers de documentation du workflow.

## Structure en 1 Phase

### Phase N : Conception & Generation des Workflows n8n
```
N01-Workflow Architecture → N02-Node Design → N03-Credential Mapping → N04-JSON Generation → N05-Validation
                                                                                                    ↕ (boucle)
                                            N06-Maintenance (ongoing, post-deploy)
```

## Fichiers

| Fichier | Contenu |
|---------|---------|
| `DEPENDENCIES.md` | Matrice inputs/outputs par etape, regles d'import inter-templates |

## Source Unique

**Statut pipeline et flux de contexte** : voir `CLAUDE.md` (racine du projet)

## Executer une Etape

```bash
# Phase N (Conception & Generation) - Production de documents + JSONs
/apex -a -s executer etape NXX-[nom] depuis stages/NXX-[nom].md
```

## Workflow

1. Importer les outputs architecture dans `pipeline/input/imports/`
2. Executer N01 a N05 sequentiellement
3. Deployer les JSONs dans n8n via "Import from File"
4. Executer N06 au besoin pour la maintenance

**Regle** : Ne jamais modifier les JSONs sans passer par N06 (patch-notes).

---

*Template Workflow v1.0*
