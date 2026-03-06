# Node: Schedule Trigger

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
| rule.interval[0].expression | */30 * * * * | Toutes les 30 minutes |
| options.timezone | Europe/Paris | Timezone CET |

## Sortie attendue

```json
{
  "timestamp": "2026-02-20T10:30:00.000Z"
}
```

## Connexions

- **Entree** : Aucune (trigger)
- **Sortie** : Config
