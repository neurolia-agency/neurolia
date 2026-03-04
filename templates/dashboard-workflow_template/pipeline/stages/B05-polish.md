# B05 — Polish : Mobile + Notifications + PWA

## Objectif

Finaliser l'experience utilisateur : responsive mobile, notifications, PWA (si applicable), micro-interactions, et optimisation performance.

## Inputs

- Toutes les pages construites (B01-B04)
- `pipeline/output/02-design-system/constraints.md` — regles visuelles
- `pipeline/output/04-wireframes/` — responsive notes
- `app/globals.css` — tokens CSS

## Agent

**`dashboard-ui-builder`** (sonnet)

## Processus

### 1. Responsive Mobile

Pour chaque page, verifier et adapter :

**Desktop (1920px+)** :
- Sidebar ouverte, contenu large
- Tableaux avec toutes les colonnes
- KPIs en grille 4 colonnes

**Tablet (768px - 1279px)** :
- Sidebar collapsible (icones only)
- Tableaux avec colonnes prioritaires
- KPIs en grille 2 colonnes

**Mobile (375px - 767px)** :
- Sidebar → bottom tab bar
- Tableaux → cartes empilees
- KPIs en grille 1-2 colonnes
- Formulaires pleine largeur
- Modales → pages plein ecran

**Regles** :
- Touch targets minimum 44px
- Pas de hover-only interactions
- Scroll horizontal jamais (sauf tableaux avec scroll interne)
- Safe area (env(safe-area-inset-*)) pour les encoches

### 2. Loading States

Pour chaque page/composant asynchrone :
- **Skeleton** : forme qui ressemble au contenu final
- **Spinner** : uniquement pour les actions (bouton submit)
- **Progress bar** : pour les uploads/imports longs

```typescript
// Pattern Suspense
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}
```

### 3. Error Boundaries

```typescript
// src/app/([role])/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Une erreur est survenue</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Reessayer</button>
    </div>
  )
}
```

### 4. Notifications (si applicable)

#### In-app Notifications
- Badge count sur l'icone cloche
- Panel/dropdown avec liste des notifications
- Marquer comme lu (individual et "tout marquer")
- Clic → navigation vers la page concernee

#### Push Notifications (PWA)
- Service Worker registration
- Permission request (UX non-intrusif)
- Notification formatee (titre, body, icon, action)

### 5. PWA (si applicable)

- `public/manifest.json` (name, icons, theme_color, display: standalone)
- Service Worker pour cache offline (pages statiques)
- Install prompt sur mobile
- Splash screen

### 6. Micro-interactions

- **Transitions de page** : fade in (150ms)
- **Hover states** : tous les elements cliquables
- **Press feedback** : scale 0.97 sur les boutons (mobile)
- **Toast animations** : slide in depuis le haut
- **Skeleton pulse** : animation subtile
- **Success animations** : check icon avec scale

**Regles (de constraints.md)** :
- Utiliser `transform` + `opacity` uniquement (GPU accelere)
- Pas de `transition: all` — specifier les proprietes
- Pas de `filter: blur()` anime
- Durees : fast (150ms), normal (250ms), slow (350ms)

### 7. Performance

- **Images** : next/image avec lazy loading
- **Fonts** : preload, display: swap
- **Bundle** : verifier avec `npm run build` (taille des chunks)
- **Lighthouse** : viser > 90 sur Performance, Accessibility, Best Practices

### 8. Accessibilite

- **Keyboard navigation** : tab order logique, focus-visible
- **Screen readers** : aria-labels, aria-expanded, aria-current
- **Contrast** : WCAG AA minimum (4.5:1 texte, 3:1 UI)
- **Reduced motion** : `prefers-reduced-motion: reduce`

## Validation

- [ ] Responsive verifie sur 1920px, 768px, 375px
- [ ] Touch targets ≥ 44px partout
- [ ] Pas de scroll horizontal
- [ ] Loading skeletons sur toutes les pages asynchrones
- [ ] Error boundaries sur chaque route group
- [ ] Notifications in-app fonctionnelles (si applicable)
- [ ] PWA installable sur mobile (si applicable)
- [ ] Transitions fluides (pas de jank)
- [ ] Lighthouse > 90 (Performance, Accessibility)
- [ ] Keyboard navigation complete
- [ ] Contrast WCAG AA
- [ ] `prefers-reduced-motion` respecte
