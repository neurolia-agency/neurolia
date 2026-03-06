# Splash - Wireframe

**Route** : / (ecran initial au lancement)
**Objectif** : Verifier l'authentification et rediriger vers le bon ecran selon le role.

---

## Zone 1 : Fond + Logo

**Contenu** :
- Fond plein ecran : `visual-vocabulary.md > fond page`
- Logo "NI" (initiales dans un carre arrondi) centre horizontal et vertical
- Texte "Neurolia-Immo" sous le logo, 20px weight 600, `visual-vocabulary.md > texte principal`

**Layout** : Plein ecran, centrage vertical et horizontal, safe areas respectees
**Interaction** : Aucune interaction utilisateur — ecran automatique < 2 secondes

---

## Zone 2 : Loader (conditionnel)

**Contenu** :
- Indicateur de chargement discret sous le texte (spinner 24px, `visual-vocabulary.md > accent primaire`)
- Visible uniquement si la verification de session depasse 1 seconde

**Layout** : Centre horizontal, 24px sous le texte app, margin-top 16px
**Interaction** : Aucune — disparait a la redirection

---

## Transitions

| Condition | Destination | Type |
|-----------|-------------|------|
| Non authentifie | `login.md` | Replace |
| Auth valide + role owner | `dashboard.md` | Replace |
| Auth valide + role cleaning_staff | `planning-jour.md` | Replace |

---

## Etats Speciaux

### Loading
- Logo affiche immediatement (pas de skeleton)
- Spinner visible si > 1 seconde
- `emotion-map.md > Splash > element signature` : fade-in du logo 300ms ease-out

### Error
- Si verification de session echoue → redirection silencieuse vers `login.md`
- Pas de message d'erreur affiche sur cet ecran

---

*Wireframe D03 | Splash | 2 zones*
