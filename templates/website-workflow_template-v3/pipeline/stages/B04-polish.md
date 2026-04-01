# Etape B4 : Polish (Animations, Finitions, Coherence)

> **Phase B : Design / Vibe Coding** - Finalisation visuelle et coherence globale.

## Circuit d'Agents v4

Cette etape utilise le circuit de maniere ciblee. Contrairement a B02-B03, B04 est transversal.

```
SI ajout d'un nouveau composant visuel ->
  Creative Director (opus-4.6) -> Code + frontend-design2 -> Technical Validator (haiku)

SI correction/ajustement d'un composant existant ->
  Code direct avec frontend-design2 (Read explicite du SKILL.md) -> Technical Validator (haiku) seul
```

> **Regle** : Le polish ne doit JAMAIS changer l'intention emotionnelle d'une section.
> Si un ajustement modifie le feeling, il faut repasser par le Creative Director.

---

## Objectif

Harmoniser, peaufiner et optimiser le site dans sa globalite. Trois axes : coherence visuelle, animations/transitions, performance technique.

## Input

| Fichier | Usage |
|---------|-------|
| Tous les composants B01-B03 | Base a polir |
| `app/globals.css` | Design tokens (source unique) |
| `output/02-art-direction/constraints.md` | Regles visuelles |
| `output/02-art-direction/project-dials.md` | Dials globaux pour calibrer le polish |
| `output/02-art-direction/ui-kit.md` | Verification coherence composants |
| `output/02-art-direction/emotion-map.md` | Courbe emotionnelle a preserver |

---

## Axe 1 : Coherence Visuelle

### Audit transversal

Verifier sur TOUTES les pages :

- [ ] Espacement entre sections identique (var(--spacing-section))
- [ ] Padding conteneur uniforme (var(--spacing-container))
- [ ] Meme hierarchie H1 > H2 > H3 sur toutes les pages
- [ ] Pas de tailles de texte hardcodees
- [ ] Accent utilise avec parcimonie (max 1-2 elements par viewport)
- [ ] Backgrounds alternes de maniere coherente
- [ ] Boutons : uniquement les variantes de ui-kit.md
- [ ] Cards : 1 seul style (celui de ui-kit.md)
- [ ] Aucun composant custom non liste dans ui-kit.md

### Test "Est-ce [NOM_PROJET] ?"

Executer le test rapide de `constraints.md` sur chaque page. Score minimum : 7/8 par page.

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

### Calibrage selon les dials globaux

| MOTION_INTENSITY | Niveau de polish |
|------------------|-----------------|
| 1-3 | Fade-in sections uniquement, hover basiques |
| 4-6 | + Stagger sur listes, parallax leger, transitions de page |
| 7-8 | + Techniques de l'arsenal, scroll animations |
| 9-10 | + Animations complexes (morph, SVG drawing, particle effects) |

---

## Axe 3 : SEO & Performance

### Metadata par page

```tsx
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

### Images optimisees

```tsx
import Image from 'next/image'

<Image
  src="/image.webp"
  alt="[Description pertinente]"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Sitemap & robots.txt

```tsx
// app/sitemap.ts
export default function sitemap() {
  return [
    { url: '[URL]', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
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

## Validation

### Coherence
- [ ] Test "Est-ce [NOM_PROJET] ?" passe sur CHAQUE page (>= 7/8)
- [ ] Spacing uniforme verifie (audit transversal)
- [ ] Composants conformes a ui-kit.md
- [ ] Couleurs : aucune valeur hardcodee

### Animations
- [ ] Niveau d'animation coherent avec MOTION_INTENSITY globale
- [ ] Transitions utilisent les tokens CSS
- [ ] Pas de jank visuel (GPU accelerated)

### Performance
- [ ] Images optimisees (next/image, WebP, sizes)
- [ ] Fonts optimisees (next/font)
- [ ] Lazy loading composants lourds

### SEO
- [ ] Metadata unique sur toutes les pages
- [ ] Open Graph tags
- [ ] Sitemap.xml + robots.txt

### Accessibilite
- [ ] Focus visible sur tous les elements interactifs
- [ ] Contrastes WCAG AA
- [ ] Navigation clavier complete
- [ ] Touch targets >= 44px

### Technical Validator (pass final)
- [ ] Toutes les regles de constraints.md verifiees sur le site complet
- [ ] Anti-patterns fd2 : aucun detecte

## Prochaine Etape

-> `stages/B05-validate.md`

---

**Version** : 4.0
**Phase** : B4 (Design / Vibe Coding)
**Dependances** : B2 (Homepage), B3 (Pages), A3 (project-dials, constraints, ui-kit)
**Agents** : Technical Validator (haiku) en pass final, circuit complet si nouveau composant
**Skill** : frontend-design2
**Produit pour** : B5 (Validate)
