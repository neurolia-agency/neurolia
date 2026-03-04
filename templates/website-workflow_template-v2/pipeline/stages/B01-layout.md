# Étape B1 : Layout (Header & Footer)

> **Phase B : Design / Vibe Coding** - Début de la construction du site.

## Workflow Agents + frontend-design2

**OBLIGATOIRE** : Chaque composant UI de cette étape passe par le circuit d'agents avant d'être codé.

### Circuit pour chaque composant

```
1. AGENT Context Assembler (haiku)
   → Lit le sitemap + project-dials.md (dials globaux)
   → Résout les tokens depuis globals.css
   → Résout les contraintes applicables depuis constraints.md
   → Produit : _preflight/[composant]-context.md

2. AGENT Aesthetic Director (sonnet)
   → Lit le context block
   → Produit une direction créative sensorielle
   → Recommande des techniques de l'arsenal si applicable (ex: navigation)
   → Produit : _preflight/[composant]-direction.md

3. CLAUDE + frontend-design2 (chargé via Read explicite de .claude/skills/frontend-design2/SKILL.md)
   → Lit .claude/skills/frontend-design2/SKILL.md (OBLIGATOIRE — chargement garanti)
   → Lit _preflight/[composant]-context.md + _preflight/[composant]-direction.md
   → Code le composant en suivant les règles du skill
   → Les dials GLOBAUX de project-dials.md sont actifs

4. AGENT Constraint Validator (haiku)
   → Vérifie le code contre constraints.md
   → Vérifie la cohérence avec project-dials.md
   → Produit : pass/fail + corrections
```

> **Note** : Pour B01 (layout), les dials sont GLOBAUX car header/footer sont transversaux.
> Pas d'override par section ici — utiliser les valeurs de `project-dials.md > Dials Globaux`.

---

## Objectif

Créer les composants layout transversaux (Header, Footer) utilisés sur toutes les pages.

## Input

| Fichier | Usage |
|---------|-------|
| `app/globals.css` | Design tokens (source unique) |
| `output/03-sitemap.md` | Navigation (liens menu) + CTA |
| `output/02-art-direction/project-dials.md` | Dials globaux pour frontend-design2 |
| `output/02-art-direction/constraints.md` | Règles visuelles à respecter |

## Composants à Créer

### 1. Header

**Fichier** : `components/layout/header.tsx`

**Context block attendu** (produit par Context Assembler) :
```markdown
## Header — Context Block

### Dials actifs
DESIGN_VARIANCE: [val globale] | MOTION_INTENSITY: [val globale] | VISUAL_DENSITY: [val globale]

### Contenu
- Navigation : [liens résolus depuis sitemap.md]
- CTA : [texte + destination]
- Logo : [texte ou asset]

### Tokens actifs
- --color-background, --color-foreground, --color-accent
- --font-sans, --transition-hover, --shadow-subtle
- --max-width-content

### Contraintes applicables
- constraints.md > ON FAIT > [#numéros pertinents pour navigation]
- constraints.md > ON NE FAIT PAS > [#numéros pertinents]

### Techniques envisageables (si MOTION > 4)
- Magnetic Button (CTAs)
- Mega Menu Reveal (si sous-navigation)
```

**Direction créative attendue** (produite par Aesthetic Director) :
```markdown
## Header — Direction Créative

[Paragraphe sensoriel décrivant l'intention : ex: "Le header doit être un souffle discret
— présent sans peser, comme un guide silencieux. L'accent n'apparaît que sur le CTA,
seul point d'ancrage chromatique dans un espace monochrome."]

Technique recommandée : [ex: aucune / Magnetic Button sur CTA si MOTION > 5]
```

**Architecture** :
- header.tsx = Server Component (pas de "use client")
- mobile-menu.tsx = Client Component (useState pour toggle)

**Accessibilité** :
- aria-label sur nav
- aria-expanded sur hamburger
- aria-current="page" sur lien actif
- Focus visible

### 2. Footer

**Fichier** : `components/layout/footer.tsx`

Même circuit d'agents. Footer = Server Component.

### 3. Root Layout

**Fichier** : `app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { [Font] } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { ThemeProvider } from '@/components/theme-provider'

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
        <ThemeProvider
          attribute="class"
          defaultTheme="[light/dark]"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
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
├── header-context.md
├── header-direction.md
├── footer-context.md
└── footer-direction.md

components/layout/
├── header.tsx        (Server Component)
├── mobile-menu.tsx   (Client Component)
└── footer.tsx        (Server Component)

app/
└── layout.tsx        (mise à jour)
```

## Validation

- [ ] **Agents** : Context block et direction créative produits pour chaque composant
- [ ] Header responsive (desktop + mobile)
- [ ] Mobile menu fonctionnel
- [ ] Footer minimaliste
- [ ] Navigation correcte (liens depuis sitemap)
- [ ] CTA visible dans header
- [ ] Server/Client Components correctement séparés
- [ ] Accessibilité : aria-labels, focus visible
- [ ] **Constraint Validator** : pass sur constraints.md
- [ ] **Dials respectés** : DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY cohérents avec project-dials.md

## Prochaine Étape

→ `stages/B02-homepage.md`

---

**Version** : 2.0
**Phase** : B1 (Design / Vibe Coding)
**Dépendances** : A6 (Design Tokens), A4 (Sitemap), A3 (project-dials, constraints)
**Agents** : Context Assembler (haiku), Aesthetic Director (sonnet), Constraint Validator (haiku)
**Skill** : frontend-design2
**Produit pour** : B2 (Homepage), B3 (Pages)
