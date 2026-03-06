# Node: Schedule Trigger

**Type** : scheduleTrigger
**Mode** : Run Once for All Items

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| rule.interval[0].field | cronExpression | Expression cron |
| rule.interval[0].expression | 0 */6 * * * | Toutes les 6 heures (0h, 6h, 12h, 18h) |
| options.timezone | Europe/Paris | Timezone CET |

## Connexions

- **Entree** : Aucune (trigger)
- **Sortie** : Config
