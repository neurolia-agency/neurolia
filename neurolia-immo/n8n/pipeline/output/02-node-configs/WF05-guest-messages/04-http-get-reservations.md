> **⚠️ DEPRECATED v2.1** — Voir WF05-guest-messages.md pour justification.

# Node: HTTP: Get Reservations

**Type** : httpRequest
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url (Flow B) | `={{ $('Config').item.json.SUPABASE_URL }}/rest/v1/reservations?check_in=eq.{{ $now.plus(1, 'days').toFormat('yyyy-MM-dd') }}&status=eq.confirmed&select=*,properties(name,access_code),welcome_guides!inner(slug)` | Reservations arrivant demain |
| url (Flow C) | `={{ $('Config').item.json.SUPABASE_URL }}/rest/v1/reservations?check_out=eq.{{ $now.toFormat('yyyy-MM-dd') }}&status=eq.confirmed&select=*,properties(name)` | Reservations partant aujourd'hui |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| method | GET | Methode HTTP |
| sendHeaders | true | Headers Supabase |
| headerParameters.parameters[0].name | apikey | service_role |
| headerParameters.parameters[0].value | `={{ $('Config').item.json.SUPABASE_SERVICE_KEY }}` | |
| headerParameters.parameters[1].name | Authorization | Bearer |
| headerParameters.parameters[1].value | `=Bearer {{ $('Config').item.json.SUPABASE_SERVICE_KEY }}` | |

## Sortie attendue

```json
[
  {
    "id": "uuid-resa",
    "guest_name": "Jean Dupont",
    "guest_email": "jean@email.com",
    "check_in": "2026-02-21",
    "check_out": "2026-02-24",
    "properties": { "name": "Studio Marais", "access_code": "1234#" },
    "welcome_guides": { "slug": "studio-marais-2026" }
  }
]
```

## Connexions

- **Entree** : Config
- **Sortie** : Split In Batches
