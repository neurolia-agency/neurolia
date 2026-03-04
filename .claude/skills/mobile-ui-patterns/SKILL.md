---
name: mobile-ui-patterns
description: Patterns d'UI mobile pour bottom navigation, cards, lists, modals, bottom sheets et composants tactiles
---

<objective>
Fournir des patterns d'UI mobile prets a l'emploi pour les composants courants : navigation, contenu, overlays, inputs, feedback et gestures. Chaque pattern inclut ses regles de dimensionnement, son anatomie, ses notes d'accessibilite et les differences entre plateformes.
</objective>

<quick_start>
Ce skill est utilise pendant l'etape D06 (Core Screens) du pipeline app-design-template.

Consulter le pattern adapte au composant a implementer, puis l'adapter aux design tokens et contraintes du projet.
</quick_start>

<patterns>

## Navigation

### Bottom Tab Bar

**Quand utiliser** : Navigation principale entre 3-5 destinations de meme importance.

**Anatomie** :
```
┌──────────────────────────────────┐
│  [Icon]  [Icon]  [Icon]  [Icon] │  56px
│  Label   Label   Label   Label  │
├──────────────────────────────────┤
│         Safe Area Bottom         │  34px (iOS)
└──────────────────────────────────┘
```

**Regles de dimensionnement** :
- Hauteur barre : 56px (hors safe area)
- Touch target par tab : minimum 44x44px
- Icones : 24px
- Labels : 12px, font-weight 500
- Tab active : couleur primary, inactive : muted

**Accessibilite** :
- `role="tablist"` sur le conteneur
- `role="tab"` sur chaque onglet
- `aria-selected="true"` sur l'onglet actif
- `aria-label` descriptif sur chaque tab

**Differences plateformes** :
- iOS : labels toujours visibles, pas de ripple
- Android : ripple effect au tap, labels optionnels

---

### Stack Header

**Quand utiliser** : Navigation dans un flux sequentiel ou ecran de detail.

**Anatomie** :
```
┌──────────────────────────────────┐
│         Safe Area Top            │
├──────────────────────────────────┤
│  [←Back]    Titre    [Action]   │  56px
└──────────────────────────────────┘
```

**Regles de dimensionnement** :
- Hauteur : 56px (hors safe area)
- Back button : 44x44px touch target
- Titre : centre, 18px font-weight 600, troncature ellipsis
- Action droite : 44x44px touch target (icone ou texte)

**Accessibilite** :
- `aria-label="Retour"` sur le bouton back
- Titre en `<h1>` ou equivalent semantique
- Focus automatique sur le titre apres navigation

**Differences plateformes** :
- iOS : titre centre, back avec chevron + label
- Android : titre aligne a gauche, back avec fleche

---

### Drawer Menu

**Quand utiliser** : Navigation secondaire, parametres, profil etendu.

**Anatomie** :
```
┌────────────┬─────────────────────┐
│            │                     │
│   Drawer   │   Contenu principal │
│   (80%w)   │   (overlay sombre)  │
│            │                     │
│  [Avatar]  │                     │
│  [Items]   │                     │
│  [Footer]  │                     │
│            │                     │
└────────────┴─────────────────────┘
```

**Regles de dimensionnement** :
- Largeur : 80% de l'ecran (max 320px)
- Items : 56px height, 16px padding horizontal
- Avatar zone : 120px height
- Overlay : rgba(0,0,0,0.5)

**Accessibilite** :
- `aria-modal="true"` quand ouvert
- Focus trap dans le drawer
- Fermeture avec Escape
- `aria-hidden="true"` sur le contenu derriere

---

## Contenu

### Card (Compact)

**Quand utiliser** : Item dans une liste ou grille avec apercu d'informations.

**Anatomie** :
```
┌──────────────────────────────────┐
│  [Image optionnelle]             │
├──────────────────────────────────┤
│  Titre                           │  16-18px, font-weight 600
│  Description (max 2 lignes)      │  14px, color muted
│  [Badge] [Metadata]              │  12px
└──────────────────────────────────┘
```

