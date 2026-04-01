---
name: brand-expression
description: "Skill creatif pour l'expression de marque. Process 5 etapes (Nourrir, Diverger, Evaluer, Choisir, Raffiner) pour produire taglines, tone of voice et messaging ancres dans la plateforme de marque. Utiliser en A02 Phase 3a pour positioning.md, about.md, services.md, tone.md."
---

# Brand Expression — Skill Creatif

## QUAND CE SKILL S'ACTIVE

Ce skill s'active quand l'utilisateur invoque `/brand-expression` ou quand l'etape A02 Phase 3a (expression verbale) est executee. Il produit des elements creatifs de haute qualite pour :

- **Taglines et baselines** (positioning.md)
- **Slogans et messaging par section** (positioning.md, services.md)
- **Ton de communication** (tone.md)
- **Identite narrative** (about.md)

## PREREQUIS OBLIGATOIRE

Avant d'executer, verifier l'existence de :
- `pipeline/output/01-brand/00-platform.md` — Plateforme de marque (fondation strategique)
- `pipeline/output/00-brief.md` — Brief structure

LIRE les deux fichiers. Toute expression derive de la plateforme. Sans plateforme, STOPPER.

## 3 SCOPES D'APPLICATION

| Scope | Elements | Fichier cible |
|-------|----------|---------------|
| **Tagline** | Tagline, baseline, slogan, CTA | positioning.md, about.md |
| **Tone** | Registre, personnalite, lexique, exemples | tone.md |
| **Messaging** | Messages par section, taglines categories, USPs | positioning.md, services.md |

## LE PROCESS CREATIF (5 ETAPES)

Appliquer ce process pour CHAQUE element creatif (tagline, baseline, slogan, message de section, tagline de categorie). Ne jamais produire un seul draft.

### Etape 1 : NOURRIR — Language Library

Construire une bibliotheque de mots et expressions depuis la plateforme :

1. **Extraire** les mots-cles de chaque composant de 00-platform.md :
   - Insight → vocabulaire de tension/contraste
   - Values → vocabulaire de conviction
   - Archetype → vocabulaire de personnalite
   - Promise → vocabulaire de benefice
   - Proof Points → vocabulaire de preuve

2. **Organiser** en 4 colonnes :
   | Verbes d'action | Noms evocateurs | Adjectifs sensoriels | Expressions du domaine |
   |-----------------|-----------------|----------------------|------------------------|
   | [depuis platform] | [depuis platform] | [depuis platform] | [depuis brief/secteur] |

3. **Enrichir** avec le vocabulaire du secteur (pas du jargon marketing generique)

> **Regle** : La Language Library reste ancree dans le reel du client. Pas de mots "Elevate", "Seamless", "Unleash" — ce sont des marqueurs IA.

### Etape 2 : DIVERGER — 8+ variantes par element

Pour chaque element creatif, produire **minimum 8 variantes** en explorant 8 angles distincts :

| Angle | Description | Exemple d'approche |
|-------|-------------|-------------------|
| 1. Tension | Jouer sur l'insight/contraste | "Avant vs. Apres" |
| 2. Benefice direct | Ce que le client obtient | Promesse concrete |
| 3. Metonymie | Evoquer par un detail sensoriel | Un element tangible du metier |
| 4. Imperatif/invitation | Adresse directe au public | Verbe d'action + promesse |
| 5. Negation/anti | Ce qu'on n'est pas / refuse | Positionnement par contraste |
| 6. Minimaliste | Ellipse, raccourci, frappe | 3-5 mots max |
| 7. Narrative | Micro-histoire en une phrase | "Quand X, alors Y" |
| 8. Sensoriel | Texture, son, gout, odeur | Ancrage physique |

> **Regle** : Chaque variante doit etre SPECIFIQUE au client. Test : remplacer le nom du client par un concurrent — si ca marche encore, la variante est trop generique.

### Etape 3 : EVALUER — Scoring 4 criteres

Scorer chaque variante sur 4 criteres (1-5) :

| Critere | 1 | 3 | 5 |
|---------|---|---|---|
| **Specificite** | Generique, interchangeable | Lie au secteur | Impossible de le voler |
| **Memorabilite** | Oubliable | Se retient apres 2 lectures | Irresistible, on le repete |
| **Emotion** | Neutre, informatif | Evoque un sentiment | Provoque une reaction physique |
| **Coherence ADN** | Deconnecte de la plateforme | Aligne sur 1-2 composants | Incarne l'archetype + values |

**Format du scoring** :
```
| # | Variante | Spec | Mem | Emo | ADN | Total | Angle |
|---|----------|------|-----|-----|-----|-------|-------|
| 1 | "..." | 4 | 3 | 5 | 4 | 16 | Tension |
```

### Etape 4 : CHOISIR — Top 3 → elimination

1. **Classer** les variantes par score total
2. **Selectionner les 3 meilleures** — elles doivent couvrir au moins 2 angles differents
3. **Tests d'elimination** pour chaque finaliste :
   - **Test d'interchangeabilite** : Fonctionne pour un concurrent ? → Eliminer
   - **Test du T-shirt** : On le porterait sur un T-shirt ? → Garder si oui (taglines)
   - **Test du murmure** : On le dirait naturellement dans une conversation ? → Garder si oui (messaging)
   - **Test de longevite** : Sera encore pertinent dans 3 ans ? → Garder si oui
