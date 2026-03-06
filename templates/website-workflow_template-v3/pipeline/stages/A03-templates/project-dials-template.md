# Project Dials — [NOM_PROJET]

<!-- Dérive de : 00-platform.md > Archétype + Calibrage Frontend, 00-brief.md > Ambition Visuelle, emotion-map.md -->

## Dials Globaux

> Ces valeurs OVERRIDENT les defaults du skill frontend-design2 (8, 6, 4) pour ce projet.
> Le skill dit : "ALWAYS listen to the user: adapt these values dynamically."
> Ces dials SONT les valeurs de l'utilisateur pour ce projet.

| Dial | Valeur | Justification |
|------|--------|---------------|
| DESIGN_VARIANCE | [1-10] | [Archétype + ambition visuelle → ex: "Caregiver = stabilité → 5"] |
| MOTION_INTENSITY | [1-10] | [Registre + complexité technique acceptée → ex: "sobre + animations CSS → 4"] |
| VISUAL_DENSITY | [1-10] | [Type de site + objectif → ex: "vitrine conversion → 3"] |

## Dials par Section

> Override les dials globaux pour des sections spécifiques qui nécessitent un traitement différent.

| Section | VARIANCE | MOTION | DENSITY | Justification |
|---------|----------|--------|---------|---------------|
| Hero | [val] | [val] | [val] | [Ex: "Impact première impression → variance +1, motion +1"] |
| Services | [val] | [val] | [val] | [Ex: "Lisibilité, comparaison → density +2"] |
| Portfolio | [val] | [val] | [val] | [...] |
| Contact | [val] | [val] | [val] | [Ex: "Conversion pure → variance -2, motion min"] |
| [Autres sections] | [...] | [...] | [...] | [...] |

## Arsenal Créatif Sélectionné

> Techniques du skill frontend-design2 Section 8 retenues pour ce projet.
> Synthèse des recommandations de emotion-map.md.
> Max 8-10 techniques pour tout le projet (cohérence > variété).

### Techniques retenues

| Technique | Section(s) cible(s) | Émotion servie | Priorité |
|-----------|---------------------|----------------|----------|
| [Ex: Sticky Scroll Stack] | [Services] | [Découverte progressive] | P0 |
| [Ex: Magnetic Button] | [Hero, Contact] | [Engagement tactile] | P1 |
| [Ex: Accordion Image Slider] | [Portfolio] | [Curiosité, exploration] | P1 |
| [...] | [...] | [...] | [...] |

### Techniques explicitement exclues

| Technique | Pourquoi |
|-----------|----------|
| [Ex: Horizontal Scroll Hijack] | [Incompatible archétype Caregiver — désorientant] |
| [Ex: Glitch Effect] | [Trop agressif pour cible artisans] |
| [Ex: Particle Explosion Button] | [Surcharge pour site conversion-first] |

## Anti-Patterns frontend-design2 Renforcés

> Règles du skill Section 7 (100 AI Tells) qui sont PARTICULIÈREMENT critiques pour ce projet.
> Ces règles s'ajoutent aux defaults du skill — elles sont rappelées ici car le risque est élevé.

- [ ] [Règle 1 — ex: "NO 3-Column Card Layouts" → particulièrement risqué pour la page Services]
- [ ] [Règle 2 — ex: "NO Centered Hero" → DESIGN_VARIANCE ≥ 4 pour ce projet]
- [ ] [Règle 3 — ex: "NO Generic Names" → données client réelles obligatoires]
- [ ] [Règle 4]
- [ ] [Règle 5]

## Mapping Émotion → Dials

> Table de référence rapide pour les agents. Quand une section vise une émotion,
> ces valeurs guident les dials.

| Émotion | VARIANCE tendance | MOTION tendance | DENSITY tendance |
|---------|-------------------|-----------------|------------------|
| Confiance | 3-5 | 2-4 | 2-4 |
| Curiosité | 5-7 | 4-6 | 3-5 |
| Urgence | 4-6 | 5-7 | 5-7 |
| Sérénité | 2-4 | 2-3 | 1-3 |
| Émerveillement | 7-9 | 6-8 | 2-4 |
| Expertise | 4-6 | 3-5 | 4-6 |
| [Ajouter les émotions spécifiques de emotion-map.md si absentes]
