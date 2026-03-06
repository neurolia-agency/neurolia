# Etape D02 : Direction Artistique

> **Phase D-A : Design** - Traduction de la strategie en vision visuelle mobile.

## Objectif

Transformer la strategie de marque (D01-Brand) en **vision visuelle concrete** adaptee au mobile. Cette etape comble le fossé entre "ce qu'on dit" et "comment ca doit se voir sur un ecran tactile".

## Input

- `pipeline/output/01-brand/` (tous les fichiers)
- `pipeline/input/references/` (apps d'inspiration)

## Output

```
pipeline/output/02-art-direction/
├── moodboard.md          # References visuelles annotees (apps)
├── visual-vocabulary.md  # Lexique visuel propre au projet
├── constraints.md        # Parti-pris radicaux (faire / ne pas faire)
├── emotion-map.md        # Emotion cible par ecran
└── README.md             # Index et guide d'utilisation
```

## Instructions

### 1. Moodboard (moodboard.md)

Analyser **5-7 references d'applications mobiles** en detail :

```markdown
# Moodboard

## Reference 1 : [Nom de l'App]

- **Plateforme** : iOS / Android / PWA
- **Categorie** : [Commerce / Social / Utilitaire / etc.]
- **Ce qu'on retient** :
  - [Element visuel/interaction 1]
  - [Element visuel/interaction 2]
  - [Element visuel/interaction 3]
- **Mesures concretes** :
  - Hauteur header : ~[X]px
  - Hauteur bottom tab : ~[X]px
  - Padding horizontal : ~[X]px
  - Taille cards : ~[X]px height
  - Border radius cards : ~[X]px
- **A adapter pour ce projet** :
  - [Comment transposer]

## Reference 2 : [Nom]
[Meme structure...]

## Patterns Communs

| Pattern | Frequence | Decision |
|---------|-----------|----------|
| [Ex: Bottom tab bar] | 5/5 | Adopter |
| [Ex: Cards with shadow] | 4/5 | Adopter |
| [Ex: Swipe navigation] | 3/5 | Adopter |
| [Ex: Floating action button] | 2/5 | Evaluer |
| [Ex: Parallax headers] | 1/5 | Rejeter |
```

### 2. Vocabulaire Visuel (visual-vocabulary.md)

Creer un dictionnaire de traduction entre termes vagues et valeurs precises :

```markdown
# Vocabulaire Visuel

## Espacements

| Terme | Valeur | Usage |
|-------|--------|-------|
| "padding ecran" | 16-20px | Marges laterales contenu |
| "espace entre cards" | 12-16px | Gap vertical entre cards |
| "espace sections" | 24-32px | Entre sections d'un ecran |
| "espace compact" | 8px | Padding interne compact |

## Typographie

| Terme | Valeur | Usage |
|-------|--------|-------|
| "titre imposant" | clamp(28px, 7vw, 36px) | Hero / Onboarding |
| "hierarchie marquee" | ratio 1.3x entre niveaux | Titres |

## Transitions & Animations

| Terme | Valeur | Usage |
|-------|--------|-------|
| "transition douce" | 250ms ease-out | Changements d'etat |
| "apparition ecran" | 300ms ease-out, translateY(20px) | Navigation stack |
| "retour tactile" | scale(0.97), 100ms | Press state boutons |
| "slide bottom sheet" | 350ms cubic-bezier(0.32, 0.72, 0, 1) | Bottom sheets |

## Couleurs

| Terme | Valeur | Usage |
|-------|--------|-------|
| "accent discret" | 5-10% de surface | Couleur signature |
| "fond neutre" | oklch(0.98 0 0) | Background principal |
| "surface elevee" | +0.02 lightness vs background | Cards, bottom sheets |

## Formes

| Terme | Valeur | Usage |
|-------|--------|-------|
| "coins arrondis" | border-radius: 12-16px | Cards, bottom sheets |
| "coins boutons" | border-radius: 8-12px | Boutons principaux |
| "coins inputs" | border-radius: 8px | Champs de saisie |
| "coins chips" | border-radius: 999px | Tags, filtres |
| "avatar" | border-radius: 50% | Photos de profil |

## Ombres

| Terme | Valeur | Usage |
|-------|--------|-------|
| "ombre legere" | 0 1px 3px rgba(0,0,0,0.08) | Cards au repos |
| "ombre elevee" | 0 4px 12px rgba(0,0,0,0.12) | Bottom sheets, modals |
| "ombre navigation" | 0 -1px 3px rgba(0,0,0,0.05) | Bottom tab bar |
```

### 3. Contraintes (constraints.md)

Definir des regles **non-negociables** pour le mobile :

```markdown
# Contraintes Design

## ON FAIT (obligatoire)

1. **Touch targets minimum 44px** (44x44px zone tactile)
   - Justification : Apple HIG + Google Material guidelines

2. **Bottom navigation** pour les ecrans principaux (3-5 tabs)
   - Justification : Accessibilite pouce, convention mobile

3. **Contenu scrollable verticalement**
   - Justification : Geste naturel, pas de pagination horizontale cachee

4. **Safe areas respectees** (encoche, barre home, status bar)
   - Justification : Contenu lisible sur tous les devices

5. **Skeleton screens** pendant le chargement
   - Justification : Feedback immediat, perception de rapidite

6. **Pull-to-refresh** sur les listes
   - Justification : Convention mobile, controle utilisateur

7. **Etats vides illustres** avec CTA d'action
   - Justification : Guidage utilisateur, pas d'ecran mort

8. **Typography minimum 14px** pour tout texte lisible
   - Justification : Lisibilite sur petit ecran

9. **Input 16px** pour eviter le zoom iOS
   - Justification : Comportement natif Safari

10. **Indicateurs de scroll** pour les listes horizontales
    - Justification : Affordance, l'utilisateur sait qu'il peut scroller

## ON NE FAIT PAS (interdit)

1. **Hover effects comme interaction principale**
   - Pourquoi : Pas de curseur sur mobile, inaccessible

2. **Texte inferieur a 14px** pour le contenu lisible
   - Pourquoi : Illisible sur petit ecran

3. **Menus hamburger comme navigation principale**
   - Pourquoi : Masque la navigation, reduit la decouverte

4. **Scroll horizontal sans indicateur**
   - Pourquoi : Contenu invisible, pas d'affordance

5. **Modals plein ecran** pour des actions simples
   - Pourquoi : Desorientant, bottom sheet prefere

6. **Formulaires longs** sur un seul ecran
   - Pourquoi : Decourageant, preferer le multi-etape

7. **Animations de plus de 400ms**
   - Pourquoi : Sensation de lenteur sur mobile

8. **Texte centre sur plus de 3 lignes**
   - Pourquoi : Difficile a lire, aligner a gauche

9. **Images sans lazy loading**
   - Pourquoi : Performance, data mobile

10. **Actions destructives sans confirmation**
    - Pourquoi : Erreurs tactiles frequentes

## Patterns de Navigation

| Pattern | Quand utiliser | Implementation |
|---------|---------------|----------------|
| Bottom Tab Bar | Ecrans principaux (3-5 max) | Tab bar fixe, 56px height |
| Stack Navigation | Ecrans de detail, flux sequentiels | Header avec back button |
| Drawer Menu | Navigation secondaire, settings | Slide from left |
| Bottom Sheet | Actions contextuelles, filtres | Slide from bottom, draggable |
| Modal | Confirmations critiques uniquement | Overlay centre |

## Zones Tactiles

```
┌─────────────────────┐
│   Status Bar (safe)  │  ← Ne pas utiliser
├─────────────────────┤
│   Header (56px)      │  ← Actions principales
├─────────────────────┤
│                      │
│   Zone de contenu    │  ← Scroll vertical
│   (thumb friendly)   │
│                      │
├─────────────────────┤
│   Bottom Tab (56px)  │  ← Navigation principale
├─────────────────────┤
│   Home Bar (safe)    │  ← Ne pas utiliser
└─────────────────────┘
```

## Thumb Zone (accessibilite pouce)

```
┌─────────────────────┐
│  DIFFICILE  │  OK   │
├─────────────┤       │
│             │       │
│     OK      │ FACILE│
│             │       │
├─────────────┤       │
│    FACILE   │       │
└─────────────────────┘
```

Actions principales dans la zone FACILE (bas de l'ecran).

## Test Rapide "Est-ce [NOM_APP] ?"

- [ ] [Critere 1] ?
- [ ] [Critere 2] ?
- [ ] [Critere 3] ?
- [ ] [Critere 4] ?
- [ ] [Critere 5] ?

→ 5/5 = Conforme | < 4/5 = Revoir
```

### 4. Carte des Emotions (emotion-map.md)

Pour chaque ecran, definir l'emotion cible :

```markdown
# Carte des Emotions

## Ecrans d'Entree

### Splash Screen
- **Emotion primaire** : Confiance + Anticipation
- **Duree** : < 2 secondes
- **Element signature** : Logo anime

### Onboarding
- **Emotion primaire** : Curiosite + Enthousiasme
- **Tension** : Simple vs Complet (montrer la valeur sans submerger)
- **Element signature** : Illustrations + messages progressifs

### Login / Register
- **Emotion primaire** : Facilite + Securite
- **Tension** : Rapidite vs Confiance
- **Element signature** : Social login + biometrie

## Ecrans Principaux (Tabs)

### Home / Dashboard
- **Emotion primaire** : Controle + Clarte
- **Tension** : Information vs Surcharge
- **Element signature** : [A definir selon l'app]

### [Tab 2]
- **Emotion primaire** : [A definir]
- **Tension** : [A definir]
- **Element signature** : [A definir]

### [Tab 3]
- **Emotion primaire** : [A definir]
- **Tension** : [A definir]
- **Element signature** : [A definir]

### Profile / Settings
- **Emotion primaire** : Maitrise + Personnalisation
- **Tension** : Completude vs Simplicite
- **Element signature** : Avatar + progression

## Etats Speciaux

### Empty State
- **Emotion** : Encouragement (pas de vide anxiogene)
- **Element** : Illustration + message + CTA

### Loading
- **Emotion** : Patience confiante
- **Element** : Skeleton screens (pas de spinner)

### Error
- **Emotion** : Reassurance (pas de culpabilite)
- **Element** : Message clair + action de recovery

### Success
- **Emotion** : Satisfaction + Accomplissement
- **Element** : Animation celebratoire subtile
```

### 5. README (README.md)

```markdown
# Direction Artistique - [NOM_APP]

## ADN Visuel

| Aspect | Valeur |
|--------|--------|
| Couleur signature | [Couleur] ([Code]) |
| Forme signature | [Description] |
| Mouvement | [Type, duree, easing] |
| Navigation | [Bottom tab / Drawer / etc.] |
| Radius | [Valeur par defaut] |
| Touch targets | 44px minimum |
| Spacing ecran | [Padding horizontal] |

## Test Rapide

[Copier depuis constraints.md]

## Fichiers

| Fichier | Usage |
|---------|-------|
| moodboard.md | References apps analysees |
| visual-vocabulary.md | Traductions visuelles |
| constraints.md | Regles strictes mobile |
| emotion-map.md | Emotions par ecran |

## Usage

- **D04 (Design Tokens)** : Implementer les valeurs de visual-vocabulary.md
- **D06-D08 (Code)** : Valider chaque ecran contre constraints.md
```

## Regles de Redaction

### Etre Specifique

- "Padding confortable" → "16px padding horizontal sur ecran 375px"
- "Animations subtiles" → "250ms ease-out, translateY(20px)"
- "Touch targets genereux" → "minimum 44x44px zone tactile"

### Justifier Chaque Choix

Chaque contrainte doit etre liee a :
- Une valeur de marque (depuis 01-brand/)
- Une convention mobile (Apple HIG / Material Design)
- Une reference visuelle analysee

## Validation

- [ ] 5+ references apps analysees avec mesures concretes
- [ ] Vocabulaire visuel couvre : spacing, typo, transitions, couleurs, formes, ombres
- [ ] 10+ regles "ON FAIT"
- [ ] 10+ regles "ON NE FAIT PAS"
- [ ] Navigation pattern defini
- [ ] Zones tactiles documentees
- [ ] Chaque ecran a une emotion primaire definie
- [ ] Etats speciaux couverts (empty, loading, error, success)
- [ ] Aucun terme vague sans definition precise
- [ ] Tous les choix sont justifies

## Prochaine Etape

Une fois `output/02-art-direction/` complet → Passer a `stages/D03-wireframes.md`

---

**Version** : 1.0
**Phase** : D-A (Design)
**Dependances** : D01 (Brand & Identity)
**Produit pour** : D03 (Wireframes), D04 (Design Tokens), D06-D08 (Code)
