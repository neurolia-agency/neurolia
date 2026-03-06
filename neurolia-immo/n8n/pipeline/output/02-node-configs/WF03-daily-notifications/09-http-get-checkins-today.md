# Node: HTTP: Get Check-ins Today

**Type** : httpRequest
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $('Config').item.json.SUPABASE_URL }}/rest/v1/reservations?check_in=eq.{{ $now.toFormat('yyyy-MM-dd') }}&status=eq.confirmed&select=*,properties(name)` | Arrivees aujourd'hui |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| method | GET | Methode HTTP |
| url | (expression) | PostgREST query |
| sendHeaders | true | Headers Supabase |
| headerParameters.parameters[0].name | apikey | Cle API |
| headerParameters.parameters[0].value | `={{ $('Config').item.json.SUPABASE_SERVICE_KEY }}` | service_role |
| headerParameters.parameters[1].name | Authorization | Bearer token |
| headerParameters.parameters[1].value | `=Bearer {{ $('Config').item.json.SUPABASE_SERVICE_KEY }}` | service_role |

## Sortie attendue

```json
[
  {
    "id": "uuid-resa-1",
    "guest_name": "Jean Dupont",
    "check_in": "2026-02-20",
    "check_out": "2026-02-23",
    "nb_guests": 2,
    "arrival_time": "15:00",
    "special_requests": null,
    "properties": { "name": "Studio Marais" }
  }
]
```

## Connexions

- **Entree** : Config (Flow B — 08:00)
- **Sortie** : Merge (en parallele avec les 3 autres queries)
