# Plateforme de Marque - Neurolia-Immo

> D01-Brand | Phase 2 : Plateforme strategique
> Sources : prd.md, features.md, references v1

---

## 1. Brand Key (Unilever) - 9 Composantes

### 1. Environnement Concurrentiel

Qui sont les alternatives directes et indirectes ?

- **Hospitable** : PMS multi-plateformes pour hotes professionnels. Puissant mais complexe et cher (a partir de 40 EUR/mois). Cible les gestionnaires 10+ biens.
- **Lodgify / Guesty** : Channel managers complets avec calendrier, prix dynamiques, messaging. Trop lourds et trop chers pour les petits proprietaires (1-5 biens).
- **Airbnb app (hote)** : Gestion native limitee a Airbnb. Pas de vue consolidee multi-plateformes. Pas de coordination equipe.
- **Tableur + WhatsApp** (alternative non-digitale) : Le proprietaire maintient un Google Sheet avec ses reservations et coordonne ses menages par SMS/WhatsApp. Gratuit mais fragile, avec des oublis frequents et aucun historique.
- **Beds24 / Smoobu** : PMS mid-range (15-30 EUR/mois) avec synchro iCal. Interface datee, pas pensee mobile-first, onboarding complexe.

### 2. Cible

Qui utilise cette application ?

- **Profil principal (Marc, proprietaire)** : 30-60 ans, proprietaire de 1 a 10 biens en location courte duree, digital literacy intermediaire a avancee. Jongle entre Airbnb et Booking, souvent en deplacement.
- **Moment d'usage** : Le matin (consultation dashboard, verification arrivees/departs), en journee (verifications ponctuelles), en soiree (bilan hebdomadaire).
- **Frequence** : Quotidienne (consultations rapides) + hebdomadaire (gestion, parametrage).
- **Profil secondaire (Sarah, personnel entretien)** : 25-55 ans, personnel terrain, digital literacy debutante a intermediaire. Utilise exclusivement un smartphone, entre deux logements.
- **Moment d'usage** : Le matin (planning), sur place (checklist, photos, code d'acces).
- **Frequence** : Quotidienne, sessions courtes (< 5 min par intervention).

### 3. Insight

Quelle verite profonde motive l'usage ?

> "Je gere mes locations seul et je n'ai pas le droit a l'erreur, mais les outils existants sont soit trop chers, soit trop lourds pour mes 3 biens."

- **Tension** : Les proprietaires de 1 a 5 biens sont trop petits pour les PMS professionnels et trop exposes pour rester sur du bricolage (tableur + WhatsApp). Ils sont dans un angle mort du marche.
- **Desir** : Un outil qui fait le travail sans demander de devenir expert en gestion locative. Voir tout d'un coup d'oeil, ne rien oublier, dormir tranquille.

### 4. Benefices

Que gagne l'utilisateur ?

- **Fonctionnel** : Zero reservation manquee, zero menage oublie. Toutes les donnees Airbnb et Booking consolidees en une seule vue. Taches d'entretien generees automatiquement.
- **Emotionnel** : Serenite. Le proprietaire sait que tout est sous controle sans devoir verifier manuellement. Le personnel sait exactement quoi faire, ou et quand.
- **Social** : Image de gestionnaire professionnel et organise, meme avec peu de biens. Relation de confiance renforcee avec l'equipe terrain.

### 5. Valeurs et Croyances

Quelles convictions porte la marque ?

