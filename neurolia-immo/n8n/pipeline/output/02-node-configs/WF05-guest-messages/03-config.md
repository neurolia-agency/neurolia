> **⚠️ DEPRECATED v2.1** — Voir WF05-guest-messages.md pour justification.

# Node: Config

**Type** : set
**Mode** : Run Once for All Items

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| assignments[0].name | DASHBOARD_URL | `={{ $env.DASHBOARD_URL }}` |
| assignments[1].name | SMTP_FROM_EMAIL | `={{ $env.SMTP_FROM_EMAIL }}` |
| assignments[2].name | SMTP_FROM_NAME | `={{ $env.SMTP_FROM_NAME }}` |
| assignments[3].name | SUPABASE_URL | `={{ $env.SUPABASE_URL }}` |
| assignments[4].name | SUPABASE_SERVICE_KEY | `={{ $env.SUPABASE_SERVICE_KEY }}` |

## Connexions

- **Entree** : Schedule Trigger Pre-Arrival / Schedule Trigger Post-Departure
- **Sortie** : HTTP: Get Reservations
