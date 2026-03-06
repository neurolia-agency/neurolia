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
| filterString | `=id=eq.{{ $('Supabase: Get Property').item.json.owner_id }}&select=email,display_name` | Email et nom du proprietaire |

## Sortie attendue

```json
{
  "email": "marc@exemple.fr",
  "display_name": "Marc Dupont"
}
```

## Connexions

- **Entree** : Supabase: Get Reporter
- **Sortie** : Code: Build Urgent Email

## Notes

- Nouveau noeud — extrait de l'ancien fetch() dans Code: Build Urgent Email
- Recupere l'email du proprietaire pour l'envoi de l'alerte urgente
- Reference `$('Supabase: Get Property').item.json.owner_id` pour chainer les lookups
