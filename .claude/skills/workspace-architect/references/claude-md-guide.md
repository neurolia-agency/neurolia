# Guide CLAUDE.md

> Source: https://code.claude.com/docs/en/memory

## Qu'est-ce que CLAUDE.md ?

Fichier spécial que Claude lit automatiquement au démarrage de chaque conversation. Donne du contexte persistant que Claude ne peut pas inférer du code seul.

## Emplacements et priorité

| Type | Emplacement | Usage | Partagé avec |
|------|-------------|-------|--------------|
| **Managed policy** | `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) | Standards organisation | Tous les users org |
| **User memory** | `~/.claude/CLAUDE.md` | Préférences personnelles globales | Toi seul (tous projets) |
| **Project memory** | `./CLAUDE.md` ou `./.claude/CLAUDE.md` | Instructions projet partagées | Équipe via git |
| **Project rules** | `./.claude/rules/*.md` | Instructions modulaires par sujet | Équipe via git |
| **Project local** | `./CLAUDE.local.md` | Préférences projet personnelles | Toi seul (ce projet) |

Les fichiers plus haut dans la hiérarchie ont priorité et sont chargés en premier.

## Syntaxe d'import @

CLAUDE.md peut importer d'autres fichiers:

```markdown
See @README.md for project overview and @package.json for npm commands.

# Additional Instructions
- Git workflow: @docs/git-instructions.md
- Personal: @~/.claude/my-project-instructions.md
```

- Chemins relatifs résolus depuis le fichier contenant l'import
- Imports récursifs possibles (max 5 niveaux)
- Les imports dans les blocs de code sont ignorés
- Première utilisation: dialogue d'approbation

## Ce qu'il faut inclure

| ✅ Inclure | ❌ Exclure |
|-----------|-----------|
| Commandes bash que Claude ne peut pas deviner | Ce que Claude peut déduire du code |
| Règles de style différentes des défauts | Conventions standard du langage |
| Instructions de test et runners préférés | Documentation API détaillée (lier plutôt) |
| Étiquette repo (noms de branches, conventions PR) | Info qui change souvent |
| Décisions architecturales spécifiques | File-by-file descriptions |
| Quirks environnement dev (env vars requises) | Évidences comme "write clean code" |
| Gotchas et comportements non-évidents | |

## Bonnes pratiques

### 1. Rester concis
Pour chaque ligne, demander: "Supprimer ceci causerait-il des erreurs de Claude?" Si non, supprimer.

### 2. Être spécifique
```markdown
# ❌ Vague
Format code properly

# ✅ Spécifique
Use 2-space indentation for all files
```

### 3. Structurer avec des bullets
```markdown
# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, not the whole test suite
```

### 4. Ajouter de l'emphase si nécessaire
Utiliser "IMPORTANT" ou "YOU MUST" pour améliorer l'adhérence aux règles critiques.

### 5. Traiter comme du code
- Review quand les choses ne fonctionnent pas
- Prune régulièrement
- Tester les changements en observant le comportement de Claude

## Rules modulaires (.claude/rules/)

Pour projets plus grands, organiser en fichiers multiples:

```
.claude/
├── CLAUDE.md           # Instructions principales
└── rules/
    ├── code-style.md   # Guidelines style
    ├── testing.md      # Conventions test
    └── security.md     # Requirements sécu
```

### Rules conditionnelles par path

Utiliser le frontmatter YAML `paths` pour cibler des fichiers spécifiques:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules
- All API endpoints must include input validation
- Use the standard error response format
```

### Patterns glob supportés

| Pattern | Match |
|---------|-------|
| `**/*.ts` | Tous les .ts dans n'importe quel dossier |
| `src/**/*` | Tous fichiers sous src/ |
| `*.md` | Markdown à la racine projet |
| `src/**/*.{ts,tsx}` | .ts et .tsx sous src/ |

## Commandes utiles

```bash
# Générer CLAUDE.md initial
/init

# Ouvrir CLAUDE.md dans l'éditeur
/memory

# Voir les fichiers memory chargés
/memory
```

## Anti-patterns

1. **CLAUDE.md trop long** → Claude ignore la moitié
2. **Règles que Claude suit déjà** → Bruit inutile
3. **Info qui change souvent** → Devient obsolète
4. **Documentation API complète** → Lier plutôt que copier
5. **Pas de structure** → Difficile à parser pour Claude
