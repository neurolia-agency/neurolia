# Brief — Section Process (Landing Page)

**Statut** : Validé, prêt à implémenter
**Priorité** : Haute (quick win identifié lors de l'analyse Xtract)
**Créé le** : 2026-02-09
**Skill d'implémentation** : `/frontend-design`

---

## EXIGENCE PRINCIPALE : ANIMATIONS CONTINUES EN BOUCLE

**Cette section repose sur des micro-scènes animées en continu.** Les mocks UI à l'intérieur des cards ne sont PAS des images statiques ni des animations d'entrée au scroll. Ce sont des **scènes vivantes qui tournent en boucle**, comme des mini-vidéos.

Chaque card contient un mini-UI mock avec une animation CSS `@keyframes` en `infinite` — un scan qui balaye, des blocs qui pulsent, des données qui circulent. L'animation tourne EN PERMANENCE tant que la card est visible, pas une seule fois au scroll.

**Référence visuelle obligatoire** : Regarder `references/sites/xtract/screenshots/process.png` — c'est le niveau de richesse attendu :
- Xtract Étape 1 : cercle qui tourne en continu (scan/analyse)
- Xtract Étape 2 : code qui défile en permanence (scroll vertical en boucle)
- Xtract Étape 3 : données qui circulent entre deux points (particules/lueurs)

### Ce qui N'EST PAS acceptable

- Des animations d'entrée au scroll qui se jouent une fois puis s'arrêtent (`once: true`)
- Des mocks statiques après le chargement
- Des `useInView` + stagger comme unique animation (ça peut servir pour l'entrée de la card, mais le mock interne doit VIVRE en continu)

### Ce qui EST attendu

- Chaque mock a une **animation CSS en boucle infinie** (`animation: X Xs ease-in-out infinite`)
- L'animation raconte visuellement ce qui se passe à chaque étape (scan, assemblage, flux de données)
- Le pattern technique est celui du Hero existant : `@keyframes` dans `globals.css`, classes utilitaires, `will-change: transform`
- L'entrée de la card elle-même peut être un fade-in au scroll, mais le contenu du mock boucle indépendamment

---

## Contexte

### Pourquoi cette section

La landing page actuelle (6 sections) n'a pas de section process visible. Le composant existe sur `/services` (3 étapes simples : numéro + titre + texte) mais il est enterré. C'est un manquement majeur : le prospect ne voit pas **comment ça se passe concrètement** avant de prendre contact.

L'analyse du site référence Xtract (agence d'automatisation IA) a confirmé que les process cards avec mini-visuels animés sont un pattern puissant de réassurance. Xtract utilise 4 étapes avec des mocks UI animés dans chaque card.

### Ce qu'on reprend de Xtract (adapté)

- Le concept de **cards process avec visuels animés** à l'intérieur
- L'idée de **rendre chaque étape visuelle**, pas juste textuelle
- Le pattern **grille horizontale** pour les étapes

### Ce qu'on ne reprend PAS de Xtract

- Gradient text purple → pink (pas notre palette)
- Orbes/blur en background (interdit X18/X20)
- Border-radius sur les cards (interdit C24 — on reste sharp)
- Hero centré (interdit X2)
- Mocks génériques déconnectés du vrai service

---

## Spécification des 3 cards

### Card 01 — On écoute

**Texte** :
- Titre : "On écoute"
- Description : "Un appel de 30 minutes pour comprendre votre activité, vos objectifs, et identifier les leviers les plus rentables pour vous."

**Layout du mock** : Une card sombre qui contient un titre "AUDIT DE SITUATION" et 4 lignes de checklist (icône check + label).

**Animation continue** (CSS `@keyframes` infinite, comme le Hero) :

Une ligne de scan horizontale terracotta (2-3px de haut, largeur 100%) qui descend lentement du haut vers le bas de la checklist, puis recommence. Quand la ligne passe devant un item, l'icône check de cet item pulse (opacity 0.4→1→0.4) avec un `animation-delay` décalé pour chaque ligne.

| Élément | Animation | Durée cycle | Type |
|---------|-----------|-------------|------|
| Ligne de scan | `translateY` de 0% à 100%, puis reset | 4-5s | `infinite` |
| Check icône 1 | pulse opacity 0.4→1→0.4 | 4-5s | `infinite`, delay 0s |
| Check icône 2 | même pulse | 4-5s | `infinite`, delay ~1s |
| Check icône 3 | même pulse | 4-5s | `infinite`, delay ~2s |
| Check icône 4 | même pulse | 4-5s | `infinite`, delay ~3s |

**Pattern CSS** (ajouter dans `globals.css` comme les hero-*) :
```css
@keyframes process-scan {
  0%, 100% { transform: translateY(0); }
  90% { transform: translateY(calc(100% - 3px)); }
}

@keyframes process-check-pulse {
  0%, 100% { opacity: 0.4; }
  15%, 35% { opacity: 1; }
}
```

**Résultat** : Le prospect voit un scan qui balaye la checklist en continu, avec les checks qui s'allument au passage — comme un audit en cours, vivant.

### Card 02 — On propose

**Texte** :
- Titre : "On propose"
- Description : "Vous recevez une recommandation claire avec un plan d'action, un calendrier et un budget transparent. Pas de surprise."

**Layout du mock** : Une card sombre avec un titre "RECOMMANDATION SUR-MESURE" et 3 blocs empilés verticalement (chacun avec une barre terracotta 3px à gauche + nom de service), puis une ligne de budget en bas.

**Animation continue** (CSS `@keyframes` infinite) :

Un indicateur lumineux (glow terracotta subtil sur la barre gauche) qui cycle à travers les 3 blocs : bloc 1 s'illumine → bloc 2 s'illumine → bloc 3 s'illumine → recommence. Comme un système qui "configure" les modules un par un en boucle.

| Élément | Animation | Durée cycle | Type |
|---------|-----------|-------------|------|
| Barre terracotta bloc 1 | opacity 0.3→1→0.3 + box-shadow glow | 4s | `infinite`, delay 0s |
| Barre terracotta bloc 2 | même pulse | 4s | `infinite`, delay ~1.3s |
| Barre terracotta bloc 3 | même pulse | 4s | `infinite`, delay ~2.6s |
| Fond du bloc actif | background-color subtil shift (légèrement plus clair) | 4s | synchronisé avec la barre |

**Pattern CSS** :
```css
@keyframes process-module-pulse {
  0%, 100% { opacity: 0.3; box-shadow: none; }
  20%, 40% { opacity: 1; box-shadow: 0 0 12px rgba(196,92,59,0.3); }
}
```

Chaque bloc a la même animation mais avec un `animation-delay` décalé de ~1.3s pour créer l'effet de vague.

**Résultat** : Le prospect voit les modules "s'activer" un par un en boucle — comme une recommandation qui se construit dynamiquement.

### Card 03 — On livre

**Texte** :
- Titre : "On livre"
- Description : "On construit, vous validez. Des points réguliers, une mise en production soignée, et un suivi après lancement."

**Layout du mock** : Une card sombre avec un titre "ÉCOSYSTÈME EN PRODUCTION" et 3 zones empilées : (1) "Site" avec une barre de progression + label "EN LIGNE", (2) "Automatisations" avec des points connectés (CRM — Email — Facturation), (3) "Dashboard" avec des métriques chiffrées.

**Animation continue** (CSS `@keyframes` infinite) :

C'est la card la plus riche. 3 animations indépendantes qui tournent en parallèle :

**Zone "Site"** : La barre de progression a un shimmer (lueur qui traverse de gauche à droite en boucle), et le label "EN LIGNE" pulse doucement.

**Zone "Automatisations"** : Des petits dots/particules terracotta (2-3px) qui voyagent le long des lignes de connexion CRM → Email → Facturation en continu. Un dot part de CRM, traverse la ligne jusqu'à Email, puis un autre part d'Email vers Facturation, en boucle.

**Zone "Dashboard"** : Les métriques (127, 4.2%) ont un subtle pulse et le label "ACTIF" pulse comme un indicateur de statut.

| Élément | Animation | Durée cycle | Type |
|---------|-----------|-------------|------|
| Barre shimmer | pseudo-element `translateX` -100%→200% | 3s | `infinite` |
| Label "EN LIGNE" | opacity pulse 0.6→1→0.6 | 3s | `infinite` |
| Dot CRM→Email | `translateX` 0→100% le long de la ligne | 2.5s | `infinite` |
| Dot Email→Factu | même animation | 2.5s | `infinite`, delay 1.2s |
| Point CRM/Email/Factu | pulse opacity quand le dot arrive | 2.5s | synchronisé avec dots |
| Label "ACTIF" | opacity pulse 0.5→1→0.5 | 2s | `infinite` |
| Métriques | subtle opacity pulse 0.8→1→0.8 | 4s | `infinite` |

**Pattern CSS** :
```css
@keyframes process-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

@keyframes process-data-flow {
  0% { transform: translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(calc(var(--flow-distance))); opacity: 0; }
}

@keyframes process-status-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
```

**Résultat** : Le prospect voit un écosystème vivant — des données qui circulent, des indicateurs qui pulsent, un système en production active. C'est la card la plus impactante visuellement.

---

## Contraintes techniques

### ADN visuel Neurolia (non-négociable)

| Contrainte | Valeur |
|------------|--------|
| Couleur accent | Terracotta `#C45C3B` (5-10%) |
| Border-radius | `0` partout (sauf inputs: 2-4px) |
| Forme signature | Barre verticale 3-4px terracotta |
| Fond principal | `#050810` (ultra-dark) |
| Fond cards | `#0A0F1A` |
| Espacement sections | 160px desktop, 96px mobile |

### Stack

- React 19 + Next.js 15
- Tailwind CSS 4
- Framer Motion (`motion`, `useInView`, variants staggerées)
- Aucune image requise — tout est JSX/Tailwind/SVG inline

### Règles d'animation

**Animations continues (mocks internes)** :
- CSS `@keyframes` dans `globals.css` avec classes utilitaires (même pattern que `hero-breathe`, `hero-scroll-line`, etc.)
- `animation: name Xs ease-in-out infinite`
- `will-change: transform, opacity` sur les éléments animés
- Stagger entre éléments via `animation-delay` en CSS (pas en JS)
- Types autorisés : `translateX`, `translateY`, `opacity`, `scaleX`
- Interdit : `rotate`, `blur`, `filter`, `scale` sur conteneurs

**Entrée des cards (optionnel)** :
- Framer Motion `useInView` + `once: true` uniquement pour le fade-in de la card elle-même
- Le mock interne est déjà en train de boucler quand la card apparaît

**Référence technique** : voir `app/globals.css` section "HERO CSS ANIMATIONS" (lignes ~1296-1406) pour le pattern exact. Les animations process suivent le même pattern : `@keyframes` → classe CSS → `@media (prefers-reduced-motion)`.

### Pattern de code attendu

```css
/* Dans globals.css */
@keyframes process-scan {
  0%, 100% { transform: translateY(0); }
  90% { transform: translateY(calc(100% - 3px)); }
}

.process-scan {
  animation: process-scan 4.5s ease-in-out infinite;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .process-scan { animation: none; }
}
```

```tsx
/* Dans le composant — PAS de Framer Motion pour les boucles */
<div className="process-scan" />
```

---

## Placement sur la landing page

### Ordre actuel
```
Hero → ServicesPreview → PortfolioPreview → Testimonials → ContactMini → CtaFinal
```

### Ordre proposé
```
Hero → ServicesPreview → Process (NOUVEAU) → PortfolioPreview → Testimonials → ContactMini → CtaFinal
```

---

## Fichiers à créer / modifier

| Action | Fichier | Description |
|--------|---------|-------------|
| Créer | `components/sections/process.tsx` | Nouveau composant section process pour la landing |
| Modifier | `app/page.tsx` | Ajouter `<Process />` entre ServicesPreview et PortfolioPreview |

**Note** : Le composant `components/pages/services/process.tsx` existant sur /services reste inchangé.

---

## Sources de contexte

| Document | Localisation | Ce qu'il contient |
|----------|-------------|-------------------|
| Catalogue services complet | `../neurolia-context/Neurolia-Catalogue-Services-2026.pdf` | 14 services détaillés, positionnement, stack technique |
| Analyse Xtract | `references/sites/xtract/xtract.md` | Analyse concurrentielle, ce qu'on reprend / ne reprend pas |
| Screenshot process Xtract | `references/sites/xtract/screenshots/process.png` | REFERENCE VISUELLE pour le niveau de richesse attendu |
| Process actuel (/services) | `components/pages/services/process.tsx` | Composant existant (3 étapes simples, sans visuels animés) |
| Design tokens Neurolia | `app/globals.css` | Source unique des tokens CSS du projet |

---

*Brief validé le 2026-02-09. Révisé le 2026-02-09 (clarification exigence animations).*
