# Node: Send Email Owner

**Type** : emailSend
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| toEmail | `={{ $('HTTP: Get Owners').item.json[0].email }}` | Email du owner |
| subject | `={{ $('Code: Build Owner HTML').item.json.subject }}` | Sujet email |
| html | `={{ $('Code: Build Owner HTML').item.json.html }}` | Corps HTML |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| fromEmail | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Expediteur |
| toEmail | (expression) | Email owner dynamique |
| subject | (expression) | Sujet |
| emailType | html | HTML |
| html | (expression) | Corps |

## Sortie attendue

```json
{
  "accepted": ["marc@exemple.fr"],
  "rejected": [],
  "messageId": "<msg-id@smtp>"
}
```

## Connexions

- **Entree** : HTTP: Get Owners
- **Sortie** : Aucune (fin du Flow B)

## Notes

- Credential SMTP - Loc Immo
- Si aucune donnee (0 arrivees, 0 departs, 0 taches), l'email est quand meme envoye avec "Aucun mouvement prevu"
