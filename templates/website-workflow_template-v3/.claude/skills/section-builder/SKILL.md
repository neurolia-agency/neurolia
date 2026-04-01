---
name: section-builder
description: "Orchestrateur Phase B du pipeline website-workflow v4. Lance le circuit d'agents (Creative Director -> Code + frontend-design2 -> Technical Validator) pour coder une section ou un composant. Utiliser pour toute construction UI en Phase B : layout, homepage, pages, polish."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent
---

# Section Builder — Orchestrateur Phase B (v4)

## ARCHITECTURE

Ce skill orchestre un circuit de **3 etapes sequentielles** pour coder chaque section.

L'etape 1 delegue au **Creative Director** (opus-4.6) qui DECIDE l'approche visuelle.
L'etape 2 est executee **directement par Claude** avec le skill frontend-design2.
L'etape 3 delegue au **Technical Validator** (haiku) pour verification technique.

```
+-------------------------------------------------------------+
|                    SECTION BUILDER (skill)                     |
|                                                               |
|  Etape 1 --> .claude/agents/creative-director.md  [opus-4.6] |
|              DECIDE : layout, technique, dials, choreographie |
|                                                               |
|  Etape 2 --> Claude direct + Read frontend-design2            |
|              CODE le composant selon la direction creative     |
|                                                               |
|  Etape 3 --> .claude/agents/technical-validator.md [haiku]    |
|              VERIFIE : tokens, a11y, responsive, anti-patterns|
|                    skills: [frontend-design2]                  |
|                                                               |
|  (3b opt) --> .claude/agents/visual-reviewer.md    [haiku]    |
|              EVALUE visuellement (si Playwright disponible)    |
+-------------------------------------------------------------+
```

## QUAND CE SKILL S'ACTIVE

Ce skill s'active quand l'utilisateur demande de **coder un composant ou une section** dans un projet qui utilise le pipeline website-workflow. Exemples :

- "Code le Hero de la homepage"
- "Construis la section Services"
- "Fais le header"
- "Code la page Contact"
- Toute demande de type B01 (layout), B02 (homepage), B03 (pages), B04 (polish)

## PREREQUIS — VERIFICATION OBLIGATOIRE

Avant de lancer le circuit, verifier que ces fichiers existent :

1. Le creative brief de la section dans `pipeline/output/03.5-wireframes/`
2. `pipeline/output/02-art-direction/project-dials.md` — Dials globaux + Creative Palette
3. `pipeline/output/02-art-direction/constraints.md` — ON FAIT / ON NE FAIT PAS
4. `pipeline/output/02-art-direction/emotion-map.md` — Emotions par section
5. `pipeline/output/02-art-direction/visual-vocabulary.md` — Vocabulaire design
6. `pipeline/output/02-art-direction/ui-kit.md` — Composants autorises
7. `app/globals.css` — Design tokens
8. `.claude/skills/frontend-design2/SKILL.md` — Skill qualite UI
9. `.claude/agents/creative-director.md` — Custom subagent
10. `.claude/agents/technical-validator.md` — Custom subagent

Si un fichier manque, **STOPPER** et prevenir l'utilisateur.

## LE CIRCUIT (3 ETAPES SEQUENTIELLES)

Pour chaque section demandee, executer les 3 etapes dans l'ordre.

---

### ETAPE 1 : Creative Director

**Objectif** : DECIDER l'approche visuelle — layout, technique(s), dials, choreographie.

**Deleguer au custom subagent `creative-director`** via Agent tool :

```
Agent(
  subagent_type: "creative-director",
  model: "opus-4.6",
  prompt: """
    SECTION : [PAGE] > [SECTION]
    PROJET : [NOM_PROJET] — Secteur : [SECTEUR/DOMAINE DU CLIENT]
    CHEMIN : [CHEMIN_PROJET]

    Lis le creative brief et les fichiers brand/art-direction,
    puis produis ta direction creative dans : [CHEMIN]/_preflight/[page]/[section]-creative-direction.md
  """
)
```

Le subagent sait quels fichiers lire et quelles decisions prendre — ses instructions sont dans `.claude/agents/creative-director.md`.

**Verification** : Confirmer que `_preflight/[page]/[section]-creative-direction.md` a ete cree et contient un "Resume en 1 phrase" + des decisions de layout et technique.

---

### ETAPE 2 : Code avec frontend-design2

**Objectif** : Coder le composant React/Next.js en implementant les DECISIONS du Creative Director.

**C'est Claude qui code directement** (pas un subagent).

**AVANT de coder, executer ces 2 lectures :**

1. **LIRE** `.claude/skills/frontend-design2/SKILL.md` avec l'outil Read
   -> Regles anti-slop, 100 AI Tells, architecture composants, arsenal creatif

2. **LIRE** `_preflight/[page]/[section]-creative-direction.md`
   -> Decisions du Creative Director : layout, technique, dials, palette, intention

**REGLES DE PRIORITE pendant le coding :**

| Priorite | Source | Exemple |
|----------|--------|---------|
| 1 (max) | Contraintes constraints.md (via direction creative > INTERDIT) | "ON NE FAIT PAS : gradients" |
| 2 | Decisions du Creative Director (layout, technique, dials) | "Asymetrie 40/60 + parallax leger" |
| 3 | Regles de frontend-design2 SKILL.md | Anti-slop, architecture, conventions |
| 4 (min) | Defaults de frontend-design2 | Dials (8, 6, 4) si pas d'override |

