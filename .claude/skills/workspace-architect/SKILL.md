---
name: workspace-architect
description: Bonnes pratiques Claude Code pour structurer projets, configurer CLAUDE.md, skills, subagents, hooks. Utiliser pour auditer structure, créer nouveau projet, ou optimiser workflow.
argument-hint: [audit | init | help]
---

# Workspace Architect

Guide des bonnes pratiques officielles pour structurer et organiser un environnement de développement Claude Code.

## Quand utiliser ce skill

- Structurer un nouveau projet ou workspace
- Auditer l'organisation d'un projet existant
- Configurer CLAUDE.md et rules/
- Créer des skills, subagents, hooks
- Optimiser le workflow Claude Code

## Ressources disponibles

| Fichier | Contenu |
|---------|---------|
| [references/claude-md-guide.md](references/claude-md-guide.md) | Guide complet CLAUDE.md |
| [references/skills-guide.md](references/skills-guide.md) | Création et organisation des skills |
| [references/subagents-guide.md](references/subagents-guide.md) | Configuration des subagents |
| [references/best-practices.md](references/best-practices.md) | Bonnes pratiques générales |
| [references/project-structure.md](references/project-structure.md) | Patterns de structure projet |
| [assets/claude-md-project.md](assets/claude-md-project.md) | Template CLAUDE.md projet |
| [assets/claude-md-workspace.md](assets/claude-md-workspace.md) | Template CLAUDE.md workspace |
| [assets/skill-template.md](assets/skill-template.md) | Template SKILL.md |
| [assets/subagent-template.md](assets/subagent-template.md) | Template subagent |
| [checklists/new-project.md](checklists/new-project.md) | Checklist nouveau projet |
| [checklists/audit-workspace.md](checklists/audit-workspace.md) | Checklist audit structure |

## Principes fondamentaux

### 1. Context is precious

Chaque ligne dans CLAUDE.md consomme du contexte. Ne garder que ce qui:
- Ne peut PAS être inféré du code
- S'applique UNIVERSELLEMENT au projet
- Causerait des ERREURS si absent

### 2. Progressive disclosure

Ne pas tout mettre dans CLAUDE.md. Utiliser:
- `.claude/rules/*.md` pour règles conditionnelles par path
- `.claude/skills/` pour connaissances à la demande
- Fichiers séparés référencés via `@path/to/file`

### 3. Verification over trust

Toujours fournir un moyen de vérification:
- Tests automatisés
- Scripts de validation
- Screenshots pour UI
- Commandes de check

### 4. Hierarchy of memory

```
Managed policy (org)     ← Plus haute priorité
  ↓
~/.claude/CLAUDE.md      ← User global
  ↓
./CLAUDE.md              ← Project shared
  ↓
./.claude/rules/*.md     ← Project rules
  ↓
./CLAUDE.local.md        ← Project personal
```

## Actions rapides

### Initialiser un projet
```bash
claude
> /init
```

### Auditer la structure actuelle
Lancer `/workspace-architect audit` ou demander:
```
Audite la structure de ce projet selon les bonnes pratiques Claude Code
```

### Créer un skill
Voir [assets/skill-template.md](assets/skill-template.md) ou:
```bash
mkdir -p .claude/skills/mon-skill
# Créer SKILL.md avec le template
```

## Sources officielles

- https://code.claude.com/docs/en/best-practices
- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/sub-agents

*Dernière mise à jour: 2026-02-04*
