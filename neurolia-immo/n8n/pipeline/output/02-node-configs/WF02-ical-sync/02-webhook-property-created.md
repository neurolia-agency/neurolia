# Node: Webhook property.created

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
| path | property-created | Route: /webhook/property-created |
| authentication | headerAuth | Validation x-api-key |
| credential | Header Auth - API Key Dashboard | Credential headerAuth |
| responseMode | onReceived | Reponse immediate |
| responseCode | 200 | Code HTTP reponse |

## Sortie attendue

```json
{
  "body": {
    "property_id": "uuid-property",
    "owner_id": "uuid-owner",
    "name": "Studio Marais",
    "ical_airbnb_url": "https://www.airbnb.fr/calendar/ical/xxx.ics",
    "ical_booking_url": "https://admin.booking.com/xxx.ics"
  }
}
```

## Connexions

- **Entree** : Aucune (trigger alternatif — Flow B)
- **Sortie** : Config

## Notes

- Declenche une sync immediate pour un nouveau bien
- Appele depuis l'App quand un owner cree un bien avec des URLs iCal
- Peut aussi etre appele par WF07 (onboarding) pour les biens pre-existants
