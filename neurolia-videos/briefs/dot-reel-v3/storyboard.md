# Storyboard — Dot Services Reel v3

> 1080x1920, 30fps, ~37 secondes (1110 frames), H.264

## Concept

Le **dot terracotta** (#C45C3B) est le personnage principal — une sphere 3D vivante qui rebondit, grossit, retrecit, et relie toutes les scenes. Le dot est TOUJOURS rendu au-dessus de tout (z-index max), en dehors du wrapper perspective des scenes.

## Architecture technique

```
DotServicesReel (orchestrateur)
├── DynamicBackground (fond + parallax, reagit au dot)
├── Perspective wrapper (3D tilt aux transitions)
│   ├── Sequence: SceneDotBounce
│   ├── Sequence: SceneLogoCompose
│   ├── Sequence: SceneDotEscape
│   ├── Sequence: SceneServiceReveal
│   ├── Sequence: SceneStats
│   └── Sequence: SceneDotReturn
└── BouncingDot (rendu global, position calculee par computeDotTimeline)
```

## Timings

| Scene | Frames | Secondes | Description |
|-------|--------|----------|-------------|
| 1 | 0-120 | 0-4s | Dot Bounce (billiard) |
| 2 | 120-250 | 4-8.3s | Logo Compose (3D) |
| 3 | 250-450 | 8.3-15s | Dot Escape + Baseline |
| 4 | 450-720 | 15-24s | Service Reveal (3 services) |
| 5 | 720-900 | 24-30s | Stats / Preuves |
| 6 | 900-1110 | 30-37s | Dot Return + CTA |

---

## Scene 1 — Dot Bounce (0-120, 4s)

### Fond
- Debut: warm white (#FAFAF8) avec grille subtile
- Hit 1 (f27): flash → pastel coral (#FFD6E0)
- Hit 2 (f53): flash → pastel lavender (#C3D4F7)
- Hit 3 (f80): flash → dark (#050810) — PERMANENT

### Dot
- f0-5: invisible (anticipation)
- f5-100: billiard physics — 3 rebonds waypoints, squash/stretch aux impacts
- f100-120: settle vers centre (960, 960), debut breathing

### Elements visuels
- Shockwave flash blanc a chaque impact mur
- Grille en fond qui change de couleur avec le bg
- Cercles decoratifs subtils en parallax

### Emotion
Energie, surprise, attention captee immediatement

---

## Scene 2 — Logo Compose (120-250, 4.3s)

### Dot
- f120-140: GROW scale 1 → 3 au centre (dot devient enorme)
- f140-162: SHRINK 3 → 1 + arc vers position O du logo
- f162+: invisible (integre au SVG logo)

### Logo
- f160: logo apparait avec rotation 3D spectaculaire
  - rotateY: -90° → 0° (rotation laterale)
  - rotateX: 25° → 0° (bascule)
  - rotateZ: -12° → 0° (twist)
  - Spring: damping 14, stiffness 50, mass 1.8
- Lettres staggered du centre (O) vers l'exterieur: r/l → u/i → e/a → N
- Ring du O: scale 0.3 → 1, spring

### Fond
- Dark (#050810) permanent depuis hit 3

### Emotion
Revelation, brand recognition, "wow" technique

---

## Scene 3 — Dot Escape + Baseline (250-450, 6.7s)

### Dot
- f250-260: vibre dans le O (amplitude croissante)
- f260-275: SWELL scale 1 → 2.5 (eclate le O)
- f275-285: SHRINK 2.5 → 1 + shoot vers droite
- f285-350: trajectoire dynamique multi-quadrants (arcs larges)
- f350-370: settle + orbit doux (x:850, y:450)
- f370+: orbit + glow breathing

### Logo
- f290-320: fade out + shift up (-80px)

### Texte (apres disparition logo)
- f360: "Un business qui respire." (42px, word-by-word, Satoshi 600)
- f380: "Pendant que tu bosses sur ce qui compte." (28px, Inter 400, text secondary)
- f425-450: fade out les deux

### Emotion
Liberation, envolee, promesse de marque

---

## Scene 4 — Service Reveal (450-720, 9s)

### Dot
- f450-470: travel de orbit (850,450) vers position service (110,540)
- f470+: breathing subtil en haut a gauche, guide visuel

### Services (3 blocs, 90 frames chacun)

**Service 1 (f470-560) — Web**
- Titre: "Un site qui vend. Point."
- Explication: "On concoit des sites sur-mesure qui transforment tes visiteurs en clients."
- Bullets:
  - "Design sur-mesure, zero template recycle"
  - "SEO technique pour dominer Google"
  - "Chaque mot ecrit pour convertir"
- Entree: 3D perspective (rotateX -15°, translateZ -200px) → flat
- Sortie: fade out (f545-560)

**Service 2 (f545-635) — Automatisations**
- Titre: "Tes operations, pilote auto."
- Explication: "On connecte tes outils pour qu'ils bossent a ta place."
- Bullets:
  - "CRM, devis, relances — tout se parle"
  - "Zero saisie manuelle, zero oubli"
  - "+10h/semaine liberees, vraiment"
- Meme pattern entree/sortie

**Service 3 (f618-708) — IA**
- Titre: "Ton commercial 24h/24."
- Explication: "Un assistant IA forme sur tes offres, integre a ton site."
- Bullets:
  - "Forme sur 100% de tes offres"
  - "Repond en 2 secondes, qualifie, convertit"
  - "x3 conversions vs formulaire classique"
- Meme pattern entree/sortie

### Fond
- Dark, ambient glow terracotta subtil

### Emotion
Competence, confiance, concretude

---

## Scene 5 — Stats (720-900, 6s)

### Dot
- f720-740: travel vers centre haut (540,400)
- f740-760: descend vers 440 + squash/burst (stamp effect)
- f760-800: breathing au-dessus stat 1
- f800-820: descend vers stat 2 (540,990)
- f820-822: squash/burst (stamp effect)
- f822+: breathing au-dessus stat 2

### Stats
- f755-820: "+40%" (120px, terracotta) + "de taux de conversion" (28px, secondary)
- f820+: "+10h" (120px, terracotta) + "recuperees par semaine" (28px, secondary)
- f870+: "Des resultats, pas des promesses." (34px, secondary, word-by-word)

### Animations stats
- Valeur: scale 1.3 → 1, spring (damping 10, stiffness 120)
- Entree: opacity 0 → 1 sur 10 frames

### Emotion
Preuves, credibilite, impact mesurable

---

## Scene 6 — Dot Return + CTA (900-1110, 7s)

### Dot
- f900-920: lift de stat 2 vers haut (540→590, 990→700)
- f920-950: arc vers position O du logo (logo Y = 680)
- f948-950: glow burst a l'arrivee
- f950+: invisible (integre au logo SVG)

### Logo
- f900-920: fade in logo a Y=680 (plus haut que centre)
- f950+: dot visible dans le logo

### Glow burst
- f948-965: radial gradient terracotta, pulse opacity 0→0.6→0

### Texte CTA
- f970: "Premier echange gratuit. Viens en parler." (32px, secondary, word-by-word)

### Bouton CTA
- f1000: "On se parle" (32px, blanc sur terracotta)
  - Entree: spring scale 0.8→1 (damping 10, stiffness 100)
  - f1020+: pulse subtil (sin * 0.02)
  - Box shadow: terracotta glow

### Fond
- Dark permanent

### Emotion
Invitation chaleureuse, appel a l'action, fin memorable

---

## Principes d'animation transversaux

### Dot
- Toujours vivant: breathing (squash sin 0.015), orbit (cos/sin * 25)
- Grow/shrink pattern: grossit avant de se deplacer, retrecit en arrivant
- Glow pulse aux moments d'impact
- Specular highlight 3D constant (radial gradient 32%/26%)
- Trail ghosts en option (positions precedentes, opacity decroissante)

### Transitions
- Tilt 3D (rotateX 3°) au moment des changements de scene (5 frames avant/apres boundary)
- Pas de TransitionSeries — les scenes sont des Sequences avec le dot continu par-dessus

### Typographie
- LightAnimatedText: spring per-letter ou per-word avec stagger
- Entree: translateY 30→0 + scale 0.85→1 + opacity 0→1
- Spring config: damping 12, stiffness 100

### Timing
- `premountFor={fps}` sur chaque Sequence
- Temps en secondes * fps partout
- extrapolateRight/Left: 'clamp' systematique
