# Node: Send Email

**Type** : emailSend
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| toEmail | `={{ $json.to }}` | Destinataire staff |
| subject | `={{ $json.subject }}` | Sujet email |
| html | `={{ $json.html }}` | Corps HTML |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| fromEmail | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Expediteur |
| toEmail | (expression) | Email staff dynamique |
| subject | (expression) | Sujet dynamique |
| emailType | html | Email HTML |
| html | (expression) | Corps HTML dynamique |
| options.replyTo | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Reply-to |

## Sortie attendue

```json
{
  "accepted": ["sarah@exemple.fr"],
  "rejected": [],
  "messageId": "<msg-id@smtp>"
}
```

## Connexions

- **Entree** : Split In Batches: Emails (sortie 0)
- **Sortie** : Split In Batches: Emails (retour loop)

## Notes

- Credential SMTP - Loc Immo pour l'envoi
- Un email par iteration du batch
- Si l'envoi echoue, le loop continue pour les autres staff (continueOnFail)
