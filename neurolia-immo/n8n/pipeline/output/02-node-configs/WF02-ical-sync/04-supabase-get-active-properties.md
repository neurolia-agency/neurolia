# Node: Supabase: Get Active Properties

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture multiple |
| tableId | properties | Table Supabase |
| returnAll | true | Retourne tous les resultats |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=is_active=eq.true&or=(ical_airbnb_url.not.is.null,ical_booking_url.not.is.null)&select=id,name,owner_id,ical_airbnb_url,ical_booking_url` | Biens actifs avec au moins un iCal |

## Sortie attendue

```json
[
  {
    "id": "uuid-property-1",
    "name": "Studio Marais",
    "owner_id": "uuid-owner-1",
    "ical_airbnb_url": "https://www.airbnb.fr/calendar/ical/xxx.ics",
    "ical_booking_url": "https://admin.booking.com/xxx.ics"
  },
  {
    "id": "uuid-property-2",
    "name": "Appartement Bastille",
    "owner_id": "uuid-owner-1",
    "ical_airbnb_url": "https://www.airbnb.fr/calendar/ical/yyy.ics",
    "ical_booking_url": null
  }
]
```

## Connexions

- **Entree** : Config
- **Sortie** : Split In Batches

## Notes

- Remplace HTTP: Get Properties
- Filtre `is_active=eq.true` pour ne traiter que les biens actifs
- Filtre `or=(ical_airbnb_url.not.is.null,ical_booking_url.not.is.null)` pour ne traiter que les biens avec au moins une URL iCal
- Le node Supabase natif gere automatiquement l'authentification via credential supabaseApi
