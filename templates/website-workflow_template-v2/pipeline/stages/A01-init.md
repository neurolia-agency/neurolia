# Étape A01 : Initialisation

> **Phase A : Architecture** — Première étape du pipeline.

## Objectif

Transformer le brief client et toutes les sources disponibles (brief, assets, analyse interne, conversations) en un **document stratégique structuré** exploitable par les étapes suivantes. Ce document doit être suffisamment complet pour qu'un autre intervenant puisse reprendre le projet sans perte de contexte.

## Input

- `input/brief-client.md` (questionnaire rempli)
- `input/` (tous les assets fournis : logos, chartes, cartes, photos)
- Conversation avec le client (si informations complémentaires)
- Sources internes (analyses, audits, données existantes)

## Instructions

1. **Lire** le brief client complet et tous les documents dans `input/`
2. **Analyser** les assets fournis (logos, cartes, contenus existants) — en extraire les informations exploitables
3. **Identifier** le type de site, les pages nécessaires et le positionnement
4. **Rechercher** le contexte concurrentiel et le marché (si données disponibles)
5. **Rédiger** le brief structuré selon le template ci-dessous
6. **Lister** explicitement les éléments manquants avec leur impact sur le pipeline

> **Principe** : Mieux vaut documenter une information comme "À confirmer" que de l'omettre. Le brief doit cartographier tout ce qu'on sait ET tout ce qu'on ne sait pas encore.

## Output

Créer `output/00-brief.md` :

