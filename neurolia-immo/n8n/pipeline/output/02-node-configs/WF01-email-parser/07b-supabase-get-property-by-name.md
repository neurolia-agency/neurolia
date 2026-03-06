# Node: Supabase: Get Property by Name

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture multiple avec filtre |
| tableId | properties | Table Supabase |
| returnAll | false | Limite a 1 resultat |
| limit | 1 | Recherche par nom exact |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=name=ilike.*{{ $json.propertyName }}*&select=id,owner_id,name` | Recherche insensible a la casse |
| options.onError | continueRegularOutput | Continue meme si aucun resultat |
| alwaysOutputData | true | Emet toujours un item (vide si 0 resultats) |

## Sortie attendue

```json
{
  "id": "uuid-property",
  "owner_id": "uuid-owner",
  "name": "Studio Marais"
}
```

Si aucun bien trouve : item vide `{}` (grace a `alwaysOutputData: true`).

## Connexions

- **Entree** : Switch: Type Detector (sorties 0/1/2)
- **Sortie** : Code: Payload Builder

## Notes

- Nouveau noeud — extrait de l'ancien fetch() dans Code: Payload Builder
- Recherche `ilike` (case-insensitive) car les noms de biens dans les emails peuvent varier en casse
- `alwaysOutputData: true` garantit que le Payload Builder recoit toujours un item, meme sans correspondance
- Le Payload Builder gere le cas ou `id` est absent (erreur ou fallback)
