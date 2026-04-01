---
paths:
  - "components/**"
  - "app/**"
  - "_preflight/**"
---

# Phase B : Circuit v4 (2 etapes)

Pour chaque section demandee, le skill section-builder orchestre :

1. Code (Claude + frontend-design2)
   frontend-design2 EST le creative director. Il lit le creative brief + toutes les sources,
   DECIDE le layout, la technique et les dials, puis CODE le composant.
   Lit : creative brief + project-dials + emotion-map + constraints + visual-vocabulary + ui-kit + globals.css + screenshots
   Produit : composant .tsx

2. Technical Validator (haiku)
   Verifie : tokens, a11y, responsive, anti-patterns, server/client
   NE verifie PAS : layout, technique, dials (decisions creatives de fd2)
   Produit : rapport PASS/FAIL

2b. Visual Check (optionnel, si Playwright disponible)

**Regle** : Ne jamais ecrire de composants UI sans passer par le circuit.
