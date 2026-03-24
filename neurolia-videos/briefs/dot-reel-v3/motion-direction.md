# Motion Direction — Dot Services Reel v3

## Philosophie

Le mouvement doit etre **organique et vivant**, jamais mecanique. Le dot est un personnage avec de la personnalite — il rebondit, respire, hesite, s'elance. Chaque animation doit avoir:
- **Anticipation** (preparation avant le mouvement)
- **Action** (le mouvement principal)
- **Follow-through** (deceleration naturelle, rebond subtil)

## Spring Configs

| Nom | Config | Usage |
|-----|--------|-------|
| smooth | `{ damping: 200 }` | Reveals subtils, fade-ins |
| snappy | `{ damping: 20, stiffness: 200 }` | Elements UI, bullets |
| bouncy | `{ damping: 8 }` | Dot entrances, CTA button |
| cinematic | `{ damping: 15, stiffness: 80, mass: 2 }` | Logo 3D rotation |
| elastic | `{ damping: 5, stiffness: 150 }` | Impact squash |
| letterPop | `{ damping: 12, stiffness: 100 }` | Per-letter animations |
| statPop | `{ damping: 10, stiffness: 120 }` | Stats value entrance |

## Easing Curves

| Nom | Curve | Usage |
|-----|-------|-------|
| dramatic | `Easing.out(Easing.exp)` | Settle positions, decelerations |
| punchy | `Easing.bezier(0.68, -0.6, 0.32, 1.6)` | Overshoot, attention grab |
| cinematic | `Easing.bezier(0.16, 1, 0.3, 1)` | Slow start, fast end |
| smooth | `Easing.inOut(Easing.quad)` | Transitions douces, repositions |

## Patterns de mouvement

### 1. Grow/Shrink (signature du dot)
Le dot grossit AVANT de se deplacer (anticipation), puis retrecit EN se deplacant (action + follow-through).
```
f0-20:  scale 1 → 3, position fixe, glow monte
f20-42: scale 3 → 1, position interpolee vers cible, arc (sin * -150px)
f42:    glow burst a l'arrivee
```

### 2. Billiard Bounce
Waypoints pre-calcules avec smoothstep interpolation. Squash/stretch bases sur la vitesse:
- En mouvement rapide: stretchX +15%, squashY -7.5%
- Impact mur: squashX 1.35, squashY 0.65 + glow burst
- Shockwave: radial gradient blanc, scale 0.2→4, opacity 1→0

### 3. 3D Service Entrance
```
rotateX: -15° → 0°   (spring, damping 14)
translateZ: -200 → 0  (spring, damping 14)
opacity: 0 → 1        (linear, 12 frames)
```

### 4. Letter-by-letter / Word-by-word
```
Per unit: delay = base + index * stagger
translateY: 30 → 0    (spring, damping 12)
scale: 0.85 → 1       (spring, damping 12)
opacity: 0 → 1        (linear, 8 frames)
```

### 5. Stat Stamp
Le dot arrive au-dessus du chiffre, squash impact (2 frames), puis le chiffre apparait:
```
dot: squashX 1→1.2→1, squashY 1→0.8→1 (2 frames)
dot: glowIntensity 0→0.7→0.2
stat: scale 1.3→1 (spring, damping 10)
stat: opacity 0→1 (10 frames)
```

### 6. Breathing
Mouvement constant micro quand le dot est "au repos":
```
squashX: 1 + sin(t * 2.5) * 0.015
squashY: 1 - sin(t * 2.5) * 0.015
```

### 7. Orbit
Quand le dot attend pres d'un element:
```
x: restX + cos(t * 1.5) * 25
y: restY + sin(t * 1.5) * 25
```

## Transitions inter-scenes

Tilt 3D subtil (rotateX 3°) pendant 10 frames centre sur chaque boundary de scene. Donne une sensation de profondeur au changement.

## Background

### Changements de couleur
Rapides (4 frames) aux impacts du dot — pas de fade lent. Shockwave radiale + flash.

### Grille
Toujours presente, change de couleur avec le fond. Opacity 0.5, 80px spacing.

### Ambient glow (dark mode)
Radial gradient terracotta tres subtil (0.06 opacity), respire avec le temps (sin * 0.2 + 0.5).

### Parallax
Tres leger: (dotPosition - center) * 0.015 sur les elements decoratifs.

## Sphere 3D (BouncingDot)

### Composition
3 layers:
1. **Base sphere**: radial gradient directionnel (highlight 38%/32%)
   - `#F4976C` → `#E8703A` → `#D45A2E` → `#B84425` → `#943620`
2. **Specular highlight**: blanc gradient (55% → 20% → 5% → transparent)
   - Position: 32%/26% (haut-gauche, eclairage consistant)
3. **Glow overlay**: radial orange, blur 8-23px, triggered par glowIntensity

### Deformations
- Transform: `rotate(R) scaleX(SX) scaleY(SY) rotate(-R)` — squash aligne avec la direction du mouvement
- Scale multiplie le rayon effectif (effectiveRadius = radius * scale)
