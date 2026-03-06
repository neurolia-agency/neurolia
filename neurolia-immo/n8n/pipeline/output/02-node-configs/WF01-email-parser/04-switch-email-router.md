# Node: Switch: Email Router

**Type** : switch
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| value | `={{ $('IMAP Trigger').item.json.from.value[0].address }}` | Adresse email expediteur |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| dataType | string | Comparaison sur chaine |
| fallbackOutput | 2 | Output index 2 = Unknown |
| rules[0].value | airbnb.com | Match Airbnb |
| rules[0].operation | contains | Contient le domaine |
| rules[0].output | 0 | Output 0 → Parser Airbnb |
| rules[1].value | booking.com | Match Booking |
| rules[1].operation | contains | Contient le domaine |
| rules[1].output | 1 | Output 1 → Parser Booking |

## Sortie attendue

```json
{
  "html": "... (email original inchange)",
  "textHtml": "... (email original inchange)",
  "subject": "... (email original inchange)",
  "from": { "value": [{ "address": "automated@airbnb.com" }] },
  "messageId": "<abc123@airbnb.com>"
}
```

## Connexions

- **Entree** : Config
- **Sortie 0** : Code: Parser Airbnb
- **Sortie 1** : Code: Parser Booking
- **Sortie 2 (fallback)** : Code: Unknown Email Alert (alerte admin)

## Notes

- Le switch route sur le domaine expediteur, pas sur le contenu
- Les emails non reconnus (sortie 2) declenchent une alerte vers ADMIN_EMAIL
- Booking utilise plusieurs sous-domaines (@booking.com, @guest.booking.com) — `contains` les couvre tous
