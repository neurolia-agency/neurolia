---
name: section-builder
description: "Orchestrateur Phase B du pipeline website-workflow v2. Lance automatiquement le circuit d'agents (Context Assembler → Aesthetic Director → Code + frontend-design2 → Constraint Validator) pour coder une section ou un composant. Utiliser pour toute construction UI en Phase B : layout, homepage, pages, polish."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
---

# Section Builder — Orchestrateur Phase B

## ARCHITECTURE

Ce skill orchestre un circuit de **4 étapes séquentielles** pour coder chaque section.

Les étapes 1, 2 et 4 délèguent à des **custom subagents** définis dans `.claude/agents/`. Ces agents ont leurs instructions complètes dans leur fichier de définition — le prompt Task ne contient que les **données dynamiques** de l'invocation.

L'étape 3 (coding) est exécutée **directement par Claude** avec chargement explicite du skill frontend-design2.

```
┌─────────────────────────────────────────────────────────────┐
│                    SECTION BUILDER (skill)                    │
│                                                               │
│  Étape 1 ──→ .claude/agents/context-assembler.md    [haiku]  │
│  Étape 2 ──→ .claude/agents/aesthetic-director.md   [sonnet] │
│  Étape 3 ──→ Claude direct + Read frontend-design2           │
│  Étape 4 ──→ .claude/agents/constraint-validator.md [haiku]  │
│                                     └─ skills: [frontend-design2] │
└─────────────────────────────────────────────────────────────┘
```

## QUAND CE SKILL S'ACTIVE

Ce skill s'active quand l'utilisateur demande de **coder un composant ou une section** dans un projet qui utilise le pipeline website-workflow v2. Exemples de déclencheurs :

