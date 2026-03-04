# Brief — Redesign page /portfolio

**Statut** : Validé, prêt à implémenter
**Priorité** : Haute
**Créé le** : 2026-02-14
**Référence visuelle** : `references/sites/portfolio/Portfolio-main/`

---

## Objectif

Redesigner complètement la page `/portfolio` qui est actuellement un squelette non fonctionnel (données dupliquées, placeholders vides, liens `#`). La transformer en une page de conversion immersive, inspirée directement du projet de référence Portfolio-main, adaptée à l'ADN Neurolia.

**KPI** : Signature de devis — le visiteur doit se dire "je veux travailler avec eux".

---

## Référence visuelle — Portfolio-main

### Ce qu'on adapte pour Neurolia

Le projet de référence (`references/sites/portfolio/Portfolio-main/`) est un portfolio développeur avec des interactions fortes. Voici les patterns qu'on transpose dans l'univers Neurolia :

| Pattern référence | Fichier source | Adaptation Neurolia |
|---|---|---|
| **Layout image + détails côte à côte** | `Works.jsx` L65 | Image à gauche avec tilt, infos à droite (desktop). Alternance gauche/droite par projet. |
| **Tilt 3D sur les images** | `Works.jsx` L66-74 (`react-parallax-tilt`) | Tilt subtil (max 10°, pas de glare), cadre avec l'esthétique sobre Neurolia. |
| **Boutons mouse-tracking** | `Works.jsx` L77-120 (spring physics) | Appliquer sur le CTA "Voir le projet" — le bouton suit le curseur avec un spring Framer Motion. |
| **Stack vertical de cards** | `Works.jsx` L181-185 | Pas de grille — stack vertical avec espacement généreux entre chaque projet. |
| **Structure de données riche** | `constants.js` L171-322 | Reprendre : name, description, features (bullet list), tags, liens live. Ajouter : metric, metricLabel, client, category (spécifique Neurolia). |
| **Stagger animations** | `utils/motion.js` (fadeIn) | Fade-in au scroll avec stagger, adapté via Framer Motion `useInView`. |

### Ce qu'on ne prend PAS

- Pas de Three.js / canvas 3D (stars, Earth) — hors scope
- Pas de gradients multicolores sur les tags — on utilise le style Neurolia monochrome
- Pas de rounded-2xl — radius 0 partout (ADN Neurolia)
- Pas d'icônes GitHub — on est une agence, pas un dev (un seul CTA : "Voir le projet" ou "Site live")
- Pas de rocket intro animation — hors scope

---

## État actuel (ce qu'on remplace)

### Fichiers concernés

| Fichier | État | Action |
|---------|------|--------|
| `app/portfolio/page.tsx` | Squelette fonctionnel | Simplifier (retirer CaseStudy) |
| `components/pages/portfolio/hero.tsx` | Titre + sous-titre, vide | Refaire |
| `components/pages/portfolio/projects-grid.tsx` | Grille 3 colonnes, données dupliquées | Refaire complètement |
| `components/pages/portfolio/case-study.tsx` | Placeholders vides | **Supprimer** |
| `components/sections/cta-final.tsx` | Partagé landing — OK | Conserver tel quel |

### Problèmes actuels

1. **Données fausses** — 6 projets affichés dont 3 sont des copies (même image, mêmes tags)
2. **Case study fictive** — "Cabinet de conseil RH" avec des visuels vides → on supprime
3. **Aucun lien fonctionnel** — tous les `href` sont `#`
4. **Hero plat** — juste un titre centré sans personnalité
5. **Grille générique** — aucun élément de différenciation, zéro interaction

---

## Structure cible

```
PortfolioHero        → Titre éditorial + lead + barre signature
ProjectsShowcase     → Cards projets full-width avec tilt + mouse-tracking
CtaFinal             → Partagé (inchangé)
```

### Page layout (`app/portfolio/page.tsx`)

```tsx
<PortfolioHero />
<ProjectsShowcase />
<CtaFinal />
```

Pas de CaseStudy — les métriques sont déjà intégrées dans chaque card projet.

---

## Dépendance technique

**`react-parallax-tilt`** n'est pas installé. Il faut l'ajouter :

