/frontend-design

# Mission : Implémenter les 3 mocks animés en boucle + intégration

Tu travailles sur le site Neurolia. Le squelette de la section Process existe déjà dans `components/sections/process.tsx` avec 3 cards et des zones mock vides. Tu dois remplir ces zones avec des **micro-scènes animées en boucle infinie** (CSS `@keyframes`, PAS des animations one-shot au scroll).

## LECTURE OBLIGATOIRE AVANT DE CODER

1. `references/briefs/process-section-landing.md` — brief complet avec specs d'animation
2. `app/globals.css` — design tokens + pattern des animations Hero (lignes ~1296+)
3. `components/sections/process.tsx` — composant existant à modifier
4. `references/sites/xtract/screenshots/process.png` — référence visuelle du niveau de richesse attendu

## EXIGENCE FONDAMENTALE

Les animations sont des **boucles infinies CSS**, comme des mini-vidéos qui tournent en permanence. PAS des entrées au scroll qui se jouent une fois. Le pattern est identique aux animations Hero existantes dans `globals.css` : `@keyframes` → classe CSS → `will-change` → `prefers-reduced-motion`.

### CE QUI N'EST PAS ACCEPTABLE
- Des animations `once: true` qui se jouent une fois au scroll puis s'arrêtent
- Des mocks statiques sans animation continue
- Utiliser Framer Motion pour les animations en boucle (CSS only pour les boucles)

---

## CARD 01 — "On écoute" : SCAN CONTINU

**Layout** : titre "AUDIT DE SITUATION" + 4 lignes de checklist (check terracotta + label)

**Animation continue** : Une ligne de scan horizontale terracotta (2-3px) qui descend du haut vers le bas de la checklist en boucle (~4.5s). Quand la ligne passe devant un item, son icône check pulse (opacity 0.4→1→0.4). Chaque check a un `animation-delay` décalé de ~1.1s.

```css
@keyframes process-scan {
  0%, 100% { transform: translateY(0); }
  90% { transform: translateY(calc(100% - 3px)); }
}
@keyframes process-check-pulse {
  0%, 100% { opacity: 0.4; }
  15%, 35% { opacity: 1; }
}
```

**Validation code Card 01** :
- [ ] `globals.css` contient `@keyframes process-scan` et `@keyframes process-check-pulse`
- [ ] Les classes utilisent `animation: ... infinite`
- [ ] Les 4 checks ont des `animation-delay` différents
- [ ] `will-change: transform` sur la scan line

---

## CARD 02 — "On propose" : MODULE PULSE

**Layout** : titre "RECOMMANDATION SUR-MESURE" + 3 blocs (barre terracotta 3px gauche + nom service) + ligne "Budget estimé : sur-mesure"

**Animation continue** : Un glow terracotta qui cycle à travers les 3 blocs en vague (~4s). La barre du bloc 1 s'illumine (opacity + box-shadow), puis bloc 2, puis bloc 3, puis ça recommence. Chaque bloc a un `animation-delay` décalé de ~1.3s.

```css
@keyframes process-module-pulse {
  0%, 100% { opacity: 0.3; box-shadow: none; }
  20%, 40% { opacity: 1; box-shadow: 0 0 12px rgba(196,92,59,0.3); }
}
```

**Validation code Card 02** :
- [ ] `globals.css` contient `@keyframes process-module-pulse`
- [ ] Les 3 blocs ont des `animation-delay` différents (~0s, ~1.3s, ~2.6s)
- [ ] Chaque bloc a la barre terracotta 3px à gauche

---

## CARD 03 — "On livre" : ÉCOSYSTÈME VIVANT (la plus riche)

**Layout** : titre "ÉCOSYSTÈME EN PRODUCTION" + 3 zones :
1. "Site" + barre de progression terracotta pleine + label "EN LIGNE"
2. "Automatisations" + points CRM → Email → Facturation connectés par des lignes
3. "Dashboard" + label "ACTIF" + métriques "127 LEADS" et "4.2% TAUX CONV."

**3 animations continues en parallèle** :

**Zone Site — Shimmer** : Un reflet lumineux (pseudo-element) traverse la barre de gauche à droite en boucle (~3s). "EN LIGNE" pulse.

**Zone Automatisations — Data flow** : Des petits dots terracotta (2-3px) voyagent le long des lignes CRM→Email→Facturation en continu (~2.5s). Les points pulsent quand un dot arrive.

**Zone Dashboard — Statut vivant** : "ACTIF" pulse comme un indicateur vert (~2s). Les métriques ont un subtle opacity pulse (~4s).

```css
@keyframes process-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
@keyframes process-data-flow {
  0% { transform: translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(var(--flow-distance, 100px)); opacity: 0; }
}
@keyframes process-status-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
```

**Validation code Card 03** :
- [ ] `globals.css` contient `process-shimmer`, `process-data-flow`, `process-status-pulse`
- [ ] La barre est pleine par défaut, le shimmer est un pseudo-element par-dessus
- [ ] Les dots sont positionnés `absolute` avec `translateX`
- [ ] Toutes les animations sont `infinite`

---

## CONTRAINTES ADN (non-négociable)

| Contrainte | Valeur |
|------------|--------|
| Fond cards/mock | `#050810` |
| Accent | `#C45C3B` terracotta (5-10%) |
| Border-radius | `0` partout |
| Animations autorisées | `translateX`, `translateY`, `opacity`, `scaleX` |
| Interdit | `rotate`, `blur`, `filter`, `scale` sur conteneurs |
| `will-change` | `transform` ou `opacity` sur chaque élément animé |

## CE QUE TU DOIS FAIRE

1. Lire les 4 fichiers listés dans LECTURE OBLIGATOIRE
2. Ajouter les `@keyframes` process-* dans `globals.css` (après les hero-*, même section pattern)
3. Ajouter les classes `.process-*` dans `globals.css`
4. Ajouter `@media (prefers-reduced-motion: reduce)` pour toutes les animations process
5. Modifier `components/sections/process.tsx` : remplacer les zones mock vides par les 3 composants AuditMock, ProposalMock, EcosystemMock avec les animations CSS continues
6. Chaque mock est un composant séparé avec son propre JSX
7. Vérifier que `app/page.tsx` importe bien `<Process />` entre `<ServicesPreview />` et `<PortfolioPreview />`
8. Lancer `npm run dev` et vérifier qu'il n'y a pas d'erreur TypeScript/build

## AUTO-VALIDATION FINALE

Avant de terminer, vérifie dans le code source :
- [ ] `globals.css` contient au minimum 6 `@keyframes` process-* différents
- [ ] Toutes les animations process utilisent `infinite`
- [ ] `@media (prefers-reduced-motion: reduce)` couvre toutes les classes process-*
- [ ] Aucun mock n'utilise `useInView` + `once: true` comme animation principale (juste pour l'entrée de la card, pas pour le mock)
- [ ] Les 3 zones mock vides ont été remplacées par des composants animés
- [ ] `npm run dev` ne produit aucune erreur
