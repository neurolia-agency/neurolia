# Feature F03 : Process Landing — Card 02 "On propose" (Animated Mock)

> **Feature** : Section Process sur la landing page
> **Brief complet** : `references/briefs/process-section-landing.md`
> **Prérequis** : F02 complété (Card 01 animée)

## Skill

**Frontend Design** — Tâche créative (mock animé, rendu visuel).

```bash
/frontend-design
```

Lire impérativement ce fichier ET `references/briefs/process-section-landing.md` section "Card 02" avant de coder.

---

## Objectif

Remplir la zone mock de la Card 02 avec un mock UI **animé** qui simule une recommandation sur-mesure se construisant pièce par pièce.

## Input

- `components/sections/process.tsx` (avec Card 01 déjà animée)
- `references/briefs/process-section-landing.md` → section "Card 02"

---

## Ce qu'on construit dans la zone mock

### Layout statique (ce qui sera visible une fois l'animation terminée)

```
┌───────────────────────────────────┐
│  ■ RECOMMANDATION SUR-MESURE      │  ← titre uppercase
│                                   │
│  ┃ Site Vitrine                   │  ← barre terracotta 3px gauche + label
│                                   │
│  ┃ Automatisation Mailing         │  ← même pattern
│                                   │
│  ┃ Dashboard                      │  ← même pattern
│                                   │
│  Budget estimé : sur-mesure       │  ← texte muted en bas
└───────────────────────────────────┘
```

Chaque bloc service a :
- Une barre verticale terracotta 3px à gauche (forme signature Neurolia)
- Un fond légèrement différent du container (`rgba(245,245,245,0.03)`)
- Le nom du service en texte clair

### Animation continue (CRITIQUE — boucle infinie en CSS)

Un indicateur lumineux qui cycle à travers les 3 blocs en boucle : la barre terracotta du bloc 1 s'illumine (glow), puis celle du bloc 2, puis celle du bloc 3, puis ça recommence. Comme un système qui "configure" les modules un par un.

| Élément | Animation CSS | Durée | Delay |
|---------|--------------|-------|-------|
| Barre terracotta bloc 1 | opacity 0.3→1→0.3 + box-shadow glow | 4s infinite | 0s |
| Barre terracotta bloc 2 | même pulse | 4s infinite | ~1.3s |
| Barre terracotta bloc 3 | même pulse | 4s infinite | ~2.6s |

### Ce qu'il faut créer

1. **Dans `globals.css`** : Ajouter `@keyframes process-module-pulse` (opacity + box-shadow), classe `.process-module-pulse`, et le `@media (prefers-reduced-motion)` correspondant
2. **Dans le composant** : Appliquer la classe avec des `animation-delay` inline différents pour chaque bloc

---

## Ce qui N'EST PAS acceptable

- Une animation qui se joue une fois au scroll puis s'arrête
- Les 3 blocs qui restent statiques après le chargement
- Utiliser uniquement Framer Motion `once: true` pour le mock

## Comment vérifier

1. Scroller jusqu'à la Card 02
2. Observer : les barres terracotta des blocs s'illuminent **une après l'autre** en boucle
3. Attendre 10 secondes : l'animation continue à tourner
4. Chaque bloc a la barre terracotta 3px à gauche, le glow se déplace de bloc en bloc

---

## Validation visuelle (humain)

- [ ] Les barres terracotta pulsent en séquence (bloc 1 → bloc 2 → bloc 3 → bloc 1...)
- [ ] L'animation est continue (ne s'arrête jamais)
- [ ] Chaque bloc a la barre terracotta 3px à gauche
- [ ] Le glow est subtil (pas agressif)
- [ ] Responsive : les blocs s'adaptent en mobile

## Validation code (vérifiable dans le source)

- [ ] `globals.css` contient `@keyframes process-module-pulse`
- [ ] La classe utilise `animation: ... infinite`
- [ ] Les 3 blocs ont des `animation-delay` différents (~0s, ~1.3s, ~2.6s)
- [ ] `@media (prefers-reduced-motion: reduce)` désactive l'animation
- [ ] Pas de Framer Motion `once: true` pour l'animation du mock (juste pour l'entrée de la card)

---

## Prochaine étape

→ `pipeline/stages/F04-process-card-delivery.md`
