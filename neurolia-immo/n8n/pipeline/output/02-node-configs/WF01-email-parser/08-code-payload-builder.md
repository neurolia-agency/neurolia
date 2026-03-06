# Node: Code: Payload Builder

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$input.item.json` (donnees parser) et `$('Config').item.json` (config) |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Traite chaque item individuellement |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF01 — Payload Builder
// Construit le payload pour POST /api/webhooks/n8n/reservation
// + lookup property_id via Supabase
// ============================================================

const config = $('Config').item.json;
const parsed = $input.item.json;

// --- Mapping emailType → status ---
const statusMap = {
  confirmation: "confirmed",
  modification: "modified",
  cancellation: "cancelled"
};
const status = statusMap[parsed.emailType] || "confirmed";

// --- Property lookup via Supabase ---
let propertyId = null;
let ownerId = null;

if (parsed.propertyName && parsed.propertyName !== "[NON DETECTE]") {
  try {
    const supabaseUrl = config.SUPABASE_URL;
    const supabaseKey = config.SUPABASE_SERVICE_KEY;

    // Recherche par nom (ilike pour tolerance casse)
    const searchName = encodeURIComponent(parsed.propertyName);
    const response = await fetch(
      `${supabaseUrl}/rest/v1/properties?name=ilike.*${searchName}*&select=id,owner_id,name&limit=1`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const properties = await response.json();

    if (properties && properties.length > 0) {
      propertyId = properties[0].id;
      ownerId = properties[0].owner_id;
    }
  } catch (err) {
    // Property lookup failed — continue without property_id
    // L'API App gerera le matching en fallback
  }
}

// --- Generer idempotency key ---
const idempotencyKey = `wf01-${parsed.platform}-${parsed.platformRefId}-${parsed.emailType}-${Date.now()}`;

// --- Construire le payload ---
const payload = {
  property_id: propertyId,
  owner_id: ownerId,
  platform: parsed.platform,
  platform_ref_id: parsed.platformRefId !== "[NON DETECTE]" ? parsed.platformRefId : null,
  status: status,
  source: "email",
  guest_name: parsed.guestName !== "[NON DETECTE]" ? parsed.guestName : null,
  guest_email: null, // Non disponible par email
  nb_guests: parsed.nbGuests || 1,
  check_in: parsed.checkIn !== "[NON DETECTE]" ? parsed.checkIn : null,
  check_out: parsed.checkOut !== "[NON DETECTE]" ? parsed.checkOut : null,
  check_in_time: parsed.checkInTime || null,
  check_out_time: parsed.checkOutTime || null,
  amount: parsed.amount,
  email_message_id: parsed.sourceEmailId || null,
  raw_email_data: {
    subject: parsed._rawSubject,
    parseQuality: parsed._parseQuality,
    isPartialParse: parsed._isPartialParse
  }
};

// --- Alertes parsing partiel ---
const alerts = [];
if (parsed._isPartialParse) {
  alerts.push({
    type: "partial_parse",
    message: `Parsing partiel pour email ${parsed.platform}: champs manquants`,
    missingFields: Object.entries(parsed._parseQuality)
      .filter(([k, v]) => !v)
      .map(([k]) => k)
  });
}

if (!propertyId && parsed.propertyName !== "[NON DETECTE]") {
  alerts.push({
    type: "property_not_found",
    message: `Propriete "${parsed.propertyName}" non trouvee en base`,
    propertyName: parsed.propertyName
  });
}

return [{
  json: {
    payload: payload,
    idempotencyKey: idempotencyKey,
    alerts: alerts,
    _meta: {
      emailType: parsed.emailType,
      platform: parsed.platform,
      isNewConfirmed: parsed.emailType === "confirmation" && status === "confirmed",
      isPartialParse: parsed._isPartialParse
    }
  }
}];
```

## Sortie attendue

```json
{
  "payload": {
    "property_id": "uuid-or-null",
    "owner_id": "uuid-or-null",
    "platform": "airbnb",
    "platform_ref_id": "HMXXXXXXXXXX",
    "status": "confirmed",
    "source": "email",
    "guest_name": "Jean Dupont",
    "guest_email": null,
    "nb_guests": 2,
    "check_in": "2026-03-15",
    "check_out": "2026-03-18",
    "check_in_time": "15:00",
    "check_out_time": "11:00",
    "amount": 450.00,
    "email_message_id": "<abc123@airbnb.com>",
    "raw_email_data": {
      "subject": "Reservation confirmee - 15-18 mars 2026",
      "parseQuality": { "guestName": true, "dates": true, "amount": true, "reference": true, "property": true },
      "isPartialParse": false
    }
  },
  "idempotencyKey": "wf01-airbnb-HMXXXXXXXXXX-confirmation-1710000000000",
  "alerts": [],
  "_meta": {
    "emailType": "confirmation",
    "platform": "airbnb",
    "isNewConfirmed": true,
    "isPartialParse": false
  }
}
```

## Connexions

- **Entree** : Switch: Type Detector (sorties 0, 1, 2)
- **Sortie** : HTTP: Upsert Reservation