**Regles de dimensionnement** :
- Largeur : 100% (liste) ou 50% - gap (grille)
- Padding interne : 12-16px
- Border radius : 12-16px (var(--radius-card))
- Shadow : var(--shadow-sm)
- Image : ratio 16:9 ou 4:3
- Gap entre cards : 12px

**Accessibilite** :
- Card entiere cliquable (pas juste le titre)
- `aria-label` descriptif incluant le titre
- Image decorative : `aria-hidden="true"`

---

### Card (Expanded)

**Quand utiliser** : Item mis en avant, hero card, feature highlight.

**Anatomie** :
```
┌──────────────────────────────────┐
│                                  │
│          [Image grande]          │  200-300px height
│                                  │
├──────────────────────────────────┤
│  Titre                           │  20-24px
│  Description (max 3 lignes)      │  16px
│  [CTA Button]                    │  44px height
└──────────────────────────────────┘
```

**Regles de dimensionnement** :
- Largeur : 100%
- Image : 200-300px height, cover
- Padding : 16-20px
- CTA : full width ou fit-content

---

### List (Simple)

**Quand utiliser** : Liste d'items avec actions, navigation settings.

**Anatomie** :
```
┌──────────────────────────────────┐
│  [Icon]  Titre            [→]   │  56px
├──────────────────────────────────┤
│  [Icon]  Titre            [→]   │  56px
├──────────────────────────────────┤
│  [Icon]  Titre    [Toggle]      │  56px
└──────────────────────────────────┘
```

