---
paths:
  - "components/**"
  - "app/**"
  - "_preflight/**"
---

# Phase B : Circuit d'Agents v4

Pour chaque section demandee, le skill section-builder orchestre :

1. Creative Director (opus-4.6)
   Lit : creative brief + project-dials + emotion-map + constraints + visual-vocabulary + ui-kit + globals.css + screenshots
   DECIDE : layout, technique(s), dials section, choreographie
   Produit : _preflight/[page]/[section]-creative-direction.md

2. Code (Claude + frontend-design2)
   Lit : creative direction + frontend-design2 SKILL.md
   Produit : composant .tsx

3. Technical Validator (haiku)
   Lit : code + constraints + ui-kit + globals.css
   Verifie : tokens, a11y, responsive, anti-patterns, server/client
   NE verifie PAS : layout, technique, dials (decisions creatives)
   Produit : rapport PASS/FAIL -> corrections si necessaire

3b. Visual Check (optionnel, si Playwright disponible)
   Prend un screenshot + evalue qualitativement

**Regle** : Ne jamais ecrire de composants UI sans passer par le circuit d'agents.