1. **Fiabilite** : La donnee affichee est toujours a jour. Une reservation qui apparait est une reservation reelle. Une alerte signalee est une alerte qui necessite attention. Manifeste dans l'app par la synchronisation automatique, le score de confiance, et les indicateurs de derniere synchro.
2. **Clarte** : L'information dense ne doit jamais etre confuse. Chaque ecran repond a une seule question. Manifeste dans l'app par la hierarchie visuelle (alertes > aujourd'hui > cette semaine), les couleurs semantiques, et l'absence de decorations superflues.
3. **Simplicite** : La puissance ne doit pas se payer en complexite. Un proprietaire de 2 biens et un proprietaire de 10 biens utilisent le meme outil sans friction. Manifeste dans l'app par l'onboarding en 3 etapes, l'interface adaptative par role, et les actions en 1 tap.

### 6. Raisons de Croire

Pourquoi cette promesse est credible ?

- Ingestion automatique iCal + email parsing : les donnees viennent des plateformes, pas de la saisie manuelle.
- Reconciliation automatique des sources : le systeme detecte les doublons et les anomalies avant le proprietaire.
- Taches d'entretien generees a chaque checkout : le personnel recoit son planning sans intervention du proprietaire.
- Multi-tenant des le MVP : isolation complete des donnees entre proprietaires, architecture pensee pour la montee en charge.

### 7. Discriminateur

Quel est l'element unique et inimitable ?

> "Le seul outil de gestion locative concu pour les petits proprietaires qui centralise les donnees sans jamais acceder aux API des plateformes."

La double ingestion (iCal + email parsing) contourne l'absence d'API Airbnb/Booking tout en fournissant des donnees riches (nom du voyageur, montant, nombre de personnes). Aucun concurrent low-cost ne propose ce niveau d'enrichissement sans acces API.

### 8. Essence de Marque

En 2-3 mots, l'ame de la marque :

> "Serenite operationnelle"

### 9. Personnalite

Si la marque etait une personne :

- **Apparence** : Un(e) assistant(e) de gestion en tenue soignee mais decontractee. Ni costume de direction, ni tee-shirt. Un carnet bien organise, un telephone toujours charge.
- **Comportement** : Presente quand on a besoin, discrete quand tout va bien. Ne fait jamais perdre de temps. Dit les choses clairement, sans enjoliver ni dramatiser. Previent avant que le probleme n'arrive.
- **Voix** : Directe et factuelle, jamais familiere ni froide. Dit "Nouvelle reservation detectee" plutot que "Super, une nouvelle resa !" ou "Reservation #4582 inseree en base". Equilibre entre professionnalisme et accessibilite.

---

## 2. Prisme de Kapferer - 6 Facettes

| Facette | Cote | Description |
|---------|------|-------------|
| **Physique** | Emetteur | Interface sobre a dominante neutre-froide. Palette de gris avec touches bleu-ardoise pour les interactions. Couleurs vives reservees aux indicateurs plateformes (rose Airbnb, bleu Booking) et aux statuts semantiques (vert/rouge/orange/bleu). Typographie Inter dense et lisible. Icones Lucide en outline. Surfaces blanches sur fond gris tres clair. |
| **Personnalite** | Emetteur | Fiable, claire, discrete, reactive, accessible. L'application inspire confiance par sa precision et sa sobriete. Ni ludique ni austere. |
| **Culture** | Emetteur | Culture de l'hospitalite francaise : qualite d'accueil, attention au detail, rigueur sans rigidite. Influence tech des dashboards modernes (Linear, Notion, Vercel). Valeurs d'independance et de debrouillardise des petits proprietaires. |
| **Relation** | -- | Partenaire operationnel de confiance. Ni mentor (pas de condescendance), ni ami (pas de familiarite), ni expert (pas de jargon). Un collaborateur silencieux qui fait le travail. Relation asymetrique : l'application s'adapte au role (proprietaire vs staff) sans que l'utilisateur ait a le demander. |
| **Reflet** | Recepteur | Un proprietaire organise et serein qui maitrise ses locations sans effort apparent. Un professionnel a petite echelle qui n'a rien a envier aux gros gestionnaires. Un(e) agent(e) d'entretien autonome qui sait toujours ou aller et quoi faire. |
| **Mentalisation** | Recepteur | "Je suis en controle de mes locations." Le proprietaire se sent professionnel et rassurant. Le personnel se sent respecte et autonome : l'information necessaire est toujours la, claire et complete, sans avoir a demander au proprietaire. |

---

## 3. Archetypes Jungiens

### Dominant : Souverain (The Ruler)

- **Motivation** : Controle, ordre, maitrise de son environnement
- **Manifestation dans l'app** :
  - **UI** : Dashboard structure en hierarchie claire (alertes > aujourd'hui > cette semaine). KPIs visibles. Calendrier multi-biens avec vue consolidee. Sensation de "tour de controle".
  - **Ton** : Factuel, informatif, sans ambiguite. "3 arrivees aujourd'hui. 1 menage en cours." L'utilisateur recoit un rapport, pas une conversation.
  - **Interactions** : Chaque action produit un resultat previsible et confirme. Pas de surprises. Feedback immediat. Statuts toujours visibles.

### Secondaire : Soignant (The Caregiver)

- **Motivation** : Service, protection, bienveillance envers les autres
- **Role** : Nuance l'archetype Souverain pour eviter la froideur. Le Soignant apporte :
  - **UI** : Les alertes ne sont pas accusatrices mais protectrices ("Attention : conflit de reservation detecte"). Les empty states sont encourageants ("Rien de prevu aujourd'hui. Bonne journee !").
  - **Ton** : Les messages d'erreur rassurent plutot que de blamer. Les notifications push informent sans alarmer inutilement.
  - **Interactions** : L'onboarding accompagne sans forcer. La configuration IMAP est proposee comme enrichissement optionnel. L'equipe terrain recoit exactement l'information dont elle a besoin — ni plus, ni moins.

---

## Relation avec Neurolia (Marque Parent)

Neurolia-Immo est un produit de l'écosystème Neurolia. L'identité visuelle du dashboard reste autonome (thème clair, blue-slate, Inter) mais intègre des marqueurs subtils de l'ADN Neurolia :

| Marqueur | Manifestation |
|----------|--------------|
| Couleur accent agence | Terracotta `oklch(0.58 0.14 35)` — barre signature, tab indicator |
| Police display | Satoshi (H1 uniquement) — cohérence avec neurolia-site |
| Barre signature | 4px verticale terracotta sur les titres de section clés |
| Radius ajustés | Cards 10px, buttons/inputs 6px — légèrement plus tendus que le standard 12/8 |

> **Principe** : L'ADN Neurolia est un accent, jamais le thème dominant. Le dashboard reste fonctionnel et sobre — les marqueurs Neurolia sont des touches de reconnaissance, pas de la décoration.

---

*Document genere le 2026-02-20 -- D01-Brand / Platform*
