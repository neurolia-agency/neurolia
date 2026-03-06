> **⚠️ DEPRECATED v2.1** — Voir WF05-guest-messages.md pour justification.

# Node: Schedule Trigger Pre-Arrival (10:00)

**Type** : scheduleTrigger
**Mode** : Run Once for All Items

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| rule.interval[0].field | cronExpression | Expression cron |
| rule.interval[0].expression | 0 10 * * * | Tous les jours a 10:00 |
| options.timezone | Europe/Paris | Timezone CET |

## Connexions

- **Entree** : Aucune (trigger)
- **Sortie** : Config

## Notes

- 10:00 CET : envoyer le message de bienvenue la veille de l'arrivee
- Ce trigger alimente le Flow B (pre-arrivee J-1)
