# Node: HTTP: Post iCal Alert

**Type** : httpRequest
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $('Config').item.json.DASHBOARD_URL }}/api/webhooks/n8n/ical-alert` | Endpoint alert anomalie |
| body | (expression) | Anomalies detectees |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| method | POST | Methode HTTP |
| url | (expression) | Via Config |
| sendHeaders | true | Envoi headers |
| headerParameters.parameters[0].name | x-api-key | Authentification |
| headerParameters.parameters[0].value | `={{ $('Config').item.json.N8N_WEBHOOK_API_KEY }}` | Cle API |
| headerParameters.parameters[1].name | Content-Type | Type contenu |
| headerParameters.parameters[1].value | application/json | JSON |
| sendBody | true | Envoi body |
| bodyContentType | json | JSON body |
| jsonBody | `={{ JSON.stringify({ property_id: $json.property_id, anomalies: $json.anomalies, synced_at: $json.synced_at }) }}` | Payload anomalies |
| options.retry.maxTries | 2 | 1 essai + 1 retry |

## Sortie attendue

```json
{
  "success": true,
  "anomalies_logged": 2
}
```

## Connexions

- **Entree** : IF: Has Anomalies? (sortie true)
- **Sortie** : Send Email: iCal Alert
