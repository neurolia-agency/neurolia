# Suivi Menages (Owner) - Wireframe

**Route** : /suivi-menages (push depuis Dashboard ou Calendrier Detail Jour)
**Objectif** : Voir l'avancement de toutes les taches d'entretien du jour, groupees par bien.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : "Suivi menages" — 16px weight 600, `visual-vocabulary.md > texte principal`, centre
- Sous-titre : date du jour (format `tone.md > Formatage des Donnees > Date`, ex: "20 fevrier")
  - 14px weight 400, `visual-vocabulary.md > texte secondaire`

**Layout** : Header sticky 56px + safe-area-top, bouton back a gauche (padding-left 16px), titre centre
**Interaction** :
- Tap back → pop (retour Dashboard ou Calendrier)
- Touch target back : 44x44px

---

## Zone 2 : Resume Global

**Contenu** :
- Barre de resume horizontale :
  - "X terminee(s)" badge fond `visual-vocabulary.md > fond succes`, texte 12px weight 600 `visual-vocabulary.md > couleur succes`
  - "X en cours" badge fond `visual-vocabulary.md > fond info`, texte 12px weight 600 `visual-vocabulary.md > couleur info`
  - "X a faire" badge fond `visual-vocabulary.md > fond alerte`, texte 12px weight 600 `visual-vocabulary.md > couleur alerte`

**Layout** : Padding horizontal 16px, padding-top 12px, gap 8px entre badges, scroll horizontal si necessaire (indicateur `constraints.md > Indicateurs de scroll`)
**Interaction** : Aucune (lecture seule)

---

## Zone 3 : Liste Taches par Bien

**Contenu** :
- Groupees par bien :
  - En-tete bien : nom du bien (`visual-vocabulary.md > titre card`, clamp 18-22px weight 600)
  - Sous-items par tache :
    - Heure : 14px tabular-nums, `visual-vocabulary.md > texte secondaire`
    - Type : "Menage depart" / "Check arrivee" / badge "Ponctuel" / badge "Accueil" (14px weight 500)
    - Les taches de type `check_in_greeting` apparaissent avec le badge "Accueil" (fond secondary-100, texte secondary-700) et sont incluses dans le suivi global
    - Agent : prenom de l'agent, 14px `visual-vocabulary.md > texte secondaire`
    - Badge statut en haut a droite :
      - "A faire" : fond `visual-vocabulary.md > fond alerte`, texte `visual-vocabulary.md > couleur alerte` — `visual-vocabulary.md > badge texte`
      - "En cours" : fond `visual-vocabulary.md > fond info`, texte `visual-vocabulary.md > couleur info`
      - "Termine" : fond `visual-vocabulary.md > fond succes`, texte `visual-vocabulary.md > couleur succes`
    - Card : fond `visual-vocabulary.md > surface card`, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > coins card` (12px)
- Separateur entre groupes de biens : `visual-vocabulary.md > divider section`

**Layout** : Padding horizontal 16px, gap 12px entre cards dans un groupe, gap 24px entre groupes de biens. Scroll vertical. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Aucune interaction sur les items (monitoring, pas d'action owner)
- `visual-vocabulary.md > flash realtime` : fond primary-50 pendant 500ms quand un statut change en temps reel (Supabase Realtime)

---

## Etats Speciaux

### Empty
- Icone sun 48px `visual-vocabulary.md > icone empty state`, centre
- Titre : "Aucun menage prevu aujourd'hui."
  - 16px weight 500, `visual-vocabulary.md > texte principal`, centre
- Pas de CTA (le proprietaire ne cree pas de taches manuellement ici)

### Loading
- Header reel (pas de skeleton)
- Zone 2 : 3 rectangles skeleton (badges), pulse
- Zone 3 : 3-4 card skeletons empilees, pulse
- `constraints.md > Skeleton screens`

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`
- Bouton "Reessayer" dans le toast

### Pull-to-Refresh
- `constraints.md > Pull-to-refresh` : seuil 60px
- Rafraichit la liste des taches et leurs statuts

---

*Wireframe D03 | Suivi Menages | 3 zones*
