# Phase 3a — Expression verbale

> Sous-etape de [S02-brand.md](S02-brand.md)
> Pre-requis : `output/01-brand/00-platform.md` (Phase 2)

## Invocation `/brand-expression` obligatoire

> **Obligatoire** : Invoquer `/brand-expression` avant de produire les elements d'expression verbale
> de positioning.md, about.md, services.md, tone.md et objectifs.md.
> Fournir au skill le contenu de 00-platform.md comme contexte.

**Resume du process creatif (detail dans `/brand-expression`) :**
1. **Nourrir** — Construire la Language Library depuis la plateforme
2. **Diverger** — 8+ variantes par element, 8 angles distincts
3. **Evaluer** — Scoring 4 criteres (Specificite, Memorabilite, Emotion, Coherence ADN)
4. **Choisir** — Top 3 → tests d'elimination → choix justifie
5. **Raffiner** — Rythme, musicalite, precision, registre

> **Principe cle** : Chaque fichier doit etre profond et contextualise — pas de remplissage generique.

> **Derivation tracable** : Chaque fichier inclut un commentaire `<!-- Derive de : 00-platform.md > [Composant(s)] -->` en tete.

---

## 1. positioning.md (Arguments + Piliers de Contenu Social)

```markdown
# Positionnement

<!-- Derive de : 00-platform.md > Insight, Promise, Proof Points -->

## Tagline
[Phrase d'accroche principale — max 10 mots. Produite via /brand-expression tagline.]
<!-- Choix : [justification en 1 ligne] -->

## Baseline
[Developpement — max 20 mots. Complete la tagline avec du contexte.]
<!-- Choix : [justification en 1 ligne] -->

## 3 Arguments de Vente (USPs)
1. **[Argument 1]** : [Preuve/detail concret]
2. **[Argument 2]** : [Preuve/detail concret]
3. **[Argument 3]** : [Preuve/detail concret]

## Differenciation
[Paragraphe — 3-4 phrases qui expliquent pourquoi le client est unique vs. la concurrence]

## Piliers de Contenu Social

> 3-5 piliers editoriaux qui structurent le calendrier de contenu. Chaque pilier = une facette de la marque exprimee en contenu.

### Pilier 1 : [Nom du pilier]
- **Description** : [Ce que ce pilier couvre — 1-2 phrases]
- **Frequence** : [Ex: 2x/semaine, 1x/semaine]
- **Formats privilegies** : [Feed / Carousel / Reel / Story]
- **Hook type** : [Ex: question, stat choc, before/after, behind the scenes]
- **Plateformes** : [Instagram / Facebook / TikTok / LinkedIn]
- **Exemple de post** : "[Titre ou accroche type]"

### Pilier 2 : [Nom du pilier]
[Meme structure]

### Pilier 3 : [Nom du pilier]
[Meme structure]

### Pilier 4 : [Nom du pilier] (optionnel)
[Meme structure]

### Pilier 5 : [Nom du pilier] (optionnel)
[Meme structure]

## CTA Sociaux

> Actions specifiques aux reseaux sociaux (differentes des CTAs web).

### CTA Principal
- **Texte** : [Ex: "Lien en bio", "Envoie-nous un DM"]
- **Action** : [Lien en bio / DM / Partage / Commentaire / Tag]
- **Contexte** : [Quand utiliser ce CTA]

### CTA Secondaire
- **Texte** : [Ex: "Partage a quelqu'un qui...", "Enregistre ce post"]
- **Action** : [Type d'action]
- **Contexte** : [Quand utiliser ce CTA]

### CTA Tertiaire (optionnel)
- **Texte** : [Ex: "Abonne-toi pour ne rien rater"]
- **Action** : [Type d'action]
- **Contexte** : [Quand utiliser ce CTA]

## Messages par Pilier
> Chaque pilier a un angle de message distinct.

- **[Pilier 1]** : "[Message]" — [Contexte]
  <!-- Derive de : 00-platform.md > Insight -->
- **[Pilier 2]** : "[Message]" — [Contexte]
  <!-- Derive de : 00-platform.md > Mission -->
- **[Pilier 3]** : "[Message]" — [Contexte]
  <!-- Derive de : 00-platform.md > Promise -->
```

