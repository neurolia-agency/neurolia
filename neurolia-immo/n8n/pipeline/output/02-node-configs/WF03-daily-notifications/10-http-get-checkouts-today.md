# Node: HTTP: Get Check-outs Today

**Type** : httpRequest
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $('Config').item.json.SUPABASE_URL }}/rest/v1/reservations?check_out=eq.{{ $now.toFormat('yyyy-MM-dd') }}&status=eq.confirmed&select=*,properties(name)` | Departs aujourd'hui |

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

## Connexions

- **Entree** : Config (Flow B — 08:00, en parallele)
- **Sortie** : Merge
