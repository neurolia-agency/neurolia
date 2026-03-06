> **⚠️ DEPRECATED v2.1** — Voir WF05-guest-messages.md pour justification.

# Node: Split In Batches

**Type** : splitInBatches
**Mode** : Run Once for All Items

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| batchSize | 1 | Une reservation a la fois |

## Connexions

- **Entree** : HTTP: Get Reservations
- **Sortie 0** : HTTP: Check Duplicate (loop body)
- **Sortie 1** : NoOp (loop done)
