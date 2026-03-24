# Motion Patterns Reference

## Direction-Aligned Squash & Stretch

Squash must align with velocity direction, not always vertical:

```typescript
const angle = Math.atan2(vy, vx) * (180 / Math.PI);
// Rotate to velocity axis → squash → rotate back
transform: `rotate(${angle}deg) scaleX(${squashX}) scaleY(${squashY}) rotate(${-angle}deg)`;
```

### Impact values

| Situation | scaleX | scaleY |
|---|---|---|
| Wall impact (strong) | 1.35 | 0.65 |
| Wall impact (medium) | 1.25 | 0.75 |
| Wall impact (light) | 1.12 | 0.88 |
| Fast travel stretch | `1 + speed/25 * 0.15` | `1 - speed/25 * 0.08` |

## Grow/Shrink Transition (Dot ↔ Logo)

### Entry into logo
```
Phase 1 — GROW: scale 1 → 3 over 20 frames
  Easing: Easing.out(Easing.quad)
  Position: stationary at center
  Glow: 0 → 0.6

Phase 2 — SHRINK + TRAVEL: scale 3 → 1 over 22 frames
  Easing: Easing.out(Easing.cubic)
  Position: arc trajectory to target (add sin(t*PI) * -150 for upward arc)
  Glow: 0.6 → 0, then burst 0.9 at arrival

Phase 3 — CLICK: 2-frame glow burst, then visible=false (SVG takes over)
```

### Exit from logo
```
Phase 1 — VIBRATE: 10 frames, sin wave amplitude 2→18px

Phase 2 — SWELL: scale 1 → 2.5 over 15 frames
  Easing: Easing.out(Easing.quad)
  Position: stationary at O position
  Glow: 0.2 → 0.7

Phase 3 — SHRINK + EJECT: scale 2.5 → 1 over 10 frames
  Easing: Easing.out(Easing.exp)
  Position: shoot to escape direction
  Squash: 1.3/0.7 during ejection
```

## Breathing (Resting State)

```typescript
// Subtle scale oscillation — dot feels alive even when still
const breathe = Math.sin((frame / fps) * 2.5) * 0.015;
state.squashX = 1 + breathe;
state.squashY = 1 - breathe;
```

## Orbit (Active Resting)

```typescript
// Slow circular motion around rest position
const orbitT = (frame / fps);
state.x = restX + Math.cos(orbitT * 1.5) * 25;  // radius 25px
state.y = restY + Math.sin(orbitT * 1.5) * 25;   // period ~4.2s
```

## Glow Breathing

```typescript
// Terracotta glow pulses gently
const glowBreath = Math.sin((frame / fps) * 3) * 0.15;
state.glowIntensity = 0.2 + Math.max(0, glowBreath);  // range: 0.2 — 0.35
```

## Scene Transition Tilt

```typescript
// Subtle 3D tilt at scene boundaries
function computeSceneTilt(frame: number, boundaries: number[]): number {
  for (const boundary of boundaries) {
    const dist = Math.abs(frame - boundary);
    if (dist < 5) {
      return 3 * Math.sin((1 - dist / 5) * Math.PI * 0.5);
    }
  }
  return 0;
}
// Apply: rotateX(tilt + 'deg') on content wrapper with perspective: 1200px
```

## 3D Sphere Dot

```css
/* Base sphere — vibrant orange terracotta, NOT brown */
background: radial-gradient(circle at 38% 32%,
  #F4976C 0%, #E8703A 30%, #D45A2E 55%, #B84425 80%, #943620 100%);

/* Specular highlight — crisp white point */
background: radial-gradient(circle at 32% 26%,
  rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 15%, transparent 50%);
```
