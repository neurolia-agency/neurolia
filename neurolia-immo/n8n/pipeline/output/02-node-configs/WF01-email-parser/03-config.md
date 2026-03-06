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
| assignments[1].name | N8N_WF04_WEBHOOK_URL | URL webhook WF04 |
| assignments[1].value | `={{ $env.N8N_WF04_WEBHOOK_URL }}` | Ex: https://n8n.locimmo.fr/webhook/wf04-cleaning-task |
| assignments[2].name | N8N_WEBHOOK_API_KEY | Cle API webhooks |
| assignments[2].value | `={{ $env.N8N_WEBHOOK_API_KEY }}` | Cle partagee n8n/App |
| assignments[3].name | ADMIN_EMAIL | Email admin technique |
| assignments[3].value | `={{ $env.ADMIN_EMAIL }}` | Ex: dorian@neurolia.fr |
| assignments[4].name | SUPABASE_URL | URL Supabase |
| assignments[4].value | `={{ $env.SUPABASE_URL }}` | Ex: https://xxx.supabase.co |
| assignments[5].name | SUPABASE_SERVICE_KEY | Service role key |
| assignments[5].value | `={{ $env.SUPABASE_SERVICE_KEY }}` | Cle service_role chiffree |

## Sortie attendue

```json
{
  "DASHBOARD_URL": "https://app.locimmo.fr",
  "N8N_WF04_WEBHOOK_URL": "https://n8n.locimmo.fr/webhook/wf04-cleaning-task",
  "N8N_WEBHOOK_API_KEY": "***",
  "ADMIN_EMAIL": "dorian@neurolia.fr",
  "SUPABASE_URL": "https://xxx.supabase.co",
  "SUPABASE_SERVICE_KEY": "***"
}
```

## Connexions

- **Entree** : IMAP Trigger (Flow A) / Webhook imap.configured (Flow B)
- **Sortie** : Switch: Email Router

## Notes

- Pattern v2 : noeud Set charge les variables depuis `$env`
- Les autres noeuds accedent via `$('Config').item.json.VARIABLE_NAME`
- En production, les valeurs `$env` sont definies dans la config Docker/instance n8n
