---
paths:
  - "components/**"
  - "app/**"
  - "_preflight/**"
---

# Phase B : Circuit d'Agents

Pour chaque section demandée, le skill section-builder orchestre :

1. Context Assembler (haiku)
   Lit : wireframe + project-dials + emotion-map + constraints + visual-vocabulary + ui-kit + globals.css
   Produit : _preflight/[page]/[section]-context.md

2. Aesthetic Director (opus-4.6)
   Lit : context block
   Produit : _preflight/[page]/[section]-direction.md

3. Code (Claude + frontend-design2)
   Lit : context block + direction créative
   Produit : composant .tsx

4. Constraint Validator (haiku)
   Lit : code + context block + constraints + project-dials + ui-kit + globals.css
   Produit : rapport PASS/FAIL → corrections si nécessaire

**Règle** : Ne jamais écrire de composants UI sans passer par le circuit d'agents.
