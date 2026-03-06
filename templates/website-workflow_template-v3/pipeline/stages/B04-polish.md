# Étape B4 : Polish (Animations, Finitions, Cohérence)

> **Phase B : Design / Vibe Coding** - Finalisation visuelle et cohérence globale.

## Workflow Agents + frontend-design2

**Cette étape utilise le circuit d'agents de manière ciblée.** Contrairement à B02-B03 (construction section par section), B04 est transversal : il corrige, harmonise et enrichit.

### Quand relancer le circuit agents

```
SI ajout d'une nouvelle micro-interaction ou d'un composant visuel →
  Context Assembler (haiku) → Aesthetic Director (opus-4.6) → Code + frontend-design2 → Constraint Validator (haiku)

SI correction/ajustement d'un composant existant →
  Code direct avec frontend-design2 (Read explicite du SKILL.md) → Constraint Validator (haiku) seul
```

> **Règle** : Le polish ne doit JAMAIS changer l'intention émotionnelle d'une section.
> Si un ajustement modifie le feeling, il faut repasser par l'Aesthetic Director.

---

## Objectif

Harmoniser, peaufiner et optimiser le site dans sa globalité. Trois axes : cohérence visuelle, animations/transitions, performance technique.

## Input

| Fichier | Usage |
|---------|-------|
| Tous les composants B01-B03 | Base à polir |
| `app/globals.css` | Design tokens (source unique) |
| `output/02-art-direction/constraints.md` | Règles visuelles |
| `output/02-art-direction/project-dials.md` | Dials globaux pour calibrer le polish |
| `output/02-art-direction/ui-kit.md` | Vérification cohérence composants |
| `output/02-art-direction/emotion-map.md` | Courbe émotionnelle à préserver |

---

## Axe 1 : Cohérence Visuelle

### Audit transversal

Vérifier sur TOUTES les pages :

```markdown
## Checklist Cohérence

### Spacing
- [ ] Espacement entre sections identique partout (var(--spacing-section))
- [ ] Padding conteneur uniforme (var(--spacing-container))
- [ ] Gaps entre éléments cohérents (var(--spacing-gap), var(--spacing-gap-tight))

### Typographie
- [ ] Même hiérarchie H1 > H2 > H3 sur toutes les pages
- [ ] Pas de tailles de texte hardcodées (tout vient de globals.css)
- [ ] Line-heights cohérents

### Couleurs
- [ ] Accent utilisé avec parcimonie (max 1-2 éléments par viewport)
- [ ] Backgrounds alternés de manière cohérente entre sections
- [ ] Pas de couleur orpheline (non déclarée dans globals.css)

### Composants
- [ ] Boutons : uniquement les variantes de ui-kit.md
- [ ] Cards : 1 seul style (celui de ui-kit.md)
- [ ] Inputs : style unifié partout
- [ ] Aucun composant "custom" non listé dans ui-kit.md
```

### Test "Est-ce [NOM_PROJET] ?"

Exécuter le test rapide de `constraints.md` sur **chaque page individuellement**. Score minimum : 7/8 par page.

---

## Axe 2 : Animations & Transitions

### Smooth Scroll (Lenis)

```tsx
// components/smooth-scroll-provider.tsx
"use client"

import { ReactLenis } from 'lenis/react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  )
}
```

### Pattern AnimatedSection (useInView)

```tsx
"use client"

import { useRef } from 'react'
import { useInView } from 'motion/react'

export function AnimatedSection({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity var(--transition-reveal), transform var(--transition-reveal)`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </section>
  )
}
```

> **Attention aux tokens** : Utiliser `var(--transition-reveal)`, `var(--easing-standard)`, etc.
> Pas de valeurs hardcodées dans les animations.

### Calibrage selon project-dials.md

| MOTION_INTENSITY | Niveau de polish |
|------------------|-----------------|
| 1-3 | Fade-in sections uniquement, hover basiques |
| 4-6 | + Stagger sur listes, parallax léger sur images, transitions de page |
| 7-8 | + Techniques de l'arsenal (Magnetic, Scramble, etc.), scroll animations |
| 9-10 | + Animations complexes (morph, SVG drawing, particle effects) |

> **Règle** : Ne JAMAIS dépasser le niveau correspondant au MOTION_INTENSITY du projet.
> Un site avec MOTION=3 ne doit pas avoir de parallax scroll.

### Stagger Pattern (hardware accelerated)

```tsx
"use client"

import { stagger, animate } from 'motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'

