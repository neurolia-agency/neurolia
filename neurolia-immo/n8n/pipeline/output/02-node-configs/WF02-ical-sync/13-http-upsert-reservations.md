# Node: HTTP: Upsert Reservations

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$json.upsert_payloads` et `$('Config')` |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par bien |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF02 — Upsert iCal reservations via API
// Envoie chaque payload individuellement a l'API App
// ============================================================

const config = $('Config').item.json;
const compareResult = $input.item.json;
const payloads = compareResult.upsert_payloads || [];

const results = [];

for (const payload of payloads) {
  const idempotencyKey = `wf02-ical-${payload.platform}-${payload.ical_uid}-${Date.now()}`;

  try {
    const response = await fetch(
      `${config.DASHBOARD_URL}/api/webhooks/n8n/reservation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.N8N_WEBHOOK_API_KEY,
          'x-idempotency-key': idempotencyKey
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();
    results.push({
      success: response.ok,
      action: data.action || 'unknown',
      ical_uid: payload.ical_uid,
      check_in: payload.check_in,
      check_out: payload.check_out,
      status_code: response.status
    });
  } catch (err) {
    results.push({
      success: false,
      error: err.message,
      ical_uid: payload.ical_uid,
      check_in: payload.check_in,
      check_out: payload.check_out
    });
  }
}

return [{
  json: {
    ...compareResult,
    upsert_results: results,
    upserts_successful: results.filter(r => r.success).length,
    upserts_failed: results.filter(r => !r.success).length
  }
}];
```

## Sortie attendue

```json
{
  "property_id": "uuid-property-1",
  "property_name": "Studio Marais",
  "upsert_payloads": [...],
  "anomalies": [...],
  "upsert_results": [
    {
      "success": true,
      "action": "created",
      "ical_uid": "event-123@airbnb.com",
      "check_in": "2026-03-15",
      "check_out": "2026-03-18",
      "status_code": 200
    }
  ],
  "upserts_successful": 1,
  "upserts_failed": 0
}
```

## Connexions

- **Entree** : IF: Has Upserts? (sortie true)
- **Sortie** : IF: Has Anomalies?
