# Phase 3a — Expression verbale

> Sous-étape de [A02-brand.md](../A02-brand.md)
> Pré-requis : `output/01-brand/00-platform.md` (Phase 2)

## Invocation `/brand-expression` obligatoire

> **Obligatoire** : Invoquer `/brand-expression` avant de produire les éléments d'expression verbale
> de positioning.md, about.md, services.md et tone.md.
> Fournir au skill le contenu de 00-platform.md comme contexte.
> Le skill applique la méthodologie professionnelle (Brand Ladder, language library,
> divergent→convergent) pour chaque élément créatif.

**Résumé du process créatif (détail dans `/brand-expression`) :**
1. **Nourrir** — Construire la Language Library depuis la plateforme
2. **Diverger** — 8+ variantes par élément, 8 angles distincts
3. **Évaluer** — Scoring 4 critères (Spécificité, Mémorabilité, Émotion, Cohérence ADN)
4. **Choisir** — Top 3 → tests d'élimination → choix justifié
5. **Raffiner** — Rythme, musicalité, précision, registre

> **Principe clé** : Chaque fichier doit être profond et contextualisé — pas de remplissage générique. Les exemples doivent être ancrés dans la réalité du client, pas des placeholders.

> **Dérivation traçable** : Chaque fichier inclut un commentaire `<!-- Dérive de : 00-platform.md > [Composant(s)] -->` en tête, traçant sa source dans la plateforme.

---

## 1. positioning.md (Arguments)

```markdown
# Positionnement

<!-- Dérive de : 00-platform.md > Insight, Promise, Proof Points -->

## Tagline
[Phrase d'accroche principale — max 10 mots. Produite via /brand-expression tagline.]
<!-- Choix : [justification en 1 ligne] -->

## Baseline
[Développement — max 20 mots. Complète la tagline avec du contexte.]
<!-- Choix : [justification en 1 ligne] -->

## 3 Arguments de Vente (USPs)
1. **[Argument 1]** : [Preuve/détail concret]
2. **[Argument 2]** : [Preuve/détail concret]
3. **[Argument 3]** : [Preuve/détail concret]

## CTA Principal
- **Texte** : [Ex: "Appelez-nous", "Découvrir la carte"]
- **Action** : [URL, tel:, ou scroll]
- **Contexte** : [Quand ce CTA est pertinent]

## CTA Secondaire
- **Texte** : [Ex: "Voir le menu", "Demander un devis"]
- **Action** : [URL ou scroll]
- **Contexte** : [Quand ce CTA est pertinent]

## Différenciation
[Paragraphe — 3-4 phrases qui expliquent pourquoi le client est unique vs. la concurrence identifiée dans 00-brief.md]

## Messages par Section
> Adapter aux pages réelles du site (depuis 00-brief.md section Pages).

- **[Page 1 — ex: Accueil/Hero]** : "[Message]" — [Contexte]
  <!-- Dérive de : 00-platform.md > Insight -->
- **[Page 2 — ex: La Carte]** : "[Message]" — [Contexte]
  <!-- Dérive de : 00-platform.md > Mission -->
- **[Page 3 — ex: Contact]** : "[Message]" — [Contexte]
  <!-- Dérive de : 00-platform.md > Promise -->
- **[Page 4 si applicable]** : "[Message]" — [Contexte]
  <!-- Dérive de : 00-platform.md > [Composant] -->
```

---

## 2. about.md (Identité)

```markdown
# À Propos

<!-- Dérive de : 00-platform.md > Purpose, Vision, Mission, Values -->

## Nom
[Nom commercial]

## Slogan
[Phrase d'accroche courte — max 10 mots. Doit capturer l'ADN du brief. Distinct de la tagline.]
<!-- Choix : [justification en 1 ligne] -->

## Mission
[Pourquoi l'entreprise existe — 1 phrase ancrée dans le réel]
<!-- Dérive de : 00-platform.md > Purpose + Mission -->

## Vision
[Où elle veut aller — 1 phrase]
<!-- Dérive de : 00-platform.md > Vision -->

## Valeurs
1. **[Valeur 1]** : [Explication courte + ce que ça implique concrètement]
2. **[Valeur 2]** : [Explication courte + ce que ça implique concrètement]
3. **[Valeur 3]** : [Explication courte + ce que ça implique concrètement]
4. **[Valeur 4 (optionnel)]** : [Explication]

## Chiffres Clés
> Adapter au secteur. Pas de métriques inventées — uniquement des faits vérifiables.
- [Métrique 1 — ex: disponibilité, ancienneté, couverture géo]
- [Métrique 2]
- [Métrique 3]

## Contact
- **Téléphone** :
- **Email** : [si applicable]
- **Adresse** :
- **Horaires** : [si applicable]
```

---

## 3. services.md (Offre)

> **Adapter au secteur** : "Services" pour prestataires, "Offre" ou "Carte" pour restaurants/commerces. La structure s'adapte, le principe reste : décrire chaque catégorie d'offre avec tagline, description, cible et tarification.

```markdown
# [Services / Offre / Carte]

<!-- Dérive de : 00-platform.md > Mission, Proof Points -->

## [Catégorie 1] : [Nom]
- **Tagline** : [Phrase d'accroche — produite via /brand-expression messaging]
  <!-- Choix : [justification en 1 ligne] -->
- **Description** : [2-3 phrases]
- **Pour qui** : [Quel persona, quel moment]
- **Inclus** :
  - [Élément 1]
  - [Élément 2]
- **Tarif** : [Prix, gamme, ou "Sur devis"]
- **Délai / Disponibilité** : [Si applicable]

## [Catégorie 2] : [Nom]
[Même structure]

## [Catégorie 3] : [Nom]
[Même structure]
```

---

## 4. tone.md (Ton)

```markdown
# Ton de Communication

<!-- Dérive de : 00-platform.md > Archétype, Values, Insight -->

## Tutoiement/Vouvoiement
[Choix] — [Justification ancrée dans le persona et le positionnement]

## Niveau de Formalité
[X/5] — [Description du registre avec nuances]

## Personnalité
> Chaque trait doit inclure un exemple de phrase réelle, pas une description abstraite.

- **[Adjectif 1]** : "[Exemple de phrase en contexte]"
  <!-- Dérive de : Archétype [Nom] -->
- **[Adjectif 2]** : "[Exemple de phrase en contexte]"
  <!-- Dérive de : Value [Nom] -->
- **[Adjectif 3]** : "[Exemple de phrase en contexte]"
  <!-- Dérive de : Insight -->

## Mots à Utiliser
> Choisir des mots qui renforcent le positionnement.
- [Mot 1]
- [Mot 2]
- [Mot 3]
- [...]

## Mots à Éviter
> Justifier brièvement pourquoi chaque mot est exclu.
- [Mot 1] ([raison])
- [Mot 2] ([raison])
- [...]

## Exemples de Phrases

### Bien
- "[Exemple 1 — en situation réelle]"
- "[Exemple 2]"
- "[Exemple 3]"
- "[Exemple 4]"

### À éviter
- "[Contre-exemple 1]" ([pourquoi c'est problématique])
- "[Contre-exemple 2]" ([pourquoi])
- "[Contre-exemple 3]" ([pourquoi])
```