---

## 2. about.md (Identite)

```markdown
# A Propos

<!-- Derive de : 00-platform.md > Purpose, Vision, Mission, Values -->

## Nom
[Nom commercial]

## Slogan
[Phrase d'accroche courte — max 10 mots. Distinct de la tagline.]
<!-- Choix : [justification en 1 ligne] -->

## Mission
[Pourquoi l'entreprise existe — 1 phrase ancree dans le reel]
<!-- Derive de : 00-platform.md > Purpose + Mission -->

## Vision
[Ou elle veut aller — 1 phrase]
<!-- Derive de : 00-platform.md > Vision -->

## Valeurs
1. **[Valeur 1]** : [Explication courte + ce que ca implique concretement]
2. **[Valeur 2]** : [Explication courte + ce que ca implique concretement]
3. **[Valeur 3]** : [Explication courte + ce que ca implique concretement]
4. **[Valeur 4 (optionnel)]** : [Explication]

## Chiffres Cles
> Adapter au secteur. Pas de metriques inventees — uniquement des faits verifiables.
- [Metrique 1 — ex: disponibilite, anciennete, couverture geo]
- [Metrique 2]
- [Metrique 3]

## Contact
- **Telephone** :
- **Email** : [si applicable]
- **Adresse** :
- **Horaires** : [si applicable]
```

---

## 3. services.md (Offre + Potentiel Social)

> **Adapter au secteur** : "Services" pour prestataires, "Offre" ou "Carte" pour restaurants/commerces.

```markdown
# [Services / Offre / Carte]

<!-- Derive de : 00-platform.md > Mission, Proof Points -->

## [Categorie 1] : [Nom]
- **Tagline** : [Phrase d'accroche — produite via /brand-expression messaging]
  <!-- Choix : [justification en 1 ligne] -->
- **Description** : [2-3 phrases]
- **Pour qui** : [Quel persona, quel moment]
- **Inclus** :
  - [Element 1]
  - [Element 2]
- **Tarif** : [Prix, gamme, ou "Sur devis"]

### Potentiel Social
- **Visuels** : [Type de visuel qui fonctionne — ex: photo plat fini, process de preparation, avant/apres]
- **Pilier associe** : [Renvoie a un pilier de positioning.md]
- **Angle de contenu** : [Ex: "montrer le process de fabrication", "temoignage client", "chiffres nutritionnels"]

## [Categorie 2] : [Nom]
[Meme structure]

## [Categorie 3] : [Nom]
[Meme structure]
```

---

## 4. tone.md (Ton + Adaptation Social Media + Regles Redactionnelles)

