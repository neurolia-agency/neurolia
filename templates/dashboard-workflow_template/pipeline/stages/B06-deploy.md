# B06 — Deploy : Production

## Objectif

Deployer le dashboard en production : Vercel (frontend), Supabase (backend), n8n (automations), avec monitoring et documentation.

## Agent

**`integration-builder`** (sonnet)

## Skill

`dashboard-deploy-checklist`

## Inputs

- Tout le code (B01-B05)
- `.env.example` — variables d'environnement
- `n8n-workflows/` — documentation workflows

## Processus

### 1. Pre-deploy Checklist

#### Code
- [ ] `npm run build` sans erreurs ni warnings
- [ ] `npm run lint` sans erreurs
- [ ] Pas de `console.log` restant
- [ ] Pas de TODO critiques non resolus
- [ ] `.env.example` a jour

#### Securite
- [ ] RLS active sur toutes les tables Supabase
- [ ] `SUPABASE_SERVICE_ROLE_KEY` jamais expose cote client
- [ ] Webhook secrets configures
- [ ] CORS configure si API publique
- [ ] Auth middleware fonctionnel

#### Donnees
- [ ] Schema de production identique au dev
- [ ] Seed data de production (si applicable, ex: config initiale)
- [ ] Migrations executables

### 2. Vercel Deployment

#### 2.1 Configuration
- Connecter le repo GitHub
- Branch de production : `main`
- Build command : `npm run build`
- Output directory : `.next`
- Node.js version : 20.x

#### 2.2 Environment Variables
Configurer dans Vercel Dashboard :
```
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
WEBHOOK_SECRET=[secret]
```

#### 2.3 Domain
- Configurer le domaine custom
- DNS : CNAME vers `cname.vercel-dns.com`
- SSL automatique (Let's Encrypt)

### 3. Supabase Production

#### 3.1 Projet
- Creer un projet Supabase production (region EU)
- Executer les migrations
- Verifier les RLS policies

#### 3.2 Auth
- Configurer les providers (Magic Link, OAuth)
- Configurer les redirect URLs (domaine production)
- Email templates custom (si applicable)

#### 3.3 Storage
- Creer les buckets necessaires
- Configurer les policies d'acces

### 4. n8n Production

- Deployer n8n (Railway, Hetzner, ou VPS)
- Configurer les credentials
- Activer les workflows
- Verifier les webhooks (curl test avec URL production)
- Configurer les schedules

### 5. Monitoring

#### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### Vercel Analytics (Performance)
- Activer dans Vercel Dashboard
- Speed Insights automatique

#### Uptime Monitoring
- Configurer un ping toutes les 5 minutes (UptimeRobot, Better Uptime)

### 6. Post-deploy Verification

#### Fonctionnel
- [ ] Login fonctionne (chaque provider)
- [ ] CRUD fonctionne (creer, lire, modifier, supprimer)
- [ ] Webhooks recoivent les donnees
- [ ] Emails envoyes correctement
- [ ] Notifications fonctionnent

#### Performance
- [ ] Lighthouse > 90 sur toutes les metriques
- [ ] TTFB < 1s
- [ ] LCP < 2.5s

#### Securite
- [ ] HTTPS force
- [ ] Headers de securite (CSP, X-Frame-Options)
- [ ] Pas de fuite de donnees (tester avec un compte restreint)

### 7. Documentation Client

Creer `pipeline/output/deploy.md` :
- URL de production
- Credentials admin (separement, pas dans le repo)
- Guide d'utilisation rapide
- Contacts support
- Procedure de mise a jour

## Output

```
pipeline/output/
└── deploy.md          # Rapport de deploiement
```

## Verification Placeholders (sweep final)

Scanner **tout le projet** (hors `node_modules/`, `.next/`, `pipeline/stages/`, `.claude/skills/`, `.claude/agents/`) pour detecter les placeholders `[...]` restants.

**Zero tolerance** — aucun placeholder ne doit rester dans :
- [ ] `CLAUDE.md` — aucun `[...]` restant
- [ ] `PLAN.md` — aucun `[...]` restant (hors items non-demarres)
- [ ] `app/globals.css` — aucun `[...]` restant
- [ ] `.env.example` — noms de variables definis
- [ ] `pipeline/output/**` — aucun `[...]` restant dans les artifacts generes
- [ ] `src/**` — aucun placeholder dans le code source
- [ ] `n8n-workflows/**` — aucun `[...]` restant

**Exclusions normales** : les fichiers de skills, stages, agents, et rules (ils contiennent des templates/instructions par design).

## Validation

- [ ] Site accessible en production
- [ ] HTTPS actif
- [ ] Auth fonctionne (tous les providers)
- [ ] Donnees persistees en Supabase production
- [ ] Webhooks n8n fonctionnels en production
- [ ] Monitoring active (Sentry + uptime)
- [ ] Documentation client livree
- [ ] Lighthouse > 90
- [ ] Pas de credentials dans le code
