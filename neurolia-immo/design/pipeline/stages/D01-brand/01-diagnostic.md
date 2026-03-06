# D01 Phase 1 : Diagnostic

> **Brand & Identity** - Lecture du brief et evaluation du point de depart.

## Objectif

Analyser le PRD et les assets existants pour evaluer le point de depart de la marque et identifier les ecrans de l'application qui recevront les messages.

## Input

- `pipeline/input/imports/prd.md`
- `pipeline/input/imports/features.md`
- `pipeline/input/assets/` (logo et visuels existants)

## Instructions

### 1. Lire le PRD

Extraire les informations cles :

- **Nom de l'app** : identifiant principal
- **Mission** : pourquoi cette app existe
- **Cible** : profil utilisateur principal
- **Probleme resolu** : douleur principale adressée
- **Differenciateurs** : ce qui rend cette app unique
- **Ton implicite** : indices sur le registre de communication

### 2. Evaluer le Point de Depart

Determiner le niveau de maturite de la marque :

| Niveau | Description | Action |
|--------|-------------|--------|
| **Neant** | Aucune identite existante | Creer de zero |
| **Embryonnaire** | Nom + idee vague | Structurer et enrichir |
| **Partiel** | Logo + couleurs mais pas de strategie | Completer la strategie |
| **Complet** | Charte existante | Adapter au mobile |

### 3. Identifier les Ecrans de l'App

A partir de `features.md` et du PRD, lister les ecrans principaux :

```markdown
## Ecrans Identifies

### Ecrans d'entree
- [ ] Splash / Loading
- [ ] Onboarding (X etapes)
- [ ] Login / Register

### Ecrans principaux (tabs)
- [ ] Home / Dashboard
- [ ] [Tab 2]
- [ ] [Tab 3]
- [ ] Profile / Settings

### Ecrans secondaires
- [ ] [Detail item]
- [ ] [Formulaire]
- [ ] [Resultats]

### Ecrans utilitaires
- [ ] Notifications
- [ ] Search
- [ ] Error / 404
```

**Pourquoi** : Chaque ecran recevra un message specifique en Phase 3a (positioning.md).

### 4. Identifier les Points de Contact Message

Pour chaque ecran, noter ou un message de marque peut apparaitre :

| Ecran | Zone message | Type |
|-------|-------------|------|
| Onboarding | Titre + sous-titre | Accroche emotionnelle |
| Home | Header / Hero | Tagline ou salutation |
| Empty state | Centre ecran | Message encourageant |
| Success | Modal / Toast | Confirmation positive |
| Error | Modal / Toast | Message rassurant |

## Output

Document interne (pas de fichier output). Les informations sont utilisees dans les phases 2 et 3.

Resume de diagnostic a conserver en memoire :

```markdown
## Resume Diagnostic

- **App** : [Nom]
- **Maturite marque** : [Neant / Embryonnaire / Partiel / Complet]
- **Cible principale** : [Description courte]
- **Probleme principal** : [Description courte]
- **Nb ecrans identifies** : [X]
- **Nb points de contact message** : [X]
- **Assets existants** : [Liste]
```

## Phase Suivante

→ `D01-brand/02-platform.md`

---

**Version** : 1.0
**Phase** : D01 - Sous-phase 1/4
