# Node: HTTP: Get Active Properties

**Type** : httpRequest
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $('Config').item.json.SUPABASE_URL }}/rest/v1/properties?is_active=eq.true&select=*,profiles!properties_owner_id_fkey(email,display_name)` | Properties + owner info |

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
    "id": "uuid-prop-1",
    "name": "Studio Marais",
    "is_active": true,
    "ical_airbnb_url": "https://...",
    "ical_booking_url": "https://...",
    "owner_id": "uuid-owner",
    "profiles": { "email": "marc@exemple.fr", "display_name": "Marc Dupont" }
  }
]
```

## Connexions

- **Entree** : Config
- **Sortie** : Code: Health Checks