**Regles de dimensionnement** :
- Item height : 56px minimum (72px avec subtitle)
- Icon gauche : 24px, dans un cercle de 40px
- Padding horizontal : 16px
- Separateur : 1px, aligne avec le texte (pas l'icone)
- Chevron droit : 24px

---

### List (Swipeable)

**Quand utiliser** : Liste avec actions contextuelles (supprimer, archiver).

**Anatomie** :
```
Etat normal :
┌──────────────────────────────────┐
│  [Avatar]  Titre          Heure │  72px
│            Sous-titre           │
└──────────────────────────────────┘

Swipe gauche :
┌──────────────────────┬───────────┐
│  Contenu decale      │ [Delete]  │
│                      │ [Archive] │
└──────────────────────┴───────────┘
```

**Regles de dimensionnement** :
- Actions revelees : 80px width chacune
- Seuil swipe : 60px pour reveler
- Seuil delete : swipe complet (> 80% largeur)
- Couleurs : rouge (delete), bleu (archive), gris (more)

---

### Grid

**Quand utiliser** : Galerie, produits, icones d'action rapide.

**Regles de dimensionnement** :
- 2 colonnes : (width - 16*2 - 12) / 2
- 3 colonnes : (width - 16*2 - 12*2) / 3
- Gap : 12px
- Ratio items : 1:1 (carre) ou 3:4 (portrait)

---

## Overlays

### Modal

**Quand utiliser** : Confirmations critiques, alertes systeme.

**Anatomie** :
```
┌──────────────────────────────────┐
│          (Backdrop sombre)       │
│   ┌──────────────────────────┐   │
│   │  Titre                   │   │
│   │  Message                 │   │
│   │                          │   │
│   │  [Annuler]  [Confirmer]  │   │
│   └──────────────────────────┘   │
└──────────────────────────────────┘
```

**Regles de dimensionnement** :
- Largeur : min(90%, 400px)
- Padding : 24px
- Radius : 16px
- Backdrop : rgba(0,0,0,0.5)
- Boutons : minimum 44px height

**Accessibilite** :
- `role="alertdialog"`
- Focus trap obligatoire
- Fermeture Escape
- Focus initial sur le bouton principal

---

### Bottom Sheet

**Quand utiliser** : Actions contextuelles, filtres, formulaires secondaires.

**Anatomie** :
```
┌──────────────────────────────────┐
│          (Backdrop sombre)       │
│                                  │
│ ┌────────────────────────────────┐
│ │         [Handle]               │  4px * 32px, radius full
│ │  Titre                         │
│ │  ────────────────────          │
│ │  [Action 1]                    │
│ │  [Action 2]                    │
│ │  [Action 3]                    │
│ │                                │
│ │  [Annuler]                     │
│ └────────────────────────────────┘
└──────────────────────────────────┘
```

**Regles de dimensionnement** :
- Handle : 4px height, 32px width, border-radius full, centre
- Padding top : 12px (au-dessus du handle)
- Padding horizontal : 16px
- Actions : 56px height chacune
- 3 snap points : peek (30%), half (50%), full (90%)
- Safe area bottom respectee
- Radius top : 16-20px

**Accessibilite** :
- `role="dialog"`
- Draggable pour fermer
- Focus trap quand ouvert
- Label sur le handle pour screen readers

---

### Toast / Snackbar

**Quand utiliser** : Feedback temporaire apres une action (succes, info).

**Anatomie** :
```

┌──────────────────────────────────┐
│  [Icon]  Message        [Undo]  │  48px
└──────────────────────────────────┘
         (Bottom, above tab bar)
```

**Regles de dimensionnement** :
- Position : bottom, au-dessus du tab bar
- Marge horizontale : 16px
- Hauteur : 48px
- Radius : 8px
- Duree : 3 secondes (auto-dismiss)
- Max width : 100% - 32px

---

### Alert Dialog

**Quand utiliser** : Action destructive necessitant confirmation.

**Anatomie** :
```
┌──────────────────────────────────┐
│   Titre (bold)                   │
│   Description du risque          │
│                                  │
│   [Annuler]     [Supprimer]     │
│                  (rouge)         │
└──────────────────────────────────┘
```

**Regles** :
- Action destructive en couleur error
- Action d'annulation a gauche
- Double confirmation pour les actions irreversibles

---

## Input

### Form Fields

**Quand utiliser** : Saisie de texte, email, mot de passe.

**Anatomie** :
```
Label (14px, font-weight 500)
┌──────────────────────────────────┐
│  [Icon]  Placeholder text        │  48px
└──────────────────────────────────┘
Helper text ou message d'erreur (12px)
```

**Regles de dimensionnement** :
- Hauteur : 48px minimum
- Font size : 16px (obligatoire pour eviter zoom iOS)
- Padding horizontal : 12-16px
- Radius : var(--radius-input)
- Label : 14px, marge bottom 4px
- Helper : 12px, marge top 4px
- Error state : border couleur error, message en rouge

**Accessibilite** :
- `<label>` associe a chaque input
- `aria-describedby` pour les messages d'erreur
- `aria-invalid="true"` en cas d'erreur
- Keyboard type adapte (email, phone, number)

---

### Search Bar

**Quand utiliser** : Recherche globale ou filtrage.

**Anatomie** :
```
┌──────────────────────────────────┐
│  [🔍]  Rechercher...    [✕]     │  44-48px
└──────────────────────────────────┘
```

**Regles de dimensionnement** :
- Hauteur : 44-48px
- Radius : 8-12px ou full (style pill)
- Icone search : 20px, padding left
- Bouton clear : 20px, apparait quand texte saisi
- Background : legere variation du background (surface)

---

### Filters

**Quand utiliser** : Filtrage de listes, categories.

**Anatomie** :
```
┌────────┐ ┌────────┐ ┌────────┐
│  Tous  │ │ Cat 1  │ │ Cat 2  │ ...  (horizontal scroll)
└────────┘ └────────┘ └────────┘
   active    inactive    inactive
```

**Regles de dimensionnement** :
- Chip height : 36px
- Padding horizontal : 12-16px
- Gap : 8px
- Radius : var(--radius-chip) (999px)
- Active : background primary, text primary-foreground
- Inactive : background surface, text foreground
- Scroll horizontal avec indicateur

---

## Feedback

### Skeleton Screen

**Quand utiliser** : Pendant le chargement des donnees.

**Regles** :
- Reproduire la forme du contenu final
- Animation : pulse (opacity 0.5 → 0.8, 1.5s loop)
- Couleur : muted (legere variation du background)
- Arrondir les coins des blocs texte
- Ne pas animer le header et la navigation (fixes)

**Dimensionnement** :
- Titre skeleton : 60% largeur, 20px height
- Sous-titre : 40% largeur, 16px height
- Card skeleton : meme dimensions que la card finale
- Avatar : cercle, meme taille que l'avatar final

---

### Pull-to-Refresh

**Quand utiliser** : Rafraichissement manuel d'une liste.

**Regles** :
- Seuil de declenchement : 80px de scroll vers le bas
- Indicateur : spinner circulaire au-dessus du contenu
- Taille indicateur : 32px
- Retour elastique apres rafraichissement

---

### Loading Spinner

**Quand utiliser** : Chargement d'une action (pas d'un ecran complet).

