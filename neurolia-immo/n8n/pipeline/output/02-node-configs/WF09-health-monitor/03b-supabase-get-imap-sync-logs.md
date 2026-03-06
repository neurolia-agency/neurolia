# Node: Supabase: Get IMAP Sync Logs

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture avec filtre |
| tableId | sync_logs | Table Supabase |
| returnAll | false | Limite a 5 resultats |
| limit | 5 | 5 derniers logs IMAP |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=source=eq.imap&order=synced_at.desc` | Logs IMAP tries par date descendante |

## Sortie attendue

```json
[
  {
    "id": "uuid-log-1",
    "source": "imap",
    "synced_at": "2026-03-15T10:00:00.000Z",
    "status": "success",
    "items_processed": 3
  },
  {
    "id": "uuid-log-2",
    "source": "imap",
    "synced_at": "2026-03-15T09:58:00.000Z",
    "status": "success",
    "items_processed": 0
  }
]
```

## Connexions

- **Entree** : HTTP: Get Active Properties
- **Sortie** : Code: Health Checks

## Notes

- Nouveau noeud — extrait de l'ancien fetch() dans Code: Health Checks
- Recupere les 5 derniers logs de sync IMAP pour verifier la fraicheur du polling email
- Le Code: Health Checks utilise `synced_at` pour detecter si le polling IMAP est en retard (seuil configurable)
