> **⚠️ DEPRECATED v2.2** — Voir WF06-checkin-form.md pour justification.

# Node: Send Email Owner

**Type** : emailSend
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| toEmail | `={{ $json.ownerEmail }}` | Email du owner |
| subject | `={{ $json.subject }}` | Sujet email |
| html | `={{ $json.html }}` | Corps HTML |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| fromEmail | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Expediteur |
| emailType | html | HTML |

## Connexions

- **Entree** : Code: Validate & Detect Priority
- **Sortie** : Aucune (fin du workflow)

## Notes

- Credential SMTP - Loc Immo
- Les emails prioritaires ont le prefixe [ATTENTION] dans le sujet
- Les emails standard ont un header bleu, les prioritaires un header rouge
