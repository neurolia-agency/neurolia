# Skill: dashboard-wireframes

Patterns de wireframes en ASCII/markdown pour dashboards. Utiliser ces templates comme base structurelle avant tout développement UI.

---

## Patterns par type de page

### 1. Sidebar Layout (Collapsible)

```
DESKTOP EXPANDED (280px sidebar)
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR (280px)         │ MAIN CONTENT                      │
│─────────────────────────│───────────────────────────────────│
│ [LOGO]          [←]     │ [BREADCRUMB] > [PAGE TITLE]  [⚙] │
│─────────────────────────│───────────────────────────────────│
│ [Avatar] Prénom N.      │                                   │
│ Role / Segment          │  [PAGE CONTENT]                   │
│─────────────────────────│                                   │
│ ▸ [icon] Nav Item       │                                   │
│ ▸ [icon] Nav Item       │                                   │
│ ● [icon] Active Item    │                                   │
│ ▸ [icon] Nav Item       │                                   │
│   ▸ Sub Item            │                                   │
│   ▸ Sub Item            │                                   │
│─────────────────────────│                                   │
│ ▸ [icon] Nav Item       │                                   │
│─────────────────────────│                                   │
│ ▸ [icon] Paramètres     │                                   │
│ ▸ [icon] Déconnexion    │                                   │
└─────────────────────────┴───────────────────────────────────┘

DESKTOP COLLAPSED (64px sidebar)
┌──────────────────────────────────────────────────────────┐
│ [64px] │ MAIN CONTENT                                     │
│────────│──────────────────────────────────────────────── │
│  [→]   │ [BREADCRUMB]                               [⚙]  │
│────────│────────────────────────────────────────────────│
│  [Av]  │                                                  │
│────────│  [PAGE CONTENT]                                  │
│  [ic]  │                                                  │
│  [ic]  │                                                  │
│  [ic]* │                                                  │
│  [ic]  │                                                  │
│────────│                                                  │
│  [ic]  │                                                  │
│────────│                                                  │
│  [⚙]  │                                                  │
│  [→|]  │                                                  │
└────────┴─────────────────────────────────────────────────┘

MOBILE (sidebar = drawer overlay)
┌──────────────────────────┐
│ [≡]  [LOGO]        [🔔]  │ ← Header bar
│──────────────────────────│
│                          │
│  [PAGE CONTENT]          │
│                          │
│                          │
│                          │
│──────────────────────────│
│ [🏠]  [📦]  [📄]  [👤]  │ ← Bottom tab bar
└──────────────────────────┘

MOBILE — Drawer ouvert (overlay)
┌──────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░ │ ← Overlay dark
│ ░┌────────────────┐░░░░░ │
│ ░│ [X] [LOGO]     │░░░░░ │
│ ░│────────────────│░░░░░ │
│ ░│ [Av] Prénom N. │░░░░░ │
│ ░│ Role / Segment │░░░░░ │
│ ░│────────────────│░░░░░ │
│ ░│ ● Active Item  │░░░░░ │
│ ░│ ▸ Nav Item     │░░░░░ │
│ ░│ ▸ Nav Item     │░░░░░ │
│ ░│────────────────│░░░░░ │
│ ░│ ▸ Paramètres   │░░░░░ │
│ ░│ ▸ Déconnexion  │░░░░░ │
│ ░└────────────────┘░░░░░ │
└──────────────────────────┘
```

---

### 2. KPI Grid Layout

