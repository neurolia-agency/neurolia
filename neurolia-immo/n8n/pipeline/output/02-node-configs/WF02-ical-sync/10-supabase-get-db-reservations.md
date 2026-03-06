# Node: Supabase: Get DB Reservations

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture multiple |
| tableId | reservations | Table Supabase |
| returnAll | true | Retourne toutes les reservations dans la fenetre |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=property_id=eq.{{ $('Code: Parse .ics').item.json.property_id }}&check_out=gte.{{ $now.minus(7, 'days').toFormat('yyyy-MM-dd') }}&check_in=lte.{{ $now.plus(90, 'days').toFormat('yyyy-MM-dd') }}&status=neq.cancelled&select=id,platform,platform_ref_id,source,guest_name,check_in,check_out,status,ical_uid` | Fenetre -7j/+90j, actives uniquement |

## Sortie attendue

```json
[
  {
    "id": "uuid-resa-1",
    "platform": "airbnb",
    "platform_ref_id": "HMXXXXXXXXXX",
    "source": "email",
    "guest_name": "Jean Dupont",
    "check_in": "2026-03-15",
    "check_out": "2026-03-18",
    "status": "confirmed",
    "ical_uid": null
  }
]
```

## Connexions

- **Entree** : Supabase: Get Owner
- **Sortie** : Code: Compare iCal vs DB

## Notes

- Remplace HTTP: Get DB Reservations
- Filtre sur les reservations dans la fenetre -7j / +90j
- Exclut les reservations annulees (status != cancelled)
- Le `ical_uid` permet de matcher les reservations iCal avec les reservations DB existantes
