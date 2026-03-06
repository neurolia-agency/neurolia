# Node: Send Email

**Type** : emailSend
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| toEmail | `={{ $('Config').item.json.ADMIN_EMAIL }}` | Destinataire admin |
| subject | `={{ $json.emailSubject }}` | Sujet email |
| html | `={{ $json.emailHtml }}` | Corps HTML |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| fromEmail | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Expediteur |
| toEmail | (expression) | Email admin technique |
| subject | (expression) | Sujet avec severity + workflow name |
| emailType | html | HTML |
| html | (expression) | Corps HTML formate |
| options.replyTo | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Reply-to |

## Sortie attendue

```json
{
  "accepted": ["dorian@neurolia.fr"],
  "rejected": [],
  "messageId": "<msg-id@smtp>"
}
```

## Connexions

- **Entree** : Code: Format Error
- **Sortie** : Aucune (fin du workflow)

## Notes

- Credential SMTP - Loc Immo
- Si le SMTP est en panne, l'erreur est uniquement loggee dans les executions n8n (dernier recours)
- Le sujet est prefixe `[Neurolia-Immo]` pour faciliter le filtrage dans la boite email
- L'email est envoye a ADMIN_EMAIL (support Neurolia), pas au owner
