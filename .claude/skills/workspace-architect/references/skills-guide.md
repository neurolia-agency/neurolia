# Guide Skills

> Source: https://code.claude.com/docs/en/skills

## Qu'est-ce qu'un skill ?

Extension des capacités de Claude. Fichier `SKILL.md` avec instructions que Claude ajoute à sa toolkit. Claude les utilise automatiquement quand pertinent, ou invocation directe via `/skill-name`.

## Structure d'un skill

```
my-skill/
├── SKILL.md           # Instructions principales (requis)
├── template.md        # Template à remplir
├── examples/
│   └── sample.md      # Exemples de sortie attendue
└── scripts/
    └── validate.sh    # Script exécutable
```

## Emplacements

| Emplacement | Path | Portée |
|-------------|------|--------|
| Enterprise | Managed settings | Tous users org |
| Personal | `~/.claude/skills/<skill>/SKILL.md` | Tous tes projets |
| Project | `.claude/skills/<skill>/SKILL.md` | Ce projet uniquement |
| Plugin | `<plugin>/skills/<skill>/SKILL.md` | Où plugin activé |

Priorité: enterprise > personal > project

## Frontmatter YAML

```yaml
---
name: my-skill
description: Ce que fait le skill et quand l'utiliser
argument-hint: [filename] [format]
disable-model-invocation: true
user-invocable: false
allowed-tools: Read, Grep, Glob
model: sonnet
context: fork
agent: Explore
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./validate.sh"
---
```

| Champ | Requis | Description |
|-------|--------|-------------|
| `name` | Non | Identifiant (sinon nom du dossier). Minuscules, tirets, max 64 chars |
| `description` | Recommandé | Quand utiliser. Claude l'utilise pour décider |
| `argument-hint` | Non | Hint autocomplete ex: `[issue-number]` |
| `disable-model-invocation` | Non | `true` = seulement toi peux invoquer |
| `user-invocable` | Non | `false` = caché du menu `/`, seulement Claude |
| `allowed-tools` | Non | Tools autorisés sans permission |
| `model` | Non | Modèle à utiliser |
| `context` | Non | `fork` = exécuter dans subagent isolé |
| `agent` | Non | Type subagent si `context: fork` |
| `hooks` | Non | Hooks scoped au lifecycle du skill |

## Contrôle d'invocation

| Frontmatter | Toi peux invoquer | Claude peut invoquer |
|-------------|-------------------|---------------------|
| (défaut) | Oui | Oui |
| `disable-model-invocation: true` | Oui | Non |
| `user-invocable: false` | Non | Oui |

## Substitutions de variables

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | Tous les arguments passés |
| `$ARGUMENTS[N]` ou `$N` | Argument par index (0-based) |
| `${CLAUDE_SESSION_ID}` | ID de session courante |

Exemple:
```markdown
Fix GitHub issue $ARGUMENTS following our standards.
# ou
Migrate $0 component from $1 to $2.
```

## Injection de contexte dynamique

Syntaxe `!`command`` exécute avant envoi à Claude:

```yaml
---
name: pr-summary
description: Summarize PR changes
context: fork
agent: Explore
---

## PR Context
- Diff: !`gh pr diff`
- Comments: !`gh pr view --comments`
- Files: !`gh pr diff --name-only`

Summarize this PR...
```

## Types de contenu

### Contenu référence
Connaissances que Claude applique au travail courant:
```yaml
---
name: api-conventions
description: API design patterns
---

When writing API endpoints:
- Use RESTful naming
- Return consistent error formats
```

### Contenu tâche
Instructions step-by-step pour action spécifique:
```yaml
---
name: deploy
description: Deploy to production
context: fork
disable-model-invocation: true
---

Deploy the application:
1. Run test suite
2. Build application
3. Push to deployment target
```

## Exécution en subagent

`context: fork` = isolation dans contexte séparé:

```yaml
---
name: deep-research
description: Research thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS:
1. Find relevant files
2. Analyze the code
3. Summarize with file references
```

## Bonnes pratiques

1. **SKILL.md < 500 lignes** - Détails dans fichiers séparés référencés
2. **Descriptions riches** - Claude utilise matching sémantique
3. **Inclure exemples** - Bons et mauvais patterns
4. **Un skill = un focus** - Pas de skills fourre-tout
5. **Tester** - `/skill-name` pour vérifier le comportement

## Debugging

- **Skill ne se déclenche pas** → Vérifier description, mots-clés
- **Skill se déclenche trop** → Description plus spécifique, ou `disable-model-invocation`
- **Claude ne voit pas tous les skills** → Budget chars dépassé, voir `/context`
