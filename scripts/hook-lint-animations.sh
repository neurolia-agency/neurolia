#!/bin/bash
# Hook pour lint-animations.js
# Lit le JSON stdin de Claude Code et exécute le lint si fichier CSS/HTML

# Lire le JSON depuis stdin
INPUT=$(cat)

# Extraire le file_path avec jq
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Vérifier que le fichier existe et est CSS/HTML
if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

if [[ ! "$FILE_PATH" =~ \.(css|html|htm|scss|vue)$ ]]; then
  exit 0
fi

if [[ ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Exécuter le lint
node /Users/jorisgustiez/Dev/Claude/projects/scripts/lint-animations.js "$FILE_PATH"

# Toujours retourner 0 pour ne pas bloquer (c'est un warning, pas un blocage)
exit 0
