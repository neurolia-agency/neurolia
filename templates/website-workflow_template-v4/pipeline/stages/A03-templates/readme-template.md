# Direction Artistique — [NOM_PROJET]

## ADN Visuel

| Aspect | Valeur |
|--------|--------|
| Couleur signature | [Couleur] ([Code]) |
| Couleur action | [Couleur] ([Code]) |
| Background | [Couleur] ([Code]) |
| Forme signature | [Description] |
| Mouvement | [Type, durée, easing] |
| Structure | [Séquence des sections] |
| Espace sections | [Desktop] / [Mobile] |
| Radius | [Valeurs par usage] |
| Typographies | [Police 1] (titres) + [Police 2] (body) |
| Texture | [Si applicable] |

## Équation Visuelle

```
[NOM_PROJET] = [Axe 1] + [Axe 2] + [Axe 3]

[Axe 1]  = [Traduction concrète]
[Axe 2]  = [Traduction concrète]
[Axe 3]  = [Traduction concrète]
```

## Test Rapide "Est-ce [NOM_PROJET] ?"

[Copier les 8 critères depuis constraints.md]

→ 8/8 = ✅ Conforme | 6-7/8 = ⚠️ Revoir | < 6/8 = ❌ Refaire

## Palette Résumée

```
Backgrounds          Accents               Textes
─────────────        ─────────────         ─────────────
[Hex] [Nom]          [Hex] [Nom]           [Hex] [Nom]
[...]                [...]                 [...]
```

## Liens avec les Valeurs de Marque

| Valeur Marque | Traduction Visuelle |
|---------------|---------------------|
| [Valeur 1] | [Comment elle se manifeste visuellement] |
| [Valeur 2] | [Comment elle se manifeste visuellement] |
| [Valeur 3] | [Comment elle se manifeste visuellement] |

## Fichiers

| Fichier | Usage | Consommateur |
|---------|-------|--------------|
| moodboard.md | Références analysées avec mesures | Inspiration, validation |
| visual-vocabulary.md | Termes → valeurs CSS précises | A06 (Design Tokens) |
| constraints.md | Règles ON FAIT / ON NE FAIT PAS | B01-B04 (Frontend), Constraint Validator |
| emotion-map.md | Émotion cible par section + techniques | A05 (Wireframes), B02-B03, Aesthetic Director |
| **project-dials.md** | **Calibrage frontend-design2 par projet** | **Context Assembler, B01-B04 (Frontend)** |
| **ui-kit.md** | **Inventaire composants réutilisables** | **Context Assembler, Constraint Validator, B01-B04** |

## Usage par Étape

- **A04 (Structure)** : Consulter emotion-map.md pour la séquence des sections
- **A05 (Wireframes)** : Intégrer les émotions par section, les éléments signature, et les techniques recommandées
- **A06 (Design Tokens)** : Implémenter visual-vocabulary.md en CSS custom properties
- **B01-B03 (Frontend)** : Agents Context Assembler + Aesthetic Director lisent project-dials.md + emotion-map.md + constraints.md avant chaque composant
- **B04 (Polish)** : Exécuter le Test Rapide sur chaque page
- **B05 (Validate)** : Agent Constraint Validator vérifie constraints.md + project-dials.md
