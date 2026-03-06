# Node: HTTP: Fetch iCal Booking

**Type** : httpRequest
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $('Split In Batches').item.json.ical_booking_url }}` | URL iCal Booking du bien |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| method | GET | Methode HTTP |
| url | (expression) | URL iCal dynamique |
| options.timeout | 15000 | Timeout 15s |
| options.redirect.follow | true | Suivre les redirections |
| options.response.fullResponse | false | Body uniquement |
| onError | continueRegularOutput | Continuer meme en cas d'erreur |

## Sortie attendue

```json
{
  "data": "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Booking.com//EN\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:20260320\nDTEND;VALUE=DATE:20260323\nSUMMARY:Marie Martin\nUID:event-456@booking.com\nEND:VEVENT\nEND:VCALENDAR"
}
```

## Connexions

- **Entree** : HTTP: Fetch iCal Airbnb
- **Sortie** : Code: Parse .ics

## Notes

- Meme configuration que le fetch Airbnb
- On recupere la donnee depuis Split In Batches (pas le noeud precedent) pour avoir l'URL Booking du meme bien
- Si l'URL Booking est null, le body sera vide et le parser l'ignorera
