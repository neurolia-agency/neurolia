# Phase 4 — Vérification

> Sous-étape de [A02-brand.md](../A02-brand.md)

## Instructions

1. **Relire chaque fichier** — vérifier qu'aucun placeholder `[texte]` ne reste
2. **Vérifier la dérivation** — chaque fichier a son commentaire `<!-- Dérive de : ... -->`
3. **Vérifier la cohérence** — les valeurs dans about.md, le ton dans tone.md et les messages dans positioning.md doivent raconter la même histoire
4. **Valider le système couleurs** — contraste WCAG AA entre textes et backgrounds
5. **Relire la Carte de Dérivation** (00-platform.md) — vérifier que chaque lien Composant → Fichier est bien matérialisé

---

## Checklists de validation

### Plateforme (00-platform.md)
- [ ] **Insight** : Contient une tension réelle (pas un truisme)
- [ ] **Insight** : Passe le test d'interchangeabilité
- [ ] **Values** : 3-4 valeurs, chacune avec définition + implique + exclut
- [ ] **Archétype** : Justifié par le contexte, pas choisi arbitrairement
- [ ] **Archétype** : Manifestation déclinée (ton, comportement, visuel)
- [ ] **Promise** : Passe le test de spécificité
- [ ] **Proof Points** : Vérifiables (pas inventés)
- [ ] **Carte de Dérivation** : Complète (tous les composants → fichiers)

### Par fichier
- [ ] **about.md** : Mission/Vision ancrées dans le réel (pas de corporate générique)
- [ ] **about.md** : Chiffres clés vérifiables (pas inventés)
- [ ] **about.md** : Slogan distinct de la tagline (positioning.md)
- [ ] **services.md** : Adapté au secteur (pas "services" pour un restaurant)
- [ ] **services.md** : Chaque catégorie a tagline + cible + tarif
- [ ] **positioning.md** : Messages par section correspondent aux pages réelles du site
- [ ] **positioning.md** : Messages ont des angles distincts (pas de reformulation)
- [ ] **positioning.md** : CTAs ont un contexte d'usage
- [ ] **tone.md** : Chaque trait de personnalité a un exemple de phrase contextualisé
- [ ] **tone.md** : Mots à éviter ont une justification
- [ ] **tone.md** : Traits dérivés explicitement de l'archétype/values/insight
- [ ] **personas.md** : Chaque persona a un scénario narratif (pas juste des bullets)
- [ ] **personas.md** : Message clé sonne vrai, pas marketing
- [ ] **colors.md** : Toutes les couleurs en HEX + OKLCH
- [ ] **colors.md** : Variantes (clair/foncé/pâle) pour chaque couleur principale
- [ ] **colors.md** : Harmonie colorimétrique justifiée
- [ ] **colors.md** : Contraste WCAG AA vérifié (texte/fond)
- [ ] **typography.md** : Échelle complète H1→Caption avec desktop + mobile
- [ ] **typography.md** : Variables CSS avec clamp() pour le responsive

### Qualité créative — Expression verbale (via `/brand-expression`)
- [ ] Tagline principale : passe le test de spécificité (non-interchangeable avec un concurrent direct)
- [ ] Tagline principale : score ≥ 17/20
- [ ] Slogan ≠ Tagline (deux formulations distinctes avec deux fonctions différentes)
- [ ] Baseline : ajoute du contexte, ne reformule pas la tagline
- [ ] Messages par section : chacun a un angle distinct (pas de reformulation du même message)
- [ ] Messages par section : chacun dérive d'un composant plateforme identifié
- [ ] Taglines de catégories (services.md) : différenciées entre elles, pas de "Nous sommes là pour..."
- [ ] Exemples de ton (tone.md) : ancrés dans des situations spécifiques au client, pas génériques
- [ ] Aucun anti-pattern de `checklists/creative-quality.md` présent dans les outputs finaux

### Qualité créative — Identité visuelle (Phase 3b)
- [ ] **colors.md** : Stratégie de palette justifiée par l'archétype (pas de choix arbitraire)
- [ ] **colors.md** : Noms de couleurs évocateurs et cohérents avec l'univers de marque
- [ ] **typography.md** : Choix de police justifié par l'archétype (feeling décrit)
- [ ] **typography.md** : Pairing argumenté (contraste hiérarchique, cohérence atmosphérique)
- [ ] **personas.md** : Scénarios narratifs immersifs (pas de bullet points secs)
- [ ] **personas.md** : Freins formulés en paroles intérieures authentiques

### Qualite visuelle
- [ ] **colors.md** : Contraintes Qualite Couleurs passees (max 1 accent, saturation < 80%, pas de LILA, pas de #000)
- [ ] **typography.md** : Contraintes Qualite Typographie passees (pas d'Inter, serif contraint, choix justifie)
- [ ] **colors.md** : Si base ui-ux-pro-max, palette personnalisee (pas de copier-coller CSV)
- [ ] **typography.md** : Si base ui-ux-pro-max, pairing evalue contre l'archetype
- [ ] **00-platform.md** : Section "Calibrage Frontend" remplie (layout, mouvement, densité, registre visuel, techniques)
- [ ] **Carte de Dérivation** : Inclut les lignes visuelles/frontend (Archétype → project-dials, constraints, visual-vocabulary)

### Dérivation et cohérence
- [ ] 8 fichiers créés (00-platform.md + 7 fichiers)
- [ ] Chaque fichier a son commentaire `<!-- Dérive de : ... -->`
- [ ] Aucun placeholder `[texte]` restant
- [ ] Variables CSS définies (colors.md + typography.md)
- [ ] Cohérence entre les 8 fichiers (même voix, mêmes valeurs, même archétype)
- [ ] Si marque existante : identité étendue, pas recréée
- [ ] Carte de Dérivation (00-platform.md) reflète les liens réels
