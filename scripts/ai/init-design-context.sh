#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

target_dir=""
force="0"

usage() {
  cat <<'USAGE'
Usage: scripts/ai/init-design-context.sh [--project <path>] [--force]

Creates <project>/AI_CONTEXT_DESIGN.md if missing.
USAGE
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --project)
      shift
      if [ "$#" -eq 0 ]; then
        echo "Missing value for --project" >&2
        exit 1
      fi
      target_dir="$1"
      ;;
    --force)
      force="1"
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
  shift
done

if [ -z "$target_dir" ]; then
  target_dir="$PWD"
fi

if [ ! -d "$target_dir" ]; then
  echo "Project directory does not exist: $target_dir" >&2
  exit 1
fi

project_root="$(cd "$target_dir" && pwd)"
out_file="$project_root/AI_CONTEXT_DESIGN.md"
project_name="$(basename "$project_root")"

if [ -f "$out_file" ] && [ "$force" != "1" ]; then
  echo "File already exists: $out_file"
  echo "Use --force to overwrite."
  exit 1
fi

{
printf '# AI Context Design — %s\n\n' "$project_name"
cat <<'TEMPLATE'
Contexte opérationnel pour travailler le design avec Claude Code et Gemini CLI.

## Objectif
- Décrire le cadre design du projet.
- Clarifier qui lit quoi et qui édite quoi.

## Rôles
- Gemini CLI: analyse design, critiques, variantes.
- Claude Code: implémentation code, validation technique.

## Convention de responsabilité
- Un seul agent writer par branche.
- Recommandé: Gemini propose, Claude implémente.

## Lecture autorisée pour Gemini (priorité)
1. `CLAUDE.md`
2. `README.md`
3. `app/globals.css`
4. `app/page.tsx`
5. `components/sections/*.tsx`
6. `pipeline/stages/B02-homepage.md`
7. `pipeline/stages/B04-polish.md`

## Lecture à éviter (bruit)
- `node_modules/`
- `.next/`
- `pipeline/output/` (lecture possible, pas de modification)

## Fichiers éditables (design)
- `app/globals.css`
- `app/page.tsx`
- `components/sections/*.tsx`

## Fichiers non éditables
- `pipeline/output/**`
- `input/**` (sauf demande explicite)

## Workflow concret
1. Lire `CLAUDE.md` puis ce fichier.
2. Analyser l'état visuel actuel.
3. Proposer 2-3 options avec tradeoffs.
4. Valider une option.
5. Implémenter et vérifier lint/dev.

## Critères de validation design
- Lisibilité desktop/mobile.
- Contraste et hiérarchie.
- Cohérence avec l'ADN visuel du projet.

## Handoff minimal entre agents
- Fichiers modifiés.
- Décisions prises.
- Vérifications réalisées.
- Points ouverts.
TEMPLATE
} > "$out_file"

echo "Created: $out_file"
