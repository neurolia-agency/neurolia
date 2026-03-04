# Regle : Mise a jour obligatoire du PLAN.md

## Declencheur

Cette regle s'applique quand tu modifies un fichier dans :
- `pipeline/output/*`
- `pipeline/stages/*`
- `PLAN.md`
- `CLAUDE.md`

## Actions OBLIGATOIRES

### 1. Cocher les items completes dans PLAN.md

Apres chaque etape terminee, ouvrir `PLAN.md` et cocher les items correspondants :
- Phase A : cocher les sous-items de l'etape concernee
- Phase B : cocher les sous-items du batch concerne
- Inventaire Pages : cocher les pages implementees

### 2. Mettre a jour le Journal

Ajouter une ligne dans la section "Journal" :

```
| [DATE] | [N] | [Description precise du travail : etape, fichiers crees, decisions prises] |
```

### 3. Mettre a jour "Etat Actuel"

- **Fait** : ajouter ce qui vient d'etre complete
- **Reste a faire** : mettre a jour la prochaine etape
- **Bloqueurs** : signaler tout probleme rencontre

### 4. Mettre a jour le statut pipeline dans CLAUDE.md

Si le statut d'une etape a change (⬜ → ✅), mettre a jour la table "Statut Pipeline" dans CLAUDE.md.

### 5. Mettre a jour l'en-tete PLAN.md

Mettre a jour les 3 lignes d'en-tete :
- **Statut** : Phase et etape en cours
- **Derniere MAJ** : date du jour
- **Prochaine action** : prochaine etape a executer

## Anti-pattern

INTERDIT :
- Terminer une etape sans mettre a jour PLAN.md
- Laisser des items coches qui ne sont pas reellement termines
- Oublier le journal (chaque session = 1 entree minimum)
