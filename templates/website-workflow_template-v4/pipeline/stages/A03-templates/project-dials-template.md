# Project Dials — [NOM_PROJET]

<!-- Derive de : 00-platform.md > Archetype + Calibrage Frontend, 00-brief.md > Ambition Visuelle, emotion-map.md -->

## Dials Globaux

> Ces valeurs sont le PLANCHER creatif du projet — le minimum de boldness que frontend-design2 appliquera.
> frontend-design2 peut (et doit) les POUSSER PLUS HAUT par section selon l'emotion cible.
> Il ne les descendra JAMAIS en dessous sauf pour les pages de conversion pure (contact/formulaire).
>
> **Regle d'or** : Les defaults de fd2 sont (8, 6, 4). Ne descendre en dessous de ces defaults
> QUE si l'archetype ou le brief l'exige explicitement. Le biais par defaut est vers le HAUT.

| Dial | Valeur | Justification |
|------|--------|---------------|
| DESIGN_VARIANCE | [6-10] | [Archetype + ambition visuelle. MINIMUM 6 sauf brief explicitement conservateur. Ex: "Premium accessible → 7", "Entreprise corporate → 6", "Creatif/artistique → 9"] |
| MOTION_INTENSITY | [5-8] | [Registre + complexite technique. MINIMUM 5 pour que le site soit vivant. Ex: "sobre mais moderne → 5", "expressif → 7", "cinematique → 8"] |
| VISUAL_DENSITY | [3-5] | [Type de site. Site vitrine = 3-4 (respire). Dashboard = 6-8. Jamais en dessous de 3 pour un site vitrine.] |

## Creative Palette

> Techniques du skill frontend-design2 Section 8 compatibles avec la marque de ce projet.
> frontend-design2 piochera dans cette palette pour chaque section en Phase B.
> Pas d'assignation a des sections — la selection se fait en contexte, selon l'emotion cible.
>
> **Regle** : Selectionner 10-15 techniques GENEREUSEMENT. Mieux vaut trop de choix que pas assez.
> fd2 en utilisera 1-2 par section — il a besoin d'options pour exprimer sa creativite.

| Technique | Pourquoi elle convient a ce projet |
|-----------|-------------------------------------|
| [Ex: Sticky Scroll Stack] | [Decouverte progressive — sert la curiosite] |
| [Ex: Magnetic Button] | [Engagement tactile — renforce la promesse] |
| [Ex: Split Screen Scroll] | [Tension visuelle — hero asymetrique] |
| [Ex: Text Scramble Effect] | [Premiere impression — maitrise, modernite] |
| [Ex: Accordion Image Slider] | [Portfolio/galerie — exploration] |
| [Ex: Staggered Orchestration] | [Reveals — rythme et narration] |
| [...] | [...] |

## Techniques Exclues

> Techniques explicitement incompatibles avec la marque. frontend-design2 ne doit PAS les utiliser.
> **Regle** : Exclure le MINIMUM necessaire. Chaque exclusion reduit l'espace creatif.
> N'exclure que ce qui CONTREDIT l'archetype ou l'emotion du projet.

| Technique | Pourquoi elle est exclue |
|-----------|--------------------------|
| [Ex: Glitch Effect] | [Contredit l'archetype — trop agressif] |
| [Ex: Particle Explosion Button] | [Surcharge pour le type de site] |

## Anti-Patterns frontend-design2 Renforces

> Regles du skill Section 7 (100 AI Tells) PARTICULIEREMENT critiques pour ce projet.
> Ces regles s'ajoutent aux defaults du skill.

- [ ] [Regle 1 — ex: "NO 3-Column Card Layouts" — risque eleve pour la page Services]
- [ ] [Regle 2 — ex: "NO Centered Hero" — DESIGN_VARIANCE >= 6 pour ce projet]
- [ ] [Regle 3 — ex: "NO Generic Names" — donnees client reelles obligatoires]
- [ ] [Regle 4]
- [ ] [Regle 5]

## Mapping Emotion → Dials (Reference)

> Table de reference pour frontend-design2. Quand une section vise une emotion,
> ces fourchettes guident le calibrage des dials.
> Ce sont des TENDANCES avec un biais vers le HAUT — fd2 peut pousser plus haut si l'emotion le demande.

| Emotion | VARIANCE | MOTION | DENSITY | Note |
|---------|----------|--------|---------|------|
| Confiance | 5-7 | 4-5 | 3-4 | Pas ennuyeux — confiance ≠ generique |
| Curiosite | 7-9 | 5-7 | 3-5 | Pousser VARIANCE — la curiosite vient de l'inattendu |
| Urgence | 6-8 | 6-8 | 5-7 | Dense et dynamique |
| Serenite | 4-6 | 3-4 | 2-3 | Aerer mais pas vide — sophistique |
| Emerveillement | 8-10 | 7-9 | 2-4 | C'est ICI qu'on pousse a fond |
| Expertise | 6-8 | 4-6 | 4-6 | Precision, pas rigidite |
| Chaleur / Accueil | 5-7 | 4-6 | 3-4 | Organique, pas corporate |
| Desir | 7-9 | 6-8 | 2-3 | Theatral, espace negatif, tension |
| [Ajouter les emotions specifiques de emotion-map.md si absentes]
