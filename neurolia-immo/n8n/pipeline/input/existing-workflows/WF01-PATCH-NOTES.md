# WF01 — Patch Notes

> Corrections appliquees au workflow WF01 (Parseur d'emails)
> Derniere mise a jour : 2026-02-16

---

## Patch 1 : Supprimer appel WF05 Flow A

### Probleme

WF05 Flow A (confirmation voyageur) fait doublon avec les emails envoyes automatiquement par Airbnb et Booking. Quand une reservation est confirmee, la plateforme envoie deja un email de confirmation au voyageur. L'appel a WF05 Flow A depuis WF01 genere donc un **deuxieme email de confirmation** inutile.

### Solution

Supprimer l'appel a WF05 Flow A depuis WF01. Le noeud "Envoyer confirmation voyageur" (HTTP Request qui appelle le webhook WF05) est retire, ainsi que sa connexion.

> **Important** : Ne PAS toucher au noeud "Creer tache menage" (WF04) qui reste necessaire.

---

### 1.1 Noeud a supprimer

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Envoyer confirmation voyageur` |
| **Type** | HTTP Request |
| **Action** | Appel webhook WF05 (Flow A — confirmation voyageur) |

Supprimer ce noeud entierement dans l'interface n8n.

---

### 1.2 Connexion a supprimer

| Source | Output | Destination |
|--------|--------|-------------|
| `Nouvelle reservation ?` | true | `Envoyer confirmation voyageur` |

---

### 1.3 Cablage mis a jour

**AVANT :**
```
Upsert reservation → Nouvelle reservation ? ── oui ──→ Creer tache menage (WF04)
                                                    └→ Envoyer confirmation voyageur (WF05)
```

**APRES :**
```
Upsert reservation → Nouvelle reservation ? ── oui ──→ Creer tache menage (WF04)
```

La branche vers WF05 Flow A est supprimee. Le noeud "Nouvelle reservation ?" n'a plus qu'une seule sortie `true` : vers "Creer tache menage".

---

### 1.4 Resultat

| Evenement | Avant | Apres |
|-----------|-------|-------|
| Nouvelle reservation | WF04 (tache menage) + WF05 Flow A (email confirmation) | WF04 (tache menage) uniquement |
| Email confirmation voyageur | Envoye par la plateforme **ET** par WF05 (doublon) | Envoye par la plateforme uniquement (plus de doublon) |

### Voir aussi

- `WF05-PATCH-NOTES.md` Patch 1 — Desactivation du Flow A cote WF05

---

## Patch 2 : Parser Airbnb — nouveau format email (dates sans annee + property)

### Probleme

Le nouveau format des emails de confirmation Airbnb (fevrier 2026) a change :

| Champ | Ancien format | Nouveau format |
|-------|--------------|----------------|
| **Dates dans le sujet** | `19-20 fevr. 2026` | `arrive le 24 fevr.` (pas d'annee, pas de check-out) |
| **Dates dans le body** | `19 fevr. 2026 – 20 fevr. 2026` | `mar. 24 fevr.` et `mer. 25 fevr.` dans des heading2 (pas d'annee) |
| **Property dans le sujet** | `l annonce Villa Sidi Kaouki pour` | Absent du sujet |
| **Property dans le body** | Pattern `votre logement X` | Faux positif : matche du texte generique |

Resultat : `checkIn: "[NON DETECTE]"`, `checkOut: "[NON DETECTE]"`, `propertyName: "est adapte aux enfants en"` (faux positif).

### Solution

Ajouter des patterns supplementaires dans le noeud **"Parser email Airbnb"**.

---

### 2.1 Noeud modifie

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Parser email Airbnb` |
| **Type** | Code |

---

### 2.2 Modification 1 : Nouveau pattern dates (apres Pattern 3 existant)

Ajouter ce bloc **apres** le commentaire `// Pattern 3: "Arrivee" et "Depart" dans le HTML` et son code :

```javascript
// Pattern 4: Airbnb nouveau format — dates heading2 sans annee
// "mar. 24 fevr." dans des elements heading2
if (!checkIn) {
  var dateMatches = [];
  var dateRe = /heading2[^>]*>(?:[a-zéû]+\.\s+)?(\d{1,2})\s+([\wéûô]+)\.\s*</g;
  var dm;
  while ((dm = dateRe.exec(html)) !== null) {
    dateMatches.push({ day: dm[1], month: dm[2] });
  }

  if (dateMatches.length >= 2) {
    var currentYear = new Date().getFullYear();

    var m1 = getMonth(dateMatches[0].month);
    var m2 = getMonth(dateMatches[1].month);

    if (m1) {
      var day1 = dateMatches[0].day.padStart(2, "0");
      checkIn = currentYear + "-" + m1 + "-" + day1;
      // Si la date est passee de plus de 30 jours, annee suivante
      if (new Date(checkIn) < new Date(Date.now() - 30*24*60*60*1000)) {
        checkIn = (currentYear + 1) + "-" + m1 + "-" + day1;
      }
    }
    if (m2) {
      var day2 = dateMatches[1].day.padStart(2, "0");
      var yearCO = parseInt(checkIn.substring(0, 4)) || currentYear;
      checkOut = yearCO + "-" + m2 + "-" + day2;
      // Si checkout < checkin (ex: dec → jan), annee suivante
      if (checkOut < checkIn) {
        checkOut = (yearCO + 1) + "-" + m2 + "-" + day2;
      }
    }
  }
}

// Pattern 5: sujet "arrive le 24 fevr." — check-in seul (fallback)
if (!checkIn) {
  m = subject.match(/arrive\s+le\s+(\d{1,2})\s+([\wéûô]+)/i);
  if (m) {
    var month = getMonth(m[2]);
    if (month) {
      var currentYear = new Date().getFullYear();
      var day = m[1].padStart(2, "0");
      checkIn = currentYear + "-" + month + "-" + day;
      if (new Date(checkIn) < new Date(Date.now() - 30*24*60*60*1000)) {
        checkIn = (currentYear + 1) + "-" + month + "-" + day;
      }
    }
  }
}
```

---

### 2.3 Modification 2 : Nouveau pattern property name

**Remplacer** le bloc d'extraction `propertyName` existant (qui commence par `// --- Extraction du nom de la propriete ---`) par :

```javascript
// --- Extraction du nom de la propriete ---
var propertyName = "";

// Pattern 1: sujet "l'annonce Villa Sidi Kaouki pour"
m = subject.match(/l['\u2019]annonce\s+(.+?)\s+pour\s/i);
if (!m) m = subject.match(/annonce\s+(.+?)\s+pour\s/i);
if (!m) m = subject.match(/concernant\s+(.+?)\s+pour\s/i);

// Pattern 2: texte en MAJUSCULES juste avant "Logement entier" ou "Logement priv"
// Nouveau format Airbnb : "VILLA SIDI KAOUKI\nLogement entier"
if (!m) m = html.match(/>([A-Z\u00C0-\u00DC][A-Z\u00C0-\u00DC\s]{2,40})<\/[^>]*>[\s\S]{0,100}?Logement\s+(?:entier|priv)/);

// Pattern 3: HTML aria-label sur un lien de listing
if (!m) m = html.match(/aria-label="([^"]+)"\s+[^>]*href="[^"]*\/rooms\//i);

// Pattern 4: HTML lien vers /rooms/ avec texte direct
if (!m) m = html.match(/href="[^"]*\/rooms\/[^"]*"[^>]*>([^<]{3,40})</);

// Pattern 5: HTML "Logement : X" (ancien format)
if (!m) m = html.match(/[Ll]ogement\s*:\s*([^<\n]+)/);

// NE PAS utiliser "votre logement/annonce X" — trop de faux positifs

if (m) {
  propertyName = m[1].trim();
  // Nettoyer les guillemets et normaliser les majuscules ("VILLA SIDI KAOUKI" → "Villa Sidi Kaouki")
  propertyName = propertyName.replace(/["\u00ab\u00bb]/g, "").trim();
  if (propertyName === propertyName.toUpperCase() && propertyName.length > 2) {
    propertyName = propertyName.toLowerCase().replace(/(?:^|\s)\S/g, function(c) { return c.toUpperCase(); });
  }
  // Securite : rejeter si ca ressemble a du texte generique
  if (/est\s+adapt|en\s+bas\s+[a\u00e2]ge|voyageur|bienvenue|plus\s+d/i.test(propertyName)) {
    propertyName = "";
  }
}
```

---

### 2.4 Modification 3 : Extraction nom voyageur depuis le sujet (nouveau format)

Ajouter un pattern **avant** les patterns existants (juste apres `var guestName = "";`) :

```javascript
// Pattern 0: sujet "Réservation confirmée : Alexis Carrot arrive le"
m = subject.match(/:\s+([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)\s+arrive/);
if (m) guestName = m[1].trim();
```

---

### 2.5 Resultat attendu

Avec l'email `"Reservation confirmee : Alexis Carrot arrive le 24 fevr."` :

| Champ | Avant (echec) | Apres (attendu) |
|-------|--------------|-----------------|
| guestName | `Alexis Carrot` | `Alexis Carrot` (OK — deja extrait) |
| checkIn | `[NON DETECTE]` | `2026-02-24` |
| checkOut | `[NON DETECTE]` | `2026-02-25` |
| propertyName | `est adapte aux enfants en` | `Villa Sidi Kaouki` (Pattern 2 — MAJUSCULES avant "Logement entier") |
| amount | `null` | `73.60` ou `70.96` (selon pattern — MAD) |
| checkInTime | *(n'existait pas)* | `15:00` |
| checkOutTime | *(n'existait pas)* | `11:00` |

> **Note monnaie** : L'email utilise MAD (Dirham marocain). Le parser actuel cherche EUR/€. Il faudra adapter les patterns montant pour MAD si necessaire (hors scope de ce patch — le montant n'est pas bloquant pour la creation de reservation).

---

### 2.6 Modification 4 : Extraction des heures de check-in / check-out

Ajouter ce bloc **apres** l'extraction des dates (apres le dernier pattern de dates) :

```javascript
// --- Extraction des heures de check-in / check-out ---
// Airbnb format : heading2 "mar. 24 fevr." suivi de heading/regular "15:00"
var checkInTime = "";
var checkOutTime = "";

// Pattern: heure apres label "Arrivee" ou premiere date heading2
var timeMatches = html.match(/heading2[^>]*>[^<]*<\/p>[\s\S]*?(\d{2}:\d{2})/g);
if (timeMatches && timeMatches.length >= 2) {
  var t1 = timeMatches[0].match(/(\d{2}:\d{2})/);
  var t2 = timeMatches[1].match(/(\d{2}:\d{2})/);
  if (t1) checkInTime = t1[1];
  if (t2) checkOutTime = t2[1];
}

// Fallback : chercher "Depart" puis heure
if (!checkOutTime) {
  m = html.match(/[Dd][eé]part[\s\S]*?(\d{2}:\d{2})/);
  if (m) checkOutTime = m[1];
}
```

Puis ajouter `checkInTime` et `checkOutTime` dans l'objet `result` :

```javascript
var result = {
  platform: "airbnb",
  emailType: emailType,
  guestName: guestName || "[NON DETECTE]",
  checkIn: checkIn || "[NON DETECTE]",
  checkOut: checkOut || "[NON DETECTE]",
  checkInTime: checkInTime || null,   // NOUVEAU
  checkOutTime: checkOutTime || null,  // NOUVEAU
  nbGuests: nbGuests,
  // ... reste inchange
```

---

### 2.7 Modification 5 : Passer les heures dans le noeud "Construire payload"

Dans le noeud **"Construire payload"** (Code node qui prepare le body pour l'API), ajouter les champs :

```javascript
checkInTime: data.checkInTime || undefined,
checkOutTime: data.checkOutTime || undefined,
```

> L'API accepte maintenant `checkInTime` et `checkOutTime` (format `HH:MM`, optionnels). Les heures sont stockees sur la reservation et affichees au staff de menage.

---

*Document mis a jour le 2026-02-16 (Patch 1 + Patch 2)*
