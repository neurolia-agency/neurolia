# Patterns de Structure Projet

## Structure Claude Code recommandée

```
project/
├── CLAUDE.md                    # Instructions projet (git tracked)
├── CLAUDE.local.md              # Instructions perso (gitignored)
├── .claude/
│   ├── CLAUDE.md                # Alternative à ./CLAUDE.md
│   ├── settings.json            # Permissions, hooks projet
│   ├── rules/                   # Rules modulaires
│   │   ├── code-style.md
│   │   ├── testing.md
│   │   └── frontend/
│   │       └── react.md
│   ├── skills/                  # Skills projet
│   │   └── my-skill/
│   │       ├── SKILL.md
│   │       └── references/
│   └── agents/                  # Subagents projet
│       └── code-reviewer.md
├── src/                         # Code source
├── tests/                       # Tests
└── docs/                        # Documentation
```

## Structure User-level (global)

```
~/.claude/
├── CLAUDE.md                    # Préférences globales
├── settings.json                # Settings globaux
├── rules/                       # Rules globales
│   └── preferences.md
├── skills/                      # Skills personnels
│   └── my-personal-skill/
│       └── SKILL.md
└── agents/                      # Subagents personnels
    └── my-reviewer.md
```

## Monorepo

```
monorepo/
├── CLAUDE.md                    # Instructions root (chargé toujours)
├── .claude/
│   └── rules/
│       └── shared.md            # Rules partagées
├── packages/
│   ├── frontend/
│   │   ├── CLAUDE.md            # Instructions frontend (chargé en subtree)
│   │   └── .claude/
│   │       ├── rules/
│   │       │   └── react.md     # Rules React
│   │       └── skills/
│   │           └── component-generator/
│   └── backend/
│       ├── CLAUDE.md            # Instructions backend
│       └── .claude/
│           └── rules/
│               └── api.md       # Rules API
└── apps/
    └── web/
        └── CLAUDE.md            # Instructions app web
```

## Workspace multi-projets

```
workspace/
├── CLAUDE.md                    # Instructions workspace globales
├── project-a/
│   ├── CLAUDE.md                # Hérite de ../CLAUDE.md
│   └── ...
├── project-b/
│   ├── CLAUDE.md
│   └── ...
└── _shared/
    ├── templates/
    └── scripts/
```

## Hiérarchie de chargement

Claude lit récursivement depuis cwd vers la racine:

```
Exemple: cd /workspace/project-a/src/components

Chargés automatiquement:
1. /workspace/CLAUDE.md
2. /workspace/project-a/CLAUDE.md
3. /workspace/project-a/.claude/rules/*.md

Chargés à la demande (quand Claude lit des fichiers):
4. /workspace/project-a/src/CLAUDE.md (si existe)
5. /workspace/project-a/src/components/CLAUDE.md (si existe)
```

## Conventions de nommage

| Type | Convention | Exemple |
|------|------------|---------|
| Dossiers | kebab-case | `my-skill/` |
| CLAUDE.md | UPPERCASE | `CLAUDE.md` |
| SKILL.md | UPPERCASE | `SKILL.md` |
| Rules | kebab-case | `code-style.md` |
| Agents | kebab-case | `code-reviewer.md` |
| Scripts | kebab-case | `validate-query.sh` |

## Fichiers à gitignore

```gitignore
# Claude Code local
CLAUDE.local.md
.claude/settings.local.json

# Potentiellement sensible
.env
.env.local
```

## Fichiers à commit

```
# Partager avec l'équipe
CLAUDE.md
.claude/CLAUDE.md
.claude/rules/*.md
.claude/skills/*/
.claude/agents/*.md
```

## Anti-patterns de structure

| Anti-pattern | Problème | Solution |
|--------------|----------|----------|
| CLAUDE.md à chaque niveau | Duplication, confusion | Un seul à la racine + rules/ |
| Skills dans src/ | Mélange code et config Claude | `.claude/skills/` |
| Pas de .claude/ | Config éparpillée | Centraliser dans .claude/ |
| Rules sans paths | Tout chargé toujours | Ajouter frontmatter paths |
| Agents en dehors de .claude/ | Inconsistant | `.claude/agents/` |

## Quand utiliser quoi

| Besoin | Solution |
|--------|----------|
| Instructions globales équipe | `./CLAUDE.md` |
| Instructions perso projet | `./CLAUDE.local.md` |
| Instructions perso globales | `~/.claude/CLAUDE.md` |
| Rules par type de fichier | `.claude/rules/` avec paths |
| Connaissances à la demande | `.claude/skills/` |
| Assistants spécialisés | `.claude/agents/` |
| Workflows automatiques | Hooks dans settings.json |
