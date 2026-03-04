# Skill: dashboard-deploy-checklist

Checklists et templates de déploiement pour un dashboard Next.js + Supabase + n8n. À utiliser avant chaque mise en production.

---

## Pre-deploy Checklist

### Automatique (vérifiable en CI/terminal)

```bash
# 1. Build
npm run build
# Attendu: exit code 0, aucune erreur TypeScript ni JSX

# 2. Lint
npm run lint
# Attendu: 0 erreurs (warnings acceptables)

# 3. Types (strict)
npx tsc --noEmit
# Attendu: aucune erreur

# 4. Vérifier l'absence de console.log dans le code source
grep -r "console\.log" src/ app/ components/ lib/ --include="*.ts" --include="*.tsx" | grep -v "\.test\." | grep -v "\.spec\."
# Attendu: aucun résultat (hors fichiers de test)

# 5. Vérifier l'absence de secrets commitées
grep -r "sk_live\|sk_test\|service_role\|supabase\.key\|api_key" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.env*" --exclude-dir=".git" --exclude-dir="node_modules"
# Attendu: aucun résultat

# 6. Vérifier que .env n'est pas versionné
git ls-files | grep "\.env$"
# Attendu: aucun résultat

# 7. Variables d'environnement requises (adapter selon projet)
node -e "
const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  // 'STRIPE_SECRET_KEY',
  // 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
]
const missing = required.filter(k => !process.env[k])
if (missing.length) { console.error('Missing env vars:', missing); process.exit(1) }
console.log('✓ All env vars present')
"
```

### Manuel (humain requis)

```
PRE-DEPLOY CHECKLIST MANUELLE
Date: __________  Projet: __________  Version/Tag: __________

SÉCURITÉ
[ ] Toutes les tables Supabase ont des policies RLS activées
    → Supabase Dashboard > Table Editor > [table] > Policies > confirmer "RLS enabled"
[ ] Aucune clé d'API ou secret visible dans le code versionné
[ ] .env.example est à jour avec toutes les variables (sans valeurs)
[ ] Les routes admin sont protégées par middleware auth
[ ] Le service role key n'est jamais exposé côté client (NEXT_PUBLIC_*)

FONCTIONNEL
[ ] Parcours authentification complet testé (signup, login, logout, reset password)
[ ] Navigation entre toutes les pages principales (vérifier les 404)
[ ] Actions CRUD sur chaque entité principale (créer, lire, modifier, supprimer)
[ ] Formulaires : validation des erreurs, messages de succès
[ ] Gestion des états vides (aucune donnée) et états d'erreur
[ ] Responsive : tester sur mobile 375px, tablet 768px, desktop 1440px

DONNÉES
[ ] Migrations Supabase appliquées sur l'environnement de staging
[ ] Données de seed présentes si nécessaires
[ ] Les données réelles s'affichent (pas de mock data en dur)
[ ] Les recherches et filtres retournent les bons résultats

PERFORMANCE
[ ] Aucune requête N+1 évidente (vérifier les logs Supabase)
[ ] Les images sont optimisées (next/image, formats webp/avif)
[ ] Le bundle JS est raisonnable (< 300kB first load, vérifier avec npm run build)

CONTENU
[ ] Textes relus (pas de lorem ipsum, pas de [TODO] visibles)
[ ] Textes traduits si i18n activée
[ ] Mentions légales et politique de confidentialité présentes
```

---

## Template deploy.md

Créer ce fichier dans `pipeline/output/deploy/` à chaque déploiement.

