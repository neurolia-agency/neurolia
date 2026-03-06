# Node: Config

**Type** : set
**Mode** : Run Once for All Items

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| assignments[0].name | DASHBOARD_URL | `={{ $env.DASHBOARD_URL }}` |
| assignments[1].name | ADMIN_EMAIL | `={{ $env.ADMIN_EMAIL }}` |
| assignments[2].name | SMTP_FROM_EMAIL | `={{ $env.SMTP_FROM_EMAIL }}` |
| assignments[3].name | SUPABASE_URL | `={{ $env.SUPABASE_URL }}` |
| assignments[4].name | SUPABASE_SERVICE_KEY | `={{ $env.SUPABASE_SERVICE_KEY }}` |

## Connexions

- **Entree** : Schedule Trigger
- **Sortie** : HTTP: Get Active Properties
