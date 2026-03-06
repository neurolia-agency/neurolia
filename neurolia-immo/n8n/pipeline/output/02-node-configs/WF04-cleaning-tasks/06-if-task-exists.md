# Node: IF: Task Exists?

**Type** : if
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| value1 | `={{ $json.length }}` | Nombre de taches existantes |
| value2 | 0 | Aucune tache |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| conditions.number[0].value1 | (expression) | Longueur du tableau retourne |
| conditions.number[0].operation | equal | Egalite |
| conditions.number[0].value2 | 0 | Pas de tache existante |

## Connexions

- **Entree** : HTTP: Get Existing Task
- **Sortie true (0 tasks)** : Code: Create Tasks (creer les taches)
- **Sortie false (task exists)** : NoOp (skip — taches deja creees)

## Notes

- Si une tache checkout_clean existe deja pour cette reservation, on ne recree rien
- Cela couvre le cas de re-processing d'un email (parsing email recu 2x)
