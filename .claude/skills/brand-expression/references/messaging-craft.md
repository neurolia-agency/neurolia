# Messaging Craft

> Référence détaillée pour la création de messages par section, CTAs et headlines contextuels.

---

## 1. Mapping Plateforme → Sections

Chaque page/section du site est alimentée par un composant spécifique de la plateforme de marque. Ce mapping garantit que les messages sont **dérivés** (pas inventés) et **traçables**.

### Table de mapping standard

| Section du site | Composant plateforme source | Ce que le message doit transmettre |
|-----------------|----------------------------|-----------------------------------|
| **Hero / Accueil** | Insight + Promise | La tension fondatrice + la promesse de résolution |
| **À propos** | Purpose + Values | Pourquoi on existe + ce en quoi on croit |
| **Offre / Carte / Services** | Mission + Proof Points | Ce qu'on fait concrètement + preuves |
| **Contact / CTA** | Promise + Archétype | L'invitation à agir, dans le ton de l'archétype |
| **Témoignages / Confiance** | Proof Points + Values | Preuve sociale alignée sur les valeurs |
| **Footer / Signature** | Vision | Où on va — ferme la boucle narrative |

### Principe de non-répétition

Chaque message de section doit avoir un **angle distinct**. Tester : si on supprime le nom de la section, peut-on deviner de quelle section il s'agit rien qu'en lisant le message ? Si non, les messages sont trop similaires.

---

## 2. Formulation des Messages par Section

### Process par section

Pour chaque section :

1. **Identifier le composant source** (table ci-dessus)
2. **Extraire le noyau** : quelle est l'idée essentielle de ce composant ?
3. **Formuler le message** : traduire le noyau en phrase orientée visiteur
4. **Vérifier l'angle** : est-il distinct des autres sections ?
5. **Ajouter le contexte** : quand/pourquoi ce message est montré

### Format de restitution

```markdown
## Messages par Section

- **[Nom de la section]** : "[Message]" — [Contexte d'affichage]
  <!-- Dérive de : 00-platform.md > [Composant] -->
```

### Règles de formulation

| Règle | Explication | Exemple ✅ | Contre-exemple ❌ |
|-------|-------------|-----------|------------------|
| **Orienté visiteur** | Le sujet est "vous/tu", pas "nous" | "Votre pause commence ici" | "Nous vous proposons" |
| **Spécifique** | Ancré dans le contexte du client | "Au milieu des vitrines, une table vous attend" | "Un cadre agréable" |
| **Actionnable** | Suggère un next step implicite | "Découvrez ce qui change la galerie" | "Nous existons depuis 10 ans" |
| **Émotionnel** | Dépasse l'information | "Le moment qui rachète votre après-midi shopping" | "Restaurant ouvert de 8h30 à 20h30" |

---

## 3. CTAs Contextuels

### Principes

Un CTA n'est pas un bouton générique — c'est une **invitation spécifique** dans un **contexte précis**.

| Composant | Rôle |
|-----------|------|
| **Texte du CTA** | Verbe d'action + résultat attendu |
| **Action** | Ce qui se passe (appel, scroll, navigation, lien externe) |
| **Contexte** | Quand et pourquoi ce CTA apparaît |

### Anti-patterns CTA

| Pattern ❌ | Pourquoi c'est faible | Alternative ✅ |
|-----------|----------------------|---------------|
| "Découvrir" | Vague, ne promet rien | "Voir la carte du jour" |
| "En savoir plus" | Passif, pas d'engagement | "Réserver ma table" |
| "Cliquez ici" | Technique, pas orienté valeur | "Appelez-nous" |
| "Contactez-nous" | Générique | "Réservez au 04 68..." |
| "Commencer" | Commencer quoi ? | "Choisir mon menu" |

### Structure CTA Principal vs. Secondaire

| CTA | Position typique | Rôle |
|-----|-----------------|------|
| **Principal** | Hero, section principale | Conversion directe (appel, réservation, commande) |
| **Secondaire** | Sous le CTA principal, ou sections secondaires | Exploration (voir la carte, en savoir plus sur nous) |

### Format de restitution

```markdown
## CTA Principal
- **Texte** : "[Verbe + résultat]"
- **Action** : [tel:, URL, scroll vers section]
- **Contexte** : [Quand ce CTA est montré + pourquoi il est pertinent à ce moment]
<!-- Dérive de : 00-platform.md > Promise -->

## CTA Secondaire
- **Texte** : "[Verbe + résultat]"
- **Action** : [URL, scroll]
- **Contexte** : [Quand + pourquoi]
<!-- Dérive de : 00-platform.md > Mission -->
```

---

## 4. Taglines de Catégories

Les taglines de catégories (dans `services.md` ou l'équivalent sectoriel) sont des mini-taglines pour chaque catégorie de l'offre.

### Process

Même process créatif que la tagline principale (Diverger → Évaluer → Choisir) mais en version accélérée :
- 5 variantes minimum par catégorie (au lieu de 8+)
- Scoring sur les mêmes 4 critères
- Seuil : ≥ 14/20 (légèrement moins exigeant)

### Règles de différenciation

| Règle | Explication |
|-------|-------------|
| **Angles distincts** | Chaque tagline de catégorie doit avoir un angle différent |
| **Pas de formule répétée** | Si catégorie 1 commence par "Le/La", catégorie 2 ne peut pas |
| **Cohérence tonale** | Toutes les taglines doivent sonner comme la même marque |
| **Spécificité** | Chaque tagline doit évoquer sa catégorie spécifique, pas l'offre globale |

### Exemple (restaurant — 4 catégories)

| Catégorie | Tagline ❌ | Tagline ✅ |
|-----------|-----------|-----------|
| Petit-déjeuner | "Bien commencer la journée" | "8h30. Le café est prêt, la galerie encore dort." |
| Plats chauds | "Des plats savoureux" | "Ce qui sort de la cuisine, c'est du vrai." |
| Crêpes & Gaufres | "Nos gourmandises sucrées" | "La pause dans la pause." |
| Glaces | "Nos glaces artisanales" | "32 parfums, et aucun regret." |

---

## 5. Headlines de Page

Les headlines (H1) sont les premiers éléments lus sur chaque page. Ils doivent capter l'attention en moins de 3 secondes.

### Relation avec les Messages par Section

Le Message par Section est le **concept** (ce qu'on veut transmettre). Le Headline est l'**exécution** (comment on le formule en H1).

```
Message : "Un vrai moment de pause humaine dans le flux commercial"
    ↓
Headline : "La galerie marchande s'arrête ici."
```

### Techniques de headline

| Technique | Description | Exemple |
|-----------|-------------|---------|
| **Contraste** | Opposer deux réalités | "Entre les vitrines, une table vraie." |
| **Question** | Interpeller directement | "Et si votre pause déjeuner devenait un moment ?" |
| **Affirmation audacieuse** | Poser une vérité | "La galerie marchande s'arrête ici." |
| **Scène** | Planter un décor en une phrase | "8h30. L'odeur du café traverse la galerie." |
| **Inversion** | Retourner une attente | "Pas un fast-food. Pas un restaurant gastronomique. Mieux." |

### Règles

- Max 10 mots (idéal : 5-8)
- Un seul message par headline (pas de slash ni d'accumulation)
- Doit fonctionner sans sous-titre (le sous-titre est un bonus, pas une béquille)
- Doit passer le test de spécificité (non-interchangeable)
