# Node: HTTP: Confirm Task Created

**Type** : httpRequest
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $('Config').item.json.DASHBOARD_URL }}/api/webhooks/n8n/task-created` | Endpoint confirmation |
| body | (expression) | Confirmation payload |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| method | POST | Methode HTTP |
| url | (expression) | Via Config |
| sendHeaders | true | Headers |
| headerParameters.parameters[0].name | x-api-key | Authentification |
| headerParameters.parameters[0].value | `={{ $('Config').item.json.N8N_WEBHOOK_API_KEY }}` | Cle API |
| headerParameters.parameters[1].name | Content-Type | Type contenu |
| headerParameters.parameters[1].value | application/json | JSON |
| sendBody | true | Envoi body |
| bodyContentType | json | JSON body |
| jsonBody | `={{ JSON.stringify({ reservation_id: $('Code: Create Tasks').item.json.reservation_id, tasks_created: $('Code: Create Tasks').item.json.tasks_created, assignments: $('Code: Assign Round-Robin').item.json.assignments }) }}` | Confirmation |
| options.retry.maxTries | 2 | 1 essai + 1 retry |

## Sortie attendue

```json
{
  "success": true,
  "notification_sent": true
}
```

## Connexions

- **Entree** : Split In Batches: Emails (sortie 1 — loop done)
- **Sortie** : Aucune (fin du workflow)

## Notes

- Notifie l'App que les taches ont ete creees — permet une notification Realtime au owner
- Si cet appel echoue, ce n'est pas critique (les taches existent deja en base)
