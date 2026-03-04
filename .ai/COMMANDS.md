# AI Commands

Commandes opérationnelles pour Claude Code + Gemini CLI dans ce repo.

## Préflight

Vérifie que le repo est prêt avant de lancer un agent.

```bash
scripts/ai/preflight.sh
```

## Claude

Lance Claude en session interactive depuis le repo.

```bash
scripts/ai/run-claude.sh
```

Lance Claude avec une consigne initiale.

```bash
scripts/ai/run-claude.sh "Ta consigne"
```

## Gemini (design)

Entrée recommandée:

Lance Gemini design en mode interactif (contexte auto).

```bash
scripts/ai/run-gemini-design.sh
```

Lance Gemini design avec une consigne initiale.

```bash
scripts/ai/run-gemini-design.sh "Ta consigne design"
```

Force un projet précis à analyser.

```bash
scripts/ai/run-gemini-design.sh --project neurolia-site "Refonte Hero"
```

Affiche les fichiers de contexte résolus sans ouvrir de session Gemini.

```bash
scripts/ai/run-gemini-design.sh --dry-run --project neurolia-site "Test contexte"
```

Alias de compatibilité:

Alias historique vers le même launcher design.

```bash
scripts/ai/run-gemini.sh
```

Alias historique avec consigne initiale.

```bash
scripts/ai/run-gemini.sh "Ta consigne design"
```

## Bootstrap projet design

Créer automatiquement `gemini-design` local + `AI_CONTEXT_DESIGN.md`:

```bash
scripts/ai/bootstrap-design-project.sh --project <path>
```

Forcer la régénération:

Régénère uniquement le script local `gemini-design`.

```bash
scripts/ai/bootstrap-design-project.sh --project <path> --force-wrapper
```

Régénère uniquement `AI_CONTEXT_DESIGN.md`.

```bash
scripts/ai/bootstrap-design-project.sh --project <path> --force-context
```

Créer uniquement `AI_CONTEXT_DESIGN.md`:

Crée le fichier contexte si absent.

```bash
scripts/ai/init-design-context.sh --project <path>
```

Écrase et régénère le fichier contexte.

```bash
scripts/ai/init-design-context.sh --project <path> --force
```

## Utilisation dans un projet

Après bootstrap, depuis le dossier projet:

Ouvre une session Gemini design directement dans le projet.

```bash
./gemini-design
```

Ouvre la session avec consigne initiale.

```bash
./gemini-design "Refonte Hero section"
```

Vérifie le contexte chargé sans ouvrir la session.

```bash
./gemini-design --dry-run "Test contexte"
```
