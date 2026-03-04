# Feature F02 : Process Landing — Card 01 "On écoute" (Animated Mock)

> **Feature** : Section Process sur la landing page
> **Brief complet** : `references/briefs/process-section-landing.md`
> **Prérequis** : F01 complété (structure de la section)

## Skill

**Frontend Design** — Tâche créative (mock animé, rendu visuel).

```bash
/frontend-design
```

Lire impérativement ce fichier ET `references/briefs/process-section-landing.md` section "Card 01" avant de coder.

---

## Objectif

Remplir la zone mock de la Card 01 avec un mock UI **animé** qui simule un audit de situation. Les éléments apparaissent **séquentiellement** quand la card entre dans le viewport.

## Input

- `components/sections/process.tsx` (créé à l'étape F01)
- `references/sites/xtract/screenshots/process.png` (référence visuelle du niveau de richesse attendu)
- `references/briefs/process-section-landing.md` → section "Card 01"

---

## Ce qu'on construit dans la zone mock

### Layout statique (ce qui sera visible une fois l'animation terminée)

```
┌─────────────────────────────────┐
│  ■ AUDIT DE SITUATION           │  ← titre uppercase, petit carré terracotta
│                                 │
│  ✓  Site web actuel             │  ← check terracotta + label
│  ✓  Outils existants (CRM...)  │
│  ✓  Processus manuels          │
│  ✓  Objectifs business          │
└─────────────────────────────────┘
```

### Animation continue (CRITIQUE — c'est le coeur de cette étape)

L'animation est une **boucle infinie en CSS**, pas un one-shot au scroll. Le pattern est celui du Hero existant (`globals.css` lignes ~1296+).

**Scan line** : Une ligne horizontale terracotta (2-3px, largeur 100%) qui descend du haut vers le bas de la zone checklist en boucle.

**Check pulse** : Chaque icône check pulse (opacity 0.4→1→0.4) quand la scan line passe devant. Décalé via `animation-delay` CSS.

| Élément | Animation CSS | Durée | Delay |
|---------|--------------|-------|-------|
| Scan line | `translateY` 0→100% en boucle | 4.5s infinite | 0s |
| Check 1 | opacity pulse 0.4→1→0.4 | 4.5s infinite | 0s |
| Check 2 | même pulse | 4.5s infinite | ~1.1s |
| Check 3 | même pulse | 4.5s infinite | ~2.2s |
| Check 4 | même pulse | 4.5s infinite | ~3.3s |

### Ce qu'il faut créer

1. **Dans `globals.css`** : Ajouter les `@keyframes` process-scan et process-check-pulse (après les hero-*), les classes `.process-scan` et `.process-check-pulse`, et le `@media (prefers-reduced-motion)` correspondant
2. **Dans le composant** : Utiliser ces classes CSS, PAS Framer Motion pour les boucles

### Icône Check

SVG inline simple (pas d'import externe), pas de border-radius :

```tsx
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
  <rect width="20" height="20" fill="#C45C3B" fillOpacity="0.15" />
  <path d="M6 10l3 3 5-6" stroke="#C45C3B" strokeWidth="2" strokeLinecap="square" />
</svg>
```

---

## Ce qui N'EST PAS acceptable

- Une animation qui se joue une fois au scroll puis s'arrête
- Un mock statique sans animation continue
- Utiliser uniquement Framer Motion `useInView` + `once: true` pour le mock (ça c'est pour l'entrée de la card, pas pour le mock)

## Comment vérifier que ça marche

1. Ouvrir le site dans le navigateur
2. Scroller vers la section Process
3. **Observer** : la ligne de scan descend EN CONTINU, les checks pulsent au passage
4. Attendre 10 secondes : l'animation doit CONTINUER à tourner (pas s'arrêter)
5. Revenir sur la page après 1 minute : l'animation tourne toujours

---

## Validation visuelle (humain)

- [ ] La ligne de scan descend et remonte en boucle (animation visible en continu)
- [ ] Les checks pulsent quand la scan line passe devant eux
- [ ] L'animation ne s'arrête jamais (boucle infinie)
- [ ] Les checks sont en terracotta `#C45C3B`
- [ ] Le mock est responsive (s'adapte à la largeur de la card sur mobile)

## Validation code (vérifiable dans le source)

- [ ] `globals.css` contient `@keyframes process-scan` et `@keyframes process-check-pulse`
- [ ] Les classes CSS utilisent `animation: ... infinite` (pas de Framer Motion pour les boucles)
- [ ] `@media (prefers-reduced-motion: reduce)` désactive les animations process
- [ ] Les 4 checks ont des `animation-delay` différents (décalés de ~1.1s chacun)
- [ ] `will-change: transform` est présent sur la scan line

---

## Prochaine étape

→ `pipeline/stages/F03-process-card-proposal.md`
