# Étape 04 : Layout (Header & Footer)

> **Phase B : Design / Vibe Coding** - Cette étape démarre la phase de construction du site avec `frontend-design`.

## Invocation frontend-design

**OBLIGATOIRE** : Pour chaque composant UI de cette étape, utiliser le skill frontend-design :

```bash
/frontend-design
```

Le skill sera invoqué avec le brief du composant (voir sections "Prompt frontend-design" ci-dessous).

**Workflow vibe coding** :
1. Invoquer `/frontend-design` avec le brief du composant
2. Réviser le résultat visuellement
3. Itérer jusqu'à satisfaction (`/frontend-design` à nouveau si besoin)
4. Passer au composant suivant

---

## Objectif

Créer les composants layout transversaux (Header, Footer) utilisés sur toutes les pages.

## Input

| Fichier | Usage |
|---------|-------|
| `app/globals.css` | Design tokens (source unique) |
| `output/03-sitemap.md` | Navigation (liens menu) + CTA principal |

⚠️ **NE PAS LIRE** `output/01-brand/positioning.md` directement.
Le CTA principal est disponible dans `output/03-sitemap.md > Navigation > CTA`.

---

## Setup ThemeProvider

Dans `app/layout.tsx`, wrapper le contenu avec ThemeProvider:

```tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Important:** `suppressHydrationWarning` sur `<html>` évite les erreurs de mismatch hydration avec next-themes.

**Créer le composant** `components/theme-provider.tsx`:

```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

---

## Bonnes Pratiques Next.js 16 (2025)

### Server Components vs Client Components

Next.js 16 utilise les React Server Components par défaut. Voici la répartition recommandée :

| Composant | Type | Raison |
|-----------|------|--------|
| `header.tsx` | **Server** | Contenu statique, bon pour SEO |
| `mobile-menu.tsx` | **Client** | `useState` pour toggle open/close |
| `footer.tsx` | **Server** | Contenu statique |
| `layout.tsx` | **Server** | Wrapper structural |

### Pattern de Composition

```tsx
// header.tsx (Server Component - pas de "use client")
import MobileMenu from './mobile-menu' // Client Component

export default function Header() {
  return (
    <header>
      <nav className="hidden md:flex">
        {/* Navigation desktop - Server rendered */}
      </nav>
      <MobileMenu /> {/* Client Component pour interactivité */}
    </header>
  )
}
```

```tsx
// mobile-menu.tsx (Client Component)
"use client"

import { useState } from 'react'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  // ...
}
```

---

## Wireframe Layout (Brief pour frontend-design)

### Header

```markdown
## Header - Wireframe

**Type composant** : Server Component (+ Client pour mobile menu)
**Fichier** : components/layout/header.tsx

### Structure Desktop (>768px)

┌─────────────────────────────────────────────────────────────┐
│  NEUROLIA         Accueil  Services  Portfolio  À propos   │
│  (logo texte)                                    [CTA btn]  │
└─────────────────────────────────────────────────────────────┘

### Structure Mobile (<768px)

┌─────────────────────────────────────────────────────────────┐
│  NEUROLIA                                        [≡]        │
└─────────────────────────────────────────────────────────────┘

### Éléments

| Élément | Source | Comportement |
|---------|--------|--------------|
| Logo | Texte "Neurolia" | Link → / |
| Nav links | sitemap.md > Navigation | hover: text-primary |
| CTA | sitemap.md > Navigation > CTA | "Discuter de votre projet" → /contact |
| Hamburger | - | Toggle mobile menu |

### États

- **Scroll** : Header sticky, légère ombre au scroll
- **Mobile menu** : Slide-in depuis la droite, overlay fond
- **Current page** : Lien actif en text-primary

### Accessibilité

- `aria-label="Navigation principale"` sur nav
- `aria-expanded` sur hamburger
- `aria-current="page"` sur lien actif
- Focus visible sur tous les éléments
```

### Footer

