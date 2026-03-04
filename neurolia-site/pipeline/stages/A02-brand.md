# Étape 01 : Brand (Identité de marque)

## Objectif
Définir l'identité complète de la marque pour guider tout le contenu.

## Input
- `output/00-brief.md`

## Instructions

Créer 7 fichiers dans `output/01-brand/` :

### 1. about.md (Identité)
```markdown
# À Propos

## Nom
[Nom de l'entreprise]

## Slogan
[Phrase d'accroche courte]

## Mission
[Pourquoi l'entreprise existe - 1 phrase]

## Vision
[Où elle veut aller - 1 phrase]

## Valeurs
1. [Valeur 1] : [Explication courte]
2. [Valeur 2] : [Explication courte]
3. [Valeur 3] : [Explication courte]

## Chiffres Clés
- [X] années d'expérience
- [X] clients satisfaits
- [X] projets réalisés

## Contact
- Téléphone :
- Email :
- Adresse :
```

### 2. services.md (Offre)
```markdown
# Services

## Service 1 : [Nom]
- **Description** : [2-3 phrases]
- **Pour qui** : [Cible]
- **Tarif** : [Prix ou "Sur devis"]
- **Délai** : [Estimation]

## Service 2 : [Nom]
[Même structure]

## Service 3 : [Nom]
[Même structure]
```

### 3. positioning.md (Arguments)
```markdown
# Positionnement

## Titre Hero
[Phrase d'accroche principale - max 10 mots]

## Sous-titre
[Développement - max 20 mots]

## 3 Arguments de Vente
1. **[Argument 1]** : [Preuve/détail]
2. **[Argument 2]** : [Preuve/détail]
3. **[Argument 3]** : [Preuve/détail]

## CTA Principal
- Texte : [Ex: "Demander un devis"]
- Action : [Téléphone / Formulaire / Email]

## CTA Secondaire
- Texte : [Ex: "En savoir plus"]
- Action : [Scroll / Page services]

## Différenciation
[Qu'est-ce qui vous rend unique vs concurrents ?]
```

### 4. tone.md (Ton)
```markdown
# Ton de Communication

## Tutoiement/Vouvoiement
[Vouvoiement] - professionnel et respectueux

## Niveau de Formalité
[3/5] - Professionnel mais accessible

## Personnalité
- [Adjectif 1] : [Exemple de phrase]
- [Adjectif 2] : [Exemple de phrase]
- [Adjectif 3] : [Exemple de phrase]

## Mots à Utiliser
- [Mot 1]
- [Mot 2]
- [Mot 3]

## Mots à Éviter
- [Mot 1]
- [Mot 2]
```

### 5. personas.md (Cible)
```markdown
# Personas

## Persona Principal : [Prénom]

### Profil
- Âge : [Tranche]
- Profession :
- Situation :

### Problème
[Quel problème cherche-t-il à résoudre ?]

### Objectif
[Qu'est-ce qu'il veut accomplir ?]

### Freins
[Qu'est-ce qui l'empêche d'agir ?]

### Message Clé
[La phrase qui va le convaincre]

## Persona Secondaire : [Prénom]
[Même structure si pertinent]
```

### 6. colors.md (Couleurs)
```markdown
# Palette de Couleurs

## Couleur Primaire
- HEX : #[code]
- Usage : Boutons, liens, accents
- Hover : #[code plus foncé]

## Couleur Secondaire
- HEX : #[code]
- Usage : Éléments secondaires

## Texte
- Titres : #111827
- Corps : #374151
- Léger : #6b7280

## Fonds
- Principal : #ffffff
- Alternatif : #f9fafb
- Accent : #f3f4f6

## Sémantique
- Succès : #10b981
- Erreur : #ef4444
- Warning : #f59e0b

## Variables CSS
```css
:root {
  --color-primary: #[code];
  --color-primary-hover: #[code];
  --color-secondary: #[code];
  --color-text-heading: #111827;
  --color-text-body: #374151;
  --color-bg: #ffffff;
  --color-bg-alt: #f9fafb;
}
```
```

### 7. typography.md (Typographie)
```markdown
# Typographie

## Police Principale
- Nom : [Inter / Poppins / etc.]
- Source : Google Fonts
- Fallback : sans-serif

## Échelle de Tailles

| Élément | Desktop | Mobile | Weight |
|---------|---------|--------|--------|
| H1 | 48px | 32px | 700 |
| H2 | 36px | 28px | 600 |
| H3 | 24px | 20px | 600 |
| H4 | 20px | 18px | 500 |
| Body | 16px | 16px | 400 |
| Small | 14px | 14px | 400 |

## Line Height
- Titres : 1.2
- Corps : 1.6

## Variables CSS
```css
:root {
  --font-family: 'Inter', sans-serif;
  --font-size-h1: 3rem;
  --font-size-h2: 2.25rem;
  --font-size-h3: 1.5rem;
  --font-size-body: 1rem;
  --line-height-tight: 1.2;
  --line-height-relaxed: 1.6;
}
```
```

## Output

Créer `output/01-brand/` avec les 7 fichiers :
- about.md
- services.md
- positioning.md
- tone.md
- personas.md
- colors.md
- typography.md

## Validation

- [ ] 7 fichiers créés
- [ ] Aucun placeholder [texte] restant
- [ ] Couleurs en format HEX valide
- [ ] Variables CSS définies

## Prochaine Étape

Une fois `output/01-brand/` complet → Passer à `stages/01.5-art-direction.md`

> **Note** : L'étape 01.5 traduit la stratégie brand en vision visuelle concrète avant de créer les design tokens (02-design).
