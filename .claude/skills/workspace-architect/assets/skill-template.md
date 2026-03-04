# Template SKILL.md

## Structure minimale

```yaml
---
name: my-skill
description: [Quand utiliser ce skill. Mots-clés pour matching sémantique.]
---

# [Skill Name]

[Instructions principales]
```

## Structure complète

```yaml
---
name: my-skill
description: [Description détaillée pour Claude. Inclure mots-clés de déclenchement.]
argument-hint: [filename] [options]
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash
model: inherit
context: fork
agent: Explore
---

# [Skill Name]

## Quand utiliser
[Contexte d'utilisation]

## Instructions

1. [Étape 1]
2. [Étape 2]
3. [Étape 3]

## Ressources disponibles

- [references/guide.md](references/guide.md) - Guide détaillé
- [templates/output.md](templates/output.md) - Template de sortie
- [scripts/validate.sh](scripts/validate.sh) - Script de validation

## Format de sortie attendu

[Description ou exemple du format attendu]

## Exemples

### Bon exemple
```
[Exemple de bonne utilisation]
```

### Mauvais exemple
```
[Exemple à éviter]
```
```

## Arborescence skill complète

```
.claude/skills/my-skill/
├── SKILL.md              # Requis
├── references/
│   ├── guide.md          # Documentation détaillée
│   └── api.md            # Référence API
├── templates/
│   └── output.md         # Template de sortie
├── examples/
│   ├── good.md           # Bons exemples
│   └── bad.md            # Anti-patterns
└── scripts/
    └── validate.sh       # Scripts utilitaires
```

## Frontmatter par type de skill

### Skill référence (connaissances)
```yaml
---
name: api-conventions
description: API design patterns for this codebase. Use when writing endpoints.
---
```

### Skill tâche (workflow)
```yaml
---
name: deploy
description: Deploy to production
disable-model-invocation: true
context: fork
---
```

### Skill background (Claude only)
```yaml
---
name: legacy-context
description: Context about legacy systems
user-invocable: false
---
```

## Checklist

- [ ] Nom en kebab-case
- [ ] Description avec mots-clés de déclenchement
- [ ] Instructions claires et ordonnées
- [ ] Moins de 500 lignes (détails dans references/)
- [ ] Exemples inclus si format spécifique
- [ ] Tools restreints si nécessaire
