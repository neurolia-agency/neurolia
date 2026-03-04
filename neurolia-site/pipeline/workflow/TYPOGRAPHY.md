# Typographie — Tailles appliquees

> Cartographie des tailles de typo reellement utilisees dans le code.
> Mise a jour : 2026-02-13

---

## Tokens CSS (globals.css `:root`)

### Variables declarees

| Token | Desktop (>=1024px) | Mobile (<1024px) | Petit mobile (<640px) |
|-------|-------------------|--------------------|----------------------|
| `--font-size-h1` | `6rem` (96px) | `clamp(2.5rem, 8vw, 4rem)` | `clamp(2rem, 7vw, 3rem)` |
| `--font-size-h2` | `4rem` (64px) | `clamp(2rem, 5vw, 3rem)` | `clamp(1.75rem, 5vw, 2.5rem)` |
| `--font-size-h3` | `2.25rem` (36px) | `clamp(1.5rem, 4vw, 2rem)` | `clamp(1.25rem, 4vw, 1.75rem)` |
| `--font-size-h4` | `2rem` (32px) | `clamp(1.25rem, 3vw, 1.75rem)` | — |
| `--font-size-h5` | `1.25rem` (20px) | — | — |
| `--font-size-lg` | `1.25rem` (20px) | — | — |
| `--font-size-base` | `1rem` (16px) | — | — |
| `--font-size-sm` | `0.875rem` (14px) | — | — |
| `--font-size-xs` | `0.75rem` (12px) | — | — |

### Root scaling proportionnel (desktop)

```css
html { font-size: clamp(16px, calc(11.07px + 0.361vw), 20px); }
```

- 1366px = 16px, 1920px = 18px, 2560px+ = 20px cap
- Tous les `rem` scalent automatiquement avec

---

## Tailles reellement utilisees dans les composants

> Les tokens CSS sont quasi-ignores. Presque tous les composants utilisent des `clamp()` inline.

### Niveau 1 — Hero H1

| Contexte | Classe | Plage | Font |
|----------|--------|-------|------|
| Landing hero | `text-[clamp(2rem,5.5vw,3.75rem)]` | 32px - 60px | Lexend 900 |
| Services hero | `text-[clamp(2rem,5.5vw,3.75rem)]` | 32px - 60px | Lexend 900 |
| Contact hero | `text-[clamp(2rem,5.5vw,3.75rem)]` | 32px - 60px | Lexend 900 |
| About hero (gros) | `text-[clamp(3rem,8vw,6rem)]` | 48px - 96px | Satoshi 900 |
| About hero (petit) | `text-[clamp(2rem,5vw,4rem)]` | 32px - 64px | Satoshi 900 |
| Portfolio hero | `text-[clamp(2rem,5.5vw,3.75rem)]` | 32px - 60px | — bold |

### Niveau 2 — Section H2

| Variante | Classe | Plage |
|----------|--------|-------|
| Standard (majorite) | `text-[clamp(1.75rem,4vw,2.5rem)]` | 28px - 40px |
| Compact | `text-[clamp(1.75rem,3.5vw,2.5rem)]` | 28px - 40px |

Fichiers : ServicesPreview, Process, PortfolioPreview, Testimonials, ContactMini, CtaFinal, Services FAQ, Services Process, Services Grid, Contact Coordinates, Contact FAQ

### Niveau 2b — Section Title Split (About)

| Ligne | Classe | Plage |
|-------|--------|-------|
| Ligne 1 (petite) | `text-[clamp(1.75rem,4vw,2.25rem)]` | 28px - 36px |
| Ligne 2 (grosse) | `text-[clamp(2rem,5vw,3rem)]` | 32px - 48px |

Fichiers : About Mission, About Stats, About Values

### Niveau 3 — Card Title / H3

| Variante | Classe | Plage |
|----------|--------|-------|
| Standard | `text-[clamp(1.25rem,3vw,1.75rem)]` | 20px - 28px |
| Compact card | `text-[clamp(1rem,2.5vw,1.25rem)]` | 16px - 20px |
| Portfolio case-study | `text-2xl` (Tailwind) | 24px fixe |
| Mobile menu links | `text-[clamp(1.75rem,6vw,2.5rem)]` | 28px - 40px |

