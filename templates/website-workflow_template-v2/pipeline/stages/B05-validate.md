# Étape B5 : Validation

> **Phase B : Design / Vibe Coding** - Contrôle qualité exhaustif avant déploiement.

## Workflow Agents

**Le Constraint Validator (haiku) exécute un pass final sur l'ensemble du site.**

```
Pour CHAQUE page :
  Constraint Validator lit :
  → Le code source de la page
  → constraints.md (règle par règle)
  → project-dials.md (dials de chaque section)
  → ui-kit.md (composants autorisés)
  → Produit : _preflight/validation/[page]-report.md (pass/fail par règle)
```

> Ce pass final est DIFFÉRENT des validations section par section de B02-B03.
> Il vérifie la **cohérence globale** et détecte les régressions introduites en B04.

---

## Objectif

Valider que le site répond à TOUS les critères de qualité avant mise en production : fonctionnel, responsive, performant, accessible, cohérent avec la direction artistique.

## Input

| Fichier | Usage |
|---------|-------|
| Site assemblé complet | Base à tester |
| `output/02-art-direction/constraints.md` | Règles design |
| `output/02-art-direction/project-dials.md` | Dials à vérifier |
| `output/02-art-direction/ui-kit.md` | Composants autorisés |
| `output/02-art-direction/emotion-map.md` | Courbe émotionnelle |
| `_preflight/` (tous les fichiers) | Intentions originales par section |

---

## Tests à Effectuer

### 1. Tests Fonctionnels

```markdown
### Navigation
- [ ] Tous les liens internes fonctionnent (pas de 404)
- [ ] Navigation mobile fonctionne (ouverture/fermeture)
- [ ] Logo ramène à l'accueil
- [ ] CTA header fonctionne (lien/tel/scroll)
- [ ] Liens footer corrects

### Formulaires
- [ ] Formulaire contact : validation client (Zod) fonctionne
- [ ] Formulaire contact : validation serveur (Server Action) fonctionne
- [ ] Messages d'erreur affichés correctement (aria-invalid)
- [ ] Message de succès affiché (toast sonner)
- [ ] Email reçu (si service configuré)
- [ ] Rate limiting en place (si applicable)

### Pages
- [ ] Homepage charge correctement
- [ ] Toutes les pages secondaires chargent
- [ ] Page 404 personnalisée (not-found.tsx)
- [ ] Pas d'erreur dans la console
```

### 2. Tests Responsive

```markdown
### Mobile (375px)
- [ ] Header : hamburger visible, menu fonctionnel
- [ ] Textes lisibles, pas de débordement
- [ ] Images adaptées (sizes correct)
- [ ] Touch targets ≥ 44px
- [ ] Formulaires utilisables au pouce
- [ ] Pas de scroll horizontal

### Tablet (768px)
- [ ] Layout adapté (ni mobile ni desktop cassé)
- [ ] Navigation appropriée (hamburger OU desktop selon le design)
- [ ] Grids s'adaptent correctement

### Desktop (1440px)
- [ ] Layout optimal, conteneur centré
- [ ] Pas de ligne de texte > 75 caractères (var(--max-width-text))
- [ ] Hover states fonctionnels
- [ ] Animations fluides (60fps)
```

### 3. Tests Performance (Lighthouse)

```bash
# Exécuter Lighthouse sur chaque page
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-home.json
npx lighthouse http://localhost:3000/services --output=json --output-path=./lighthouse-services.json
# ... pour chaque page
```

**Seuils minimum** :

| Métrique | Minimum | Objectif |
|----------|---------|----------|
| Performance | 90 | 95+ |
| Accessibility | 95 | 100 |
| Best Practices | 90 | 100 |
| SEO | 95 | 100 |

> **Si Performance < 90** : Vérifier images (next/image, sizes, WebP), lazy loading, bundle size.
> **Si Accessibility < 95** : Vérifier contrastes, labels, aria, focus visible.

### 4. Tests Accessibilité (WCAG AA)

```markdown
### Navigation clavier
- [ ] Tab navigue dans l'ordre logique
- [ ] Focus visible sur TOUS les éléments interactifs
- [ ] Skip to content fonctionne (premier Tab)
- [ ] Escape ferme modals/menus
- [ ] Enter/Space active les boutons

### Lecteurs d'écran
- [ ] Structure headings logique (h1 > h2 > h3, pas de saut)
- [ ] Images ont des alt pertinents (pas "image de...")
- [ ] Formulaires ont des labels associés (htmlFor)
- [ ] aria-labels sur nav, boutons icône, liens icône
- [ ] aria-expanded sur hamburger
- [ ] aria-current="page" sur lien actif

### Contrastes
- [ ] Texte normal / fond ≥ 4.5:1
- [ ] Texte large / fond ≥ 3:1
- [ ] Éléments interactifs / fond ≥ 3:1
- [ ] Focus ring visible sur tous les fonds
```

