# Node: IF: Issues Found?

**Type** : if
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| value1 | `={{ $json.has_issues }}` | Flag problemes detectes |
| value2 | true | Comparaison |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| conditions.boolean[0].value1 | (expression) | `has_issues` |
| conditions.boolean[0].operation | equal | Egalite |
| conditions.boolean[0].value2 | true | Si problemes detectes |

## Connexions

- **Entree** : Code: Health Checks
- **Sortie true** : Code: Build Alert Email
- **Sortie false** : NoOp (fin — tout est OK)
