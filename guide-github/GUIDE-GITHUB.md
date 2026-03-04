# Guide GitHub - Collaboration en équipe

Guide pratique pour travailler à plusieurs sur un projet Git/GitHub.

## Concepts de base

### L'analogie

- **`main`** = le document officiel final du projet
- **Branche** = une copie de travail personnelle
- **Commit** = une sauvegarde avec description
- **Pull Request (PR)** = demande de fusion dans main
- **Merge** = fusionner une branche dans main

### Schéma de travail

```
main (branche principale - jamais toucher directement)
  │
  ├── feature/design-homepage     ← Personne A (design)
  │
  └── feature/n8n-b2b-workflow    ← Personne B (automations)
```

---

## Workflow quotidien

### 1. Avant de commencer à travailler

```bash
# Se mettre à jour avec la dernière version de main
git checkout main
git pull origin main

# Créer ta branche de travail
git checkout -b feature/nom-de-ta-feature
```

### 2. Pendant que tu travailles

Fais tes modifications normalement. Pour sauvegarder :

```bash
# Voir ce qui a changé
git status

# Ajouter les fichiers modifiés
git add chemin/vers/fichiers/

# Créer un commit avec message descriptif
git commit -m "feat(scope): description courte"

# Envoyer sur GitHub
git push origin feature/nom-de-ta-feature
```

### 3. Quand c'est prêt à être fusionné

Créer une Pull Request :

```bash
gh pr create --title "Titre de la PR" --body "Description des changements"
```

Ou via l'interface GitHub : bouton "Compare & pull request"

### 4. Merger dans main

Une fois la PR validée :

```bash
gh pr merge
```

Ou via le bouton "Merge pull request" sur GitHub.

### 5. Nettoyer et recommencer

```bash
# Revenir sur main à jour
git checkout main
git pull origin main

# Supprimer la branche locale (optionnel)
git branch -d feature/nom-de-ta-feature
```

---

## Convention de nommage

### Branches

```
feature/design-cart-page      # Nouvelle fonctionnalité design
feature/n8n-order-workflow    # Nouvelle fonctionnalité automation
fix/navbar-mobile-bug         # Correction de bug
refactor/cleanup-old-files    # Refactoring
```

### Commits (format conventionnel)

```
type(scope): description

feat(design): Add cart page mockup
fix(n8n): Fix webhook timeout issue
refactor(b2b): Reorganize pricing files
docs: Update README
```

Types courants :
- `feat` : nouvelle fonctionnalité
- `fix` : correction de bug
- `refactor` : restructuration sans changement de comportement
- `docs` : documentation
- `style` : formatage, pas de changement de code
- `chore` : maintenance, dépendances

---

## Gestion des conflits

### Quand ça arrive

Deux personnes ont modifié le même fichier sur les mêmes lignes.

### À quoi ça ressemble

```
<<<<<<< feature/design-homepage
Contenu de ta branche
=======
Contenu de l'autre branche
>>>>>>> main
```

### Comment résoudre

1. Ouvrir le fichier en conflit
2. Choisir quel contenu garder (ou combiner les deux)
3. Supprimer les marqueurs `<<<<<<<`, `=======`, `>>>>>>>`
4. Sauvegarder, commit, push

```bash
git add fichier-resolu
git commit -m "fix: Resolve merge conflict in fichier"
git push
```

---

## Règles d'or

| Règle | Pourquoi |
|-------|----------|
| **Jamais push directement sur main** | Évite les accidents, permet la revue |
| **Une branche = une feature** | Facile à relire, tester, annuler |
| **Pull main avant de créer une branche** | Part de la dernière version |
| **Commits atomiques et clairs** | Historique lisible |
| **PR même pour soi** | Bonne habitude + historique propre |
| **Ne jamais commit de `.env`** | Sécurité (secrets, API keys) |

---

## Commandes essentielles résumées

```bash
# === DÉMARRER UN TRAVAIL ===
git checkout main && git pull
git checkout -b feature/mon-travail

# === SAUVEGARDER ===
git status                              # Voir les changements
git add fichiers                        # Ajouter au commit
git commit -m "type(scope): message"    # Créer le commit
git push origin feature/mon-travail     # Envoyer sur GitHub

# === CRÉER UNE PR ===
gh pr create

# === MERGER ===
gh pr merge

# === REVENIR SUR MAIN ===
git checkout main && git pull

# === UTILITAIRES ===
git log --oneline -10                   # Voir les derniers commits
git branch                              # Voir les branches locales
git branch -d nom-branche               # Supprimer une branche locale
git stash                               # Mettre de côté des changements
git stash pop                           # Récupérer les changements mis de côté
```

---

## Exemple concret : Projet FOG

### Structure des responsabilités

```
fog/
├── design/          ← Personne A (branches design/*)
├── automations/     ← Personne B (branches auto/* ou n8n/*)
├── app-nextjs/      ← Les deux (coordination nécessaire)
└── b2b-pricing/     ← Les deux (coordination nécessaire)
```

### Workflow type

**Personne A veut refaire la page panier :**

```bash
git checkout main && git pull
git checkout -b design/cart-page-v2

# ... travaille sur design/maquettes/pages/panier/ ...

git add design/maquettes/pages/panier/
git commit -m "feat(design): Redesign cart page"
git push origin design/cart-page-v2
gh pr create --title "Design: Refonte page panier"

# Après validation
gh pr merge
```

**Personne B veut ajouter un workflow n8n :**

```bash
git checkout main && git pull
git checkout -b auto/order-confirmation-email

# ... travaille sur automations/ ...

git add automations/
git commit -m "feat(n8n): Add order confirmation email workflow"
git push origin auto/order-confirmation-email
gh pr create --title "Auto: Email confirmation commande"

# Après validation
gh pr merge
```

---

## Ressources

- [Documentation Git](https://git-scm.com/doc)
- [GitHub CLI (gh)](https://cli.github.com/manual/)
- [Conventional Commits](https://www.conventionalcommits.org/)
