# Bonnes Pratiques Claude Code

> Source: https://code.claude.com/docs/en/best-practices

## Principe fondamental

> La plupart des best practices découlent d'une contrainte: **le context window se remplit vite, et la performance dégrade quand il se remplit.**

Le context window contient toute la conversation, chaque fichier lu, chaque output de commande. Une session de debug peut consommer des dizaines de milliers de tokens.

## 1. Donner un moyen de vérification

**Le plus important.** Claude performe dramatiquement mieux quand il peut vérifier son travail.

| Stratégie | Avant | Après |
|-----------|-------|-------|
| Critères de vérification | "implement email validation" | "write validateEmail. Tests: user@example.com=true, invalid=false. Run tests after" |
| Vérifier UI visuellement | "make dashboard better" | "[screenshot] implement this. Take screenshot, compare, list differences, fix" |
| Root cause, pas symptômes | "build is failing" | "build fails with [error]. Fix and verify build succeeds. Address root cause" |

## 2. Explorer d'abord, planifier, puis coder

Séparer recherche et exécution avec Plan Mode:

1. **Explore** (Plan Mode): Lire fichiers, questions sans modifications
2. **Plan**: Créer plan détaillé d'implémentation
3. **Implement** (Normal Mode): Coder, vérifier contre le plan
4. **Commit**: Commit avec message descriptif

`Ctrl+G` pour ouvrir le plan dans l'éditeur.

**Skip le planning si:**
- Scope clair, fix petit
- Tu pourrais décrire le diff en une phrase

## 3. Fournir contexte spécifique

| Stratégie | Avant | Après |
|-----------|-------|-------|
| Scoper la tâche | "add tests for foo.py" | "write test for foo.py covering edge case where user logged out. avoid mocks" |
| Pointer sources | "why weird api?" | "look through ExecutionFactory's git history and summarize how api came to be" |
| Référencer patterns | "add calendar widget" | "look at HotDogWidget.php pattern. Follow it for new calendar widget" |
| Décrire symptôme | "fix login bug" | "login fails after session timeout. check auth flow in src/auth/. Write failing test, then fix" |

### Fournir contenu riche

- **`@` pour fichiers** au lieu de décrire où est le code
- **Coller images** directement (drag & drop)
- **Donner URLs** pour docs et API references
- **Pipe data**: `cat error.log | claude`
- **Laisser Claude fetch**: "use gh to get PR info"

## 4. Configurer l'environnement

### CLAUDE.md efficace
- `/init` pour générer starter
- Garder court et human-readable
- Inclure: bash commands, code style, workflow rules
- Ne PAS inclure: ce que Claude sait déjà, info qui change

### Permissions
- `/permissions` pour allowlister commandes safe
- `/sandbox` pour isolation OS-level
- `--dangerously-skip-permissions` seulement en sandbox sans internet

### CLI tools
Installer `gh`, `aws`, `gcloud`, etc. Claude sait les utiliser.

### MCP servers
`claude mcp add` pour connecter Notion, Figma, databases, etc.

### Hooks
Pour actions qui DOIVENT arriver à chaque fois:
```
"Write a hook that runs eslint after every file edit"
```

### Skills
`.claude/skills/` pour connaissances domain-specific à la demande.

## 5. Communiquer efficacement

### Poser des questions codebase
Comme à un senior engineer:
- "How does logging work?"
- "How do I make a new API endpoint?"
- "Why does this call foo() instead of bar()?"

### Laisser Claude interviewer
Pour features larges:
```
I want to build [description]. Interview me using AskUserQuestion.
Ask about technical implementation, UI/UX, edge cases, tradeoffs.
Keep interviewing until covered, then write spec to SPEC.md.
```

## 6. Gérer la session

### Course-correct tôt et souvent
- `Esc`: Stop mid-action
- `Esc + Esc` ou `/rewind`: Restore checkpoint
- `"Undo that"`: Revert changes
- `/clear`: Reset entre tâches non-liées

### Gérer le contexte agressivement
- `/clear` fréquent entre tâches
- `/compact <instructions>` pour compacter avec focus
- Subagents pour recherche (contexte séparé)

### Utiliser subagents pour investigation
```
Use subagents to investigate how auth handles token refresh
```

### Checkpoints
Double-tap `Escape` ou `/rewind` pour restore:
- Conversation only
- Code only
- Both

### Reprendre conversations
```bash
claude --continue    # Plus récente
claude --resume      # Sélectionner
```

## 7. Automatiser et scaler

### Mode headless
```bash
claude -p "Explain what this project does"
claude -p "List API endpoints" --output-format json
claude -p "Analyze log" --output-format stream-json
```

### Sessions parallèles
- Claude Desktop: sessions locales visuelles
- Claude Code web: VMs cloud isolées

### Pattern Writer/Reviewer
| Session A (Writer) | Session B (Reviewer) |
|-------------------|---------------------|
| Implement rate limiter | Review @src/middleware/rateLimiter.ts |
| Address review feedback | |

### Fan out across files
```bash
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue" \
    --allowedTools "Edit,Bash(git commit *)"
done
```

## 8. Anti-patterns à éviter

| Anti-pattern | Fix |
|--------------|-----|
| **Kitchen sink session**: tâches non-liées mélangées | `/clear` entre tâches |
| **Corrections répétées**: Claude wrong, correct, still wrong | Après 2 fails, `/clear` + meilleur prompt |
| **CLAUDE.md trop long**: Claude ignore la moitié | Prune ruthlessly |
| **Trust-then-verify gap**: implémentation plausible mais fausse | Toujours fournir vérification |
| **Exploration infinie**: "investigate" sans scope | Scoper ou utiliser subagents |

## 9. Développer l'intuition

Les patterns ne sont pas absolus. Parfois:
- Laisser contexte accumuler (problème complexe)
- Skip planning (tâche exploratoire)
- Prompt vague (voir comment Claude interprète)

Observer ce qui fonctionne. Noter:
- Structure du prompt
- Contexte fourni
- Mode utilisé

Quand Claude struggle, demander pourquoi:
- Contexte trop noisy?
- Prompt trop vague?
- Tâche trop grosse?
