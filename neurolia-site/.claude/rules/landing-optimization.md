# Optimisation Landing Page — Philosophie et Objectifs

## Contexte

Le site Neurolia est en phase B05-Validate. L'objectif est d'optimiser la landing page existante pour maximiser la conversion (signature de devis).

## Philosophie UX (non-négociable)

Les utilisateurs ne lisent pas les pavés de texte. Mais ils lisent ATTENTIVEMENT quand le contenu est bien présenté.

### Ce qu'ils ne lisent PAS
- Les pavés de texte sans respiration
- Le contenu où tout est au même niveau visuel (rien ne ressort)
- Les descriptions noyées dans des gros paragraphes
- Le jargon technique qu'ils ne comprennent pas

### Ce qu'ils LISENT
- Les bénéfices mis en avant visuellement (gras, couleurs, espacements)
- La microcopy placée au bon moment ("Aucune CB requise" sous un bouton)
- Les listes à puces qui aèrent l'info
- Les témoignages encadrés qui attirent l'oeil
- Les chiffres concrets qui prouvent la valeur

### Règle d'or
La différence n'est pas la quantité de texte, mais **comment tu le mets en valeur**. Un paragraphe long mais bien structuré, avec une hiérarchie claire et qui respire, sera lu. Un paragraphe court mais dense et plat sera ignoré.

## KPI Principal

**Signature de devis** — chaque décision de design doit servir cet objectif.

## Workflow d'optimisation

### Phase 1 : Audit (read-only)
Lancer les 3 agents en parallèle :
- `ux-copy-auditor` → texte, microcopy, bénéfices vs features
- `visual-hierarchy-auditor` → typo, tailles, espacements, contraste
- `landing-conversion-auditor` → structure persuasion, CTA, objections

Chaque agent produit un rapport scoré avec :
- Problèmes classés (CRITIQUE / IMPORTANT / SUGGESTION)
- Propositions concrètes de réécriture ou d'ajustement
- Quick wins identifiés

### Phase 2 : Priorisation (humain décide)
L'utilisateur lit les rapports et choisit ce qu'il applique.

### Phase 3 : Implémentation (via /frontend-design)
Utiliser `/design-brief` avant `/frontend-design` pour chaque section afin de produire des résultats distinctifs.
Appliquer les changements validés, section par section.

## Sections de la landing page

```
Hero → ServicesPreview → Process → PortfolioPreview → Testimonials → ContactMini → Faq → ScrollBenefits → CtaFinal
```

| # | Section | Fichier |
|---|---------|---------|
| 1 | Hero | `components/sections/hero.tsx` |
| 2 | ServicesPreview | `components/sections/services-preview.tsx` |
| 3 | Process | `components/sections/process.tsx` |
| 4 | PortfolioPreview | `components/sections/portfolio-preview.tsx` |
| 5 | Testimonials | `components/sections/testimonials.tsx` |
| 6 | ContactMini | `components/sections/contact-mini.tsx` |
| 7 | Faq | `components/sections/faq.tsx` |
| 8 | ScrollBenefits | `components/sections/scroll-benefits.tsx` |
| 9 | CtaFinal | `components/sections/cta-final.tsx` |

Tokens : `app/globals.css`
Config Tailwind : `tailwind.config.ts`

## Critères de succès d'un bon audit

Un audit utile :
1. Montre le PROBLÈME avec un extrait du code actuel
2. Explique POURQUOI c'est un problème (impact utilisateur)
3. Propose une SOLUTION concrète (nouveau texte, nouvelle valeur CSS)
4. Classe par PRIORITÉ (quick win vs refonte)
