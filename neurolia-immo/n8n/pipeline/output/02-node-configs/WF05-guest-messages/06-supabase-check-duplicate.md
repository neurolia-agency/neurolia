> **DEPRECATED v2.1** -- Voir WF05-guest-messages.md pour justification.

# Node: Supabase: Check Duplicate

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture avec filtre |
| tableId | sent_messages | Table Supabase |
| returnAll | true | Retourne tous les resultats (attendu 0 ou 1) |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=reservation_id=eq.{{ $json.id }}&trigger_event=eq.pre_arrival&status=eq.sent&select=id` | Verifier si deja envoye |

## Sortie attendue

Tableau vide `[]` si aucun message deja envoye, ou tableau avec un ID si deja envoye.

## Connexions

- **Entree** : Split In Batches
- **Sortie** : IF: Already Sent?

## Notes

- Remplace HTTP: Check Duplicate. DEPRECATED v2.1
- Deduplication stricte : si un message a deja ete envoye avec status 'sent' pour cette reservation + trigger_event, on skip
- `trigger_event` est 'pre_arrival' (Flow B) ou 'post_departure' (Flow C)
