---
name: video-storyboard
description: >
  Traducteur script -> storyboard frame-by-frame pour compositions Remotion.
  Transforme un script video en specification technique scene par scene avec frames (30fps),
  layouts, animations spring, transitions, et references assets.
  Pont entre la direction editoriale et le code motion design.
  Triggers : "storyboard", "cree le storyboard", "frames la video", "decoupe en scenes".
---

# Video Storyboard -- Traducteur Script -> Frames v1

Tu transformes un script video en storyboard technique pret a etre code dans Remotion. Chaque scene est decomposee en frames (30fps), avec des specifications precises pour les animations, layouts et transitions.

## Input

L'operateur fournit :
- **Script** : `content/scripts/[video-id].md` (genere par /video-scriptwriter)
- **Format** : reel (1080x1920) | tiktok (1080x1920) | youtube-short (1080x1920) | youtube-long (1920x1080)
- **Assets disponibles** : screenshots, logos, musiques dans `public/`

## Sources de reference

### Design tokens

Lire `/Users/jorisgustiez/Dev/Claude/neurolia-agency/neurolia/neurolia-videos/src/styles/neurolia-tokens.ts` :
- Couleurs : background #050810, surface #0A0F1A, primary #C45C3B
- Typography : Satoshi (display), Inter (body), Lexend (hero)
- Font sizes scaled par format (reel/post/linkedin)
- Animation configs : durees, stagger, translate values

### Composants disponibles

Scanner `src/components/` pour les composants reutilisables :
- `backgrounds/` : AnimatedBackground, GridBackground, GradientOrb
- `typography/` : AnimatedText, KineticCaption, StatCounter, TypewriterText
- `ui/` : DeviceMockup, ScreenshotZoom, SplitScreen, CTAButton
- `scenes/` : HookScene, FeatureScene, StatRevealScene, CTAScene
- `overlays/` : Logo, ProgressBar, CaptionTrack

### Templates

Scanner `src/templates/` pour comprendre la structure attendue en output.

## Regles de conversion

### Timing (30 fps)

| Duree | Frames |
|-------|--------|
| 0.5s | 15 |
| 1s | 30 |
| 1.5s | 45 |
| 2s | 60 |
| 3s | 90 |
| 4s | 120 |
| 5s | 150 |

### Transitions standard

| Transition | Duree | Quand utiliser |
|------------|-------|----------------|
| `fade` | 15 frames | Entre scenes calmes |
| `slide-from-bottom` | 15 frames | Hook -> Body (energique) |
| `slide-from-right` | 15 frames | Entre features |
| `slide-from-left` | 15 frames | Retour / contraste |
| `wipe` | 20 frames | Before/After split |
| `zoom-in` | 20 frames | Focus sur detail |
| `none` (cut) | 0 frames | Rythme rapide, BuildLog |

### Animations spring (configs Remotion)

| Usage | Config | Feeling |
|-------|--------|---------|
| Text reveal | `{ damping: 12, stiffness: 100 }` | Snappy mais fluide |
| Element entrance | `{ damping: 15, stiffness: 80 }` | Smooth cinematic |
| Bouncy pop | `{ damping: 8 }` | Playful |
| Heavy cinematic | `{ damping: 15, stiffness: 80, mass: 2 }` | Drama |
| CTA pulse | `{ damping: 10, stiffness: 100 }` | Attention |
| Letter stagger | delay 1-2 frames per letter | Elegant |

### Safe zones (9:16)

```
+-------------------+
|   TOP SAFE 150px  |  <- Pas de contenu critique (notifications)
|                   |
|   CONTENT AREA    |  <- Zone principale
|   padding: 60px   |
|                   |
|  BOTTOM SAFE 250px|  <- Pas de contenu critique (UI plateformes)
+-------------------+
```

- **IG Reels** : username en bas-gauche, CTA en bas-droite -> eviter bottom 200px
- **TikTok** : username en bas-droite, boutons a droite -> eviter right 80px + bottom 250px
- **YouTube Shorts** : subscribe en bas-centre -> eviter bottom 150px

## Structure du storyboard

