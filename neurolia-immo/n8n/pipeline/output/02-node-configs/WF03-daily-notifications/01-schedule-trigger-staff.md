# Node: Schedule Trigger Staff (07:00)

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
| rule.interval[0].expression | 0 7 * * * | Tous les jours a 07:00 |
| options.timezone | Europe/Paris | Timezone CET |

## Sortie attendue

```json
{
  "timestamp": "2026-02-20T06:00:00.000Z"
}
```

## Connexions

- **Entree** : Aucune (trigger)
- **Sortie** : Config

## Notes

- 07:00 CET = avant le debut de journee du staff
- Ce trigger alimente le Flow A (planning staff)
