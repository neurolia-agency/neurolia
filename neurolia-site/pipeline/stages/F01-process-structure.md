# Feature F01 : Process Landing — Structure

> **Feature** : Section Process sur la landing page
> **Brief complet** : `references/briefs/process-section-landing.md`

## Skill

**Apex** — Tâche mécanique (squelette, pas de créativité requise).

```bash
/apex -a -s exécuter étape F01-process-structure depuis pipeline/stages/F01-process-structure.md
```

---

## Objectif

Créer le squelette de la section Process : header de section + grille de 3 cards vides (titre + description + zone réservée pour les mocks animés). Pas d'animation encore — juste la structure et le spacing corrects.

## Input

- `references/briefs/process-section-landing.md` (brief validé)
- `components/pages/services/process.tsx` (référence pour le style existant)
- `app/globals.css` (design tokens)

---

## Ce qu'on crée

### Fichier : `components/sections/process.tsx`

Un composant `"use client"` avec :

1. **Section header** (aligné gauche, pas centré) :
   - Ligne terracotta + label uppercase "Comment on travaille"
   - Titre H2 : "Simple. Transparent. Sans jargon." (même style que la version /services)

2. **Grille 3 colonnes** (`grid-cols-1 md:grid-cols-3`) contenant 3 cards :
   - Chaque card a : numéro terracotta (01/02/03), titre (On écoute/On propose/On livre), description, et une **zone vide** réservée pour le mock animé (min-height: 250px, fond `#0A0F1A`, bordure subtle)

3. **CTA en bas** : Bouton "Réserver mon appel gratuit" (réutiliser le pattern du process /services)

### Contraintes ADN

| Contrainte | Valeur |
|------------|--------|
| Fond section | `#050810` |
| Fond cards/mock zone | `#0A0F1A` |
| Accent | `#C45C3B` |
| Border-radius | `0` partout |
| Barre signature | 3-4px terracotta verticale en haut à gauche de chaque card |
| Espacement | `py-20 md:py-28 lg:py-36` |

---

## Validation

Ouvrir le navigateur (`npm run dev`) et vérifier :

- [ ] La section s'affiche entre ServicesPreview et PortfolioPreview (NE PAS encore modifier `page.tsx` — juste vérifier le composant en isolation ou l'ajouter temporairement)
- [ ] Header aligné gauche avec ligne terracotta
- [ ] 3 cards en grille, chacune avec numéro + titre + description
- [ ] Zone mock vide visible (fond plus sombre, bordure) — c'est normal, les mocks arrivent dans les étapes suivantes
- [ ] Responsive : les cards passent en colonne unique sur mobile
- [ ] Le style est cohérent avec le reste du site (mêmes fonts, mêmes couleurs)

---

## Prochaine étape

→ `pipeline/stages/F02-process-card-audit.md`
