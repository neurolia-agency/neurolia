# Étape 07 : Polish (Animations & Finitions)

> **Phase B : Design / Vibe Coding** - Finalisation visuelle.

## Invocation frontend-design (optionnel)

Pour les ajustements visuels ou micro-interactions, utiliser le skill frontend-design :

```bash
/frontend-design
```

Cette étape est plus technique (animations, SEO). Utiliser frontend-design uniquement si des ajustements UI sont nécessaires.

---

## Objectif

Améliorer les détails visuels, animations et UX du site en utilisant les APIs Motion modernes (2025).

## Input

- Tous les composants créés aux étapes 04-06
- `app/globals.css` (design tokens)

---

## Bonnes Pratiques Animations 2025

### Motion (anciennement Framer Motion)

Motion est la librairie d'animation recommandée. Elle offre des **animations hardware accelerated** qui tournent sur le GPU, garantissant 60fps même sous charge CPU.

### APIs Modernes à Utiliser

| API | Usage | Avantage |
|-----|-------|----------|
| `useInView` | Détection viewport | Simple, performant |
| `scroll()` | Scroll animations | Hardware accelerated |
| `stagger()` | Animations séquentielles | Timing précis |
| `animate()` | Animations impératives | Contrôle total |

### Optimisation SSR (Next.js)

Pour éviter le CLS (Cumulative Layout Shift) pendant l'hydration, utiliser `optimizedAppearDataAttribute`:

```tsx
import { motion, optimizedAppearDataAttribute } from "framer-motion"

export function AnimatedSection({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      {...{ [optimizedAppearDataAttribute]: id }}
    >
      {children}
    </motion.section>
  )
}
```

**Règle:** Chaque élément animé au chargement doit avoir un `optimizedAppearDataAttribute` unique.

### Pattern Recommandé : useInView

```tsx
"use client"

import { useRef } from 'react'
import { useInView } from 'motion/react'

export function AnimatedSection({ children, className }: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,           // Ne déclenche qu'une fois
    margin: "-100px"      // Déclenche 100px avant d'entrer dans le viewport
  })

  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out"
      }}
    >
      {children}
    </section>
  )
}
```

### Hardware Accelerated Scroll

```tsx
"use client"

import { useEffect, useRef } from 'react'
import { animate, scroll } from 'motion'

export function ParallaxImage({ src, alt }: { src: string, alt: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Animation GPU-accelerated liée au scroll
    const animation = animate(
      ref.current,
      { y: [0, -50] },
      { ease: 'linear' }
    )

    // Lier au scroll
    scroll(animation, {
      target: ref.current,
      offset: ["start end", "end start"]
    })
  }, [])

  return (
    <div ref={ref} className="overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}
```

### Stagger Effect

```tsx
"use client"

import { useRef, useEffect } from 'react'
import { animate, stagger, useInView } from 'motion/react'

export function StaggeredList({ items }: { items: string[] }) {
  const ref = useRef<HTMLUListElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && ref.current) {
      animate(
        ref.current.querySelectorAll('li'),
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.1), duration: 0.5 }
      )
    }
  }, [isInView])

  return (
    <ul ref={ref}>
      {items.map((item, i) => (
        <li key={i} style={{ opacity: 0 }}>{item}</li>
      ))}
    </ul>
  )
}
```

---

## Composants Animation à Créer

### 1. AnimatedSection (wrapper universel)

**Fichier** : `components/ui/animated-section.tsx`

```tsx
"use client"

import { useRef, type ReactNode } from 'react'
import { useInView } from 'motion/react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({
  children,
  className,
  delay = 0
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`
      }}
    >
      {children}
    </section>
  )
}
```

### 2. AnimatedElement (pour éléments individuels)

**Fichier** : `components/ui/animated-element.tsx`

```tsx
"use client"

import { useRef, type ReactNode, type ElementType } from 'react'
import { useInView } from 'motion/react'

