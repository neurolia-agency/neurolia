# Manifest — Formulaire Plateforme de Marque

> Type : `brand-platform`
> CSV associe : `brand-platform-responses.csv`

Ce manifest definit le mapping entre les colonnes du formulaire "Plateforme de marque" et les concepts du pipeline social brand.

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

## Mapping S01-Init (extraction partielle)

Donnees extraites lors de l'initialisation pour enrichir `00-brief.md`.

| Colonne CSV | Target dans 00-brief.md | Section |
|-------------|------------------------|---------|
| Entreprise | Client > Entreprise | Client |
| Entrepreneur | Client > Contact | Client |
| Q3 - Mission | Contexte | Projet |
| Q10 - 3 adjectifs | Ambition Creatif Social > 3 mots feed | Ambition |
| Q11 - Anti-portrait | Ambition Creatif Social > Anti-modeles | Ambition |
| Q14 - Couleurs | Identite Visuelle > Couleurs | Identite |
| Q16 - Contenu prefere | Presence Social Media | Social |

> S01 n'extrait que les donnees structurelles. Le gros du contenu est pour S02.

## Mapping S02-Brand (cible principale — 80%+ des donnees)

Donnees exploitees pour construire `00-platform.md` et les fichiers brand.

| Colonne CSV | Target | Fichier |
|-------------|--------|---------|
| Q1 - Colere fondatrice | Key Insight / Tension | 00-platform.md |
| Q3 - Mission | Mission | 00-platform.md |
| Q4 - Avant/Apres | Insight + Brand Promise | 00-platform.md |
| Q5 - Ennemi commun | Competitive Environment | 00-platform.md |
| Q6 - Promesse | Brand Promise | 00-platform.md |
| Q7 - Preuve d'autorite | Proof Points | 00-platform.md |
| Q8 - Secret sauce | Discriminator | 00-platform.md |
| Q9 - Rituel signature | Proof Points (process) | 00-platform.md |
| Q10 - 3 adjectifs | Values & Personality | 00-platform.md |
| Q11 - Anti-portrait | Values (ce que la marque exclut) | 00-platform.md |
| Q12 - Ton verbal | Registre, vocabulaire | tone.md |
| Q13 - Ambiance visuelle | Calibrage Creatif Social | 00-platform.md |
| Q14 - Couleurs et matieres | Palette couleurs | design-system.md |
| Q15 - Univers inspire | Inspirations | 00-platform.md |
| Q16 - Contenu prefere | Piliers de Contenu Social | positioning.md |
| Q17 - Mantra | Brand Essence / Tagline seed | 00-platform.md |

> Les reponses sont la VOIX BRUTE du client — preserver en citations, ne pas reformuler.
> Format : `"[reponse exacte]" — Reponse client, Q[X]`

---

*Social Brand Template v1.0*
