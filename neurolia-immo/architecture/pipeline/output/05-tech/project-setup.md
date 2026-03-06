# Project Setup - Neurolia-Immo

## Pre-requis

| Outil | Version | Installation |
|-------|---------|-------------|
| Node.js | 20 LTS+ | `brew install node` ou https://nodejs.org |
| npm | 10+ | Inclus avec Node.js 20 |
| Git | 2.40+ | `brew install git` |
| Supabase CLI | 1.200+ | `npm install -g supabase` |
| Capacitor CLI | 6.x | `npm install -g @capacitor/cli` |
| Xcode | 16+ | Mac App Store (pour build iOS) |
| Android Studio | 2024+ | https://developer.android.com/studio (pour build Android) |
| CocoaPods | 1.15+ | `sudo gem install cocoapods` (dependance Xcode) |

## Initialisation

### 1. Creer le projet

```bash
npx create-next-app@latest neurolia-immo \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack
```

### 2. Installer les dependances

```bash
cd neurolia-immo

# Supabase
npm install @supabase/supabase-js @supabase/ssr

# Capacitor (mobile wrapper)
npm install @capacitor/core @capacitor/cli
npx cap init "Neurolia-Immo" "fr.neurolia.immo" --web-dir=out

# Capacitor platforms
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android

# Capacitor plugins
npm install @capacitor/camera @capacitor/geolocation @capacitor/preferences @capacitor/app @capacitor/haptics @capacitor/status-bar @capacitor/splash-screen

# UI Components (shadcn/ui)
npx shadcn@latest init
npx shadcn@latest add button card input label tabs dialog sheet badge toast calendar dropdown-menu avatar separator skeleton scroll-area

# Formulaires & Validation
npm install react-hook-form @hookform/resolvers zod

# Utilitaires
npm install date-fns lucide-react recharts qrcode.react clsx tailwind-merge

# Dev
npm install -D prettier prettier-plugin-tailwindcss @types/node
```

### 3. Configuration

**Variables d'environnement** (`.env.local`) :

```env
# ============================================
# NEXT.JS / VERCEL
# ============================================

# Supabase (client - prefixe NEXT_PUBLIC_ = accessible cote client)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...votre-anon-key

# Supabase (server - JAMAIS expose cote client)
SUPABASE_SERVICE_ROLE_KEY=eyJ...votre-service-role-key

# n8n Webhooks (server)
N8N_WEBHOOK_API_KEY=votre-cle-64-hex
N8N_WEBHOOK_URL=http://localhost:5678

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Neurolia-Immo

# ============================================
# VARIABLES N8N (separees, dans l'env n8n)
# ============================================
# N8N_WEBHOOK_API_KEY=<meme-cle-que-ci-dessus>
# DASHBOARD_URL=http://localhost:3000
# N8N_WF04_WEBHOOK_URL=http://localhost:5678/webhook/wf04-cleaning-task
# N8N_WF05_WEBHOOK_URL=http://localhost:5678/webhook/wf05-auto-message
# IMAP_HOST=imap.gmail.com
# IMAP_PORT=993
# IMAP_USER=reservations@locimmo.fr
# IMAP_PASSWORD=<app-password>
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=reservations@locimmo.fr
# SMTP_PASSWORD=<app-password>
# SMTP_FROM_NAME=Neurolia-Immo
# SMTP_FROM_EMAIL=reservations@locimmo.fr
# ADMIN_EMAIL=support@neurolia.fr
```

**Fichier `.env.example`** (a commiter dans le repo) :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# n8n
N8N_WEBHOOK_API_KEY=
N8N_WEBHOOK_URL=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Neurolia-Immo
```

### 4. Configuration Capacitor

**`capacitor.config.ts`** :

```typescript
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "fr.neurolia.immo",
  appName: "Neurolia-Immo",
  webDir: "out",
  server: {
    // Dev: pointer vers le serveur Next.js local
    // url: "http://192.168.1.X:3000",
    // cleartext: true,
  },
  plugins: {
    Camera: {
      // iOS: ajouter NSCameraUsageDescription dans Info.plist
      // Android: permissions auto via plugin
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFFFFF",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
    },
  },
};

export default config;
```

**`next.config.ts`** (ajout export statique pour Capacitor) :

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pour Capacitor : generer un export statique
  // Decommenter pour build mobile :
  // output: "export",
  // images: { unoptimized: true },
};

export default nextConfig;
```

### 5. Configuration Supabase Local

```bash
# Initialiser Supabase local
supabase init

# Demarrer les services locaux (PostgreSQL, Auth, Storage, Realtime)
supabase start

# Appliquer les migrations (quand disponibles)
supabase db reset
```

### 6. Structure du Projet

