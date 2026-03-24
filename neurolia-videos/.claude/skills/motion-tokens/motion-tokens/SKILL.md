---
name: motion-tokens
description: Animation token library for Remotion video compositions. Use when defining, debugging, or reviewing animations — provides spring configs, easing curves, squash/stretch patterns, and timing tables.
---

# Motion Tokens

Reusable animation primitives for Remotion. All values tested at 30fps on 1080x1920.

## Spring Configs

```typescript
import { spring } from 'remotion';

const MOTION = {
  smooth:    { damping: 200 },                           // Reveals, fade-ins
  snappy:    { damping: 20, stiffness: 200 },            // UI elements, text entrance
  bouncy:    { damping: 8 },                             // Playful entrances, dot
  cinematic: { damping: 14, stiffness: 50, mass: 1.8 },  // 3D rotations, logo
  heavy:     { damping: 15, stiffness: 80, mass: 2 },    // Dramatic slow motion
  elastic:   { damping: 5, stiffness: 150 },             // CTA buttons, attention
} as const;
```

## Easing Curves

```typescript
import { Easing } from 'remotion';

// Gravity (falling objects)
Easing.in(Easing.quad)
// Deceleration (rising, arriving)
Easing.out(Easing.quad)
// Strong deceleration (final settle)
Easing.out(Easing.exp)
// Smooth bidirectional (state transitions)
Easing.inOut(Easing.quad)
// Cinematic dramatic
Easing.bezier(0.16, 1, 0.3, 1)
// Overshoot punch
Easing.bezier(0.68, -0.6, 0.32, 1.6)
```

## Squash & Stretch

For detailed patterns including direction-aligned squash, grow/shrink transitions, and breathing/orbit patterns, see [references/patterns.md](references/patterns.md).

## Timing Table

| Animation Type | Duration (frames @30fps) | Config |
|---|---|---|
| Text fade in | 8-12 | SMOOTH |
| Letter stagger | 2-4 per letter | SNAPPY |
| Word stagger | 3-5 per word | SNAPPY |
| UI element entrance | 15-20 | SNAPPY |
| Color transition | 3-5 | `interpolateColors` |
| Flash shockwave | 6-8 | linear interpolate |
| 3D logo rotation | 30-40 | CINEMATIC |
| Impact squash recovery | 5-8 | BOUNCY |
| Settle (end of motion) | 15-25 | `Easing.out(exp)` |
| Grow/shrink dot | 20 | `Easing.out(quad)` |
| CTA button | 15-20 | ELASTIC |
| Breathing pulse | sin wave | amplitude 0.015 |
| Orbit | sin/cos | radius 25px, 1.5 rad/s |

## Anti-Patterns

- **NEVER** use CSS transitions or CSS animation classes — Remotion renders frame-by-frame
- **NEVER** hardcode frame numbers — always `seconds * fps`
- **NEVER** use `useFrame()` from `@react-three/fiber` — only `useCurrentFrame()`
- **NEVER** apply scale change without glow feedback
- **NEVER** leave a zone static > 1 second — add breathing or orbit minimum
- **ALWAYS** add `premountFor` on every `<Sequence>`
- **ALWAYS** clamp extrapolation: `{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }`
