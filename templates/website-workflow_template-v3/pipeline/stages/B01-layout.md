# Etape B1 : Layout (Header & Footer)

> **Phase B : Design / Vibe Coding** - Debut de la construction du site.

## Circuit d'Agents v4

**OBLIGATOIRE** : Chaque composant UI passe par le circuit d'agents.

```
1. AGENT Creative Director (opus-4.6)
   -> Lit le sitemap + project-dials.md (dials globaux) + constraints + visual-vocabulary
   -> DECIDE le layout, le style, la technique (si applicable)
   -> Produit : _preflight/[composant]-creative-direction.md

2. CLAUDE + frontend-design2 (charge via Read explicite de .claude/skills/frontend-design2/SKILL.md)
   -> Lit frontend-design2/SKILL.md + creative direction
   -> Code le composant en implementant les decisions du Creative Director
   -> Les dials GLOBAUX de project-dials.md sont actifs (via la direction creative)

3. AGENT Technical Validator (haiku)
   -> Verifie : tokens, a11y, responsive, anti-patterns, server/client
   -> Produit : pass/fail + corrections
```

> **Note** : Pour B01 (layout), les dials sont GLOBAUX car header/footer sont transversaux.

---

## Objectif

Creer les composants layout transversaux (Header, Footer) utilises sur toutes les pages.

## Input

| Fichier | Usage |
|---------|-------|
| `app/globals.css` | Design tokens (source unique) |
| `output/03-sitemap.md` | Navigation (liens menu) + CTA |
| `output/02-art-direction/project-dials.md` | Dials globaux |
| `output/02-art-direction/constraints.md` | Regles visuelles |

## Composants a Creer

### 1. Header

**Fichier** : `components/layout/header.tsx`

**Architecture** :
- header.tsx = Server Component (pas de "use client")
- mobile-menu.tsx = Client Component (useState pour toggle)

**Accessibilite** :
- aria-label sur nav
- aria-expanded sur hamburger
- aria-current="page" sur lien actif
- Focus visible

### 2. Footer

**Fichier** : `components/layout/footer.tsx`

Meme circuit. Footer = Server Component.

### 3. Root Layout

**Fichier** : `app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { [Font] } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'

const font = [Font]({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '[NOM] - [Tagline]',
  description: '[Description]',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={font.className}>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
```

## Server vs Client Components

| Composant | Type | Raison |
|-----------|------|--------|
| header.tsx | Server | Contenu statique, SEO |
| mobile-menu.tsx | Client | useState pour toggle |
| footer.tsx | Server | Contenu statique |
| layout.tsx | Server | Wrapper structural |

## Output

```
_preflight/
├── header-creative-direction.md
└── footer-creative-direction.md

components/layout/
├── header.tsx        (Server Component)
├── mobile-menu.tsx   (Client Component)
└── footer.tsx        (Server Component)

app/
└── layout.tsx        (mise a jour)
```

## Validation

- [ ] Direction creative produite pour chaque composant (Creative Director)
- [ ] Header responsive (desktop + mobile)
- [ ] Mobile menu fonctionnel
- [ ] Footer minimaliste
- [ ] Navigation correcte (liens depuis sitemap)
- [ ] CTA visible dans header
- [ ] Server/Client Components correctement separes
- [ ] Accessibilite : aria-labels, focus visible
- [ ] **Technical Validator** : pass sur chaque composant

## Prochaine Etape

-> `stages/B02-homepage.md`

---

**Version** : 4.0
**Phase** : B1 (Design / Vibe Coding)
**Dependances** : A6 (Design Tokens), A4 (Sitemap), A3 (project-dials, constraints)
**Agents** : Creative Director (opus-4.6), Technical Validator (haiku)
**Skill** : frontend-design2
**Produit pour** : B2 (Homepage), B3 (Pages)