```
DESKTOP (4 colonnes)
┌─────────────────────────────────────────────────────────────┐
│ Titre de la section                   [Période ▼] [Export]  │
│─────────────────────────────────────────────────────────────│
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────┐│
│ │ KPI CARD 1   │ │ KPI CARD 2   │ │ KPI CARD 3   │ │ KPI  ││
│ │              │ │              │ │              │ │ CARD ││
│ │ [icon]       │ │ [icon]       │ │ [icon]       │ │  4   ││
│ │ 1 234        │ │ €45 678      │ │ 98%          │ │      ││
│ │ ↑ +12% mois  │ │ ↓ -3% mois   │ │ → stable     │ │ ...  ││
│ │ Label KPI 1  │ │ Label KPI 2  │ │ Label KPI 3  │ │      ││
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────┘│
│─────────────────────────────────────────────────────────────│
│ ┌──────────────────────────────┐ ┌──────────────────────────┐│
│ │ CHART / GRAPHIQUE PRINCIPAL  │ │ CHART / LISTE SECONDAIRE ││
│ │                              │ │                          ││
│ │  [chart area]                │ │  [chart area]            ││
│ │                              │ │                          ││
│ └──────────────────────────────┘ └──────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

TABLET (2 colonnes)
┌────────────────────────────────────┐
│ ┌───────────────┐ ┌───────────────┐│
│ │ KPI CARD 1    │ │ KPI CARD 2    ││
│ └───────────────┘ └───────────────┘│
│ ┌───────────────┐ ┌───────────────┐│
│ │ KPI CARD 3    │ │ KPI CARD 4    ││
│ └───────────────┘ └───────────────┘│
│ ┌────────────────────────────────┐ │
│ │ CHART PRINCIPAL                │ │
│ └────────────────────────────────┘ │
│ ┌────────────────────────────────┐ │
│ │ CHART SECONDAIRE               │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘

MOBILE (1 colonne)
┌──────────────────────┐
│ ┌────────────────────┐│
│ │ KPI CARD 1         ││
│ └────────────────────┘│
│ ┌────────────────────┐│
│ │ KPI CARD 2         ││
│ └────────────────────┘│
│ ┌────────────────────┐│
│ │ KPI CARD 3         ││
│ └────────────────────┘│
│ ┌────────────────────┐│
│ │ KPI CARD 4         ││
│ └────────────────────┘│
│ ┌────────────────────┐│
│ │ CHART PRINCIPAL    ││
│ │ (scroll horizontal)││
│ └────────────────────┘│
└──────────────────────┘
```

---

### 3. CRUD Table Page

```
DESKTOP
┌─────────────────────────────────────────────────────────────┐
│ [Titre Section]                                             │
│ [Sous-titre / description courte]                           │
│─────────────────────────────────────────────────────────────│
│ [🔍 Rechercher...]  [Filtre ▼]  [Filtre ▼]    [+ Créer]   │
│─────────────────────────────────────────────────────────────│
│ ☐ │ Col A        │ Col B     │ Col C   │ Col D  │ Actions  │
│───│──────────────│───────────│─────────│────────│──────────│
│ ☐ │ Valeur A1    │ Valeur B1 │ Badge   │ 12/01  │ [✏] [🗑]│
│ ☐ │ Valeur A2    │ Valeur B2 │ Badge   │ 11/01  │ [✏] [🗑]│
│ ☐ │ Valeur A3    │ Valeur B3 │ Badge   │ 10/01  │ [✏] [🗑]│
│ ☐ │ Valeur A4    │ Valeur B4 │ Badge   │ 09/01  │ [✏] [🗑]│
│ ☐ │ Valeur A5    │ Valeur B5 │ Badge   │ 08/01  │ [✏] [🗑]│
│─────────────────────────────────────────────────────────────│
│ Affichage 1-10 sur 47    [◀] 1  2  3  4  5 [▶]  [10/pag ▼]│
└─────────────────────────────────────────────────────────────┘

MOBILE (table → cards)
┌──────────────────────────────┐
│ [🔍 Rechercher...]  [⊞ Filtres]│
│──────────────────────────────│
│ ┌──────────────────────────┐ │
│ │ Valeur A1           [Badge]│
│ │ Valeur B1  ·  12/01/2026 │ │
│ │ Col D: texte...          │ │
│ │              [Éditer] [🗑]│
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ Valeur A2           [Badge]│
│ │ ...                      │ │
│ └──────────────────────────┘ │
│ [Charger plus…]              │
└──────────────────────────────┘
```

---

### 4. Detail Page (2/3 + 1/3)

