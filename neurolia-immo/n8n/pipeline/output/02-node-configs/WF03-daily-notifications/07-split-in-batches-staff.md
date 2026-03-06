# Node: Split In Batches: Staff Emails

**Type** : splitInBatches
**Mode** : Run Once for All Items

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| batchSize | 1 | Un email a la fois |

## Connexions

- **Entree** : Code: Build Staff Emails
- **Sortie 0** : Send Email Staff (loop body)
- **Sortie 1** : NoOp (loop done — fin Flow A)
