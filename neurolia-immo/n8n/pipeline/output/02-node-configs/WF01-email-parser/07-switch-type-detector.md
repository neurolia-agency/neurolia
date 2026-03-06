# Node: Switch: Type Detector

**Type** : switch
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| value | `={{ $json.emailType }}` | Type d'email detecte par le parser |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| dataType | string | Comparaison sur chaine |
| fallbackOutput | 4 | Output 4 = unknown |
| rules[0].value | confirmation | Reservation confirmee |
| rules[0].operation | equal | Egalite stricte |
| rules[0].output | 0 | Output 0 → Payload Builder |
| rules[1].value | modification | Modification dates/montant |
| rules[1].operation | equal | Egalite stricte |
| rules[1].output | 1 | Output 1 → Payload Builder |
| rules[2].value | cancellation | Annulation |
| rules[2].operation | equal | Egalite stricte |
| rules[2].output | 2 | Output 2 → Payload Builder |
| rules[3].value | inquiry | Demande de renseignement |
| rules[3].operation | equal | Egalite stricte |
| rules[3].output | 3 | Output 3 → NoOp (ignore) |

## Sortie attendue

```json
{
  "platform": "airbnb",
  "emailType": "confirmation",
  "guestName": "Jean Dupont",
  "checkIn": "2026-03-15",
  "checkOut": "2026-03-18",
  "checkInTime": "15:00",
  "checkOutTime": "11:00",
  "nbGuests": 2,
  "amount": 450.00,
  "platformRefId": "HMXXXXXXXXXX",
  "propertyName": "Studio Marais",
  "sourceEmailId": "<abc123@airbnb.com>",
  "_isPartialParse": false
}
```

## Connexions

- **Entree** : Code: Parser Airbnb / Code: Parser Booking
- **Sortie 0 (confirmation)** : Code: Payload Builder
- **Sortie 1 (modification)** : Code: Payload Builder
- **Sortie 2 (cancellation)** : Code: Payload Builder
- **Sortie 3 (inquiry)** : NoOp (fin de chaine — ignore)
- **Sortie 4 (unknown/fallback)** : NoOp (fin de chaine — ignore)

## Notes

- Les outputs 0, 1, 2 menent tous vers le Payload Builder mais permettent de distinguer le type pour le mapping status
- `inquiry` est ignore (les plateformes ne confirment pas les demandes de renseignement)
- `unknown` est ignore — si `emailType` n'a pas ete detecte, le workflow ne traite pas l'email
