# Carte des Emotions - Neurolia-Immo

> D02-Art Direction | Phase D-A : Emotion cible par ecran
> Sources : 01-brand/00-platform.md (archetypes), 01-brand/personas.md, user-flows/, navigation-map.md

---

## Principe

Chaque ecran vise une **emotion primaire** et gere une **tension** entre deux besoins opposes. L'element signature est le detail visuel qui incarne l'emotion sur cet ecran. Les decisions de design (D03 wireframes, D06 code) valident chaque ecran contre cette carte.

Archetypes directeurs :
- **Souverain** (dominant) : controle, ordre, maitrise, previsibilite
- **Soignant** (secondaire) : service, protection, bienveillance, accompagnement

---

## Ecrans d'Entree

### Splash Screen

- **Emotion primaire** : Confiance + Anticipation
- **Tension** : Rapidite vs Impression durable
- **Resolution** : Affichage < 2 secondes. Le splash n'est pas un ecran marketing — c'est un signal de fiabilite. Si l'app charge en 1 seconde, le splash dure 1 seconde.
- **Element signature** : Logo "NI" (initiales dans un carre arrondi) centre sur fond surface-page oklch(0.985 0.002 260). Animation subtile : fade-in du logo 300ms ease-out. Pas d'animation longue, pas de loader.
- **Couleur dominante** : Neutre (surface-page) + accent primary-500 sur le logo
- **Archetype actif** : Souverain (l'app demarre vite, pas de temps perdu)

### Onboarding (Owner — 3 etapes)

- **Emotion primaire** : Facilite + Enthousiasme mesure
- **Tension** : Montrer la valeur vs Ne pas submerger
- **Resolution** : 3 etapes maximum (inscription → premier bien → premiere synchro). Pas de tutorial. Les donnees reelles du proprietaire SONT le tutorial.
- **Element signature** : Indicateur de progression (3 dots en bas, le dot actif en primary-500 oklch(0.580 0.115 250), les dots inactifs en neutral-300). Chaque etape a un titre court (H1) + une description d'une ligne (Body). Bouton CTA pleine largeur en bas.
- **Couleur dominante** : Neutre avec accent primaire sur le CTA
- **Archetype actif** : Soignant (accompagne sans forcer, propose l'IMAP comme enrichissement optionnel)

### Login

- **Emotion primaire** : Securite + Rapidite
- **Tension** : Rapidite d'acces vs Confiance dans la securite
- **Resolution** : Magic link en premier (1 champ email + 1 bouton). OAuth Google en secondaire. Pas de mot de passe a retenir. L'ecran est minimaliste : logo + tagline + formulaire + CTA.
- **Element signature** : Logo "Neurolia-Immo" + tagline "Vos locations, zero oubli." au-dessus du formulaire. Fond surface-page. Le bouton "Recevoir le lien de connexion" est primary, pleine largeur, 44px. Le bouton "Continuer avec Google" est secondary, en dessous.
- **Couleur dominante** : Neutre, un seul accent primaire (le CTA)
- **Archetype actif** : Souverain (acces rapide, pas de friction) + Soignant (magic link = pas de mot de passe oublie)

---

## Ecrans Principaux — Owner

### Dashboard Accueil (Tab 1)

- **Emotion primaire** : Controle + Serenite
- **Tension** : Information complete vs Surcharge cognitive
- **Resolution** : 3 blocs hierarchises par urgence (Alertes > Aujourd'hui > Cette semaine). Si aucune alerte, le bloc Alertes disparait — la premiere chose visible est "Aujourd'hui" avec un message rassurant. L'ecran se lit en 5 secondes quand tout va bien.
- **Element signature** : Salutation sobre en haut ("Bonjour [prenom]."), pas de tagline repetee. Le bloc Alertes (quand present) a un fond warning-50 ou error-50 avec une icone alert-triangle ou shield-alert. Le bloc Aujourd'hui affiche arrivees et departs avec le nom du voyageur et le nom du bien. Le bouton "Suivi menages →" est un lien discret (primary-600) sous le bloc Aujourd'hui.
- **Couleur dominante** : Neutre (95%). Couleurs semantiques sur les alertes et les badges de statut uniquement.
- **Archetype actif** : Souverain (tour de controle, hierarchie claire, tout est visible)

### Calendrier Vue Mois (Tab 2)

- **Emotion primaire** : Vision globale + Anticipation
- **Tension** : Densite d'information vs Lisibilite
- **Resolution** : Grille 7 colonnes (desktop) ou vue liste chronologique (mobile). Les barres colorees par plateforme (Airbnb rose, Booking bleu) permettent de scanner visuellement le mois. Le jour actuel est marque par un cercle primary-500.
- **Element signature** : Barres de reservation colorees par plateforme (airbnb-100 fond + airbnb-500 bordure gauche 3px, booking-100 fond + booking-500 bordure gauche 3px). Navigation mois : fleches + label "Fevrier 2026" + bouton "Aujourd'hui". Sur mobile : en-tetes de jour sticky + cards de reservation sous chaque jour.
- **Couleur dominante** : Neutre (fond grille) + couleurs plateformes sur les barres (apport de vivacite)
- **Archetype actif** : Souverain (vue panoramique, maitrise du planning)

### Hub Gestion (Tab 3)

- **Emotion primaire** : Organisation + Maitrise
- **Tension** : Acces rapide vs Completude des options
- **Resolution** : 3 liens clairs : "Mes biens", "Mon equipe", "Parametres". Chaque lien est une card avec icone (Home, Users, Settings) + label + chevron. Pas de texte descriptif superflu. Le hub est un point de depart, pas une destination.
- **Element signature** : 3 cards empilees, chacune avec icone 24px (neutral-700) + titre 16px semibold + chevron 16px (neutral-400) a droite. Bordure 1px solid neutral-200. Le hub est l'ecran le plus simple de l'app.
- **Couleur dominante** : Neutre total. Pas de couleur vive.
- **Archetype actif** : Souverain (tout est range, organise, accessible)

### Fiche Bien

- **Emotion primaire** : Connaissance complete + Confiance operationnelle
- **Tension** : Information dense vs Separation lecture/ecriture
- **Resolution** : Zone haute = etat operationnel (lecture seule : statut occupe/libre, reservation en cours, derniere intervention). Zone basse = configuration (liens : Modifier, Checklist, Livret, Historique). Le proprietaire lit en haut, agit en bas.
- **Element signature** : Badge de statut du bien en haut (occupe = info-100/info-700, libre = success-100/success-700, menage en cours = warning-100/warning-700). Lien reservation en cours (nom voyageur + dates). Derniere intervention (agent + date + badge statut). En bas : 4 liens card avec icone + chevron.
- **Couleur dominante** : Neutre avec badges semantiques pour le statut
- **Archetype actif** : Souverain (tout savoir sur un bien en un coup d'oeil) + Soignant (dernier menage visible = confiance dans l'equipe)

---

## Ecrans Principaux — Staff

### Planning Jour (Tab 1)

- **Emotion primaire** : Clarte + Determination
- **Tension** : Completude de l'information vs Simplicite immediate
- **Resolution** : Liste chronologique verticale. Chaque tache = 1 card avec heure (14px tabular-nums), nom du bien (16px semibold), type de tache (14px medium) + badge statut. La premiere tache est visuellement mise en avant (bordure gauche 3px primary-500) si elle est la prochaine. Le titre de l'ecran est dynamique : "Votre planning du [date]".
- **Element signature** : Cards de tache empilees avec gap 12px. Badge statut en haut a droite : "A faire" (warning), "En cours" (info), "Termine" (success), "Ponctuel" (primary-100/primary-700). La prochaine tache a une bordure gauche primary-500 3px pour guider l'oeil. En bas de chaque card : nom du bien en lien discret.
- **Couleur dominante** : Neutre avec badges semantiques. La bordure primary de la tache en cours apporte le seul accent.
- **Archetype actif** : Souverain (liste ordonnee, pas de surprise) + Soignant (exactement l'info necessaire, rien de plus)

### Fiche Intervention

- **Emotion primaire** : Concentration + Efficacite
- **Tension** : Completude de la checklist vs Rapidite d'execution
- **Resolution** : Header avec nom du bien + type de tache + badge. Bouton "Infos du bien →" en haut (acces au code d'acces / adresse, ecran distinct). Checklist lineaire avec items cochables (zone tactile 44px). Items photo ouvrent la camera directement. Bouton "Commencer" / "Terminer" sticky en bas (pleine largeur, 44px, primary).
- **Element signature** : Checklist avec items grands et espaces (gap 16px entre items). Chaque item est un texte 16px regular avec checkbox 20px visuelle (zone tactile 44px via padding). Les items photo ont une icone camera. Apres prise de photo : miniature 48x48px affichee a cote de l'item. Bouton sticky bottom avec ombre 0 -2px 8px oklch(0 0 0 / 0.08).
- **Couleur dominante** : Neutre. Le bouton CTA primary en bas est l'unique accent.
- **Archetype actif** : Soignant (guide Sarah etape par etape, sans jugement, sans pression)

### Infos Bien (Staff — lecture seule)

- **Emotion primaire** : Certitude + Rapidite d'acces
- **Tension** : Information complete du bien vs Ecran consulte en 10 secondes devant la porte
- **Resolution** : Ecran distinct de la Fiche Intervention (2 contextes temporels differents). Contenu : adresse (tap → GPS), code d'acces (gros monospace, copiable en 1 tap), WiFi (nom + mot de passe, copiable), consignes specifiques. Pas de bouton d'action sauf "Appeler [proprietaire]".
- **Element signature** : Code d'acces en 20px JetBrains Mono semibold, fond neutral-100, padding 12px 16px, border-radius 8px, bouton "Copier" adjacent (icone Copy 20px). Adresse en 16px, underline, tap ouvre Maps. WiFi en code monospace 14px. Consignes en texte courant 14px, fond warning-50 si urgentes.
- **Couleur dominante** : Neutre. Le code d'acces est visuellement dominant (fond contraste + grande taille).
- **Archetype actif** : Souverain (info claire, immediate, pas d'ambiguite) + Soignant (raccourci GPS, bouton copier, bouton appeler = tout pour aider Sarah)

---

## Ecrans Secondaires

### Suivi Menages (Owner)

- **Emotion primaire** : Supervision bienveillante + Tranquillite
- **Tension** : Suivi detaille vs Confiance dans l'equipe
- **Resolution** : Vue liste des taches du jour par bien + agent + statut. Chaque item : nom du bien, agent assigne, badge statut (a faire / en cours / termine). Le proprietaire peut voir sans intervenir. Pas de bouton d'action — c'est du monitoring.
- **Element signature** : Cards groupees par bien. Chaque card : nom du bien (titre card), sous-carte par tache (agent + heure + badge statut). Badges colores par statut. Le nom de l'agent est en 14px medium neutral-700.
- **Couleur dominante** : Neutre + badges semantiques
- **Archetype actif** : Soignant (confiance envers l'equipe, supervision sans micro-management)

### Detail Reservation (Owner)

- **Emotion primaire** : Information factuelle + Confiance
- **Tension** : Completude des donnees vs Clarte de presentation
- **Resolution** : Fiche structuree en sections : voyageur, dates, montant, source plateforme, statut menage associe. Pas de phrase, uniquement des donnees structurees. Badge plateforme en haut (Airbnb/Booking/Manuel). Badge statut de reservation.
- **Element signature** : Badge plateforme colore en haut a droite (airbnb-100 fond + airbnb-700 texte, ou booking-100/booking-700). Montant en tabular-nums semibold. Statut menage associe en bas de la fiche (avec badge et nom agent).
- **Couleur dominante** : Neutre + couleur plateforme (identite source) + badges semantiques
- **Archetype actif** : Souverain (toutes les donnees, structurees, sans ambiguite)

### Detail Anomalie (Owner)

- **Emotion primaire** : Vigilance + Maitrise de la resolution
- **Tension** : Urgence du probleme vs Calme pour agir correctement
- **Resolution** : Description factuelle du conflit (source 1 vs source 2, dates en conflit). Pas de dramatisation ("Attention" factuel, pas "DANGER"). 3 actions possibles : Ignorer (faux positif), Marquer resolue, Ouvrir la plateforme externe.
- **Element signature** : Fond card en warning-50 oklch(0.975 0.030 85) avec bordure gauche 3px warning-500. Icone shield-alert 24px warning-500. Description en texte courant 16px. Les 2 sources en conflit sont affichees cote a cote (ou empilees sur mobile) avec leur badge plateforme respectif. Boutons d'action en bas.
- **Couleur dominante** : Fond warning-50 + accents warning. Le reste est neutre.
- **Archetype actif** : Soignant (l'alerte est protectrice, pas accusatrice : "Attention : conflit detecte", pas "Erreur ! Double-reservation !")

### Parametres

- **Emotion primaire** : Maitrise + Personnalisation discrete
- **Tension** : Completude des options vs Simplicite de l'ecran
- **Resolution** : Liste structuree en sections (Profil, Synchronisation, Notifications, Compte). Chaque section contient des liens vers des ecrans de detail. Pas de formulaire complet visible d'emblee — chaque parametre s'edite dans son ecran dedie.
- **Element signature** : Sections separees par des en-tetes (12px uppercase neutral-500). Items de parametre en 16px medium avec chevron a droite. Style identique au Hub Gestion : sobre, fonctionnel, pas de decoration.
- **Couleur dominante** : Neutre total
- **Archetype actif** : Souverain (tout est configurable, organise, accessible)

### Notifications

- **Emotion primaire** : Information + Controle du flux
- **Tension** : Etre informe de tout vs Ne pas etre submerge
- **Resolution** : Liste chronologique des notifications avec dot de lecture (non lu = dot primary-500 8px). Chaque notification contient : icone semantique + titre court + timestamp. Tap → ecran concerne (deep link). Bouton "Tout marquer comme lu" en haut.
- **Element signature** : Dot primary-500 8px a gauche de chaque notification non lue. Icone 20px colore selon le type (reservation = info-500, anomalie = warning-500, intervention = success-500, erreur = error-500). Timestamp en 12px neutral-400 a droite. Separation par jour ("Aujourd'hui", "Hier", "Lundi 17 fevrier").
- **Couleur dominante** : Neutre + dots et icones semantiques
- **Archetype actif** : Souverain (controle du flux d'information) + Soignant (pas de spam, seulement les infos pertinentes)

---

## Ecrans Profil — Staff

### Mon Profil (Tab 2 Staff)

- **Emotion primaire** : Identite + Autonomie
- **Tension** : Personnalisation vs Simplicite extreme
- **Resolution** : Avatar + prenom + role. Statistiques simples (interventions ce mois, taux de completion). Lien vers Parametres (notifications, deconnexion). Pas de KPI complexe — le Staff n'a pas besoin de dashboard analytique.
- **Element signature** : Avatar 48px centre + prenom en H2 semibold. Sous le profil : 2 mini-KPIs (interventions mois + taux completion en %) dans des cards compactes. En bas : liens parametres.
- **Couleur dominante** : Neutre. Avatar avec initiales sur fond primary-500 si pas de photo.
- **Archetype actif** : Soignant (respect de l'identite du staff, autonomie dans l'app)

---

## Etats Speciaux

### Empty State

- **Emotion** : Encouragement (pas de vide anxiogene)
- **Tension** : Vide vs Opportunite
- **Resolution** : Icone large 48px (neutral-300) + titre 16px medium neutral-700 + description 14px regular neutral-500 + CTA si action possible. Centre dans la zone de contenu. Le message est toujours positif et oriente vers l'action.
- **Element** : Icone Lucide en outline, 48px, stroke-width 1.5. Titre factuel ("Aucune reservation pour cette periode."). Description orientee action quand possible ("Ajoutez votre premier bien pour commencer."). CTA primary si l'utilisateur peut resoudre l'etat vide.
- **Couleur dominante** : Neutre. Pas de couleur semantique (pas d'erreur, pas d'alerte — l'etat vide est normal).
- **Archetype actif** : Soignant ("Rien de prevu aujourd'hui. Bonne journee !" — pas de culpabilisation)

### Loading (Skeleton)

- **Emotion** : Patience confiante + Anticipation
- **Tension** : Attente vs Impression de rapidite
- **Resolution** : Skeleton screens fideles a la forme du composant final. Pulse 1500ms ease-in-out. L'utilisateur "voit" la structure de la page avant les donnees. Pas de spinner seul au centre. Pas d'ecran blanc.
- **Element** : Rectangles arrondis en neutral-150 oklch(0.940 0.004 260) avec animation pulse. En-tetes reels (pas de skeleton pour les titres de section). Les skeletons reprennent les dimensions exactes des composants finaux.
- **Couleur dominante** : Gris pulse (neutral-150)
- **Archetype actif** : Souverain (l'app est en controle, elle charge, pas de panique)

### Error

- **Emotion** : Reassurance (pas de culpabilite, pas de dramatisation)
- **Tension** : Signaler le probleme vs Ne pas alarmer
- **Resolution** : Message factuel + action de recovery. "Impossible de charger les reservations. Verifiez votre connexion." Pas de "Oups", pas d'excuses excessives, pas d'emoji triste. Toast avec barre laterale error-500 pour les erreurs ponctuelles. Banniere inline pour les erreurs persistantes (perte reseau).
- **Element** : Toast : barre laterale 3px error-500, icone X-circle 20px error-500, titre 14px semibold neutral-900, description 14px regular neutral-600, bouton close ghost. Banniere reseau : fond error-50 oklch(0.970 0.015 25), texte 14px error-700, pleine largeur, sous le header.
- **Couleur dominante** : Accent error sur le signal, neutre sur le fond
- **Archetype actif** : Soignant (le message rassure et guide vers la solution)

### Success

- **Emotion** : Satisfaction discrete + Accomplissement
- **Tension** : Celebrer vs Rester sobre
- **Resolution** : Confirmation factuelle avec timestamp. "Bien ajoute." / "Intervention terminee a 14:32." Toast avec barre laterale success-500. Disparait apres 4000ms. Pas de confettis, pas de "Bravo !", pas d'animation celebratoire excessive.
- **Element** : Toast : barre laterale 3px success-500, icone check-circle 20px success-500, titre 14px semibold neutral-900, description optionnelle. Pour la validation d'intervention Staff : retour au planning avec la tache marquee "Termine" (badge success) et la tache suivante mise en avant (bordure primary).
- **Couleur dominante** : Accent success sur le toast, le reste de l'ecran reste neutre
- **Archetype actif** : Souverain (confirmation nette, l'action est executee) + Soignant (le timestamp rassure : "c'est enregistre a cette heure precise")

### Offline / Connexion Perdue

- **Emotion** : Calme + Confiance dans la persistance
- **Tension** : Perte de connectivite vs Continuite d'usage
- **Resolution** : Banniere discrete sous le header : "Mode hors-ligne. Les donnees affichees datent de [heure]." Le Staff peut continuer a cocher sa checklist (cache local). Synchro automatique au retour du reseau. Pas de blocage, pas de modale.
- **Element** : Banniere pleine largeur, fond warning-50, texte 14px warning-700, icone wifi-off 20px warning-500. Positionnee sous le header, au-dessus du contenu scrollable. Ne bloque pas l'interaction.
- **Couleur dominante** : Warning discret
- **Archetype actif** : Soignant (ne pas abandonner Sarah sur le terrain avec une connexion perdue)

---

## Matrice Recapitulative

| Ecran | Persona | Emotion primaire | Archetype dominant |
|-------|---------|-----------------|-------------------|
| Splash | Tous | Confiance + Anticipation | Souverain |
| Onboarding | Owner | Facilite + Enthousiasme mesure | Soignant |
| Login | Tous | Securite + Rapidite | Souverain |
| Dashboard Owner | Owner | Controle + Serenite | Souverain |
| Calendrier | Owner | Vision globale + Anticipation | Souverain |
| Hub Gestion | Owner | Organisation + Maitrise | Souverain |
| Fiche Bien | Owner | Connaissance + Confiance operationnelle | Souverain + Soignant |
| Suivi Menages | Owner | Supervision bienveillante | Soignant |
| Detail Reservation | Owner | Information factuelle | Souverain |
| Detail Anomalie | Owner | Vigilance + Maitrise resolution | Soignant |
| Planning Jour | Staff | Clarte + Determination | Souverain + Soignant |
| Fiche Intervention | Staff | Concentration + Efficacite | Soignant |
| Infos Bien | Staff | Certitude + Rapidite | Souverain + Soignant |
| Parametres | Tous | Maitrise + Personnalisation | Souverain |
| Notifications | Tous | Information + Controle | Souverain + Soignant |
| Mon Profil (Staff) | Staff | Identite + Autonomie | Soignant |
| Empty State | Tous | Encouragement | Soignant |
| Loading | Tous | Patience confiante | Souverain |
| Error | Tous | Reassurance | Soignant |
| Success | Tous | Satisfaction discrete | Souverain |
| Offline | Tous | Calme + Confiance | Soignant |

---

*Document genere le 2026-02-20 -- D02-Art Direction / Emotion Map*