```bash
npm install react-parallax-tilt
```

Cette dépendance est utilisée par le projet de référence (`Works.jsx` L3) pour l'effet tilt 3D sur les images.

---

## S00 — Data layer

**Fichier à créer** : `lib/data/projects.ts`
**Skill** : Aucun — simple écriture de fichier

### Type

```ts
export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "e-commerce" | "site-vitrine" | "plateforme" | "automatisation";
  year: string;
  image: string;
  description: string;
  features: string[];
  tags: string[];
  metric?: string;       // optionnel — certains projets n'ont pas de KPI mesurable
  metricLabel?: string;
  liveUrl?: string;
};
```

### 3 projets réels

> **Source de vérité** : les fiches projet dans `input/portfolio/*/` contiennent les données clients vérifiées.
> Les descriptions ci-dessous sont des versions portfolio (orientées résultats, pas techniques).

```ts
export const projects: Project[] = [
  {
    slug: "fog-ecommerce",
    title: "E-commerce B2B/B2C",
    client: "Future of Grow",
    category: "e-commerce",
    year: "2025",
    image: "/portfolio/futureofgrow/screenshots/project-1.webp",
    description: "Replatforming complet d'un site e-commerce agritech (éclairage LED horticole). Site multilingue FR/EN/DE avec pricing multi-segments B2B/B2C, dashboard client et automatisations backend.",
    features: [
      "Catalogue Shopify avec pricing B2B dégressif",
      "Dashboard client B2B/B2C complet",
      "Automatisations n8n + Brevo + Odoo",
      "Internationalisation trilingue (FR/EN/DE)",
    ],
    tags: ["Next.js", "Shopify", "Automatisation", "E-commerce"],
    metric: "-80%",
    metricLabel: "travail manuel (automations)",
    liveUrl: "https://futureofgrow.com",
  },
  {
    slug: "pixl-landing",
    title: "Landing Page Premium",
    client: "Pixel Academy",
    category: "site-vitrine",
    year: "2025",
    image: "/portfolio/pixel-academy/screenshots/project-2.webp",
    description: "Landing page de qualification pour une formation vidéo intensive. Esthétique cinéma/studio avec conversion unique vers prise de rendez-vous Calendly.",
    features: [
      "Direction artistique cinéma (dark mode, accent rouge)",
      "Animations au scroll et timecode animé",
      "Intégration Calendly pour réservation",
      "Copy orientée conversion (levée d'objections, badges preuve)",
    ],
    tags: ["HTML/CSS", "UX Copy", "Conversion", "Calendly"],
    // Pas de métrique business pour ce projet — affiché sans bloc métrique
  },
  {
    slug: "opendoor-vitrine",
    title: "Opendoor Serrurerie",
    client: "Opendoor",
    category: "site-vitrine",
    year: "2026",
    image: "/portfolio/opendoor/screenshots/project-3.png",
    description: "Site vitrine haute conversion pour un serrurier à Narbonne. Optimisé pour le référencement local et la génération d'appels téléphoniques d'urgence.",
    features: [
      "SEO local (JSON-LD LocalBusiness, mots-clés géo)",
      "Click-to-call intégré sur mobile",
      "5 pages (accueil, services, approche, zone, contact)",
      "Pipeline Neurolia complet (A01-A06 + B01-B04)",
    ],
    tags: ["Next.js", "SEO Local", "Conversion", "Performance"],
    metric: "x3",
    metricLabel: "appels reçus/mois",
  },
];
```

### Images disponibles

