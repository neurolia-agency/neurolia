# Node: Send Email Owner Welcome

**Type** : emailSend
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| toEmail | `={{ $json.to }}` | Email owner |
| subject | `={{ $json.subject }}` | Sujet |
| html | `={{ $json.html }}` | Corps HTML |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| fromEmail | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Expediteur |
| emailType | html | HTML |

## Connexions

- **Entree** : Code: Build Owner Welcome Email
- **Sortie** : Aucune (fin Flow A)

## Notes

- Credential SMTP - Loc Immo
- Phase 2 : verifier si l'owner a des biens pre-existants avec iCal et trigger WF02
