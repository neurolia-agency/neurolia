# Node: Supabase: Get Available Staff

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture multiple |
| tableId | profiles | Table Supabase |
| returnAll | true | Retourne tout le staff disponible |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=role=eq.cleaning_staff&is_active=eq.true&owner_id=eq.{{ $('Supabase: Get Property').item.json.owner_id }}` | Staff actif du meme owner |

## Sortie attendue

```json
[
  {
    "id": "uuid-staff-1",
    "display_name": "Sarah Martin",
    "email": "sarah@exemple.fr",
    "phone": "+33612345678"
  },
  {
    "id": "uuid-staff-2",
    "display_name": "Pierre Durand",
    "email": "pierre@exemple.fr",
    "phone": null
  }
]
```

## Connexions

- **Entree** : Code: Create Tasks
- **Sortie** : Code: Assign Round-Robin

## Notes

- Remplace HTTP: Get Available Staff
- Filtre par `owner_id` pour le multi-tenant : ne retourne que le staff rattache au proprietaire du bien
- Reference `$('Supabase: Get Property')` au lieu de `$('HTTP: Get Property')`