```markdown
# Déploiement — [Nom Projet] v[Version]

**Date :** [JJ/MM/AAAA]
**Déployé par :** [Prénom]
**Environnement :** Production / Staging
**URL :** https://[domaine]
**Commit :** [hash court] — [message]
**Branch :** main

## Résumé des changements

- [Description changement 1]
- [Description changement 2]

## Migrations Supabase appliquées

| Migration | Description | Statut |
|-----------|-------------|--------|
| [timestamp]_[nom].sql | [description] | ✓ Applied |

## Variables d'environnement modifiées

| Variable | Action |
|----------|--------|
| [NOM_VAR] | Ajoutée / Modifiée / Supprimée |

## Checklist pre-deploy

- [ ] npm run build ✓
- [ ] npm run lint ✓
- [ ] tsc --noEmit ✓
- [ ] Aucun console.log ✓
- [ ] Aucun secret commité ✓
- [ ] RLS vérifié ✓

## Tests post-déploiement

- [ ] Page login accessible
- [ ] Authentification fonctionnelle
- [ ] Page principale chargée
- [ ] [Test spécifique au projet]
- [ ] [Test spécifique au projet]

## Rollback

Si un problème est détecté, procéder comme suit :
1. [Voir section Rollback Procedure ci-dessous]
2. Commit de rollback : [hash du déploiement précédent]
3. Migration down : [Voir section Supabase]

## Notes

[Observations, problèmes rencontrés, décisions prises]
```

---

## Vercel Configuration Checklist

```
VERCEL — CHECKLIST DE CONFIGURATION

PROJET
[ ] Repository connecté : [org/repo]
[ ] Framework preset : Next.js
[ ] Root directory : [chemin si monorepo, ex: clients/fog/refonte-site-next.js/app-nextjs]
[ ] Build command : npm run build (ou override si custom)
[ ] Output directory : .next (default)
[ ] Install command : npm install (ou pnpm install)
[ ] Node.js version : 20.x

DOMAINES
[ ] Domaine production ajouté : [domaine.com]
[ ] www redirige vers apex (ou inverse)
[ ] Certificat SSL actif (auto Vercel)
[ ] DNS propagé et vérifié

VARIABLES D'ENVIRONNEMENT
(Réglage: Project Settings > Environment Variables)
[ ] NEXT_PUBLIC_SUPABASE_URL          → Production + Preview
[ ] NEXT_PUBLIC_SUPABASE_ANON_KEY     → Production + Preview
[ ] SUPABASE_SERVICE_ROLE_KEY         → Production only (never Preview)
[ ] NEXTAUTH_SECRET                   → Production + Preview (valeurs différentes)
[ ] NEXTAUTH_URL                      → Production: https://domaine.com
[ ] [Autres variables projet]         → selon .env.example

SÉCURITÉ VERCEL
[ ] "Automatically expose System Env Vars" : désactivé (si non nécessaire)
[ ] Preview deployments : protégés par Vercel authentication (optionnel)
[ ] Edge config (si utilisé) : configuré

BUILD & DEPLOY
[ ] Branch de production : main
[ ] Auto-deploy activé sur push vers main
[ ] Deploy previews activés pour les PRs
[ ] Build logs vérifiés après premier déploiement

ANALYTICS & MONITORING
[ ] Vercel Analytics activé (si souhaité)
[ ] Speed Insights activé (si souhaité)
[ ] Vercel Logs accessible (retention 1h free / 3 days pro)
```

---

## Supabase Production Checklist

