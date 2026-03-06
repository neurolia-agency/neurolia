# D01 Phase 3a : Production Verbale

> **Brand & Identity** - Creation des fichiers d'expression de marque.

## Objectif

Produire 4 fichiers d'identite verbale en utilisant le skill `/brand-expression`, adaptes au contexte mobile.

## Input

- `pipeline/output/01-brand/00-platform.md`
- Diagnostic Phase 1 (ecrans identifies)

## Skill

```bash
/brand-expression
```

## Fichiers a Produire

### 1. about.md (Identite)

```markdown
# A Propos

## Nom
[Nom de l'application]

## Slogan
[Phrase d'accroche courte - max 8 mots, adaptee ecran mobile]

## Mission
[Pourquoi cette app existe - 1 phrase]

## Vision
[Ou elle veut aller - 1 phrase]

## Valeurs
1. **[Valeur 1]** : [Explication courte]
2. **[Valeur 2]** : [Explication courte]
3. **[Valeur 3]** : [Explication courte]

## Chiffres Cles
- [X] [metrique 1]
- [X] [metrique 2]
- [X] [metrique 3]

## Contact
- **Email** :
- **Site web** :
- **Support** :
```

### 2. services.md (Fonctionnalites Cles)

```markdown
# Fonctionnalites

## Fonctionnalite 1 : [Nom]
- **Icone** : [nom icone suggeree]
- **Tagline** : [Phrase d'accroche]
- **Description** : [2-3 phrases]
- **Ecran principal** : [Nom de l'ecran]
- **Action principale** : [Verbe tactile : "Scanner", "Reserver", etc.]

## Fonctionnalite 2 : [Nom]
[Meme structure]

## Fonctionnalite 3 : [Nom]
[Meme structure]
```

### 3. positioning.md (Arguments et Messages)

```markdown
# Positionnement

## Tagline
[Phrase d'accroche principale - max 8 mots]

## Baseline
[Developpement - max 15 mots]

## 3 Arguments de Vente (USPs)
1. **[Argument 1]** : [Preuve/detail]
2. **[Argument 2]** : [Preuve/detail]
3. **[Argument 3]** : [Preuve/detail]

## CTA Principal
- **Texte** : [Ex: "Commencer" / "Essayer gratuitement"]
- **Action** : [ecran cible]

## CTA Secondaire
- **Texte** : [Ex: "Decouvrir" / "En savoir plus"]
- **Action** : [ecran cible ou scroll]

## Differenciation
[Qu'est-ce qui rend cette app unique vs alternatives ?]

## Messages par Ecran
- **Onboarding step 1** : "[Message accueil]"
- **Onboarding step 2** : "[Message valeur 1]"
- **Onboarding step 3** : "[Message valeur 2]"
- **Home / Dashboard** : "[Message principal]"
- **Empty state (liste)** : "[Message encourageant]"
- **Empty state (recherche)** : "[Message aide]"
- **Success** : "[Message confirmation]"
- **Error** : "[Message rassurant]"
- **Notifications** : "[Ton notification push]"

## CTAs par Ecran
- **Onboarding** : "[Verbe action]" (ex: "C'est parti")
- **Home** : "[Verbe action]" (ex: "Reserver maintenant")
- **Detail** : "[Verbe action]" (ex: "Ajouter au panier")
- **Panier/Resume** : "[Verbe action]" (ex: "Confirmer")
- **Settings** : "[Verbe action]" (ex: "Enregistrer")
```

### 4. tone.md (Ton)

```markdown
# Ton de Communication

## Tutoiement/Vouvoiement
[Choix] - [Justification liee a l'archetype et la cible]

## Niveau de Formalite
[X/5] - [Description]

## Personnalite
- **[Adjectif 1]** : [Exemple de message in-app]
- **[Adjectif 2]** : [Exemple de notification]
- **[Adjectif 3]** : [Exemple de message d'erreur]

## Mots a Utiliser
- [Mot 1] - [contexte d'usage]
- [Mot 2] - [contexte d'usage]
- [Mot 3] - [contexte d'usage]

## Mots a Eviter
- [Mot 1] - [pourquoi]
- [Mot 2] - [pourquoi]

## Exemples par Contexte

### Notifications Push
- **Bien** : "[Exemple conforme]"
- **A eviter** : "[Exemple non conforme]"

### Messages d'Erreur
- **Bien** : "[Exemple conforme]"
- **A eviter** : "[Exemple non conforme]"

### Empty States
- **Bien** : "[Exemple conforme]"
- **A eviter** : "[Exemple non conforme]"

### Labels de Boutons
- **Bien** : "[Exemple conforme]"
- **A eviter** : "[Exemple non conforme]"
```

## Processus Creatif

### Divergent → Convergent

Pour chaque element creatif (tagline, slogan, baseline, messages) :

1. **Diverger** : Generer 5-10 propositions variees
2. **Scorer** : Evaluer chaque proposition sur les criteres
3. **Converger** : Selectionner la meilleure, affiner

### Seuils de Qualite

| Element | Seuil minimum | Criteres |
|---------|---------------|----------|
| Tagline | 17/20 | Memorabilite, clarte, emotion, brevite |
| Slogan | 16/20 | Impact, differenciation, rythme |
| Baseline | 15/20 | Clarte, completude, fluidite |
| Messages ecrans | 14/20 | Pertinence, ton, action |

### Anti-Patterns a Eviter

- Jargon technique dans les messages utilisateur
- Messages generiques ("Bienvenue" sans personnalite)
- CTAs vagues ("Cliquez ici", "Soumettre")
- Phrases trop longues pour ecran mobile (max 2 lignes)
- Ton inconsistant entre ecrans
- Messages d'erreur accusateurs ("Vous avez fait une erreur")

## Phase Suivante

→ `D01-brand/04-validation.md` (apres completion de 3a ET 3b)

---

**Version** : 1.0
**Phase** : D01 - Sous-phase 3a/4
