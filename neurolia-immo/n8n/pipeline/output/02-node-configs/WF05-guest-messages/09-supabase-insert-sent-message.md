> **DEPRECATED v2.1** -- Voir WF05-guest-messages.md pour justification.

# Node: Supabase: Insert sent_message

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | create | Insertion d'un nouveau record |
| tableId | sent_messages | Table Supabase |
| fieldsUi.fieldValues[0].fieldId | reservation_id | `={{ $json.reservation_id }}` |
| fieldsUi.fieldValues[1].fieldId | type | `={{ $json.trigger_event }}` |
| fieldsUi.fieldValues[2].fieldId | subject | `={{ $json.subject }}` |
| fieldsUi.fieldValues[3].fieldId | recipient_email | `={{ $json.guest_email }}` |
| fieldsUi.fieldValues[4].fieldId | status | `={{ $json.has_email ? 'pending' : 'failed' }}` |

## Sortie attendue

```json
{
  "id": "uuid-sent-message",
  "reservation_id": "uuid-resa",
  "type": "pre_arrival",
  "subject": "Bienvenue — Studio Marais",
  "recipient_email": "guest@exemple.com",
  "status": "pending"
}
```

## Connexions

- **Entree** : Code: Build Variables
- **Sortie** : IF: Has Guest Email?

## Notes

- Remplace HTTP: Insert sent_message. DEPRECATED v2.1
- Cree un record avec status 'pending' (ou 'failed' si pas d'email voyageur)
- Le record est ensuite mis a jour en 'sent' apres envoi reussi
