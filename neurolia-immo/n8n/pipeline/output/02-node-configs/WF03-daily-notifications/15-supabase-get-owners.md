# Node: Supabase: Get Owners

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture multiple |
| tableId | profiles | Table Supabase |
| returnAll | true | Retourne tous les owners actifs |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=role=eq.owner&is_active=eq.true` | Owners actifs |

## Sortie attendue

```json
[
  {
    "id": "uuid-owner-1",
    "email": "marc@exemple.fr",
    "display_name": "Marc Dupont"
  }
]
```

## Connexions

- **Entree** : Code: Build Owner HTML
- **Sortie** : Send Email Owner

## Notes

- Remplace HTTP: Get Owners
- Multi-tenant v2 : envoie le digest a chaque owner
- Pour l'instant (v2 MVP), un seul owner