Chaque projet a 2 images dans `input/portfolio/[slug]/screenshots/` :
- `project-*.webp` ou `.png` — capture principale (utilisée dans les cards)
- `1.png` — capture secondaire (disponible si besoin d'une vue supplémentaire)

Les mêmes fichiers sont copiés dans `public/portfolio/` pour le serving Next.js.

---

## S01 — PortfolioHero

**Fichier** : `components/pages/portfolio/hero.tsx`
**Skill** : `/frontend-design`

### Direction

Hero éditorial sobre, cohérent avec les autres pages du site (services, contact). Pas de hero monumental — la page portfolio est une page de preuve.

### Contenu

```
Eyebrow :  "Portfolio"
Titre :    "Nos derniers projets." (gris) + "Des résultats concrets." (blanc)
Lead :     "Chaque projet est conçu pour générer des résultats mesurables. Pas de joli site sans impact — du design au service de la conversion."
```

### Spécifications

- Layout : aligné à gauche avec `signature-bar` (barre 4px terracotta)
- Reprendre le pattern exact du header de `portfolio-preview.tsx` (lignes ~420-459) : barre signature, eyebrow, titre bicolore
- Typo titre : `font-display` (Satoshi), taille `--font-size-h2`, `tracking-[-0.02em]`
- Lead : `text-base md:text-lg`, couleur `text-muted-fg` (`#A3A3A3`), `max-w-2xl`
- Espacement : `section-padding` (160px desktop / 96px mobile)
- Animation : fade-in via `AnimatedSection`
- Background : `--background` (`#050810`)

---

## S02 — ProjectsShowcase

**Fichier** : `components/pages/portfolio/projects-grid.tsx` (garder le nom existant, renommer l'export)
**Skill** : `/frontend-design`
**Dépendance** : S00 (données), `react-parallax-tilt` (installé)

C'est le stage principal. Il reprend les patterns visuels de la référence.

### Layout global

**Stack vertical** de project cards pleine largeur (comme `Works.jsx` L181), pas de grille multi-colonnes. Espacement généreux entre chaque carte (`gap-16 md:gap-24`).

### Layout d'une card projet (desktop ≥ 1024px)

Inspiré de `Works.jsx` L65 : image et détails côte à côte.

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   ┌─────────────────────┐   Catégorie (eyebrow)         │
│   │                     │   Titre (h3, blanc, bold)      │
│   │   IMAGE PROJET      │   Client • Année               │
│   │   (tilt 3D)         │                                │
│   │   aspect 16/10      │   Description (text-secondary) │
│   │                     │                                │
│   └─────────────────────┘   ✓ Feature 1                  │
│                             ✓ Feature 2                  │
│   ┌─────────────┐          ✓ Feature 3                  │
│   │ MÉTRIQUE    │          ✓ Feature 4                  │
│   │ +40%        │                                        │
│   │ conversion  │          [tag] [tag] [tag] [tag]       │
│   └─────────────┘                                        │
│                             [Voir le projet →]           │
│                             (mouse-tracking button)      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Alternance** : les projets pairs inversent l'ordre (détails à gauche, image à droite).

### Layout mobile (< 1024px)

Stack vertical simple : image en haut, contenu en dessous. Pas de tilt sur mobile (`matchMedia` ou condition responsive).

### Tilt 3D sur l'image

Adapté de `Works.jsx` L66-74 (`react-parallax-tilt`) :

```tsx
<Tilt
  tiltMaxAngleX={10}
  tiltMaxAngleY={10}
  scale={1}
  transitionSpeed={300}
  gyroscope={false}
>
  <div className="relative overflow-hidden">
    <Image
      src={project.image}
      alt={project.title}
      width={800}
      height={500}
      className="w-full h-full object-cover aspect-[16/10]"
    />
  </div>
</Tilt>
```

Différences vs référence :
- **Max angle réduit** : 10° au lieu de 45° (plus subtil, plus agence)
- **Pas de glare** : on n'active pas l'option glare
- **Pas de scale** : `scale={1}` (on reste sobre)
- **Radius 0** : pas de `rounded-2xl` (ADN Neurolia)

### Bouton mouse-tracking

Adapté de `Works.jsx` L77-120 : le CTA "Voir le projet" suit le curseur avec un spring Framer Motion.

```tsx
const ref = React.useRef<HTMLDivElement>(null);
const [position, setPosition] = React.useState({ x: 0, y: 0 });

const onMouseMove = (e: React.MouseEvent) => {
  if (!ref.current) return;
  const { width, height, left, top } = ref.current.getBoundingClientRect();
  setPosition({
    x: e.clientX - (left + width / 2),
    y: e.clientY - (top + height / 2),
  });
};

const onMouseLeave = () => setPosition({ x: 0, y: 0 });

// Dans le JSX :
<motion.div
  ref={ref}
  onMouseMove={onMouseMove}
  onMouseLeave={onMouseLeave}
  animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
  transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
>
  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
     className="cta-outline-btn inline-flex items-center gap-2">
    Voir le projet
    <ArrowUpRight className="w-4 h-4" />
  </a>
</motion.div>
```

Différences vs référence :
- **Un seul bouton** : "Voir le projet" (pas de GitHub)
- **Mouvement atténué** : `position * 0.3` pour un effet subtil
- **Style Neurolia** : `cta-outline-btn` au lieu du style pill de la référence
- **Desktop only** : pas de mouse-tracking sur mobile (pas de hover)

### Bloc métrique (conditionnel)

Sous l'image, un bloc dédié avec le chiffre clé du projet — **affiché uniquement si `metric` existe** :

```
-80%
travail manuel
```

- Chiffre : `text-4xl md:text-5xl font-black` + classe `number-accent` (gradient terracotta)
- Label : `text-xs uppercase tracking-[0.2em] text-muted-fg`
- Si pas de métrique (ex: Pixel Academy) : le bloc n'est pas rendu, l'image prend toute la largeur de sa colonne

### Spécifications visuelles des cards

| Élément | Spécification |
|---------|---------------|
| Card container | `border border-[var(--border)]` + `bg-[var(--muted)]` (pas d'ombre) |
| Padding card | `p-6 md:p-10` |
| Image | `aspect-[16/10]`, `object-cover`, radius 0 |
| Catégorie eyebrow | `text-[0.625rem] tracking-[0.3em] uppercase text-[var(--primary)]` |
| Titre | `text-xl md:text-2xl font-bold text-[var(--foreground)]` font-display |
| Client + année | `text-sm text-subtle-fg` (`#737373`) |
| Description | `text-base text-[var(--text-secondary)]` (`#D4D4D4`), `leading-relaxed` |
| Features list | `text-sm text-[var(--text-secondary)]`, marqueur terracotta `●` |
| Tags | `badge-secondary` (classe existante) |
| CTA | `cta-outline-btn` (classe existante) |
| Hover card | `hover-lift` (translateY -4px) + `border-color` transition vers `rgba(196,92,59,0.2)` |

### Animations

- Cards : fade-in + translateY(20px → 0) au scroll, stagger `delay: index * 0.2`
- Via Framer Motion `useInView` + `motion.div` (pas GSAP — garder GSAP pour le portfolio-preview de la landing)
- `transition: { duration: 0.6, ease: "easeOut" }`
- `prefers-reduced-motion` : pas d'animation

---

## S03 — Page assembly + cleanup

**Fichier** : `app/portfolio/page.tsx`
**Skill** : Aucun — simple modification d'imports

### Actions

1. Retirer l'import de `CaseStudy`
2. Supprimer `<CaseStudy />` du JSX
3. Vérifier que les imports de `PortfolioHero` et `ProjectsShowcase` (nouveau nom d'export) sont corrects
4. S'assurer que `CtaFinal` reste en dernière position
5. Optionnel : supprimer le fichier `components/pages/portfolio/case-study.tsx` (ou le garder mort pour éviter les erreurs git)

### Layout final

```tsx
import PortfolioHero from "@/components/pages/portfolio/hero";
import ProjectsShowcase from "@/components/pages/portfolio/projects-grid";
import CtaFinal from "@/components/sections/cta-final";

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <ProjectsShowcase />
      <CtaFinal />
    </>
  );
}
```

---

## S04 — Vérification visuelle

**Skill** : Aucun — vérification manuelle
**Prerequis** : S00 + S01 + S02 + S03 terminés

### Checklist

- [ ] `npm run dev` compile sans erreur
- [ ] Desktop (1440px) : layout image+détails côte à côte, alternance gauche/droite
- [ ] Desktop : tilt 3D visible sur hover des images
- [ ] Desktop : mouse-tracking actif sur les CTA "Voir le projet"
- [ ] Mobile (375px) : stack vertical propre, pas de layout break
- [ ] Mobile : pas de tilt, pas de mouse-tracking
- [ ] 3 projets distincts avec des images différentes
- [ ] Aucun placeholder ("Visuel projet", lien `#`, données dupliquées)
- [ ] Métriques visibles et lisibles (le visiteur voit les résultats en < 3s)
- [ ] Touch targets 44px+ sur mobile
- [ ] Espacement 160px desktop entre sections
- [ ] Barre signature terracotta 4px présente dans le hero
- [ ] Hover : lift + glow subtil sur les cards, pas de jank
- [ ] Cohérence avec les autres pages (services, landing) — mêmes patterns typo/couleur
- [ ] Aucune régression sur la landing page
- [ ] Lien "Voir le projet" ouvre le bon URL dans un nouvel onglet (quand `liveUrl` existe)

---

## Contraintes ADN Neurolia (non-négociables)

| Règle | Valeur |
|-------|--------|
| Couleur signature | Terracotta `#C45C3B` — 5-10% de la surface |
| Radius | **0 partout** sauf inputs (2px) |
| Ombres au repos | Aucune (`box-shadow: none`) |
| Hover | `translateY(-4px)` + glow subtil, jamais `scale` seul |
| Transitions | 300ms ease-out, translate only |
| Espacement sections | 160px desktop / 96px mobile (`section-padding`) |
| Background | `#050810` (--background) |
| Font display | Satoshi pour titres |
| Font body | Inter pour texte courant |
| Barre signature | 4px terracotta verticale sur les h2 |

---

## Tokens et classes existantes à réutiliser

Les classes suivantes existent déjà dans `globals.css` — **les utiliser au lieu de réinventer** :

| Classe | Usage |
|--------|-------|
| `section-padding` | Espacement vertical sections |
| `container-custom` | Container centré avec padding responsive |
| `signature-bar` | Barre 4px terracotta sur h2 |
| `card-base` / `card-hover` | Style de base cards |
| `hover-lift` / `hover-lift-glow` | Hover translateY + glow |
| `cta-outline-btn` | Bouton outline terracotta |
| `text-primary-fg` / `text-muted-fg` / `text-subtle-fg` | Hiérarchie texte |
| `badge-secondary` | Tags/badges |
| `transition-smooth` / `transition-color` | Transitions standard |
| `number-accent` | Chiffres avec gradient terracotta |

---

## Composants existants à réutiliser

| Composant | Fichier | Usage |
|-----------|---------|-------|
| `AnimatedSection` | `components/ui/animated-section.tsx` | Wrapper fade-in au scroll |
| `NrEmphasis` | `components/ui/nr-emphasis.tsx` | Emphase terracotta "éclat" |
| `CtaFinal` | `components/sections/cta-final.tsx` | CTA de fermeture (inchangé) |

---

## Ordre d'implémentation et skills

```
S00 — Créer lib/data/projects.ts                → Écriture directe (pas de skill)
      + npm install react-parallax-tilt

S01 — Refaire hero.tsx                           → /frontend-design
      Brief : "Refaire le hero de la page portfolio selon le brief S01"
      Fichier réf à lire : portfolio-preview.tsx (lignes 420-459 pour le pattern header)

S02 — Refaire projects-grid.tsx                  → /frontend-design
      Brief : "Refaire le showcase projets selon le brief S02"
      Fichiers réf à lire :
        - references/sites/portfolio/Portfolio-main/src/components/Works.jsx (layout + tilt + mouse-tracking)
        - lib/data/projects.ts (données)

S03 — Adapter page.tsx + cleanup                 → Écriture directe
      Retirer CaseStudy, vérifier imports

S04 — Vérification visuelle                      → Manuelle (npm run dev + checklist)
```

### Pourquoi pas /workflow-apex ?

Chaque stage est petit et ciblé (un seul fichier modifié). `/workflow-apex` est pertinent pour des tâches multi-fichiers complexes. Ici, `/frontend-design` suffit pour S01 et S02 qui sont les deux stages créatifs.

### Gestion du contexte

Chaque invocation de `/frontend-design` doit :
1. Lire CE brief (la section du stage concerné uniquement)
2. Lire le(s) fichier(s) de référence indiqué(s)
3. Lire le fichier cible actuel
4. Implémenter
5. Vérifier (`npm run dev`)

Ne PAS essayer de faire S01 + S02 dans la même session — chaque stage est un contexte séparé.

---

## Validation finale

La page est valide si tous les items de la checklist S04 sont cochés.
