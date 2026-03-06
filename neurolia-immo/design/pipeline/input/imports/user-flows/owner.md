# User Flow : Marc (Proprietaire)

## Profil Rapide
- **Role** : Owner (proprietaire / gestionnaire)
- **Contexte** : Bureau (desktop) + deplacement (mobile)
- **Frequence** : Quotidienne (consultations) + hebdomadaire (gestion)
- **Objectif principal** : Voir en un coup d'oeil si tout va bien — reservations, equipe, revenus

## Principe UX Directeur

> Chaque ecran repond a UNE question. Le proprietaire ne devrait jamais chercher l'information — elle vient a lui, hierarchisee par urgence.

---

## Flow 1 : Onboarding (Premiere utilisation)

```
[Splash] → [Page d'inscription]
                  │
          ┌───────┴───────┐
          ▼               ▼
   [Magic Link]     [OAuth Google]
          │               │
          └───────┬───────┘
                  ▼
          [Verification email]
                  │
                  ▼
          [Premier bien]
           Adresse, nom du bien,
           URLs iCal, config IMAP
                  │
                  ▼
          [Premiere synchro]
           "Nous importons vos
            reservations..."
                  │
                  ▼
          [Dashboard avec donnees]
           "Voila vos X reservations
            a venir"
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Splash | Ouvre l'app | Check session, branding Neurolia-Immo | — |
| 2 | Inscription | Choisit magic link ou Google | Envoie lien par email / redirige OAuth | F01 |
| 3 | Verification | Clique lien dans email | Cree compte, connecte, redirige | F01 |
| 4 | Premier bien | Remplit nom, adresse, URLs iCal | Valide les URLs, sauvegarde le bien | F02 |
| 5 | Config IMAP (optionnel) | Fournit identifiants email | Teste la connexion, confirme | F04 |
| 6 | Premiere synchro | Attend | Fetch iCal, parse emails, affiche loader anime | F03, F04 |
| 7 | Dashboard | Voit ses reservations | Affiche dashboard peuple avec donnees reelles | F06 |

### Decisions UX

- **Pas de tutorial/walkthrough** : Le proprietaire voit ses vraies donnees des l'etape 7. Les donnees reelles SONT le tutorial.
- **1 seul bien a l'onboarding** : On ne demande pas tout d'un coup. Les autres biens se rajoutent apres.
- **Config IMAP optionnelle** : iCal fonctionne seul. L'email parsing est propose comme enrichissement ("Voulez-vous des donnees plus detaillees ?").
- **Premiere synchro visible** : Pas de "revenez plus tard". On attend 10-30s avec un loader significatif, puis on montre les resultats.

### Points de Contact n8n

| Declencheur | Workflow n8n | Email envoye |
|-------------|-------------|--------------|
| Inscription validee | Webhook → email bienvenue | **Bienvenue sur Neurolia-Immo** — resume des prochaines etapes |
| Premier bien cree | Webhook → premiere synchro iCal | — (synchro silencieuse) |
| Config IMAP ajoutee | Webhook → premier parsing email | — (parsing silencieux) |
| Premiere synchro terminee | Webhook → email recapitulatif | **Vos reservations sont importees** — X reservations trouvees, prochaine arrivee le [date] |

---

## Flow 2 : Consultation Quotidienne (Routine matin)

```
[Notification push/email]     [Ouvre l'app directement]
         │                              │
         └──────────┬───────────────────┘
                    ▼
            [Dashboard Accueil]
             ┌─────────────────────────────┐
             │ ALERTES (si anomalies)      │
             │  ⚠ Double-resa Studio Plage │
             ├─────────────────────────────┤
             │ AUJOURD'HUI                 │
             │  Arrivees : 1 (Jean D., T2) │
             │  Departs  : 1 (Marie L.)   │
             │  [Suivi menages →]          │
             ├─────────────────────────────┤
             │ CETTE SEMAINE               │
             │  5 reservations, 3 menages  │
             │  KPIs : 78% occupation      │
             └─────────────────────────────┘
                    │
         ┌──────────┼──────────┐
         ▼          ▼          ▼
  [Detail resa]  [Calendrier]  [Gestion]
   Tap arrivee    Vue mois     Biens, equipe,
   du jour        multi-biens  parametres
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Dashboard | Ouvre l'app | Affiche 3 blocs : Alertes (si existantes), Aujourd'hui (arrivees, departs, bouton suivi menages), Cette semaine (apercu + KPIs) | F06 |
| 2 | Dashboard | Lit le bloc Alertes | Anomalies en rouge/orange visibles en premier, tap pour detail | F06 |
| 3 | Dashboard | Lit le bloc Aujourd'hui | Arrivees, departs et bouton "Suivi menages →" | F06 |
| 4 | Suivi Menages | Tap "Suivi menages →" | Vue liste des taches du jour par bien + agent + statut (a faire / en cours / termine) | F06, F07 |
| 5 | Detail reservation | Tap sur une reservation | Affiche fiche complete : voyageur, dates, montant, source, statut menage associe | F06 |
| 6 | Calendrier | Tap onglet calendrier | Vue mois avec occupation par bien (couleurs par plateforme) | F06 |
| 7 | Calendrier Detail Jour | Tap sur un jour | Reservations du jour + taches menage avec statut | F06, F07 |

### Decisions UX

- **Le dashboard repond a "Est-ce que tout va bien ?"** : Si oui, lecture en 5 secondes. Si non, l'anomalie est visible immediatement.
- **3 blocs hierarchises** : Alertes (urgent, en haut) > Aujourd'hui (actionable) > Cette semaine (contexte). L'oeil descend naturellement du plus urgent au moins urgent.
- **Suivi menage accessible, pas agrege** : Le statut menage global (X/Y) est ambigu quand plusieurs biens ont des menages le meme jour. Le suivi est accessible via : (1) un bouton "Suivi menages →" dans le bloc Aujourd'hui → vue detaillee par bien, (2) le detail d'une reservation → statut menage associe, (3) le calendrier → tap jour → taches du jour avec statut.
- **KPIs integres au Dashboard** : Taux d'occupation et revenus sont dans le bloc "Cette semaine" — pas un ecran separe. Un swipe ou une section en bas suffit.
- **Pas de scroll infini** : Le resume du jour tient sur 1 ecran. Les details sont accessibles en tap.

### Points de Contact n8n

| Declencheur | Workflow n8n | Email envoye |
|-------------|-------------|--------------|
| Chaque matin (8h) | Cron → digest quotidien | **Votre journee** — arrivees/departs du jour, taches planifiees, anomalies |
| Nouvelle reservation detectee | iCal sync ou email parsing | **Nouvelle reservation** — [Voyageur], [Bien], [Dates], [Montant si disponible] |
| Annulation detectee | iCal sync ou email parsing | **Annulation** — [Voyageur], [Bien], [Dates] — tache menage annulee automatiquement |

---

## Flow 3 : Gestion des Proprietes

```
[Gestion] → [Mes Biens]
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
     [Bien 1]   [Bien 2]   [+ Ajouter]
          │
          ▼
     [Fiche Bien]
      ┌─── Etat Operationnel ─────────┐
      │ Statut : Occupe / Libre /     │
      │          Menage en cours       │
      │ Reservation en cours :        │
      │   Jean D., 12-15 mars         │
      │ Derniere intervention :       │
      │   Hier, Sarah, termine ✓      │
      └───────────────────────────────┘
      ┌─── Configuration ────────────┐
      │ ○ Modifier les infos         │
      │ ○ Gerer la checklist         │
      │ ○ Livret d'accueil (QR)     │
      │ ○ Historique interventions   │
      └──────────────────────────────┘
          │
     ┌────┼────┬─────────┐
     ▼    ▼    ▼         ▼
  [Edit] [Checklist] [Livret] [Historique]
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Mes Biens | Voit la liste de ses biens | Liste avec statut (occupe/libre/menage en cours) et prochaine reservation | F02 |
| 2 | Fiche Bien (zone haute) | Lit l'etat operationnel | Statut actuel, reservation en cours ou prochaine, derniere intervention (date, agent, statut) | F02 |
| 3 | Fiche Bien (zone basse) | Tap "Modifier" | Formulaire pre-rempli (adresse, code, WiFi, URLs iCal) | F02 |
| 4 | Fiche Bien (zone basse) | Tap "Checklist" | Gestion des items de la checklist d'entretien pour ce bien | F02 |
| 5 | Fiche Bien (zone basse) | Tap "Livret d'accueil" | Preview du livret + QR code partageable | F11 |
| 6 | Mes Biens | Tap "+" | Meme flow que l'onboarding etape 4 (nom, adresse, iCal) | F02 |

### Decisions UX

- **Zone haute = etat operationnel** : La question du moment c'est "mon bien, il va bien ?" (occupation, prochain depart, menage fait). Cette info est visible sans aucun tap.
- **Zone basse = configuration** : Modifier la checklist, editer les infos, gerer le livret — ce sont des actions rares. Elles sont accessibles mais ne polluent pas la vue principale.
- **Separation lecture / ecriture** : En haut on regarde (pas de bouton d'action), en bas on agit (liens vers les formulaires). Deux modes mentaux distincts.

---

## Flow 4 : Gestion de l'Equipe

```
[Gestion] → [Mon Equipe]
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
     [Agent 1]  [Agent 2]  [+ Inviter]
          │                     │
          ▼                     ▼
     [Fiche Agent]         [Invitation]
      Stats, planning,      Email/lien
      taches en cours        d'invitation
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Mon Equipe | Voit la liste de son staff | Liste avec statut (disponible, en mission, off) | F09 |
| 2 | Fiche agent | Tap sur un agent | Planning semaine, taches en cours, historique | F08 |
| 3 | Inviter | Tap "Inviter" | Genere lien d'invitation ou envoie email | F01, F09 |

### Points de Contact n8n

| Declencheur | Workflow n8n | Email envoye |
|-------------|-------------|--------------|
| Invitation envoyee | Webhook → email invitation | **Vous etes invite sur Neurolia-Immo** — [Proprietaire] vous invite a rejoindre son equipe. Lien d'inscription. |

---

## Flow 5 : Gestion des Anomalies

```
[Notification "Anomalie detectee"]
              │
              ▼
      [Dashboard — Alerte orange/rouge]
       "Double-reservation detectee
        Studio Plage, 15-17 mars"
              │
              ▼
      [Detail anomalie]
       Source 1 : iCal Airbnb (Jean D.)
       Source 2 : iCal Booking (Pierre M.)
       Dates en conflit
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
   [Ignorer] [Marquer  [Ouvrir
    (faux     resolue]  Airbnb/
    positif)]           Booking]
```

### Etapes Detaillees

| # | Ecran | Action Utilisateur | Reponse Systeme | Feature |
|---|-------|-------------------|-----------------|---------|
| 1 | Notification | Recoit alerte | Push/email avec resume anomalie | F10 |
| 2 | Dashboard | Voit alerte en haut | Badge rouge avec description courte | F06 |
| 3 | Detail anomalie | Tap sur l'alerte | Affiche les 2 sources en conflit, dates, voyageurs | F05 |
| 4 | Resolution | Choisit action | Marque comme resolue / faux positif / lien externe | F06 |

### Points de Contact n8n

| Declencheur | Workflow n8n | Email envoye |
|-------------|-------------|--------------|
| Conflit detecte (reconciliation) | Reconciliation → alerte | **Attention : conflit de reservation** — [Bien], [Dates], [Sources en conflit]. Action requise. |
| Synchro iCal echouee | Health check → alerte | **Probleme de synchronisation** — Le flux iCal de [Bien] ne repond plus. Verifiez l'URL dans vos parametres. |

---

## Decisions UX Transversales

### Navigation : 3 tabs au lieu de 4

Le proprietaire utilisait Dashboard et Calendrier quotidiennement, mais Proprietes et Equipe occasionnellement. 4 tabs donnaient le meme poids visuel aux 4, ce qui ne reflete pas la realite d'usage.

**Nouvelle structure :**
```
Tab 1 : Accueil     → Dashboard du jour + KPIs rapides (usage quotidien)
Tab 2 : Calendrier  → Vue mois/semaine multi-biens (usage quotidien)
Tab 3 : Gestion     → Mes biens + Mon equipe + Parametres (usage occasionnel)
```

**Avantages :**
- Les 2 premiers tabs couvrent 90% de l'usage quotidien
- "Gestion" regroupe la configuration (proprietes, equipe, compte) en un seul endroit
- Navigation plus epuree, proche de l'inspiration Linear/Notion

### Suivi menage accessible, pas agrege

Le statut menage global (X/Y termines) est ambigu quand plusieurs biens ont des menages le meme jour — impossible de savoir lequel est termine sans drill-down. Plutot qu'un score agrege dans le Dashboard, le suivi menage est accessible via trois chemins :

1. **Bouton "Suivi menages →" dans le bloc Aujourd'hui** : Ouvre une vue detaillee listant toutes les taches du jour par bien + agent + statut (a faire / en cours / termine).
2. **Detail d'une reservation** : Le statut menage associe a cette reservation est visible directement dans la fiche.
3. **Calendrier → tap jour** : Le Detail Jour affiche les reservations ET les taches menage du jour avec leur statut.

Le proprietaire accede toujours a l'info menage en 1 tap, mais sans ambiguite multi-biens.

---

## Cas Limites

### Erreur Reseau
```
[Action quelconque] → [Erreur reseau]
                            │
                            ▼
                     [Toast discret en bas]
                      "Connexion perdue.
                       Les donnees affichees
                       datent de [heure]."
                            │
                            ▼
                     [Retry auto en arriere-plan]
                      Quand reseau revient →
                      refresh silencieux
```

### Session Expiree
```
[Action protegee] → [Token expire]
                          │
                          ▼
                   [Refresh token silencieux]
                          │
                   ┌──────┴──────┐
                   ▼             ▼
            [Refresh OK]   [Refresh echoue]
             Action          Redirect Login
             continue        avec message
             (invisible)     "Session expiree"
```

### Zero Data (Nouveau Compte)
```
[Dashboard vide] → [Etat vide engageant]
                    "Ajoutez votre premier bien
                     pour commencer"
                     [Bouton : Ajouter un bien]
```

### iCal URL Invalide
```
[Ajout bien] → [URL iCal] → [Test URL]
                                  │
                           ┌──────┴──────┐
                           ▼             ▼
                     [URL valide]   [URL invalide]
                      Check vert     Message inline :
                                     "Cette URL ne semble
                                      pas etre un flux iCal.
                                      Voici comment la trouver
                                      sur Airbnb/Booking."
                                      [Lien aide]
```

---

## Principes UX Emails de Notification (Proprietaire)

> Les emails sont conçus pour etre lus en **5 secondes sur mobile**.

| Principe | Application |
|----------|-------------|
| **1 email = 1 info** | Jamais 2 sujets dans le meme email |
| **Sujet = l'essentiel** | "Nouvelle reservation — Studio Plage, 15-17 mars" (lisible sans ouvrir) |
| **Corps = hierarchie** | Ligne 1 : quoi. Ligne 2 : ou/quand. Ligne 3 : action si necessaire. |
| **CTA unique** | Un seul bouton "Voir dans Neurolia-Immo" — pas de choix |
| **Pas de bruit** | Les synchros reussies sont silencieuses. Seules les nouvelles infos et anomalies declenchent un email. |
| **Digest > rafale** | Si 3 reservations arrivent en 5 min, un seul email recapitulatif plutot que 3 emails. |

---

*Neurolia-Immo v2.1 — User Flow Proprietaire*
