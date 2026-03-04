# Guide Subagents

> Source: https://code.claude.com/docs/en/sub-agents

## Qu'est-ce qu'un subagent ?

Assistant AI spécialisé qui gère des types de tâches spécifiques. Chaque subagent:
- Contexte propre isolé
- System prompt custom
- Accès tools spécifique
- Permissions indépendantes

## Subagents built-in

| Agent | Modèle | Tools | Usage |
|-------|--------|-------|-------|
| **Explore** | Haiku | Read-only | Recherche codebase rapide |
| **Plan** | Inherit | Read-only | Recherche pour plan mode |
| **general-purpose** | Inherit | Tous | Tâches complexes multi-step |
| **Bash** | Inherit | Bash | Commandes terminal isolées |

## Structure fichier subagent

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. Analyze code and provide specific,
actionable feedback on quality, security, and best practices.
```

## Emplacements

| Emplacement | Portée | Priorité |
|-------------|--------|----------|
| `--agents` CLI flag | Session courante | 1 (haute) |
| `.claude/agents/` | Projet courant | 2 |
| `~/.claude/agents/` | Tous tes projets | 3 |
| Plugin `agents/` | Où plugin activé | 4 (basse) |

## Frontmatter YAML

| Champ | Requis | Description |
|-------|--------|-------------|
| `name` | Oui | Identifiant unique (minuscules, tirets) |
| `description` | Oui | Quand Claude doit déléguer |
| `tools` | Non | Tools autorisés (hérité si omis) |
| `disallowedTools` | Non | Tools à refuser |
| `model` | Non | `sonnet`, `opus`, `haiku`, `inherit` |
| `permissionMode` | Non | Mode permissions |
| `skills` | Non | Skills à précharger |
| `hooks` | Non | Hooks lifecycle |

## Permission modes

| Mode | Comportement |
|------|--------------|
| `default` | Checking standard avec prompts |
| `acceptEdits` | Auto-accept file edits |
| `dontAsk` | Auto-deny prompts (tools explicites OK) |
| `bypassPermissions` | Skip tous les checks |
| `plan` | Mode plan (read-only) |

## Précharger des skills

```yaml
---
name: api-developer
description: Implement API endpoints following team conventions
skills:
  - api-conventions
  - error-handling-patterns
---

Implement API endpoints. Follow the conventions from preloaded skills.
```

## Hooks dans subagents

```yaml
---
name: db-reader
description: Execute read-only database queries
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly.sh"
---
```

## Foreground vs Background

| Mode | Comportement |
|------|--------------|
| **Foreground** | Bloque conversation, prompts passés |
| **Background** | Concurrent, permissions pré-approuvées |

- `Ctrl+B` pour backgrounder une tâche en cours
- Demander "run this in the background"

## Patterns d'utilisation

### Isoler opérations volumineuses
```
Use a subagent to run the test suite and report only failing tests
```

### Recherche parallèle
```
Research auth, database, and API modules in parallel using separate subagents
```

### Chaîner subagents
```
Use code-reviewer to find issues, then optimizer to fix them
```

## Quand utiliser subagent vs main

**Main conversation:**
- Back-and-forth fréquent
- Phases partageant contexte
- Changement rapide ciblé
- Latence importante

**Subagents:**
- Output verbeux pas nécessaire dans main
- Restrictions tools spécifiques
- Travail self-contained retournant summary

## Exemples

### Code reviewer (read-only)
```yaml
---
name: code-reviewer
description: Expert code review. Use proactively after writing code.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer.

Review checklist:
- Code clear and readable
- Well-named functions/variables
- No duplicated code
- Proper error handling
- No exposed secrets
- Good test coverage

Provide feedback by priority:
- Critical (must fix)
- Warnings (should fix)
- Suggestions (consider)
```

### Debugger (can edit)
```yaml
---
name: debugger
description: Debug errors, test failures, unexpected behavior.
tools: Read, Edit, Bash, Grep, Glob
---

You are an expert debugger.

Process:
1. Capture error and stack trace
2. Identify reproduction steps
3. Isolate failure location
4. Implement minimal fix
5. Verify solution

Focus on root cause, not symptoms.
```

### Data scientist
```yaml
---
name: data-scientist
description: SQL queries, BigQuery, data analysis.
tools: Bash, Read, Write
model: sonnet
---

You are a data scientist specializing in SQL and BigQuery.

Key practices:
- Write optimized queries
- Use appropriate aggregations
- Comment complex logic
- Format results for readability
```

## Commandes utiles

```bash
# Interface interactive
/agents

# Via CLI flag (session only)
claude --agents '{"name": {"description": "...", "prompt": "..."}}'

# Désactiver un subagent
# Dans settings.json permissions.deny: ["Task(subagent-name)"]
```
