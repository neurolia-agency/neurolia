# Opendoor

## Informations client

| Cle | Valeur |
|-----|--------|
| Client | Opendoor |
| Ville | Narbonne, France |
| Secteur | Serrurerie / Depannage d'urgence |
| Disponibilite | 24h/24, 7j/7 |
| Zone | Narbonne + 50 km (Aude, sud Herault) |
| Tagline | "On s'occupe de tout." |
| Contact | 07 89 08 18 57 |

## Ce qui a ete realise

### Site vitrine complet (5 pages)

Site vitrine professionnel pour un serrurier a Narbonne, optimise pour la conversion (appels telephoniques d'urgence). Realise de A a Z via le pipeline Neurolia (Phase A Architecture + Phase B Vibe Coding).

**Pages livrees :**

1. **Accueil (/)** : Hero anime, badges de reassurance (24/7, devis gratuit, sans degat, <30min), apercu services, apercu approche, apercu zone d'intervention, CTA final
2. **Services (/services)** : Detail des 3 categories (urgences, installation, entretien) avec prestations incluses et CTA par section
3. **Approche (/approche)** : Mission, vision, 4 valeurs (empathie, transparence, exigence, relations), differenciation
4. **Zone (/zone)** : Carte interactive (centre Narbonne, rayon 50km), grille 12 villes couvertes, infos pratiques
5. **Contact (/contact)** : Section appel urgent, formulaire (4 champs), coordonnees

### Pipeline complet Architecture + Code

Phase A (planification zero code) :
- Brief client extrait et structure
- Strategie de marque (positionnement, couleurs, typographie, services, ton, personas)
- Direction artistique (contraintes, moodboard, vocabulaire visuel, carte emotionnelle)
- Sitemap et architecture de pages
- Wireframes pour chaque page
- Tokens de design CSS

Phase B (vibe coding) :
- Layout (Header sticky, Footer, Menu mobile)
- Homepage (6 sections)
- Pages secondaires (4 pages completes)
- Polish (SEO, accessibilite, images, animations)

## Stack technique

| Categorie | Technologies |
|-----------|-------------|
| Frontend | Next.js 15+, React 19, TypeScript |
| Styling | Tailwind CSS 4, tokens CSS custom (OKLCH) |
| Animations | Motion (Framer Motion), Lenis (smooth scroll) |
| Formulaires | react-hook-form, zod, sonner (toasts) |
| Icones | Lucide React |
| UI | shadcn/ui (Input, Textarea) |
| SEO | sitemap.ts, robots.ts, JSON-LD LocalBusiness |
| Deploiement | Vercel |

## Direction artistique

| Aspect | Valeur |
|--------|--------|
| Style | Chaleureux, premium, organique |
| Fond principal | Creme dore #FFFBF0 (jamais de blanc pur) |
| Texte principal | Brun profond #2A2418 |
| Couleur signature | Or Miel #C4A35A (15-20% surfaces) |
| Accent/CTA | Terracotta Chaud #B8845A |
| Secondaire | Ardoise Douce #6B7A8A |
| Typo titres | Cormorant Garamond (serif, elegante, rassurante) |
| Typo corps | Inter (sans-serif, moderne, lisible) |
| Radius | 24px soft / 32px organique / 100px pill |
| Transitions | 300ms-1.2s, ease-out/cubic-bezier |
| Texture | Grain subtil a 0.04 opacite |
| Mouvement | Translate only (jamais scale), hover translateY -4px |
| Contraintes | Pas de blanc/noir pur, pas de couleurs saturees, pas de carousel |

## Services du client

### Urgences (intervention < 30 min)
- Ouverture de porte (claquee, fermee a cle, blindee)
- Reparation post-cambriolage
- Reparation et diagnostic de serrure
- Devis gratuit avant intervention

### Installation et renforcement (sous 48h)
- Remplacement de serrure
- Installation serrure multipoints
- Blindage et renforcement de porte
- Installation porte blindee
- Pose de serrures complementaires

### Entretien
- Reparation de cylindre
- Entretien general serrurerie
- Diagnostic preventif
- Lubrification et ajustements

## Valeurs de marque

| Valeur | Description |
|--------|-------------|
| Empathie Active | Reconnaitre l'etat emotionnel immediatement |
| Transparence Radicale | Explications claires, tarifs honnetes, limites directes |
| Bienveillance Exigeante | Pas d'approximation, travail de qualite, rigueur sous pression |
| Sante Relationnelle | Echanges directs, interaction saine au-dela de la transaction |

## Optimisations techniques

| Aspect | Detail |
|--------|--------|
| Lighthouse cible | > 90 |
| Trafic mobile | 80%+ (design mobile-first) |
| Accessibilite | WCAG AA, boutons 48px+ mobile, skip-to-content |
| SEO local | Schema.org LocalBusiness, mots-cles geo |
| Images | hero-bg.webp optimise (244 Ko) |
| Animations | Smooth scroll Lenis + whileInView Motion |

## Zone d'intervention

12 villes couvertes : Narbonne, Narbonne-Plage, Gruissan, Port-la-Nouvelle, Sigean, Leucate, Coursan, Cuxac-d'Aude, Lezignan-Corbieres, Beziers, Capestang, Serignan.

## KPI principal

**Appels telephoniques** (urgences) — numero visible sans scroll sur toutes les pages.
KPI secondaire : soumissions formulaire de contact (hors urgences).

## Services Neurolia delivres

- Pipeline complet Architecture (A01-A06) : brief, marque, direction artistique, sitemap, wireframes, tokens
- Pipeline complet Vibe Coding (B01-B04) : layout, homepage, pages, polish
- Design responsive mobile-first (80% trafic mobile)
- SEO local (JSON-LD, sitemap, metadata)
- Accessibilite WCAG AA
- Animations et smooth scroll
- Formulaire de contact avec validation
- Integration click-to-call

## Image portfolio

- `project-3.png` : Capture du site
