# Node: Webhook Trigger

**Type** : webhook
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Trigger node — pas d'entree |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| httpMethod | POST | Methode HTTP |
| path | wf04-cleaning-task | Route: /webhook/wf04-cleaning-task |
| authentication | headerAuth | Validation x-api-key |
| credential | Header Auth - API Key Dashboard | Credential headerAuth |
| responseMode | onReceived | Reponse immediate |
| responseCode | 200 | Code HTTP reponse |

## Sortie attendue

```json
{
  "body": {
    "id": "uuid-reservation",
    "property_id": "uuid-property",
    "check_in": "2026-03-15",
    "check_out": "2026-03-18",
    "nb_guests": 2,
    "guest_name": "Jean Dupont"
  }
}
```

## Connexions

- **Entree** : Aucune (trigger)
- **Sortie** : Config

## Notes

- Appele par WF01 apres detection d'une nouvelle reservation confirmee
- Le payload contient les donnees minimales de la reservation
