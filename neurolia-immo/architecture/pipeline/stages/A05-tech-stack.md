# Etape A05 : Tech Stack

> **Phase A : Architecture** - Selection argumentee de la stack technique et guide de setup.

## Objectif

Evaluer les options techniques sur la base des contraintes projet, produire une decision argumentee avec matrice de scoring, et fournir un guide de setup complet.

## Skill

`app-tech-selector`

## Input

- `pipeline/output/01-brief/prd.md`
- `pipeline/output/01-brief/features.md`

## Output

Creer 2 fichiers dans `pipeline/output/05-tech/` :

### 1. tech-stack.md

```markdown
# Tech Stack - [Nom du Projet]

## Decision

**Stack retenue** : [PWA (Next.js) | React Native (Expo) | Flutter | Natif]
**Justification** : [Resume en 2-3 phrases]

## Matrice de Decision

| Critere | Poids | PWA (Next.js) | React Native (Expo) | Flutter | Natif (Swift/Kotlin) |
|---------|-------|---------------|---------------------|---------|---------------------|
| Presence Store | 20% | 1 - Non requis | 5 - iOS + Android | 5 - iOS + Android | 5 - iOS + Android |
| Mode Offline | 15% | 2 - Service Workers | 4 - AsyncStorage + SQLite | 4 - Hive/Isar | 5 - Core Data / Room |
| Features Natives | 15% | 1 - Limites | 4 - Camera, GPS, Push, Bio | 4 - Camera, GPS, Push, Bio | 5 - Tout |
| Budget | 15% | 5 - 1 codebase web | 4 - 1 codebase mobile | 4 - 1 codebase mobile | 1 - 2 codebases |
| Performance | 10% | 2 - Web | 3 - Bridge JS | 4 - Compile natif | 5 - Natif pur |
| Time-to-Market | 10% | 5 - Rapide | 4 - Rapide | 3 - Moyen | 1 - Lent |
| Ecosphère / Libs | 10% | 5 - NPM | 4 - NPM + natif | 3 - pub.dev | 4 - Ecosysteme natif |
| Competences Equipe | 5% | [1-5] | [1-5] | [1-5] | [1-5] |
| **Score Total** | **100%** | **[X.X]** | **[X.X]** | **[X.X]** | **[X.X]** |

## Guide de Decision Rapide

### Choisir PWA (Next.js) si :
- Pas de presence Store requise
- Budget limite
- Features web suffisantes (pas de camera, GPS limité, pas de push avance)
- Equipe web existante (React, Next.js)
- Mise en marche rapide prioritaire

### Choisir React Native / Expo si :
- Presence Store necessaire (iOS + Android)
- Features natives requises (camera, GPS, push, biometrie)
- Mode offline complexe
- Equipe JavaScript/React existante
- Budget pour 1 codebase multi-plateforme

### Choisir Flutter si :
- Performance critique (animations fluides, listes lourdes)
- Design custom pousse (pas de composants natifs standard)
- Equipe prete a investir dans Dart
- Projet long terme avec maintenance

### Choisir Natif (Swift / Kotlin) si :
- AR/VR, performances critiques, hardware specifique
- Integration profonde avec l'OS
- Budget et equipe pour 2 codebases
- Exigences Apple/Google specifiques

## Contraintes Specifiques du Projet

| Contrainte | Impact sur le Choix |
|------------|-------------------|
| [Contrainte 1 depuis PRD] | [Impact] |
| [Contrainte 2 depuis PRD] | [Impact] |
| [Contrainte 3 depuis PRD] | [Impact] |

## Stack Detaillee

### Frontend Mobile
| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| Framework | [Choix] | [Version] | [Justification] |
| Navigation | [Choix] | [Version] | [Justification] |
| State Management | [Choix] | [Version] | [Justification] |
| Formulaires | [Choix] | [Version] | [Justification] |
| UI Components | [Choix] | [Version] | [Justification] |
| Animations | [Choix] | [Version] | [Justification] |

### Backend
| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| Runtime | [Choix] | [Version] | [Justification] |
| Framework | [Choix] | [Version] | [Justification] |
| Base de donnees | [Choix] | [Version] | [Justification] |
| Auth | [Choix] | [Version] | [Justification] |
| File Storage | [Choix] | [Version] | [Justification] |
| Hosting | [Choix] | - | [Justification] |

### Outils
| Composant | Technologie | Usage |
|-----------|-------------|-------|
| Automations | n8n | Webhooks, notifications, synchro |
| CI/CD | [Choix] | Build et deploiement |
| Monitoring | [Choix] | Erreurs et performances |
| Analytics | [Choix] | Usage et metriques |
```

