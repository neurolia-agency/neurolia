# Etape D08 : Polish

> **Phase D-B : Code** - Animations, transitions et micro-interactions.

## Objectif

Ameliorer l'experience tactile de l'application avec des animations fluides, des transitions entre ecrans, des micro-interactions, et optimiser les performances.

## Input

- Application complete (D05-D07)
- `pipeline/output/02-art-direction/visual-vocabulary.md` (valeurs transitions)
- `pipeline/output/02-art-direction/constraints.md` (regles animations)
- `pipeline/output/02-art-direction/emotion-map.md` (emotions cibles)

## Instructions

### 1. Transitions entre Ecrans

#### Stack Navigation (push/pop)

```
Push (aller au detail) :
- Nouvel ecran slide depuis la droite (300ms, ease-out)
- Ecran precedent recule legerement (opacity 0.95, scale 0.98)

Pop (retour) :
- Ecran actuel slide vers la droite (250ms, ease-out)
- Ecran precedent revient a sa position
```

#### Tab Navigation

```
Switch de tab :
- Crossfade (200ms, ease-out)
- Pas de slide (eviter la confusion avec stack)
```

#### Bottom Sheet

```
Apparition :
- Slide from bottom (350ms, cubic-bezier(0.32, 0.72, 0, 1))
- Backdrop opacity 0 → 0.5 (300ms)

Fermeture :
- Slide to bottom (250ms, ease-in)
- Backdrop opacity 0.5 → 0 (200ms)
- Swipe down gesture pour fermer
```

### 2. Micro-Interactions Tactiles

#### Press State (boutons)

```
Toucher :
- scale(0.97) en 100ms
- Retour scale(1) en 150ms ease-out

Feedback haptique :
- Impact leger sur action principale
- Impact moyen sur action de confirmation
```

#### Pull-to-Refresh

```
Tirer vers le bas :
- Indicateur rotatif apparait
- Seuil de declenchement : 80px
- Animation rotation continue pendant fetch
- Retour elastique en 300ms
```

#### Swipe Actions (listes)

```
Swipe gauche :
- Reveler les actions (delete, archive)
- Seuil de revelation : 60px
- Snap : 0 ou ouvert (pas de position intermediaire)
```

#### Long Press

```
Appui long :
- Delai : 500ms
- Feedback : scale(1.02) + ombre elevee
- Menu contextuel en bottom sheet
```

### 3. Animations de Contenu

#### Apparition au Scroll

```typescript
// Pattern useInView
- Trigger : element entre dans le viewport
- Animation : opacity 0→1 + translateY(20px→0)
- Duree : 400ms ease-out
- Once : true (pas de re-animation)
```

#### Stagger (listes de cards)

```
- Chaque card : delay = index * 80ms
- Animation : opacity 0→1 + translateY(16px→0)
- Duree : 300ms ease-out
- Max stagger : 5 elements (au-dela, afficher immediatement)
```

#### Skeleton → Contenu

```
- Skeleton : animation pulse (opacity 0.5 → 0.8, 1.5s loop)
- Transition : crossfade 200ms quand les donnees arrivent
```

### 4. Animations Celebratoires

Pour les moments de succes (selon emotion-map.md) :

| Moment | Animation | Duree |
|--------|-----------|-------|
| Completion tache | Checkmark + confetti subtil | 800ms |
| Premier usage | Welcome animation | 600ms |
| Achievement | Badge bounce | 500ms |
| Envoi formulaire | Checkmark scale-in | 400ms |

### 5. Performance

#### Optimisations Critiques

| Optimisation | Implementation |
|-------------|----------------|
| Images lazy | Loading="lazy" ou IntersectionObserver |
| Images optimisees | next/image (PWA) ou expo-image (RN) |
| Font optimisee | next/font (PWA) ou font pre-load |
| Bundle splitting | Dynamic imports pour ecrans non-critiques |
| Memoization | React.memo sur les listes longues |
| Virtualisation | FlatList (RN) ou virtualization (PWA) pour grandes listes |

#### Animation Performance

- Utiliser uniquement `transform` et `opacity` (GPU accelere)
- Pas de `width`, `height`, `top`, `left` dans les animations
- `will-change: transform` sur les elements animes
- Limiter a 60fps (requestAnimationFrame)

### 6. Offline & Push (si applicable)

#### Offline Handling

```
Detection :
- Listener sur navigator.onLine / NetInfo
- Banner "Hors connexion" en haut de l'ecran
- Griser les actions necessitant le reseau
- Cacher le banner avec animation quand connexion retrouvee
```

#### Push Notifications

```
Setup :
- Demander permission au moment pertinent (pas au premier lancement)
- Stocker le token push en base
- Gerer la reception : foreground (banner in-app) vs background (systeme)
```

## Checklist Polish

### Transitions
- [ ] Stack push/pop fluides
- [ ] Tab switch sans saccade
- [ ] Bottom sheet draggable
- [ ] Modal avec backdrop

### Micro-Interactions
- [ ] Press state sur tous les boutons (scale 0.97)
- [ ] Pull-to-refresh sur les listes
- [ ] Swipe actions (si applicable)
- [ ] Toast/Snackbar pour feedback

### Animations
- [ ] Apparition au scroll (fade + translateY)
- [ ] Stagger sur les listes
- [ ] Skeleton → contenu crossfade
- [ ] Celebrations sur les succes

### Performance
- [ ] Images optimisees et lazy-loaded
- [ ] Fonts optimisees
- [ ] Bundle splitting
- [ ] Animations GPU-only (transform + opacity)
- [ ] Pas de jank visible (60fps)

### Optionnel
- [ ] Offline handling
- [ ] Push notifications
- [ ] Haptic feedback (natif)

## Validation

- [ ] Toutes les transitions entre ecrans sont fluides
- [ ] Press states sur tous les elements interactifs
- [ ] Animations coherentes avec visual-vocabulary.md
- [ ] Aucune animation > 400ms
- [ ] Performance : pas de jank (60fps constant)
- [ ] Emotions cibles atteintes (emotion-map.md)
- [ ] Conforme a constraints.md

## Prochaine Etape

→ `stages/D09-validate.md`

---

**Version** : 1.0
**Phase** : D-B (Code)
**Dependances** : D06 (Core Screens), D07 (Backend Integration)
**Produit pour** : D09 (Validate)
