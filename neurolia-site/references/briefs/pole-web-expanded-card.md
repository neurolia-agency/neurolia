# Architecture — Carte Expandue Pole Web

**Statut** : En cours de validation
**Cree le** : 2026-02-13
**Depend de** : `references/briefs/services-poles-overlay.md`
**Source** : Catalogue Services 2026 + discussions architecture

---

## Philosophie

L'overlay n'est pas une "page dans une page". C'est une **vitrine immersive** qui repond a une seule question :

> "Qu'est-ce que Neurolia peut faire pour ma presence web ?"

L'arc narratif : **Creer → Rendre visible → Grandir ensemble**

Pas de paves de texte. Chaque element se scanne en 3 secondes max.

---

## Wireframe — Structure verticale

L'overlay scrolle verticalement. Le contenu est organise en **3 zones** distinctes.

```
+================================================================+
|                                                            [X]  |
|                                                                 |
|  — POLE WEB                                                    |
|                                                                 |
|  Un site qui travaille pour vous.                              |
|  Pas une vitrine qui prend la poussiere.                       |
|                                                                 |
|  On construit, on rend visible, on grandit avec vous.          |
|                                                                 |
+=================================================================+
|                                                                 |
|  VOTRE SITE — CREATION                                         |
|  ─────────────────────                                         |
|  "Quel format pour vous ?"                                     |
|                                                                 |
|  +---------------------+  +---------------------+              |
|  | LANDING PAGE        |  | SITE VITRINE        |              |
|  |                     |  |                      |              |
|  | 1 page, 1 objectif  |  | 3 a 10+ pages       |              |
|  | Campagne, lancement |  | Credibilite, SEO,   |              |
|  |                     |  | contacts             |              |
|  | a partir de X €     |  | a partir de X €     |              |
|  +---------------------+  +---------------------+              |
|                                                                 |
|  +---------------------+  +---------------------+              |
|  | E-COMMERCE          |  | REFONTE             |              |
|  |                     |  |                      |              |
|  | Boutique en ligne   |  | Moderniser un site  |              |
|  | Shopify / Woo       |  | qui ne performe     |              |
|  |                     |  | plus                 |              |
|  | a partir de X €     |  | Sur devis           |              |
|  +---------------------+  +---------------------+              |
|                                                                 |
+=================================================================+
|                                                                 |
|  +---------------------------+  +----------------------------+ |
|  | VOTRE VISIBILITE          |  | VOTRE EVOLUTION            | |
|  | Referencement             |  | Accompagnement             | |
|  |                           |  |                            | |
|  | Un site invisible ne      |  | Reserve aux clients       | |
|  | sert a rien. On vous      |  | Neurolia. Votre site      | |
|  | place la ou vos           |  | reste rapide, securise    | |
|  | prospects cherchent.      |  | et evolue avec vous.      | |
|  |                           |  |                            | |
|  | · SEO technique &         |  | · Mises a jour &          | |
|  |   on-page                 |  |   securite                 | |
|  | · Referencement local     |  | · Evolutions              | |
|  |   (Google Business)       |  |   fonctionnelles           | |
|  | · Strategie de contenu    |  | · Support dedie            | |
|  |   (blog, pages)           |  | · Interlocuteur unique     | |
|  |                           |  |                            | |
|  | a partir de X €/mois      |  | Inclus pour nos clients   | |
|  +---------------------------+  +----------------------------+ |
|                                                                 |
+=================================================================+
|                                                                 |
|            [ Discuter de mon projet web → ]                    |
|                                                                 |
|  "Chaque projet commence par un echange de 30 min,            |
|   gratuit, sans engagement."                                   |
|                                                                 |
+=================================================================+
```

---

## Zone 1 — Header

| Element | Contenu | Style |
|---------|---------|-------|
| Eyebrow | `POLE WEB` | 10px, tracking 0.25em, terracotta, uppercase |
| Titre | Un site qui travaille pour vous. | clamp(1.75rem, 4vw, 2.75rem), font-hero, bold |
| Sous-titre | Pas une vitrine qui prend la poussiere. | text muted, italic ou lighter |
| Baseline | On construit, on rend visible, on grandit avec vous. | text small, muted |

**Role** : ancrer la promesse en 2 secondes. Pas de paragraphe. Chaque ligne est autonome.

---

## Zone 2 — Votre Site (Creation)

C'est le coeur de l'offre. **80% du chiffre d'affaires vient de la.**

### Titre de section

- Label : `VOTRE SITE — CREATION`
- Sous-titre : "Quel format pour vous ?"

