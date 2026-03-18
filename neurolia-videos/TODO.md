# TODO — neurolia-videos

<!-- neurolia-sync -->
<!-- project: neurolia-videos -->

> Pipeline video Remotion + ElevenLabs pour marketing reseaux sociaux
> Derniere mise a jour : 2026-03-18

---

## Pipeline Video — Skills
<!-- workstream: video-pipeline-skills -->

<!-- programme: Skills P1 — Foundation -->
- [x] Creer skill video-scriptwriter (ref: StrictFood caption-writer, 4 couches) <!-- nd:33fdaf0a p:urgent a:joris -->
- [x] Creer skill video-storyboard (ref: social-media-art-director + dimension temporelle) <!-- nd:dc643926 p:urgent a:joris -->
- [ ] Tester video-scriptwriter sur Video #1 du calendrier <!-- nd:a0ea344a p:normal a:joris -->
- [ ] Tester video-storyboard sur Video #1 du calendrier <!-- nd:f1b2779a p:normal a:joris -->

<!-- programme: Skills P2 — Production -->
- [ ] Creer skill remotion-coder (composition TSX depuis storyboard) <!-- nd:58e07289 p:normal a:joris -->
- [ ] Creer skill video-caption-overlay (SRT + composant captions word-by-word) <!-- nd:8b917688 p:normal a:joris -->

<!-- programme: Skills P3 — Automation -->
- [ ] Creer skill voice-producer (ElevenLabs API wrapper + timestamps) <!-- nd:fe152b2f p:normal a:joris -->
- [ ] Creer skill content-calendar-manager (planning hebdo/mensuel) <!-- nd:0a01cb83 p:normal a:joris -->
- [ ] Creer skill social-publisher (Meta Graph + TikTok + YouTube APIs) <!-- nd:2e91071a p:low a:joris -->

---

## Pipeline Video — Remotion
<!-- workstream: video-remotion -->

<!-- programme: Composants -->
- [x] Extraire AnimatedBackground depuis AgencyShowcase.tsx <!-- nd:a534b1d6 p:urgent a:joris -->
- [x] Extraire AnimatedText (letter-by-letter spring reveal) <!-- nd:cd4d7fe4 p:urgent a:joris -->
- [x] Extraire AnimatedBar (vertical/horizontal animated bar) <!-- nd:27ebb193 p:normal a:joris -->
- [x] Extraire FloatingIcon (floating element with spring) <!-- nd:1a5747c0 p:normal a:joris -->
- [ ] Creer KineticCaption (captions word-by-word highlight style TikTok) <!-- nd:69259210 p:normal a:joris -->
- [x] Creer StatCounter (nombre anime avec easing) <!-- nd:6c652f70 p:normal a:joris -->
- [x] Creer DeviceMockup (cadre device pour screenshots dashboard) <!-- nd:57be204d p:normal a:joris -->
- [ ] Creer ScreenshotZoom (zoom cinematique sur zone screenshot) <!-- nd:fbb42014 p:normal a:joris -->
- [ ] Creer SplitScreen (split avant/apres) <!-- nd:eb60895b p:normal a:joris -->

<!-- programme: Templates -->
- [x] Creer template FeatureFlash (workhorse short-form, le plus utilise) <!-- nd:019e2827 p:urgent a:joris -->
- [x] Creer template StatReveal (nombre anime + contexte, quick win) <!-- nd:1fa3d146 p:urgent a:joris -->
- [ ] Creer template BeforeAfter (split screen chaos vs dashboard) <!-- nd:767acf81 p:normal a:joris -->
- [ ] Creer template DashboardTour (pan cinematique + kinetic text) <!-- nd:bbb67d75 p:normal a:joris -->
- [ ] Creer template BuildLog (code → UI transformation acceleree) <!-- nd:3e497981 p:normal a:joris -->
- [ ] Creer template QuickTip (astuce business + visuel dashboard) <!-- nd:30890f3c p:normal a:joris -->
- [ ] Creer template ModuleDeepDive (walkthrough complet 2-5min) <!-- nd:6256b2ed p:low a:joris -->
- [ ] Creer template WorkflowDemo (scenario end-to-end 3-8min) <!-- nd:96fe1abb p:low a:joris -->

<!-- programme: Scripts & Infra -->
- [x] Creer scripts/capture-screenshots.ts (Playwright → screenshots 12 modules) <!-- nd:3bf8d9a7 p:normal a:joris -->
- [x] Creer scripts/generate-voiceover.ts (ElevenLabs API wrapper) <!-- nd:0d385bf8 p:normal a:joris -->
- [x] Creer scripts/render-video.ts (multi-format batch render) <!-- nd:42d892a2 p:normal a:joris -->
- [x] Creer scripts/generate-captions.ts (SRT depuis script + timestamps) <!-- nd:83124896 p:normal a:joris -->
- [x] Creer src/data/types.ts (SceneConfig, VideoConfig, CaptionEntry) <!-- nd:b9515ca5 p:urgent a:joris -->

---

## Production Video
<!-- workstream: production-video -->

<!-- programme: Setup Audio & Assets -->
- [ ] Setup compte ElevenLabs et selectionner voix francaise homme 30-40 ans <!-- nd:9ec9d486 p:normal a:joris -->
- [ ] Capturer screenshots dashboard complets des 12 modules <!-- nd:6157d668 p:normal a:joris -->
- [ ] Sourcer 3-5 musiques royalty-free tech/corporate (Pixabay) <!-- nd:ac7b2731 p:normal a:joris -->
- [ ] Sourcer SFX : whoosh, click, ding, bass drop <!-- nd:803ae3ef p:normal a:joris -->

<!-- programme: Video #1 — Test Pipeline -->
- [ ] Brief Video #1 : "12 modules. 0 Excel." (Dashboard Tour) <!-- nd:3eb84864 p:normal a:joris -->
- [ ] Script Video #1 via /video-scriptwriter <!-- nd:293fd2e3 p:normal a:joris -->
- [ ] Storyboard Video #1 via /video-storyboard <!-- nd:7d0cdfd1 p:normal a:joris -->
- [ ] Voiceover Video #1 via /voice-producer <!-- nd:fdd8acee p:normal a:joris -->
- [ ] Composition Remotion Video #1 via /remotion-coder <!-- nd:22ba784b p:normal a:joris -->
- [ ] Render multi-format (reel + tiktok + youtube-short) <!-- nd:374f6671 p:normal a:joris -->
- [ ] Publication test IG Reels + TikTok + YouTube Shorts <!-- nd:5a7e97b6 p:normal a:joris -->

<!-- programme: Batch S1 -->
- [ ] Generer calendrier complet Semaine 1 (5 videos sources → 15+ posts) <!-- nd:6e960e47 p:normal a:joris -->
- [ ] Batch production des 5 videos Semaine 1 <!-- nd:90e79a96 p:normal a:joris -->
- [ ] Cross-post IG + TikTok + YouTube Shorts <!-- nd:a0264874 p:normal a:joris -->

<!-- programme: Calendrier Contenu -->
- [x] Planning mensuel mois 1 (4 semaines, 20 videos sources) <!-- nd:1250cd6c p:normal a:joris -->
- [ ] Definir metriques de succes et KPIs par plateforme <!-- nd:52164fb4 p:normal a:joris -->
- [ ] Iteration et ajustement apres Semaine 1 <!-- nd:a52a96b8 p:low a:joris -->