### 2. project-setup.md

```markdown
# Project Setup - [Nom du Projet]

## Pre-requis

| Outil | Version | Installation |
|-------|---------|-------------|
| [Runtime] | [Version] | [Commande ou lien] |
| [Package Manager] | [Version] | [Commande ou lien] |
| [CLI] | [Version] | [Commande ou lien] |
| [IDE Extension] | [Version] | [Lien] |

## Initialisation

### 1. Creer le projet

```bash
[Commande d'initialisation du projet]
```

### 2. Installer les dependances

```bash
[Commande d'installation des packages]
```

### 3. Configuration

**Variables d'environnement** :
```env
# App
APP_NAME=[Nom]
APP_ENV=development

# API
API_BASE_URL=http://localhost:3000/v1

# Auth
JWT_SECRET=
JWT_REFRESH_SECRET=

# Database
DATABASE_URL=

# n8n
N8N_WEBHOOK_SECRET=
N8N_BASE_URL=

# Services tiers
[SERVICE]_API_KEY=
```

### 4. Structure du Projet

```
[nom-projet]/
├── [structure specifique a la stack choisie]
```

### 5. Scripts de Developpement

```bash
[Commandes de dev, build, test, lint]
```

## Checklist de Setup

- [ ] Runtime installe ([version])
- [ ] Projet initialise
- [ ] Dependances installees
- [ ] Variables d'environnement configurees
- [ ] Base de donnees configuree
- [ ] Serveur de dev demarre
- [ ] Premier build reussi
```

## Instructions

1. **Analyser les contraintes** depuis le PRD :
   - Plateformes cibles (iOS, Android, Web)
   - Features natives requises (offline, push, geoloc, camera, biometrie)
   - Budget et timeline
   - Competences de l'equipe
2. **Scorer chaque option** dans la matrice de decision :
   - Ponderer selon les priorites du projet
   - Justifier chaque score
3. **Decider** la stack avec justification claire
4. **Detailler** la stack retenue (frontend, backend, outils)
5. **Produire** le guide de setup avec toutes les commandes

## Validation

- [ ] Matrice de decision complete avec scores
- [ ] Justification claire du choix de stack
- [ ] Impact des contraintes projet documente
- [ ] Stack frontend detaillee (framework, nav, state, UI, animations)
- [ ] Stack backend detaillee (runtime, framework, BDD, auth, hosting)
- [ ] Outils documentes (CI/CD, monitoring, analytics)
- [ ] Guide de setup avec pre-requis
- [ ] Commandes d'initialisation fournies
- [ ] Variables d'environnement listees
- [ ] Checklist de setup fournie
- [ ] Aucun placeholder `[texte]` restant dans les outputs

## Prochaine Etape

Une fois `pipeline/output/05-tech/` complet → Phase A terminee.

Les outputs d'architecture alimentent :
- `app-design-template` pour le design UI/UX
- `app-n8n-template` pour les automations

---

**Version** : 1.0
**Phase** : A05 (Architecture)
**Dependances** : A01 (PRD, Features)
**Produit pour** : app-design-template (tech-stack.md), app-n8n-template (via A04)
