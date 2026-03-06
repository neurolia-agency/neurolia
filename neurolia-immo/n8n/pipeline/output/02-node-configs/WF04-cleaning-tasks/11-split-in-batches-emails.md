# Node: Split In Batches: Emails

**Type** : splitInBatches
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Recoit le tableau d'emails depuis Build Notification Emails |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| batchSize | 1 | Un email a la fois |

## Connexions

- **Entree** : Code: Build Notification Emails
- **Sortie 0** : Send Email (loop body)
- **Sortie 1** : HTTP: Confirm Task Created (loop done)
