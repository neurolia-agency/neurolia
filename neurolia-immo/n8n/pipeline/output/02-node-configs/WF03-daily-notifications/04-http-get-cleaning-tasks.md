# Node: HTTP: Get Cleaning Tasks Today

**Type** : httpRequest
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $('Config').item.json.SUPABASE_URL }}/rest/v1/cleaning_tasks?scheduled_date=eq.{{ $now.toFormat('yyyy-MM-dd') }}&status=in.(pending,in_progress)&select=*,properties(name,address,city,access_code,wifi_ssid,wifi_password,instructions),reservations(guest_name,nb_guests,arrival_time,special_requests)` | Query taches + join |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| method | GET | Methode HTTP |
| url | (expression) | PostgREST query avec join properties + reservations |
| sendHeaders | true | Headers Supabase |
| headerParameters.parameters[0].name | apikey | Cle API |
| headerParameters.parameters[0].value | `={{ $('Config').item.json.SUPABASE_SERVICE_KEY }}` | service_role |
| headerParameters.parameters[1].name | Authorization | Bearer token |
| headerParameters.parameters[1].value | `=Bearer {{ $('Config').item.json.SUPABASE_SERVICE_KEY }}` | service_role |

## Sortie attendue

```json
[
  {
    "id": "uuid-task-1",
    "property_id": "uuid-prop",
    "reservation_id": "uuid-resa",
    "type": "checkout_clean",
    "status": "pending",
    "scheduled_date": "2026-02-20",
    "scheduled_time": "11:00",
    "assigned_to": "uuid-staff-1",
    "notes": "Depart de Jean Dupont",
    "properties": {
      "name": "Studio Marais",
      "address": "12 rue des Rosiers",
      "city": "Paris",
      "access_code": "1234#",
      "wifi_ssid": "Studio_Marais",
      "wifi_password": "bienvenue2026",
      "instructions": "Poubelles sous l'evier"
    },
    "reservations": {
      "guest_name": "Jean Dupont",
      "nb_guests": 2,
      "arrival_time": null,
      "special_requests": null
    }
  }
]
```

## Connexions

- **Entree** : Config (Flow A — 07:00)
- **Sortie** : HTTP: Get Staff Profiles
