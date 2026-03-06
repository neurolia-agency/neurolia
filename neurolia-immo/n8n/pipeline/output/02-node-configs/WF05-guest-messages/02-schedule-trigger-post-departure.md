> **⚠️ DEPRECATED v2.1** — Voir WF05-guest-messages.md pour justification.

# Node: Schedule Trigger Post-Departure (14:00)

**Type** : scheduleTrigger
**Mode** : Run Once for All Items

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| rule.interval[0].field | cronExpression | Expression cron |
| rule.interval[0].expression | 0 14 * * * | Tous les jours a 14:00 |
| options.timezone | Europe/Paris | Timezone CET |

## Connexions

- **Entree** : Aucune (trigger)
- **Sortie** : Config

## Notes

- 14:00 CET : envoyer le message de remerciement le jour du depart
- Ce trigger alimente le Flow C (post-depart)