```markdown
## Footer - Wireframe

**Type composant** : Server Component
**Fichier** : components/layout/footer.tsx

### Structure

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  NEUROLIA                         Navigation                │
│  Agence design web                Accueil                   │
│  & automatisation                 Services                  │
│                                   Portfolio                 │
│  contact@neurolia.fr               À propos                  │
│                                   Contact                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  © 2025 Neurolia. Tous droits réservés.                     │
└─────────────────────────────────────────────────────────────┘

### Éléments

| Élément | Source | Notes |
|---------|--------|-------|
| Logo + tagline | brand/about.md | Texte uniquement |
| Email | brand/about.md | Link mailto: |
| Navigation | sitemap.md | Même liens que header |
| Copyright | - | Année dynamique |

### Design

- Background: légèrement différent (bg-muted ou border-t)
- Pas de réseaux sociaux
- Whitespace généreux (py-16)
```

---

## Composants à Créer

### 1. Header

**Fichier** : `components/layout/header.tsx`

**Prompt frontend-design** :
```
Créer Header minimaliste pour Neurolia (Next.js 16)

Contexte :
- Navigation : /, /services, /portfolio, /about, /contact
- CTA : "Discuter de votre projet" → /contact
- Design tokens : app/globals.css (--primary, --background, etc.)

Architecture :
- header.tsx = Server Component (pas de "use client")
- mobile-menu.tsx = Client Component (useState pour toggle)

Consignes :
- Logo texte uniquement "Neurolia" (pas d'image)
- Navigation épurée, 4 liens + CTA
- Monochrome, accent au hover (text-primary)
- Mobile : hamburger menu avec overlay
- Sticky header avec ombre légère au scroll
- Ref design : eszterbial.com

Accessibilité :
- aria-label sur nav
- aria-expanded sur hamburger
- aria-current="page" sur lien actif
- Focus visible (focus-visible:ring-2)

Output :
- components/layout/header.tsx (Server Component)
- components/layout/mobile-menu.tsx (Client Component)
```

---

### 2. Footer

**Fichier** : `components/layout/footer.tsx`

**Prompt frontend-design** :
```
Créer Footer minimaliste pour Neurolia (Next.js 16)

Contexte :
- Liens : même navigation que header
- Contact : contact@neurolia.fr
- Tagline : "Agence design web & automatisation"

Architecture :
- footer.tsx = Server Component (pas de "use client")

Consignes :
- 2 colonnes (info gauche, nav droite)
- Whitespace généreux (py-16)
- Pas de réseaux sociaux
- Monochrome
- Border-top ou bg-muted pour séparation
- Copyright avec année dynamique
- Ref : eszterbial.com

Output : components/layout/footer.tsx
```

---

### 3. Root Layout (app/layout.tsx)

**Fichier** : `app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neurolia - Un business qui respire',
  description: 'Agence de design web et automatisation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
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

---

## Workflow

1. **Lire** `03-sitemap.md` pour la navigation
2. **Lire** `positioning.md` pour le CTA header
3. **Créer** `header.tsx` (Server Component)
4. **Créer** `mobile-menu.tsx` (Client Component)
5. **Créer** `footer.tsx` (Server Component)
6. **Mettre à jour** `app/layout.tsx` pour intégrer Header + Footer

---

## Output

```
components/layout/
├── header.tsx        (Server Component)
├── mobile-menu.tsx   (Client Component - "use client")
└── footer.tsx        (Server Component)

app/
└── layout.tsx        (mise à jour avec Header + Footer)
```

---

## Validation

- [ ] Header responsive (desktop + mobile)
- [ ] Mobile menu fonctionnel (toggle open/close)
- [ ] Footer minimaliste 2 colonnes
- [ ] Navigation correcte (liens depuis sitemap)
- [ ] CTA visible dans header
- [ ] **Server/Client Components** correctement séparés
- [ ] Accessibilité : aria-labels, focus visible
- [ ] Sticky header avec ombre au scroll

---

## Prochaine Étape

→ `stages/05-homepage.md`

---

**Version** : 1.1
**Phase** : B1 (Design / Vibe Coding)
**Dépendances** : A6 (02-Design), A4 (03-Structure)
**Produit pour** : B2 (05-Homepage), B3 (06-Pages)
