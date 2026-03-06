# Node: Error Trigger

**Type** : errorTrigger
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Trigger node — recoit automatiquement l'objet erreur |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| -- | -- | Aucun parametre configurable — trigger automatique |

## Sortie attendue

```json
{
  "execution": {
    "id": "12345",
    "url": "https://n8n.locimmo.fr/workflow/xxx/executions/12345",
    "retryOf": null,
    "error": {
      "message": "ECONNREFUSED - connect ECONNREFUSED 127.0.0.1:5432",
      "node": {
        "name": "HTTP: Get Properties",
        "type": "n8n-nodes-base.httpRequest"
      }
    },
    "lastNodeExecuted": "HTTP: Get Properties",
    "mode": "trigger"
  },
  "workflow": {
    "id": "abc123",
    "name": "WF02 — iCal Sync"
  }
}
```

## Connexions

- **Entree** : Aucune (trigger declenche par erreur d'un autre workflow)
- **Sortie** : Config

## Notes

- Ce trigger se declenche quand un workflow qui a WF00 configure comme "Error Workflow" echoue
- Chaque workflow (WF01-WF09) doit avoir WF00 dans ses Settings > Error Workflow
- WF00 lui-meme ne doit PAS avoir WF00 comme error workflow (eviter les boucles)
