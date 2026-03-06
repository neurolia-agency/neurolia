# User Flow : Sarah (Personnel d'entretien)

## Profil Rapide
- **Role** : Cleaning staff (personnel d'entretien)
- **Contexte** : Terrain (mobile uniquement, en deplacement entre biens)
- **Frequence** : Quotidienne (matin : planning, sur place : checklist)
- **Objectif principal** : Savoir ou aller, quand, et quoi faire — sans ambiguite

## Principe UX Directeur

> Sarah utilise l'app debout, pressée, entre deux logements. Chaque ecran doit fonctionner avec un pouce et en 2 secondes. Zero lecture, zero interpretation — uniquement des actions claires.

---

## Flow 1 : Onboarding (Invitation par le Proprietaire)

```
[Email/SMS d'invitation]
    "Marc vous invite sur
     Neurolia-Immo"
         │
         ▼
  [Lien → Page inscription]
   Prenom, telephone (optionnel)
         │
         ▼
  [Mot de passe / Magic link]
         │
         ▼
  [Ecran planning]
   "Voila vos taches pour
    aujourd'hui"
    (ou ecran vide si aucune
     tache prevue)
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Email/SMS | Recoit invitation, clique le lien | Ouvre page inscription pre-remplie (nom proprio deja affiche) | F01 |
| 2 | Inscription | Remplit prenom, cree mot de passe | Compte cree, rattache au proprietaire, redirect planning | F01, F09 |
| 3 | Planning | Voit ses taches (ou ecran vide) | Affiche planning du jour avec taches triees par heure | F07 |

### Decisions UX

- **Pas de choix a l'inscription** : Le lien pre-remplit tout. Sarah n'a qu'a entrer son prenom et un mot de passe.
- **Pas de tutorial** : L'interface est assez simple pour etre comprise sans guide. Le premier ecran montre le planning — c'est tout.
- **Onboarding en 2 taps** : Inscription → Planning. C'est fini.

### Points de Contact n8n

| Declencheur | Workflow n8n | Email envoye |
|-------------|-------------|--------------|
| Invitation creee par le proprio | Webhook → email/SMS invitation | **Rejoignez l'equipe de [Prenom proprio]** — Lien d'inscription + nom du proprietaire |

---

## Flow 2 : Routine Quotidienne (Le Matin)

```
[Notification push/email]        [Ouvre l'app]
  "3 taches aujourd'hui"               │
         │                              │
         └──────────┬───────────────────┘
                    ▼
           [Planning du jour]
            08:30 — Studio Plage
                    Menage depart
            11:00 — T2 Centre
                    Menage + draps
            14:00 — Loft Gare
                    Check arrivee
            16:00 — T2 Centre
                    Nettoyage vitres (ponctuel)
                    │
                    ▼ (tap premiere tache)
           [Fiche Intervention]
            Studio Plage — 08:30
            Menage depart
            ┌──────────────────────────┐
            │ [Infos du bien →]        │
            ├──────────────────────────┤
            │ ☐ Aspirateur salon       │
            │ ☐ Salle de bain         │
            │ ☐ Draps propres         │
            │ ☐ Poubelles sorties     │
            │ ☐ Photo salon           │
            │ ☐ Photo chambre         │
            ├──────────────────────────┤
            │ [Commencer]              │
            └──────────────────────────┘
                    │
                    │ (tap "Infos du bien")
                    ▼
           [Infos Bien]  ← ecran distinct
            📍 12 rue des Lilas (tap → GPS)
            🔑 Code : 4589B (gros, copiable)
            📶 WiFi : StudioPlage / mdp123
            Consignes : "Poubelle jaune mardi"
                    │
                    ▼ (retour)
           [Fiche Intervention]
            (checklist + photos + actions)
                    │
                    ▼
           [Validation]
            "Intervention terminee ✓"
            → Retour au planning
            → Prochaine tache mise en avant
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Planning | Ouvre l'app le matin | Affiche taches du jour, triees par heure, avec nom du bien et type | F07 |
| 2 | Planning | Tap sur la premiere tache | Ouvre Fiche Intervention (checklist, actions) | F07 |
| 3 | Fiche Intervention | Tap "Infos du bien" | Ouvre ecran Infos Bien (adresse, code acces, WiFi, consignes) | F02, F07 |
| 4 | Infos Bien | Tap adresse → navigation GPS, copie code | Ouvre Maps / copie dans presse-papier | F02 |
| 5 | Fiche Intervention | Tap "Commencer" | Passe le statut a "En cours", notifie le proprietaire | F07 |
| 6 | Fiche Intervention | Coche chaque item de la checklist | Items coches visuellement, progression affichee | F07 |
| 7 | Fiche Intervention | Prend les photos requises | Camera s'ouvre, photo sauvegardee, miniature visible | F07 |
| 8 | Fiche Intervention | Tap "Terminer" | Passe le statut a "Termine", notifie le proprietaire, retour planning | F07 |

### Decisions UX

- **Le planning EST la home** : Pas de dashboard, pas de stats. Sarah ouvre l'app, elle voit sa journee.
- **Fiche Intervention ≠ Infos Bien** : Deux ecrans distincts car deux contextes temporels differents. Le code d'acces sert DEVANT la porte (1 fois, 10 secondes). La checklist sert A L'INTERIEUR (30 min+). Melanger les deux pollue les deux usages.
- **Infos Bien accessible depuis la Fiche** : Un bouton "Infos du bien" en haut de la Fiche Intervention permet d'y acceder. L'info du lieu est a 1 tap, jamais perdue.
- **Code d'acces ultra-visible** : Dans Infos Bien, gros caracteres, possibilite de copier en un tap. Sarah est devant la porte.
- **Tap adresse = navigation** : Un tap sur l'adresse ouvre Google Maps/Waze/Plans avec l'itineraire.
- **Checklist lineaire** : Pas de sections, pas de niveaux. Items dans l'ordre logique d'execution.
- **Photos inline** : Pas de galerie separee. L'item "Photo salon" ouvre la camera directement.
- **Prochaine tache mise en avant** : Apres validation, le planning revient avec la tache suivante en surbrillance.
- **Taches ponctuelles (ad_hoc) dans le meme planning** : Les taches non-recurrentes (vitres, canapes, portes, electromenager...) apparaissent dans le meme planning que les menages lies aux reservations. Elles portent un badge "Ponctuel" au lieu de "Menage depart" / "Check arrivee". La coherence UX est maintenue : un seul planning, un seul flow d'execution.

### Points de Contact n8n

| Declencheur | Workflow n8n | Email envoye |
|-------------|-------------|--------------|
| Chaque matin (7h) | Cron → planning du jour | **Votre planning du jour** — [N] tache(s), premiere a [heure] a [adresse] |
| Tache demarree (statut "en cours") | Realtime Supabase → notif proprio | — (notification in-app proprio uniquement) |
| Tache terminee (statut "termine") | Realtime Supabase → notif proprio | — (notification in-app proprio uniquement) |

---

## Flow 2bis : Tache Ponctuelle (Non-Recurrente)

**Scenario** : Le proprietaire cree manuellement une tache `ad_hoc` (nettoyage vitres, canapes, portes, electromenager, etc.). Cette tache n'est pas liee a une reservation — elle apparait dans le planning de l'agent comme toute autre tache.

```
[Notification push]
  "Nouvelle tache : T2 Centre
   Nettoyage vitres, 16h"
         │
         ▼
  [Planning du jour]
   ...
   16:00 — T2 Centre
            Nettoyage vitres
            Badge "Ponctuel"
         │
         ▼ (tap tache)
  [Fiche Intervention]
   T2 Centre — 16:00
   Nettoyage vitres [Ponctuel]
   ┌──────────────────────────┐
   │ [Infos du bien →]        │
   ├──────────────────────────┤
   │ ☐ Nettoyer vitres salon  │
   │ ☐ Nettoyer vitres chambre│
   │ ☐ Photo apres            │
   ├──────────────────────────┤
   │ [Commencer]              │
   └──────────────────────────┘
         │
         ▼
  [Validation]
   "Intervention terminee ✓"
   → Retour au planning
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Notification | Recoit notification nouvelle tache ponctuelle | Push avec nom du bien, type de tache, heure, badge "Ponctuel" | F10 |
| 2 | Planning | Voit la tache dans son planning | Tache inseree chronologiquement, badge "Ponctuel" au lieu de "Menage depart" | F07 |
| 3 | Fiche Intervention | Tap sur la tache | Ouvre Fiche Intervention avec checklist specifique a la tache (pas celle du bien standard) | F07 |
| 4 | Fiche Intervention | Execute la checklist, prend photos | Meme flow que Flow 2 (Commencer → cocher → photos → Terminer) | F07 |
| 5 | Validation | Tap "Terminer" | Statut "Termine", notifie le proprietaire, retour planning | F07 |

### Decisions UX

- **Meme parcours, badge different** : Les taches ponctuelles suivent exactement le meme flow que les taches recurrentes (planning → fiche → checklist → valider). Seul le badge change : "Ponctuel" au lieu de "Menage depart" / "Check arrivee". Cela evite a Sarah d'apprendre un second flow.
- **Checklist specifique a la tache** : La checklist affichee est celle definie par le proprietaire pour cette tache ponctuelle, pas la checklist standard du bien (property_checklists). Le proprietaire definit les items au moment de la creation.
- **Pas de reservation associee** : Contrairement aux menages depart/arrivee, une tache ad_hoc n'est rattachee a aucune reservation. Le champ `reservation_id` est null dans le data model (A03).

---

## Flow 3 : Nouvelle Tache Assignee (En Cours de Journee)

```
[Notification push]
  "Nouvelle tache : T2 Centre
   Nettoyage vitres, 16h"
         │
         ▼
  [Tap notification]
         │
         ▼
  [Fiche Intervention]
   T2 Centre — 16:00
   Nettoyage vitres [Ponctuel]
   ┌──────────────────────────┐
   │ [Infos du bien →]        │
   ├──────────────────────────┤
   │ Checklist + actions       │
   └──────────────────────────┘
         │
         ▼
  [Accepter / Voir planning]
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Notification | Recoit notification nouvelle tache | Push avec nom du bien, type (menage ou ponctuel), heure | F10 |
| 2 | Notification | Tap | Ouvre directement la Fiche Intervention (checklist, actions) | F07 |
| 3 | Fiche Intervention | Tap "Infos du bien" | Ouvre ecran Infos Bien (adresse, code acces, consignes) | F02, F07 |
| 4 | Planning | Retour au planning | Nouvelle tache inseree chronologiquement | F07 |

---

## Flow 4 : Probleme sur Place

```
[Sur place — probleme constate]
  Fuite, casse, manque fournitures
         │
         ▼
  [Bouton "Signaler un probleme"]
   (present dans chaque Fiche Intervention)
         │
         ▼
  [Formulaire rapide]
   • Type : [Fuite / Casse / Manque / Autre]
   • Photo (optionnelle)
   • Note vocale ou texte libre
         │
         ▼
  [Envoye → confirmation]
   "Signalement envoye a [Prenom proprio]"
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Fiche Intervention | Tap "Signaler un probleme" | Ouvre formulaire rapide | F07 |
| 2 | Formulaire | Selectionne type, ajoute photo/texte | Valide, envoie | F07 |
| 3 | Confirmation | Voit confirmation | Notification envoyee au proprietaire | F10 |

### Points de Contact n8n

| Declencheur | Workflow n8n | Email envoye |
|-------------|-------------|--------------|
| Signalement cree | Webhook → notification proprietaire | **Signalement — [Bien]** — [Type de probleme], photo jointe. |

---

## Cas Limites

### Pas de Tache Aujourd'hui
```
[Planning] → [Ecran vide apaisant]
              "Rien de prevu aujourd'hui.
               Bonne journee !"
```

### Erreur Reseau (Terrain avec Mauvaise Connexion)
```
[Checklist en cours] → [Perte reseau]
                            │
                            ▼
                     [Banniere discrete]
                      "Mode hors-ligne.
                       Vos changements seront
                       envoyes au retour du reseau."
                            │
                            ▼
                     [Continue a cocher normalement]
                      Synchro auto quand reseau revient
```
> Note : Le mode offline complet est Phase 2, mais les checklists en cours de completion doivent supporter une deconnexion temporaire (cache local minimal).

### Code d'Acces qui Ne Fonctionne Pas
```
[Devant la porte] → [Code ne marche pas]
                          │
                          ▼
                   [Bouton "Appeler [Prenom proprio]"]
                    (raccourci telephone direct
                     depuis Infos Bien)
```

### Tache Annulee en Cours de Route
```
[Notification]
  "Tache annulee : Studio Plage
   Reservation annulee par le voyageur"
         │
         ▼
  [Planning mis a jour]
   Tache barree avec mention "Annulee"
   Prochaine tache mise en avant
```

---

## Principes UX Emails/Notifications (Staff)

> Le personnel d'entretien recoit un minimum d'emails. Les notifications push sont privilegiees.

| Principe | Application |
|----------|-------------|
| **Push > Email** | Les alertes urgentes (nouvelle tache, annulation) sont en push. L'email est reserve au planning du matin. |
| **1 email par jour max** | Le digest du matin resume tout. Pas d'emails multiples en journee. |
| **Langage simple** | Pas de jargon ("checkout", "check-in"). Utiliser "depart", "arrivee", "menage". |
| **Infos actionables** | Chaque notification contient : quoi + ou + quand. Jamais de notification sans contexte. |
| **Gros boutons** | Les emails sont lus sur mobile, entre deux logements. Les CTA doivent etre facilement tapables (44px min). |

---

*Neurolia-Immo v2.1 — User Flow Personnel d'entretien*