```markdown
# Storyboard -- [Video ID] [Titre]

## Metadata
| Champ | Valeur |
|-------|--------|
| Script source | content/scripts/[video-id].md |
| Format | [1080x1920 / 1920x1080] |
| FPS | 30 |
| Duree totale | [N] frames ([X]s) |
| Template | [FeatureFlash / StatReveal / etc.] |

## Timeline

### Scene 1 -- Hook
| Propriete | Valeur |
|-----------|--------|
| Frames | 0 -> [N] |
| Duree | [X]s |
| Background | AnimatedBackground(intensity: 1.2) |
| Layout | flex-column, center, padding 60px |

**Elements :**

1. **Text principal** (frame 5)
   - Composant : `AnimatedText`
   - Props : `text="[hook text]" fontSize={72} fontWeight={700} delay={5} staggerDelay={1.5}`
   - Position : center, maxWidth 85%

2. **Accent word** (frame 25)
   - Composant : `AnimatedText`
   - Props : `text="[accent]" fontSize={72} color={colors.primary} delay={25} staggerDelay={2}`

3. **Element visuel** (frame 40)
   - Type : [emoji/icon/screenshot]
   - Animation : spring({ damping: 8, stiffness: 100 })
   - Position : [absolute coords]

**Voiceover sync :** "[texte]" (0s -> [X]s)
**Caption :** "[texte caption]" accent="[mot]"

**Transition sortie :** slide-from-bottom, 15 frames

---

### Scene 2 -- Feature
[meme structure...]

---

### Scene N -- CTA
[meme structure avec CTAButton, logo, URL]
```

## Regles par type de video

### FeatureFlash (15-30s)
- 3 scenes : Hook (3-4s) -> Feature (8-15s) -> CTA (4-5s)
- Feature scene : DeviceMockup + ScreenshotZoom
- Transition hook->feature : slide-from-bottom
- Transition feature->cta : fade

### StatReveal (15-20s)
- 3 scenes : Hook (2-3s) -> Number (5-8s) -> Context+CTA (5-8s)
- Number scene : StatCounter (anime de 0 a N) + glow terracotta
- Spring config : { damping: 20, stiffness: 60 } (slow dramatic)

### DashboardTour (30-60s)
- 5-8 scenes : Hook -> Module 1 -> Module 2 -> ... -> CTA
- Pan horizontal simule via translateX
- Chaque module : screenshot + label kinetic text

### BeforeAfter (20-30s)
- 3 scenes : Hook (3s) -> Split (12-18s) -> CTA (5s)
- SplitScreen composant avec wipe transition
- Gauche : chaos (spreadsheet, emails) | Droite : dashboard clean

### BuildLog (30-45s)
- 4-6 scenes : Hook -> Code -> Build -> UI -> Polish -> CTA
- Fast cuts (no transitions, direct cuts)
- Code : monospace text with typewriter effect
- UI : screenshot apparition progressive

### QuickTip (20-30s)
- 3 scenes : Hook (3s) -> Tip (12-18s) -> CTA (5s)
- Tip : numbered steps avec AnimatedBar separateurs

## Output

Ecrire le storyboard dans `content/scripts/[video-id]-storyboard.md`

## Affichage a l'operateur

```
STORYBOARD GENERE -- [Video ID]

Format : [1080x1920] | Duree : [N] frames ([X]s)
Scenes : [N] | Transitions : [N]
Composants utilises : [liste]
Assets requis : [liste]

Valider ce storyboard ?
Modifier (preciser quoi) ?
Regenerer avec une direction differente ?
```

## Regles non negociables

1. **Frames, pas secondes** -- toutes les durees en frames (30fps), les secondes en commentaire
2. **Composants existants** -- utiliser les composants de src/components/ en priorite
3. **Safe zones** -- aucun texte/CTA critique dans les zones interdites par plateforme
4. **Voiceover sync** -- chaque scene doit indiquer le timing exact du voiceover
5. **Assets explicites** -- lister tous les fichiers requis (screenshots, audio, logos)
6. **Budget frames** -- la somme des frames de toutes les scenes + transitions = duree totale exacte
7. **Spring configs** -- toujours specifier la config spring complete, pas de "default"
