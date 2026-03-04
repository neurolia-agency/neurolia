# Checklist Nouveau Projet

## Phase 1: Initialisation

- [ ] Créer le repo ou dossier projet
- [ ] `cd project && claude`
- [ ] `/init` pour générer CLAUDE.md de base
- [ ] Réviser et nettoyer le CLAUDE.md généré

## Phase 2: Structure .claude/

- [ ] Créer `.claude/` si nécessaire
- [ ] Décider: rules modulaires ou CLAUDE.md unique?

### Si rules modulaires:
- [ ] Créer `.claude/rules/`
- [ ] Identifier les règles par domaine:
  - [ ] `code-style.md` - Conventions de style
  - [ ] `testing.md` - Conventions de test
  - [ ] `[domain].md` - Règles spécifiques

### Si CLAUDE.md unique:
- [ ] Garder CLAUDE.md < 100 lignes
- [ ] Structurer avec sections markdown

## Phase 3: CLAUDE.md contenu

### Obligatoire
- [ ] Commandes bash principales (dev, build, test, lint)
- [ ] Stack technique (framework, styling, DB)

### Si applicable
- [ ] Structure projet si non-standard
- [ ] Règles de style différentes des défauts
- [ ] Gotchas et comportements non-évidents
- [ ] Conventions de nommage spécifiques
- [ ] Workflow git (branches, commits)

### À éviter
- [ ] ❌ Pas d'info que Claude peut inférer du code
- [ ] ❌ Pas de conventions standard du langage
- [ ] ❌ Pas de documentation API détaillée
- [ ] ❌ Pas d'info qui change souvent

## Phase 4: Vérification

- [ ] Relire chaque ligne: "Supprimer causerait des erreurs?"
- [ ] Tester avec une tâche simple
- [ ] Ajuster si Claude ne suit pas les instructions

## Phase 5: Git

- [ ] Ajouter `CLAUDE.local.md` à `.gitignore`
- [ ] Commit CLAUDE.md et .claude/
- [ ] Documenter dans README que le projet utilise Claude Code

## Optionnel: Extensions

### Skills projet
- [ ] Identifier workflows répétitifs → skills
- [ ] Créer `.claude/skills/` si besoin
- [ ] Un skill par workflow distinct

### Subagents projet
- [ ] Identifier tâches déléguables → subagents
- [ ] Créer `.claude/agents/` si besoin
- [ ] Configurer tools et permissions appropriés

### Hooks
- [ ] Identifier actions automatiques nécessaires
- [ ] Configurer dans `.claude/settings.json`

---

## Quick Setup (minimum viable)

```bash
cd my-project
claude
> /init
# Réviser CLAUDE.md
# Supprimer le superflu
# Commit
```
