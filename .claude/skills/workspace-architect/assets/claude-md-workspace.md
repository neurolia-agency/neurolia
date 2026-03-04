# Template CLAUDE.md Workspace

Pour workspace multi-projets. Placer à la racine du workspace.

---

```markdown
# [Workspace Name]

Workspace contenant [description des projets].

## Projects

| Folder | Type | Status | Priority |
|--------|------|--------|----------|
| `project-a/` | [Type] | [Status] | P0 |
| `project-b/` | [Type] | [Status] | P1 |

## Shared conventions

### Code style
- [Convention 1 appliquée à tous les projets]
- [Convention 2]

### Git workflow
- Branch naming: `feature/`, `fix/`, `chore/`
- Commit format: [conventional commits / autre]
- PR template: [si applicable]

### Commands pattern
```bash
# Tous les projets suivent ce pattern
npm run dev      # Serveur dev
npm run build    # Build prod
npm run test     # Tests
npm run lint     # Linter
```

## Per-project instructions

Chaque projet a son propre CLAUDE.md avec:
- Commandes spécifiques
- Stack technique
- Particularités

## Working with this workspace

1. Lire CLAUDE.md du projet cible avant de travailler
2. Respecter les priorités (P0 d'abord)
3. Ne pas modifier les outputs des autres projets

## Shared resources

- `_shared/templates/` - Templates réutilisables
- `_shared/scripts/` - Scripts partagés
```

---

## Notes

- Ce fichier est chargé pour TOUS les projets du workspace
- Garder très concis - ne pas dupliquer ce qui est dans les CLAUDE.md projets
- Focus sur les conventions partagées uniquement
