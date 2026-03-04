# Brief : Portfolio Scroll Reveal (style Zentry)

## Objectif

Remplacer le layout actuel de la section portfolio (`components/sections/portfolio-preview.tsx`) par un effet de scroll immersif inspiré de Zentry : les 3 images de projets se révèlent successivement via des animations `clip-path` dans une section pinnée, avec les infos projet en overlay cinématique sur chaque image.

## Contraintes techniques

| Contrainte | Valeur |
|------------|--------|
| Fichier cible | `components/sections/portfolio-preview.tsx` |
| Stack animations | GSAP + ScrollTrigger + `@gsap/react` (useGSAP) |
| Smooth scroll | Lenis (déjà dans le projet) |
| Framework | Next.js 15 / React 19 / TypeScript |
| Styling | Tailwind CSS 4 |
| Tokens | `app/globals.css` (couleur signature : `#C45C3B`, fond : `#050810`) |

### Dépendances

`gsap` et `@gsap/react` sont déjà installés dans le projet.

## Structure de scroll

La section est **pinnée** (`ScrollTrigger pin: true`) et reste fixe pendant que l'utilisateur scrolle. Hauteur totale de scroll : `window.innerHeight * 4`.

### Séquence d'animation (3 images empilées en `position: absolute`)

**Image 1** (projet 1) — visible dès le départ :
- Scale de 1 → 1.125 pendant le 1er viewport de scroll
- `scrub: true`, ease: none

**Image 2** (projet 2) — révélée par clip-path :
- État initial : `clip-path: polygon(40% 25%, 60% 25%, 60% 75%, 40% 75%)`
- Animation : chaque point interpole vers `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`
- Formule d'interpolation (via `gsap.utils.interpolate`) :
  ```
  polygon(
    interpolate(40, 0, progress)%  interpolate(25, 0, progress)%,
    interpolate(60, 100, progress)% interpolate(25, 0, progress)%,
    interpolate(60, 100, progress)% interpolate(75, 100, progress)%,
    interpolate(40, 0, progress)%  interpolate(75, 100, progress)%
  )
  ```
- Scale simultané de 1 → 1.125 puis continue vers 1.25
- Trigger : viewport 1 → viewport 2

**Image 3** (projet 3) — révélée par clip-path (point central) :
- État initial : `clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)`
- CSS initial scale : `transform: scale(2.9); transform-origin: top right`
- Animation clip-path : chaque point interpole vers plein écran
  ```
  polygon(
    interpolate(50, 0, progress)%  interpolate(50, 0, progress)%,
    interpolate(50, 100, progress)% interpolate(50, 0, progress)%,
    interpolate(50, 100, progress)% interpolate(50, 100, progress)%,
    interpolate(50, 0, progress)%  interpolate(50, 100, progress)%
  )
  ```
- Scale simultané de 2.9 → 1 (dé-zoom)
- Trigger : viewport 3 → viewport 4

## Layout : overlay cinématique sur chaque image

Chaque image de projet affiche ses infos **en superposition** (overlay). Les infos apparaissent avec une animation propre (fade-in + translate-y) une fois que l'image est suffisamment révélée (progress > 0.7 environ).

### Infos à afficher par projet

```typescript
const projects = [
  {
    number: "01",
    title: "E-commerce Premium",
    subtitle: "Refonte e-commerce orientée conversion",
    category: "E-commerce",
    metric: "+40",
    metricUnit: "%",
    metricLabel: "conversion",
    image: "/images/portfolio/project-1.webp",
  },
  {
    number: "02",
    title: "Formation Vidéaste",
    subtitle: "Plateforme e-learning sur-mesure",
    category: "Plateforme",
    metric: "10k",
    metricUnit: "+",
    metricLabel: "utilisateurs actifs",
    image: "/images/portfolio/project-2.webp",
  },
  {
    number: "03",
    title: "Opendoor Serrurerie",
    subtitle: "Site vitrine serrurier avec conversion appel",
    category: "Site vitrine",
    metric: "x3",
    metricUnit: "",
    metricLabel: "appels reçus par mois",
    image: "/images/portfolio/project-3.png",
  },
];
```

### Disposition overlay (sur chaque image plein écran)

- **Numéro géant** (`01`, `02`, `03`) : coin supérieur ou en arrière-plan, très grand, semi-transparent
- **Titre + sous-titre** : zone inférieure gauche, sur un gradient sombre `from-transparent to-[#050810]/80`
- **Métrique** : grande, terracotta `#C45C3B`, à côté ou au-dessus du titre
- **Catégorie** : petit tag uppercase tracking-wide

## Ce qui NE change PAS

1. **Le header de section** (eyebrow "Portfolio", titre "Nos derniers projets. Des résultats concrets.", barre signature) — reste identique, positionné avant la section pinnée.
2. **Le CTA "Voir nos projets"** — reste identique, positionné après la section pinnée.
3. **Les données `projects`** — même structure, mêmes images.
4. **Le fond** `#050810` et la grille de background subtile.

## Comportement mobile (< 1024px)

Sur mobile, **désactiver le pinning et les animations clip-path**. Remplacer par :
- Les 3 projets empilés verticalement (comme actuellement)
- Chaque projet apparaît avec un simple `fade-in + translate-y` au scroll (via Framer Motion `useInView` ou GSAP ScrollTrigger basique)
- Les infos en overlay sur l'image, avec gradient sombre en bas
- Pas de section pinnée, pas de clip-path

## Intégration GSAP + Lenis dans React

```typescript
// Pattern recommandé
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dans le composant :
const containerRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
  // Toutes les animations GSAP ici
  // ScrollTrigger.create({ ... })
  // gsap.to(".img-2", { ... })
}, { scope: containerRef }); // scope les sélecteurs au container
```

### Synchronisation Lenis

Lenis est déjà initialisé globalement dans le projet. Si besoin de synchroniser :
```typescript
// Lenis update → ScrollTrigger update
// Vérifier si déjà fait dans le layout global avant de dupliquer
```

## Critères de succès

1. Les 3 images se révèlent successivement au scroll avec l'effet clip-path
2. Les infos projet sont lisibles sur chaque image (contraste suffisant via gradient)
3. La transition entre images est fluide (scrub, pas de saut)
4. Le header et CTA restent intacts et visibles hors de la zone pinnée
5. Sur mobile : fallback simple et fluide, pas de pinning
6. Aucun conflit avec Framer Motion utilisé dans les autres sections
7. Le composant exporte toujours `export default function PortfolioPreview()`
8. TypeScript strict, pas de `any`

## ADN visuel Neurolia à respecter

- Couleur signature : `#C45C3B` (terracotta) — métrique, accents
- Fond : `#050810`
- Texte principal : `#F5F5F5`
- Texte secondaire : `#737373` / `#9A9A9A`
- Font display : `var(--font-display, 'Satoshi', sans-serif)`
- Radius : 0
- Espacement section : 160px desktop, 96px mobile