```markdown
# Brief Projet : [Nom]

> Produit par l'étape A01-Init — [Date] (v1)

## Client

- **Entreprise** : [Nom commercial]
- **Secteur** : [Secteur d'activité]
- **Contact** : [Téléphone / Email]
- **Adresse** : [Adresse complète]
- **Contexte** : [Environnement business — ex: galerie marchande, centre-ville, zone commerciale]
- **Identité existante** : [Logo existant ? Charte graphique ? Designer ?]

## Projet

- **Type** : [Landing / Vitrine / E-commerce / Vitrine stratégique]
- **Objectif principal** : [Conversion visée — ex: visites physiques, appels, devis]
- **KPI** : [Métrique mesurable — ex: appels téléphoniques depuis le site]
- **Approche** : [Mobile-first / Desktop-first / Responsive standard]

### Objectifs Détaillés

1. [Objectif 1 — avec contexte]
2. [Objectif 2]
3. [Objectif 3]
4. [Objectif 4 (optionnel)]

## Livrables

| # | Livrable | Description |
|---|----------|-------------|
| 1 | [Livrable 1] | [Description + ce qui est inclus/exclus] |
| 2 | [Livrable 2] | [Description] |

> Préciser ce qui est inclus et ce qui ne l'est pas (ex. logo existant = non inclus).

## Cibles

### Persona A — [Nom descriptif]
- [Contexte / situation]
- [Besoin principal]
- [Comportement digital — comment il cherche / arrive sur le site]

### Persona B — [Nom descriptif]
- [Contexte / situation]
- [Besoin principal]
- [Comportement digital]

> Ajouter un Persona C si pertinent. Maximum 3 personas.

## Pages

- [ ] **Accueil** : [Description courte du rôle de la page]
- [ ] **[Page 2]** : [Description]
- [ ] **[Page 3]** : [Description]
- [ ] **Contact** : [Description]
- [ ] **Mentions Légales**
- [ ] [Autres pages à confirmer]

## Positionnement & Messages Clés

- **ADN / Positionnement** : [Phrase qui capture l'essence de la marque]
- **Valeurs** : [3-4 valeurs clés]
- **Différenciateur** : [Ce qui distingue le client de ses concurrents]
- **Tagline / Signature visuelle** : [Phrase d'accroche]
- **Proposition de valeur** : [Promesse principale au client final]

## Offre

| Catégorie / Moment | Produits / Services | Prix / Gamme |
|---------------------|---------------------|--------------|
| [Catégorie 1] | [Détail] | [Prix ou "À détailler"] |
| [Catégorie 2] | [Détail] | [Prix ou "À détailler"] |

> Adapter les colonnes au secteur. Pour un prestataire de services : Service / Description / Tarif.

## Concurrence

| Type | Exemples | Faiblesse exploitable |
|------|----------|-----------------------|
| [Concurrent direct] | [Noms] | [Ce qu'on fait mieux] |
| [Concurrent indirect] | [Noms] | [Ce qu'on fait mieux] |

> Si pas de données concurrentielles : noter "À analyser" et ne pas bloquer.

## Identité Visuelle Existante

### Couleurs
| Token | Hex | Usage |
|-------|-----|-------|
| [Nom] | [#hex] | [Rôle — ex: accent, texte, fond] |

### Typographies
- **[Rôle]** : [Nom de la police] ([style])

### Logo
- [Description : variantes, format, statut]

### Ton
- [Tutoiement / Vouvoiement]
- [Registre — ex: chaleureux, professionnel, technique]

> Si pas d'identité visuelle existante : noter "À créer en A02-Brand".

## Pré-Requis Techniques

| Fonctionnalité | Statut | Priorité |
|----------------|--------|----------|
| [Fonctionnalité 1] | [À développer / Existant / Non requis] | [P0/P1/P2] |
| [Fonctionnalité 2] | [Statut] | [Priorité] |

### Horaires (si applicable)
- [Jours et horaires d'ouverture]

### Stack
- [Stack technique — ex: Next.js 15+, Tailwind CSS 4, Vercel]

## Ambition Visuelle

> Cette section est critique pour la Phase B. Elle détermine le niveau de sophistication du frontend et alimente directement le calibrage des dials de `frontend-design2`.

- **Niveau visé** : [Art Gallery / Premium / Professionnel / Fonctionnel]
  - Art Gallery = site vitrine haut de gamme, animations cinématiques, whitespace massif
  - Premium = design soigné, animations fluides, identité forte
  - Professionnel = sobre, efficace, conversion-first
  - Fonctionnel = utilitaire, dashboard, densité d'information
- **Impression cible** : [3 adjectifs que le visiteur doit ressentir en arrivant sur le site]
- **Anti-modèles** : [Ce que le site ne doit surtout PAS être — ex: "pas un template WordPress", "pas un site Wix de plombier"]
- **Complexité technique acceptée** : [Statique / Animations CSS / Animations avancées (Framer Motion) / Scrolltelling (GSAP)]

## Références Visuelles

> Minimum 3 références. Pour chaque référence, extraire des observations concrètes — pas juste "j'aime bien".

### Référence 1
- **URL** : [URL]
- **Ce qu'on retient visuellement** : [Layout ? Typo ? Palette ? Animations ? Spacing ?]
- **Mesures observées** : [Taille de typo estimée, spacing entre sections, largeur max du contenu]
- **Émotion produite** : [Ce qu'on ressent en visitant — 2-3 mots]

### Référence 2
- **URL** : [URL]
- **Ce qu'on retient visuellement** : [...]
- **Mesures observées** : [...]
- **Émotion produite** : [...]

### Référence 3
- **URL** : [URL]
- **Ce qu'on retient visuellement** : [...]
- **Mesures observées** : [...]
- **Émotion produite** : [...]

> Si pas encore fournies par le client : noter "En attente client" mais ne pas bloquer.

## Éléments Manquants

| Élément | Impact | Bloque |
|---------|--------|--------|
| [Élément 1] | [Ce que ça empêche de faire] | [Étape bloquée — ex: A04-Structure] |
| [Élément 2] | [Impact] | [Étape bloquée] |

> Cette section est critique. Elle permet d'anticiper les blocages et de relancer le client sur les bons éléments au bon moment.

## Notes Stratégiques

- [Insight 1 — observation actionnable sur le marché, le client ou l'approche]
- [Insight 2]
- [Insight 3]

> Capturer ici les réflexions qui ne rentrent pas dans les sections structurées mais qui orienteront les décisions en A02-Brand et au-delà.

---

## Validation A01-Init

- [ ] Nom entreprise défini
- [ ] Type de site identifié
- [ ] Objectif clair et mesurable (avec KPI)
- [ ] Cibles décrites (au moins 1 persona)
- [ ] Liste des pages établie
- [ ] Livrables définis (périmètre inclus/exclus)
- [ ] Positionnement et différenciateurs définis
- [ ] Concurrence analysée (ou marquée "À analyser")
- [ ] Identité visuelle documentée (existante ou "À créer")
- [ ] Éléments manquants listés avec impact
- [ ] Au moins 3 références visuelles avec mesures et émotions (ou "En attente client")
- [ ] Ambition visuelle définie (niveau, impression cible, anti-modèles)
- [ ] Complexité technique acceptée définie

## Prochaine Étape

Une fois `output/00-brief.md` créé → Passer à `stages/A02-brand.md`
```

---

**Version** : 2.0
**Phase** : A01 (Architecture)
**Dépendances** : Aucune
**Produit pour** : A02 (Brand), A04 (Structure)
