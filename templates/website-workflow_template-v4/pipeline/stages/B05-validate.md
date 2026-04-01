# Etape B5 : Validation

> **Phase B : Design / Vibe Coding** - Controle qualite exhaustif avant deploiement.

## Circuit d'Agents v4

**Le Technical Validator (haiku) execute un pass final sur l'ensemble du site.**

```
Pour CHAQUE page :
  Technical Validator lit :
  -> Le code source de la page
  -> constraints.md (regle par regle)
  -> ui-kit.md (composants autorises)
  -> globals.css (tokens)
  -> Produit : _preflight/validation/[page]-report.md (pass/fail par regle)
```

> Ce pass final est DIFFERENT des validations section par section de B02-B03.
> Il verifie la **coherence globale** et detecte les regressions introduites en B04.

---

## Objectif

Valider que le site repond a TOUS les criteres de qualite avant mise en production.

## Tests a Effectuer

### 1. Tests Fonctionnels

- [ ] Tous les liens internes fonctionnent (pas de 404)
- [ ] Navigation mobile fonctionne
- [ ] Logo ramene a l'accueil
- [ ] CTA header fonctionne
- [ ] Formulaire contact : validation client (Zod) + serveur (Server Action)
- [ ] Messages d'erreur affiches correctement
- [ ] Page 404 personnalisee
- [ ] Pas d'erreur dans la console

### 2. Tests Responsive

- [ ] Mobile (375px) : hamburger, textes lisibles, touch targets >= 44px, pas de scroll horizontal
- [ ] Tablet (768px) : layout adapte
- [ ] Desktop (1440px) : layout optimal, hover states, animations fluides

### 3. Tests Performance (Lighthouse)

| Metrique | Minimum | Objectif |
|----------|---------|----------|
| Performance | 90 | 95+ |
| Accessibility | 95 | 100 |
| Best Practices | 90 | 100 |
| SEO | 95 | 100 |

### 4. Tests Accessibilite (WCAG AA)

- [ ] Tab navigue dans l'ordre logique
- [ ] Focus visible sur TOUS les elements interactifs
- [ ] Skip to content fonctionne
- [ ] Structure headings logique (h1 > h2 > h3)
- [ ] Images ont des alt pertinents
- [ ] Contrastes texte/fond >= 4.5:1
- [ ] aria-labels sur nav, boutons icone, liens icone

### 5. Tests Cross-Browser

- [ ] Chrome, Firefox, Safari, Edge (desktop)
- [ ] Safari iOS, Chrome Android (mobile)

### 6. Validation Direction Artistique

**Test "Est-ce [NOM_PROJET] ?" par page** :

| Page | Score | Status |
|------|-------|--------|
| Homepage | /8 | |
| Services | /8 | |
| Portfolio | /8 | |
| About | /8 | |
| Contact | /8 | |

-> Minimum 7/8 par page

**Technical Validator — Pass Final** :

Pour chaque page, l'agent verifie :
- [ ] Chaque regle "ON FAIT" de constraints.md -> implementee
- [ ] Chaque regle "ON NE FAIT PAS" -> respectee
- [ ] Tokens CSS : aucune valeur hardcodee
- [ ] Composants conformes a ui-kit.md
- [ ] Anti-patterns fd2 : aucun detecte
- [ ] Responsive complet
- [ ] A11y basique respectee

**Courbe Emotionnelle** :
- [ ] Comparer le parcours reel (en scrollant) avec emotion-map.md
- [ ] Les transitions entre sections sont fluides

### 7. Verifications Legales

- [ ] Mentions legales presentes
- [ ] Politique de confidentialite (si donnees collectees)
- [ ] Bandeau cookies (si cookies analytics/tiers)

---

## Output

Creer `output/07-validation.md` avec le rapport complet.

## Prochaine Etape

Si **PASS** -> `stages/B06-deploy.md`
Si **FAIL** -> Corriger puis re-valider (boucle B04 -> B05)

---

**Version** : 4.0
**Phase** : B5 (Design / Vibe Coding)
**Dependances** : B4 (Polish), A3 (constraints, ui-kit, emotion-map)
**Agents** : Technical Validator (haiku) en pass final global
**Produit pour** : B6 (Deploy)