**Regles** :
- Taille : 24px (inline), 32px (plein ecran)
- Couleur : primary (sur fond clair), white (sur fond sombre)
- Animation : rotation 360deg, 800ms linear infinite
- Inline : remplace le texte du bouton pendant l'action

---

### Empty State

**Quand utiliser** : Ecran ou section sans donnees.

**Anatomie** :
```
┌──────────────────────────────────┐
│                                  │
│         [Illustration]           │  120-160px
│                                  │
│      Titre (18px, bold)          │
│   Description (14px, muted)      │
│                                  │
│        [CTA Button]             │  44px
│                                  │
└──────────────────────────────────┘
```

**Regles** :
- Centre vertical et horizontal
- Illustration : simple, monochrome ou couleur douce
- Message : encourageant, pas culpabilisant
- CTA : action concrete pour remplir l'ecran

---

### Error State

**Quand utiliser** : Erreur de chargement, erreur reseau.

**Anatomie** :
```
┌──────────────────────────────────┐
│                                  │
│          [Error Icon]            │
│                                  │
│      "Un probleme est            │
│       survenu"                   │
│                                  │
│       [Reessayer]               │
│                                  │
└──────────────────────────────────┘
```

**Regles** :
- Icone : circle-alert ou wifi-off (selon le type d'erreur)
- Message : rassurant, pas technique
- Bouton retry : action claire
- Couleur icone : muted (pas error rouge)

---

## Gestures

### Swipe to Delete

**Regles** :
- Direction : gauche
- Seuil revelation : 60px
- Seuil suppression : > 80% largeur ecran
- Fond : couleur error
- Icone : trash
- Confirmation requise (alert dialog)

### Swipe to Reveal Actions

**Regles** :
- Direction : gauche (actions secondaires) ou droite (action principale)
- Actions : 1 a 3 maximum
- Largeur par action : 80px
- Snap : positions discretes (ferme ou ouvert)

### Long Press

**Regles** :
- Delai : 500ms
- Feedback visuel : scale(1.02) + shadow elevee
- Resultat : bottom sheet avec actions contextuelles
- Haptic feedback : impact moyen (si natif)

</patterns>

<constraints>
- **Touch targets** : minimum 44x44px pour tout element interactif
- **Texte minimum** : 14px pour le contenu lisible, 12px pour les metadata
- **Input font** : 16px obligatoire (evite le zoom iOS)
- **Espacement** : minimum 8px entre elements tactiles adjacents
- **Animations** : maximum 400ms, preferrer transform + opacity
- **Safe areas** : toujours respecter env(safe-area-inset-*)
- **Accessibilite** : labels, focus, contraste WCAG AA sur tout composant
</constraints>

<quality_gates>
- [ ] Tous les composants respectent les touch targets (44px minimum)
- [ ] Tous les textes respectent la taille minimum (14px body, 12px caption)
- [ ] Inputs en 16px (pas de zoom iOS)
- [ ] Chaque composant interactif a un etat pressed/active
- [ ] Accessibilite : labels, roles ARIA, contraste
- [ ] Safe areas respectees sur les elements fixes (header, tab bar, bottom actions)
- [ ] Animations fluides (transform + opacity uniquement)
</quality_gates>
