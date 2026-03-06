# Notifications - Wireframe

**Route** : /notifications (push depuis Dashboard header bell icon)
**Objectif** : Afficher la liste chronologique des notifications avec navigation vers l'ecran concerne.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : "Notifications" — 16px weight 600, `visual-vocabulary.md > texte principal`, centre
- Bouton "Tout lire" : texte 14px weight 500 `visual-vocabulary.md > accent primaire` a droite (visible si notifications non lues)

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre, bouton a droite
**Interaction** :
- Tap back → pop
- Tap "Tout lire" → marque toutes comme lues (dots disparaissent, animation `visual-vocabulary.md > transition standard`)
- Touch targets : 44x44px chacun

---

## Zone 2 : Liste Notifications

**Contenu** :
- `emotion-map.md > Notifications > element signature`
- Groupees par jour : "Aujourd'hui", "Hier", "Lundi 17 fevrier" — `visual-vocabulary.md > en-tete section` (12px uppercase)
- Chaque notification :
  - Dot non-lu : 8px `visual-vocabulary.md > accent primaire` a gauche (si non lue)
  - Icone semantique 20px a gauche :
    - Reservation : icone calendar, `visual-vocabulary.md > couleur info`
    - Anomalie : icone shield-alert, `visual-vocabulary.md > couleur alerte`
    - Intervention terminee : icone check-circle, `visual-vocabulary.md > couleur succes`
    - Erreur synchro : icone alert-triangle, `visual-vocabulary.md > couleur erreur`
  - Titre : 14px weight 600 `visual-vocabulary.md > texte principal` (ex: `positioning.md > Notifications Push > Nouvelle reservation`)
  - Description courte : 14px weight 400 `visual-vocabulary.md > texte secondaire`, 1 ligne troncature
  - Timestamp : `visual-vocabulary.md > metadata` (12px, `visual-vocabulary.md > texte desactive`) a droite
- `visual-vocabulary.md > separateur liste` entre items dans un meme groupe

**Layout** : Scroll vertical. Padding horizontal 16px, gap 8px entre en-tete groupe et premier item, gap 24px entre groupes. Chaque item : padding vertical 12px, padding-left 8px (dot) + 32px (icone) + 8px (gap). Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap notification → `→ ecran concerne` (deep link) :
  - Reservation → `→ /detail-reservation/[id]`
  - Anomalie → `→ /detail-anomalie/[id]`
  - Intervention → `→ /suivi-menages`
  - Erreur synchro → `→ /parametres`
- Marque automatiquement comme lue au tap (dot disparait)
- Touch target : item entier >= 44px height

---

## Etats Speciaux

### Empty
- Icone bell-off 48px `visual-vocabulary.md > icone empty state`, centre vertical
- Titre : "Aucune notification." — 16px weight 500 `visual-vocabulary.md > texte principal`
- Pas de CTA

### Loading
- Header reel
- 5-6 lignes skeleton (icone cercle 20px + rectangle texte), pulse

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`

### Pull-to-Refresh
- `constraints.md > Pull-to-refresh` : seuil 60px

---

*Wireframe D03 | Notifications | 2 zones*
