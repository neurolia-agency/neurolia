# Fiche Agent (Owner) - Wireframe

**Route** : /staff/[id] (push depuis Liste Staff)
**Objectif** : Consulter le planning, les statistiques et les taches en cours d'un agent.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : `positioning.md > Messages par Ecran > Fiche Agent` ("[Prenom de l'agent]") — dynamique
  - 16px weight 600, `visual-vocabulary.md > texte principal`, centre

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre
**Interaction** :
- Tap back → pop
- Touch target back : 44x44px

---

## Zone 2 : Profil Agent

**Contenu** :
- Avatar : 64px cercle, initiales ou photo, `visual-vocabulary.md > coins avatar` (50%)
- Prenom + Nom : `visual-vocabulary.md > titre card` (clamp 18-22px weight 600)
- Telephone : 14px `visual-vocabulary.md > texte secondaire` (format `tone.md > Formatage des Donnees > Telephone`)
- Date d'inscription : "Membre depuis [mois annee]" 14px `visual-vocabulary.md > texte secondaire`

**Layout** : Padding horizontal 16px, padding-top 16px, centre horizontal pour avatar, gap 8px entre avatar et nom, gap 4px entre nom et details
**Interaction** :
- Tap telephone → appel direct (tel: link)
- Touch target telephone : 44px height

---

## Zone 3 : Statistiques

**Contenu** :
- 3 mini-KPIs en ligne :
  - "Interventions ce mois" : valeur `visual-vocabulary.md > valeur KPI` (taille reduite 20px) + label `visual-vocabulary.md > label KPI`
  - "Taux de completion" : valeur en % + label
  - "Note moyenne" (futur, placeholder) : valeur + label
- Cards compactes : fond `visual-vocabulary.md > surface card`, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > coins card` (12px), padding 12px

**Layout** : Padding horizontal 16px, gap 24px apres Zone 2, grille 3 colonnes, gap 8px entre cards
**Interaction** : Aucune

---

## Zone 4 : Planning Semaine

**Contenu** :
- Titre section : "Planning cette semaine" — `visual-vocabulary.md > titre section`
- Liste chronologique des taches assignees :
  - Jour : `visual-vocabulary.md > en-tete section` (12px uppercase, ex: "LUN. 17 FEV.")
  - Taches du jour :
    - Heure 14px tabular-nums + nom du bien 16px weight 500 + type tache 14px `visual-vocabulary.md > texte secondaire`
    - Badge statut (A faire / En cours / Termine)
  - `visual-vocabulary.md > separateur liste` entre items du meme jour
  - `visual-vocabulary.md > divider section` entre jours

**Layout** : Padding horizontal 16px, gap 24px apres Zone 3, gap 12px entre items. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** : Aucune (vue de supervision owner, pas d'action)

---

## Etats Speciaux

### Loading
- Header reel
- Zone 2 : skeleton avatar (cercle 64px) + 2 lignes texte
- Zone 3 : 3 rectangles skeleton
- Zone 4 : 4-5 lignes skeleton

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Fiche Agent | 4 zones*
