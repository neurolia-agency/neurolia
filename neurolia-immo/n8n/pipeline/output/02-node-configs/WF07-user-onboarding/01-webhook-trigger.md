# Node: Webhook Trigger

**Type** : webhook
**Mode** : Run Once for Each Item

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| httpMethod | POST | Methode HTTP |
| path | user-created | Route: /webhook/user-created |
| authentication | headerAuth | Validation x-api-key |
| credential | Header Auth - API Key Dashboard | Credential headerAuth |
| responseMode | onReceived | Reponse immediate |
| responseCode | 200 | Code HTTP reponse |

## Sortie attendue

```json
{
  "body": {
    "user_id": "uuid",
    "email": "marc@exemple.fr",
    "display_name": "Marc Dupont",
    "role": "owner"
  }
}
```

## Connexions

- **Entree** : Aucune (trigger — Supabase Database Webhook)
- **Sortie** : Config
