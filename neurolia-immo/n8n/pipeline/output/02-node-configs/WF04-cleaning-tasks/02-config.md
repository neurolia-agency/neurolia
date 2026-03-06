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
| assignments[1].name | SUPABASE_URL | URL Supabase |
| assignments[1].value | `={{ $env.SUPABASE_URL }}` | Ex: https://xxx.supabase.co |
| assignments[2].name | SUPABASE_SERVICE_KEY | Service role key |
| assignments[2].value | `={{ $env.SUPABASE_SERVICE_KEY }}` | Cle service_role |
| assignments[3].name | SMTP_FROM_EMAIL | Email expediteur |
| assignments[3].value | `={{ $env.SMTP_FROM_EMAIL }}` | Ex: noreply@locimmo.fr |
| assignments[4].name | N8N_WEBHOOK_API_KEY | Cle API |
| assignments[4].value | `={{ $env.N8N_WEBHOOK_API_KEY }}` | Cle partagee |

## Sortie attendue

```json
{
  "DASHBOARD_URL": "https://app.locimmo.fr",
  "SUPABASE_URL": "https://xxx.supabase.co",
  "SUPABASE_SERVICE_KEY": "***",
  "SMTP_FROM_EMAIL": "noreply@locimmo.fr",
  "N8N_WEBHOOK_API_KEY": "***"
}
```

## Connexions

- **Entree** : Webhook Trigger
- **Sortie** : Code: Validate
