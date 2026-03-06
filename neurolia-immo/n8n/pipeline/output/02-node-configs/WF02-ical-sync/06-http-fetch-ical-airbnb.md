# Node: HTTP: Fetch iCal Airbnb

**Type** : httpRequest
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $json.ical_airbnb_url }}` | URL iCal Airbnb du bien |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| method | GET | Methode HTTP |
| url | (expression) | URL iCal dynamique |
| options.timeout | 15000 | Timeout 15s (serveurs iCal parfois lents) |
| options.redirect.follow | true | Suivre les redirections |
| options.response.response.body | true | Inclure le body |
| options.response.fullResponse | false | Body uniquement |
| onError | continueRegularOutput | Continuer meme en cas d'erreur |
| options.batching.batch.batchSize | 1 | Pas de batching |

## Sortie attendue

```json
{
  "data": "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Airbnb//EN\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:20260315\nDTEND;VALUE=DATE:20260318\nSUMMARY:Jean Dupont\nUID:event-123@airbnb.com\nDESCRIPTION:HMXXXXXXXXXX\nEND:VEVENT\nEND:VCALENDAR"
}
```

## Connexions

- **Entree** : Split In Batches (sortie 0)
- **Sortie** : HTTP: Fetch iCal Booking

## Notes

- `onError: continueRegularOutput` : si le fetch echoue (URL expiree, 403, 404), on continue avec un body vide
- Le timeout de 15s est genereux — les serveurs iCal Airbnb repondent habituellement en < 5s
- Si l'URL est null, le noeud ne sera pas execute (gere par le Code: Parse .ics qui verifie les donnees)
