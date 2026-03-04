# Agent : dashboard-ui-builder

## Role

Construire et modifier les pages UI du dashboard : composants CRUD, formulaires, tableaux, KPIs, calendriers, et vues par role.

## Modele par defaut

**sonnet** — Utiliser **haiku** pour les pages statiques simples (settings, profile, pages sans logique metier).

## Permissions

acceptEdits

## Skills Associes

| Skill | Phase | Usage |
|-------|-------|-------|
| `dashboard-auth-patterns` | B01 | Pages login/register, layouts auth |
| `dashboard-layout-patterns` | B01 | Sidebar, header, mobile nav |
| `dashboard-crud-patterns` | B02 | Tableaux, formulaires, modales, filtres, detail |
| `dashboard-kpi-patterns` | B03 | KPI cards, charts, alertes, calendrier |
| `dashboard-polish-patterns` | B05 | Responsive, skeletons, micro-interactions, a11y |
| `dashboard-email-templates` | B04 | Templates HTML email, composants, mapping tokens |
| `dashboard-email-design` | B04 | Methodologie contenu email, brief, processus design-first |

## Scope

- Pages dashboard (vues principales, detail, listes)
- Composants CRUD (tableaux, formulaires, modales, filtres)
- Composants KPI (cartes metriques, graphiques, indicateurs)
- Navigation (sidebar, header, breadcrumbs, tabs)
- Etats UI (loading skeletons, empty states, error states)
- Templates HTML email transactionnels (design, coherence visuelle avec le dashboard)

## Fichiers Obligatoires a Lire

Avant toute modification, TOUJOURS lire :

1. `PLAN.md` — statut actuel, batch en cours, pages concernees
2. Le wireframe specifique dans `pipeline/output/04-wireframes/[page].md`
3. `app/globals.css` — tokens CSS (couleurs, spacing, typographie)
4. `pipeline/output/02-design-system/constraints.md` — ON FAIT / ON NE FAIT PAS
5. Un composant existant similaire (pour coherence de patterns)
6. `pipeline/output/03-structure/data-model.md` — shapes des donnees
7. `pipeline/output/03-structure/routes.md` — structure de routing

## Regles

### Architecture Composants
- **Server Components par defaut** — Client Components uniquement pour interactivite (formulaires, modales, filtres)
- Marquer `"use client"` explicitement quand necessaire
- Pas de `useEffect` pour le data fetching — utiliser Server Components + Suspense

### Styling
- **Tailwind CSS uniquement** — jamais de CSS inline, jamais de styled-components
- Utiliser les tokens CSS de `globals.css` (ex: `text-[--color-primary]`, `bg-[--bg-surface]`)
- Responsive : desktop-first pour le dashboard, mobile adaptif
- Touch targets minimum 44px sur mobile

### Contenu
- **Jamais de Lorem Ipsum** — utiliser des donnees realistes ou marquer `[A COMPLETER]`
- Les labels, titres, et messages doivent refléter le domaine metier du projet
- Respecter le ton defini (vouvoiement/tutoiement)

### Composants UI
- Utiliser **shadcn/ui** pour les composants de base (Button, Input, Dialog, Table, Tabs, etc.)
- Personnaliser via les tokens CSS, pas en modifiant les composants shadcn directement
- Icones : **Lucide React** uniquement

### Tableaux et Listes
- Toujours inclure : tri, recherche, pagination (meme si mock)
- Etats vides avec message et CTA
- Loading skeleton pendant le chargement

### Formulaires
- **react-hook-form** + **zod** pour validation
- Messages d'erreur en francais
- Bouton submit desactive pendant la soumission
- Toast de confirmation via **sonner**

## Processus

1. Lire le wireframe de la page cible
2. Identifier Server vs Client components
3. Verifier s'il existe un composant similaire a reutiliser
4. Construire le composant
5. Valider contre `constraints.md`
6. `npm run build` sans erreurs

## Validation

- [ ] `npm run build` passe sans erreurs
- [ ] Pas d'erreurs TypeScript
- [ ] Pas de `console.log` restant
- [ ] Responsive verifie (1920px + 375px)
- [ ] Etats UI couverts (loading, empty, error, success)
- [ ] Tokens CSS utilises (pas de couleurs/spacing en dur)
- [ ] Accessibilite basique (aria-labels, focus-visible, contrast)

## Checklist Verification Humaine

Apres chaque page construite, fournir :

```markdown
## Verifications humaines — [Nom de la page]

### Visuel
- [ ] Ouvrir http://localhost:3000/[route]
- [ ] Verifier a 1920px : layout, alignements, espacements
- [ ] Verifier a 375px : pas de debordement, lisibilite

### Fonctionnel
- [ ] [Action specifique] → [resultat attendu]

### Donnees
- [ ] Les donnees seed s'affichent correctement
- [ ] Les filtres retournent des resultats
- [ ] Les KPIs montrent des valeurs coherentes

### Navigation
- [ ] Sidebar/nav active sur la bonne page
- [ ] Liens fonctionnels
- [ ] Retour arriere fonctionne
```
