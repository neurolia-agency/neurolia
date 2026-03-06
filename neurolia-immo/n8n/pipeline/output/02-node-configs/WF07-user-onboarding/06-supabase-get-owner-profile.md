# Node: Supabase: Get Owner Profile

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
| filterString | `=id=eq.{{ $('Webhook Trigger').item.json.body.owner_id }}&select=id,display_name,email` | Profil owner du staff inscrit |

## Sortie attendue

```json
{
  "id": "uuid-owner",
  "display_name": "Marc Dupont",
  "email": "marc@exemple.fr"
}
```

## Connexions

- **Entree** : Switch: Role (sortie 1 — cleaning_staff)
- **Sortie** : Code: Build Staff Welcome Emails

## Notes

- Remplace HTTP: Get Owner Profile
- Utilise dans le flow staff : recupere le profil du owner pour inclure son nom/email dans l'email de bienvenue staff
- Reference `$('Webhook Trigger')` pour acceder au body du webhook `user.created`
