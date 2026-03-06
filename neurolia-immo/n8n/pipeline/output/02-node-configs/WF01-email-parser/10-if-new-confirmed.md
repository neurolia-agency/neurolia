# Node: IF: New Confirmed?

**Type** : if
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| value1 | `={{ $('Code: Payload Builder').item.json._meta.isNewConfirmed }}` | Flag nouvelle reservation confirmee |
| value2 | true | Valeur de comparaison |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| conditions.boolean[0].value1 | (expression) | `_meta.isNewConfirmed` du Payload Builder |
| conditions.boolean[0].operation | equal | Egalite |
| conditions.boolean[0].value2 | true | Si c'est une nouvelle reservation confirmee |
| combineOperation | all | Toutes les conditions (une seule ici) |

## Sortie attendue

```json
{
  "action": "created",
  "reservation": {
    "id": "uuid-reservation",
    "property_id": "uuid-property",
    "check_in": "2026-03-15",
    "check_out": "2026-03-18",
    "nb_guests": 2,
    "guest_name": "Jean Dupont"
  }
}
```

## Connexions

- **Entree** : HTTP: Upsert Reservation
- **Sortie true** : HTTP: Trigger WF04
- **Sortie false** : NoOp (fin — modifications et annulations ne declenchent pas de tache menage)

## Notes

- Seules les NOUVELLES reservations CONFIRMEES declenchent la creation de taches menage
- Les modifications et annulations sont traitees cote App (mise a jour reservation existante)
- Le flag `isNewConfirmed` est calcule dans le Payload Builder pour centraliser la logique
