# Creative Brief Validation — Checklist Detaillee

Reference complete pour l'agent `wireframe-validator`. Ce fichier contient les dimensions de validation par section, le format attendu et les criteres de qualite.

## A. Couverture Sitemap → Creative Briefs

```
A1. Chaque page listee dans 03-sitemap.md a un fichier .md dans 03.5-wireframes/
A2. Chaque section listee dans le sitemap pour une page existe dans le brief correspondant
A3. L'ordre des sections dans le brief suit l'ordre du sitemap
A4. Aucune section "fantome" dans le brief (absente du sitemap)
```

## B. Completude des sections (3 champs obligatoires)

Pour CHAQUE section de CHAQUE creative brief, verifier :

```
B1. CONTENU present — au moins 1 element (H1, baseline, CTA, items, etc.)
    Notation correcte : `fichier.md > cle` (pas de texte en dur sauf placeholders explicites)

B2. EMOTION presente — reference emotion-map.md > [Page] > [Section]
    Doit contenir : emotion primaire au minimum
    Bonus : tension visuelle

B3. CONTRAINTES listees — numeros depuis constraints.md
    Format attendu : `constraints.md > ON FAIT > #X, #Y` | `ON NE FAIT PAS > #Z`
    FAIL si : aucune contrainte listee
```

## C. Validite des references croisees

```
C1. Chaque `positioning.md > [cle]` -> la cle existe dans positioning.md
C2. Chaque `services.md > [cle]` -> la cle existe dans services.md
C3. Chaque `emotion-map.md > [Page] > [Section]` -> la section existe dans emotion-map.md
C4. Chaque `constraints.md > ON FAIT > #X` -> le numero existe
C5. Chaque `constraints.md > ON NE FAIT PAS > #X` -> le numero existe
C6. Si des references visuelles pointent vers des fichiers -> les fichiers existent
```

## D. Qualite

```
D1. Chaque brief a un header avec Route et Objectif
D2. Les sections sont numerotees sequentiellement (pas de trou)
D3. Chaque brief commence par `> Derive de :` avec ses sources
D4. Pas de texte en dur la ou une reference `fichier.md > cle` est attendue
    Exception : notes, references visuelles, descriptions
D5. Pas de placeholder [TODO], [A DEFINIR], [???] non resolu
D6. Les emotions sont SPECIFIQUES — pas de "bonne ambiance" ou "feeling positif"
    PASS : "Desir immediat (faim + curiosite)"
    FAIL : "Emotion positive", "Bonne impression"
D7. Le brief ne prescrit PAS de layout, technique, dials ou animation
    FAIL si : "Split screen 40/60", "Sticky Scroll Stack", "VARIANCE: 6"
    PASS si : "densite minimale", "le visuel domine" (ce sont des INTENTIONS, pas des specs)
```
