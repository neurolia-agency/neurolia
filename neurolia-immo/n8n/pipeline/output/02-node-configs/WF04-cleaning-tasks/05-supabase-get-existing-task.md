# Node: Supabase: Get Existing Task

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture avec filtre |
| tableId | cleaning_tasks | Table Supabase |
| returnAll | true | Retourne tous les resultats (attendu 0 ou 1) |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=reservation_id=eq.{{ $('Code: Validate').item.json.reservation_id }}&type=eq.checkout_clean&select=id,type,status` | Verifier doublon tache checkout |

## Sortie attendue

```json
[]
```

Tableau vide si aucune tache existante (cas nominal).

## Connexions

- **Entree** : Supabase: Get Property
- **Sortie** : IF: Task Exists?

## Notes

- Remplace HTTP: Get Existing Task
- Si le resultat est un tableau vide, aucune tache n'existe — creer
- Si le resultat contient une tache, skip la creation checkout_clean
- Idempotence : evite les doublons en cas de re-processing
