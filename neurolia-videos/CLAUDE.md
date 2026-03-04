# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Remotion video project for Neurolia web agency. Creates videos for:
- **Website**: Hero backgrounds, section animations, service showcases, portfolio previews
- **Social Media**: Instagram Reels/Posts, LinkedIn, TikTok

## Creative Philosophy

**This is a creative sandbox. Push the boundaries.**

Unlike the website (which follows strict brand constraints), video content is where Neurolia showcases its technical excellence and creative vision. The goal is to create **cinematic, high-impact, premium motion design** that leaves a lasting impression.

### Creative Freedom

| Aspect | Guideline |
|--------|-----------|
| Animation types | **ALL ALLOWED**: scale, rotate, skew, blur, spring, bounce, 3D transforms |
| Timing | Use what feels right - springs for organic motion, custom easings for drama |
| Effects | Glows, particles, gradients, masks, blend modes - go wild |
| Complexity | Layer animations, combine effects, create depth |

### Quality Standards

- **Hollywood-level polish**: Every animation should feel intentional and refined
- **Smooth 30fps minimum**: No janky transitions
- **Cinematic timing**: Use pauses, anticipation, and follow-through
- **Premium feel**: Dark, sophisticated, tech-forward aesthetic

## Workflow

**MANDATORY: Before any video work, consult Remotion best practices.**

```bash
# 1. First: Load Remotion best practices (REQUIRED)
/remotion-best-practices

# 2. Then: Execute video creation with APEX
/apex -a -s [video task description]
```

### Required Skills

| Skill | Usage | Required |
|-------|-------|----------|
| `/remotion-best-practices` | Consult before writing any Remotion code | **Yes** |
| `/apex` | Structure video creation workflow | **Yes** |

## Commands

```bash
# Development
npm run dev              # Preview in Remotion Studio (auto port)

# Render specific compositions
npm run render:reel      # Instagram/TikTok reel
npm run render:post      # Instagram post (square)
npm run render:linkedin  # LinkedIn video
npm run render:hero      # Website hero background (WebM)
npm run render:all       # All social media formats

# Custom render
npx remotion render src/index.ts <CompositionId> out/<filename>.mp4
npx remotion render src/index.ts HeroLogoReveal out/hero-logo.webm --codec=vp9
```

## Video Specifications

### Social Media Formats

| Composition | Resolution | Duration | Codec |
|-------------|------------|----------|-------|
| Reel | 1080x1920 (9:16) | 15-60s | H.264 |
| Post | 1080x1080 (1:1) | 3-60s | H.264 |
| LinkedIn | 1920x1080 (16:9) | 30-120s | H.264 |
| TikTok | 1080x1920 (9:16) | 15-60s | H.264 |

### Website Formats

| Composition | Resolution | Duration | Codec | Usage |
|-------------|------------|----------|-------|-------|
| HeroLogoReveal | 1920x1080 | 6s | WebM/VP9 | Logo animation at page load |
| HeroBackground | 1920x1080 | 10s loop | WebM/VP9 | Hero section background |
| SectionBackground | 1920x1080 | 8s loop | WebM/VP9 | Section backgrounds |
| ServiceShowcase | 1920x1080 | 20s | H.264 | Service presentation |
| PortfolioPreview | 1920x1080 | 15s | H.264 | Portfolio items |

## Brand Colors (Reference Only)

Use these as a starting point, but feel free to add complementary colors, gradients, and effects.

| Element | Value | Notes |
|---------|-------|-------|
| Background | `#050810` | Ultra-dark base - can add depth layers |
| Surface | `#0A0F1A` | Secondary dark |
| Accent | `#C45C3B` | Terracotta - the signature color |
| Accent Light | `#E07856` | Terracotta hover/highlight |
| Glow | `rgba(196, 92, 59, 0.3)` | For glowing effects |
| Text Primary | `#F5F5F5` | |
| Text Secondary | `#D4D4D4` | |

### Encouraged Effects

- **Glows & Light**: Terracotta glows, light rays, lens flares
- **Particles**: Converging, exploding, floating particles
- **Depth**: Parallax layers, 3D perspective, z-depth
- **Organic motion**: Springs, bounces, elastic easing
- **Reveals**: Mask reveals, wipes, morphs
- **Typography**: Letter-by-letter animations, kinetic type

## Animation Toolkit

### Spring Configs (Remotion)

```tsx
// Smooth, no bounce - for subtle reveals
const smooth = { damping: 200 };

// Snappy, minimal bounce - for UI elements
const snappy = { damping: 20, stiffness: 200 };

// Bouncy entrance - for playful animations
const bouncy = { damping: 8 };

// Heavy, cinematic - for dramatic reveals
const cinematic = { damping: 15, stiffness: 80, mass: 2 };

// Elastic pop - for attention-grabbing
const elastic = { damping: 5, stiffness: 150 };
```

### Easing Curves

```tsx
import { Easing } from 'remotion';

// Dramatic slow-in
Easing.bezier(0.16, 1, 0.3, 1)

// Punchy
Easing.bezier(0.68, -0.6, 0.32, 1.6)

// Cinematic ease-out
Easing.out(Easing.exp)
```

## Project Structure

```
neurolia-videos/
├── src/
│   ├── index.ts                    # Entry point
│   ├── Root.tsx                    # Composition registry
│   ├── styles/
│   │   └── neurolia-tokens.ts      # Design tokens
│   └── compositions/
│       ├── PlaceholderVideo.tsx    # Base template
│       ├── HeroMotion.tsx          # Hero background
│       └── HeroLogoReveal.tsx      # Cinematic logo reveal
├── public/
│   └── neurolia/                   # Shared assets
│       ├── logo_neurolia.svg
│       ├── logo_neurolia_light.svg
│       ├── project-*.webp
│       └── team/
├── out/                            # Rendered videos
├── remotion.config.ts
├── tsconfig.json
└── package.json
```

## Key Remotion Concepts

```tsx
// Frame-based animation (REQUIRED - no CSS animations!)
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Interpolation
const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

// Spring animation
const scale = spring({ frame, fps, config: { damping: 12 } });

// Sequencing
<Sequence from={30} durationInFrames={60} premountFor={fps}>
  <MyComponent />
</Sequence>

// Looping (for backgrounds)
<Loop durationInFrames={fps * 10}>
  <BackgroundAnimation />
</Loop>
```

## Content Language

All text content must be in French with formal "vous" (vouvoiement).

## Assets

```tsx
import { staticFile, Img } from 'remotion';

<Img src={staticFile('neurolia/logo_neurolia_light.svg')} />
```

Available:
- `neurolia/logo_neurolia.svg` - Dark logo
- `neurolia/logo_neurolia_light.svg` - Light logo (for dark backgrounds)
- `neurolia/project-*.webp` - Portfolio images
- `neurolia/team/` - Team photos

## Inspiration & Reference

When creating videos, aim for the quality level of:
- Apple product reveals
- High-end SaaS landing page animations
- Award-winning motion design (Awwwards, FWA)
- Cinema title sequences

**Remember: This is where Neurolia shows what it can do. Make it unforgettable.**