- "Code le Hero de la homepage"
- "Construis la section Services"
- "Fais le header"
- "Code la page Contact"
- Toute demande de type B01 (layout), B02 (homepage), B03 (pages), B04 (polish d'un nouveau composant)

## PRÉREQUIS — VÉRIFICATION OBLIGATOIRE

Avant de lancer le circuit, vérifier que ces fichiers existent dans le projet :

1. `pipeline/output/02-art-direction/project-dials.md` — Dials par section
2. `pipeline/output/02-art-direction/constraints.md` — Règles ON FAIT / ON NE FAIT PAS
3. `pipeline/output/02-art-direction/ui-kit.md` — Composants autorisés
4. `pipeline/output/02-art-direction/emotion-map.md` — Émotions par section
5. `pipeline/output/02-art-direction/visual-vocabulary.md` — Traductions visuelles
6. `app/globals.css` — Design tokens
7. Le wireframe de la section dans `pipeline/output/03.5-wireframes/`
8. `.claude/skills/frontend-design2/SKILL.md` — Skill de qualité UI (CRITIQUE)
9. `.claude/agents/context-assembler.md` — Custom subagent
10. `.claude/agents/aesthetic-director.md` — Custom subagent
11. `.claude/agents/constraint-validator.md` — Custom subagent (avec `skills: [frontend-design2]`)

Si un fichier manque, **STOPPER** et prévenir l'utilisateur. Ne pas deviner. Ne pas continuer sans contexte complet.

## LE CIRCUIT (4 ÉTAPES SÉQUENTIELLES)

Pour chaque section demandée, exécuter les 4 étapes dans l'ordre. Ne jamais sauter une étape.

---

### ÉTAPE 1 : Context Assembler

**Objectif** : Résoudre tous les pointeurs d'une section en un bloc de contexte auto-suffisant.

**Déléguer au custom subagent `context-assembler`** via Task tool :

```
Task(
  subagent_type: "context-assembler",
  model: "haiku",
  prompt: """
    SECTION : [PAGE] > [SECTION]
    PROJET : [NOM_PROJET] — chemin racine : [CHEMIN_PROJET]

    Résous le context block pour cette section.
    Écris le résultat dans : [CHEMIN]/_preflight/[page]/[section]-context.md
  """
)
```

Le subagent sait quels fichiers lire et quel format produire — ses instructions sont dans `.claude/agents/context-assembler.md`.

**Vérification** : Confirmer que `_preflight/[page]/[section]-context.md` a été créé. Si le subagent signale des ⚠️ NON RÉSOLU, les remonter à l'utilisateur avant de continuer.

---

### ÉTAPE 2 : Aesthetic Director

**Objectif** : Transformer le context block technique en direction créative sensorielle.

**LIRE** `_preflight/[page]/[section]-context.md` pour récupérer le context block produit à l'étape 1.

**Déléguer au custom subagent `aesthetic-director`** via Task tool :

```
Task(
  subagent_type: "aesthetic-director",
  model: "sonnet",
  prompt: """
    SECTION : [PAGE] > [SECTION]
    PROJET : [NOM_PROJET] — Secteur : [SECTEUR/DOMAINE DU CLIENT]
    CHEMIN : [CHEMIN_PROJET]

    CONTEXT BLOCK :
    [COLLER le contenu intégral de _preflight/[page]/[section]-context.md]

    Produis la direction créative et écris-la dans : [CHEMIN]/_preflight/[page]/[section]-direction.md
  """
)
```

Le subagent connaît les règles de calibrage par dials et le format de sortie — ses instructions sont dans `.claude/agents/aesthetic-director.md`.

**Vérification** : Confirmer que `_preflight/[page]/[section]-direction.md` a été créé et contient un "Résumé en 1 phrase".

---

### ÉTAPE 3 : Code avec frontend-design2 — CHARGEMENT GARANTI

**Objectif** : Coder le composant React/Next.js en s'appuyant sur les 2 fichiers preflight ET les règles de qualité du skill frontend-design2.

**⚠️ C'est Claude qui code directement** (pas un subagent). Le skill frontend-design2 n'est PAS automatiquement chargé à cette étape. Il faut le charger explicitement.

**AVANT de coder, exécuter ces 3 lectures dans cet ordre :**

1. **LIRE** `.claude/skills/frontend-design2/SKILL.md` avec l'outil Read
   → Ce fichier contient les règles anti-slop, les 100 AI Tells, l'architecture composants, les dials par défaut, et l'arsenal créatif (Section 8). **Tout son contenu s'applique au coding.**

2. **LIRE** `_preflight/[page]/[section]-context.md`
   → Données factuelles : contenu, tokens CSS, contraintes, dials section, composants ui-kit

3. **LIRE** `_preflight/[page]/[section]-direction.md`
   → Intention créative : expérience sensorielle, palette, techniques, interdits

**RÈGLES DE PRIORITÉ pendant le coding :**

| Priorité | Source | Exemple |
|----------|--------|---------|
| 1 (max) | Contraintes du context block (constraints.md) | "ON NE FAIT PAS : gradients" |
| 2 | Dials du context block (project-dials.md) | VARIANCE=5 override le default 8 |
| 3 | Règles de frontend-design2 SKILL.md | Anti-slop, architecture, conventions |
| 4 (min) | Defaults de frontend-design2 | Dials (8, 6, 4) si pas d'override |

**Pendant le coding :**
- Chaque composant respecte ui-kit.md (variantes de boutons, cards, inputs)
- Toutes les valeurs visuelles passent par les tokens CSS de globals.css (pas de hardcode)
- Les techniques viennent de la direction créative (étape 2), pas de l'improvisation
- Server Components par défaut. `"use client"` UNIQUEMENT si hooks nécessaires
- Vérifier package.json avant tout import de librairie tierce

**Output** : Le composant `.tsx` dans le bon répertoire (`components/sections/`, `components/layout/`, etc.)

---

### ÉTAPE 4 : Constraint Validator

**Objectif** : Vérifier systématiquement que le code respecte toutes les règles du projet.

**Note** : Ce subagent a `skills: [frontend-design2]` dans son frontmatter — le skill est **préchargé automatiquement** dans son contexte. Pas besoin de le lui passer.

**LIRE** le composant `.tsx` créé à l'étape 3 pour récupérer le code source.
**LIRE** `_preflight/[page]/[section]-direction.md` pour récupérer le "Résumé en 1 phrase".

**Déléguer au custom subagent `constraint-validator`** via Task tool :

```
Task(
  subagent_type: "constraint-validator",
  model: "haiku",
  prompt: """
    SECTION : [PAGE] > [SECTION]
    CHEMIN PROJET : [CHEMIN_PROJET]

    CODE SOURCE DU COMPOSANT :
    [COLLER le code tsx complet]

    CONTEXT BLOCK :
    [COLLER le contenu de _preflight/[page]/[section]-context.md]

    RÉSUMÉ DIRECTION :
    "[Coller le 'Résumé en 1 phrase' de la direction créative]"

    Vérifie ce composant contre toutes les règles du projet.
  """
)
```

Le subagent connaît la checklist de vérification, les sources de règles à lire, et le format de rapport — ses instructions sont dans `.claude/agents/constraint-validator.md`. Le skill **frontend-design2 est déjà dans son contexte** (garanti par `skills: [frontend-design2]` dans le frontmatter).

**Action selon le verdict :**
- Si **✅ PASS** → Passer à la section suivante
- Si **⚠️ PASS avec réserves** → Informer l'utilisateur des réserves, continuer
- Si **❌ FAIL** → Corriger le code en suivant les suggestions, puis relancer UNIQUEMENT l'étape 4 (pas tout le circuit)

---

## GESTION DE PLUSIEURS SECTIONS

Quand l'utilisateur demande de coder une **page entière** (ex: "code la homepage") :

1. Lire le wireframe de la page → identifier toutes les sections dans l'ordre
2. Exécuter le circuit complet (étapes 1-4) pour CHAQUE section, **une par une, dans l'ordre du wireframe**
3. Ne pas paralléliser les sections — chaque section peut dépendre visuellement de la précédente
4. À la fin, informer l'utilisateur : "[X] sections codées, [Y] passes de validation réussies"

## CAS SPÉCIAUX

### Layout (B01) — Header / Footer
- Utiliser les dials **GLOBAUX** (pas de section spécifique)
- Le header/footer sont transversaux → contraintes de cohérence avec toutes les pages

### Polish (B04) — Ajustement d'un composant existant
- Si l'ajustement est mineur (correction de spacing, couleur) → Étape 3 + Étape 4 seulement
- Si l'ajustement change le feeling → Circuit complet (1-2-3-4)

### Composant non listé dans le wireframe
- Stopper et demander à l'utilisateur de décrire le composant
- Créer un mini-wireframe inline avant de lancer le circuit

## TRACE

Le circuit laisse une trace dans `_preflight/` pour chaque composant :
```
_preflight/
├── header-context.md          ← Étape 1
├── header-direction.md        ← Étape 2
├── footer-context.md
├── footer-direction.md
├── homepage/
│   ├── hero-context.md
│   ├── hero-direction.md
│   ├── services-context.md
│   ├── services-direction.md
│   └── ...
├── services/
│   └── ...
└── validation/                ← Étape 4 (pass final B05)
    ├── homepage-report.md
    └── ...
```

Ces fichiers sont la preuve que le circuit a tourné. Ils permettent de débugger si un composant ne correspond pas à l'intention.
