# Étape 01.5 : Direction Artistique

## Objectif

Transformer la stratégie de marque (01-Brand) en **vision visuelle concrète** avant la création du design system. Cette étape comble le fossé entre "ce qu'on dit" et "comment ça doit se voir".

## Prérequis

- Étape 01-Brand complétée (`output/01-brand/` complet)
- Lecture obligatoire : tous les fichiers `output/01-brand/`

## Output Attendu

```
output/01.5-art-direction/
├── moodboard.md          # Références visuelles annotées
├── visual-vocabulary.md  # Lexique visuel propre à Neurolia
├── constraints.md        # Parti-pris radicaux (faire / ne pas faire)
├── emotion-map.md        # Émotion cible par section/page
└── README.md             # Index et guide d'utilisation
```

## Instructions

### 1. Moodboard (moodboard.md)

Analyser **5-7 références visuelles** en détail :

Pour chaque référence :
- **URL** du site
- **Ce qu'on retient** : 3-5 éléments visuels distinctifs
- **Mesures concrètes** : tailles de typo, ratios, espacements observés
- **Ce qu'on adapte** : comment transposer pour Neurolia

**Critères de sélection des références** :
- Sites d'agences/studios avec identité forte
- Minimalisme typographique (pas décoratif)
- Utilisation créative de l'espace
- Animations subtiles et pertinentes

### 2. Vocabulaire Visuel (visual-vocabulary.md)

Créer un **dictionnaire de traduction** entre termes vagues et valeurs précises :

| Terme générique | Définition Neurolia |
|-----------------|---------------------|
| "whitespace généreux" | Valeur exacte en px/rem |
| "typo massive" | Ratio par rapport au viewport |
| "hover subtil" | Type de transition + valeur |

**Sections obligatoires** :
- Espacements
- Typographie
- Transitions & animations
- Couleurs (usage, pas juste valeurs)
- Formes & structures

### 3. Contraintes (constraints.md)

Définir des **règles non-négociables** :

**ON FAIT (obligatoire)** :
- Liste de 8-12 règles visuelles à respecter systématiquement
- Chaque règle = mesurable et vérifiable

**ON NE FAIT PAS (interdit)** :
- Liste de 8-12 anti-patterns à éviter absolument
- Inclure les clichés de templates à proscrire

### 4. Carte des Émotions (emotion-map.md)

Pour chaque page/section du site, définir :
- **Émotion primaire** : ce que le visiteur doit ressentir
- **Tension visuelle** : quel contraste crée l'intérêt
- **Élément signature** : ce qui rend cette section mémorable

## Règles de Rédaction

### Être Spécifique

❌ "Utiliser des titres grands"
✅ "H1 = minimum 15% de la hauteur viewport sur desktop"

❌ "Espacement généreux entre sections"
✅ "Minimum 160px entre sections, jamais en dessous de 120px"

❌ "Animations subtiles"
✅ "Transitions = translate uniquement, 300-500ms, ease-out"

### Justifier Chaque Choix

Chaque contrainte doit être liée à :
- Une valeur de marque Neurolia (Proximité, Simplicité, Exigence, Levier)
- Ou au positionnement ("Un business qui respire")
- Ou à une référence visuelle analysée

### Rester Actionnable

Tout doit pouvoir être :
- Implémenté en CSS/code
- Vérifié visuellement
- Mesuré objectivement

## Checklist de Validation

Avant de considérer l'étape complète :

- [ ] 5+ références analysées avec mesures concrètes
- [ ] Vocabulaire visuel couvre : spacing, typo, transitions, couleurs, formes
- [ ] 8+ règles "ON FAIT"
- [ ] 8+ règles "ON NE FAIT PAS"
- [ ] Chaque page a une émotion primaire définie
- [ ] Chaque section homepage a un élément signature
- [ ] Aucun terme vague sans définition précise
- [ ] Tous les choix sont justifiés

## Flux vers Étape Suivante

L'output de cette étape est **consommé par** :
- **03-Structure** : Le vocabulaire visuel guide les layouts
- **03.5-Wireframes** : Les contraintes cadrent les sections
- **02-Design** : Les contraintes deviennent des tokens CSS (après wireframes)
- **04-07** : Toutes les étapes frontend référencent `constraints.md`

## Prochaine Étape

Une fois `output/01.5-art-direction/` complet → Passer à `stages/03-structure.md`

> **Note** : La structure et les wireframes sont définis AVANT les tokens CSS pour que le design system réponde aux vrais besoins du contenu.

## Commande

```bash
/apex -a -s exécuter étape 01.5-art-direction depuis stages/01.5-art-direction.md
```

---

**Version** : 1.1
**Phase** : A3 (Architecture)
**Dépendances** : A2 (01-Brand)
**Produit pour** : A4 (03-Structure), A5 (03.5-Wireframes), A6 (02-Design)
