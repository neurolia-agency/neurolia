# neurolia-social — Social Media Automation

## Statut
Phase : V1 — Semaine 1 (Schema + Workflows)

## Description
Systeme d'automatisation de gestion des reseaux sociaux pour restaurateurs.
Publication autonome avec reporting. Objectif : 5 clients pilotes en 4 semaines.

## Architecture
Voir `docs/ARCHITECTURE.md` pour le document complet.

## Stack
- **Orchestration** : n8n (self-hosted Hostinger KVM2)
- **Base de donnees** : Supabase (PostgreSQL)
- **IA texte** : Claude API (Sonnet 4.5)
- **IA image** : Sharp + node-canvas + templates
- **Publication** : Meta Graph API (Instagram/Facebook) + Ayrshare (TikTok)
- **Dashboard** : Next.js 15 + Tailwind CSS 4 + Supabase Auth
- **Deploiement** : Vercel

## Structure
```
neurolia-social/
├── CLAUDE.md
├── docs/
│   └── ARCHITECTURE.md
├── supabase/
│   └── migrations/          # SQL migrations Supabase
├── n8n/
│   └── workflows/           # JSON exportes n8n
├── lib/
│   ├── prompts/             # Prompt templates (texte IA)
│   └── brand-memory/        # Utilitaires Brand Memory
├── templates/
│   └── visual/              # Templates visuels (Sharp/Canvas)
└── dashboard/               # App Next.js (reporting client)
```

## Workflows n8n

| Workflow | Description | Cron |
|----------|-------------|------|
| `planning-editorial` | Genere le planning hebdomadaire (7 posts) par client | Lundi 6h |
| `content-generation` | Produit texte + visuels pour chaque post planifie | Quotidien 7h |
| `publication` | Publie les posts "ready" aux horaires optimaux | Toutes les heures |
| `analytics-collection` | Collecte les metriques des posts publies | Quotidien 2h |

## Conventions
- SQL : snake_case pour tables et colonnes
- Prompts : stockes en Markdown dans `lib/prompts/`
- n8n workflows : exportes en JSON dans `n8n/workflows/`
- Pas d'accents dans les noms de fichiers

## Priorite actuelle
1. Schema Supabase (Brand Memory + Content Calendar)
2. Workflow n8n : planning editorial
3. Workflow n8n : generation contenu
4. Workflow n8n : publication
