# PATCH-001 — WF01 Email Parser : Fix import "Could not find property option"

**Date** : 2026-02-20
**Workflow** : WF01-email-parser.json
**Severite** : BLOQUANT (import impossible)
**Erreur** : `Problem importing workflow — Could not find property option`

---

## Cause racine

Les 2 noeuds **Switch v3.2** utilisaient le format de parametres de la **v1** (`dataType`, `value1`, `rules.rules[].value2/operation/output`). Ce schema n'existe pas dans Switch v3.2, ce qui provoque l'erreur d'import.

---

## Corrections appliquees

### 1. Switch: Email Router — format v1 → v3.2 (CRITIQUE)

| Avant (v1 invalide) | Apres (v3.2 valide) |
|---|---|
| `dataType: "string"` | Supprime (n'existe pas en v3) |
| `value1: "={{ ... }}"` | `leftValue` dans chaque condition |
| `rules.rules[].value2` | `rules.values[].conditions.conditions[].rightValue` |
| `rules.rules[].operation: "contains"` | `operator: { type: "string", operation: "contains" }` |
| `rules.rules[].output: 0` | Supprime (index implicite par position dans `values[]`) |
| `fallbackOutput: 2` (number, top-level) | `options.fallbackOutput: "extra"` (string, dans options) |

Ajout `renameOutput: true` + `outputKey` ("Airbnb", "Booking") pour lisibilite dans l'editeur.

### 2. Switch: Type Detector — format v1 → v3.2 (CRITIQUE)

Meme transformation que ci-dessus, avec 4 regles :
- `"equal"` → `"equals"` (nom d'operation corrige pour v3)
- 4 outputs nommes : Confirmation, Modification, Cancellation, Inquiry
- Fallback output : `"extra"`

**Mapping des sorties preservee** (indices identiques) :
| Index | Avant | Apres | Destination |
|-------|-------|-------|-------------|
| 0 | confirmation | Confirmation | Code: Payload Builder |
| 1 | modification | Modification | Code: Payload Builder |
| 2 | cancellation | Cancellation | Code: Payload Builder |
| 3 | inquiry | Inquiry | (aucune connexion) |
| 4 | fallback | extra | (aucune connexion) |

### 3. IF: New Confirmed? — propriete parasite supprimee

Suppression de `leftValue: ""` dans `conditions.options` (propriete invalide pour IF v2.2, probablement un artefact de generation).

### 4. HTTP: Upsert Reservation — retry deplace au niveau node

`options.retry` n'est pas un parametre valide du HTTP Request v4.2. La configuration retry est deplacee au niveau du noeud :

```
Avant (dans parameters.options) :
  "retry": { "maxTries": 3, "retryInterval": 5000 }

Apres (au niveau node) :
  "retryOnFail": true,
  "maxTries": 3,
  "waitBetweenTries": 5000
```

### 5. HTTP: Trigger WF04 — meme correction retry

Meme deplacement retry de `options` vers le niveau node.

---

## Fichier modifie

```
neurolia-immo/n8n/pipeline/output/04-workflows/WF01-email-parser.json
```

## Validation

- [x] JSON syntaxiquement valide (python3 json.load)
- [x] Connexions preservees (indices de sortie inchanges)
- [x] Logique metier inchangee (memes conditions, memes destinations)
- [ ] Re-import dans n8n a tester

## Impact

- Aucun changement fonctionnel
- Les noeuds Switch afficheront maintenant des labels nommes (Airbnb/Booking, Confirmation/Modification/etc.) au lieu d'indices numeriques
- Les HTTP Request utiliseront le mecanisme de retry natif de n8n