```
DESKTOP (2 colonnes)
┌─────────────────────────────────────────────────────────────┐
│ ← Retour à [liste]   [Titre Détail #ID]   [Actions: ✏ 🗑]  │
│─────────────────────────────────────────────────────────────│
│ COLONNE PRINCIPALE (2/3)      │ COLONNE SECONDAIRE (1/3)    │
│───────────────────────────────│─────────────────────────────│
│ ┌───────────────────────────┐ │ ┌───────────────────────────┐│
│ │ Section Principale        │ │ │ Résumé / Statut           ││
│ │ ─────────────────────     │ │ │ ─────────────────────     ││
│ │ Champ 1: Valeur           │ │ │ Statut: [Badge]           ││
│ │ Champ 2: Valeur           │ │ │ Créé: 12/01/2026          ││
│ │ Champ 3: Valeur longue    │ │ │ Par: Prénom N.            ││
│ │ ...                       │ │ │                           ││
│ └───────────────────────────┘ │ └───────────────────────────┘│
│ ┌───────────────────────────┐ │ ┌───────────────────────────┐│
│ │ Section Items / Liste     │ │ │ Montant / Total           ││
│ │ ─────────────────────     │ │ │ ─────────────────────     ││
│ │ Item 1 ......... 10,00 €  │ │ │ Sous-total:   100,00 €   ││
│ │ Item 2 ......... 25,00 €  │ │ │ Taxes:         20,00 €   ││
│ │ Item 3 ......... 50,00 €  │ │ │ ──────────────────────   ││
│ │                           │ │ │ Total:        120,00 €   ││
│ └───────────────────────────┘ │ └───────────────────────────┘│
│ ┌───────────────────────────┐ │ ┌───────────────────────────┐│
│ │ Timeline / Historique     │ │ │ Actions rapides           ││
│ │ ─────────────────────     │ │ │ ─────────────────────     ││
│ │ ● Créé — 12/01            │ │ │ [Bouton Action 1]         ││
│ │ ● Traité — 13/01          │ │ │ [Bouton Action 2]         ││
│ │ ○ Livré — en attente      │ │ │ [Bouton Action 3]         ││
│ └───────────────────────────┘ │ └───────────────────────────┘│
└───────────────────────────────┴─────────────────────────────┘

MOBILE (1 colonne, sections empilées)
┌──────────────────────────────┐
│ ← Retour      #ID   [Actions]│
│──────────────────────────────│
│ [Badge Statut]               │
│ Résumé / Total               │
│──────────────────────────────│
│ Section Principale           │
│ Champ 1: Valeur              │
│ Champ 2: Valeur              │
│──────────────────────────────│
│ Section Items                │
│ Item 1 ........... 10,00 €   │
│ Item 2 ........... 25,00 €   │
│──────────────────────────────│
│ Timeline                     │
│ ● Créé — 12/01               │
│ ● Traité — 13/01             │
│──────────────────────────────│
│ Actions rapides              │
│ [Bouton Action 1]            │
│ [Bouton Action 2]            │
└──────────────────────────────┘
```

---

### 5. Form Page

```
DESKTOP (formulaire centré, max-width ~720px)
┌─────────────────────────────────────────────────────────────┐
│ ← Retour           [Titre Formulaire]                       │
│─────────────────────────────────────────────────────────────│
│         ┌───────────────────────────────────────┐           │
│         │ Section 1 — Informations générales    │           │
│         │ ─────────────────────────────────     │           │
│         │ Label champ *                         │           │
│         │ ┌─────────────────────────────────┐  │           │
│         │ │ placeholder...                  │  │           │
│         │ └─────────────────────────────────┘  │           │
│         │                                       │           │
│         │ Label champ *    Label champ          │           │
│         │ ┌───────────┐    ┌────────────────┐  │           │
│         │ │ ...       │    │ ...            │  │           │
│         │ └───────────┘    └────────────────┘  │           │
│         │ ⚠ Message d'erreur inline             │           │
│         └───────────────────────────────────────┘           │
│         ┌───────────────────────────────────────┐           │
│         │ Section 2 — Détails supplémentaires   │           │
│         │ ─────────────────────────────────     │           │
│         │ [Select ▼]    [Date picker]           │           │
│         │ [Textarea multilignes]                │           │
│         │ ☐ Option 1                            │           │
│         │ ☐ Option 2                            │           │
│         └───────────────────────────────────────┘           │
│         [Annuler]                      [Enregistrer]        │
└─────────────────────────────────────────────────────────────┘

MOBILE (pleine largeur)
┌──────────────────────────────┐
│ ← Retour   [Titre Form]      │
│──────────────────────────────│
│ Section 1                    │
│ Label *                      │
│ ┌────────────────────────┐   │
│ │ placeholder...         │   │
│ └────────────────────────┘   │
│ Label *                      │
│ ┌────────────────────────┐   │
│ │ placeholder...         │   │
│ └────────────────────────┘   │
│ ⚠ Erreur inline              │
│──────────────────────────────│
│ Section 2                    │
│ [Select ▼]                   │
│ [Textarea]                   │
│──────────────────────────────│
│ [Annuler]   [Enregistrer →]  │
└──────────────────────────────┘
```

