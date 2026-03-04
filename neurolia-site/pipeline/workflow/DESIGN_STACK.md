# Stack Technique - Neurolia v2

## Technologies

| Catégorie | Technologie | Version | Usage |
|-----------|-------------|---------|-------|
| Framework | Next.js | 16.x | App Router, Server Components |
| Runtime | React | 19.x | UI Components |
| Language | TypeScript | 5.x | Typage statique |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Animations | motion | 12.x | Scroll reveal, transitions |
| Smooth Scroll | Lenis | Latest | Défilement fluide |
| Icons | Lucide React | Latest | Icônes minimalistes |
| Forms | react-hook-form + zod | 7.x / 3.x | Validation formulaires |
| Toasts | sonner | 1.x | Notifications |

## Configuration Existante

```
app/
├── globals.css          # Source de vérité design tokens
├── layout.tsx           # Layout avec Lenis + ThemeProvider
└── page.tsx             # Homepage

components/
├── ui/                  # Composants UI custom
├── layout/              # Header, Footer
├── sections/            # Sections homepage
└── smooth-scroll-provider.tsx
```

## Design Tokens

**Source unique** : `app/globals.css`

Les tokens sont définis via `@layer base` et accessibles via classes Tailwind.

## Composants Signature

### NrEmphasis — "L'Éclat"

Emphase textuelle sans gras. Une lueur terracotta circule dans le texte via `background-clip: text`.

- **Fichier** : `components/ui/nr-emphasis.tsx`
- **CSS** : `app/globals.css` (section "NEUROLIA EMPHASIS")
- **Technique** : gradient animé (`background-position`) clippé sur le texte
- **Variants** : `eclat` (défaut), `trace` (+ font Lexend), `marque` (+ barre verticale)
- **Usage** : 1-2 par section max, sur les bénéfices clés (3-6 mots inline)

```tsx
<NrEmphasis>texte mis en valeur</NrEmphasis>
```

## Commandes

```bash
npm run dev      # Serveur dev (localhost:3000)
npm run build    # Build production
npm run lint     # ESLint
```

## Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Motion Docs](https://motion.dev)
- [Lenis Docs](https://lenis.darkroom.engineering)

---

**Note** : Pour les contraintes design, voir `output/01.5-art-direction/constraints.md`
