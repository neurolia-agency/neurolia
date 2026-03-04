---
name: mobile-wireframes
description: Genere des wireframes mobile avec gestion du touch, des gestures, des etats et des navigation patterns
---

<objective>
Creer des wireframes mobiles structures qui servent de source unique de contenu pour le coding. Chaque wireframe definit les zones de l'ecran, les references vers le contenu brand, les interactions tactiles, et les etats speciaux (loading, empty, error).
</objective>

<quick_start>
Ce skill est utilise pendant l'etape D03 du pipeline app-design-template.

1. Lire `navigation-map.md` pour obtenir la liste des ecrans
2. Pour chaque ecran, creer un wireframe au format standardise
3. Mapper le contenu via des references `fichier.md > cle`
4. Definir les interactions tactiles et gestures
5. Definir les etats speciaux
</quick_start>

<inputs>
| Fichier | Source | Usage |
|---------|--------|-------|
| `pipeline/output/02-art-direction/` | D02 | Contraintes visuelles, patterns |
| `pipeline/input/imports/user-flows/` | Architecture template | Parcours utilisateurs |
| `pipeline/input/imports/navigation-map.md` | Architecture template | Liste et structure des ecrans |
| `pipeline/output/01-brand/` | D01 | Contenu a referencer (pas a dupliquer) |
</inputs>

<outputs>
Un fichier Markdown par ecran dans `pipeline/output/03-wireframes/` :

```
03-wireframes/
├── README.md           # Index des wireframes
├── onboarding.md       # Ecran onboarding
├── login.md            # Ecran login
├── home.md             # Tab Home
├── [tab-2].md          # Tab 2
├── [tab-3].md          # Tab 3
├── profile.md          # Tab Profile
├── [detail].md         # Ecran detail (stack)
├── [form].md           # Ecran formulaire (stack)
├── notifications.md    # Ecran notifications
└── search.md           # Ecran recherche
```
</outputs>

<workflow>

### Etape 1 : Lire la Navigation Map

Ouvrir `imports/navigation-map.md` et lister tous les ecrans :

- **Tabs** : ecrans accessibles via bottom tab bar
- **Stack** : ecrans accessibles via push navigation
- **Modal** : ecrans affiches en overlay
- **Auth** : ecrans du flow d'authentification

### Etape 2 : Pour chaque ecran, definir les zones

Decomposer l'ecran en zones verticales (top to bottom) :

```
Zone 1 : Header (sticky ou non)
Zone 2 : Contenu principal (scrollable)
Zone 3 : Contenu secondaire
Zone N : Action bottom (fixed si CTA)
```

Chaque zone contient :
- **Contenu** : references vers brand/ (`fichier.md > cle`)
- **Layout** : description du positionnement et dimensionnement
- **Interaction** : geste + comportement + destination

### Etape 3 : Mapper les references contenu

Utiliser la notation de reference sans dupliquer le texte :

| Notation | Exemple | Signification |
|----------|---------|---------------|
| `fichier.md > cle` | `positioning.md > tagline` | Valeur simple |
| `fichier.md > array[0-2]` | `services.md > fonctionnalites[0-2]` | Sous-ensemble de liste |
| `(placeholder)` | `(image produit)` | Contenu futur |
| `→ /route` | `→ /detail/[id]` | Navigation cible |
| `→ Tab: [nom]` | `→ Tab: Home` | Switch tab |

### Etape 4 : Definir les interactions

Pour chaque element interactif, specifier :

| Geste | Usage type | Notation |
|-------|-----------|----------|
| Tap | Navigation, action | `Tap → /route` |
| Long Press | Menu contextuel | `Long Press → bottom sheet` |
| Swipe Left | Actions (delete, archive) | `Swipe Left → [actions]` |
| Swipe Down | Pull-to-refresh | `Pull-to-Refresh → reload data` |
| Scroll | Contenu defilant | `Vertical scroll` |
| Drag | Reordonner | `Drag → reorder` |

### Etape 5 : Definir les etats speciaux

