---
name: section-builder
description: "Orchestrateur Phase B du pipeline website-workflow v4. Circuit en 2 etapes : frontend-design2 (decide + code) -> Technical Validator (verifie). frontend-design2 est le creative director ET le codeur — il decide le layout, les techniques et les dials. Utiliser pour toute construction UI en Phase B."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent
---

# Section Builder — Orchestrateur Phase B (v4)

## ARCHITECTURE

Ce skill orchestre un circuit de **2 etapes** pour coder chaque section.

**frontend-design2 est le creative director ET le codeur.** Pas d'intermediaire. Il lit le creative brief, decide l'approche visuelle, et code le composant.

```
+-------------------------------------------------------------+
|                    SECTION BUILDER (skill)                     |
|                                                               |
|  Etape 1 --> Claude + frontend-design2                        |
|              LIT le brief + les sources                       |
|              DECIDE layout, technique, dials                  |
|              CODE le composant                                |
|                                                               |
|  Etape 2 --> .claude/agents/technical-validator.md [haiku]    |
|              VERIFIE : tokens, a11y, responsive, anti-patterns|
|                    skills: [frontend-design2]                  |
|                                                               |
|  (2b opt) --> .claude/agents/visual-reviewer.md    [haiku]    |
|              EVALUE visuellement (si Playwright disponible)    |
+-------------------------------------------------------------+
```

## QUAND CE SKILL S'ACTIVE

Quand l'utilisateur demande de **coder un composant ou une section** dans un projet website-workflow :
- "Code le Hero de la homepage"
- "Construis la section Services"
- "Fais le header"
- "Code la page Contact"

## PREREQUIS — VERIFICATION OBLIGATOIRE

Verifier que ces fichiers existent :

1. Le creative brief dans `pipeline/output/03.5-wireframes/`
2. `pipeline/output/02-art-direction/project-dials.md`
3. `pipeline/output/02-art-direction/constraints.md`
4. `pipeline/output/02-art-direction/emotion-map.md`
5. `pipeline/output/02-art-direction/visual-vocabulary.md`
6. `pipeline/output/02-art-direction/ui-kit.md`
7. `app/globals.css`
8. `.claude/skills/frontend-design2/SKILL.md`

Si un fichier manque, **STOPPER**.

## LE CIRCUIT (2 ETAPES)

---

### ETAPE 1 : Lire, Decider, Coder (frontend-design2)

**C'est Claude qui fait tout** — direction creative ET code — avec le skill frontend-design2 charge.

**LECTURES OBLIGATOIRES (dans cet ordre) :**

1. **LIRE** `.claude/skills/frontend-design2/SKILL.md`
   -> Section 0 : rappelle que TU es le creative director
   -> Sections 1-10 : regles anti-slop, arsenal creatif, dials, architecture

2. **LIRE** `pipeline/output/03.5-wireframes/[page].md` > section demandee
   -> Contenu, emotion, contraintes — ton brief creatif

3. **LIRE** `pipeline/output/02-art-direction/project-dials.md`
   -> Dials globaux, Creative Palette, Techniques Exclues, Anti-Patterns

4. **LIRE** `pipeline/output/02-art-direction/emotion-map.md` > section
   -> Emotion primaire, secondaire, tension

5. **LIRE** `pipeline/output/02-art-direction/constraints.md`
   -> ON FAIT / ON NE FAIT PAS

6. **LIRE** `pipeline/output/02-art-direction/visual-vocabulary.md`
   -> Traductions design -> CSS

7. **LIRE** `pipeline/output/02-art-direction/ui-kit.md`
   -> Composants autorises

8. **LIRE** `app/globals.css`
   -> Tokens CSS disponibles

9. **REGARDER** `pipeline/input/references/screenshots/` (si images presentes)
   -> References visuelles

**PUIS DECIDER + CODER :**
- Layout ? (asymetrie, split, bento, full-bleed...)
- Technique(s) de la Creative Palette ? (max 2, ou aucune)
- Dials section ? (partir des globaux, ajuster selon l'emotion)
- Choreographie d'animation ?

**REGLES DE PRIORITE :**

| Priorite | Source |
|----------|--------|
| 1 (max) | Contraintes constraints.md |
| 2 | Regles de frontend-design2 SKILL.md |
| 3 (min) | Tes choix creatifs — liberte totale dans les gardes-fous |

**Output** : Le composant `.tsx`

---

### ETAPE 2 : Technical Validator

**LIRE** le composant `.tsx` cree a l'etape 1.

```
Agent(
  subagent_type: "technical-validator",
  model: "haiku",
  prompt: """
    SECTION : [PAGE] > [SECTION]
    CHEMIN PROJET : [CHEMIN_PROJET]

    CODE SOURCE DU COMPOSANT :
    [COLLER le code tsx complet]

    Verifie ce composant contre les regles techniques du projet.
  """
)
```

**Il ne verifie PAS** les choix creatifs — ce sont TES decisions.

**Action selon le verdict :**
- PASS -> Section suivante
- FAIL Type A (tokens) -> Correction auto, re-validate (max 1x)
- FAIL Type B (contraintes) -> Correction, re-validate (max 2x)

Les decisions creatives sont PRESERVEES meme en cas de FAIL technique.

---

### ETAPE 2b (optionnelle) : Visual Check

Si Playwright MCP disponible + `npm run dev` :

```
Agent(
  subagent_type: "visual-reviewer",
  model: "haiku",
  prompt: """
    SECTION : [PAGE] > [SECTION]
    URL : http://localhost:3000[/route]
    INTENTION : "[Ce que la section doit transmettre]"
    Prends un screenshot et evalue visuellement.
  """
)
```

Signal qualitatif, pas d'auto-correction.

---

## GESTION DE PLUSIEURS SECTIONS

1. Lire le creative brief -> identifier les sections
2. Circuit complet (1-2) pour CHAQUE section dans l'ordre
3. Informer l'utilisateur a la fin

## CAS SPECIAUX

### Layout (B01) — Dials GLOBAUX, pas de section dans le brief

### Polish (B04)

| Ajustement | Circuit |
|------------|---------|
| **Micro** (tokens, spacing) | Code direct |
| **Mineur** (animation, responsive) | Code + Etape 2 |
| **Majeur** (feeling, layout) | Circuit complet 1-2 |

### Composant non liste -> Demander a l'utilisateur, creer un mini-brief inline
