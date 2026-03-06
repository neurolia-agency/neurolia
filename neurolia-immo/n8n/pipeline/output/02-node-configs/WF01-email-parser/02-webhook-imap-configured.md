# Node: Webhook imap.configured

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
| path | imap-configured | Route: /webhook/imap-configured |
| authentication | headerAuth | Validation x-api-key |
| credential | Header Auth - API Key Dashboard | Credential headerAuth |
| responseMode | onReceived | Reponse immediate, traitement async |
| responseCode | 200 | Code HTTP reponse |
| options.rawBody | false | Parse JSON body |

## Sortie attendue

```json
{
  "body": {
    "property_id": "uuid-property",
    "owner_id": "uuid-owner",
    "imap_host": "imap.gmail.com",
    "imap_email": "reservations@locimmo.fr"
  },
  "headers": {
    "x-api-key": "***"
  }
}
```

## Connexions

- **Entree** : Aucune (trigger alternatif — Flow B)
- **Sortie** : Config

## Notes

- Ce trigger alimente le Flow B (premier parsing apres configuration IMAP)
- Le Flow B necessite un Code node additionnel pour scanner les 30 derniers jours
- En v2 MVP, ce flow peut etre simplifie : on attend le prochain polling IMAP