4. **Choix final** : 1 gagnant + 1 alternative, chacun avec justification en 1 ligne traçable vers 00-platform.md

### Etape 5 : RAFFINER — Polissage final

Appliquer ces filtres au choix final :

1. **Rythme** : Lire a voix haute. Les syllabes coulent ? Pas de clusters consonantiques genants ?
2. **Musicalite** : Alliteration ou assonance discrete (pas forcee)
3. **Precision** : Chaque mot est necessaire ? Supprimer les mots superflus.
4. **Registre** : Conforme au ton defini dans 00-platform.md > Archetype > Manifestation > Ton
5. **Longueur** :
   - Tagline : 3-8 mots ideal, max 10
   - Baseline : 10-20 mots
   - Message de section : 1-2 phrases
   - CTA : 2-4 mots

## ANTI-PATTERNS COPY IA (14 interdits)

Ces patterns sont des marqueurs reconnaissables de texte genere. JAMAIS les utiliser :

### Mots et expressions bannis
1. "Elevate / Elevez" — vide de sens, omnipresent en output IA
2. "Seamless / Transparent" — surexploite, jamais specifique
3. "Unleash / Liberez" — dramatisation artificielle
4. "Next-Gen / Nouvelle generation" — flou marketing
5. "Redefine / Redefinir" — pretention sans preuve
6. "Empower / Donner les moyens" — paternaliste
7. "Cutting-edge / A la pointe" — generique depuis 2010

### Structures interdites
8. "[Verbe] your [Nom]" — pattern IA anglophone transperce en francais ("Transformez votre quotidien")
9. "Plus qu'un [X], un [Y]" — cliche de repositionnement
10. "La ou [X] rencontre [Y]" — pont artificiel
11. "Parce que vous le meritez / valez" — condescendant
12. "L'excellence au service de [X]" — creux

### Defauts structurels
13. **Symetrie forcee** : "Nous [verbe], vous [verbe]" a repetition → varier les structures
14. **Abstraction en cascade** : 3+ phrases abstraites sans ancrage concret → alterner abstrait/concret

## CALIBRATION PAR ARCHETYPE

L'archetype de 00-platform.md calibre le registre d'expression :

| Archetype | Registre verbal | Rythme | Mots-types |
|-----------|----------------|--------|------------|
| Innocent | Simple, lumineux, rassurant | Court, fluide | pur, vrai, clair, chaque jour |
| Sage | Precis, pose, autorite douce | Mesure, ponctue | comprendre, savoir, observer |
| Explorer | Libre, evocateur, mouvement | Ample, souffle | decouvrir, horizon, chemin |
| Outlaw | Direct, provoquant, brut | Sec, percutant | refuser, briser, autrement |
| Magician | Evocateur, transformateur | Progressif, revelation | devenir, reveler, imaginer |
| Hero | Affirmatif, conquete | Rythme, determination | surpasser, construire, agir |
| Lover | Intime, sensoriel | Lent, textures | sentir, gouter, toucher, pres |
| Jester | Leger, decale, complice | Rapide, rebond | jouer, oser, sourire |
| Regular Guy | Accessible, concret, chaleureux | Naturel, conversation | ensemble, simple, ici, chez nous |
| Caregiver | Attentif, protecteur, genereux | Doux, enveloppant | prendre soin, accompagner |
| Ruler | Autoritaire, structure | Pose, implacable | maitriser, garantir, exiger |
| Creator | Inventif, poetique | Irregulier, surprenant | creer, inventer, voir autrement |

## FORMAT DE SORTIE

Pour chaque element creatif, le skill produit :

```
### [Element] — Process creatif

**Language Library** : [10-15 mots-cles extraits]
**Variantes** : [tableau scoring 8+ variantes]
**Top 3** : [3 finalistes avec angles]
**Tests** : [resultats des tests d'elimination]
**Choix** : "[Expression finale]"
**Alternative** : "[Expression alternative]"
**Justification** : [1 ligne tracable vers 00-platform.md > Composant]
```

## PROCESS COMPLET PAR FICHIER A02

### Pour positioning.md
Appliquer le process a : Tagline, Baseline, 3 USPs (phrasage), CTA principal (texte), CTA secondaire (texte), Messages par section. Lire `references/tagline-methodology.md` pour la methodologie Brand Ladder.

### Pour about.md
Appliquer le process a : Slogan (distinct de la tagline), Mission (phrasage), Vision (phrasage). Lire `references/messaging-craft.md` pour le mapping plateforme → identity.

### Pour services.md
Appliquer le process a : Tagline par categorie de service. Lire `references/messaging-craft.md` pour les CTAs contextuels.

### Pour tone.md
Utiliser `references/tone-of-voice.md` pour construire le registre, les traits de personnalite, le lexique et les exemples. Le process creatif s'applique aux exemples de phrases (section "Bien" et "A eviter").
