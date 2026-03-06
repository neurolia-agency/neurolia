# Node: Split In Batches

**Type** : splitInBatches
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Recoit le tableau de properties |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| batchSize | 1 | Traitement sequentiel par bien |
| options.reset | false | Ne pas reinitialiser |

## Sortie attendue

```json
{
  "id": "uuid-property-1",
  "name": "Studio Marais",
  "owner_id": "uuid-owner-1",
  "ical_airbnb_url": "https://www.airbnb.fr/calendar/ical/xxx.ics",
  "ical_booking_url": "https://admin.booking.com/xxx.ics"
}
```

## Connexions

- **Entree** : HTTP: Get Properties
- **Sortie 0** : HTTP: Fetch iCal Airbnb (loop body)
- **Sortie 1** : Code: Aggregate Results (loop done — quand tous les biens sont traites)

## Notes

- Batch size 1 pour traitement sequentiel — eviter de surcharger les serveurs iCal
- Chaque iteration traite un seul bien (fetch Airbnb + Booking + compare + upsert)