```
neurolia-immo/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Routes auth (login, register, callback)
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── register-staff/page.tsx
│   │   │   └── callback/route.ts   # Magic link callback
│   │   ├── (owner)/                # Routes owner (layout avec 3 tabs)
│   │   │   ├── layout.tsx          # Bottom tabs: Accueil, Calendrier, Gestion
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── calendar/page.tsx
│   │   │   ├── management/
│   │   │   │   ├── page.tsx        # Hub Gestion
│   │   │   │   ├── properties/
│   │   │   │   ├── team/
│   │   │   │   └── settings/
│   │   │   ├── reservations/[id]/page.tsx
│   │   │   ├── cleaning-status/page.tsx
│   │   │   └── anomalies/[id]/page.tsx
│   │   ├── (staff)/                # Routes staff (layout avec 2 tabs)
│   │   │   ├── layout.tsx          # Bottom tabs: Planning, Profil
│   │   │   ├── planning/page.tsx
│   │   │   ├── task/[id]/page.tsx  # Fiche intervention
│   │   │   ├── property-info/[id]/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── livret/[slug]/page.tsx  # Livret d'accueil public (pas d'auth)
│   │   ├── api/
│   │   │   └── webhooks/
│   │   │       └── n8n/
│   │   │           ├── reservation/route.ts
│   │   │           ├── ical-alert/route.ts
│   │   │           └── task-created/route.ts
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Splash / redirect
│   │   └── globals.css             # Tailwind + design tokens
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── owner/                  # Composants owner specifiques
│   │   ├── staff/                  # Composants staff specifiques
│   │   └── shared/                 # Composants partages
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # createBrowserClient (client-side)
│   │   │   ├── server.ts           # createServerClient (server-side)
│   │   │   ├── middleware.ts       # updateSession helper
│   │   │   └── admin.ts            # createClient with service_role
│   │   ├── capacitor/
│   │   │   ├── camera.ts           # Wrapper Camera plugin
│   │   │   └── geolocation.ts      # Wrapper Geolocation plugin
│   │   ├── utils.ts                # cn(), formatDate(), etc.
│   │   └── constants.ts            # App-wide constants
│   └── types/
│       ├── database.ts             # Types generes par Supabase CLI
│       ├── auth.ts                 # UserRole, AuthState
│       └── index.ts                # Re-exports
├── supabase/
│   ├── migrations/                 # SQL migrations (schema A03)
│   ├── functions/                  # Edge Functions (A04)
│   │   ├── create-invitation/
│   │   ├── validate-invitation/
│   │   ├── on-auth-user-created/
│   │   └── get-public-welcome-guide/
│   ├── seed.sql                    # Donnees de test
│   └── config.toml                 # Config Supabase local
├── ios/                            # Projet Xcode (genere par Capacitor)
├── android/                        # Projet Android Studio (genere par Capacitor)
├── public/
│   ├── icons/                      # App icons (PWA + stores)
│   └── manifest.json               # PWA manifest
├── capacitor.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.local                      # Variables locales (non commite)
├── .env.example                    # Template variables (commite)
└── middleware.ts                    # Next.js middleware (auth + redirections)
```

### 7. Scripts de Developpement

```bash
# ============================================
# DEVELOPPEMENT WEB
# ============================================

# Demarrer le serveur de dev (Turbopack)
npm run dev

# Build production web
npm run build

# Lancer le serveur de production
npm run start

# Linting
npm run lint
npm run lint -- --fix

# Type checking
npx tsc --noEmit

# ============================================
# SUPABASE LOCAL
# ============================================

# Demarrer Supabase local
supabase start

# Arreter Supabase local
supabase stop

# Reset base de donnees (applique migrations + seed)
supabase db reset

# Generer les types TypeScript depuis le schema
supabase gen types typescript --local > src/types/database.ts

# Creer une nouvelle migration
supabase migration new nom_migration

# ============================================
# MOBILE (CAPACITOR)
# ============================================

# Build statique pour mobile
npm run build  # Puis changer next.config.ts: output: "export"

# Synchroniser le build avec les projets natifs
npx cap sync

# Ouvrir dans Xcode (iOS)
npx cap open ios

# Ouvrir dans Android Studio (Android)
npx cap open android

# Dev mobile avec live reload
# 1. Decommenter server.url dans capacitor.config.ts
# 2. npm run dev
# 3. npx cap run ios / npx cap run android

# ============================================
# PRODUCTION BUILD
# ============================================

# Build web (Vercel)
# → Push sur main, Vercel deploy automatiquement

# Build iOS (store)
# 1. output: "export" dans next.config.ts
# 2. npm run build
# 3. npx cap sync ios
# 4. Ouvrir Xcode → Archive → Upload to App Store Connect

# Build Android (store)
# 1. output: "export" dans next.config.ts
# 2. npm run build
# 3. npx cap sync android
# 4. Android Studio → Build → Generate Signed Bundle (.aab)
```

## Configuration par Environnement

| Variable | Development | Staging | Production |
|----------|-------------|---------|------------|
| NEXT_PUBLIC_SUPABASE_URL | http://127.0.0.1:54321 | https://staging-xxx.supabase.co | https://prod-xxx.supabase.co |
| NEXT_PUBLIC_APP_URL | http://localhost:3000 | https://staging.neurolia-immo.fr | https://app.neurolia-immo.fr |
| N8N_WEBHOOK_URL | http://localhost:5678 | https://n8n-staging.neurolia-immo.fr | https://n8n.neurolia-immo.fr |
| Capacitor server.url | http://192.168.1.X:3000 | - | - |
| Vercel | Preview | Preview branch | Production |

## Checklist de Setup

- [ ] Node.js 20+ installe (`node -v`)
- [ ] Projet Next.js initialise (`npx create-next-app@latest`)
- [ ] Dependances installees (`npm install`)
- [ ] Supabase CLI installe (`supabase --version`)
- [ ] Supabase local demarre (`supabase start`)
- [ ] Variables `.env.local` configurees
- [ ] Types generes (`supabase gen types typescript`)
- [ ] Capacitor initialise (`npx cap init`)
- [ ] Capacitor iOS ajoute (`npx cap add ios`)
- [ ] Capacitor Android ajoute (`npx cap add android`)
- [ ] Serveur de dev demarre (`npm run dev`)
- [ ] Premier build reussi (`npm run build`)
- [ ] shadcn/ui initialise (`npx shadcn@latest init`)
- [ ] ESLint + Prettier configures
- [ ] `.env.example` commite dans le repo

---

**Version** : 1.0
**Phase** : A05 (Architecture)
**Dependances** : A01 (PRD), A04 (Integrations, Variables d'Environnement)