### 5. Tests Cross-Browser

```markdown
### Desktop
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Edge (dernière version)

### Mobile
- [ ] Safari iOS (iPhone)
- [ ] Chrome Android
```

### 6. Validation Direction Artistique

```markdown
### Test "Est-ce [NOM_PROJET] ?" (par page)

| Page | Score | Status |
|------|-------|--------|
| Homepage | /8 | ✅/❌ |
| Services | /8 | ✅/❌ |
| Portfolio | /8 | ✅/❌ |
| About | /8 | ✅/❌ |
| Contact | /8 | ✅/❌ |

→ Minimum 7/8 par page

### Constraint Validator — Pass Final

Pour chaque page, l'agent vérifie :
- [ ] Chaque règle "ON FAIT" de constraints.md → implémentée
- [ ] Chaque règle "ON NE FAIT PAS" → respectée
- [ ] Dials par section → cohérents (VARIANCE, MOTION, DENSITY)
- [ ] Techniques de l'arsenal → implémentées si P0
- [ ] Anti-patterns project-dials.md → aucun détecté
- [ ] Composants → conformes à ui-kit.md

### Courbe Émotionnelle
- [ ] Comparer le parcours réel (en scrollant le site) avec emotion-map.md
- [ ] Chaque section transmet l'émotion prévue
- [ ] Les transitions entre sections sont fluides (pas de rupture de ton)
```

### 7. Vérifications Légales

```markdown
- [ ] Mentions légales présentes et accessibles
- [ ] Politique de confidentialité (si données collectées)
- [ ] Bandeau cookies (si cookies analytics/tiers)
- [ ] RGPD conforme (formulaires : consentement, finalité)
- [ ] CGV (si e-commerce)
```

---

## Output

Créer `output/07-validation.md` :

```markdown
# Rapport de Validation

**Date** : [DATE]
**Projet** : [NOM_PROJET]
**Validateur** : [Claude + Constraint Validator]

## Résumé

| Catégorie | Status | Notes |
|-----------|--------|-------|
| Fonctionnel | ✅/❌ | |
| Responsive | ✅/❌ | |
| Performance | ✅/❌ | Scores : [Perf/A11y/BP/SEO] |
| Accessibilité | ✅/❌ | |
| Cross-browser | ✅/❌ | |
| Direction Artistique | ✅/❌ | Scores test rapide : [X/8 par page] |
| Constraint Validator | ✅/❌ | [X] règles pass / [Y] règles fail |
| Légal | ✅/❌ | |

## Scores Lighthouse

| Page | Perf | A11y | BP | SEO |
|------|------|------|----|----|
| Homepage | XX | XX | XX | XX |
| Services | XX | XX | XX | XX |
| Portfolio | XX | XX | XX | XX |
| About | XX | XX | XX | XX |
| Contact | XX | XX | XX | XX |

## Scores Direction Artistique

| Page | Test Rapide (/8) | Dials Respectés | Anti-Patterns |
|------|-----------------|-----------------|---------------|
| Homepage | X/8 | ✅/❌ | ✅/❌ |
| Services | X/8 | ✅/❌ | ✅/❌ |
| [etc.] | | | |

## Issues Identifiées

### Critiques (bloquent déploiement)
- [Issue + page + règle violée]

### Majeures (à corriger avant livraison client)
- [Issue + page]

### Mineures (peuvent attendre v1.1)
- [Issue + page]

## Décision

- [ ] ✅ **PASS** : Prêt pour déploiement
- [ ] ⚠️ **PASS CONDITIONNEL** : Déployable avec corrections mineures planifiées
- [ ] ❌ **FAIL** : Corrections requises → retour en B04

**Commentaires** :
[Notes sur les compromis acceptés, les points forts, les améliorations futures]
```

## Validation

- [ ] Tous les tests fonctionnels passent
- [ ] Responsive OK sur mobile (375px), tablet (768px), desktop (1440px)
- [ ] Lighthouse ≥ 90 sur TOUTES les métriques, TOUTES les pages
- [ ] Accessibilité WCAG AA vérifiée (clavier, lecteur écran, contrastes)
- [ ] Cross-browser testé (Chrome, Firefox, Safari, Edge + mobile)
- [ ] Test "Est-ce [NOM_PROJET] ?" ≥ 7/8 sur chaque page
- [ ] Constraint Validator pass final : 0 fail critique
- [ ] Vérifications légales OK

## Prochaine Étape

Si **PASS** → `stages/B06-deploy.md`
Si **FAIL** → Corriger les issues puis re-valider (boucle B04 → B05)

---

**Version** : 2.0
**Phase** : B5 (Design / Vibe Coding)
**Dépendances** : B4 (Polish), A3 (constraints, project-dials, ui-kit, emotion-map)
**Agents** : Constraint Validator (haiku) en pass final global
**Produit pour** : B6 (Deploy)
