# PROMPT — Video Motion Design Neurolia

> Copie ce prompt dans une nouvelle session Claude Code.

---

## Qui je suis

Je suis Dorian, fondateur de Neurolia — agence web, automatisation & IA pour PME/TPE.

## Ce que je veux

Creer une video motion design de presentation de l'agence pour Instagram Reel (9:16, ~30-40s, 30fps) avec Remotion. Le projet existe dans `neurolia-videos/`.

## Comment on travaille

**On brainstorme ensemble.** Tu ne codes RIEN tant que je n'ai pas valide chaque etape. A chaque etape, tu me proposes des idees et tu attends mon retour. Pas d'execution autonome.

### Process complet

```
 1. Recherche marque — tu lis les sources ci-dessous, tu me presentes une synthese
 2. Definition cible & objectif — a qui on parle, quel effet on veut produire
 3. Moodboard & references visuelles — images Unsplash, reels d'inspi, references motion design
 4. Brainstorm concept creatif — on explore les idees ensemble
 5. Direction artistique video — palette, textures, effets specifiques a la video
 6. Color script — progression chromatique scene par scene (avec refs Unsplash)
 7. Script — arc emotionnel + textes (agent copywriter-video)
 8. Animatique — timing et rythme scene par scene
 9. Storyboard detaille — chaque scene decrite + cover frame defini
10. Direction sonore — style musical, moments SFX
11. Inventaire d'assets — ce qui existe, ce qu'on doit creer
12. Plan d'implementation technique
    ——— REVIEW CHECKPOINT : on valide tout avant de coder ———
13. Code (composants → scenes → orchestrateur)
    ——— REVIEW par scene (agent motion-reviewer) ———
14. Audit visuel + iterations
15. Render final + optimisation plateforme
```

### Moodboards & references visuelles

Pour les etapes 3, 5 et 6, on utilise des **images Unsplash** comme references visuelles. Pour chaque scene :
- 2-3 images qui communiquent l'ambiance, les couleurs, l'energie
- Format : URL directe Unsplash
- Ca aligne nos visions avant de figer quoi que ce soit

Exemple de format attendu :
```
Scene X — [nom]
Mood : [adjectifs]
Refs :
- https://unsplash.com/photos/[id] — [pourquoi cette ref]
- https://unsplash.com/photos/[id] — [pourquoi cette ref]
Palette extraite : #xxx, #xxx, #xxx
```

## Concept de depart (a challenger)

Le **dot terracotta du O de Neurolia** comme personnage principal — une sphere 3D vivante qui traverse toute la video. Axes explores dans une version precedente (inspiration, pas specs) :
- Rebonds billard + changements de couleur de fond (pastels → dark)
- Transitions dot ↔ logo via grow/shrink
- Logo 3D multi-axes
- Effets de perspective et profondeur

## Sources de marque

**Commence par te documenter ici avant de proposer quoi que ce soit :**

### Site live
- **https://neurolia-site.vercel.app** — Source de verite (palette, typos, ton, headlines, services, CTA)

### Fichiers workspace

**Identite :**
- `neurolia-site/input/brief-client.md` — Brief client original
- `neurolia-site/pipeline/stages/A02-brand.md` — Pipeline brand
- `neurolia-site/pipeline/stages/A03-art-direction.md` — Direction artistique

**Design tokens :**
- `neurolia-site/app/globals.css` — Couleurs, typos (Inter + Satoshi), espacements
- `neurolia-videos/src/styles/neurolia-tokens.ts` — Tokens Remotion existants

**Logos :**
- `neurolia-site/public/logo/neurolia.svg` + `neurolia-light.svg`
- `neurolia-videos/public/neurolia/logo_neurolia.svg` + `logo_neurolia_light.svg`

**Business :**
- `neurolia-business/presentation-neurolia.md` — Presentation agence
- `neurolia-business/catalogue services/CATALOGUE.md` — Catalogue complet
- `neurolia-business/catalogue services/RESUME-EXECUTIF.md`
- `neurolia-business/catalogue services/services/` — Fiches par service
- `neurolia-business/proposals/brief-neurolia.md`

**Specs creatives (social engine) :**
- `neurolia-social-engine/pipeline/output/04-prompt-specs/art-director.md`
- `neurolia-social-engine/pipeline/output/04-prompt-specs/copywriter.md`
- `neurolia-social-engine/pipeline/output/04-prompt-specs/strategist.md`

**References animation existantes :**
- `neurolia-videos/src/compositions/HeroLogoReveal.tsx` — Logo cinematique (LOGO_PATHS SVG)
- `neurolia-videos/src/compositions/AgencyShowcase.tsx` — Showcase (AnimatedText, transitions)

**Identite visuelle print :**
- `neurolia-business/carte-visite-neurolia-recto.html` + `verso.html`

## Skills a charger

Charge au fur et a mesure (pas tous d'un coup) :

| Skill | Quand |
|---|---|
| `/remotion-best-practices` | Avant de coder (etape 12+) |
| `/motion-tokens` | Quand on definit les animations (etape 8) |
| `/reel-format-guide` | Quand on definit le layout (etape 9) |
| `/render-audit` | Quand on audite le rendu (etape 14) |
| `/copywriting` | Quand on travaille les textes (etape 7) |
| `/copy-editing` | Quand on affine les textes (etape 7) |
| `/social-content` | Quand on optimise pour Instagram (etape 15) |
| `/brand-guidelines` | Quand on construit la DA (etape 5) |
| `/canvas-design` | Quand on definit la direction artistique (etape 5) |
| `/theme-factory` | Quand on valide les couleurs (etape 6) |

## Agents disponibles

| Agent | Usage |
|---|---|
| `copywriter-video` | Proposer des textes (titres, CTA, baselines) — etape 7 |
| `motion-reviewer` | Auditer les frames rendues — etape 14 |

## Contraintes techniques (pour plus tard)

- 1080x1920, 30fps, H.264, Composition ID: `DotServicesReel`
- Animations via `useCurrentFrame()` uniquement
- `premountFor` sur chaque `<Sequence>`
- TypeScript strict

## Premiere etape

Documente-toi sur la marque Neurolia en lisant les sources listees ci-dessus (fetch le site + lis les fichiers cles). Puis presente-moi une synthese de ce que tu as compris de la marque et propose-moi des pistes creatives pour la video. On brainstorme a partir de la.
