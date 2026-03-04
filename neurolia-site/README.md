# Neurolia

Site vitrine agence web. **Statut : Phase B-5 (validation)**

## Structure

```
neurolia/
│
├── 📋 DOCUMENTATION
│   ├── CLAUDE.md          # Instructions agent + statut pipeline
│   ├── README.md          # Ce fichier
│   └── IMAGES.md          # Inventaire assets visuels
│
├── 📁 DONNÉES SOURCE
│   ├── input/             # Données client (brief, assets)
│   └── references/        # Références (inspiration + UI dev)
│
├── 🔄 PIPELINE (workflow séquentiel)
│   └── pipeline/
│       ├── output/        # Artifacts générés
│       ├── stages/        # Instructions étapes
│       └── workflow/      # Documentation pipeline
│
├── 💻 CODE (Next.js - conventions framework)
│   ├── app/               # Routes et pages
│   ├── components/        # Composants React
│   ├── lib/               # Utilitaires
│   └── public/            # Assets statiques
│
└── ⚙️ CONFIG (requis à la racine par les outils)
    ├── package.json       # Node.js
    ├── tsconfig.json      # TypeScript
    ├── tailwind.config.ts # Tailwind CSS
    ├── next.config.ts     # Next.js
    ├── postcss.config.js  # PostCSS
    └── components.json    # shadcn/ui
```

## Commandes

```bash
npm run dev     # Serveur développement (http://localhost:3000)
npm run build   # Build production
npm run lint    # Vérification code
```

## Documentation

| Fichier | Contenu | Pour qui |
|---------|---------|----------|
| `CLAUDE.md` | Statut pipeline, sources de vérité | Agent Claude |
| `IMAGES.md` | Liste des images et leur statut | Développeur UI |
| `pipeline/README.md` | Flux du workflow | Agent Claude |
