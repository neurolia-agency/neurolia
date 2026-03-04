# Regle : Verification des placeholders [BRACKET]

## Declencheur

Cette regle s'applique quand tu termines une etape pipeline (modification dans `pipeline/output/*`, `app/globals.css`, `CLAUDE.md`, ou `PLAN.md`).

## Action OBLIGATOIRE

Apres chaque etape, scanner les fichiers cles pour detecter les placeholders `[...]` restants qui auraient du etre remplis.

### Comment scanner

Chercher le pattern `\[.*\]` dans les fichiers concernes, en excluant :
- `[ ]` (checkboxes markdown)
- `[A COMPLETER]` (placeholder volontaire en attente d'info client)
- `[Si applicable]` (sections conditionnelles)
- Contenu des blocs code (templates/snippets dans les skills)

### Quoi scanner, quand

#### Apres A01-init (ou `/init-dashboard`)

**Fichiers** : `CLAUDE.md`, `PLAN.md`

**Zero placeholders restants** :
- `[NOM_PROJET]`, `[CLIENT]`, `[NOM_CLIENT]`
- `[DESCRIPTION_COURTE]`, `[DESCRIPTION]`
- `[KPI]`, `[DATE]`
- `[ROLE_1]`, `[ROLE_2]`, `[ROLE_3]`
- `[Raison]` (decisions techniques dans PLAN.md)

**Tolerance** : `[A definir]` dans la section ADN Visuel (sera rempli en A02).

#### Apres A03-structure

**Fichiers** : `pipeline/output/03-structure/workflow-map.md`

**Zero placeholders restants** :
- `[Nom]` dans le tableau de triage (chaque feature doit etre nommee)
- `[Raison]` / `[Justification]` (chaque verdict doit etre justifie)
- `[WF0X]` dans les specs workflows (chaque WF doit avoir son ID attribue)
- `[Trigger]`, `[Type]` dans les specs (chaque workflow doit etre specifie)

**Tolerance** :
- `[A COMPLETER]` pour les services externes dont les credentials ne sont pas encore connus
- `[endpoint]` dans les URLs webhook si le domaine Hostinger n'est pas encore configure

#### Apres A05-design-tokens

**Fichiers** : `app/globals.css`

**Zero placeholders restants** :
- Tous les `[OKLCH_*]` (couleurs)
- `[FONT_UI]`, `[FONT_MONO]`, `[FONT_UI_NAME]`, `[FONT_MONO_NAME]`
- `[SIDEBAR_WIDTH]`, `[SIDEBAR_COLLAPSED]`, `[HEADER_HEIGHT]`, `[HEADER_HEIGHT_MOBILE]`
- `[HUE]` (gamme de gris)

**Tolerance** : aucune. Le globals.css est un fichier CSS executable — tout placeholder non rempli causera un bug.

#### Apres A05 + mise a jour CLAUDE.md

**Fichiers** : `CLAUDE.md` section "ADN Visuel"

**Zero placeholders restants** :
- `[A definir]` pour couleur, style, densite, radius, typographies
- `[Critere N]` dans le test rapide

#### Apres B04-automations

**Fichiers** : `.env.example`, `n8n-workflows/*.md`

**Zero placeholders restants dans .env.example** :
- Les noms de variables doivent etre definis (meme si les valeurs restent vides)

**Tolerance** : les valeurs `.env` sont volontairement vides (remplies par l'humain).

#### Apres B06-deploy (verification finale)

**Fichiers** : TOUS les fichiers du projet (hors `node_modules/`, `.next/`, `pipeline/stages/`, `.claude/skills/`)

**Zero placeholders restants** — sauf dans :
- Les fichiers de skills (`.claude/skills/`) — ils contiennent des templates/snippets par design
- Les fichiers de stages (`pipeline/stages/`) — ce sont des instructions, pas des outputs
- Les fichiers d'agents (`.claude/agents/`) — ce sont des configurations, pas des outputs

## Format du rapport

Apres le scan, fournir un rapport :

```markdown
## Scan placeholders — [Etape]

### Fichiers scannes : N
### Placeholders restants : N

| Fichier | Placeholder | Attendu ? |
|---------|-------------|-----------|
| [fichier] | [placeholder] | Oui (tolerance) / NON (a corriger) |

### Verdict : OK / X placeholders a corriger
```

## Anti-pattern

- INTERDIT de marquer une etape comme terminee si des placeholders non-toleres restent
- INTERDIT d'ignorer ce scan "pour aller plus vite"
- Le scan est rapide (grep) — il ne ralentit pas le workflow
