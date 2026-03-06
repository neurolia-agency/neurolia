# Node: IMAP Trigger

**Type** : emailReadImap
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Trigger node — pas d'entree |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| mailbox | INBOX | Boite de reception |
| postProcessAction | markAsRead | Marquer comme lu apres traitement |
| format | resolved | Format HTML resolve |
| options.customEmailConfig | -- | Utilise credential IMAP - Reservations |
| forceReconnect | true | Eviter sessions IMAP zombies |

## Sortie attendue

```json
{
  "html": "<html>... contenu email Airbnb/Booking ...</html>",
  "textHtml": "<html>... contenu email (alias v2 IMAP) ...</html>",
  "text": "Texte brut de l'email",
  "subject": "Reservation confirmee - 19-20 fevr. 2026",
  "from": { "value": [{ "address": "reservation@airbnb.com", "name": "Airbnb" }] },
  "to": { "value": [{ "address": "reservations@locimmo.fr" }] },
  "date": "2026-02-19T15:30:00.000Z",
  "messageId": "<abc123@airbnb.com>",
  "headers": {}
}
```

## Connexions

- **Entree** : Aucune (trigger)
- **Sortie** : Config