```
SUPABASE — CHECKLIST PRODUCTION

PROJET
[ ] Projet production distinct du projet dev/staging
[ ] Plan tarifaire vérifié (Free / Pro selon besoins)
[ ] Région choisie proche des utilisateurs finaux

AUTHENTIFICATION
[ ] Auth providers configurés :
    [ ] Email/Password activé
    [ ] [Autres providers selon projet : Google, GitHub, etc.]
[ ] Email templates personnalisés (confirmation, reset)
    → Authentication > Email Templates
[ ] Redirect URLs configurées pour production :
    → Authentication > URL Configuration
    → Site URL : https://[domaine.com]
    → Redirect URLs : https://[domaine.com]/auth/callback
[ ] Email confirmation requis : activé/désactivé selon besoin

BASE DE DONNÉES
[ ] Toutes les migrations appliquées (dans l'ordre)
    → SQL Editor > exécuter chaque migration
[ ] RLS activé sur TOUTES les tables exposées à l'API
    → Table Editor > chaque table > Policies > RLS enabled
[ ] Policies testées pour chaque rôle (anon, authenticated, service_role)
[ ] Index créés sur les colonnes fréquemment filtrées
[ ] Backup automatique activé (Pro plan)

STORAGE (si utilisé)
[ ] Buckets créés avec les bons paramètres (public/private)
[ ] Policies storage configurées
[ ] Limites de taille de fichier définies

API
[ ] Anon key : utilisée uniquement côté client
[ ] Service role key : utilisée uniquement côté serveur / Edge Functions
[ ] CORS configuré si accès depuis domaines externes

MONITORING
[ ] Alertes d'utilisation configurées (quotas)
[ ] Logs Supabase accessibles pour debugging
```

---

## n8n Production Checklist (Hostinger)

```
N8N — CHECKLIST PRODUCTION (Hostinger VPS)

INSTANCE
[ ] n8n version à jour (vérifier changelog pour breaking changes)
[ ] Accès UI : https://[sous-domaine-n8n].[domaine]
[ ] Auth n8n configurée (user/password ou SSO)
[ ] HTTPS actif avec certificat valide

CREDENTIALS
[ ] Toutes les credentials configurées en production :
    [ ] Supabase (URL + service role key prod)
    [ ] Brevo / SendGrid (API key prod)
    [ ] Stripe (secret key prod)
    [ ] [Autres credentials selon projet]
[ ] Credentials de test/staging supprimées ou clairement marquées
[ ] Aucun credential hardcodé dans les workflows

WEBHOOKS
[ ] URLs de webhooks mises à jour vers production :
    → Dans chaque workflow : Webhook nodes → URL = https://n8n.[domaine]/webhook/[path]
[ ] Webhooks enregistrés côté services tiers (Stripe, Supabase, etc.)
[ ] Headers d'authentification webhook configurés (secret headers)

WORKFLOWS
[ ] Tous les workflows actifs (Active toggle = ON)
[ ] Workflows testés avec données réelles
[ ] Error workflows configurés (pour alertes en cas d'échec)
[ ] Timezone des workflows vérifiée (pour les cron)

MONITORING
[ ] Exécutions visibles dans n8n UI (onglet Executions)
[ ] Alertes email configurées pour les échecs critiques
[ ] Health check endpoint accessible : https://n8n.[domaine]/healthz
[ ] Backup des workflows exporté (JSON) et versionné

SÉCURITÉ
[ ] n8n accessible uniquement via HTTPS
[ ] Webhooks avec secret headers validés côté workflow
[ ] Pas de credentials en clair dans les expressions {{ }}
```

---

## Rollback Procedure

### Vercel — Rollback d'un déploiement

```bash
# Option 1 : Via Vercel CLI
vercel rollback [deployment-url]

# Option 2 : Via Vercel Dashboard
# → Project > Deployments > Trouver le dernier déploiement stable
# → Actions (3 dots) > "Promote to Production"

# Option 3 : Via git (force le redéploiement)
git revert HEAD --no-edit
git push origin main
# Vercel redéploie automatiquement

# Vérifier le rollback
curl -I https://[domaine.com] # doit retourner 200
```

### Supabase — Migration down

```sql
-- Chaque migration doit avoir un script de rollback correspondant
-- Nommage : [timestamp]_[nom]_down.sql

-- Exemple de rollback:
-- Si la migration UP a fait: ALTER TABLE orders ADD COLUMN new_field TEXT;
-- Le rollback DOWN est:
ALTER TABLE orders DROP COLUMN IF EXISTS new_field;

-- Exécuter via Supabase SQL Editor ou CLI:
-- supabase db reset (attention: remet à zéro!)
-- ou exécuter manuellement les scripts down dans l'ordre inverse
```

### Procédure de rollback complète

