# Phase 4 — Verification

> Sous-etape de [S02-brand.md](S02-brand.md)

## Instructions

1. **Relire chaque fichier** — verifier qu'aucun placeholder `[texte]` ne reste
2. **Verifier la derivation** — chaque fichier a son commentaire `<!-- Derive de : ... -->`
3. **Verifier la coherence** — les valeurs dans about.md, le ton dans tone.md et les messages dans positioning.md doivent raconter la meme histoire
4. **Verifier le design system** — couleurs en HEX, pas d'OKLCH, pas de variables CSS
5. **Relire la Carte de Derivation** (00-platform.md) — verifier que chaque lien Composant → Fichier est bien materialise

---

## Checklists de validation

### Plateforme (00-platform.md)
- [ ] **Insight** : Contient une tension reelle (pas un truisme)
- [ ] **Insight** : Passe le test d'interchangeabilite
- [ ] **Values** : 3-4 valeurs, chacune avec definition + implique + exclut
- [ ] **Archetype** : Justifie par le contexte, pas choisi arbitrairement
- [ ] **Archetype** : Manifestation declinee (ton, comportement, visuel)
- [ ] **Calibrage Creatif Social** : Complete (style photo, video, formats, densite, couleurs, registre)
- [ ] **Promise** : Passe le test de specificite
- [ ] **Proof Points** : Verifiables (pas inventes)
- [ ] **Carte de Derivation** : Complete (tous les composants → fichiers)

### Par fichier

#### about.md
- [ ] Mission/Vision ancrees dans le reel (pas de corporate generique)
- [ ] Chiffres cles verifiables (pas inventes)
- [ ] Slogan distinct de la tagline (positioning.md)

#### services.md
- [ ] Adapte au secteur (pas "services" pour un restaurant)
- [ ] Chaque categorie a tagline + cible + tarif
- [ ] Chaque categorie a une section "Potentiel Social" (visuels, pilier, angle)

#### positioning.md
- [ ] Tagline passe le test de specificite
- [ ] 3-5 Piliers de Contenu Social definis avec description, frequence, format, hook, plateformes
- [ ] CTA Sociaux definis (lien en bio, DM, partage, etc.)
- [ ] Messages par Pilier ont des angles distincts (pas de reformulation)

#### tone.md
- [ ] Chaque trait de personnalite a un exemple de phrase contextualise
- [ ] Mots a eviter ont une justification
- [ ] Traits derives explicitement de l'archetype/values/insight
- [ ] **Adaptation Social Media** complete :
  - [ ] Emojis : usage, autorises, interdits, placement
  - [ ] Hashtags : strategie, brandes, niche, nombre, placement
  - [ ] Ton par format (feed/carousel/reel/story/LinkedIn)
  - [ ] Longueur captions par plateforme
- [ ] **Regles Redactionnelles** definies (minimum 5 regles)

#### personas.md
- [ ] Chaque persona a un scenario narratif (pas juste des bullets)
- [ ] Message cle sonne vrai, pas marketing
- [ ] **Comportement Social** par persona complete :
  - [ ] Plateforme principale
  - [ ] Temps de consultation
  - [ ] Contenu consomme
  - [ ] Mode d'interaction
  - [ ] Ce qui fait s'arreter de scroller
  - [ ] Ce qui fait fuir

#### design-system.md
- [ ] Toutes les couleurs en HEX (pas d'OKLCH)
- [ ] Pas de variables CSS
- [ ] Pas d'import HTML
- [ ] Variantes (clair/fonce/pale) pour chaque couleur principale
- [ ] Harmonie colorimetrique justifiee
- [ ] Typographies avec feeling et justification du pairing
- [ ] **Application Social Media** complete :
  - [ ] Contraste mobile (taille min, ratio, zone safe)
  - [ ] Templates grille Instagram
  - [ ] Usage par format (fond, texte, accent, police)

#### objectifs.md
- [ ] Objectif principal defini avec horizon et justification
- [ ] Objectifs secondaires listes
- [ ] KPIs mesurables avec baseline, objectif, horizon, outil
- [ ] Frequence de suivi definie
- [ ] Lien avec les objectifs business explicite

### Qualite creative — Expression verbale (via `/brand-expression`)
- [ ] Tagline principale : passe le test de specificite (non-interchangeable)
- [ ] Tagline principale : score >= 17/20
- [ ] Slogan =/= Tagline (deux formulations distinctes)
- [ ] Baseline : ajoute du contexte, ne reformule pas la tagline
- [ ] Piliers de Contenu : chacun a un angle distinct
- [ ] Taglines de categories (services.md) : differenciees entre elles
- [ ] Exemples de ton (tone.md) : ancres dans des situations specifiques au client

### Qualite creative — Identite visuelle (Phase 3b)
- [ ] Strategie de palette justifiee par l'archetype
- [ ] Noms de couleurs evocateurs et coherents avec l'univers de marque
- [ ] Choix de police justifie par l'archetype (feeling decrit)
- [ ] Pairing argumente (contraste hierarchique, coherence atmospherique)
- [ ] Scenarios personas immersifs (pas de bullet points secs)
- [ ] Freins formules en paroles interieures authentiques

### Derivation et coherence
- [ ] 8 fichiers crees (00-platform + about + services + positioning + tone + personas + design-system + objectifs)
- [ ] Chaque fichier a son commentaire `<!-- Derive de : ... -->`
- [ ] Aucun placeholder `[texte]` restant
- [ ] Coherence entre les 8 fichiers (meme voix, memes valeurs, meme archetype)
- [ ] Si marque existante : identite etendue, pas recreee
- [ ] Carte de Derivation (00-platform.md) reflete les liens reels

### Zero reference frontend
- [ ] Aucune mention de Next.js, React, Tailwind, ou composants
- [ ] Aucune variable CSS (--color-*, --font-*)
- [ ] Aucune valeur OKLCH
- [ ] Aucune reference a globals.css, frontend-design2, ou ui-kit
- [ ] Aucune reference a des etapes A03-A06 ou B01-B06
