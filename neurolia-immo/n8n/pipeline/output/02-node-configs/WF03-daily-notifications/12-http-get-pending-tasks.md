# Node: HTTP: Get Pending Tasks

**Type** : httpRequest
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $('Config').item.json.SUPABASE_URL }}/rest/v1/cleaning_tasks?status=eq.pending&select=*,properties(name),profiles!cleaning_tasks_assigned_to_fkey(display_name)` | Taches en attente |

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
