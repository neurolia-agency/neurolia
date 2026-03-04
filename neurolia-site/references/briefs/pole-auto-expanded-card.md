# Architecture — Carte Expandue Pole Automatisation & IA

**Statut** : En cours de validation
**Cree le** : 2026-02-13
**Depend de** : `references/briefs/services-poles-overlay.md`
**Source** : Catalogue Services 2026 + discussions architecture

---

## Philosophie

Le Pole Web vend un **produit** (un site, un format). Le Pole Automatisation vend une **transformation** : le client arrive deborde, il repart avec un business qui respire.

Le prospect ne pense pas "je veux un chatbot". Il pense :
- "Je perds 10h/semaine sur des trucs qui devraient pas exister"
- "Ma prospection stagne et je n'ai pas le temps de la relancer"
- "Je navigue a vue, mes chiffres sont eparpilles partout"

L'overlay doit repondre a ces 3 douleurs, pas lister 9 services.

Arc narratif : **Intelligence → Acquisition → Operations**

---

## Wireframe — Structure verticale

```
+================================================================+
|                                                            [X] |
|                                                                |
|  — POLE AUTOMATISATION & IA                                    |
|                                                                |
|  Des systemes qui travaillent pendant                          |
|  que vous vous concentrez sur votre metier.                    |
|                                                                |
|  Chaque automatisation est sur mesure,                         |
|  concue selon vos process reels.                               |
|                                                                |
+================================================================+
|                                                                |
|  INTELLIGENCE IA                                               |
|  ───────────────                                               |
|  "L'IA qui connait votre boite par coeur"                      |
|                                                                |
|  +------------------+ +------------------+ +-----------------+ |
|  | CHATBOT IA       | | ASSISTANTS       | | MULTI-AGENTS    | |
|  |                  | | QUOTIDIENS       | | IA              | |
|  | Votre double     | |                  | |                 | |
|  | numerique.       | | Vos outils,      | | Des equipes     | |
|  | Qualifie et      | | pilotes en       | | virtuelles sur  | |
|  | vend 24/7.       | | langage naturel. | | vos process     | |
|  |                  | |                  | | complexes.      | |
|  | · Forme sur vos  | | · Generer un     | |                 | |
|  |   connaissances  | |   rapport en     | | · Orchestration | |
|  | · Repond a vos   | |   une phrase     | |   multi-etapes  | |
|  |   prospects      | | · Piloter CRM,   | | · Connexion     | |
|  | · Qualifie selon | |   agenda, outils | |   entre vos     | |
|  |   vos criteres   | | · Automatiser    | |   logiciels     | |
|  |                  | |   les micro-     | | · Decisions     | |
|  | a partir de X €  | |   taches         | |   autonomes     | |
|  |                  | |                  | |                 | |
|  |                  | | a partir de X €  | | Sur devis       | |
|  +------------------+ +------------------+ +-----------------+ |
|                                                                |
+=================================================================+
|                                                                |
|  +---------------------------+  +----------------------------+ |
|  | ACQUISITION AUTOMATISEE   |  | PROCESS & PILOTAGE         | |
|  | Votre machine commerciale |  | L'administratif en         | |
|  |                           |  | pilote automatique         | |
|  | Votre prospection tourne  |  |                            | |
|  | sans vous. L'IA genere,   |  | Fini la double saisie,     | |
|  | envoie, relance et        |  | les fichiers Excel et      | |
|  | qualifie a votre place.   |  | les oublis. Vos outils     | |
|  |                           |  | communiquent entre eux.    | |
|  | · Reseaux sociaux :       |  |                            | |
|  |   generation + publi      |  | · Devis & Facturation :    | |
|  |   automatique             |  |   du devis au paiement,    | |
|  | · Mailing : sequences,    |  |   zero friction            | |
|  |   newsletters, cold       |  | · Data & Dashboards :      | |
|  |   email                   |  |   une source de verite     | |
|  | · Scraping : donnees      |  |   pour decider vite        | |
|  |   du web livrees dans     |  | · Workflows connectes :    | |
|  |   vos outils              |  |   CRM, compta, agenda,     | |
|  |                           |  |   outils metier            | |
|  | a partir de X €/mois      |  |                            | |
|  |                           |  | a partir de X €            | |
|  +---------------------------+  +----------------------------+ |
|                                                                |
+=================================================================+
|                                                                |
|            [ Automatiser mon business → ]                      |
|                                                                |
|  "On commence par un audit gratuit de 30 min                   |
|   pour identifier vos quick wins."                             |
|                                                                |
+=================================================================+
```

---

## Zone 1 — Header

| Element | Contenu | Style |
|---------|---------|-------|
| Eyebrow | `POLE AUTOMATISATION & IA` | 10px, tracking 0.25em, terracotta, uppercase |
| Titre | Des systemes qui travaillent pendant que vous vous concentrez sur votre metier. | clamp(1.75rem, 4vw, 2.75rem), font-hero, bold |
| Baseline | Chaque automatisation est sur mesure, concue selon vos process reels. | text small, muted — rappelle que c'est pas des packs figes |

---

## Zone 2 — Intelligence IA (le coeur)

C'est le differenciateur de Neurolia. Pas un integrateur Zapier, une agence qui deploie de l'IA metier.

### Titre de section

- Label : `INTELLIGENCE IA`
- Sous-titre : "L'IA qui connait votre boite par coeur"

### Grille : 3 colonnes desktop, stack mobile

#### Chatbot IA — "Votre double numerique"

- Qualifie et vend vos services 24h/24
- Forme sur 100% de vos connaissances (docs, site, PDF)
- Maitrise totale de vos offres commerciales
- Repond avec precision, jamais de "je ne sais pas"
- Qualification des prospects selon vos criteres
- `a partir de X €`

