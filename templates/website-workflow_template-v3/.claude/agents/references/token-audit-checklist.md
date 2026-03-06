# Token Audit — Checklist Détaillée

Référence complète pour l'agent `token-auditor`. Ce fichier contient les catégories d'audit détaillées.

## A. Couverture visual-vocabulary.md → globals.css

Pour CHAQUE catégorie de visual-vocabulary.md, vérifier que chaque terme a un token CSS correspondant dans globals.css.

```
□ A1. ESPACEMENTS
   Chaque terme (whitespace généreux, whitespace mobile, padding section, etc.)
   → a une variable CSS (--spacing-section, --spacing-section-mobile, etc.)
   → la valeur dans globals.css correspond à celle de visual-vocabulary.md

□ A2. TYPOGRAPHIE
   Chaque terme (typo massive, titre section, corps confortable, etc.)
   → est implémenté dans @layer base (h1, h2, h3, p, etc.)
   → utilise clamp() pour le responsive (pas de valeurs fixes)
   → les polices correspondent à typography.md

□ A3. TRANSITIONS & ANIMATIONS
   Chaque terme (hover subtil, hover bouton, apparition douce, etc.)
   → a une variable CSS (--transition-hover, --transition-button, etc.)
   → inclut duration + easing (pas juste la durée)

□ A4. COULEURS
   Chaque terme (accent signature, fond principal, fond alternatif, etc.)
   → a un token sémantique (--accent, --background, --secondary, etc.)
   → le format est OKLCH (pas de hex dans les déclarations de variables)
   → les valeurs correspondent à colors.md

□ A5. FORMES & RADIUS
   Chaque terme (radius standard, radius large, radius pill, etc.)
   → a un token ou utilise le système --radius avec calc()
   → les valeurs correspondent à visual-vocabulary.md

□ A6. OMBRES
   Chaque terme (ombre subtle, ombre hover, ombre élevée)
   → a une variable CSS (--shadow-subtle, --shadow-hover, --shadow-elevated)
   → la teinte d'ombre est cohérente avec la palette

□ A7. LAYOUT
   Chaque terme (conteneur, grille standard, full-bleed, etc.)
   → a un token ou une utility class dans @layer utilities
   → max-width-content et max-width-text sont définis

□ A8. BREAKPOINTS
   Les breakpoints de visual-vocabulary.md
   → sont documentés (même si Tailwind les gère nativement)
```

## B. Couverture ui-kit.md → globals.css

```
□ B1. BOUTONS
   Les valeurs de padding, radius, hover du ui-kit
   → correspondent aux tokens de globals.css
   → pas de valeur en dur dans le ui-kit qui n'a pas de token

□ B2. CARDS
   Background, border, shadow, radius, padding
   → tous référencent des tokens existants

□ B3. INPUTS
   Background, border, radius, focus ring, error color
   → tous référencent des tokens existants

□ B4. ÉTATS INTERACTIFS
   Loading (skeleton pulse), empty state, error state
   → les couleurs référencées existent comme tokens
```

## C. Qualité des tokens

```
□ C1. AUCUN PLACEHOLDER
   Rechercher : [X], [Y], [Z], Xrem, Xpx, [L], [C], [H], oklch([L]
   → Si trouvé : FAIL critique. Le token n'est pas prêt.

□ C2. PAS DE HEX DANS :root
   Rechercher des couleurs #xxx ou #xxxxxx dans les déclarations de variables
   → Si trouvé : convertir en OKLCH

□ C3. PAS DE VALEURS MAGIQUES
   Rechercher des valeurs hardcodées dans @layer base et @layer utilities
   → Chaque valeur devrait référencer un token (var(--xxx))
   → Exception : les valeurs Tailwind (@apply) sont OK

□ C4. CONTRASTE WCAG AA
   Vérifier que les paires suivantes ont un contraste suffisant :
   - --foreground sur --background (≥ 4.5:1)
   - --foreground sur --muted (≥ 4.5:1)
   - --primary-foreground sur --primary (≥ 4.5:1)
   - --accent-foreground sur --accent (≥ 4.5:1)
   Note : tu ne peux pas calculer les ratios OKLCH — signale les paires à vérifier manuellement.

□ C5. COHÉRENCE POLICES
   --font-sans dans globals.css = police de typography.md
   Pas d'Inter (anti-pattern frontend-design2)

□ C6. @theme inline COMPLET
   Chaque token sémantique de :root est mappé dans @theme inline
   Pas de token orphelin (défini dans :root mais absent de @theme)
```

## D. Cohérence entre fichiers sources

```
□ D1. colors.md ↔ globals.css
   Chaque couleur nommée dans colors.md a un token correspondant
   Les valeurs OKLCH correspondent

□ D2. typography.md ↔ globals.css
   Les polices déclarées dans typography.md sont chargées (next/font/google ou @font-face)
   L'échelle typographique de typography.md est implémentée dans @layer base

□ D3. constraints.md → tokens
   Si constraints.md mentionne un radius spécifique → le token existe
   Si constraints.md interdit les ombres → vérifier que les tokens shadow sont cohérents
```
