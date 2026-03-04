# Template Subagent

## Structure minimale

```yaml
---
name: my-agent
description: [Quand Claude doit déléguer à cet agent]
tools: Read, Grep, Glob
---

You are [role description].

[Instructions principales]
```

## Structure complète

```yaml
---
name: my-agent
description: [Description détaillée. "Use proactively" si auto-délégation souhaitée.]
tools: Read, Grep, Glob, Bash, Edit, Write
disallowedTools: Task
model: sonnet
permissionMode: default
skills:
  - skill-name-1
  - skill-name-2
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate.sh"
---

You are [role expert description].

## When invoked

1. [Première action]
2. [Deuxième action]
3. [Troisième action]

## Guidelines

- [Guideline 1]
- [Guideline 2]
- [Guideline 3]

## Output format

[Description du format de sortie attendu]
```

## Exemples par type

### Agent read-only (exploration)
```yaml
---
name: codebase-explorer
description: Explore and analyze codebase. Use proactively when understanding code.
tools: Read, Grep, Glob
model: haiku
---

You are a codebase analyst. When invoked:
1. Understand the exploration request
2. Search relevant files
3. Analyze patterns and relationships
4. Summarize findings with file references
```

### Agent avec édition
```yaml
---
name: bug-fixer
description: Debug and fix issues. Use when encountering errors.
tools: Read, Edit, Bash, Grep, Glob
model: inherit
---

You are an expert debugger.

When invoked:
1. Capture error message
2. Identify root cause
3. Implement minimal fix
4. Verify solution works

Focus on root cause, not symptoms.
```

### Agent avec validation hook
```yaml
---
name: db-query-runner
description: Execute database queries. Read-only access.
tools: Bash
permissionMode: acceptEdits
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-sql.sh"
---

You are a database analyst with read-only access.

Only execute SELECT queries. If asked to modify data, explain you have read-only access.
```

### Agent avec skills préchargés
```yaml
---
name: api-developer
description: Implement API endpoints following conventions.
tools: Read, Edit, Bash, Grep, Glob
skills:
  - api-conventions
  - error-handling
---

Implement API endpoints following the preloaded conventions.
```

## Emplacement fichiers

| Portée | Chemin |
|--------|--------|
| Projet | `.claude/agents/my-agent.md` |
| Personnel | `~/.claude/agents/my-agent.md` |

## Via CLI (session only)

```bash
claude --agents '{
  "my-agent": {
    "description": "Description",
    "prompt": "You are...",
    "tools": ["Read", "Grep"],
    "model": "haiku"
  }
}'
```

## Checklist

- [ ] Nom en kebab-case
- [ ] Description claire (quand déléguer)
- [ ] "Use proactively" si auto-délégation souhaitée
- [ ] Tools minimum nécessaires
- [ ] Model approprié (haiku pour rapide, sonnet pour complexe)
- [ ] System prompt clair et actionnable
- [ ] Format de sortie défini si spécifique
