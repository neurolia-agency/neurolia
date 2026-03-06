# D01 Phase 4 : Validation

> **Brand & Identity** - Checklist de validation complete.

## Objectif

Verifier la completude et la coherence de l'ensemble des 8 fichiers produits dans `pipeline/output/01-brand/` avant de passer a l'etape D02.

## Input

- Tous les fichiers de `pipeline/output/01-brand/`

## Checklist de Validation (44+ items)

### Plateforme de Marque (00-platform.md)

- [ ] Brand Key : 9/9 composantes remplies
- [ ] Brand Key : Insight formule comme une tension (pas une description)
- [ ] Brand Key : Discriminateur est unique et inimitable
- [ ] Brand Key : Essence en 2-3 mots maximum
- [ ] Prisme Kapferer : 6/6 facettes remplies
- [ ] Prisme Kapferer : Coherence emetteur/recepteur
- [ ] Archetypes : 1 dominant + 1 secondaire identifies
- [ ] Archetypes : Manifestation dans l'UI decrite
- [ ] Archetypes : Manifestation dans le ton decrite

### A Propos (about.md)

- [ ] Nom de l'app present
- [ ] Slogan <= 8 mots
- [ ] Mission en 1 phrase
- [ ] Vision en 1 phrase
- [ ] 3 valeurs avec explication
- [ ] Chiffres cles presents (ou marques "a definir" si nouvelle app)

### Fonctionnalites (services.md)

- [ ] Toutes les fonctionnalites principales listees
- [ ] Chaque fonctionnalite a une tagline
- [ ] Chaque fonctionnalite a un ecran principal associe
- [ ] Actions principales = verbes tactiles (pas "cliquer")

### Positionnement (positioning.md)

- [ ] Tagline <= 8 mots
- [ ] Baseline <= 15 mots
- [ ] 3 USPs avec preuves
- [ ] CTA principal defini avec ecran cible
- [ ] CTA secondaire defini
- [ ] Messages par ecran couvrent tous les ecrans identifies
- [ ] Messages adaptes a l'espace mobile (max 2 lignes)
- [ ] CTAs par ecran utilisent des verbes d'action tactile

### Ton (tone.md)

- [ ] Choix tutoiement/vouvoiement justifie
- [ ] Niveau de formalite defini
- [ ] 3+ adjectifs de personnalite avec exemples in-app
- [ ] Mots a utiliser listes
- [ ] Mots a eviter listes
- [ ] Exemples par contexte : notifications push
- [ ] Exemples par contexte : messages d'erreur
- [ ] Exemples par contexte : empty states
- [ ] Exemples par contexte : labels de boutons

### Personas (personas.md)

- [ ] Persona principal complet
- [ ] Device principal indique
- [ ] Contexte d'usage (quand, ou, duree, frequence)
- [ ] Parcours type avec ecrans
- [ ] Freins identifies
- [ ] Message cle formule

### Couleurs (colors.md)

- [ ] Couleur primaire en HEX + OKLCH
- [ ] Couleur secondaire en HEX + OKLCH
- [ ] 5 neutrals definis (background, surface, foreground, muted, border)
- [ ] 4 couleurs semantiques (success, error, warning, info)
- [ ] Etats interaction definis (pressed, disabled, focus)
- [ ] Variables CSS listees
- [ ] Ratios de contraste verifies (WCAG AA)

### Typographie (typography.md)

- [ ] Police principale choisie avec justification
- [ ] Echelle complete (display → tab)
- [ ] Body >= 14px
- [ ] Input = 16px (zoom iOS)
- [ ] Regles de troncature definies
- [ ] Variables CSS avec clamp()

### Qualite Creative

- [ ] Tagline score >= 17/20 (memorabilite, clarte, emotion, brevete)
- [ ] Aucun jargon technique dans les messages utilisateur
- [ ] CTAs = verbes d'action (pas "Cliquer ici" ou "Soumettre")
- [ ] Messages d'erreur = ton rassurant (pas accusateur)

### Coherence

- [ ] Ton coherent entre tous les fichiers
- [ ] Valeurs de la plateforme se retrouvent dans les messages
- [ ] Archetype dominant perceptible dans le ton et les visuels
- [ ] Palette de couleurs coherente avec la personnalite de marque
- [ ] Typographie coherente avec le positionnement

## Scoring

| Categorie | Items | Passes | Score |
|-----------|-------|--------|-------|
| Plateforme | 9 | /9 | |
| Par fichier | 28 | /28 | |
| Qualite creative | 4 | /4 | |
| Coherence | 5 | /5 | |
| **Total** | **46** | **/46** | |

### Seuils

- **44-46/46** : PASS - Passer a D02
- **40-43/46** : MINOR - Corriger les points mineurs, puis D02
- **< 40/46** : FAIL - Retravailler les fichiers concernes

## Actions si FAIL

1. Identifier les fichiers avec le plus de fails
2. Relancer la phase correspondante (2, 3a, ou 3b)
3. Re-valider

## Phase Suivante

Si PASS ou MINOR → `pipeline/stages/D02-art-direction.md`

---

**Version** : 1.0
**Phase** : D01 - Sous-phase 4/4
