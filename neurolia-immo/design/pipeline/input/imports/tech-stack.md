# Tech Stack - Neurolia-Immo

## Decision

**Stack retenue** : Next.js 15 (PWA mobile-first) + Capacitor 6 (wrapper natif iOS/Android)
**Justification** : Le projet requiert une presence sur les stores (iOS + Android) ET une interface web riche (dashboard owner). Next.js 15 fournit le framework web optimal (SSR, API routes, edge middleware) deja valide dans l'architecture A04. Capacitor 6 enveloppe l'application web pour les stores avec acces natif (camera, geolocation, push) sans maintenir 2 codebases. Budget < 5 000 EUR et timeline 6-8 semaines imposent une base de code unique.

## Matrice de Decision

| Critere | Poids | PWA (Next.js) | React Native (Expo) | Flutter | Natif (Swift/Kotlin) |
|---------|-------|---------------|---------------------|---------|---------------------|
| Presence Store | 20% | 2 - TWA/PWA Builder, experience limitee iOS | 5 - iOS + Android natif via EAS | 5 - iOS + Android natif | 5 - iOS + Android natif |
| Mode Offline | 15% | 3 - Service Workers + Cache API | 5 - AsyncStorage + SQLite + WatermelonDB | 4 - Hive/Isar offline-first | 5 - Core Data / Room natif |
| Features Natives | 15% | 3 - Camera via Capacitor, GPS via web, Push via Capacitor | 5 - Camera, GPS, Push, Biometrie natifs | 4 - Camera, GPS, Push via plugins | 5 - Acces complet hardware |
| Budget | 15% | 5 - 1 codebase web + wrapper Capacitor | 3 - 1 codebase mobile + web (Expo Router) mais refonte architecture | 3 - 1 codebase Dart, pas d'API routes Next.js | 1 - 2 codebases separees |
| Performance | 10% | 3 - WebView, suffisant pour dashboard/formulaires | 4 - Bridge JS, bon pour listes et animations | 5 - Compile natif, animations fluides | 5 - Natif pur, optimal |
| Time-to-Market | 10% | 5 - App web existante, Capacitor en 2-3 jours | 3 - Refonte UI avec composants RN, 3-4 semaines | 2 - Nouveau langage Dart, 6-8 semaines | 1 - 2 codebases, 12+ semaines |
| Ecosysteme / Libs | 10% | 5 - NPM complet + Supabase JS SDK + Capacitor plugins | 4 - NPM + react-native specifique, Supabase JS SDK | 3 - pub.dev, Supabase Dart SDK moins mature | 4 - Ecosysteme natif riche |
| Competences Equipe | 5% | 5 - React/Next.js maitrise | 4 - React transferable, RN specifiques a apprendre | 1 - Dart inconnu | 2 - Swift/Kotlin a apprendre |
| **Score Total** | **100%** | **3.70** | **4.00** | **3.50** | **3.40** |

### Analyse des Scores

- **React Native (Expo) = 4.00** : Meilleur score brut grace a l'UX native mobile. Mais incompatible avec l'architecture A04 (Next.js API routes, Vercel edge middleware, SSR). Necessiterait une refonte complete du backend delivery.
- **PWA + Capacitor = 3.70** : Second score, mais **seule option compatible avec l'architecture A01-A04 existante**. Pas de refonte, ajout Capacitor en surcouche.
- **Flutter = 3.50** : Performances excellentes mais langage Dart inconnu et Supabase Dart SDK moins mature.
- **Natif = 3.40** : Elimine par le budget (2 codebases).

### Decision Finale

**Next.js 15 + Capacitor 6** est retenu malgre un score brut legerement inferieur a Expo car :

1. **Compatibilite architecture** : A04 definit Next.js API routes + Vercel edge middleware + SSR. Expo Router necessiterait de refaire toute la couche backend delivery.
2. **Budget** : 1 codebase = 1 equipe = < 5 000 EUR
3. **Time-to-market** : Application web fonctionnelle d'abord, wrapper Capacitor en 2-3 jours
4. **Evolution Phase 2** : Si l'UX mobile necessite du vrai natif, migration vers Expo est possible en Phase 2 sans toucher au backend Supabase.

