# Feature F04 : Process Landing — Card 03 "On livre" (Animated Mock)

> **Feature** : Section Process sur la landing page
> **Brief complet** : `references/briefs/process-section-landing.md`
> **Prérequis** : F03 complété (Cards 01 et 02 animées)

## Skill

**Frontend Design** — Tâche créative (mock animé le plus complexe, rendu visuel).

```bash
/frontend-design
```

Lire impérativement ce fichier ET `references/briefs/process-section-landing.md` section "Card 03" avant de coder.

---

## Objectif

Remplir la zone mock de la Card 03 avec un mock UI **animé** qui simule un écosystème qui s'active en production. C'est la card la plus complexe : barre de progression, connexions entre systèmes, et compteur de métriques.

## Input

- `components/sections/process.tsx` (avec Cards 01 et 02 déjà animées)
- `references/briefs/process-section-landing.md` → section "Card 03"

---

## Ce qu'on construit dans la zone mock

### Layout statique (ce qui sera visible une fois l'animation terminée)

```
┌───────────────────────────────────────┐
│  ■ ÉCOSYSTÈME EN PRODUCTION           │
│                                       │
│  Site                      EN LIGNE   │
│  ████████████████████████████████████  │  ← barre terracotta pleine
│                                       │
│  Automatisations                      │
│  ● CRM  ─── ● Email  ─── ● Factu.    │  ← points verts + lignes
│                                       │
│  Dashboard                    ACTIF   │
│  127 LEADS        4.2% TAUX CONV.     │  ← métriques comptées
└───────────────────────────────────────┘
```

### Animations continues (CRITIQUE — la card la plus riche, 3 animations en parallèle)

C'est la card la plus impactante. Trois animations CSS indépendantes tournent en parallèle :

**Zone "Site" — Shimmer sur la barre de progression** :
Un reflet lumineux (pseudo-element) qui traverse la barre terracotta de gauche à droite en boucle. Le label "EN LIGNE" pulse doucement.

| Élément | Animation CSS | Durée | Type |
|---------|--------------|-------|------|
| Shimmer sur la barre | pseudo-element `translateX` -100%→200% | 3s | `infinite` |
| Label "EN LIGNE" | opacity pulse 0.6→1→0.6 | 3s | `infinite` |

**Zone "Automatisations" — Data flow entre les points** :
Des petits dots terracotta (2-3px) qui voyagent le long des lignes de connexion CRM → Email → Facturation. Un dot part, traverse la ligne, disparaît, un autre part.

| Élément | Animation CSS | Durée | Type |
|---------|--------------|-------|------|
| Dot CRM→Email | `translateX` le long de la ligne | 2.5s | `infinite` |
| Dot Email→Factu | même | 2.5s | `infinite`, delay 1.2s |
| Points CRM/Email/Factu | subtle pulse quand dot arrive | 2.5s | synchronisé |

**Zone "Dashboard" — Indicateurs vivants** :
Le label "ACTIF" pulse comme un indicateur de statut vert. Les métriques ont un subtle pulse.

| Élément | Animation CSS | Durée | Type |
|---------|--------------|-------|------|
| Label "ACTIF" | opacity 0.5→1→0.5 | 2s | `infinite` |
| Métriques | opacity 0.8→1→0.8 | 4s | `infinite` |

### Ce qu'il faut créer

1. **Dans `globals.css`** : Ajouter `@keyframes process-shimmer`, `process-data-flow`, `process-status-pulse` + classes + `@media (prefers-reduced-motion)`
2. **Dans le composant** : La barre de progression est pleine (pas d'animation de remplissage), c'est le shimmer dessus qui vit. Les dots voyagent sur les lignes de connexion. Les métriques affichent directement 127 et 4.2% (les valeurs sont statiques, c'est le pulse subtil qui donne la vie).

---

## Ce qui N'EST PAS acceptable

- Des animations one-shot qui se jouent une fois au scroll
- Un mock statique après le chargement
- Les métriques ou les points de connexion sans aucune animation continue

## Comment vérifier

1. Scroller jusqu'à la Card 03
2. Observer : le shimmer traverse la barre, les dots circulent entre CRM→Email→Facturation, "ACTIF" pulse
3. Attendre 10 secondes : TOUT continue à tourner
4. C'est la card la plus vivante — elle doit donner l'impression d'un système en production active

---

## Validation visuelle (humain)

- [ ] Le shimmer traverse la barre de progression en boucle
- [ ] Des dots circulent entre les points CRM → Email → Facturation en continu
- [ ] Le label "ACTIF" pulse comme un indicateur de statut
- [ ] L'ensemble donne l'impression d'un système vivant en production
- [ ] Toutes les animations tournent en continu (pas de one-shot)
- [ ] Responsive : le layout s'adapte en mobile

## Validation code (vérifiable dans le source)

- [ ] `globals.css` contient `@keyframes process-shimmer`, `process-data-flow`, `process-status-pulse`
- [ ] Toutes les classes d'animation utilisent `animation: ... infinite`
- [ ] `@media (prefers-reduced-motion: reduce)` désactive toutes les animations process
- [ ] La barre de progression est pleine par défaut (le shimmer est un pseudo-element par-dessus)
- [ ] Les dots de data flow sont des éléments positionnés en `absolute` qui se déplacent avec `translateX`
- [ ] `will-change: transform` est présent sur les éléments animés
- [ ] Pas de Framer Motion pour les animations en boucle (CSS only)

---

## Prochaine étape

→ `pipeline/stages/F05-process-integration.md`
