# Node: Send Email Admin

**Type** : emailSend
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| toEmail | `={{ $('Config').item.json.ADMIN_EMAIL }}` | Email admin technique |
| subject | `={{ $json.subject }}` | Sujet email |
| html | `={{ $json.html }}` | Corps HTML |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| fromEmail | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Expediteur |
| emailType | html | HTML |

## Connexions

- **Entree** : Code: Build Alert Email
- **Sortie** : Aucune (fin du workflow)

## Notes

- Credential SMTP - Loc Immo
- L'email est envoye a ADMIN_EMAIL (support Neurolia), pas aux owners individuels
- Le health check couvre TOUTES les proprietes de TOUS les owners
