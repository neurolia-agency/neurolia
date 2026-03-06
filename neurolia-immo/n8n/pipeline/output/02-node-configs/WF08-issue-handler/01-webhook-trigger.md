# Node: Webhook Trigger

**Type** : webhook
**Mode** : Run Once for Each Item

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| httpMethod | POST | Methode HTTP |
| path | issue-created | Route: /webhook/issue-created |
| authentication | headerAuth | Validation x-api-key |
| credential | Header Auth - API Key Dashboard | Credential headerAuth |
| responseMode | onReceived | Reponse immediate |
| responseCode | 200 | Code HTTP reponse |

## Sortie attendue

```json
{
  "body": {
    "issue_id": "uuid",
    "property_id": "uuid",
    "reported_by": "uuid",
    "type": "leak",
    "description": "Fuite d'eau sous l'evier de la cuisine",
    "photo_path": "task-photos/issue-xxx/photo-001.jpg"
  }
}
```

## Connexions

- **Entree** : Aucune (trigger — Supabase Database Webhook)
- **Sortie** : Config
