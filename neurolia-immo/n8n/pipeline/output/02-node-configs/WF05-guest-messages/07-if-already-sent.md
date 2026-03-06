> **⚠️ DEPRECATED v2.1** — Voir WF05-guest-messages.md pour justification.

# Node: IF: Already Sent?

**Type** : if
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| value1 | `={{ $json.length }}` | Nombre de messages deja envoyes |
| value2 | 0 | Aucun message |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| conditions.number[0].value1 | (expression) | Longueur tableau |
| conditions.number[0].operation | equal | Egalite |
| conditions.number[0].value2 | 0 | Pas encore envoye |

## Connexions

- **Entree** : HTTP: Check Duplicate
- **Sortie true (pas envoye)** : Code: Build Variables
- **Sortie false (deja envoye)** : Split In Batches (retour loop — skip)