**Cible** : artisans, cabinets, e-commerce — toute entreprise avec des questions recurrentes

#### Assistants Quotidiens — "Vos outils, pilotes en langage naturel"

- Generer un rapport, un email, un resume en une phrase
- Piloter votre CRM, agenda, outils metier sans formation
- Automatiser les micro-taches qui grignottent vos journees
- Interface conversationnelle, pas de logiciel a apprendre
- `a partir de X €`

**Cible** : equipes qui jonglent entre 5+ outils au quotidien

#### Systemes Multi-Agents IA — "Des equipes virtuelles"

- Orchestration multi-etapes de process complexes
- Connexion intelligente entre vos logiciels
- Decisions autonomes basees sur vos regles metier
- Supervision humaine integree aux etapes critiques
- `Sur devis`

**Cible** : PME avec des process metier complexes et repetitifs

---

## Zone 3 — Services complementaires

2 cartes cote a cote (50/50 desktop, stack mobile).

### Acquisition Automatisee — "Votre machine commerciale"

La prospection tourne sans vous. L'IA genere, envoie, relance et qualifie a votre place.

Regroupe 3 services du catalogue :

| Service catalogue | Presentation dans la carte |
|-------------------|---------------------------|
| Reseaux Sociaux | Generation + publication automatique sur tous vos canaux |
| Mailing | Sequences, newsletters, cold email avec delivrabilite protegee |
| Scraping & Enrichissement | Donnees du web livrees directement dans vos outils |

- `a partir de X €/mois`

**Pitch** : ces 3 services forment un systeme. Le scraping trouve les prospects, le mailing les contacte, les reseaux construisent la notoriete. Ensemble, pas separement.

### Process & Pilotage — "L'administratif en pilote automatique"

Vos outils communiquent entre eux. Fini la double saisie et les fichiers Excel.

Regroupe 2 services du catalogue + workflows :

| Service catalogue | Presentation dans la carte |
|-------------------|---------------------------|
| Devis & Facturation | Du devis au paiement, zero friction |
| Data & Dashboards | Une source de verite pour decider vite |
| (Workflows connectes) | CRM, compta, agenda, outils metier relies entre eux |

- `a partir de X €`

---

## Zone 4 — CTA Final

| Element | Contenu |
|---------|---------|
| Bouton principal | "Automatiser mon business" |
| Microcopy | "On commence par un audit gratuit de 30 min pour identifier vos quick wins." |

**Note** : la microcopy est differente du Pole Web. Ici on parle d'"audit" et de "quick wins" — le prospect en automatisation veut savoir ce qu'il gagne concretement, vite.

---

## Hierarchie visuelle (resume)

```
Importance ████████████████████████  Zone 2 — Intelligence IA (le wow)
           ██████████████            Zone 1 — Header (la promesse)
           ████████████              Zone 3 — Acquisition + Process
           ██████                    Zone 4 — CTA
```

---

## Responsive

| Breakpoint | Zone 2 (Intelligence IA) | Zone 3 (Complements) |
|------------|--------------------------|---------------------|
| Desktop (lg+) | 3 colonnes | 2 colonnes 50/50 |
| Tablet (md) | 3 colonnes (compressees) | 2 colonnes 50/50 |
| Mobile (sm) | Stack 1 colonne | Stack 1 colonne |

---

## Differences cles avec le Pole Web

| Aspect | Pole Web | Pole Automatisation |
|--------|----------|---------------------|
| Structure Zone 2 | Grille 2x2 (4 formats produit) | Grille 1x3 (3 niveaux IA) |
| Logique | "Choisissez un format" | "Decouvrez ce que l'IA fait pour vous" |
| Pricing | Par projet (a partir de X €) | Mix projet + recurrent (/mois) |
| CTA microcopy | "echange de 30 min" | "audit gratuit + quick wins" |
| Zone 3 | Visibilite + Accompagnement | Acquisition + Process |
| Accompagnement | Bloc dedie (reserve clients) | Integre — "Maintenance & Support" catalogue = naturellement inclus |

---

## Mapping catalogue → architecture

| Service catalogue | Placement | Zone |
|-------------------|-----------|------|
| Chatbot | Carte "Chatbot IA" | Zone 2 |
| Assistants Quotidiens | Carte "Assistants Quotidiens" | Zone 2 |
| Systemes Multi-Agents IA | Carte "Multi-Agents IA" | Zone 2 |
| Reseaux Sociaux | Dans "Acquisition Automatisee" | Zone 3 |
| Mailing | Dans "Acquisition Automatisee" | Zone 3 |
| Scraping & Enrichissement | Dans "Acquisition Automatisee" | Zone 3 |
| Devis & Facturation | Dans "Process & Pilotage" | Zone 3 |
| Data & Dashboards | Dans "Process & Pilotage" | Zone 3 |
| Maintenance & Support | Inclus dans la relation client | (pas de bloc dedie) |

Les 9 services du catalogue sont tous representes. Zero perte.

---

## Points ouverts (a valider)

- [ ] **Prix** : fourchettes pour Chatbot, Assistants, Acquisition, Process
- [ ] **Multi-Agents "sur devis"** : confirmer (trop variable pour un "a partir de")
- [ ] **Acquisition : mensuel ou projet ?** Le scraping est ponctuel, les reseaux sont recurrents
- [ ] **Accompagnement auto** : pas de bloc dedie, OK ? (vs. Pole Web qui en a un)

---

## Ce que ce brief ne couvre PAS

- L'animation flip/expand (couverte dans `services-poles-overlay.md`)
- Le contenu du Pole Web (couvert dans `pole-web-expanded-card.md`)
- L'implementation code (sera faite via `/frontend-design`)
