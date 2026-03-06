> **⚠️ DEPRECATED v2.1** — Voir WF05-guest-messages.md pour justification.

# Node: IF: Has Guest Email?

**Type** : if
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| value1 | `={{ $('Code: Build Variables').item.json.has_email }}` | Flag email disponible |
| value2 | true | Comparaison |

## Connexions

- **Entree** : HTTP: Insert sent_message
- **Sortie true** : Send Email Guest
- **Sortie false** : Split In Batches (retour loop — skip sans email)

## Notes

- Si `guest_email` est null (frequent pour les reservations iCal), le message est deja marque 'failed' dans sent_messages
- Ce n'est PAS une erreur critique — juste une info manquante