Fichiers Standard : Services Grid cards, Services secondary cards, Services process steps, Services FAQ USPs
Fichiers Compact card : Services hero cards (3 colonnes)

### Niveau 4 — Stat Numbers

| Contexte | Classe | Plage |
|----------|--------|-------|
| About stats | `text-[clamp(2.5rem,6vw,3.5rem)]` | 40px - 56px |
| Services process | `text-[clamp(2.5rem,4vw,3.5rem)]` | 40px - 56px |
| Process ghost number | `text-[clamp(1.75rem,3vw,2.25rem)]` | 28px - 36px |
| FAQ number | `text-[clamp(1.5rem,2.5vw,2rem)]` | 24px - 32px |
| Portfolio case-study | `text-5xl` | 48px fixe |
| Testimonial rating | `text-4xl md:text-6xl lg:text-7xl` | 36px - 72px |

### Niveau 5 — Lead / Sous-titres

| Contexte | Classe | Taille |
|----------|--------|--------|
| CTA Final, Contact hero | `text-base md:text-lg` | 16px - 20px |
| About hero | `text-base md:text-lg` | 16px - 20px |
| About mission | `text-base md:text-lg` | 16px - 20px |
| Mission items | `text-lg md:text-xl` | 20px - 24px |

### Niveau 5b — Form Inputs / Placeholders

| Classe | Plage | Usage |
|--------|-------|-------|
| `text-[clamp(0.8rem,1.5vw,0.875rem)]` | 12.8px - 14px | Contact mini inputs + placeholders |

### Niveau 6 — Body

| Classe | Taille | Usage |
|--------|--------|-------|
| `text-base` | 16px | Paragraphes principaux, coordonnees |
| `text-sm` | 14px | Body secondaire (descriptions, features) |
| `text-sm md:text-base` | 14px - 16px | Body responsive (testimonials, FAQ) |

### Niveau 7 — Overlines / Category Labels

| Classe | Taille | Usage |
|--------|--------|-------|
| `text-xs` (0.75rem) | 12px | Labels de section, tags, badges |
| `text-[11px]` | 11px | About overlines, form hints, CTA contact |
| `text-[0.6875rem]` | 11px | Contact mini form chips, trust signals |
| `text-[0.625rem]` (10px) | 10px | Overlines sections landing, trust signals hero |
| `text-[10px]` | 10px | Footer column titles, contact form labels, header CTA |

### Niveau 8 — Navigation

| Classe | Taille | Usage |
|--------|--------|-------|
| `text-[0.8rem]` | 12.8px | Header desktop nav |
| `text-[0.7rem]` | 11.2px | Mobile menu numbers + secondary links |

### Niveau 9 — Micro-text

| Classe | Taille | Usage |
|--------|--------|-------|
| `text-[0.5625rem]` | 9px | Process card mini-labels (CRM, Email, Factu.) |
| `text-[0.625rem]` | 10px | Form labels, trust signals, footer copyright |

### Niveau 10 — Decoratif

| Classe | Taille | Usage |
|--------|--------|-------|
| `text-[clamp(5rem,20vw,8rem)]` + responsive | 80px - 320px | Portfolio ghost number |
| `text-[40rem]` | 640px | Testimonials decorative quote mark |
| `text-[1.125rem]` | 18px | Process card dashboard metrics |

---

## Observations

1. **Tokens CSS ignores** — `--font-size-h1` etc. s'appliquent aux balises `h1`-`h6` via `@layer base`, mais les composants overrident systematiquement avec des `clamp()` inline
2. **Incoherence `10px` vs `0.625rem`** — meme taille ecrite de 3 manieres : `text-[10px]`, `text-[0.625rem]`, `text-xs` (12px, different)
3. **Incoherence `11px` vs `0.6875rem`** — meme chose avec `text-[11px]` et `text-[0.6875rem]`
4. **Minimum body 16px respecte** — mais les overlines descendent jusqu'a 9px (`0.5625rem`)
