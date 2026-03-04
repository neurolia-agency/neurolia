# B01 — Setup : Supabase + Auth + Layout

## Objectif

Scaffolder le projet Next.js, configurer Supabase (schema + auth), et creer le layout de base (sidebar, header, navigation par role).

## Inputs

- `pipeline/output/03-structure/data-model.md` — schema DB complet
- `pipeline/output/03-structure/auth-strategy.md` — providers, roles, middleware
- `pipeline/output/03-structure/routes.md` — routes par role + navigation
- `pipeline/output/04-wireframes/navigation-map.md` — structure navigation
- `app/globals.css` — tokens CSS

## Agent

**`backend-layer`** (opus) pour auth + schema + RLS
**`dashboard-ui-builder`** (sonnet) pour layout + navigation

## Processus

### 1. Scaffold Next.js (si pas deja fait)

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
npm install @supabase/supabase-js @supabase/ssr
npm install react-hook-form @hookform/resolvers zod sonner lucide-react
npm install recharts date-fns  # Si KPIs/calendrier
```

### 2. Supabase Setup

#### 2.1 Schema SQL
Creer `supabase/migrations/001_initial_schema.sql` :
- Toutes les tables de `data-model.md`
- Enums
- Indexes
- Trigger `updated_at` avec `moddatetime`

#### 2.2 RLS Policies
Creer `supabase/migrations/002_rls_policies.sql` :
- `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` sur chaque table
- Policies par role (SELECT, INSERT, UPDATE, DELETE)

#### 2.3 Supabase Clients
Creer les fichiers dans `src/lib/supabase/` :
- `client.ts` — createBrowserClient
- `server.ts` — createServerClient (avec cookies)
- `admin.ts` — createClient avec service_role
- `middleware.ts` — refresh session

#### 2.4 Types
```bash
supabase gen types typescript --schema public > src/types/database.ts
```

### 3. Auth Middleware

Creer `middleware.ts` a la racine :
- Routes publiques (login, register, etc.)
- Routes protegees par role
- Redirect selon le role apres auth
- Refresh session automatique

### 4. Layout

#### 4.1 Root Layout (`src/app/layout.tsx`)
- Fonts
- Metadata
- ThemeProvider (si dark mode)
- Toaster (sonner)

#### 4.2 Role Layouts

**`src/app/([role_1])/layout.tsx`** :
- Sidebar (desktop) + Tab bar (mobile)
- Header avec titre page, notifications, profil
- Zone de contenu avec padding

**`src/app/([role_2])/layout.tsx`** :
- Header minimal
- Tab bar mobile
- Zone de contenu

**`src/app/(auth)/layout.tsx`** :
- Layout centre sans sidebar
- Logo + formulaire

#### 4.3 Composants Navigation
- `components/layout/sidebar.tsx` — navigation desktop
- `components/layout/mobile-nav.tsx` — tab bar mobile
- `components/layout/header.tsx` — header avec actions
- `components/layout/breadcrumb.tsx` — fil d'ariane

### 5. Env Variables

Creer `.env.example` :
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
WEBHOOK_SECRET=
```

Creer `.env.local` (copie de `.env.example` avec vraies valeurs, pas versionne).

## Output

```
src/
├── app/
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Tokens (deja fait en A05)
│   ├── (auth)/layout.tsx     # Layout auth
│   ├── ([role_1])/layout.tsx # Layout role 1
│   └── ([role_2])/layout.tsx # Layout role 2
├── components/
│   └── layout/
│       ├── sidebar.tsx
│       ├── mobile-nav.tsx
│       ├── header.tsx
│       └── breadcrumb.tsx
├── lib/
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       ├── admin.ts
│       └── middleware.ts
└── types/
    └── database.ts

supabase/
└── migrations/
    ├── 001_initial_schema.sql
    └── 002_rls_policies.sql

middleware.ts
.env.example
```

## Validation

- [ ] `npm run build` sans erreurs
- [ ] `npm run dev` demarre sans crash
- [ ] Schema SQL executable (pas d'erreurs)
- [ ] RLS active sur toutes les tables
- [ ] Login → redirect vers dashboard du role
- [ ] Route interdite → redirect login
- [ ] [Role 1] ne peut pas acceder aux routes [Role 2]
- [ ] Sidebar/header affiche la bonne navigation
- [ ] Mobile : tab bar visible, sidebar cachee
- [ ] Types TS generes et importables
