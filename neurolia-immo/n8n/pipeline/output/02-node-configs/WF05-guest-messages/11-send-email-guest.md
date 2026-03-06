> **⚠️ DEPRECATED v2.1** — Voir WF05-guest-messages.md pour justification.

# Node: Send Email Guest

**Type** : emailSend
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| toEmail | `={{ $('Code: Build Variables').item.json.guest_email }}` | Email du voyageur |
| subject | `={{ $('Code: Build Variables').item.json.subject }}` | Sujet email |
| html | `={{ $('Code: Build Variables').item.json.html }}` | Corps HTML |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| fromEmail | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Expediteur |
| emailType | html | HTML |
| options.replyTo | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Reply-to |

## Connexions

- **Entree** : IF: Has Guest Email? (sortie true)
- **Sortie** : HTTP: Update sent_message

## Notes

- Credential SMTP - Loc Immo
- Si SMTP echoue, le sent_message reste en 'pending' et le noeud suivant le mettra en 'failed'
