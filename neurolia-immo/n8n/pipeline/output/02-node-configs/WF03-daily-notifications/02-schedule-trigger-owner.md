# Node: Schedule Trigger Owner (08:00)

**Type** : scheduleTrigger
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Trigger node — pas d'entree |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| rule.interval[0].field | cronExpression | Expression cron |
| rule.interval[0].expression | 0 8 * * * | Tous les jours a 08:00 |
| options.timezone | Europe/Paris | Timezone CET |

## Sortie attendue

```json
{
  "timestamp": "2026-02-20T07:00:00.000Z"
}
```

## Connexions

- **Entree** : Aucune (trigger)
- **Sortie** : Config Owner

## Notes

- 08:00 CET = 1h apres le planning staff, pour que le owner ait une vue globale
- Ce trigger alimente le Flow B (digest owner)
