# Étape 08 : Validation

## Objectif
Vérifier la qualité technique, performance et accessibilité du site.

## Input
- Tout le contenu de `output/`
- Site assemblé et fonctionnel

## Instructions

Exécuter tous les tests et documenter les résultats.

**CRITICAL**: Aucun déploiement si validation échoue.

## Tests à Exécuter

### 1. Validation HTML/CSS
```bash
# Valider HTML (W3C)
npx html-validate "**/*.html"

# Valider CSS
npx stylelint "**/*.css"
```

### 2. Performance (Lighthouse)
```bash
# Desktop
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-desktop.json

# Mobile
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-mobile.json --preset=perf --form-factor=mobile
```

**Seuils minimums** :
- Performance : > 90
- Accessibility : > 90
- Best Practices : > 90
- SEO : > 90

### 3. Accessibilité
```bash
# axe-core
npx @axe-core/cli http://localhost:3000

# Pa11y
npx pa11y http://localhost:3000
```

### 4. Responsive
Tester manuellement sur :
- [ ] iPhone SE (375px)
- [ ] iPhone 14 (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1280px)
- [ ] Large Desktop (1920px)

### 5. Cross-Browser
Tester sur :
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Edge (dernière version)

### 6. Fonctionnel
- [ ] Navigation fonctionne
- [ ] Tous les liens valides (pas de 404)
- [ ] Formulaire envoie correctement
- [ ] Images chargent
- [ ] Menu mobile fonctionne

## Output

Créer `output/08-validation.md` :

```markdown
# Rapport de Validation - [Nom du Projet]

**Date** : [Date]
**Version** : 1.0

## Résumé

| Catégorie | Score | Statut |
|-----------|-------|--------|
| HTML Validation | [X erreurs] | [PASS/FAIL] |
| CSS Validation | [X erreurs] | [PASS/FAIL] |
| Lighthouse Desktop | [XX/100] | [PASS/FAIL] |
| Lighthouse Mobile | [XX/100] | [PASS/FAIL] |
| Accessibilité | [XX/100] | [PASS/FAIL] |
| SEO | [XX/100] | [PASS/FAIL] |

**Statut Global** : [READY / NOT READY]

---

## Détails

### 1. Validation HTML

**Outil** : html-validate
**Résultat** : [X] erreurs, [X] warnings

**Erreurs trouvées** :
- [Liste des erreurs si applicable]

**Corrections appliquées** :
- [Liste des corrections]

### 2. Validation CSS

**Outil** : stylelint
**Résultat** : [X] erreurs, [X] warnings

**Erreurs trouvées** :
- [Liste des erreurs si applicable]

### 3. Lighthouse Desktop

| Métrique | Score | Seuil | Statut |
|----------|-------|-------|--------|
| Performance | XX | 90 | [PASS/FAIL] |
| Accessibility | XX | 90 | [PASS/FAIL] |
| Best Practices | XX | 90 | [PASS/FAIL] |
| SEO | XX | 90 | [PASS/FAIL] |

**Principales recommandations** :
- [Liste des recommandations Lighthouse]

### 4. Lighthouse Mobile

| Métrique | Score | Seuil | Statut |
|----------|-------|-------|--------|
| Performance | XX | 90 | [PASS/FAIL] |
| Accessibility | XX | 90 | [PASS/FAIL] |
| Best Practices | XX | 90 | [PASS/FAIL] |
| SEO | XX | 90 | [PASS/FAIL] |

**LCP** : [X.X]s (seuil: < 2.5s)
**FID** : [X]ms (seuil: < 100ms)
**CLS** : [X.XX] (seuil: < 0.1)

### 5. Accessibilité (axe-core)

**Résultat** : [X] violations

**Violations critiques** :
- [Liste si applicable]

**Violations mineures** :
- [Liste si applicable]

### 6. Tests Responsive

| Device | Résolution | Statut | Notes |
|--------|------------|--------|-------|
| iPhone SE | 375x667 | [PASS/FAIL] | [Notes] |
| iPhone 14 | 390x844 | [PASS/FAIL] | [Notes] |
| iPad | 768x1024 | [PASS/FAIL] | [Notes] |
| Desktop | 1280x800 | [PASS/FAIL] | [Notes] |

### 7. Tests Navigateurs

| Navigateur | Version | Statut | Notes |
|------------|---------|--------|-------|
| Chrome | [XX] | [PASS/FAIL] | [Notes] |
| Firefox | [XX] | [PASS/FAIL] | [Notes] |
| Safari | [XX] | [PASS/FAIL] | [Notes] |
| Edge | [XX] | [PASS/FAIL] | [Notes] |

### 8. Tests Fonctionnels

| Test | Statut | Notes |
|------|--------|-------|
| Navigation principale | [PASS/FAIL] | |
| Menu mobile | [PASS/FAIL] | |
| Liens internes | [PASS/FAIL] | |
| Liens externes | [PASS/FAIL] | |
| Formulaire contact | [PASS/FAIL] | |
| Images | [PASS/FAIL] | |
| Animations | [PASS/FAIL] | |

---

## Issues à Résoudre

### Critiques (bloquant)
- [ ] [Issue 1]
- [ ] [Issue 2]

### Majeures (à corriger avant prod)
- [ ] [Issue 1]

### Mineures (nice to have)
- [ ] [Issue 1]

---

## Conclusion

**Prêt pour production** : [OUI / NON]

**Conditions** :
- [Liste des conditions si applicable]

**Validé par** : [Nom]
**Date** : [Date]
```

## Validation de l'Étape

- [ ] Tous les tests exécutés
- [ ] Rapport complet généré
- [ ] Issues critiques résolues
- [ ] Lighthouse > 90 sur toutes les métriques
- [ ] Aucune violation accessibilité critique

## Prochaine Étape

Si validation **PASS** → Passer à `stages/09-deploy.md`
Si validation **FAIL** → Corriger les issues et re-valider
