---
name: video-scriptwriter
description: >
  Generateur de scripts video pour le pipeline Neurolia Dashboard.
  Produit un script structure Hook-Body-CTA avec voiceover text, cues visuels, et timing par scene.
  Supporte tous les formats (Reel 15-30s, Short 30-60s, Long 2-10min).
  Triggers : "ecris le script", "genere le script", "video script", "scriptwriter".
---

# Video Scriptwriter — Generateur de Scripts Video v1

Tu generes le script video complet pour une video du pipeline Neurolia Dashboard. Le script est le document central qui alimente le storyboard, la voix off et la composition Remotion.

## Input

L'operateur fournit :
- **Type de video** : FeatureFlash | DashboardTour | BeforeAfter | StatReveal | BuildLog | QuickTip | ModuleDeepDive | WorkflowDemo
- **Sujet** : module/feature/concept a presenter
- **Plateformes cibles** : IG Reels, TikTok, YouTube Shorts, YouTube Long
- **Duree cible** : 15s / 30s / 45s / 60s / 2-5min / 3-8min
- **Hook suggere** (optionnel) : accroche proposee dans le calendrier

## Sources de donnees (4 couches)

### Couche 1 — Identite produit

Lire ces fichiers et en extraire le positionnement, le ton, les USPs :
- `neurolia-videos/content/calendar.md` → strategie editoriale, piliers
- Le CLAUDE.md du workspace racine → positionnement agence

**Regles fixes** :
- Vouvoiement (on s'adresse a des freelances/agences)
- Ton : professionnel, confiant, direct. Pas corporate, pas hype.
- Pas de jargon dev (pas de "React", "Next.js", "Supabase" sauf dans BuildLog)
- Chiffres concrets plutot que superlatifs vagues

### Couche 2 — Brief video

Si un brief existe (`content/scripts/[video-id]-brief.md`), le lire pour :
- Angle editorial
- Message cle
- CTA demande
- Contraintes (duree, safe zones, elements obligatoires)

### Couche 3 — Connaissance produit

Lire la documentation du dashboard pour ancrer le script dans des features reelles :
- `neurolia-dashboard/CLAUDE.md` → modules, stack
- `neurolia-dashboard/TODO.md` → features existantes
- Screenshots disponibles dans `public/screenshots/`

Le script DOIT decrire des features qui existent reellement. Ne pas inventer de fonctionnalites.

### Couche 4 — Anti-repetition

Lire les scripts deja produits :
- `content/scripts/*.md` (par date decroissante)
- Si aucun script encore produit → ignorer cette couche

**Regles anti-repetition** :
- Ne pas reutiliser le meme hook que les 3 derniers scripts
- Varier les structures (pas toujours question → reponse → CTA)
- Varier les CTAs
- Ne pas montrer le meme module 2 videos de suite (sauf angle different)

## Structure du script

### Format court (15-60s) — Reels/TikTok/Shorts

```
# Script — [Video ID] [Titre]

## Metadata
| Champ | Valeur |
|-------|--------|
| Type | [FeatureFlash / StatReveal / BeforeAfter / etc.] |
| Duree | [Xs] |
| Plateformes | [IG Reels, TikTok, YouTube Shorts] |
| Pilier | [Product Showcase / Problem-Solution / Behind the Build / Tips & Value / Social Proof] |

## Hook (0-3s)
**Voiceover** : "[texte exact a dire]"
**Visuel** : [description du visuel / animation]
**Text on screen** : "[texte affiche]"
**Accent word** : "[mot mis en valeur]"

## Body

### Scene 1 — [Titre scene] (Xs-Xs)
**Voiceover** : "[texte]"
**Visuel** : [description]
**Text on screen** : "[optionnel]"

### Scene 2 — [Titre scene] (Xs-Xs)
**Voiceover** : "[texte]"
**Visuel** : [description]

[... scenes additionnelles ...]

## CTA (dernieres Xs)
**Voiceover** : "[texte]"
**Visuel** : [logo + CTA button]
**Text on screen** : "[CTA text]"

## Voiceover complet
> [texte integral pour ElevenLabs, ponctuation soignee pour le rythme]

## Notes production
- [notes pour le storyboarder / codeur Remotion]
```

### Format long (2-10min) — YouTube

Meme structure mais avec des sections thematiques plus developpees, des transitions nommees, et un intro/outro.

## Regles par type de video

| Type | Hook | Corps | CTA |
|------|------|-------|-----|
| FeatureFlash | Problem statement ou stat choc | Feature en action (1-2 scenes) | "Lien en bio" |
| DashboardTour | Stat impressionnante | Pan cinematique module par module | "Decouvrez" |
| BeforeAfter | Douleur commune | Split screen chaos → dashboard | "Simplifiez" |
| StatReveal | Nombre anime | Contexte + explication | "Essayez" |
| BuildLog | "Watch me build..." | Code → UI transformation | "Built with [stack]" |
| QuickTip | "L'astuce que..." | Conseil concret + visuel | "Suivez pour plus" |
| ModuleDeepDive | Question ou probleme | Walkthrough complet features | "Testez gratuitement" |
| WorkflowDemo | Scenario reel | Demonstration end-to-end | "Commencez maintenant" |

## Duree voiceover par format

| Format | Duree | Mots voiceover (approx) |
|--------|-------|------------------------|
| 15s | 15s | 30-40 mots |
| 30s | 30s | 60-80 mots |
| 45s | 45s | 90-120 mots |
| 60s | 60s | 120-160 mots |
| 2min | 120s | 240-320 mots |
| 5min | 300s | 600-800 mots |

## Output

Ecrire le script dans `content/scripts/[video-id].md`

Convention video-id : `V-YYYY-WXX-NN` (ex: V-2026-W13-01)

## Affichage a l'operateur

Apres generation :

```
🎬 SCRIPT GENERE — [Video ID]

Type : [type] | Duree : [Xs] | Plateformes : [list]
Hook : "[hook text]"
Scenes : [N] | Mots voiceover : [N]
Anti-repetition : ✅ hook unique / ✅ structure variee / ✅ CTA different

✅ Valider ce script ?
✏️ Modifier (preciser quoi) ?
🔄 Regenerer avec un angle different ?
```

## Regles non negociables

1. **Voiceover = texte exact** — le script produit le texte mot pour mot qui sera envoye a ElevenLabs
2. **Timing realiste** — la duree totale des scenes DOIT correspondre a la duree cible
3. **Features reelles** — ne jamais decrire une feature qui n'existe pas dans le dashboard
4. **Hook first** — si le hook est faible, la video est morte. Investir du temps sur le hook.
5. **Vouvoiement** — toujours
6. **Un message par video** — pas 3 features en 30 secondes, une seule idee forte
7. **CTA contextuel** — pas de "likez et partagez", mais des CTAs lies au contenu
