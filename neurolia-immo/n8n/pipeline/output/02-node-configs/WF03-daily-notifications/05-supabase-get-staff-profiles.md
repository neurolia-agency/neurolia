# Node: Supabase: Get Staff Profiles

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture multiple |
| tableId | profiles | Table Supabase |
| returnAll | true | Retourne tous les staff actifs |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=role=eq.cleaning_staff&is_active=eq.true` | Staff de menage actifs |

## Sortie attendue

```json
[
  {
    "id": "uuid-staff-1",
    "display_name": "Sarah Martin",
    "email": "sarah@exemple.fr"
  }
]
```

## Connexions

- **Entree** : Config (Flow A)
- **Sortie** : Code: Build Staff Emails

## Notes

- Remplace HTTP: Get Staff Profiles
- Filtre sur `role=cleaning_staff` et `is_active=true`
- Le node Supabase natif gere automatiquement l'authentification via credential supabaseApi
