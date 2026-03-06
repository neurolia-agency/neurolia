# Node: Send Email Staff

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
| toEmail | (expression) | Email staff |
| subject | (expression) | Sujet |
| emailType | html | HTML |
| html | (expression) | Corps |
| options.replyTo | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Reply-to |

## Connexions

- **Entree** : Split In Batches: Staff Emails (sortie 0)
- **Sortie** : Split In Batches: Staff Emails (retour loop)

## Notes

- Credential SMTP - Loc Immo
- continueOnFail : si un email echoue, on continue pour les autres staff
