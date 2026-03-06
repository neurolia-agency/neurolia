# Node: HTTP: Upsert Reservation

**Type** : httpRequest
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $('Config').item.json.DASHBOARD_URL }}/api/webhooks/n8n/reservation` | Endpoint upsert reservation |
| body | `={{ JSON.stringify($json.payload) }}` | Corps JSON payload reservation |
| headerParameters.x-api-key | `={{ $('Config').item.json.N8N_WEBHOOK_API_KEY }}` | Cle API authentification |
| headerParameters.x-idempotency-key | `={{ $json.idempotencyKey }}` | Cle idempotence anti-doublons |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| method | POST | Methode HTTP |
| url | (expression) | URL dynamique via Config |
| sendHeaders | true | Envoi headers custom |
| headerParameters.parameters[0].name | x-api-key | Header authentification |
| headerParameters.parameters[0].value | (expression) | Via Config |
| headerParameters.parameters[1].name | x-idempotency-key | Header idempotence |
| headerParameters.parameters[1].value | (expression) | Via Payload Builder |
| headerParameters.parameters[2].name | Content-Type | Type contenu |
| headerParameters.parameters[2].value | application/json | JSON |
| sendBody | true | Envoi body |
| bodyContentType | json | JSON body |
| jsonBody | (expression) | Payload depuis Payload Builder |
| options.retry.maxTries | 3 | 1 essai initial + 2 retries |
| options.retry.retryInterval | 5000 | 5 secondes entre retries |
| options.timeout | 30000 | Timeout 30s |

## Sortie attendue

```json
{
  "action": "created",
  "reservation": {
    "id": "uuid-reservation",
    "property_id": "uuid-property",
    "platform": "airbnb",
    "platform_ref_id": "HMXXXXXXXXXX",
    "status": "confirmed",
    "guest_name": "Jean Dupont",
    "check_in": "2026-03-15",
    "check_out": "2026-03-18",
    "nb_guests": 2,
    "amount": 450.00,
    "created_at": "2026-02-20T15:30:00.000Z"
  }
}
```

## Connexions

- **Entree** : Code: Payload Builder
- **Sortie** : IF: New Confirmed?

## Notes

- L'API retourne `action: "created"` (nouvelle reservation) ou `action: "updated"` (modification/annulation)
- L'idempotency key empeche les doublons en cas de re-processing
- Le retry (3 tentatives, 5s intervalle) couvre les interruptions reseau temporaires
- Si l'API retourne une erreur 4xx/5xx apres les retries, le Error Trigger (WF00) prend le relais
