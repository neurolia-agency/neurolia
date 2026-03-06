# Etape D09 : Validation

> **Phase D-B : Code** - Controle qualite mobile avant deploiement.

## Objectif

Valider que l'application mobile repond aux criteres de qualite definis avant mise en production.

## Input

- Application complete (D05-D08)
- Tous les fichiers `pipeline/output/`
- `pipeline/output/02-art-direction/constraints.md`

## Tests a Effectuer

### 1. Tests Fonctionnels

```markdown
## Fonctionnalites

### Navigation
- [ ] Bottom tabs fonctionnent (tous les tabs)
- [ ] Stack navigation push/pop
- [ ] Back button/gesture fonctionne
- [ ] Deep links (si applicable)
- [ ] Navigation state persiste entre tabs

### Authentification
- [ ] Login fonctionne
- [ ] Register fonctionne
- [ ] Logout fonctionne
- [ ] Token refresh fonctionne
- [ ] Route guard bloque les ecrans proteges
- [ ] Social login fonctionne (si applicable)

### Formulaires
- [ ] Validation client fonctionne
- [ ] Validation serveur fonctionne
- [ ] Messages d'erreur affiches
- [ ] Message de succes affiche
- [ ] Clavier ne masque pas les champs
- [ ] Bouton submit desactive pendant envoi

### Donnees
- [ ] Tous les ecrans affichent des donnees
- [ ] Pull-to-refresh rafraichit les donnees
- [ ] Pagination / infinite scroll fonctionne (si applicable)
- [ ] Etats empty affiches quand pas de donnees
- [ ] Etats loading affiches pendant fetch
- [ ] Etats error affiches en cas d'erreur
```

### 2. Tests Responsive Mobile

```markdown
## Responsive

### iPhone SE / Petit (375px)
- [ ] Contenu lisible
- [ ] Pas de debordement horizontal
- [ ] Touch targets accessibles
- [ ] Bottom tab labels visibles
- [ ] Formulaires utilisables

### iPhone 14/15 (390px)
- [ ] Layout optimal
- [ ] Encoche (notch) respectee
- [ ] Home bar respectee
- [ ] Dynamic Island (si applicable)

### iPhone 14 Plus / Grand (428px)
- [ ] Layout adapte a l'ecran large
- [ ] Pas d'espace vide excessif
- [ ] Images bien dimensionnees

### Android Variete
- [ ] Petit ecran Android (~360px)
- [ ] Ecran standard (~400px)
- [ ] Grand ecran / Tablet (~600px si supporte)
```

### 3. Tests Performance

**Seuils minimum (PWA)** :

| Metrique | Minimum | Objectif |
|----------|---------|----------|
| Performance | 90 | 95+ |
| Accessibility | 90 | 100 |
| Best Practices | 90 | 100 |
| SEO | 90 | 100 |

**Seuils mobile natif** :

| Metrique | Seuil |
|----------|-------|
| Cold start | < 2 secondes |
| Screen transition | < 300ms |
| Scroll FPS | 60fps constant |
| Memory usage | Pas de fuite memoire |
| Bundle size | < 50MB (app store) |

```markdown
## Performance

### Temps de chargement
- [ ] Premier ecran affiche en < 2 secondes
- [ ] Navigation entre tabs < 100ms
- [ ] Navigation stack < 300ms
- [ ] Donnees fetch < 3 secondes (avec skeleton)

### Animations
- [ ] 60fps constant pendant scroll
- [ ] 60fps constant pendant transitions
- [ ] Pas de jank visible

### Memoire
- [ ] Pas de fuite memoire apres navigation intensive
- [ ] Images correctement liberees
```

### 4. Tests Accessibilite

```markdown
## Accessibilite (WCAG AA)

### Touch
- [ ] Tous les touch targets >= 44px
- [ ] Espacement entre elements tactiles >= 8px
- [ ] Zones cliquables identifiables

### Visuel
- [ ] Contrastes texte/fond >= 4.5:1 (normal)
- [ ] Contrastes texte/fond >= 3:1 (large)
- [ ] Pas d'information transmise uniquement par couleur
- [ ] Text >= 14px partout

### Screen Reader
- [ ] Labels accessibles sur tous les elements interactifs
- [ ] Ordre de lecture logique
- [ ] Images decoratives cachees (aria-hidden / decorative)
- [ ] Annonces dynamiques pour les changements d'etat

### Mouvement
- [ ] Respect de prefers-reduced-motion
- [ ] Pas d'animation clignotante
```

### 5. Tests Cross-Platform (si natif)

```markdown
## Cross-Platform

### iOS
- [ ] iPhone SE (petit ecran)
- [ ] iPhone 14/15 (standard)
- [ ] iPhone 14 Plus (grand ecran)
- [ ] iOS 16+ minimum
- [ ] Safe areas correctes

### Android
- [ ] Petit ecran (~360px)
- [ ] Standard (~400px)
- [ ] Android 12+ minimum
- [ ] Back button systeme fonctionne
- [ ] Status bar correcte
```

### 6. Validation Design

```markdown
## Conformite Direction Artistique

### Test "Est-ce [NOM_APP] ?"
[Copier depuis constraints.md]

- [ ] [Critere 1] ?
- [ ] [Critere 2] ?
- [ ] [Critere 3] ?
- [ ] [Critere 4] ?
- [ ] [Critere 5] ?

→ 5/5 = Conforme | < 4/5 = Corriger avant deploiement

### Coherence
- [ ] Couleurs conformes a colors.md
- [ ] Typographie conforme a typography.md
- [ ] Espacements conformes a visual-vocabulary.md
- [ ] Radius conformes a constraints.md
- [ ] Ton des messages conforme a tone.md
```

## Output

Creer `pipeline/output/validation-report.md` :

```markdown
# Rapport de Validation Mobile

**Date** : [DATE]
**App** : [NOM_APP]
**Version** : [VERSION]
**Testeur** : [NOM]

## Resume

| Categorie | Status |
|-----------|--------|
| Fonctionnel | PASS / FAIL |
| Responsive | PASS / FAIL |
| Performance | PASS / FAIL |
| Accessibilite | PASS / FAIL |
| Cross-platform | PASS / FAIL / N/A |
| Design | PASS / FAIL |

## Scores Performance

### PWA (Lighthouse)
| Page | Perf | A11y | BP | SEO |
|------|------|------|----|----|
| Home | XX | XX | XX | XX |
| [Screen] | XX | XX | XX | XX |

### Natif
| Metrique | iOS | Android |
|----------|-----|---------|
| Cold start | Xs | Xs |
| Memory peak | X MB | X MB |
| Bundle size | X MB | X MB |

## Issues Identifiees

### Critiques (bloquent deploiement)
- [Issue 1]
- [Issue 2]

### Mineures (peuvent attendre)
- [Issue 1]
- [Issue 2]

## Decision

- [ ] PASS : Pret pour deploiement
- [ ] FAIL : Corrections requises

**Commentaires** :
[Notes additionnelles]
```

## Validation

- [ ] Tous les tests fonctionnels passent
- [ ] Responsive OK sur 375px, 390px, 428px
- [ ] Performance > 90 (PWA) ou seuils natifs respectes
- [ ] Accessibilite WCAG AA respectee
- [ ] Cross-platform teste (si natif)
- [ ] Design conforme a constraints.md

## Prochaine Etape

Si **PASS** → `stages/D10-deploy.md`
Si **FAIL** → Corriger les issues puis re-valider

---

**Version** : 1.0
**Phase** : D-B (Code)
**Dependances** : D08 (Polish)
**Produit pour** : D10 (Deploy)
