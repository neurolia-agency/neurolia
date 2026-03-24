---
name: reel-format-guide
description: Social video format specs — safe zones, platform constraints, attention curves, text rules. Use when designing layouts for Instagram Reels, TikTok, or LinkedIn video.
---

# Reel Format Guide

Platform specs and layout constraints for social video.

## Instagram Reels (primary format)

| Property | Value |
|---|---|
| Resolution | 1080 x 1920 px |
| Ratio | 9:16 |
| FPS | 30 |
| Duration | 15-90s (optimal: 15-37s) |
| Codec | H.264 / MP4 |

### Safe Zones

```
┌──────────────────────┐  0px
│  IG USERNAME + X     │  0-250px: DEAD ZONE (IG UI overlay)
├──────────────────────┤  250px
│                      │
│   SAFE ZONE          │  250-1580px: usable content area
│   950 x 1330px       │  (with 65px side margins)
│                      │
├──────────────────────┤  1580px
│  DESCRIPTION + ICONS │  1580-1920px: DEAD ZONE (IG UI overlay)
└──────────────────────┘  1920px
```

- Side margins: 65px each side (device cropping)
- Effective safe: **x:65-1015, y:250-1580**
- Decorative elements (dot, glows) CAN bleed into dead zones
- Text, CTA, logos MUST stay in safe zone

For TikTok and LinkedIn specs, see [references/platforms.md](references/platforms.md).

## Attention Curve

| Second | Viewer behavior | Content rule |
|---|---|---|
| 0-3 | Hook or skip | Movement + color. No text yet. |
| 3-8 | Who is this? | Brand identity (logo, name) |
| 8-15 | First value | Concrete info (number, benefit) |
| 15-25 | Development | Services, details, proof |
| 25-35 | Impact | Stats, results |
| 35+ | CTA | Clear invitation, not aggressive |

## Text on Silent Video

85% of reels watched WITHOUT sound. Text must:
- Be self-sufficient (no audio needed to understand)
- Titles: min **42px** (mobile readable)
- Body: min **24px**
- Display time: min **2 seconds** per 8+ word phrase
- Contrast: ratio >= **4.5:1**
- Coverage: max **30%** of screen area in simultaneous text
