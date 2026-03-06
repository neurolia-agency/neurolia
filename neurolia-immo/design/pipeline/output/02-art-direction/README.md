# Direction Artistique - Neurolia-Immo

> D02-Art Direction | Phase D-A : Vision visuelle mobile
> Source : D01-Brand (01-brand/), references/, user-flows/, navigation-map.md

---

## ADN Visuel

| Aspect | Valeur |
|--------|--------|
| Couleur signature | Bleu-ardoise (oklch(0.580 0.115 250) — primary-500) |
| Forme signature | Cards rectangulaires arrondies (12px), surfaces blanches sur fond gris tres clair |
| Mouvement | 200ms ease-out (standard), 350ms cubic-bezier(0.32, 0.72, 0, 1) (bottom sheet) |
| Navigation | Bottom tab bar : 3 tabs Owner (Accueil, Calendrier, Gestion), 2 tabs Staff (Planning, Profil) |
| Radius cards | 12px |
| Radius boutons | 8px |
| Radius badges | 6px |
| Touch targets | 44px minimum |
| Spacing ecran | 16px padding horizontal (mobile 375-428px) |
| Header height | 56px |
| Bottom tab height | 56px + safe area |
| Police principale | Inter (variable font, Google Fonts) |
| Police monospace | JetBrains Mono (codes d'acces, references) |
| Palette | OKLCH — neutrals dominants, accent bleu-ardoise, semantiques (vert/rouge/orange/bleu), plateformes (Airbnb rose, Booking bleu) |
| Archetype dominant | Souverain (controle, ordre, previsibilite) nuance par Soignant (bienveillance, accompagnement) |
| Ton | Factuel, direct, professionnel sans froideur (niveau 3/5) |
| Vouvoiement | Oui — dans toute l'interface |

---

## Identite Visuelle en 5 Points

1. **Sobre** : Les couleurs vives representent < 10% de la surface d'un ecran. Le reste est gris/blanc neutre. L'interface s'efface devant les donnees.
2. **Dense mais clair** : L'information est compacte (Inter, hierarchie 4 niveaux max) mais jamais confuse. Chaque element a sa taille, son poids, sa couleur definis.
3. **Fiable** : Chaque statut est communique par une couleur semantique coherente (vert = ok, rouge = probleme, orange = attention, bleu = en cours). Le proprietaire scan en 5 secondes.
4. **Tactile** : Zones 44px minimum, actions principales en bas de l'ecran (zone pouce), bottom sheets pour les filtres, pull-to-refresh sur les listes.
5. **Role-adapte** : Deux interfaces dans une seule app. Le Staff voit Planning + Profil. L'Owner voit Dashboard + Calendrier + Gestion. Pas de bruit, pas de confusion.

---

## Test Rapide "Est-ce Neurolia-Immo ?"

- [ ] **Sobre** : Couleurs vives < 10% de la surface. Reste neutre.
- [ ] **Dense mais clair** : Hierarchie typographique nette (titre/section/body/metadata).
- [ ] **Fiable** : Statuts visibles instantanement via badges semantiques colores.
- [ ] **Tactile** : Touch targets >= 44px, CTA en zone pouce (bas de l'ecran).
- [ ] **Role-adapte** : Staff ne voit que Planning/Profil. Owner ne voit pas le planning Staff.

> 5/5 = Conforme | < 4/5 = Revoir

---

## Fichiers

| Fichier | Contenu | Usage principal |
|---------|---------|----------------|
| **moodboard.md** | 7 references apps analysees avec mesures concretes (px, colors, patterns). Patterns communs et decisions d'adoption/rejet. | Comprendre les references visuelles et les choix adoptes. |
| **visual-vocabulary.md** | Lexique visuel complet : espacements, typographie, transitions, couleurs, formes, ombres. Chaque terme vague traduit en valeur precise. | Source de verite pour toutes les valeurs visuelles a implementer. |
| **constraints.md** | 15 regles "ON FAIT" + 15 regles "ON NE FAIT PAS". Patterns navigation, zones tactiles, test rapide. | Validation de chaque ecran contre les contraintes. |
| **emotion-map.md** | Emotion cible pour chaque ecran (16 ecrans + 5 etats speciaux). Tensions, resolutions, elements signatures, archetypes actifs. | Guide pour les decisions de wireframe et de design. |
| **README.md** | ADN visuel, index, usage. Ce fichier. | Point d'entree de la direction artistique. |

---

## Usage par Etape Pipeline

| Etape suivante | Fichiers a consulter | Usage |
|----------------|---------------------|-------|
| **D03 (Wireframes)** | emotion-map.md + constraints.md + visual-vocabulary.md | Structurer chaque ecran selon son emotion cible, respecter les contraintes de zones tactiles et de navigation, utiliser les espacements definis. |
| **D04 (Design Tokens)** | visual-vocabulary.md + 01-brand/colors.md + 01-brand/typography.md | Implementer les valeurs exactes de spacing, typo, colors, radius, shadows en variables CSS/tokens. |
| **D06-D08 (Code)** | constraints.md + visual-vocabulary.md | Valider chaque ecran code contre les 30 regles de constraints.md. Utiliser les valeurs de visual-vocabulary.md comme reference. |
| **D09 (Validation)** | Test rapide (constraints.md) + emotion-map.md | Valider chaque ecran contre le test "Est-ce Neurolia-Immo ?" et verifier l'emotion percue. |

---

## Principes de Decision

En cas de doute sur un choix de design, appliquer dans cet ordre :

1. **Valeur marque Fiabilite** : La donnee est-elle visible, a jour, sans ambiguite ?
2. **Valeur marque Clarte** : L'ecran repond-il a UNE question ? La hierarchie est-elle nette ?
3. **Valeur marque Simplicite** : Le persona peut-il accomplir son action en < 3 taps ?
4. **Archetype Souverain** : L'utilisateur se sent-il en controle ?
5. **Archetype Soignant** : L'utilisateur se sent-il accompagne (pas juge, pas perdu) ?

Si un choix visuel ne sert aucune de ces 5 dimensions, il ne doit pas etre dans l'interface.

---

*Document genere le 2026-02-20 -- D02-Art Direction*
