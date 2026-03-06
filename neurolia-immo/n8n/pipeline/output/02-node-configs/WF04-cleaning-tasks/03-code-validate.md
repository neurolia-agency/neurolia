# Node: Code: Validate

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$('Webhook Trigger').item.json.body` |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par item |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF04 — Validate incoming reservation payload
// ============================================================

const body = $('Webhook Trigger').item.json.body;

const required = ['property_id', 'check_in', 'check_out'];
const missing = required.filter(field => !body[field]);

if (missing.length > 0) {
  throw new Error(`Champs requis manquants: ${missing.join(', ')}`);
}

// Validation format dates
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
if (!dateRegex.test(body.check_in)) {
  throw new Error(`Format check_in invalide: ${body.check_in} (attendu: YYYY-MM-DD)`);
}
if (!dateRegex.test(body.check_out)) {
  throw new Error(`Format check_out invalide: ${body.check_out} (attendu: YYYY-MM-DD)`);
}

// Validation check_out > check_in
if (new Date(body.check_out) <= new Date(body.check_in)) {
  throw new Error(`check_out (${body.check_out}) doit etre apres check_in (${body.check_in})`);
}

return [{
  json: {
    reservation_id: body.id || null,
    property_id: body.property_id,
    check_in: body.check_in,
    check_out: body.check_out,
    nb_guests: body.nb_guests || 1,
    guest_name: body.guest_name || 'Voyageur',
    check_in_time: body.check_in_time || null,
    check_out_time: body.check_out_time || null
  }
}];
```

## Sortie attendue

```json
{
  "reservation_id": "uuid-reservation",
  "property_id": "uuid-property",
  "check_in": "2026-03-15",
  "check_out": "2026-03-18",
  "nb_guests": 2,
  "guest_name": "Jean Dupont",
  "check_in_time": null,
  "check_out_time": null
}
```

## Connexions

- **Entree** : Config
- **Sortie** : HTTP: Get Property
