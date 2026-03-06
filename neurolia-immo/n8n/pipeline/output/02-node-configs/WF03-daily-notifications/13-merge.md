# Node: Merge

**Type** : merge
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Recoit les 4 queries en parallele |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| mode | append | Concatener les resultats |
| numberInputs | 4 | 4 entrees paralleles |

## Connexions

- **Entree 0** : HTTP: Get Check-ins Today
- **Entree 1** : HTTP: Get Check-outs Today
- **Entree 2** : HTTP: Get Check-ins Tomorrow
- **Entree 3** : HTTP: Get Pending Tasks
- **Sortie** : Code: Build Owner HTML

## Notes

- Le Merge combine les 4 resultats dans un seul flux
- Le Code node suivant les reorganise par type