export function StaggerList({ children, selector }: { children: React.ReactNode; selector: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView && ref.current) {
      animate(
        `${selector}`,
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.1), duration: 0.4 }
      )
    }
  }, [isInView, selector])

  return <div ref={ref}>{children}</div>
}
```

### Techniques de l'Arsenal (si MOTION ≥ 5)

Vérifier dans `project-dials.md > Arsenal Créatif Sélectionné` les techniques retenues. Pour chaque technique P0/P1 non encore implémentée en B02-B03 :

1. Vérifier que la section cible est identifiée
2. Implémenter avec le circuit agents si c'est un nouveau composant
3. Valider avec le Constraint Validator

---

## Axe 3 : SEO & Performance

### Metadata par page

```tsx
// app/[page]/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '[Page] | [NOM]',
  description: '[Description unique pour cette page]',
  openGraph: {
    title: '[Page] | [NOM]',
    description: '[Description]',
    url: '[URL]/[page]',
  },
}
```

### Structured Data (JSON-LD)

```tsx
// app/layout.tsx — dans le <head>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "[LocalBusiness / Organization / ...]",
      "name": "[NOM]",
      "url": "[URL]",
      "logo": "[URL]/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "[TEL]",
        "email": "[EMAIL]",
        "contactType": "customer service"
      }
    })
  }}
/>
```

### Images optimisées

```tsx
import Image from 'next/image'

<Image
  src="/image.webp"
  alt="[Description pertinente, pas 'image de...']"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Lazy loading composants lourds

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <div className="animate-pulse bg-muted h-[400px] rounded-lg" />,
})
```

### Sitemap & robots.txt

```tsx
// app/sitemap.ts
export default function sitemap() {
  return [
    { url: '[URL]', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: '[URL]/services', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // ... toutes les pages
  ]
}

// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: '[URL]/sitemap.xml',
  }
}
```

---

## Output

```
app/
├── sitemap.ts
├── robots.ts
└── layout.tsx (JSON-LD ajouté)

components/
├── smooth-scroll-provider.tsx (si pas déjà créé en B01)
└── ui/
    └── animated-section.tsx (enrichi si nécessaire)
```

## Validation

### Cohérence
- [ ] Test "Est-ce [NOM_PROJET] ?" passé sur CHAQUE page (≥ 7/8)
- [ ] Spacing uniforme vérifié (audit transversal)
- [ ] Composants conformes à ui-kit.md (aucun pattern orphelin)
- [ ] Couleurs : aucune valeur hardcodée, tout vient de globals.css

### Animations
- [ ] Niveau d'animation cohérent avec MOTION_INTENSITY de project-dials.md
- [ ] Transitions utilisent les tokens CSS (var(--transition-*))
- [ ] Pas de jank visuel (GPU accelerated : transform/opacity uniquement)
- [ ] Techniques de l'arsenal implémentées selon priorité P0 → P1

### Performance
- [ ] Images optimisées (next/image, WebP, sizes)
- [ ] Fonts optimisées (next/font)
- [ ] Lazy loading composants lourds
- [ ] Pas de CLS (Cumulative Layout Shift)

### SEO
- [ ] Metadata unique sur toutes les pages
- [ ] Open Graph tags
- [ ] Structured data (JSON-LD)
- [ ] Sitemap.xml + robots.txt

### Accessibilité
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Contrastes WCAG AA (4.5:1 texte, 3:1 large)
- [ ] Navigation clavier complète
- [ ] Skip to content link
- [ ] Touch targets ≥ 44px

### Mobile
- [ ] Pas de scroll horizontal
- [ ] Forms utilisables au pouce
- [ ] Animations réduites si prefers-reduced-motion

### Constraint Validator (final pass)
- [ ] **Toutes les règles** de constraints.md vérifiées sur le site complet
- [ ] **Dials respectés** : aucune section ne dépasse ses limites VARIANCE/MOTION/DENSITY
- [ ] **Anti-patterns** de project-dials.md : aucun détecté

## Prochaine Étape

→ `stages/B05-validate.md`

---

**Version** : 2.0
**Phase** : B4 (Design / Vibe Coding)
**Dépendances** : B2 (Homepage), B3 (Pages), A3 (project-dials, constraints, ui-kit, emotion-map)
**Agents** : Constraint Validator (haiku) en pass final, circuit complet si nouveau composant
**Skill** : frontend-design2 (actif pour tout code UI)
**Produit pour** : B5 (Validate)
