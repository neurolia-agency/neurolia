# Feature F05 : Process Landing — Intégration & Validation Finale

> **Feature** : Section Process sur la landing page
> **Brief complet** : `references/briefs/process-section-landing.md`
> **Prérequis** : F04 complété (les 3 cards sont animées)

## Skill

**Apex** — Tâche mécanique (intégration + validation, pas de créativité requise).

```bash
/apex -a -s exécuter étape F05-process-integration depuis pipeline/stages/F05-process-integration.md
```

---

## Objectif

Intégrer la section Process dans la landing page et valider l'ensemble (animations, responsive, cohérence visuelle, performance).

---

## Étape 1 : Intégration dans page.tsx

Modifier `app/page.tsx` pour ajouter la section Process entre ServicesPreview et PortfolioPreview.

```tsx
import Process from '@/components/sections/process'

// Dans le return :
<Hero />
<ServicesPreview />
<Process />          {/* ← NOUVEAU */}
<PortfolioPreview />
<Testimonials />
<ContactMini />
<CtaFinal />
```

---

## Étape 2 : Validation visuelle complète

Ouvrir `http://localhost:3000` et scroller toute la page. Vérifier :

### Animations (le plus important)

- [ ] **Card 01** : Les 4 lignes de checklist apparaissent une par une au scroll
- [ ] **Card 02** : Les 3 blocs services glissent depuis la gauche séquentiellement
- [ ] **Card 03** : La barre se remplit → points s'allument → métriques comptent
- [ ] Chaque card a son propre trigger `useInView` (les animations se déclenchent quand CHAQUE card entre dans le viewport, pas toutes en même temps)
- [ ] Les animations ne se rejouent pas quand on remonte et redescend

### Cohérence visuelle

- [ ] La section s'intègre naturellement entre ServicesPreview et PortfolioPreview
- [ ] Pas de rupture de rythme (spacing cohérent avec les sections adjacentes)
- [ ] Le fond (`#050810`) est cohérent avec le reste de la page
- [ ] Les barres terracotta et la typographie sont alignées avec l'ADN du site
- [ ] La section header "Comment on travaille" est alignée gauche (pas centrée)

### Responsive

- [ ] **Desktop (>1024px)** : 3 cards en grille horizontale
- [ ] **Mobile (<768px)** : Cards empilées verticalement
- [ ] Les mocks UI s'adaptent à la largeur de la card (pas de débordement)
- [ ] Les animations fonctionnent aussi sur mobile

### Performance

- [ ] Pas de jank/saccade pendant les animations (60fps)
- [ ] Les éléments animés utilisent `will-change: transform` ou `opacity`
- [ ] Pas de layout shift visible (CLS)

---

## Étape 3 : Nettoyage

- [ ] Supprimer les zones placeholder si il en reste (les zones "mock vide" de F01)
- [ ] Vérifier qu'il n'y a pas de code commenté inutile
- [ ] Vérifier que le composant est bien `"use client"` (requis pour Framer Motion)

---

## Validation finale

Toutes les cases ci-dessus cochées = feature terminée.

Le composant existant sur `/services` (`components/pages/services/process.tsx`) n'a PAS été modifié.

---

## Récap des fichiers

| Fichier | Action |
|---------|--------|
| `components/sections/process.tsx` | Créé (F01) puis enrichi (F02, F03, F04) |
| `app/page.tsx` | Modifié (ajout import + composant Process) |