---

### 6. Settings Page

```
DESKTOP (sidebar navigation + contenu)
┌─────────────────────────────────────────────────────────────┐
│ Paramètres                                                  │
│─────────────────────────────────────────────────────────────│
│ CATÉGORIES (nav) │ CONTENU                                  │
│──────────────────│──────────────────────────────────────────│
│ ● Profil         │ Profil                                   │
│ ▸ Sécurité       │ ───────────────────────────────────────  │
│ ▸ Notifications  │ Photo de profil                          │
│ ▸ Facturation    │ [Avatar 80px]  [Modifier]  [Supprimer]   │
│ ▸ Équipe         │                                          │
│ ▸ Intégrations   │ Nom *          Prénom *                  │
│ ▸ Avancé         │ ┌───────────┐  ┌──────────────────────┐ │
│                  │ │ ...       │  │ ...                  │ │
│                  │ └───────────┘  └──────────────────────┘ │
│                  │                                          │
│                  │ Email *                                  │
│                  │ ┌────────────────────────────────────┐  │
│                  │ │ utilisateur@exemple.com             │  │
│                  │ └────────────────────────────────────┘  │
│                  │ ℹ Un email de confirmation sera envoyé  │
│                  │                                          │
│                  │                  [Enregistrer les modif.]│
│                  │ ────────────────────────────────────────  │
│                  │ Zone de danger                           │
│                  │ [Supprimer le compte]                    │
└──────────────────┴──────────────────────────────────────────┘

MOBILE (accordéon)
┌──────────────────────────────┐
│ Paramètres                   │
│──────────────────────────────│
│ ▼ Profil                     │
│   [Avatar] Modifier          │
│   Nom: ...                   │
│   Email: ...                 │
│   [Enregistrer]              │
│──────────────────────────────│
│ ▶ Sécurité                   │
│ ▶ Notifications              │
│ ▶ Facturation                │
│ ▶ Équipe                     │
└──────────────────────────────┘
```

---

## Navigation Map Template

```
DESKTOP — Sidebar Navigation

[LOGO + Nom App]                              [← Collapse]
─────────────────────────────────────────────────────────
[Avatar] Prénom NOM
         Role · Segment
─────────────────────────────────────────────────────────
PRINCIPAL
  [🏠] Tableau de bord                         ← /dashboard
  [📦] [Entité 1]                             ← /[entite-1]
  [📄] [Entité 2]                             ← /[entite-2]
    └─ [Sous-page]                            ← /[entite-2]/[slug]
  [💰] [Entité 3]                             ← /[entite-3]

─────────────────────────────────────────────────────────
CONFIGURATION
  [👥] Équipe                                  ← /equipe
  [⚙] Paramètres                              ← /parametres

─────────────────────────────────────────────────────────
  [?]  Aide / Documentation
  [→|] Déconnexion


MOBILE — Bottom Tab Bar
─────────────────────────────────────────────────────────
  [🏠]        [📦]        [📄]        [👤]
Accueil     [Entité 1]  [Entité 2]   Profil
  ●                                              ← active indicator

Icônes avec badge (notification count):
  [📦 3]  → entité avec 3 nouveaux éléments
```

---

## UI States — Template obligatoire par page

Chaque wireframe DOIT inclure ces 4 états. Template à copier et adapter :

### Loading Skeleton

```
ÉTAT: CHARGEMENT (skeleton)
┌─────────────────────────────────────────────────────────────┐
│ ████████████████████          ████████ ████████████         │ ← titre skeleton
│─────────────────────────────────────────────────────────────│
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐   │
│ │ ████████       │ │ ████████       │ │ ████████       │   │ ← KPI skeleton
│ │                │ │                │ │                │   │
│ │ ██████████████ │ │ ██████████████ │ │ ██████████████ │   │
│ └────────────────┘ └────────────────┘ └────────────────┘   │
│─────────────────────────────────────────────────────────────│
│ ████████████  ████████████████████████████████████  ██████  │ ← row skeleton
│ ████████████  ██████████  ██████████████████████    ██████  │
│ ████████████  ████████████  ████████████████  ████  ██████  │
└─────────────────────────────────────────────────────────────┘
Animation: pulse (opacity 1 → 0.4 → 1, 1.5s ease-in-out infinite)
```

