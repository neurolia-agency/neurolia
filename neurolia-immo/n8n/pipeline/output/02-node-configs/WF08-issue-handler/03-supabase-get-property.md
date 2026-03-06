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
| filterString | `=id=eq.{{ $('Webhook Trigger').item.json.body.property_id }}&select=name,address,owner_id` | Nom, adresse, owner du bien |

## Sortie attendue

```json
{
  "name": "Studio Marais",
  "address": "12 rue des Rosiers, 75004 Paris",
  "owner_id": "uuid-owner"
}
```

## Connexions

- **Entree** : Config
- **Sortie** : Supabase: Get Reporter

## Notes

- Nouveau noeud — extrait de l'ancien fetch() dans Code: Build Urgent Email
- Recupere les infos du bien concerne par le signalement
- `owner_id` est utilise par le noeud suivant pour recuperer le profil du proprietaire
