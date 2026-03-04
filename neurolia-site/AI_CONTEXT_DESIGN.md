# AI Context Design — neurolia-site

Contexte opérationnel pour travailler le design avec Claude Code et Gemini CLI dans ce projet.

## Objectif
- Permettre une cohabitation propre entre agents.
- Accélérer les itérations design sans conflit de responsabilités.
- Garder une base stable pour l'implémentation Next.js.

## Rôles
- Gemini CLI: analyse design, critiques, propositions de variantes, priorisation UX/UI.
- Claude Code: implémentation code, refactor local, corrections lint/build/tests.

## Convention de responsabilité
- Un seul agent "writer" par branche.
- Recommandé: Gemini propose, Claude implémente.
- Si Gemini édite du code, utiliser une branche dédiée et relecture stricte avant merge.

## Lecture autorisée pour Gemini (priorité)
1. `CLAUDE.md`
2. `README.md`
3. `pipeline/stages/B01-layout.md`
4. `pipeline/stages/B02-homepage.md`
5. `pipeline/stages/B03-pages.md`
6. `pipeline/stages/B04-polish.md`
7. `pipeline/stages/B05-validate.md`
8. `pipeline/workflow/DESIGN_STACK.md`
9. `pipeline/workflow/TYPOGRAPHY.md`
10. `app/globals.css`
11. `app/page.tsx`
12. `components/sections/*.tsx`
13. `components/pages/**/*.tsx`
14. `tailwind.config.ts`
15. `package.json`

## Lecture à éviter (bruit)
- `node_modules/`
- `.next/`
- `pipeline/output/` (lecture possible, mais ne pas modifier)
- Fichiers binaires volumineux non nécessaires à la tâche

## Fichiers éditables (design)
- `app/globals.css`
- `app/page.tsx`
- `components/sections/*.tsx`
- `components/pages/**/*.tsx`
- `components/ui/*.tsx`

## Fichiers non éditables
- `pipeline/output/**`
- `input/**` (sauf demande explicite)

## Workflow concret
1. Lire `CLAUDE.md` puis ce fichier.
2. Ouvrir les stages B* concernés et identifier le scope.
3. Définir un objectif visuel mesurable (lisibilité, contraste, hiérarchie, conversion).
4. Produire une proposition concise (avant/après, sections impactées, risques).
5. Implémenter dans une branche dédiée.
6. Valider localement:
   - `cd neurolia-site && npm run lint`
   - `cd neurolia-site && npm run dev`
7. Documenter les changements (sections, tokens, impacts responsive).

## Critères de validation design
- Hiérarchie visuelle lisible sur desktop et mobile.
- Contrastes cohérents avec les tokens.
- Cohérence avec l'ADN visuel Neurolia (terracotta, rythme, typographie).
- Aucune régression évidente sur les sections non ciblées.

## Handoff minimal entre agents
- Scope exact des fichiers modifiés.
- Décisions design prises et pourquoi.
- Vérifications effectuées (lint/manual).
- Points ouverts.