### Empty State

```
ÉTAT: VIDE (aucune donnée)
┌─────────────────────────────────────────────────────────────┐
│ [Titre Section]                                  [+ Créer]  │
│─────────────────────────────────────────────────────────────│
│                                                             │
│                   [ILLUSTRATION / ICON 80px]                │
│                                                             │
│                 Aucun(e) [entité] pour l'instant            │
│         Commencez par créer votre premier(e) [entité].      │
│                                                             │
│                    [+ Créer un(e) [entité]]                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Variante avec filtre actif:
│                   [ILLUSTRATION / ICON]                     │
│              Aucun résultat pour "[recherche]"              │
│            Essayez de modifier vos filtres ou              │
│                votre terme de recherche.                    │
│                   [Effacer les filtres]                     │
```

### Error State

```
ÉTAT: ERREUR
┌─────────────────────────────────────────────────────────────┐
│ [Titre Section]                                             │
│─────────────────────────────────────────────────────────────│
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ⚠  Une erreur est survenue                              │ │
│ │    Impossible de charger les données.                   │ │
│ │    Code d'erreur: [code] (optionnel)                    │ │
│ │                                    [Réessayer]          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [Contenu précédent grisé / blur léger si disponible]       │
└─────────────────────────────────────────────────────────────┘

Error inline (champ):
│ Label *                                                     │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ valeur invalide                                     │    │ ← border-error
│ └─────────────────────────────────────────────────────┘    │
│ ⚠ Ce champ est requis                                       │ ← text-error
```

### Success State

```
ÉTAT: SUCCÈS (après action)
Toasts (top-right desktop, bottom-center mobile):
┌──────────────────────────────┐
│ ✓  [Entité] créé avec succès │  ← toast succès (vert, 3s auto-dismiss)
│                          [X] │
└──────────────────────────────┘

Inline (dans le formulaire):
┌──────────────────────────────────────────────────────────┐
│ ✓  Modifications enregistrées                            │
└──────────────────────────────────────────────────────────┘

Page complète (ex: confirmation commande):
┌─────────────────────────────────────────────────────────────┐
│                   [✓ icon 64px, couleur success]            │
│                                                             │
│                [Titre de confirmation]                      │
│         [Description de ce qui vient de se passer]         │
│                                                             │
│         [Action principale]      [Action secondaire]        │
└─────────────────────────────────────────────────────────────┘
```

---

## Responsive Guidelines

### Règles de transformation par élément

| Élément | Desktop (≥1024px) | Tablet (768–1023px) | Mobile (<768px) |
|---------|-------------------|---------------------|-----------------|
| Sidebar | Visible, 280px, collapsible à 64px | Drawer overlay | Drawer overlay |
| Navigation | Sidebar verticale | Sidebar (icônes seules) | Bottom tab bar (4–5 items) |
| Header | Breadcrumb + user menu | Breadcrumb raccourci | Logo + hamburger + bell |
| KPI Grid | 4 colonnes | 2 colonnes | 1 colonne |
| Table | Toutes colonnes visibles | Colonnes critiques + scroll horizontal | Cards verticales |
| Detail layout | 2/3 + 1/3 colonnes | 1 colonne empilée | 1 colonne empilée |
| Formulaire | Max-width centré, champs côte à côte | Champs pleine largeur | Champs pleine largeur |
| Modales | Fenêtre centrée, max 600px | Fenêtre centrée | Plein écran (height: 100dvh) |
| Boutons | Texte + icône | Texte + icône | Texte ou icône seule si espace limité |
| Graphiques | Taille fixe dans grid | Pleine largeur | Pleine largeur, scroll horizontal si nécessaire |
| Touch targets | N/A | 44px minimum | 44px minimum obligatoire |

### Colonnes cachées sur mobile (table → cards)

Quand une table se transforme en cards sur mobile :
- **Toujours visible** : identifiant principal, statut/badge, action primaire
- **Masqué** : colonnes de données secondaires (dates internes, IDs techniques, colonnes de tri)
- **Regroupé** : plusieurs colonnes secondaires condensées en une ligne de sous-texte

### Breakpoints standards

```css
/* Mobile first */
/* xs: default (< 640px) */
/* sm: 640px */
/* md: 768px  ← tablet */
/* lg: 1024px ← desktop sidebar visible */
/* xl: 1280px */
/* 2xl: 1536px */
```
