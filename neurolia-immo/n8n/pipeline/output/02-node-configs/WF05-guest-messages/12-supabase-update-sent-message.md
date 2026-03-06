> **DEPRECATED v2.1** -- Voir WF05-guest-messages.md pour justification.

# Node: Supabase: Update sent_message

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | update | Mise a jour d'un record existant |
| tableId | sent_messages | Table Supabase |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=id=eq.{{ $('Supabase: Insert sent_message').item.json.id }}` | Record a mettre a jour |
| fieldsUi.fieldValues[0].fieldId | status | sent |
| fieldsUi.fieldValues[1].fieldId | sent_at | `={{ $now.toISO() }}` |

## Sortie attendue

```json
{
  "id": "uuid-sent-message",
  "status": "sent",
  "sent_at": "2026-03-15T10:30:00.000Z"
}
```

## Connexions

- **Entree** : Send Email Guest
- **Sortie** : (fin)

## Notes

- Remplace HTTP: Update sent_message. DEPRECATED v2.1
- Marque le message comme 'sent' avec horodatage apres envoi reussi de l'email
