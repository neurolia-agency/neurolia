# Skill : init-dashboard

## Description

Bootstrapper un nouveau projet dashboard depuis le template. Copie le template, remplace les placeholders, installe les dependances.

## Usage

Invoquer au debut d'un nouveau projet dashboard.

## Process

### 1. Copier le template

```bash
cp -r templates/dashboard-workflow_template/ clients/[nom-projet]/
cd clients/[nom-projet]/
```

### 2. Remplacer les placeholders dans CLAUDE.md

| Placeholder | Remplacer par |
|-------------|---------------|
| `[NOM_PROJET]` | Nom du projet (ex: dashboard-loc-immo) |
| `[CLIENT]` | Nom du client |
| `[DESCRIPTION_COURTE]` | Description 1 ligne |
| `[DESCRIPTION]` | Description complete |
| `[NOM_CLIENT]` | Nom officiel du client |
| `[KPI]` | KPI principal mesurable |
| `[ROLE_1]`, `[ROLE_2]`, `[ROLE_3]` | Roles utilisateurs |
| `[DATE]` | Date du jour |

### 3. Copier PLAN-TEMPLATE.md → PLAN.md

```bash
cp PLAN-TEMPLATE.md PLAN.md
```

Remplacer les memes placeholders dans PLAN.md.

### 4. Remplir le brief client

Ouvrir `pipeline/input/brief-client.md` et remplir avec les informations du client.

### 5. Generer .env.example

Creer `.env.example` a la racine :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# n8n (Hostinger)
N8N_WEBHOOK_BASE_URL=https://[HOSTINGER_DOMAIN]/webhook
N8N_WEBHOOK_SECRET=changeme-generate-a-real-secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Initialiser Next.js (si pas encore fait)

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

### 7. Installer les dependances

```bash
# Supabase
npm install @supabase/supabase-js @supabase/ssr

# UI
npm install react-hook-form @hookform/resolvers zod
npm install sonner lucide-react
npm install recharts date-fns

# Dev
npm install -D @types/node
```

### 8. Verification

- [ ] CLAUDE.md sans placeholders `[...]` restants
- [ ] PLAN.md cree et personnalise
- [ ] brief-client.md rempli (au moins sections OBLIGATOIRE)
- [ ] .env.example cree
- [ ] `npm run dev` demarre sans erreur
- [ ] Structure de dossiers conforme au template
