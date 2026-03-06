# Node: Supabase: Get Reporter

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture avec filtre |
| tableId | profiles | Table Supabase |
| returnAll | false | Limite a 1 resultat |
| limit | 1 | Un seul profil par ID |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=id=eq.{{ $('Webhook Trigger').item.json.body.reported_by }}&select=display_name,email,phone` | Profil du declarant |

## Sortie attendue

```json
{
  "display_name": "Sarah Martin",
  "email": "sarah@exemple.fr",
  "phone": "+33612345678"
}
```

## Connexions

- **Entree** : Supabase: Get Property
- **Sortie** : Supabase: Get Owner

## Notes

- Nouveau noeud — extrait de l'ancien fetch() dans Code: Build Urgent Email
- Recupere le nom, email et telephone du declarant du signalement
- Le telephone est utilise dans l'email urgent pour le bouton "Appeler"
