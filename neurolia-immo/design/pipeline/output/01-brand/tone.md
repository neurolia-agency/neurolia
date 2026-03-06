# Ton de Communication

> D01-Brand | Phase 3a : Guide de ton et de redaction
> Source : 00-platform.md, references/tone.md (v1)

---

## Tutoiement / Vouvoiement

**Vouvoiement** -- L'application utilise "vous/votre/vos" dans toute l'interface.

Justification : Neurolia-Immo est un produit multi-tenant destine a des proprietaires et du personnel d'horizons varies. Le vouvoiement maintient une distance professionnelle sans froideur, coherente avec l'archetype Souverain (autorite) nuance par le Soignant (respect). Il unifie le registre entre les deux personas (proprietaire et staff) sans avoir a gerer deux niveaux de formalite.

Note d'evolution : La v1 ("Loc Immo") utilisait le tutoiement car l'outil etait interne. Le passage au vouvoiement accompagne le positionnement multi-tenant du produit.

## Niveau de Formalite

**3/5** -- Professionnel mais accessible.

Ni familier (pas de "Hey", pas d'exclamation, pas d'emoji), ni corporatif (pas de "Nous vous prions de bien vouloir", pas de jargon juridique). Le registre est factuel, direct, et courtois.

## Personnalite

- **Fiable** : "Reservation confirmee. 3 nuits, du 15 au 18 mars." (Information factuelle, precise, pas d'ambiguite.)
- **Claire** : "2 arrivees aujourd'hui. 1 menage en cours." (Notification push qui va droit au but. Pas de "Bonjour, nous voulions vous informer que...".)
- **Discrete** : "Connexion perdue. Les donnees affichees datent de 14:32." (Pas de dramatisation. Le probleme est nomme. La solution est suggeree.)
- **Bienveillante** : "Rien de prevu aujourd'hui. Bonne journee !" (Encourageant dans les empty states, sans exces d'enthousiasme.)

## Mots a Utiliser

| Mot | Contexte d'usage |
|-----|------------------|
| Reservation (ou "resa" dans les notifications) | Partout dans l'interface pour designer un sejour |
| Bien (ou "propriete") | Pour designer un logement gere |
| Voyageur | Pour designer la personne qui reserve |
| Menage | Pour designer une tache d'entretien standard |
| Intervention | Pour designer toute tache d'entretien (standard ou ponctuelle) |
| Check-in / Check-out | Termes sectoriels universels, acceptes en francais |
| Plateforme | Pour designer Airbnb, Booking ou Manuel |
| Planning | Pour designer le calendrier de taches du staff |
| Equipe | Pour designer les collaborateurs d'entretien |
| Alerte | Pour designer une anomalie necessitant attention |

## Mots a Eviter

| Mot | Pourquoi | Alternative |
|-----|----------|-------------|
| Client / Hote / Locataire | Ambigus dans le contexte Airbnb/Booking | Voyageur |
| Logement / Hebergement / Annonce | Trop specifiques ou trop plateformes | Bien, propriete |
| Nettoyage | Connotation degradante pour le staff | Menage, intervention |
| Booking (dans l'UI) | Confusion avec la plateforme Booking.com | Reservation |
| Endpoint, Webhook, Polling | Jargon technique invisible pour l'utilisateur | Synchronisation, capture automatique |
| Super / Genial / Felicitations | Ton marketing excessif | Ton factuel et sobre |
| Oups | Infantilisant, deplace dans un outil professionnel | Supprimer, reformuler factuellement |
| Cliquez | Inadapte au mobile | Appuyez, ou simplement nommer l'action |

## Exemples par Contexte

### Notifications Push

- **Bien** : "Nouvelle reservation : Studio Bastille, 15-18 mars (Airbnb)"
- **A eviter** : "Super nouvelle ! Vous avez une nouvelle reservation sur votre bien Studio Bastille."

### Messages d'Erreur

- **Bien** : "Impossible de charger les reservations. Verifiez votre connexion."
- **A eviter** : "Oups, une erreur est survenue ! Nous sommes desoles pour la gene occasionnee."

### Empty States

- **Bien** : "Aucune reservation pour cette periode."
- **A eviter** : "Pas encore de reservation ici... Mais ca va venir !"

### Labels de Boutons

- **Bien** : "Ajouter un bien" / "Commencer" / "Terminer l'intervention"
- **A eviter** : "Cliquez ici" / "Soumettre" / "OK" / "Envoyer le formulaire"

### Messages de Confirmation

- **Bien** : "Bien ajoute." / "Intervention terminee a 14:32."
- **A eviter** : "Votre propriete a ete creee avec succes ! Felicitations !"

### Emails de Notification (Proprietaire)

- **Bien** : Sujet : "Nouvelle reservation -- Studio Bastille, 15-18 mars". Corps : ligne 1 = quoi, ligne 2 = ou/quand, CTA = "Voir dans Neurolia-Immo".
- **A eviter** : Sujet : "Bonne nouvelle !". Corps : paragraphe de 5 lignes avant l'information utile.

### Emails de Notification (Staff)

- **Bien** : Sujet : "Votre planning du 15 mars -- 3 taches". Corps : liste ordonnee des taches avec heure, bien, type.
- **A eviter** : Sujet : "Rappel de vos missions du jour". Corps : texte narratif sans structure.

---

## Formatage des Donnees

| Donnee | Format | Exemple |
|--------|--------|---------|
| Date | JJ/MM/AAAA ou "15 mars" (contextuel) | 15/03/2026 ou "15 mars" |
| Heure | HH:MM (format 24h) | 14:32 |
| Montant | X XXX EUR | 3 450 EUR |
| Duree de sejour | X nuit(s) | 3 nuits |
| Telephone | +33 X XX XX XX XX | +33 6 12 34 56 78 |
| Nombre de voyageurs | X voyageur(s) | 2 voyageurs |

## Regles par Role

### Proprietaire (Owner)

- Acces complet aux donnees, y compris les montants financiers
- Ton informatif et factuel
- Donnees financieres en EUR avec symbole
- Notifications detaillees (bien, dates, montant, source)

### Personnel d'Entretien (Staff)

- Pas d'acces aux montants financiers (jamais affiches)
- Ton encore plus simple et direct
- Focus exclusif sur les actions : ou aller, quand, quoi faire
- Notifications minimalistes (bien, heure, type de tache)

---

*Document genere le 2026-02-20 -- D01-Brand / Tone*