## Contraintes Specifiques du Projet

| Contrainte | Impact sur le Choix |
|------------|-------------------|
| Store iOS + Android obligatoire | Elimine PWA pur. Capacitor fournit le wrapper natif pour les stores. |
| Camera pour photos de taches (MVP) | Capacitor Camera plugin : capture native, retour base64/URI. Fallback web `<input capture>`. |
| Budget < 5 000 EUR | Elimine natif (2 codebases). Impose codebase unique. Next.js + Capacitor optimal. |
| Timeline 6-8 semaines MVP | Next.js + Capacitor = app web d'abord (4-5 sem) + wrapper mobile (1 sem). Expo = refonte UI (6-8 sem). |
| Equipe React/Next.js | Transfert de competences immediat. Pas de Dart/Swift/Kotlin a apprendre. |
| Dashboard owner (desktop-heavy) | Next.js SSR + tables/calendriers = experience web native superieure a React Native Web. |
| Personnel mobile-first (terrain) | Capacitor fournit camera, GPS, push. WebView performant pour checklists/formulaires. |
| Offline Phase 2 | Capacitor Preferences + SQLite plugin. Service Workers pour cache statique. |
| Architecture A04 = Next.js API routes | Incompatible avec Expo Router (pas de server components). Capacitor preserve l'architecture. |
| Multi-tenant RLS Supabase | Supabase JS SDK identique web et Capacitor. Pas d'impact sur le choix. |

## Stack Detaillee

### Frontend (Web + Mobile)

| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| Framework | Next.js | 15.2+ | App Router, Server Components, API Routes, choix valide A01-A04 |
| Runtime | React | 19 | Server Components, Suspense, Transitions, optimistic updates |
| Langage | TypeScript | 5.7+ | Typage strict, inference amelioree, enums satisfies |
| Styling | Tailwind CSS | 4.0 | Utility-first, design tokens via CSS variables, tree-shaking natif |
| Mobile Wrapper | Capacitor | 6.x | Wrapper natif iOS/Android, plugins camera/GPS/push, WebView optimise |
| Navigation | Next.js App Router | 15.2+ | File-based routing, layouts imbriques, loading/error states |
| State Management | React Context + Supabase Realtime | - | Context pour auth/theme, Supabase Realtime pour donnees temps reel |
| Formulaires | React Hook Form | 7.x | Performances (re-renders minimaux), validation schema Zod |
| Validation | Zod | 3.x | Schema validation, inference TypeScript, partage client/server |
| UI Components | shadcn/ui | latest | Composants accessibles, customisables, pas de lock-in, Tailwind natif |
| Icones | Lucide React | latest | Coherent, tree-shakable, 1500+ icones |
| Calendrier | react-day-picker | 9.x | Leger, accessible, compatible shadcn/ui |
| Dates | date-fns | 4.x | Fonctions pures, tree-shakable, locale fr |
| Charts/KPIs | Recharts | 2.x | React natif, responsive, animations |
| Camera (mobile) | @capacitor/camera | 6.x | Capture photo native iOS/Android, retour base64/URI |
| Geolocation (mobile) | @capacitor/geolocation | 6.x | Coordonnees GPS, tap-to-navigate vers Maps |
| Push (Phase 2) | @capacitor/push-notifications | 6.x | APNs (iOS) + FCM (Android), token registration |
| QR Code | qrcode.react | latest | Generation QR code livret d'accueil |

### Backend

| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| BaaS | Supabase | hosted | PostgreSQL + Auth + Realtime + Storage + Edge Functions, doc A03-A04 |
| Base de donnees | PostgreSQL | 15 | 13 tables, RLS multi-tenant, enums, triggers pg_net |
| Auth | Supabase Auth | - | Magic Link + Google OAuth, JWT, refresh tokens, doc A03 auth-strategy |
| Realtime | Supabase Realtime | - | Subscriptions cleaning_tasks, notifications, reservations, anomalies |
| Storage | Supabase Storage | - | 4 buckets : task-photos, avatars, welcome-guides, qr-codes |
| Edge Functions | Supabase Edge Functions | Deno | create_invitation, validate_invitation, on_auth_user_created, etc. |
| API REST | Supabase PostgREST | auto | CRUD auto-genere sur 13 tables, filtres, pagination, RLS |
| API Routes | Next.js API Routes | 15.2+ | 3 webhooks n8n→App (/reservation, /ical-alert, /task-created) |
| Middleware | Next.js Edge Middleware | - | Auth verification, redirections role-based, CORS |
| Hosting | Vercel | - | Serverless, edge network, preview deployments, zero-config Next.js |

### Automations

| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| Orchestrateur | n8n | self-hosted | 6 workflows (WF01-WF06), cron triggers, webhooks, doc A04 |
| Hosting n8n | VPS (Railway ou Hetzner) | - | Self-hosted pour IMAP credentials, pas de limites cloud |
| Email entrant | IMAP | - | Polling */2min, parsing confirmations Airbnb/Booking |
| Email sortant | SMTP | - | 8 types d'emails (welcome, digest, alerts, invitations) |
| Calendrier | iCal feeds | RFC 5545 | Sync */30min Airbnb + Booking, parsing VEVENT |

### Outils de Developpement

| Composant | Technologie | Usage |
|-----------|-------------|-------|
| Package Manager | npm | 10+ (inclus avec Node.js 20) |
| Linter | ESLint | 9.x avec flat config |
| Formatter | Prettier | 3.x avec plugin Tailwind |
| CI/CD | Vercel (web) + EAS Build (mobile) | Build automatique sur push, preview deploys |
| Monitoring | Sentry | Erreurs frontend + API routes |
| Analytics | Vercel Analytics | Web Vitals, performances, usage |
| Testing | Vitest + Testing Library | Unit + integration (Phase 2) |
| E2E (Phase 2) | Playwright | Tests end-to-end web |
| Store Build | Capacitor + Xcode + Android Studio | Build iOS (.ipa) + Android (.apk/.aab) |

## Architecture de Deploiement

```
                    ┌──────────────────┐
                    │   App Store /    │
                    │   Google Play    │
                    │  (Capacitor 6)   │
                    └────────┬─────────┘
                             │ WebView
                             ▼
┌────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  Navigateur │      │   Vercel Edge    │      │   Supabase       │
│  (PWA)     │─────▶│   Next.js 15     │─────▶│   PostgreSQL 15  │
└────────────┘      │   API Routes     │      │   Auth / RLS     │
                    │   Middleware      │      │   Realtime       │
                    └────────┬─────────┘      │   Storage        │
                             │                │   Edge Functions  │
                             │                └────────┬─────────┘
                             │                         │
                             │    ┌────────────────────┘
                             │    │ Database Webhooks
                             ▼    ▼
                    ┌──────────────────┐
                    │   n8n            │
                    │   Self-hosted    │
                    │   6 workflows    │
                    │   IMAP + SMTP    │
                    │   iCal sync      │
                    └──────────────────┘
```

## Strategie de Migration Phase 2

Si l'experience mobile WebView s'avere insuffisante apres le MVP :

1. **Evaluation** : Metriques de performance mobile (temps de chargement, FPS scroll, crash rate)
2. **Decision** : Si < 60 FPS sur listes ou camera lag > 500ms → migrer vers Expo
3. **Migration** : Frontend mobile uniquement (Expo Router), backend Supabase inchange
4. **Cout** : 4-6 semaines supplementaires, composants React reutilisables a 60-70%
5. **Alternative** : Optimiser WebView (preloading, skeleton screens, cache agressif) avant migration

---

**Version** : 1.0
**Phase** : A05 (Architecture)
**Dependances** : A01 (PRD, Features), A03 (Data Model), A04 (API Contracts, Integrations)
**Consomme par** : Pipeline Design (D01-D10), Pipeline n8n (N01-N06)
