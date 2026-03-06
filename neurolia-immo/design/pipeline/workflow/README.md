# Pipeline Workflow

Index des fichiers de documentation du workflow design mobile.

## Structure en 2 Phases

### Phase D-A : Design (Markdown uniquement)
```
D01-Brand → D02-Art Direction → D03-Wireframes → D04-Design Tokens
```

### Phase D-B : Code (Implementation mobile)
```
D05-Setup → D06-Core Screens → D07-Backend Integration → D08-Polish → D09-Validate → D10-Deploy
```

## Fichiers

| Fichier | Contenu |
|---------|---------|
| `DESIGN_STACK.md` | Stack technique mobile (PWA / React Native / Flutter) |
| `DEPENDENCIES.md` | Matrice inputs/outputs par etape, regles de lecture |

## Source Unique

**Statut pipeline et flux de contexte** : voir `CLAUDE.md` (racine du projet)

## Executer une Etape

```bash
# Phase D-A (Design) - Production de documents Markdown
/apex -a -s executer etape D[XX]-[nom] depuis stages/D[XX]-[nom].md

# Phase D-B (Code) - Implementation
/apex -a -s executer etape D[XX]-[nom] depuis stages/D[XX]-[nom].md
```

## Phase D-B : Patterns Mobile

**IMPORTANT** : Utiliser les skills `mobile-wireframes` et `mobile-ui-patterns` pour guider l'implementation.

**Workflow** :
1. Lire le wireframe de l'ecran
2. Resoudre les references brand/ a la demande
3. Implementer layout + composants + etats
4. Valider contre constraints.md
5. Passer a l'ecran suivant

**Regle** : Toujours implementer les 3 etats (loading, empty, error) pour chaque ecran avec donnees.

---

*Template App Design v1.0*