### Grille de formats : 2x2 desktop, 1 colonne mobile

Chaque carte format contient :

| Element | Role |
|---------|------|
| **Nom** | Landing Page / Site Vitrine / E-commerce / Refonte |
| **Une phrase** | Pitch en 8-10 mots max |
| **2-3 bullets** | Ce qui est inclus (scannable) |
| **Prix** | "a partir de X €" ou "Sur devis" |

#### Contenu des 4 cartes

**Landing Page**
- *Une page, un objectif, des conversions*
- Design oriente action
- Formulaire de capture connecte a vos outils
- Responsive, chargement ultra-rapide
- `a partir de X €`

**Site Vitrine**
- *Votre credibilite en ligne, 24h/24*
- Design sur mesure aligne sur votre marque
- Architecture SEO pour etre trouve sur Google
- Parcours utilisateur qui convertit les visiteurs en contacts
- `a partir de X €`

**E-commerce**
- *Une boutique qui vend pendant que vous dormez*
- Shopify ou WooCommerce, cle en main
- Catalogue produits + tunnel d'achat optimise
- Paiement securise + emails automatiques
- `a partir de X €`

**Refonte**
- *Votre site actuel, transforme en actif commercial*
- Audit complet de l'existant (design, SEO, performance)
- Nouveau design + migration de contenu
- Redirections SEO pour conserver vos positions
- `Sur devis`

### Style des cartes format

- Border fine (`rgba(245,245,245,0.06)`), hover terracotta subtil
- Fond legerement different du fond overlay (contraste doux)
- Pas de tilt/gleam ici — rester sobre, c'est du contenu informatif
- Le prix est en bas, discret mais lisible (text-xs, muted, sauf le chiffre en semi-bold)

---

## Zone 3 — Services complementaires

2 cartes cote a cote (50/50 desktop, stack mobile). Moins hautes que la zone Creation.

### Votre Visibilite — Referencement

- *Un site invisible ne sert a rien.*
- SEO technique & on-page (balises, structure, vitesse)
- Referencement local (Google Business, visibilite de proximite)
- Strategie de contenu (blog, pages piliers, maillage)
- `a partir de X €/mois`

**Note** : ce service est positionne comme le complement naturel apres creation. Le client comprend que le site seul ne suffit pas.

### Votre Evolution — Accompagnement

- *Reserve aux clients Neurolia.*
- Mises a jour de securite et performance
- Evolutions fonctionnelles au fil de vos besoins
- Support dedie, interlocuteur unique
- `Inclus pour nos clients` ou formule mensuelle

**Note** : pas un service vendu a part. C'est un argument de vente : "on ne vous lache pas apres la livraison". La mention "reserve aux clients" cree de l'exclusivite.

---

## Zone 4 — CTA Final

| Element | Contenu |
|---------|---------|
| Bouton principal | "Discuter de mon projet web" |
| Microcopy | "Chaque projet commence par un echange de 30 min, gratuit, sans engagement." |

Le bouton renvoie vers `/contact`. La microcopy rassure (gratuit, sans engagement) et reduit la friction.

---

## Hierarchie visuelle (resume)

```
Importance ████████████████████████  Zone 2 — Creation (le coeur)
           ██████████████            Zone 1 — Header (la promesse)
           ████████████              Zone 3 — Complementaires
           ██████                    Zone 4 — CTA
```

Le regard suit naturellement : promesse → offre principale → complements → action.

---

## Responsive

| Breakpoint | Zone 2 (Creation) | Zone 3 (Complements) |
|------------|-------------------|---------------------|
| Desktop (lg+) | Grille 2x2 | 2 colonnes 50/50 |
| Tablet (md) | Grille 2x2 | 2 colonnes 50/50 |
| Mobile (sm) | Stack 1 colonne | Stack 1 colonne |

---

## Points ouverts (a valider)

- [ ] **Prix** : fourchettes "a partir de" a definir pour chaque format
- [ ] **Refonte "sur devis"** : confirmer qu'on ne met pas de prix plancher
- [ ] **Accompagnement** : inclus de base ou formule mensuelle optionnelle ?
- [ ] **Visibilite** : tarif mensuel ou par projet ?
- [ ] **Presence du lien "En savoir plus"** sur chaque carte format (vers une ancre ou rien ?)

---

## Ce que ce brief ne couvre PAS

- L'animation flip/expand (couverte dans `services-poles-overlay.md`)
- Le contenu du Pole Automatisation (brief separe a venir)
- L'implementation code (sera faite via `/frontend-design`)