```
ROLLBACK D'URGENCE — Étapes dans l'ordre

1. ISOLER le problème
   [ ] Identifier : frontend (Vercel) / backend (Supabase) / automation (n8n) ?
   [ ] Note du dernier déploiement stable : [hash/URL]

2. SI problème frontend (Vercel)
   [ ] Vercel Dashboard > Project > Deployments
   [ ] Identifier le dernier déploiement "READY" avant le problème
   [ ] Actions > "Promote to Production"
   [ ] Vérifier que la promotion est active (~30 secondes)
   [ ] Tester les pages critiques

3. SI problème base de données (Supabase)
   [ ] NE PAS supprimer de données sans backup
   [ ] Exécuter les scripts [migration]_down.sql dans l'ordre inverse
   [ ] Vérifier les données après rollback
   [ ] Notifier l'équipe

4. SI problème n8n workflow
   [ ] Désactiver le workflow défectueux (toggle OFF)
   [ ] Activer la version précédente si disponible (importer JSON backup)
   [ ] Vérifier les exécutions en attente

5. POST-ROLLBACK
   [ ] Documenter l'incident (date, cause, durée, solution)
   [ ] Ajouter un test pour éviter la régression
   [ ] Planifier le re-déploiement correctif
```

---

## Client Documentation Template

```markdown
# Guide Utilisateur — [Nom Application]

**Version :** [X.Y]
**Date :** [JJ/MM/AAAA]
**Contact support :** [email]

---

## Accès à l'application

**URL :** https://[domaine.com]

### Connexion

1. Ouvrir https://[domaine.com]/login dans votre navigateur
2. Saisir votre adresse email et votre mot de passe
3. Cliquer sur "Se connecter"

> Première connexion ? Votre accès vous a été transmis par email.
> Si vous n'avez pas reçu d'invitation, contactez [email support].

### Mot de passe oublié

1. Sur la page de connexion, cliquer sur "Mot de passe oublié"
2. Saisir votre adresse email
3. Suivre les instructions reçues par email (valable 1 heure)

---

## Navigation

L'application est organisée en [N] sections principales :

| Section | Description |
|---------|-------------|
| **Tableau de bord** | Vue d'ensemble — [description] |
| **[Section 1]** | [Description courte] |
| **[Section 2]** | [Description courte] |
| **Paramètres** | Gérer votre profil et vos préférences |

---

## Fonctionnalités principales

### [Fonctionnalité 1]

[ZONE SCREENSHOT — captures à insérer]

1. [Étape 1]
2. [Étape 2]
3. [Étape 3]

> **Note :** [Information importante ou mise en garde]

### [Fonctionnalité 2]

[ZONE SCREENSHOT]

[Description et étapes]

---

## Questions fréquentes

**Q: [Question fréquente 1] ?**
R: [Réponse]

**Q: [Question fréquente 2] ?**
R: [Réponse]

---

## Support

En cas de problème technique ou de question :
- Email : [email support]
- [Autres canaux selon projet]

Merci d'inclure dans votre message :
- La page sur laquelle vous étiez
- Ce que vous tentiez de faire
- Le message d'erreur si applicable (capture d'écran appréciée)
```

---

## Monitoring Setup

### Sentry (Next.js)

```bash
# Installation
npm install @sentry/nextjs

# Initialisation
npx @sentry/wizard@latest -i nextjs
```

```ts
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  // Désactiver en dev local si souhaité:
  enabled: process.env.NODE_ENV === 'production',
})
```

```ts
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  enabled: process.env.NODE_ENV === 'production',
})
```

```
SENTRY CHECKLIST
[ ] DSN configuré dans .env (NEXT_PUBLIC_SENTRY_DSN)
[ ] DSN ajouté dans Vercel env vars
[ ] Test d'erreur envoyé et visible dans Sentry Dashboard
[ ] Alertes email configurées pour les erreurs critiques
[ ] Source maps uploadées (automatique avec @sentry/wizard)
[ ] Équipe ajoutée au projet Sentry
```

