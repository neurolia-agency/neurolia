# Node: Supabase: Get Property

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture avec filtre |
| tableId | properties | Table Supabase |
| returnAll | false | Limite a 1 resultat |
| limit | 1 | Un seul bien par ID |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=id=eq.{{ $json.property_id }}&select=id,name,address,owner_id,check_in_time,check_out_time,check_in_mode` | Details du bien + mode check-in |

## Sortie attendue

```json
{
  "id": "uuid-property",
  "name": "Studio Marais",
  "address": "12 rue des Rosiers, 75004 Paris",
  "owner_id": "uuid-owner",
  "check_in_time": "15:00",
  "check_out_time": "11:00",
  "check_in_mode": "self_checkin"
}
```

## Connexions

- **Entree** : Code: Validate
- **Sortie** : Supabase: Get Existing Task

## Notes

- Remplace HTTP: Get Property
- Inclut `check_in_mode` pour la logique conditionnelle de creation tache `check_in_greeting` (v2.1)
- Inclut `check_in_time` et `check_out_time` pour la planification des taches