**Pendant le coding :**
- Le layout vient de la direction creative, pas de l'improvisation
- La technique vient de la direction creative
- Les dials section viennent de la direction creative
- Chaque composant respecte ui-kit.md (via direction creative > Contenu Reference)
- Toutes les valeurs visuelles passent par les tokens CSS de globals.css
- Server Components par defaut. `"use client"` UNIQUEMENT si hooks necessaires
- Verifier package.json avant tout import de librairie tierce

**Output** : Le composant `.tsx` dans le bon repertoire

---

### ETAPE 3 : Technical Validator

**Objectif** : Verifier que le code respecte les regles TECHNIQUES du projet.

**LIRE** le composant `.tsx` cree a l'etape 2.

**Deleguer au custom subagent `technical-validator`** via Agent tool :

```
Agent(
  subagent_type: "technical-validator",
  model: "haiku",
  prompt: """
    SECTION : [PAGE] > [SECTION]
    CHEMIN PROJET : [CHEMIN_PROJET]

    CODE SOURCE DU COMPOSANT :
    [COLLER le code tsx complet]

    RESUME DIRECTION :
    "[Coller le 'Resume en 1 phrase' de la direction creative]"

    Verifie ce composant contre les regles techniques du projet.
  """
)
```

Le subagent verifie : tokens, a11y, responsive, anti-patterns, server/client, ui-kit, constraints.
Il ne verifie PAS les choix creatifs (layout, technique, dials).

**Action selon le verdict :**
- Si PASS -> Passer a la section suivante (ou etape 3b optionnelle)
- Si PASS avec reserves -> Informer l'utilisateur, continuer
- Si FAIL -> Appliquer le Protocole FAIL ci-dessous

### Protocole FAIL

**Type A — Tokens/CSS** (valeurs hardcodees, mauvais var()) :
-> Correction automatique ciblee. Re-lancer Technical Validator uniquement.
-> Max 1 iteration. Si echec -> STOP.

**Type B — Contraintes projet** (violation ON FAIT / ON NE FAIT PAS, anti-patterns) :
-> Correction du code. Re-lancer Technical Validator uniquement.
-> Max 2 iterations. Si echec -> STOP + rapport.

**Regle** : Les decisions creatives du Creative Director sont RESPECTEES meme en cas de FAIL technique. On corrige le code pour respecter les regles techniques, on ne change pas le layout ou la technique.

---

### ETAPE 3b (optionnelle) : Visual Check

**Prerequis** : Playwright MCP disponible + serveur dev en cours (`npm run dev`)

Si disponible, apres PASS du Technical Validator :

```
Agent(
  subagent_type: "visual-reviewer",
  model: "haiku",
  prompt: """
    SECTION : [PAGE] > [SECTION]
    URL : http://localhost:3000[/route]
    DIRECTION : [CHEMIN]/_preflight/[page]/[section]-creative-direction.md

    Prends un screenshot et evalue visuellement.
  """
)
```

Le Visual Reviewer produit une evaluation qualitative — pas un PASS/FAIL.
Informer l'utilisateur du resultat. Ne PAS auto-corriger.

---

## GESTION DE PLUSIEURS SECTIONS

Quand l'utilisateur demande de coder une **page entiere** :

1. Lire le creative brief de la page -> identifier toutes les sections dans l'ordre
2. Executer le circuit complet (etapes 1-3) pour CHAQUE section dans l'ordre
3. A la fin, informer l'utilisateur

### Pipeline Overlapping (optimisation multi-sections)

Quand une page a 3+ sections :

```
Section 1 : [1-Creative Dir.] -> [2-CODE] -> [3-Validate]
Section 2 :                      [1-Creative Dir.] -> [2-CODE] -> [3-Validate]
Section 3 :                                           [1-Creative Dir.] -> ...
```

**Principe** : pendant que Claude code la section N (etape 2), lancer en parallele l'etape 1 de la section N+1 (Creative Director en background).

**Regles du pipeline overlapping** :
- L'etape 1 de N+1 peut tourner EN PARALLELE de l'etape 2 de N
- L'etape 2 (code) reste SEQUENTIELLE — une seule section codee a la fois
- L'etape 3 de N doit finir AVANT l'etape 2 de N+1
- Si N+1 depend visuellement de N (transition scroll, meme background), NE PAS overlapper

## CAS SPECIAUX

### Layout (B01) — Header / Footer
- Le Creative Director utilise les dials **GLOBAUX** (pas de section specifique dans le brief)
- Header/footer sont transversaux -> coherence avec toutes les pages

### Polish (B04) — Ajustement d'un composant existant

3 niveaux :

| Ajustement | Circuit | Exemple |
|------------|---------|---------|
| **Micro** (tokens, spacing, couleur) | Etape 2 seulement | "Augmente le padding du Hero" |
| **Mineur** (animation, etat, responsive) | Etape 2 + Etape 3 | "Ajoute un hover effect" |
| **Majeur** (feeling, layout, technique) | Circuit complet 1-2-3 | "Le Hero ne transmet pas la bonne emotion" |

### Composant non liste dans le creative brief
- Stopper et demander a l'utilisateur de decrire le composant
- Creer un mini-brief inline avant de lancer le circuit

## TRACE

```
_preflight/
├── header-creative-direction.md      <- Etape 1
├── footer-creative-direction.md
├── homepage/
│   ├── hero-creative-direction.md
│   ├── services-creative-direction.md
│   └── ...
├── services/
│   └── ...
└── validation/                       <- Etape 3 (pass final B05)
    ├── homepage-report.md
    └── ...
```
