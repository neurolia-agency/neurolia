# Etape N01 : Workflow Architecture

> **Phase N : Conception & Generation** - Premiere etape du pipeline.

## Objectif

Analyser les fonctionnalites et contrats API pour concevoir l'arbre complet des workflows n8n (main workflows + sub-workflows), avec leurs specifications detaillees.

## Skills

- `n8n-architect` : Conception d'architectures de workflows n8n
- `n8n-workflow-patterns` : Patterns de workflows n8n (error handling, branching, pagination)

## Input

- `pipeline/input/imports/features.md` : Liste des fonctionnalites de l'application
- `pipeline/input/imports/api-contracts.md` : Contrats des endpoints API
- `pipeline/input/imports/webhook-map.md` : Mapping des webhooks

## Instructions

### 1. Analyser les fonctionnalites

Lire `features.md` et identifier chaque fonctionnalite qui necessite une automation n8n :
- Notifications (push, email, SMS)
- Synchronisation de donnees entre services
- Traitements planifies (cron)
- Reactions aux evenements (webhooks)
- Integrations tierces (paiement, analytics, etc.)

### 2. Mapper les interactions API

Croiser `api-contracts.md` et `webhook-map.md` pour determiner :
- Quels endpoints sont appeles par chaque workflow
- Quels webhooks declenchent un workflow
- Quels flux de donnees circulent entre workflows

### 3. Concevoir l'arbre des workflows

Organiser les workflows en arbre hierarchique :
- **Main workflows** (WF01, WF02, ...) : workflows autonomes declenches par un trigger
- **Sub-workflows** (SW01, SW02, ...) : workflows reutilisables appeles par d'autres

### 4. Rediger les specifications

Pour chaque workflow, creer un fichier de specification detaille.

## Output

### `01-architecture/workflow-tree.md`

Arbre ASCII representant la hierarchie des workflows :

```markdown
# Arbre des Workflows

## Vue d'ensemble

Total : [X] main workflows + [Y] sub-workflows

## Arbre

```
[NOM_APP] n8n Workflows
├── WF01 — [Nom workflow 1]
│   ├── Trigger: [Type]
│   └── Appelle: SW01, SW03
├── WF02 — [Nom workflow 2]
│   ├── Trigger: [Type]
│   └── Appelle: SW02
├── ...
│
├── Sub-workflows
│   ├── SW01 — [Nom sub-workflow 1]
│   │   └── Appele par: WF01, WF03
│   ├── SW02 — [Nom sub-workflow 2]
│   │   └── Appele par: WF02
│   └── ...
```

## Matrice de dependances

| Workflow | Depends on | Called by |
|----------|-----------|-----------|
| WF01 | SW01, SW03 | - |
| SW01 | - | WF01, WF03 |
| ... | ... | ... |
```

### `01-architecture/workflow-specs/`

Un fichier par workflow (ex: `WF01-nom-workflow.md`, `SW01-nom-sub.md`) :

```markdown
# WFXX — [Nom]

**Type** : Main workflow | Sub-workflow
**Trigger** : [Type de trigger — Webhook / Cron / Manual / Execute Workflow]
**Nodes principaux** : [Chaine de nodes en ordre d'execution]
**Donnees entrantes** : [Description des donnees recues]
**Donnees sortantes** : [Description des donnees produites]
**Sub-workflows** : [Liste des sub-workflows appeles ou N/A]
**Webhook expose** : [Oui/Non + URL pattern si applicable]
**Error handling** : [Strategie — retry, notification, fallback]

## Flux detaille

1. [Trigger] → Recoit [donnees]
2. [Node X] → Transforme / Filtre [donnees]
3. [Node Y] → Appelle [endpoint / service]
4. [Node Z] → Retourne [resultat]

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| GET | /api/... | Recuperer [donnees] |
| POST | /api/... | Envoyer [donnees] |

## Notes

[Considerations particulieres, edge cases, contraintes]
```

## Validation

- [ ] Toutes les fonctionnalites de `features.md` sont couvertes par au moins un workflow
- [ ] Chaque endpoint de `api-contracts.md` utilise est reference dans au moins un workflow-spec
- [ ] Chaque webhook de `webhook-map.md` a un workflow avec le trigger correspondant
- [ ] L'arbre est coherent (pas de sub-workflow orphelin, pas de reference cassee)
- [ ] Les strategies d'error handling sont definies pour chaque workflow
- [ ] Les types de trigger sont valides pour n8n
- [ ] Les flux de donnees entre workflows sont documentes
- [ ] Le nommage suit la convention (WFXX pour main, SWXX pour sub)

## Prochaine Etape

Une fois `output/01-architecture/` cree → Passer a `stages/N02-node-design.md`

---

**Version** : 1.0
**Phase** : N01 (Conception & Generation)
**Dependances** : Aucune (premiere etape — necessite imports)
**Produit pour** : N02 (Node Design), N04 (JSON Generation)
