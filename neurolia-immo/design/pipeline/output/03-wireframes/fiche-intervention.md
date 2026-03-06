# Fiche Intervention (Staff) - Wireframe

**Route** : /intervention/[id] (push depuis Planning Jour ou notification deep link)
**Objectif** : Executer une tache d'entretien : consulter la checklist, cocher les items, prendre les photos, et valider.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : `positioning.md > Messages par Ecran > Fiche Intervention` ("[Nom du bien] — [Type de tache]") — dynamique
  - 16px weight 600, `visual-vocabulary.md > texte principal`, centre
- Badge statut a droite : "A faire" / "En cours" / "Termine"

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre (troncature si long), badge a droite
**Interaction** :
- Tap back → pop (retour Planning)
- Touch target back : 44x44px

---

## Zone 2 : Lien Infos Bien

**Contenu** :
- `emotion-map.md > Fiche Intervention > element signature` (bouton "Infos du bien" en haut)
- Bouton lien : icone map-pin 20px `visual-vocabulary.md > accent primaire` + "Infos du bien" 14px weight 600 `visual-vocabulary.md > accent primaire` + chevron right 16px
- Fond `visual-vocabulary.md > surface card`, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > coins card` (12px), padding 12px 16px

**Layout** : Padding horizontal 16px, margin-top 12px
**Interaction** :
- Tap → `→ /infos-bien/[property_id]` (push)
- Touch target : 44px height minimum

---

## Zone 3 : Checklist

**Contenu** :
- `emotion-map.md > Fiche Intervention > element signature` (checklist lineaire)
- Items de checklist empiles :
  - Checkbox : 20px visuelle, zone tactile 44px (padding invisible), `constraints.md > Touch targets >= 44px`
    - Non coche : bordure 2px `visual-vocabulary.md > bordure visible`, fond transparent
    - Coche : fond `visual-vocabulary.md > accent primaire`, icone check 14px blanc
  - Texte item : 16px weight 400 `visual-vocabulary.md > texte courant`
    - Coche : texte `visual-vocabulary.md > texte desactive`, line-through
  - Items photo : icone camera 16px `visual-vocabulary.md > texte secondaire` a droite
    - Apres prise de photo : miniature 48x48px `visual-vocabulary.md > coins badge` (6px) a droite, remplace l'icone camera
- Compteur progression : "X / Y items" — 14px `visual-vocabulary.md > texte secondaire`, en haut de la zone

**Layout** : Padding horizontal 16px, gap 16px entre items (`visual-vocabulary.md > gap form fields`). Scroll vertical.
**Interaction** :
- Tap checkbox/item → coche/decoche l'item (animation `visual-vocabulary.md > transition standard` 200ms)
- Tap icone camera → `→ Modal Camera` (ouverture camera native)
- Tap miniature photo → preview plein ecran avec option supprimer
- Touch target : 44px height par item minimum
- `visual-vocabulary.md > espace touch minimum` (8px) entre items

### Variante : Checklist Accueil (check_in_greeting)

Si `task.type = check_in_greeting`, la checklist contient 5 items par defaut :
1. Accueillir le voyageur a l'heure prevue
2. Faire la visite guidee du logement
3. Remettre les cles / expliquer le digicode
4. Montrer les equipements (chauffage, WiFi, electromenager)
5. Donner le livret d'accueil (papier ou QR code)

> Si le proprietaire a personnalise la checklist `check_in_greeting` pour ce bien (via `property_checklists`), la checklist personnalisee remplace les items par defaut.

---

## Zone 4 : Action Secondaire (Signaler)

**Contenu** :
- Lien : `positioning.md > CTAs par Ecran > Fiche Intervention (Staff)` ("Signaler un probleme")
  - Icone alert-triangle 16px `visual-vocabulary.md > couleur alerte` + texte 14px weight 500 `visual-vocabulary.md > texte courant`

**Layout** : Padding horizontal 16px, margin-top 24px, margin-bottom 16px
**Interaction** :
- Tap → `→ /signaler-probleme/[property_id]` (push)
- Touch target : 44px height

---

## Zone 5 : CTA Principal (Sticky Bottom)

**Contenu** :
- Bouton principal depend du statut :
  - Statut "A faire" : `positioning.md > CTAs par Ecran > Fiche Intervention (Staff)` ("Commencer")
    - Fond `visual-vocabulary.md > accent primaire`, texte blanc
  - Statut "En cours" : `positioning.md > CTAs par Ecran > Fiche Intervention (Staff)` ("Terminer")
    - Fond `visual-vocabulary.md > accent primaire`, texte blanc
    - Active uniquement si tous les items requis sont coches
    - Desactive : opacity 0.5 + message "Completez la checklist pour terminer" 12px au-dessus du bouton
  - Statut "Termine" : bouton masque (tache finie, lecture seule)
- Pleine largeur, height 48px, `visual-vocabulary.md > coins bouton` (8px)
- Touch target : 48px >= 44px minimum

**Layout** : Fixed bottom, padding 16px, safe-area-bottom, fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > ombre bouton sticky`
**Interaction** :
- Tap "Commencer" → statut passe a "En cours", notifie proprietaire (Supabase Realtime), bouton change en "Terminer"
- Tap "Terminer" → modal confirmation "Terminer cette intervention ?" → valide → toast `positioning.md > Messages de feedback > Success (intervention terminee)` ("Intervention terminee a [heure].") → pop retour Planning, prochaine tache mise en avant

---

## Etats Speciaux

### Loading
- Header reel
- Zone 2 : skeleton bouton lien
- Zone 3 : `constraints.md > Skeleton screens > Fiche intervention` — 6 lignes skeleton avec checkbox + texte
- Zone 5 : bouton desactive (skeleton)

### Error
- Erreur sauvegarde checkbox : toast `positioning.md > Messages de feedback > Error (generique)`
- Erreur camera : toast "Impossible d'acceder a la camera."

### Offline
- `emotion-map.md > Offline` : banniere warning sous le header
- Checkboxes fonctionnent en local (cache), synchro au retour reseau
- Bouton "Terminer" desactive en offline (necessite synchro)

---

*Wireframe D03 | Fiche Intervention | 5 zones*
