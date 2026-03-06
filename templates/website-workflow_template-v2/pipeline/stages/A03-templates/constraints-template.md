# Contraintes Design

<!-- Dérive de : 00-platform.md (archétype + valeurs), Moodboard (patterns adoptés/rejetés) -->

## ON FAIT (obligatoire)

### Couleurs & Identité

1. **[Règle]** : [Valeur précise]
   - Justification : [Lien avec archétype/valeur/référence moodboard]

[...]

### Typographie

[...]

### Formes & Espace

[...]

### Interactions

[...]

[8-12 règles minimum au total, chacune justifiée]

## ON NE FAIT PAS (interdit)

### Couleurs

1. **[Anti-pattern]**
   - Pourquoi : [Justification liée à la marque]

[...]

### Typographie

[...]

### Formes & Layout

[...]

### Interactions

[...]

### Contenu

[...]

[8-12 règles minimum au total, chacune justifiée]

## Exceptions Autorisées

| Exception | Contexte | Condition |
|-----------|----------|-----------|
| [Ex: Rouge erreur] | Formulaires | Uniquement pour erreurs de validation |
| [Ex: Angles droits] | Lignes séparatrices | Uniquement lignes 1px horizontales |
| [Ex: Texte < 16px] | Labels de formulaire | Minimum 14px, jamais moins |

## Compatibilité frontend-design2

> Vérifier que les contraintes projet sont cohérentes avec les règles du skill.
> En cas de conflit, la contrainte projet prime (le skill s'adapte au projet, pas l'inverse).

### Règles du skill intégrées

- [ ] Rule 1 (Typo) : Police heading cohérente avec visual-vocabulary.md > typographie
- [ ] Rule 2 (Color) : Max 1 accent, saturation < 80%, LILA BAN respecté
- [ ] Rule 3 (Layout) : Si DESIGN_VARIANCE > 4 dans project-dials.md → centré hero BANNI
- [ ] Rule 4 (Cards) : Si VISUAL_DENSITY > 7 → cards génériques BANNIES, utiliser border-t / divide-y
- [ ] Rule 5 (States) : Contraintes d'interaction incluent loading, empty, error states
- [ ] Section 7 (100 AI Tells) : Anti-patterns critiques listés dans project-dials.md

### Conflits identifiés (si applicable)

| Règle skill | Contrainte projet | Résolution |
|-------------|-------------------|------------|
| [Ex: NO Centered Hero] | [Ex: Client veut hero centré] | [Décision : compromis split-screen avec texte centré] |

## Test Rapide "Est-ce [NOM_PROJET] ?"

- [ ] [Critère 1] ?
- [ ] [Critère 2] ?
- [ ] [Critère 3] ?
- [ ] [Critère 4] ?
- [ ] [Critère 5] ?
- [ ] [Critère 6] ?
- [ ] [Critère 7] ?
- [ ] [Critère 8] ?

→ 8/8 = ✅ Conforme | 6-7/8 = ⚠️ Revoir | < 6/8 = ❌ Refaire
