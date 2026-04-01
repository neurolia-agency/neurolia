# Manifest — Formulaire Plateforme de Marque

> Type : `brand-platform`
> CSV associe : `brand-platform-responses.csv`

Ce manifest definit le mapping entre les colonnes du formulaire "Plateforme de marque" et les concepts du pipeline.

## Colonnes du formulaire

| # | Colonne CSV | Question |
|---|-------------|----------|
| — | Entreprise | Nom de l'entreprise |
| — | Entrepreneur | Nom du fondateur/contact |
| Q1 | Colere fondatrice | Qu'est-ce qui vous met en colere dans votre secteur ? |
| Q2 | Pour qui | Pour qui faites-vous tout ca ? |
| Q3 | Mission | Si vous deviez resumer votre mission en une phrase ? |
| Q4 | Avant/Apres | Decrivez la transformation de vos clients (avant vs. apres) |
| Q5 | Ennemi commun | Quel est l'ennemi commun que vous combattez avec vos clients ? |
| Q6 | Promesse | Quelle promesse faites-vous a chaque client ? |
| Q7 | Preuve d'autorite | Qu'est-ce qui prouve que vous etes legitime ? |
| Q8 | Secret sauce | Qu'est-ce qui vous rend different/unique ? |
| Q9 | Rituel signature | Avez-vous un rituel, un process, une methode signature ? |
| Q10 | 3 adjectifs | 3 adjectifs que vos clients utilisent pour vous decrire |
| Q11 | Anti-portrait | 3 choses que votre marque n'est surtout PAS |
| Q12 | Ton verbal | Comment parlez-vous a vos clients ? (tutoiement, humour, technique...) |
| Q13 | Ambiance visuelle | Decrivez l'ambiance visuelle ideale de votre marque |
| Q14 | Couleurs et matieres | Couleurs, textures ou matieres qui vous representent |
| Q15 | Univers inspire | Marques, lieux ou univers qui vous inspirent |
| Q16 | Contenu prefere | Type de contenu que vous aimez creer/partager |
| Q17 | Mantra | Une phrase que vous vous repetez souvent |

## Mapping A01-Init (extraction partielle)

Donnees extraites lors de l'initialisation pour enrichir `00-brief.md`.

| Colonne CSV | Target dans 00-brief.md | Section |
|-------------|------------------------|---------|
| Entreprise | Client > Entreprise | Client |
| Entrepreneur | Client > Contact | Client |
| Q3 - Mission | Projet > Contexte | Projet |
| Q10 - 3 adjectifs | Ambition Visuelle > Impression cible | Ambition Visuelle |
| Q11 - Anti-portrait | Ambition Visuelle > Anti-modeles | Ambition Visuelle |
| Q14 - Couleurs | Identite Visuelle > Couleurs | Identite Visuelle Existante |

> A01 n'extrait que les donnees structurelles (client, objectifs, ambition). Le gros du contenu est pour A02.

## Mapping A02-Brand (cible principale — 80%+ des donnees)

Donnees exploitees pour construire `00-platform.md` et les fichiers brand.

| Colonne CSV | Target dans 00-platform.md | Composant |
|-------------|---------------------------|-----------|
| Q1 - Colere fondatrice | Key Insight / Tension | Insight |
| Q3 - Mission | Mission | Mission |
| Q4 - Avant/Apres | Insight + Brand Promise | Insight, Promise |
| Q5 - Ennemi commun | Competitive Environment | Environment |
| Q6 - Promesse | Brand Promise | Promise |
| Q7 - Preuve d'autorite | Proof Points | Proof |
| Q8 - Secret sauce | Discriminator | Discriminator |
| Q9 - Rituel signature | Proof Points (process) | Proof |
| Q10 - 3 adjectifs | Values & Personality | Values |
| Q11 - Anti-portrait | Values (ce que la marque exclut) | Values |
| Q12 - Ton verbal | tone.md (registre, vocabulaire) | Tone |
| Q17 - Mantra | Brand Essence / Tagline seed | Essence |

> Les reponses sont la VOIX BRUTE du client — preserver en citations, ne pas reformuler.
> Format : `"[reponse exacte]" — Reponse client, Q[X]`

## Mapping A03-Art Direction (enrichissement secondaire)

| Colonne CSV | Target | Fichier |
|-------------|--------|---------|
| Q13 - Ambiance visuelle | emotion-map, moodboard | emotion-map.md, moodboard.md |
| Q14 - Couleurs et matieres | visual-vocabulary, constraints | visual-vocabulary.md, constraints.md |
| Q15 - Univers inspire | moodboard (references) | moodboard.md |

---

*Template Workflow v2.0*
