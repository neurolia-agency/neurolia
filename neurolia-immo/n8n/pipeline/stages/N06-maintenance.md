# Etape N06 : Maintenance

> **Phase N : Post-Deploiement** - Gestion du cycle de vie des workflows deployes.

## Objectif

Gerer les modifications post-deploiement des workflows n8n : documenter chaque changement dans un patch-note, mettre a jour le JSON correspondant, et re-valider via N05. Cette etape est ongoing et s'execute au besoin.

## Skill

- `n8n-maintenance` : Cycle de maintenance des workflows n8n (patch-notes, mises a jour, re-validation)

## Input

- Workflows deployes en production (dans l'instance n8n)
- Retours d'utilisation, bugs reportes, demandes d'evolution
- `pipeline/output/04-workflows/` : JSONs actuels

## Instructions

### 1. Documenter le changement

Avant toute modification, creer ou mettre a jour le patch-note du workflow concerne :
- Contexte : pourquoi le changement est necessaire
- Changement : ce qui sera modifie
- Impact : sur quels autres workflows

### 2. Identifier les nodes impactes

Lister precisement les nodes a modifier, ajouter ou supprimer dans le workflow.

### 3. Mettre a jour le JSON

Modifier le fichier JSON dans `04-workflows/` :
- Appliquer les changements documentes
- Conserver la coherence des connexions
- Mettre a jour les metadonnees si necessaire

### 4. Re-valider via N05

Executer la validation N05 sur le JSON modifie :
- Verifier structure, connexions, credentials
- S'assurer qu'aucune regression n'est introduite
- Mettre a jour le rapport de validation

### 5. Deployer et documenter

- Re-importer le JSON dans n8n
- Mettre a jour le patch-note avec le status "Valide N05"
- Mettre a jour `CLAUDE.md` si necessaire

## Output

### `06-patches/WFXX-PATCH-NOTES.md`

Un fichier par workflow qui a ete modifie :

```markdown
# WFXX — PATCH-NOTES

## [DATE] — [Titre court]

**Contexte** : [Pourquoi le changement est necessaire]
**Changement** : [Description precise de la modification]
**Nodes modifies** :
- [Node 1] : [Ce qui a change]
- [Node 2] : [Ce qui a change]
**Impact** : [Impact sur les autres workflows — ou "Aucun"]
**Status** : Valide N05 | En attente validation

---

## [DATE PRECEDENTE] — [Titre court]

**Contexte** : [...]
**Changement** : [...]
**Nodes modifies** :
- [...]
**Impact** : [...]
**Status** : Valide N05
```

### JSONs mis a jour dans `04-workflows/`

Les fichiers JSON sont mis a jour en place. L'historique des modifications est tracable via les patch-notes et le versioning git.

## Cycle de maintenance

```
Bug / Evolution
      │
      ▼
  Patch-note (documenter)
      │
      ▼
  Modifier JSON (04-workflows/)
      │
      ▼
  Re-valider (N05)
      │
      ├── FAIL → Corriger → Re-valider
      │
      └── PASS → Deployer → Mettre a jour patch-note
```

## Validation

- [ ] Le patch-note est complet (contexte, changement, nodes, impact)
- [ ] Le JSON dans `04-workflows/` est mis a jour
- [ ] La validation N05 passe sans erreur apres modification
- [ ] Aucune regression dans les autres workflows
- [ ] Le patch-note indique "Valide N05" apres validation

## Regles

1. **Toujours documenter avant de modifier** : pas de changement sans patch-note
2. **Toujours re-valider** : chaque modification doit passer N05
3. **Un patch-note par workflow** : regrouper les modifications dans le fichier du workflow concerne
4. **Immutabilite des autres outputs** : ne modifier que `04-workflows/` et `06-patches/`

---

**Version** : 1.0
**Phase** : N06 (Post-Deploiement, ongoing)
**Dependances** : N04 (JSONs), N05 (Validation)
**Produit pour** : Production (re-deploiement)
