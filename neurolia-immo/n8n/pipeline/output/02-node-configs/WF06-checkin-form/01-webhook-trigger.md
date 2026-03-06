> **⚠️ DEPRECATED v2.2** — Voir WF06-checkin-form.md pour justification.

# Node: Webhook Trigger

**Type** : webhook
**Mode** : Run Once for Each Item

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| httpMethod | POST | Methode HTTP |
| path | wf06-checkin-notify | Route: /webhook/wf06-checkin-notify |
| authentication | headerAuth | Validation x-api-key |
| credential | Header Auth - API Key Dashboard | Credential headerAuth |
| responseMode | onReceived | Reponse immediate |
| responseCode | 200 | Code HTTP reponse |

## Sortie attendue

```json
{
  "body": {
    "reservationId": "uuid",
    "guestName": "Jean Dupont",
    "propertyName": "Studio Marais",
    "propertyId": "uuid",
    "checkIn": "2026-03-15",
    "checkOut": "2026-03-18",
    "arrivalTime": "22:30",
    "specialRequests": "Nous arrivons avec un bebe de 6 mois, avez-vous un lit bebe ?",
    "nbGuests": 3
  }
}
```

## Connexions

- **Entree** : Aucune (trigger)
- **Sortie** : Config
