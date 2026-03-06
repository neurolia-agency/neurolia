# Etape D06 : Core Screens

> **Phase D-B : Code** - Implementation des ecrans principaux.

## Objectif

Coder tous les ecrans principaux de l'application en suivant les wireframes et les design tokens. Un ecran a la fois, avec gestion complete des etats.

## Input

| Fichier | Usage |
|---------|-------|
| `pipeline/output/03-wireframes/` | Brief de chaque ecran |
| `pipeline/output/04-design-tokens/` | Tokens visuels |
| `pipeline/output/02-art-direction/constraints.md` | Regles design |
| `pipeline/output/01-brand/` | Contenu (charge a la demande) |

## Skill

Ce stage utilise le skill `mobile-ui-patterns` pour les patterns de composants :

```bash
# Le skill fournit les patterns pour bottom navigation, cards, lists, modals, etc.
```

## Instructions

### Workflow par Ecran

Pour **chaque ecran** de la navigation-map :

```
1. LIRE   → Wireframe specifique (03-wireframes/[ecran].md)
2. RESOUDRE → References vers 01-brand/ a la demande
3. CODER  → Layout + composants + contenu
4. ETATS  → Implementer loading, empty, error
5. VALIDER → Tester contre constraints.md
```

### Pattern Lazy Context Loading

Ne pas pre-charger tout le dossier brand/. Pour chaque ecran :

1. Lire le wireframe de l'ecran concerne
2. Trouver les references `fichier.md > cle`
3. Lire uniquement les fichiers brand/ references
4. Coder l'ecran avec les valeurs resolues

```
Exemple pour Home :
1. Lire pipeline/output/03-wireframes/home.md
2. Trouver reference "positioning.md > tagline"
3. Lire pipeline/output/01-brand/positioning.md pour resoudre
4. Coder le header avec la tagline
```

### Ordre d'Implementation

Suivre cet ordre pour maximiser la reutilisation :

| Ordre | Ecran | Raison |
|-------|-------|--------|
| 1 | Home / Dashboard | Ecran principal, definit les patterns de base |
| 2 | [Tab 2] | Deuxieme ecran le plus important |
| 3 | [Tab 3] | Troisieme tab |
| 4 | Profile / Settings | Ecran profil (liste + avatar) |
| 5 | Detail | Premier ecran stack (push depuis home) |
| 6 | Formulaire | Ecran avec inputs |
| 7 | Onboarding | Ecran d'entree (carousel/steps) |
| 8 | Login / Register | Auth screens |
| 9 | Search | Recherche (si applicable) |
| 10 | Notifications | Liste notifications (si applicable) |

### Gestion des Etats

Chaque ecran avec donnees doit implementer 4 etats :

#### Loading State
```
┌─────────────────────┐
│ Header (reel)       │
├─────────────────────┤
│ ▓▓▓▓▓▓▓▓▓▓▓        │  ← Skeleton title
│ ▓▓▓▓▓▓▓             │  ← Skeleton subtitle
│                      │
│ ┌───────────────┐   │
│ │ ▓▓▓▓  ▓▓▓▓▓  │   │  ← Skeleton card
│ │ ▓▓▓▓▓▓▓▓▓    │   │
│ └───────────────┘   │
│ ┌───────────────┐   │
│ │ ▓▓▓▓  ▓▓▓▓▓  │   │  ← Skeleton card
│ │ ▓▓▓▓▓▓▓▓▓    │   │
│ └───────────────┘   │
├─────────────────────┤
│ [Tab1] [Tab2] [Tab3]│
└─────────────────────┘
```

#### Empty State
```
┌─────────────────────┐
│ Header              │
├─────────────────────┤
│                      │
│    [Illustration]    │
│                      │
│   "Message from      │
│    tone.md"          │
│                      │
│   [ CTA Action ]    │
│                      │
├─────────────────────┤
│ [Tab1] [Tab2] [Tab3]│
└─────────────────────┘
```

#### Error State
```
┌─────────────────────┐
│ Header              │
├─────────────────────┤
│                      │
│    [Error Icon]      │
│                      │
│   "Message from      │
│    tone.md"          │
│                      │
│   [ Reessayer ]     │
│                      │
├─────────────────────┤
│ [Tab1] [Tab2] [Tab3]│
└─────────────────────┘
```

#### Success State (pour actions)
- Toast / Snackbar en bas de l'ecran
- Duree : 3 secondes
- Couleur : semantic success

### Composants Partages

Creer les composants reutilisables au fur et a mesure :

| Composant | Cree a | Reutilise par |
|-----------|--------|---------------|
| Card | Home | Tous les ecrans avec listes |
| SkeletonCard | Home | Tous les ecrans avec loading |
| EmptyState | Home | Tous les ecrans vides |
| ErrorState | Home | Tous les ecrans en erreur |
| ListItem | Tab 2 | Profile, Notifications |
| Avatar | Profile | Header, Comments |
| Badge | Tab 2 | Notifications, Cards |

## Fichiers Toujours Accessibles

Ces fichiers peuvent etre lus a **tout moment** pendant D06 :

- `pipeline/output/04-design-tokens/` - Tokens visuels
- `pipeline/output/02-art-direction/constraints.md` - Regles design
- `CLAUDE.md` - Statut et contexte global

## Validation

- [ ] Tous les ecrans de la navigation-map sont codes
- [ ] Chaque ecran suit son wireframe
- [ ] Etats loading (skeleton) implementes
- [ ] Etats empty implementes avec message + CTA
- [ ] Etats error implementes avec "Reessayer"
- [ ] Touch targets >= 44px
- [ ] Typography >= 14px body
- [ ] Safe areas respectees
- [ ] Navigation entre ecrans fonctionnelle
- [ ] Composants partages extraits
- [ ] Conforme a constraints.md

## Prochaine Etape

→ `stages/D07-backend-integration.md`

---

**Version** : 1.0
**Phase** : D-B (Code)
**Dependances** : D05 (App Setup), D03 (Wireframes), D04 (Design Tokens)
**Produit pour** : D07 (Backend Integration), D08 (Polish)