Pour chaque ecran qui affiche des donnees dynamiques :

**Loading** :
- Quels elements deviennent des skeletons
- Quels elements restent visibles (header, tabs)

**Empty** :
- Message reference : `tone.md > empty_state` ou message specifique
- Illustration (description)
- CTA pour peupler l'ecran

**Error** :
- Message reference : `tone.md > error`
- Bouton "Reessayer" (quelle action)

</workflow>

<mobile_patterns>

### Bottom Tab Bar
- 3 a 5 tabs maximum
- Icone + label pour chaque tab
- Badge sur l'icone pour les notifications
- Tab active visuellement distincte
- Hauteur : 56px + safe area bottom

### Stack Navigation
- Header : back button + titre + action optionnelle
- Transition : slide from right
- Geste retour : swipe from left edge
- Hauteur header : 56px + safe area top

### Drawer Menu
- Slide from left
- Overlay sombre sur le contenu
- Fermeture : tap overlay ou swipe left
- Contenu : navigation secondaire, settings

### Bottom Sheet
- Slide from bottom
- Draggable (handle en haut)
- 3 hauteurs : peek (30%), half (50%), full (90%)
- Fermeture : drag down ou tap backdrop

### Pull-to-Refresh
- Tirer le contenu vers le bas
- Seuil de declenchement : ~80px
- Indicateur rotatif apparait
- Relache : fetch data

### Swipe Actions
- Swipe horizontale sur un item de liste
- Revele 1-3 actions (delete, archive, etc.)
- Couleur de fond par action (rouge = delete)
- Snap : ouvert ou ferme

### Infinite Scroll
- Charger plus d'items a l'approche du bas
- Indicateur de chargement en bas de liste
- Fin de liste : message "Vous avez tout vu"

</mobile_patterns>

<format>
Format strict pour chaque wireframe :

```markdown
# [Nom Ecran] - Wireframe

**Route** : /route-name (ou Tab: NomTab)
**Objectif** : [1 phrase decrivant l'objectif de l'ecran]
**Type** : Tab / Stack / Modal / Auth

---

## Zone 1 : [Nom Zone]

**Contenu** :
- [Element] : `fichier.md > cle`
- [Element] : `fichier.md > cle`

**Layout** : [Description positionnement, dimensions]
**Interaction** : [Geste → comportement → destination]

---

## Zone 2 : [Nom Zone]

**Contenu** :
- [Element] : `fichier.md > cle`

**Layout** : [Description]
**Interaction** : [Geste → comportement]

---

[Autres zones...]

---

## Etats Speciaux

### Empty
- **Illustration** : [Description]
- **Message** : `tone.md > [cle]`
- **CTA** : `positioning.md > [cle]` → [action]

### Loading
- **Visible** : [Elements qui restent affiches]
- **Skeleton** : [Elements remplaces par des placeholders]

### Error
- **Message** : `tone.md > error`
- **Action** : Bouton "Reessayer" → [reload function]
```
</format>

<constraints>
- **Pas de texte duplique** : toujours utiliser des references `fichier.md > cle`
- **Touch targets >= 44px** : noter pour chaque element interactif
- **Inclure tous les etats** : loading, empty, error pour les ecrans avec donnees
- **Safe areas** : noter les elements qui doivent respecter les safe areas
- **1 fichier = 1 ecran** : pas de wireframes multi-ecrans
- **Zones ordonnees** : top to bottom, comme l'ecran sera affiche
</constraints>

<quality_gates>
- [ ] Tous les ecrans de la navigation-map sont couverts
- [ ] Format strict respecte pour chaque wireframe
- [ ] References `fichier.md > cle` valides (fichiers existent dans 01-brand/)
- [ ] Etats speciaux definis pour chaque ecran avec donnees dynamiques
- [ ] Interactions definies pour chaque element tactile
- [ ] Touch targets >= 44px notes
- [ ] README index cree avec la liste de tous les wireframes
- [ ] Navigation coherente (toutes les destinations existent comme wireframes)
</quality_gates>
