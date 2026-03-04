# Brief — Services : Navigation par Poles avec Overlay Anime

**Statut** : Valide, en attente de contenu
**Priorite** : Haute
**Cree le** : 2026-02-13
**Skill d'implementation** : `/frontend-design`

---

## Contexte

La page Services actuelle affiche un long scroll avec 3 blocs editoriaux empiles (ServicesGrid). On veut **ajouter** une navigation par **2 poles** (Web + Automatisation) ou chaque pole s'ouvre dans un overlay anime.

### Scope : NON-DESTRUCTIF

**On ne touche a RIEN d'existant.** On cree uniquement un nouveau composant `ServicesPoles` qui s'insere dans la page. Le remplacement eventuel du ServicesGrid se fera plus tard, dans un second temps.

### Ce qu'on cree

- `components/pages/services/services-poles.tsx` — nouveau composant autonome (2 cartes + overlay)

### Ce qu'on ne touche PAS

- `components/pages/services/services-grid.tsx` (reste en place)
- `components/pages/services/hero.tsx` (reste en place)
- `components/pages/services/process.tsx` (reste en place)
- `components/pages/services/faq.tsx` (reste en place)
- `components/sections/cta-final.tsx` (reste en place)

### Integration dans la page

On ajoute `<ServicesPoles />` dans `app/services/page.tsx`, entre le hero et le grid existant. Aucune suppression.

---

## Decision technique : Overlay (pas de routing)

**Approche retenue** : overlay/modal pilote par state local.

Pourquoi :
- Un `useState` controle quel pole est ouvert (ou `null`)
- Pas de gestion d'URL, pas de back button a intercepter
- Le composant reste dans `/services` — un seul fichier a maintenir
- L'overlay est un enfant du meme composant, pas une page separee
- Compatible avec `AnimatePresence` de Motion pour entrees/sorties fluides

**Pas de routing** : ni pages reelles (`/services/web`), ni fausses pages avec `history.pushState`.

---

## Animation — Sequence detaillee

### Etat initial

2 cartes cote a cote sur la page Services (dans le hero ou juste en dessous).

### Au clic sur une carte

**Temps 0 - 400ms : Flip**
- La carte cliquee fait un `rotateY(0 -> 180deg)` autour de son axe vertical
- Le verso apparait (fond + titre du pole en preview)
- L'autre carte fade out (opacity 1 -> 0)
- Un backdrop sombre commence a apparaitre (opacity 0 -> 0.6)

**Temps 400ms - 800ms : Expand**
- La carte (sur son verso) s'agrandit depuis sa position/taille d'origine vers ~92-95% du viewport
- Reste centree avec ~20-30px de marge visible tout autour
- La page Services est visible floutee/assombrie derriere -> l'utilisateur comprend que c'est une couche par-dessus
- Un bouton X apparait en haut a droite avec un fade-in

**Temps 800ms - 1100ms : Reveal contenu**
- Le contenu interieur apparait en stagger (titre, puis services, puis CTA)
- Subtil, rapide, professionnel

### A la fermeture (clic sur X ou sur le backdrop)

**Animation inverse condensee (~600ms total)**
- Contenu fade out rapide (150ms)
- Carte shrink vers sa taille/position d'origine + flip inverse (400ms)
- Backdrop disparait, l'autre carte revient

---

## Format de la carte expandue

```
+---------------------------------------------------+
|                                               [X] |
|                                                   |
|  -- POLE WEB                                      |
|                                                   |
|  Votre Presence en Ligne                          |
|  -------------------------                        |
|                                                   |
|  +-------------+  +-------------+  +------------+ |
|  | Site Vitrine|  |  SEO &      |  |Maintenan-  | |
|  |             |  |  Contenu    |  |ce & Suivi  | |
|  |  desc...    |  |  desc...    |  | desc...    | |
|  |             |  |             |  |            | |
|  |  [CTA]      |  |  [CTA]      |  |  [CTA]     | |
|  +-------------+  +-------------+  +------------+ |
|                                                   |
|           [ CTA principal du pole ]               |
|                                                   |
+---------------------------------------------------+
```

### Comportement scroll

- Le **body** est verrouille (`overflow: hidden`) quand l'overlay est ouvert
- La carte expandue a son **propre scroll interne** si le contenu depasse
- Padding interne genereux (40-60px) pour respirer

### Responsive

- Desktop : carte ~92% du viewport, grille 3 colonnes pour les services
- Tablet : carte ~96% du viewport, grille 2 colonnes
- Mobile : carte ~100% du viewport (plein ecran), grille 1 colonne, bouton X toujours visible

---

## Structure composant

```
services/page.tsx
  +-- <ServicesHero />           (INCHANGE)
  +-- <ServicesPoles />          <- NOUVEAU composant unique (seul ajout)
  |     +-- Carte Pole Web       <- cliquable
  |     +-- Carte Pole Auto      <- cliquable
  |     +-- <AnimatePresence>
  |           +-- <Backdrop />           (si pole ouvert)
  |           +-- <PoleOverlay />        (la carte expandue)
  |                 +-- Header + bouton X
  |                 +-- Grille services du pole (placeholder)
  |                 +-- CTA pole
  +-- <ServicesGrid />           (INCHANGE — reste en place)
  +-- <ServicesProcess />        (INCHANGE)
  +-- <ServicesFaq />            (INCHANGE)
  +-- <CtaFinal />               (INCHANGE)
```

Un seul nouveau fichier : `components/pages/services/services-poles.tsx`. State local + Motion. Zero impact sur l'existant.

---

## Stack technique

| Besoin | Solution |
|--------|----------|
| Flip card | `rotateY` avec `transform-style: preserve-3d` |
| Expand/shrink | `framer-motion` `layoutId` ou animation manuelle position/size |
| Entree/sortie | `AnimatePresence` de Motion |
| Backdrop | `div` fixe avec `backdrop-filter: blur(8px)` + opacity animee |
| Lock scroll body | `document.body.style.overflow = 'hidden'` toggle |
| Accessibilite | `prefers-reduced-motion` : skip flip, fade direct |

---

## Contenu des poles (a completer)

### Pole Web

Services a regrouper :
- Site Vitrine (service principal)
- Audit & Strategie SEO
- Contenu SEO Mensuel
- Maintenance & Evolution

### Pole Automatisation

Services a regrouper :
- Chatbot IA / Double Numerique (service principal)
- Automatisation Process & CRM

> **Note** : le contenu exact (textes, descriptions, CTA) sera fourni separement. Ce brief ne couvre que l'animation et le format.

---

## Criteres de validation

- [ ] Les 2 cartes sont cliquables et declenchent l'animation flip + expand
- [ ] L'overlay prend ~92% du viewport desktop avec la page visible derriere
- [ ] Le bouton X ferme l'overlay avec l'animation inverse
- [ ] Le clic sur le backdrop ferme aussi l'overlay
- [ ] Le scroll du body est verrouille quand l'overlay est ouvert
- [ ] L'animation est fluide (60fps), pas de saccade
- [ ] `prefers-reduced-motion` respecte (pas de flip, transition directe)
- [ ] Responsive : fonctionne sur mobile, tablet, desktop
- [ ] Le contenu de l'overlay est scrollable independamment
