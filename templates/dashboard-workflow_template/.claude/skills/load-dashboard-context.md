# Skill : load-dashboard-context

## Description

Charger le contexte complet du projet dashboard et identifier la prochaine etape a executer. A utiliser au debut de chaque session de travail.

## Usage

Invoquer au debut de chaque session pour se synchroniser avec l'etat du projet.

## Process

### 1. Lire les fichiers de contexte

Lire dans cet ordre :
1. `CLAUDE.md` — statut pipeline, roles, ADN visuel, flux de contexte
2. `PLAN.md` — checklist detaillee, batchs, journal, etat actuel

### 2. Identifier l'etat actuel

A partir de PLAN.md, extraire :
- **Phase en cours** : A (Architecture) ou B (Developpement)
- **Etape en cours** : Derniere etape avec au moins 1 item non-coche
- **Items restants** : Liste des items non-coches de l'etape en cours
- **Bloqueurs** : Section "Bloqueurs" de PLAN.md

### 3. Charger le contexte pertinent

Selon la phase en cours, lire les fichiers additionnels :

**Phase A** :
- Le stage correspondant dans `pipeline/stages/[AXX]-[nom].md`
- Les outputs des etapes precedentes dans `pipeline/output/`

**Phase B** :
- `pipeline/output/03-structure/data-model.md` (toujours)
- `pipeline/output/03-structure/auth-strategy.md` (toujours)
- `pipeline/output/03-structure/routes.md` (toujours)
- `app/globals.css` (si existe)
- Le wireframe de la page en cours (si applicable)
- `.claude/rules/agent-models.md` (pour attribution modele)

### 4. Produire un resume

Generer un resume structure :

```markdown
## Contexte — [NOM_PROJET]

**Phase** : [A/B] — [Nom etape]
**Derniere session** : [Date et description du journal]
**Prochaine action** : [Action precise]

### Etat Pipeline
[Copie du tableau statut depuis CLAUDE.md — uniquement les etapes pertinentes]

### Items restants (etape en cours)
- [ ] [Item 1]
- [ ] [Item 2]

### Bloqueurs
- [Bloqueur ou "Aucun"]

### Fichiers charges
- [Liste des fichiers lus avec leur role]
```

### 5. Recommandation

Suggerer :
- Le **modele** a utiliser (haiku/sonnet/opus) selon agent-models.md
- L'**agent** a invoquer selon le type de tache
- Les **fichiers a lire** specifiquement pour la prochaine action
