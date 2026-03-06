# Node: Supabase: Get Owner

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture avec filtre |
| tableId | profiles | Table Supabase |
| returnAll | false | Limite a 1 resultat |
| limit | 1 | Un seul owner par ID |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=id=eq.{{ $json.owner_id }}&select=id,email,display_name` | Profil owner par ID |

## Sortie attendue

```json
{
  "id": "uuid-owner-1",
  "email": "marc@exemple.fr",
  "display_name": "Marc Dupont"
}
```

## Connexions

- **Entree** : Code: Parse .ics
- **Sortie** : Supabase: Get DB Reservations

## Notes

- Remplace HTTP: Get Owner
- Retourne 1 item (pas tableau) — downstream `$json.email` au lieu de `$json[0].email`
- Recupere l'email du owner pour les alertes anomalies
- En multi-tenant, chaque bien a un owner_id different
