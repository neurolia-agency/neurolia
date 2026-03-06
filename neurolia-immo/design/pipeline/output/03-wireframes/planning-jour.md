# Planning Jour (Staff) - Wireframe

**Route** : Tab: Planning (Staff Tab 1)
**Objectif** : Afficher le planning du jour de l'agent — toutes les taches chronologiquement, avec la prochaine mise en avant.

---

## Zone 1 : Header

**Contenu** :
- Titre dynamique : `positioning.md > Messages par Ecran > Planning Jour` ("Votre planning du [date]")
  - `visual-vocabulary.md > titre ecran` (clamp 24-32px, weight 700)
  - Date au format `tone.md > Formatage des Donnees > Date` (ex: "20 fevrier")

**Layout** : Sticky header, height 56px + safe-area-top, padding horizontal 16px, titre a gauche
**Interaction** : Aucune

---

## Zone 2 : Liste Taches du Jour

**Contenu** :
- `emotion-map.md > Planning Jour > element signature`
- Cards de tache empilees verticalement :
  - Heure : 14px tabular-nums `visual-vocabulary.md > texte secondaire`, en haut a gauche
  - Nom du bien : `visual-vocabulary.md > titre card` (clamp 18-22px weight 600)
  - Type de tache : 14px weight 500 `visual-vocabulary.md > texte courant`
    - "Menage depart" / "Check arrivee" / "Menage + draps"
    - Badge "Ponctuel" si tache ad_hoc : `visual-vocabulary.md > badge texte`, fond primary-100, texte primary-700, `visual-vocabulary.md > coins badge` (6px)
    - Badge "Accueil" si tache check_in_greeting : `visual-vocabulary.md > badge texte`, fond secondary-100, texte secondary-700, `visual-vocabulary.md > coins badge` (6px) — couleur distincte des badges Menage et Ponctuel
    - Horaire affiche pour check_in_greeting : heure d'arrivee prevue ou 16:00 par defaut
  - Badge statut en haut a droite :
    - "A faire" : fond `visual-vocabulary.md > fond alerte`, texte warning-700
    - "En cours" : fond `visual-vocabulary.md > fond info`, texte info-700
    - "Termine" : fond `visual-vocabulary.md > fond succes`, texte success-700
  - **Prochaine tache** : bordure gauche 3px `visual-vocabulary.md > accent primaire` pour la guider visuellement
  - **Tache terminee** : opacity 0.6 sur l'ensemble de la card
  - **Tache annulee** : texte barre (line-through), badge "Annulee" fond `visual-vocabulary.md > fond erreur` texte error-700, opacity 0.5
- Chaque card : fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > coins card` (12px), `visual-vocabulary.md > ombre card`, padding 16px

**Layout** : Padding horizontal 16px, padding-top 12px, gap 12px entre cards. Scroll vertical. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap card → `→ /fiche-intervention/[id]` (push)
- Touch target : card entiere >= 44px height
- `visual-vocabulary.md > press feedback` : scale(0.97) 100ms
- `visual-vocabulary.md > flash realtime` sur nouvelle tache assignee ou changement de statut

---

## Zone 3 : Bottom Tab Bar (Staff)

**Contenu** :
- 2 tabs : `constraints.md > Bottom tab navigation`
  - Tab 1 : icone clipboard-list 24px + label "Planning" 12px — **ACTIF** (`visual-vocabulary.md > accent primaire`)
  - Tab 2 : icone user 24px + label "Profil" 12px — inactif (`visual-vocabulary.md > texte desactive`)

**Layout** : Fixed bottom, height 56px + env(safe-area-inset-bottom), `visual-vocabulary.md > ombre navigation bottom`. Fond `visual-vocabulary.md > surface card`.
**Interaction** :
- Tap Tab 2 → `→ Tab: Profil`
- Touch target par tab : 44x44px minimum

---

## Etats Speciaux

### Empty (aucune tache)
- Icone sun 48px `visual-vocabulary.md > icone empty state`, centre vertical
- Titre : `positioning.md > Empty States > Aucune tache (Staff)` ("Rien de prevu aujourd'hui. Bonne journee !")
  - 16px weight 500 `visual-vocabulary.md > texte principal`, centre
- Pas de CTA (le staff ne cree pas de taches)

### Loading
- Zone 1 : header reel (pas de skeleton)
- Zone 2 : `constraints.md > Skeleton screens > Planning Staff` — 3-4 cards tache skeleton empilees, pulse
- Skeleton pulse 1500ms

### Error
- Banniere sous le header : `positioning.md > Messages de feedback > Error (reseau)` ("Connexion perdue. Les donnees affichees datent de [heure].")
  - Fond `visual-vocabulary.md > fond erreur`, texte 14px error-700, icone wifi-off 20px
- Bouton "Reessayer"

### Offline
- `emotion-map.md > Offline` : banniere discrete sous le header
  - "Mode hors-ligne. Les donnees affichees datent de [heure]."
  - Fond `visual-vocabulary.md > fond alerte`, texte 14px warning-700, icone wifi-off 20px
  - Le planning reste consultable (cache local)

### Pull-to-Refresh
- `constraints.md > Pull-to-refresh` : seuil 60px
- Rafraichit les taches depuis Supabase

---

*Wireframe D03 | Planning Jour | 3 zones*
