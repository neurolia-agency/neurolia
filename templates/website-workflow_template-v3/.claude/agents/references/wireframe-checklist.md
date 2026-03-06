# Wireframe Validation — Checklist Détaillée

Référence complète pour l'agent `wireframe-validator`. Ce fichier contient les dimensions de validation par section, le format attendu et les critères de qualité.

## A. Couverture Sitemap → Wireframes

```
□ A1. Chaque page listée dans 03-sitemap.md a un fichier .md dans 03.5-wireframes/
□ A2. Chaque section listée dans le sitemap pour une page existe dans le wireframe correspondant
□ A3. L'ordre des sections dans le wireframe suit l'ordre du sitemap
□ A4. Aucune section "fantôme" dans le wireframe (absente du sitemap)
```

## B. Complétude des sections (7 champs obligatoires)

Pour CHAQUE section de CHAQUE wireframe, vérifier :

```
□ B1. CONTENU présent — au moins 1 élément (H1, baseline, CTA, items, etc.)
     Notation correcte : `fichier.md > clé` (pas de texte en dur sauf placeholders explicites)

□ B2. LAYOUT présent — description précise de la structure
     FAIL si : "centré", "plein écran", "classique", ou autre terme vague sans structure
     PASS si : "Split screen 60/40", "Grid 2 colonnes asymétrique", "Zig-zag alternée", etc.

□ B3. FOND présent — référence visual-vocabulary.md > couleurs > [terme]
     FAIL si : couleur hex en dur sans référence au vocabulaire visuel

□ B4. ÉMOTION présente — référence emotion-map.md > [Page] > [Section]
     Doit contenir : émotion primaire au minimum
     Bonus : émotion secondaire, tension visuelle

□ B5. DIALS présents — référence project-dials.md > [Section]
     Format attendu : VARIANCE: [val] | MOTION: [val] | DENSITY: [val]
     FAIL si : dials absents ou sans valeurs numériques

□ B6. CONTRAINTES listées — numéros depuis constraints.md
     Format attendu : `constraints.md > ON FAIT > #X, #Y` | `ON NE FAIT PAS > #Z`
     FAIL si : aucune contrainte listée

□ B7. INTERACTION ou TECHNIQUE — au moins l'un des deux
     Interaction : hover, scroll, click avec référence visual-vocabulary.md
     Technique : depuis project-dials.md > Arsenal (si applicable)
     PASS si technique = "Aucune technique spéciale" (c'est une valeur valide)
```

## C. Validité des références croisées

```
□ C1. Chaque `positioning.md > [clé]` → la clé existe dans positioning.md
□ C2. Chaque `services.md > [clé]` → la clé existe dans services.md
□ C3. Chaque `emotion-map.md > [Page] > [Section]` → la section existe dans emotion-map.md
□ C4. Chaque `project-dials.md > [Section]` → la section a des dials définis
□ C5. Chaque `constraints.md > ON FAIT > #X` → le numéro existe
□ C6. Chaque `constraints.md > ON NE FAIT PAS > #X` → le numéro existe
□ C7. Chaque `visual-vocabulary.md > [catégorie] > [terme]` → le terme existe
□ C8. Chaque technique référencée → présente dans project-dials.md > Arsenal > Techniques retenues
```

## D. Qualité structurelle

```
□ D1. Chaque wireframe a un header avec Route et Objectif
□ D2. Les sections sont numérotées séquentiellement (pas de trou)
□ D3. Chaque wireframe commence par `> Dérive de :` avec ses sources
□ D4. Pas de texte en dur là où une référence `fichier.md > clé` est attendue
     Exception : descriptions de layout, interactions, et annotations
□ D5. Pas de placeholder [TODO], [À DÉFINIR], [???] non résolu
```
