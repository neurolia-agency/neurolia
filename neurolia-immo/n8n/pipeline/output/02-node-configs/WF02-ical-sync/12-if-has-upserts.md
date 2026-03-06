# Node: IF: Has Upserts?

**Type** : if
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| value1 | `={{ $json.has_upserts }}` | Flag presence de nouvelles reservations iCal |
| value2 | true | Comparaison |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| conditions.boolean[0].value1 | (expression) | `has_upserts` |
| conditions.boolean[0].operation | equal | Egalite |
| conditions.boolean[0].value2 | true | Si nouvelles reservations a upsert |

## Connexions

- **Entree** : Code: Compare iCal vs DB
- **Sortie true** : HTTP: Upsert Reservations
- **Sortie false** : IF: Has Anomalies?
