# Node: Config

**Type** : set
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Variables chargees statiquement |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| mode | manual | Valeurs definies manuellement |
| assignments[0].name | DASHBOARD_URL | URL base app |
| assignments[0].value | `={{ $env.DASHBOARD_URL }}` | Ex: https://app.locimmo.fr |
| assignments[1].name | SMTP_FROM_EMAIL | Email expediteur |
| assignments[1].value | `={{ $env.SMTP_FROM_EMAIL }}` | Ex: noreply@locimmo.fr |
| assignments[2].name | SMTP_FROM_NAME | Nom expediteur |
| assignments[2].value | `={{ $env.SMTP_FROM_NAME }}` | Ex: Neurolia-Immo |
| assignments[3].name | SUPABASE_URL | URL Supabase |
| assignments[3].value | `={{ $env.SUPABASE_URL }}` | |
| assignments[4].name | SUPABASE_SERVICE_KEY | Service role key |
| assignments[4].value | `={{ $env.SUPABASE_SERVICE_KEY }}` | |

## Sortie attendue

```json
{
  "DASHBOARD_URL": "https://app.locimmo.fr",
  "SMTP_FROM_EMAIL": "noreply@locimmo.fr",
  "SMTP_FROM_NAME": "Neurolia-Immo",
  "SUPABASE_URL": "https://xxx.supabase.co",
  "SUPABASE_SERVICE_KEY": "***"
}
```

## Connexions

- **Entree** : Schedule Trigger Staff / Schedule Trigger Owner
- **Sortie** : HTTP: Get Cleaning Tasks Today (Flow A) / HTTP: Get Check-ins Today (Flow B)
