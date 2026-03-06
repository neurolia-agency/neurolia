# Node: IF: Has Anomalies?

**Type** : if
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| value1 | `={{ $json.has_anomalies }}` | Flag presence d'anomalies |
| value2 | true | Comparaison |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| conditions.boolean[0].value1 | (expression) | `has_anomalies` |
| conditions.boolean[0].operation | equal | Egalite |
| conditions.boolean[0].value2 | true | Si anomalies detectees |

## Connexions

- **Entree** : HTTP: Upsert Reservations / IF: Has Upserts? (sortie false)
- **Sortie true** : HTTP: Post iCal Alert
- **Sortie false** : Split In Batches (retour loop — bien suivant)