### Vercel Analytics

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Uptime Monitoring

```
UPTIME MONITORING (ex: BetterUptime, UptimeRobot, Vercel — gratuit)

Endpoints à surveiller:
[ ] https://[domaine.com]                    → Page principale (GET 200)
[ ] https://[domaine.com]/api/health         → Health check API (GET 200 + JSON)
[ ] https://n8n.[domaine]/healthz            → n8n instance (GET 200)

Fréquence: toutes les 5 minutes
Alerte: email + SMS si indisponible > 2 minutes
```

```ts
// app/api/health/route.ts — endpoint de health check
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    // Ping minimal vers Supabase
    const { error } = await supabase.from('health_check').select('id').limit(1)
    if (error) throw error

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
    })
  } catch (err) {
    return NextResponse.json(
      { status: 'error', error: 'Database unreachable' },
      { status: 503 }
    )
  }
}
```

### n8n Health Check

```bash
# Vérifier que n8n répond
curl -f https://n8n.[domaine]/healthz
# Attendu: {"status":"ok"}

# Vérifier les workflows actifs (via API n8n)
curl -H "X-N8N-API-KEY: [api-key]" \
  https://n8n.[domaine]/api/v1/workflows?active=true
```

---

## Post-deploy Verification

### Checklist fonctionnelle

```
POST-DEPLOY — VÉRIFICATION PRODUCTION
Date: __________  URL: __________

PAGES CRITIQUES
[ ] https://[domaine]/           → 200, contenu visible
[ ] https://[domaine]/login      → 200, formulaire visible
[ ] https://[domaine]/dashboard  → 200 (ou redirect vers login si non auth)
[ ] https://[domaine]/api/health → 200, { status: "ok" }

AUTHENTIFICATION
[ ] Connexion avec compte test → ✓ redirige vers dashboard
[ ] Déconnexion → ✓ redirige vers login
[ ] Page protégée sans auth → ✓ redirige vers login

FONCTIONS CLÉS [adapter au projet]
[ ] [Action critique 1] fonctionne
[ ] [Action critique 2] fonctionne
[ ] [Action critique 3] fonctionne

PERFORMANCE (via DevTools > Lighthouse ou PageSpeed)
[ ] LCP < 2.5s
[ ] CLS < 0.1
[ ] FID / INP < 200ms
[ ] Score Performance Lighthouse > 80 sur mobile

SÉCURITÉ
[ ] HTTPS actif (cadenas vert)
[ ] Headers de sécurité présents (vérifier via securityheaders.com)
[ ] Pas de données sensibles dans les réponses API publiques

MONITORING
[ ] Sentry ne remonte pas d'erreurs dans les 15 premières minutes
[ ] Vercel Analytics actif et recevant du trafic
[ ] Alerte uptime configurée et testée
```

### Script de smoke test (optionnel)

```bash
#!/bin/bash
# scripts/smoke-test.sh
# Usage: ./scripts/smoke-test.sh https://[domaine.com]

BASE_URL=${1:-"http://localhost:3000"}
PASS=0
FAIL=0

check() {
  local url="$1"
  local expected="${2:-200}"
  local actual=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$actual" = "$expected" ]; then
    echo "✓ $url → $actual"
    ((PASS++))
  else
    echo "✗ $url → $actual (expected $expected)"
    ((FAIL++))
  fi
}

echo "=== Smoke Test: $BASE_URL ==="
check "$BASE_URL"
check "$BASE_URL/login"
check "$BASE_URL/api/health"
check "$BASE_URL/page-inexistante" "404"

echo ""
echo "=== Résultat: $PASS ✓  $FAIL ✗ ==="
[ $FAIL -eq 0 ] && exit 0 || exit 1
```

```bash
chmod +x scripts/smoke-test.sh
./scripts/smoke-test.sh https://[domaine.com]
```
