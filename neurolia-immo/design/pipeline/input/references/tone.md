# Ton et Langage — Dashboard Loc Immo

> A02-Brand | Guide de ton et de redaction
> Source : `pipeline/output/01-brief/prd.md`

---

## 1. Principes generaux

| Principe | Description |
|----------|-------------|
| Tutoiement | L'application utilise "tu/ton/tes" — c'est un outil interne, pas une interface client |
| Concision | Chaque mot compte. Pas de phrases rallongees, pas de fioritures |
| Clarte | Un utilisateur doit comprendre l'information en un coup d'oeil |
| Neutralite | Pas de ton marketing, pas d'exclamations, pas d'emojis dans l'interface |

---

## 2. Registre

### Ce qu'on fait

- Phrases courtes, sujet-verbe-complement
- Vocabulaire concret et quotidien
- Informations chiffrees quand c'est pertinent
- Temps present pour les actions, passe compose pour les confirmations

### Ce qu'on ne fait pas

- Jargon technique (pas de "endpoint", "webhook", "polling" dans l'UI)
- Anglicismes evitables (on dit "reservation", pas "booking" dans l'interface)
- Ton enthousiaste / marketing (pas de "Super !", "Genial !", "Felicitations !")
- Double negation ou formulations ambigues

---

## 3. Exemples par contexte

### 3.1 Titres de page

| Oui | Non |
|-----|-----|
| Reservations | Gestion de tes reservations |
| Calendrier | Voir le calendrier de tes biens |
| Proprietes | Tes biens immobiliers |
| Menage du jour | Votre planning de nettoyage quotidien |

Les titres sont des noms, pas des phrases. Un mot ou deux maximum.

### 3.2 Labels de formulaire

| Oui | Non |
|-----|-----|
| Nom du bien | Entrez le nom de votre propriete |
| Code d'acces | Quel est le code d'acces de ce bien ? |
| Check-in | Date d'arrivee du voyageur |
| Montant (EUR) | Montant total de la reservation en euros |

Les labels sont courts. Les precisions vont en texte d'aide (`placeholder` ou texte sous le champ).

### 3.3 Boutons et actions

| Oui | Non |
|-----|-----|
| Ajouter un bien | Creer une nouvelle propriete |
| Enregistrer | Sauvegarder les modifications |
| Supprimer | Effacer definitivement |
| Menage termine | Confirmer que le menage est termine |
| Annuler | Retour en arriere |

Un verbe + un complement si necessaire. Pas de phrases completes.

### 3.4 Messages de confirmation

| Oui | Non |
|-----|-----|
| "Bien ajoute." | "La propriete a ete creee avec succes !" |
| "Reservation enregistree." | "Super ! Ta reservation a bien ete prise en compte." |
| "Menage valide a 14:32." | "Merci ! Le menage a ete marque comme termine." |

Confirmations factuelles avec timestamp quand c'est pertinent.

### 3.5 Messages d'erreur

| Oui | Non |
|-----|-----|
| "Ce champ est requis." | "Oups, tu as oublie de remplir ce champ !" |
| "Impossible de charger les reservations. Reessaie." | "Une erreur est survenue. Veuillez nous excuser." |
| "Email ou mot de passe incorrect." | "Les identifiants saisis ne correspondent pas." |

Dire ce qui ne va pas + comment corriger. Pas d'excuses, pas d'emojis tristes.

### 3.6 Etats vides (empty states)

| Contexte | Message |
|----------|---------|
| Pas de reservation | "Aucune reservation pour cette periode." |
| Pas de bien | "Ajoute ton premier bien pour commencer." |
| Pas de tache menage | "Rien de prevu aujourd'hui." |
| Recherche sans resultat | "Aucun resultat pour cette recherche." |

Les etats vides guident vers l'action suivante quand c'est possible.

### 3.7 Notifications

| Type | Exemple |
|------|---------|
| Nouvelle reservation | "Nouvelle resa : Studio Bastille, 15-18 mars (Airbnb)" |
| Rappel menage J-1 | "Menage demain : Appart Marais, check-out 10h" |
| Anomalie detectee | "Alerte : creneau bloque sur iCal sans reservation correspondante (Studio Bastille, 22-25 mars)" |

Les notifications contiennent le quoi, le ou, et le quand. Pas de bonjour, pas de formule de politesse.

---

## 4. Terminologie

### 4.1 Vocabulaire de reference

| Terme dans l'app | Alternatives refusees | Raison |
|-------------------|-----------------------|--------|
| Reservation (ou "resa" dans les notifs) | Booking, sejour | Terme standard en francais |
| Bien (ou "propriete") | Logement, hebergement, annonce | Plus generique, couvre appartements et maisons |
| Voyageur | Client, hote, locataire | Terme Airbnb/Booking, compris de tous |
| Menage | Nettoyage, entretien, intervention | Terme courant et concis |
| Check-in / Check-out | Arrivee / Depart | Exception : les termes anglais sont universels dans le secteur |
| Plateforme | Canal, source | Designe Airbnb, Booking ou Manuel |

### 4.2 Termes techniques (internes seulement)

Ces termes apparaissent dans le code et la documentation, jamais dans l'UI :

| Terme technique | Equivalent UI |
|-----------------|---------------|
| `cleaning_task` | Tache menage |
| `platform_ref_id` | Reference plateforme |
| `source_type` | (non affiche) |
| `ical_sync` | Synchronisation calendrier |
| `email_parse` | Capture automatique |

---

## 5. Regles par role utilisateur

### 5.1 Owner (Ilyes)

- Acces a toute l'information, y compris les montants
- Le ton est direct et informatif
- Les donnees financieres sont affichees en EUR avec le symbole
- Exemple : "Revenus mars : 3 450 EUR"

### 5.2 Cleaning Staff

- Pas d'acces aux montants — jamais affiches
- Le ton est encore plus simple et concret
- Focus sur les actions : ou aller, quoi faire, quand
- Exemple : "Studio Bastille — Check-out 10h — Menage a faire"

---

## 6. Formatage des donnees

| Donnee | Format | Exemple |
|--------|--------|---------|
| Date | JJ/MM/AAAA ou "15 mars" (contextuel) | 15/03/2026 ou "15 mars" |
| Heure | HH:MM (24h) | 14:32 |
| Montant | X XXX EUR | 3 450 EUR |
| Duree de sejour | X nuit(s) | 3 nuits |
| Telephone | +33 X XX XX XX XX | +33 6 12 34 56 78 |
| Nombre de voyageurs | X voyageur(s) | 2 voyageurs |

---

*Document genere le 2026-02-11 — A02-Brand / Tone*
