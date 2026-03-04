# Architecture — Service Social Media Automation Neurolia

> Document de reference. Ne pas modifier sans validation.
> Genere le 2026-02-10.

## 1. Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ONBOARDING CLIENT                            │
│  Brief restaurant + assets + charte → Brand Memory (Supabase)       │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BRAND MEMORY ENGINE [BUILD]                       │
│  Brand DNA · Assets visuels · Historique perf · Contexte secteur    │
│                        (Supabase/PostgreSQL)                        │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  ORCHESTRATEUR CENTRAL [BUY — n8n]                  │
│                                                                     │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────────┐    │
│  │ Planning │──▶│ Creation │──▶│ Visuels  │──▶│ Publication  │    │
│  │ editorial│   │ texte    │   │          │   │              │    │
│  │ [BUILD]  │   │[BUILD+API│   │[BUILD+API│   │[BUY→BUILD]  │    │
│  └──────────┘   └──────────┘   └──────────┘   └──────────────┘    │
│       │              │              │                │              │
│       ▼              ▼              ▼                ▼              │
│  Calendrier    Claude API      Sharp/Canvas    Meta Graph API      │
│  auto-genere   + prompts       + templates     + TikTok API       │
│  par semaine   restaurant      restaurant      (V2: LinkedIn, X)  │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    REPORTING DASHBOARD [BUILD]                       │
│           Next.js + Supabase · Vue client · Analytics               │
└─────────────────────────────────────────────────────────────────────┘
```

## 2. Decisions Build vs Buy

| Composant | Verdict | Justification | Horizon |
|-----------|---------|---------------|---------|
| Orchestration | BUY (n8n) | Deja self-hosted, mature, extensible | V1 |
| Moteur texte | BUILD+API | Coeur creatif. Prompts restaurant proprietaires + Claude API | V1 |
| Generation image | BUILD+API | Templates programmatiques (Sharp/node-canvas) + APIs ponctuelles | V1 |
| Production video | BUY NOW → BUILD | Trop complexe pour V1. CapCut manuel → Remotion en V2 | V2 |
| Enhancement photo | BUILD+API | Pipeline Sharp + API Remove.bg/Photoroom pour detourage | V1 |
| Publication | BUY NOW → BUILD | Meta Graph API direct (Instagram/Facebook). Ayrshare pour TikTok. APIs directes en V2 | V1→V2 |
| Content Hub | BUILD | Supabase deja en place. Tables dediees contenu | V1 |
| Brand Memory | BUILD | Avantage concurrentiel majeur. Systeme proprietaire. Potentiel produit | V1 |
| Analytics | BUILD+API | APIs plateformes gratuites + dashboard custom | V1 |
| Portail client | BUILD | Dashboard Next.js simple. Reporting only (pas de validation) | V1 |
| Branding auto | BUILD+API | Module complementaire : generer charte basique pour clients sans branding | V2 |

## 3. Stack technique

| Categorie | Choix | Type | Cout/mois | Temps dev |
|-----------|-------|------|-----------|-----------|
| Orchestration | n8n self-hosted (Hostinger KVM2) | BUY | 0 EUR | 0j |
| Generation texte | Claude API (Sonnet 4.5) | BUILD+API | ~30-50 EUR | 4j |
| Generation image | Sharp + node-canvas + templates | BUILD | 0 EUR | 3j |
| Enhancement photo | Sharp + Remove.bg API | BUILD+API | ~10 EUR | 1j |
| Publication Instagram/Facebook | Meta Graph API direct | BUILD | 0 EUR | 2j |
| Publication TikTok/LinkedIn/X | Ayrshare API | BUY | ~40 EUR | 0.5j |
| Base de donnees | Supabase (PostgreSQL) | BUY | 0-25 EUR | 1j |
| Brand Memory | Supabase + schema custom | BUILD | 0 EUR | 2j |
| Content Hub | Supabase + tables editoriales | BUILD | 0 EUR | 1j |
| Dashboard / Reporting | Next.js + Vercel | BUILD | 0 EUR | 3j |
| Analytics | APIs plateformes + Supabase | BUILD+API | 0 EUR | 2j |
| **TOTAL V1** | | | **~80-125 EUR/mois** | **~19.5j** |

## 4. Contexte projet

- **Niche** : Restaurateurs uniquement (V1)
- **Volume** : 5 clients au lancement → 30 a 6 mois
- **Frequence** : Jusqu'a 7 posts/semaine par client
- **Plateformes** : Instagram, Facebook, TikTok, LinkedIn, X
- **Mode** : Publication autonome avec reporting (pas de validation client)
- **Equipe** : 2 developpeurs, 20h/semaine chacun
- **Budget SaaS** : ~200 EUR/mois max
- **Delai V1** : 4 semaines

## 5. Roadmap

### V1 — Lancement (semaines 1-4)
- Schema Supabase (Brand Memory + Content Calendar)
- Onboarding formulaire
- Prompt library restaurant (5 types contenu)
- Pipeline generation texte (n8n + Claude API)
- Pipeline image (Sharp + templates)
- Connexion Meta Graph API (Instagram + Facebook)
- Workflow publication automatique n8n
- Dashboard client (Next.js)
- Analytics basique

### V2 — Differenciation (mois 2-4)
- Publication directe TikTok, LinkedIn, X
- Remotion pipeline video
- Module branding auto
- Feedback loop avance
- Templates visuels enrichis
- Veille tendances automatique

### V3 — Produit (mois 6+)
- Brand Memory Engine en SaaS autonome
- Generalisation multi-secteurs
- White-label du dashboard
- App mobile client simplifiee
