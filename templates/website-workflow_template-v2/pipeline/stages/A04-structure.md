# Étape A4 : Structure (Sitemap)

> **Phase A : Architecture** - Définition de l'architecture des pages.

## Objectif

Définir l'architecture des pages et la hiérarchie du contenu.

## Input

- `output/00-brief.md` (liste des pages, ambition visuelle)
- `output/01-brand/services.md` (pour structurer les services)
- `output/02-art-direction/emotion-map.md` (parcours émotionnel → séquence des sections)
- `output/02-art-direction/project-dials.md` (techniques retenues → types de sections possibles)

## Instructions

1. **Lire** le brief pour identifier les pages demandées
2. **Consulter** `emotion-map.md` pour comprendre le parcours émotionnel souhaité — la séquence des sections doit servir la courbe émotionnelle, pas suivre un template générique
3. **Consulter** `project-dials.md` pour les techniques retenues — elles influencent le type de sections (ex: si "Sticky Scroll Stack" est retenu, prévoir une section avec scroll séquentiel plutôt qu'un grid statique)
4. **Définir** la hiérarchie des pages
5. **Détailler** les sections de chaque page en notant l'émotion cible par section
6. **Spécifier** la navigation

> **Anti-pattern** : Ne pas copier un sitemap générique (Hero → Services → Portfolio → Témoignages → CTA). La séquence doit refléter le parcours émotionnel défini en A03, pas un template standard.

## Output

Créer `output/03-sitemap.md` :

```markdown
# Sitemap - [Nom du Projet]

## Vue d'ensemble

```
[Nom du Site]
├── Accueil (/)
├── Services (/services)
├── Portfolio (/portfolio)
├── À Propos (/about)
├── Contact (/contact)
└── Mentions Légales (/mentions-legales)
```

## Pages Détaillées

### 1. Accueil (/)

**Objectif** : [Objectif principal de la page]

**Sections** :

> **Adapter la séquence au parcours émotionnel** défini dans `emotion-map.md`.
> L'ordre ci-dessous est un EXEMPLE, pas un template à suivre aveuglément.

1. **[Section 1 — ex: Hero]**
   - Contenu principal (positioning.md > tagline, etc.)
   - **Émotion cible** : [depuis emotion-map.md > Homepage > Section 1]
   - **Technique envisagée** : [depuis project-dials.md > Arsenal si applicable]

2. **[Section 2]**
   - Contenu
   - **Émotion cible** : [depuis emotion-map.md]
   - **Transition émotionnelle** : [comment on passe de l'émotion section 1 → section 2]

3. **[Section 3]**
   [Même structure...]

[Adapter le nombre de sections au projet — pas de minimum/maximum imposé]

### 2. Services (/services)

**Objectif** : Détailler l'offre

**Sections** :
1. Hero page
2. Grid services (tous les services)
3. Process / Comment ça marche
4. FAQ (optionnel)
5. CTA contact

### 3. Portfolio (/portfolio)

**Objectif** : Démontrer l'expertise

**Sections** :
1. Hero page
2. Grid projets
3. Étude de cas (1 projet détaillé)
4. CTA contact

### 4. À Propos (/about)

**Objectif** : Créer la confiance

**Sections** :
1. Hero page
2. Mission / Vision
3. Valeurs
4. Équipe (optionnel)
5. Chiffres clés
6. CTA contact

### 5. Contact (/contact)

**Objectif** : Faciliter la prise de contact

**Sections** :
1. Hero page
2. Formulaire de contact
3. Coordonnées
4. Carte (optionnel)

### 6. Mentions Légales (/mentions-legales)

**Objectif** : Conformité RGPD

**Sections** :
1. Éditeur du site
2. Hébergeur
3. Données personnelles
4. Cookies

## Navigation

### Header

**Structure Desktop** :
- Logo (lien → /)
- Menu : [Liens]
- CTA : [Texte] → /contact

**Structure Mobile** :
- Logo
- Hamburger menu

### Footer

**Colonnes** :
1. Navigation principale
2. Services
3. Contact
4. Légal

**Ligne du bas** :
- Copyright
- Réseaux sociaux (si applicable)

## Responsive

| Breakpoint | Navigation |
|------------|------------|
| Desktop (>1024px) | Menu horizontal |
| Tablet (768-1024px) | Menu hamburger |
| Mobile (<768px) | Menu hamburger |
```

## Validation

- [ ] Toutes les pages du brief sont couvertes
- [ ] Chaque page a un objectif défini
- [ ] Sections listées pour chaque page avec émotion cible
- [ ] Séquence des sections cohérente avec la courbe émotionnelle (emotion-map.md)
- [ ] Navigation header/footer définie
- [ ] URLs définies (kebab-case)
- [ ] Techniques retenues (project-dials.md) prises en compte dans les types de sections

## Prochaine Étape

Une fois `output/03-sitemap.md` créé → Passer à `stages/A05-wireframes.md`

---

**Version** : 2.0
**Phase** : A4 (Architecture)
**Dépendances** : A01 (Init), A02 (Brand), A03 (Art Direction — emotion-map, project-dials)
**Produit pour** : A05 (Wireframes), B01 (Layout)
