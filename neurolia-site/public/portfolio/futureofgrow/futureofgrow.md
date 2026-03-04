# Future of Grow (F.O.G.)

## Informations client

| Cle | Valeur |
|-----|--------|
| Client | Future of Grow (Sciola Import SARL) |
| Pays | Suisse |
| Secteur | Agritech / Eclairage LED horticole |
| Site | https://www.futureofgrow.com |
| Positionnement | Swiss Made - precision, qualite, innovation LED |
| Anciennete | 25 ans d'innovation en LED horticole |

## Ce qui a ete realise

### 1. Refonte site e-commerce (Next.js)

Replatforming complet de Webflow vers Next.js 16. Site e-commerce multilingue (FR/EN/DE) avec segmentation B2B/B2C et gestion multi-devises (EUR/CHF).

**Fonctionnalites cles :**
- Catalogue produits integre Shopify (Storefront API)
- Systeme de pricing multi-segments (B2C standard, B2B EU degressive, B2B CH degressive)
- Authentification et gestion utilisateurs (Supabase Auth + Memberstack)
- Pages produits avec selection de variantes, videos 3D, barres de progression
- Panier dynamique et checkout via Shopify
- Internationalisation complete (next-intl)

### 2. Dashboard B2B/B2C

Dashboard client complet deploye en production sur Webflow avec code custom :
- Espace Pro B2B (historique commandes, factures, gestion compte)
- Espace Public B2C
- Systeme d'onboarding utilisateur
- Gestion des commandes et factures

### 3. Automations et workflows

Infrastructure d'automatisation backend complete :
- Orchestration n8n (self-hosted)
- Email marketing via Brevo (validation, segmentation, campagnes)
- Synchronisation CRM (Odoo)
- Webhooks Shopify (commandes, clients, pricing)
- Draft Orders automatises pour pricing B2B

### 4. Design System

Systeme de design complet avec charte graphique :
- Esthetique dark mode agritech avec accent vert neon
- Composants UI reutilisables
- Guidelines completes (typographie, couleurs, espacements)

## Stack technique

| Categorie | Technologies |
|-----------|-------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Animations | Motion (Framer Motion), Lenis |
| Auth | Supabase Auth, Memberstack |
| E-commerce | Shopify Storefront API |
| Base de donnees | PostgreSQL (Supabase) |
| Pricing | Airtable (regles B2B) |
| Automations | n8n, Brevo, Odoo |
| i18n | next-intl (FR/EN/DE) |
| Deploiement | Vercel |

## Direction artistique

| Aspect | Valeur |
|--------|--------|
| Style | Dark mode agritech, minimalisme suisse |
| Fond principal | Noir pur #000000 |
| Texte | Blanc #FFFFFF, off-white #edf2f3 |
| Couleur signature | Vert neon #00D52B (5-10%) |
| Typo titres | Oswald (uppercase, 600-700) |
| Typo corps | Montserrat (400-600) |
| Radius | 0 (sauf inputs 2-4px) |
| Transitions | 300ms ease-out |
| Approche | Monochrome + accent unique, pas de gradients ni ombres |

## Produits du client

Trois gammes principales d'eclairage LED horticole :
- **Black Series** : Modulaire, 320W-600W, transformateurs et barres remplacables (anti-obsolescence)
- **Air Grow Pro III** : Spectre Hyper Red, haut rendement (+20% recolte)
- **Boost UVA-UVB-IR** : Morphologie et defenses immunitaires des plantes

Spectres proprietaires : X-9, Hyper Red. Compatible TrolMaster (Hydro-X, Aqua-X).

## Resultats et metriques

| Metrique | Valeur |
|----------|--------|
| Contacts email valides | 1 990 (64,8% de 3 070 uniques) |
| Reduction travail manuel | 80% via automations |
| Taux de rebond cible | < 2% |
| Taux d'ouverture cible | > 30% |
| Marches couverts | CH, FR, DE, IT, NL, ES |

## Services Neurolia delivres

- Refonte site e-commerce complet (Webflow vers Next.js)
- Design system et charte graphique
- Dashboard B2B/B2C avec gestion de comptes
- Systeme de pricing multi-segments B2B
- Infrastructure d'automations (n8n + Brevo + Odoo)
- Validation et segmentation base email
- Integration Shopify (catalogue, checkout, Draft Orders)
- Internationalisation trilingue (FR/EN/DE)

## Cibles du client

| Segment | Description | Devise |
|---------|-------------|--------|
| B2C Public | Consommateurs, acces libre | EUR |
| B2B Pro EU | Cultivateurs professionnels Europe | EUR |
| B2B Pro CH | Cultivateurs professionnels Suisse | CHF |

## Image portfolio

- `project-1.webp` : Capture du site
