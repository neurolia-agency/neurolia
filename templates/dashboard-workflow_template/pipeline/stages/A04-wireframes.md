# A04 — Wireframes : Wireframes par Page et Role

## Objectif

Creer des wireframes textuels pour chaque page du dashboard, organises par role, avec les etats UI (loading, empty, error) et les interactions.

## Agent

**`architecture-planner`** (sonnet)

## Skill

`dashboard-wireframes`

## Inputs

- `pipeline/output/03-structure/routes.md` — toutes les pages par role
- `pipeline/output/03-structure/data-model.md` — structure des donnees
- `pipeline/output/02-design-system/components.md` — composants disponibles
- `pipeline/output/02-design-system/constraints.md` — regles visuelles (ON FAIT / ON NE FAIT PAS)

## Processus

### 1. Inventaire Pages

A partir de `routes.md`, lister toutes les pages a wireframer :

| # | Page | Route | Role | Priorite |
|---|------|-------|------|----------|
| 1 | Login | /login | Public | Must |
| 2 | Register | /register | Public | Must |
| 3 | Dashboard | /dashboard | [Role 1] | Must |
| ... | ... | ... | ... | ... |

### 2. Format Wireframe

Pour chaque page, creer un fichier `pipeline/output/04-wireframes/[nom-page].md` :

```markdown
# Wireframe — [Nom Page]

**Route** : `/[route]`
**Role** : [Role]
**Composants requis** : Ref → `02-design-system/components.md`

## Layout

[Description du layout : sidebar visible, header fixe, zone contenu, etc.]

## Sections

### Section 1 — [Nom]

**Composant** : [Card / Table / Form / Chart / List / Grid]
**Donnees** : [Table(s) source, colonnes affichees]

**Contenu** :
- [Element 1] : [description]
- [Element 2] : [description]

**Interactions** :
- Clic [element] → [action/navigation]
- Filtre [champ] → [comportement]

**Design notes** :
- Ref → `constraints.md > [regle]`

### Section 2 — [Nom]
...

## Etats UI

### Loading
- [Description du skeleton/placeholder]

### Empty
- Icone : [nom icone Lucide]
- Message : "[Message]"
- CTA : "[Label bouton]" → [action]

### Error
- Message : "[Message d'erreur]"
- Action : "[Retry / Contact support]"

## Responsive

### Desktop (1920px)
- [Comportement specifique desktop]

### Mobile (375px)
- [Adaptations mobiles : sidebar collapse, table → cards, etc.]

## Navigation
- Breadcrumb : [Fil d'Ariane]
- Sidebar active : [Item actif]
- Actions header : [Boutons/liens]
```

### 3. Regles de Redaction

- **Pas de design detaille** — decrire le QUOI, pas le COMMENT
- **References** : utiliser `file.md > key` vers `02-design-system/` (ne pas dupliquer)
- **Donnees realistes** : exemples de donnees concrets, pas "Data 1, Data 2"
- **Etats UI obligatoires** : loading, empty, error pour chaque page avec donnees dynamiques
- **Responsive** : noter les differences desktop/mobile pour chaque page

### 4. Navigation Map

Creer `pipeline/output/04-wireframes/navigation-map.md` :

```markdown
# Navigation Map

## [Role 1]

```
Sidebar:
├── [icon] Dashboard (/dashboard)
├── [icon] [Entite 1] (/[entite-1])
│   └── Detail (/[entite-1]/[id])
├── [icon] [Entite 2] (/[entite-2])
└── [icon] Settings (/settings)

Header:
├── Notifications (badge count)
├── Profile menu
└── [Action principale]
```

## [Role 2]

```
Tab bar (mobile):
├── [icon] [Home] (/[home])
├── [icon] [Action] (/[action])
└── [icon] Profile (/profile)
```
```

## Output

```
pipeline/output/04-wireframes/
├── navigation-map.md     # Navigation par role
├── login.md              # Page login
├── register.md           # Page register
├── dashboard.md          # Dashboard principal (role 1)
├── [entity-list].md      # Liste entite (role 1)
├── [entity-detail].md    # Detail entite (role 1)
├── [entity-form].md      # Formulaire (role 1)
├── [role2-home].md       # Home role 2
├── [role2-pages].md      # Pages role 2
├── settings.md           # Settings
└── profile.md            # Profile
```

## Validation

- [ ] Toutes les pages de `routes.md` ont un wireframe
- [ ] Chaque wireframe a : layout, sections, etats UI, responsive, navigation
- [ ] Donnees avec exemples realistes (pas generiques)
- [ ] Etats UI couverts (loading, empty, error) pour les pages dynamiques
- [ ] References vers `02-design-system/` (pas de duplication)
- [ ] Navigation map complete par role
- [ ] Responsive note (desktop + mobile) pour chaque page
- [ ] Interactions documentees (clics, filtres, formulaires)
- [ ] 100% des pages du PRD couvertes
