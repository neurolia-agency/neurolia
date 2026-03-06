# Node: Split In Batches + Send Email

**Type** : splitInBatches + emailSend
**Mode** : Run Once for All Items / Run Once for Each Item

## Split In Batches

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| batchSize | 1 | Un email a la fois |

## Send Email

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| fromEmail | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Expediteur |
| toEmail | `={{ $json.to }}` | Destinataire dynamique |
| subject | `={{ $json.subject }}` | Sujet dynamique |
| emailType | html | HTML |
| html | `={{ $json.html }}` | Corps dynamique |

## Connexions

- **Entree** : Code: Build Staff Welcome Emails
- **Sortie** : Aucune (fin Flow B)

## Notes

- Envoie 2 emails : 1 au staff (bienvenue) + 1 au owner (notification)
- Credential SMTP - Loc Immo