```markdown
# Ton de Communication

<!-- Derive de : 00-platform.md > Archetype, Values, Insight -->

## Tutoiement/Vouvoiement
[Choix] — [Justification ancree dans le persona et le positionnement]

## Niveau de Formalite
[X/5] — [Description du registre avec nuances]

## Personnalite
> Chaque trait doit inclure un exemple de phrase reelle.

- **[Adjectif 1]** : "[Exemple de phrase en contexte]"
  <!-- Derive de : Archetype [Nom] -->
- **[Adjectif 2]** : "[Exemple de phrase en contexte]"
  <!-- Derive de : Value [Nom] -->
- **[Adjectif 3]** : "[Exemple de phrase en contexte]"
  <!-- Derive de : Insight -->

## Mots a Utiliser
> Mots qui renforcent le positionnement.
- [Mot 1]
- [Mot 2]
- [Mot 3]
- [...]

## Mots a Eviter
> Justifier brievement pourquoi chaque mot est exclu.
- [Mot 1] ([raison])
- [Mot 2] ([raison])
- [...]

## Exemples de Phrases

### Bien
- "[Exemple 1 — en situation reelle]"
- "[Exemple 2]"
- "[Exemple 3]"
- "[Exemple 4]"

### A eviter
- "[Contre-exemple 1]" ([pourquoi c'est problematique])
- "[Contre-exemple 2]" ([pourquoi])
- "[Contre-exemple 3]" ([pourquoi])

## Adaptation Social Media

> Comment le ton s'adapte aux specificites des reseaux sociaux.

### Emojis
- **Usage** : [Aucun / Modere (1-3 par post) / Frequent (5+)]
- **Emojis autorises** : [Liste des emojis coherents avec la marque — ex: 🔥 💪 ✅]
- **Emojis interdits** : [Liste des emojis incoherents — ex: 🤣 💀 🙏]
- **Placement** : [Debut de ligne / Fin de phrase / Separateurs / Mix]

### Hashtags
- **Strategie** : [Branded + Niche + Decouverte]
- **Hashtags brandes** : [#NomMarque #TaglineMarque — ex: #StrictFood #LeCheatMeal]
- **Hashtags niche** : [5-10 hashtags secteur — ex: #HealthyFood #MealPrep]
- **Nombre par post** : [Recommandation — ex: 5-10 pour Instagram, 3-5 pour LinkedIn]
- **Placement** : [Dans la caption / En premier commentaire / Mix]

### Ton par format

| Format | Ton | Longueur | Specificites |
|--------|-----|----------|-------------|
| Feed (photo) | [ton] | [courte/moyenne/longue] | [ex: accroche forte en 1ere ligne] |
| Carousel | [ton] | [slides: X mots max] | [ex: pedagogique, progression logique] |
| Reel | [ton] | [caption: X mots max] | [ex: hook en 3 sec, energie elevee] |
| Story | [ton] | [minimal] | [ex: interactif, polls/questions] |
| LinkedIn | [ton] | [longueur] | [ex: plus formel, expertise] |

### Longueur captions
- **Instagram Feed** : [X-Y mots — avec structure recommandee]
- **Instagram Reel** : [X-Y mots]
- **Facebook** : [X-Y mots]
- **LinkedIn** : [X-Y mots]
- **TikTok** : [X-Y mots]

## Regles Redactionnelles

> Regles specifiques de redaction qui s'appliquent a tous les contenus.

- [Regle 1 — ex: "Toujours commencer par une accroche question ou stat"]
- [Regle 2 — ex: "Pas de phrases de plus de 20 mots"]
- [Regle 3 — ex: "Un CTA par post, jamais plus"]
- [Regle 4 — ex: "Privilegier la voix active"]
- [Regle 5 — ex: "Pas d'abreviations sauf [liste]"]
- [...]
```

---

## 5. objectifs.md (Objectifs Social Media + KPIs)

```markdown
# Objectifs Social Media

<!-- Derive de : 00-brief.md > Objectifs Detailles -->

## Objectif Principal

- **Objectif** : [Ex: "Developper la notoriete locale de la marque"]
- **Horizon** : [Ex: 6 mois, 1 an]
- **Justification** : [Pourquoi cet objectif est prioritaire — lien avec le business]

## Objectifs Secondaires

1. **[Objectif 2]** : [Description + horizon]
2. **[Objectif 3]** : [Description + horizon]

## KPIs Mesurables

| KPI | Baseline actuelle | Objectif | Horizon | Outil de mesure |
|-----|-------------------|----------|---------|-----------------|
| [Ex: Taux d'engagement] | [X%] | [Y%] | [6 mois] | [Instagram Insights] |
| [Ex: Abonnes Instagram] | [X] | [Y] | [6 mois] | [Instagram] |
| [Ex: Clics lien en bio] | [X/mois] | [Y/mois] | [3 mois] | [Linktree / Analytics] |
| [Ex: DMs recus] | [X/mois] | [Y/mois] | [3 mois] | [Instagram] |

## Frequence de suivi

- **Hebdomadaire** : [Metriques a suivre chaque semaine]
- **Mensuelle** : [Rapport complet avec comparaison M-1]
- **Trimestrielle** : [Bilan strategique avec ajustements]

## Lien avec les objectifs business

[1-2 phrases expliquant comment les objectifs social media contribuent aux objectifs business du client — ex: "L'augmentation de la notoriete locale doit se traduire par +30% de frequentation en boutique sous 6 mois"]
```
