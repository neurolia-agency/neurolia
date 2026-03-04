# Handoff — Animation Poles Overlay sur Hero existant

**Pour la prochaine session Claude Code**

---

## Commande de reprise

```
/apex -a greffe l'animation flip/overlay des 2 poles sur les cartes EXISTANTES du hero services, selon le brief 'references/briefs/services-poles-overlay.md' et ce handoff 'references/briefs/services-poles-overlay-handoff.md'
```

---

## Erreur de la session precedente

On a cree un composant `ServicesPoles` separe insere entre le hero et le grid. **C'etait faux.** L'animation flip + overlay doit etre greffee directement sur les **2 cartes deja presentes dans le hero** (`hero.tsx`), pas dans un nouveau composant.

Le fichier `services-poles.tsx` a ete supprime. `page.tsx` est revenu a son etat d'origine.

---

## Ce qu'il faut faire

Modifier **un seul fichier** : `components/pages/services/hero.tsx`

### Les 2 cartes existantes (hero.tsx:447-458)

```tsx
// hero.tsx ligne 447-458
<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
  {services.map((service, index) => (
    <ServiceCard key={index} service={service} index={index} isInView={isInView} />
  ))}
</div>
```

Les 2 cartes :
- **Pole Web** : "Votre Presence en Ligne" (href="#site-web")
- **Pole Automatisation** : "Pilote Automatique & IA" (href="#chatbot-ia")

### Comportement a ajouter

Au clic sur une carte :
1. **Flip** (0-400ms) : rotateY(0→180deg) avec preserve-3d + backface-visibility. L'autre carte fade out. Backdrop apparait.
2. **Expand** (400-800ms) : la carte (verso) s'agrandit vers ~92% viewport desktop (96% tablet, 100% mobile). Page visible floutee derriere.
3. **Reveal** (800-1100ms) : contenu interieur en stagger (titre, services, CTA).

A la fermeture (X ou backdrop) : animation inverse condensee ~600ms.

### Contenu de l'overlay (a afficher dans la carte expandue)

**Pole Web :**
- Site Vitrine
- Audit & Strategie SEO
- Contenu SEO Mensuel
- Maintenance & Evolution

**Pole Automatisation :**
- Chatbot IA / Double Numerique
- Automatisation Process & CRM

---

## Contexte technique (deja analyse)

### Patterns existants dans hero.tsx

- **Tilt 3D** : `perspective: 800px`, `rotateX/Y` avec max 4deg, `requestAnimationFrame` (lignes 80-107)
- **Gleam cursor** : radial-gradient mask qui suit la souris (lignes 140-212)
- **useInView** : `{ once: true, margin: "-50px" }` (ligne 283)
- Les cartes sont le composant `ServiceCard` (lignes 69-278)
- Elles utilisent deja `motion` et `useInView` de framer-motion

### Patterns disponibles dans le codebase

- **AnimatePresence** : utilise dans `mobile-menu.tsx` (overlay plein ecran) et `faq.tsx` (accordion)
- **useReducedMotion** : hook a `components/ui/use-reduced-motion.ts`
- **Easing Neurolia** : `[0.22, 1, 0.36, 1]` (signature) et `[0.76, 0, 0.24, 1]` (menu)
- **framer-motion** : v12.29.2
- **Pas de preserve-3d ni backface-visibility** dans le codebase actuellement

### Approche technique recommandee

1. Ajouter un state `activePole: 'web' | 'auto' | null` dans `ServicesHero`
2. Au clic sur `ServiceCard` : capturer `getBoundingClientRect()`, setter `activePole`
3. La carte fait le flip in-place (CSS transition `rotateY` sur le flip container)
4. Apres 400ms, monter l'overlay via `AnimatePresence` a la position de la carte
5. L'overlay utilise des transforms GPU (translateX/Y + scaleX/Y) pour morphing vers le viewport
6. Contenu stagger via CSS transitions avec delays
7. Body scroll lock : `document.body.style.overflow = "hidden"`
8. ESC + backdrop click pour fermer
9. `prefers-reduced-motion` : skip flip, fade direct

### Pour le flip des cartes

Chaque `ServiceCard` doit avoir :
- Un container avec `transform-style: preserve-3d`
- Une front face (contenu actuel) avec `backface-visibility: hidden`
- Une back face (preview pole) avec `backface-visibility: hidden` + `transform: rotateY(180deg)`
- Au clic : le container passe a `rotateY(180deg)`

### Fichiers a NE PAS toucher

- `services-grid.tsx`
- `process.tsx`
- `faq.tsx`
- `cta-final.tsx`
- `app/services/page.tsx`
- `app/globals.css`

---

## Brief complet

Le brief original avec toutes les specs d'animation est dans :
`references/briefs/services-poles-overlay.md`

---

## Criteres de validation

- [ ] Les 2 cartes du hero declenchent l'animation flip + expand au clic
- [ ] L'overlay prend ~92% du viewport desktop avec la page visible derriere
- [ ] Le bouton X ferme l'overlay avec l'animation inverse
- [ ] Le clic sur le backdrop ferme aussi l'overlay
- [ ] Le scroll du body est verrouille quand l'overlay est ouvert
- [ ] L'animation est fluide (60fps), transform-only
- [ ] `prefers-reduced-motion` respecte
- [ ] Responsive : mobile 100%, tablet 96%, desktop 92%
- [ ] Le contenu de l'overlay est scrollable independamment
- [ ] ESC ferme l'overlay