interface AnimatedElementProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function AnimatedElement({
  children,
  as: Component = 'div',
  className,
  delay = 0,
  direction = 'up'
}: AnimatedElementProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const transforms = {
    up: "translateY(30px)",
    down: "translateY(-30px)",
    left: "translateX(30px)",
    right: "translateX(-30px)"
  }

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate(0)" : transforms[direction],
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`
      }}
    >
      {children}
    </Component>
  )
}
```

### 3. CounterAnimation (pour stats)

**Fichier** : `components/ui/counter.tsx`

```tsx
"use client"

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'motion/react'

interface CounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function Counter({
  target,
  duration = 2000,
  suffix = '',
  prefix = '',
  className
}: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
```

---

## Checklist Polish

### Animations

#### Scroll Reveal
- [ ] Sections : Fade-in + translateY au scroll via `AnimatedSection`
- [ ] Cards services : Stagger effect avec `stagger(0.1)`
- [ ] Images portfolio : Parallax subtil via `scroll()`
- [ ] Stats : Counter animation via `Counter` component

#### Micro-interactions
- [ ] Boutons : `hover:scale-[1.02]` + `active:scale-[0.98]`
- [ ] Links : Underline animation CSS
- [ ] Cards : `hover:-translate-y-1` + `hover:shadow-lg`
- [ ] Images : `hover:scale-105` avec overflow-hidden

#### Page Load
- [ ] Hero : Stagger animation sur H1, baseline, CTA
- [ ] Header : Fade-in rapide (0.3s)

---

### États Interactifs

#### Boutons
```css
.btn-primary {
  @apply transition-all duration-200;
  @apply hover:scale-[1.02] hover:shadow-md;
  @apply active:scale-[0.98];
  @apply focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2;
  @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100;
}
```

#### Links
```css
.animated-link {
  @apply relative;
}
.animated-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-current;
  @apply transition-all duration-300;
}
.animated-link:hover::after {
  @apply w-full;
}
```

#### Cards
```css
.card-hover {
  @apply transition-all duration-300;
  @apply hover:-translate-y-1 hover:shadow-lg;
}
```

---

### Accessibilité Animations

#### prefers-reduced-motion (OBLIGATOIRE)

```css
/* Dans app/globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### Hook useReducedMotion

```tsx
"use client"

import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return reducedMotion
}
```

```tsx
// Usage dans un composant
const reducedMotion = useReducedMotion()

return (
  <div style={{
    transition: reducedMotion ? 'none' : 'transform 0.3s ease'
  }}>
    {/* ... */}
  </div>
)
```

---

### Responsive Fixes

#### Desktop (>1024px)
- [ ] Max-width containers (max-w-7xl)
- [ ] Grid layouts 3-4 colonnes
- [ ] Whitespace généreux (section-padding = py-24)

#### Tablet (768-1024px)
- [ ] Navigation hamburger visible
- [ ] Grids 2 colonnes
- [ ] Section padding réduit (py-16)

#### Mobile (<768px)
- [ ] Stack vertical complet
- [ ] Touch targets 44px minimum
- [ ] H1 réduit (text-5xl → text-4xl si besoin)
- [ ] Padding horizontal réduit (px-4)

---

### Performance Animations

#### Règles GPU
Animer UNIQUEMENT ces propriétés (GPU-accelerated) :
- `opacity`
- `transform` (translate, scale, rotate)
- `filter` (blur, etc.)
- `clip-path`

**ÉVITER** d'animer :
- `width`, `height`
- `margin`, `padding`
- `top`, `left`, `right`, `bottom`
- `background-color` (sauf transitions courtes)

#### will-change
```css
/* Uniquement sur éléments qui seront animés */
.will-animate {
  will-change: transform, opacity;
}
```

---

### SEO & Meta

- [ ] Favicon (favicon.ico + apple-touch-icon)
- [ ] Meta OG tags dans chaque page
- [ ] Sitemap.xml généré
- [ ] Robots.txt configuré
- [ ] 404 page custom

---

## Output

```
components/ui/
├── animated-section.tsx     (Client Component)
├── animated-element.tsx     (Client Component)
├── counter.tsx              (Client Component)
└── index.ts                 (exports)

app/
├── globals.css              (+ prefers-reduced-motion)
├── not-found.tsx            (page 404)
├── sitemap.ts               (sitemap dynamique)
└── robots.ts                (robots.txt)

public/
├── favicon.ico
└── apple-touch-icon.png
```

---

## Fichiers à Créer/Modifier

### sitemap.ts (génération dynamique)

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://neurolia.fr'

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.9 },
  ]
}
```

### robots.ts

```tsx
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://neurolia.fr/sitemap.xml',
  }
}
```

### not-found.tsx

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-8">Page introuvable</p>
        <Link href="/" className="btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </section>
  )
}
```

---

## Validation

- [ ] Animations fluides 60fps (vérifier avec DevTools)
- [ ] `prefers-reduced-motion` respecté
- [ ] États hover/focus sur tous les éléments interactifs
- [ ] Scroll animations via `useInView` (pas IntersectionObserver manuel)
- [ ] Counter animations sur stats
- [ ] Skip link fonctionnel (accessibilité)
- [ ] Focus visible sur tous les éléments (focus-visible:ring)
- [ ] Responsive vérifié sur 3 breakpoints
- [ ] Sitemap et robots.txt générés
- [ ] Page 404 custom

---

## Prochaine Étape

→ `stages/08-validate.md`
