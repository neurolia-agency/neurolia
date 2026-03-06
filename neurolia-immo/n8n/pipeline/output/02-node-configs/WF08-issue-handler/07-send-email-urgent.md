# Node: Send Email Urgent

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

- **Entree** : Code: Build Urgent Email
- **Sortie** : Aucune (fin du workflow)

## Notes

- Credential SMTP - Loc Immo
- Tous les signalements sont traites comme urgents (email immediat)
- Phase 2 : niveaux de severite avec routing different + push notification
