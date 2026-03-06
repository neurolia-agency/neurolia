# WF01 -- Email Parser

> Workflow de parsing automatique des emails de confirmation Airbnb et Booking.com
> Dashboard Loc Immo | Version : 1.0 | Date : 2026-02-12

---

## 1. Vue d'ensemble

### 1.1 Objectif

Surveiller une boite email dediee (`reservations@locimmo.fr`) et extraire automatiquement les informations de reservation a partir des emails de confirmation Airbnb et Booking.com. Les reservations sont injectees dans la base de donnees via l'API webhook du dashboard.

### 1.2 Trigger

| Parametre | Valeur |
|-----------|--------|
| **Type** | IMAP Email Trigger |
| **Credential** | `IMAP - Reservations` |
| **Mailbox** | `INBOX` |
| **Polling** | Toutes les 2 minutes |
| **Format** | HTML (les emails de plateforme sont en HTML) |
| **Options** | Mark as read apres traitement |

### 1.3 Diagramme du workflow

```mermaid
graph TD
    A[IMAP Trigger<br/>polling 2 min] --> B{Switch<br/>domaine expediteur}

    B -->|@airbnb.com| C1[Code Node<br/>Parse Airbnb HTML]
    B -->|@booking.com| C2[Code Node<br/>Parse Booking HTML]
    B -->|autre| C3[Code Node<br/>Log email inconnu]

    C1 --> D{Switch<br/>type email}
    C2 --> D

    D -->|confirmation| E1[Set status = confirmed]
    D -->|modification| E2[Set status = confirmed<br/>donnees mises a jour]
    D -->|annulation| E3[Set status = cancelled]

    E1 --> F[HTTP Request<br/>POST /api/webhooks/n8n/reservation]
    E2 --> F
    E3 --> F

    F --> G{IF action === created}

    G -->|oui| H1[HTTP Request<br/>Appeler WF04 webhook]
    G -->|oui| H2[HTTP Request<br/>Appeler WF05 webhook]
    G -->|non| I[Fin - reservation mise a jour]

    H1 --> I
    H2 --> I

    C3 --> J[Send Email<br/>alerte proprietaire<br/>email non reconnu]

    F -->|erreur| K[Error Handler<br/>email alerte proprietaire]
```

---

## 2. Configuration des nodes

### 2.1 Node 1 : IMAP Email Trigger

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Recevoir email` |
| **Credential** | `IMAP - Reservations` |
| **Mailbox** | `INBOX` |
| **Action** | Mark as read |
| **Download Attachments** | Non |
| **Format** | Resolved (HTML + texte) |

**Output** : Objet avec les champs `from`, `subject`, `html`, `text`, `date`, `messageId`.

### 2.2 Node 2 : Switch (routage par expediteur)

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Router par plateforme` |
| **Mode** | Rules |
| **Data Type** | String |
| **Value** | `{{ $json.from }}` |

**Regles de routage** :

| Regle | Condition | Output |
|-------|-----------|--------|
| Airbnb | Contient `@airbnb.com` ou `@airbnbmail.com` | Output 0 |
| Booking | Contient `@booking.com` ou `@guest.booking.com` | Output 1 |
| Autre | Fallback | Output 2 |

> **Note** : Airbnb utilise parfois `@airbnbmail.com` pour les emails transactionnels. Booking utilise `@guest.booking.com` pour les messages directs voyageurs.

### 2.3 Node 3a : Code Node -- Parse Airbnb

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Parser email Airbnb` |
| **Language** | JavaScript |

**Code complet** :

```javascript
// ============================================================
// WF01 — Parse Airbnb confirmation email
// Extrait les informations de reservation depuis le HTML
// ============================================================

const html = $input.first().json.html || '';
const subject = $input.first().json.subject || '';
const messageId = $input.first().json.messageId || '';

// --- Detection du type d'email ---
let emailType = 'confirmation'; // par defaut

// Patterns de detection Airbnb
const cancelPatterns = [
  /annul(é|e|ation)/i,
  /cancel(led|lation)/i,
  /réservation annulée/i,
  /reservation cancelled/i,
];

const modifyPatterns = [
  /modifi(é|cation)/i,
  /mis(e)?\s+[àa]\s+jour/i,
  /updated/i,
  /changed/i,
  /modification de réservation/i,
];

for (const pattern of cancelPatterns) {
  if (pattern.test(subject) || pattern.test(html)) {
    emailType = 'cancellation';
    break;
  }
}

if (emailType === 'confirmation') {
  for (const pattern of modifyPatterns) {
    if (pattern.test(subject) || pattern.test(html)) {
      emailType = 'modification';
      break;
    }
  }
}

// --- Extraction du nom du voyageur ---
// Airbnb FR : "Réservation confirmée - Jean Dupont arrive le..."
// Airbnb FR : "Jean Dupont a réservé votre logement"
// Airbnb EN : "Reservation confirmed - Jean Dupont arrives..."
let guestName = '';

const guestPatterns = [
  // "Jean Dupont a réservé"
  /([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+)+)\s+a\s+r[ée]serv[ée]/,
  // "Réservation de Jean Dupont"
  /[Rr][ée]servation\s+de\s+([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+)+)/,
  // "Votre voyageur : Jean Dupont"
  /[Vv]otre\s+voyageur\s*:\s*([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+)+)/,
  // Sujet : "Réservation confirmée — Jean Dupont"
  /[Rr][ée]servation\s+confirm[ée]e?\s*[-–—]\s*([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+)+)/,
  // Dans le HTML : class="guest-name" ou data-testid
  /class="[^"]*guest[_-]?name[^"]*"[^>]*>([^<]+)</i,
  // Fallback : "Confirmation pour Jean Dupont"
  /[Cc]onfirmation\s+pour\s+([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+)+)/,
];

for (const pattern of guestPatterns) {
  const match = html.match(pattern) || subject.match(pattern);
  if (match) {
    guestName = match[1].trim();
    break;
  }
}

// --- Extraction des dates ---
// Airbnb FR : "1 janv. 2026" ou "1 janvier 2026" ou "01/01/2026"
// Airbnb utilise souvent le format "1 janv. 2026 - 5 janv. 2026"

const moisFR = {
  'janv': '01', 'janvier': '01',
  'févr': '02', 'février': '02', 'fevr': '02', 'fevrier': '02',
  'mars': '03',
  'avr': '04', 'avril': '04',
  'mai': '05',
  'juin': '06',
  'juil': '07', 'juillet': '07',
  'août': '08', 'aout': '08',
  'sept': '09', 'septembre': '09',
  'oct': '10', 'octobre': '10',
  'nov': '11', 'novembre': '11',
  'déc': '12', 'décembre': '12', 'dec': '12', 'decembre': '12',
};

function parseDateFR(dateStr) {
  // Format "1 janv. 2026" ou "1 janvier 2026"
  const match = dateStr.match(/(\d{1,2})\s+([\wéûô]+)\.?\s+(\d{4})/);
  if (match) {
    const day = match[1].padStart(2, '0');
    const monthKey = match[2].toLowerCase().replace(/\./g, '');
    const month = moisFR[monthKey];
    const year = match[3];
    if (month) {
      return `${year}-${month}-${day}`;
    }
  }
  // Format DD/MM/YYYY
  const matchSlash = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (matchSlash) {
    return `${matchSlash[3]}-${matchSlash[2]}-${matchSlash[1]}`;
  }
  return null;
}

let checkIn = '';
let checkOut = '';

// Pattern : "1 janv. 2026 - 5 janv. 2026" ou "1 janv. - 5 janv. 2026"
const dateRangePattern = /(\d{1,2}\s+[\wéûô]+\.?\s+\d{4})\s*[-–—]\s*(\d{1,2}\s+[\wéûô]+\.?\s+\d{4})/;
const dateRangeMatch = html.match(dateRangePattern);

if (dateRangeMatch) {
  checkIn = parseDateFR(dateRangeMatch[1]);
  checkOut = parseDateFR(dateRangeMatch[2]);
} else {
  // Pattern alternatif : dates dans des elements HTML separes
  // "Arrivée" suivi d'une date, "Départ" suivi d'une date
  const arrivalPattern = /[Aa]rriv[ée]e[^<]*<[^>]*>\s*(\d{1,2}\s+[\wéûô]+\.?\s+\d{4})/;
  const departurePattern = /[Dd][ée]part[^<]*<[^>]*>\s*(\d{1,2}\s+[\wéûô]+\.?\s+\d{4})/;

  const arrMatch = html.match(arrivalPattern);
  const depMatch = html.match(departurePattern);

  if (arrMatch) checkIn = parseDateFR(arrMatch[1]);
  if (depMatch) checkOut = parseDateFR(depMatch[1]);
}

// --- Extraction du nombre de voyageurs ---
let nbGuests = 1;

const guestsPatterns = [
  /(\d+)\s+voyageur/i,
  /(\d+)\s+guest/i,
  /(\d+)\s+adulte/i,
  /voyageurs?\s*:\s*(\d+)/i,
  /guests?\s*:\s*(\d+)/i,
];

for (const pattern of guestsPatterns) {
  const match = html.match(pattern);
  if (match) {
    nbGuests = parseInt(match[1], 10);
    break;
  }
}

// --- Extraction du montant ---
let amount = null;

const amountPatterns = [
  // "Total : 450,00 €" ou "Total: €450.00" ou "450,00 EUR"
  /[Tt]otal[^€\d]*[€]?\s*([\d\s]+[.,]\d{2})\s*[€EUR]?/,
  /[Rr]evenus?\s*:?\s*[€]?\s*([\d\s]+[.,]\d{2})\s*[€EUR]?/,
  /[Mm]ontant[^€\d]*[€]?\s*([\d\s]+[.,]\d{2})\s*[€EUR]?/,
  // "€450.00" ou "450.00€" ou "EUR 450.00"
  /[€EUR]\s*([\d\s]+[.,]\d{2})/,
  /([\d\s]+[.,]\d{2})\s*[€EUR]/,
];

for (const pattern of amountPatterns) {
  const match = html.match(pattern);
  if (match) {
    // Nettoyer : retirer espaces, remplacer virgule par point
    amount = parseFloat(match[1].replace(/\s/g, '').replace(',', '.'));
    break;
  }
}

// --- Extraction de la reference Airbnb ---
// Format : HMXXXXXXXXXX (commence par HM suivi de chiffres)
let platformRefId = '';

const refPatterns = [
  /\b(HM[A-Z0-9]{6,12})\b/,
  /[Cc]ode\s+de\s+confirmation\s*:?\s*([A-Z0-9]{8,14})/,
  /[Rr][ée]f[ée]rence\s*:?\s*([A-Z0-9]{8,14})/,
  /[Cc]onfirmation\s+code\s*:?\s*([A-Z0-9]{8,14})/,
];

for (const pattern of refPatterns) {
  const match = html.match(pattern) || subject.match(pattern);
  if (match) {
    platformRefId = match[1].trim();
    break;
  }
}

// --- Extraction du nom de la propriete ---
let propertyName = '';

const propertyPatterns = [
  // "votre logement X" ou "votre bien X"
  /votre\s+(?:logement|bien|propriété|appartement|studio|maison)\s+[«"]?([^»"<\n]+)[»"]?/i,
  // "Logement : Villa Sidi Kaouki"
  /[Ll]ogement\s*:\s*([^<\n]+)/,
  // "pour Villa Sidi Kaouki"
  /pour\s+(?:le\s+)?([A-ZÀ-Ü][^<,\n]{2,40}?)(?:\s+[àa]\s+|\s*,)/,
  // "Réservation pour X" dans le sujet
  /[Rr][ée]servation\s+(?:pour\s+)?(?:le\s+|votre\s+)?([A-ZÀ-Ü][^<\n]{2,40}?)(?:\s+[-–]|\s*$)/,
];

for (const pattern of propertyPatterns) {
  const match = html.match(pattern) || subject.match(pattern);
  if (match) {
    propertyName = match[1].trim();
    break;
  }
}

// --- Construction de l'output ---
const result = {
  platform: 'airbnb',
  emailType,
  guestName: guestName || '[NON DETECTE]',
  checkIn: checkIn || '[NON DETECTE]',
  checkOut: checkOut || '[NON DETECTE]',
  nbGuests,
  amount,
  platformRefId: platformRefId || '[NON DETECTE]',
  propertyName: propertyName || '[NON DETECTE]',
  sourceEmailId: messageId,
  // Indicateurs de qualite du parsing
  _parseQuality: {
    guestName: !!guestName,
    dates: !!(checkIn && checkOut),
    amount: amount !== null,
    reference: !!platformRefId,
    property: !!propertyName,
  },
  _rawSubject: subject,
};

// Si des champs critiques manquent, marquer comme parsing partiel
const criticalFields = [guestName, checkIn, checkOut, platformRefId];
result._isPartialParse = criticalFields.some(f => !f);

return [result];
```

### 2.4 Node 3b : Code Node -- Parse Booking.com

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Parser email Booking` |
| **Language** | JavaScript |

**Code complet** :

```javascript
// ============================================================
// WF01 — Parse Booking.com confirmation email
// Extrait les informations de reservation depuis le HTML
// ============================================================

const html = $input.first().json.html || '';
const subject = $input.first().json.subject || '';
const messageId = $input.first().json.messageId || '';

// --- Detection du type d'email ---
let emailType = 'confirmation';

const cancelPatterns = [
  /annul(é|e|ation)/i,
  /cancel(led|lation)/i,
  /[Rr][ée]servation\s+annul[ée]e/i,
  /[Bb]ooking\s+cancell?ation/i,
];

const modifyPatterns = [
  /modifi(é|cation)/i,
  /mis(e)?\s+[àa]\s+jour/i,
  /updated/i,
  /changed/i,
  /changement/i,
];

for (const pattern of cancelPatterns) {
  if (pattern.test(subject) || pattern.test(html)) {
    emailType = 'cancellation';
    break;
  }
}

if (emailType === 'confirmation') {
  for (const pattern of modifyPatterns) {
    if (pattern.test(subject) || pattern.test(html)) {
      emailType = 'modification';
      break;
    }
  }
}

// --- Extraction du nom du voyageur ---
// Booking FR : "Nouvelle réservation de Jean Dupont"
// Booking EN : "New booking from Jean Dupont"
// Booking : "Nom du client : Jean Dupont"
let guestName = '';

const guestPatterns = [
  // "Nom du client : Jean Dupont" ou "Guest name: Jean Dupont"
  /[Nn]om\s+du\s+client\s*:\s*([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+)+)/,
  /[Gg]uest\s+name\s*:\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/,
  // "réservation de Jean Dupont"
  /r[ée]servation\s+de\s+([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+)+)/,
  // "booking from Jean Dupont"
  /booking\s+from\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i,
  // Dans le HTML
  /class="[^"]*guest[_-]?name[^"]*"[^>]*>([^<]+)</i,
  // "Client : Jean Dupont"
  /[Cc]lient\s*:\s*([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+)+)/,
  // Sujet : "Confirmation — Jean Dupont"
  /[Cc]onfirmation\s*[-–—]\s*([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+)+)/,
];

for (const pattern of guestPatterns) {
  const match = html.match(pattern) || subject.match(pattern);
  if (match) {
    guestName = match[1].trim();
    break;
  }
}

// --- Extraction des dates ---
// Booking utilise souvent : "Arrivée : lun. 15 mars 2026" et "Départ : jeu. 18 mars 2026"
// Ou en format compact : "15 mars 2026 — 18 mars 2026"
// Ou "Check-in: 2026-03-15" "Check-out: 2026-03-18"

const moisFR = {
  'janv': '01', 'janvier': '01', 'jan': '01',
  'févr': '02', 'février': '02', 'fevr': '02', 'fevrier': '02', 'fev': '02', 'feb': '02',
  'mars': '03', 'mar': '03',
  'avr': '04', 'avril': '04', 'apr': '04',
  'mai': '05', 'may': '05',
  'juin': '06', 'jun': '06',
  'juil': '07', 'juillet': '07', 'jul': '07',
  'août': '08', 'aout': '08', 'aug': '08',
  'sept': '09', 'septembre': '09', 'sep': '09',
  'oct': '10', 'octobre': '10',
  'nov': '11', 'novembre': '11',
  'déc': '12', 'décembre': '12', 'dec': '12', 'decembre': '12',
};

function parseDateFR(dateStr) {
  // Format "15 mars 2026" ou "lun. 15 mars 2026"
  const match = dateStr.match(/(\d{1,2})\s+([\wéûô]+)\.?\s+(\d{4})/);
  if (match) {
    const day = match[1].padStart(2, '0');
    const monthKey = match[2].toLowerCase().replace(/\./g, '');
    const month = moisFR[monthKey];
    const year = match[3];
    if (month) return `${year}-${month}-${day}`;
  }
  // Format YYYY-MM-DD
  const matchISO = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (matchISO) return matchISO[0];
  // Format DD/MM/YYYY
  const matchSlash = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (matchSlash) return `${matchSlash[3]}-${matchSlash[2]}-${matchSlash[1]}`;
  return null;
}

let checkIn = '';
let checkOut = '';

// Pattern 1 : "Arrivée ... date" et "Départ ... date"
const arrivalPattern = /[Aa]rriv[ée]e[^<\d]*?(\d{1,2}\s+[\wéûô]+\.?\s+\d{4})/;
const departurePattern = /[Dd][ée]part[^<\d]*?(\d{1,2}\s+[\wéûô]+\.?\s+\d{4})/;

// Pattern 2 : "Check-in ... date" et "Check-out ... date"
const checkinPattern = /[Cc]heck[\s-]?in[^<\d]*?(\d{1,2}\s+[\wéûô]+\.?\s+\d{4}|\d{4}-\d{2}-\d{2})/;
const checkoutPattern = /[Cc]heck[\s-]?out[^<\d]*?(\d{1,2}\s+[\wéûô]+\.?\s+\d{4}|\d{4}-\d{2}-\d{2})/;

// Pattern 3 : plage de dates "15 mars 2026 — 18 mars 2026"
const dateRangePattern = /(\d{1,2}\s+[\wéûô]+\.?\s+\d{4})\s*[-–—]\s*(\d{1,2}\s+[\wéûô]+\.?\s+\d{4})/;

let arrMatch = html.match(arrivalPattern);
let depMatch = html.match(departurePattern);

if (arrMatch && depMatch) {
  checkIn = parseDateFR(arrMatch[1]);
  checkOut = parseDateFR(depMatch[1]);
} else {
  arrMatch = html.match(checkinPattern);
  depMatch = html.match(checkoutPattern);
  if (arrMatch && depMatch) {
    checkIn = parseDateFR(arrMatch[1]);
    checkOut = parseDateFR(depMatch[1]);
  } else {
    const rangeMatch = html.match(dateRangePattern);
    if (rangeMatch) {
      checkIn = parseDateFR(rangeMatch[1]);
      checkOut = parseDateFR(rangeMatch[2]);
    }
  }
}

// --- Extraction du nombre de voyageurs ---
let nbGuests = 1;

const guestsPatterns = [
  /(\d+)\s+(?:voyageur|adulte|personne|guest|occupant)/i,
  /[Nn]ombre\s+de\s+(?:voyageur|personne|client)s?\s*:\s*(\d+)/,
  /[Gg]uests?\s*:\s*(\d+)/,
  /[Oo]ccupants?\s*:\s*(\d+)/,
];

for (const pattern of guestsPatterns) {
  const match = html.match(pattern);
  if (match) {
    nbGuests = parseInt(match[1] || match[2], 10);
    break;
  }
}

// --- Extraction du montant ---
// Booking FR : "Prix total : 450,00 EUR" ou "Montant : € 450,00"
// Booking EN : "Total price: EUR 450.00" ou "€ 450.00"
let amount = null;

const amountPatterns = [
  /[Pp]rix\s+total\s*:?\s*[€]?\s*([\d\s]+[.,]\d{2})\s*(?:EUR|€)?/,
  /[Tt]otal\s+(?:price|amount)\s*:?\s*(?:EUR|€)?\s*([\d\s]+[.,]\d{2})/,
  /[Mm]ontant\s+total\s*:?\s*(?:EUR|€)?\s*([\d\s]+[.,]\d{2})/,
  /[Cc]ommission[^€\d]*(?:EUR|€)\s*([\d\s]+[.,]\d{2})/,
  /(?:EUR|€)\s*([\d\s]+[.,]\d{2})/,
  /([\d\s]+[.,]\d{2})\s*(?:EUR|€)/,
];

for (const pattern of amountPatterns) {
  const match = html.match(pattern);
  if (match) {
    amount = parseFloat(match[1].replace(/\s/g, '').replace(',', '.'));
    break;
  }
}

// --- Extraction du numero de confirmation Booking ---
// Format Booking : numero a 9-10 chiffres ou format "12345678.1"
let platformRefId = '';

const refPatterns = [
  // "Numéro de confirmation : 1234567890"
  /[Nn]um[ée]ro\s+de\s+confirmation\s*:\s*(\d{7,12}(?:\.\d+)?)/,
  // "Confirmation number: 1234567890"
  /[Cc]onfirmation\s+number\s*:\s*(\d{7,12}(?:\.\d+)?)/,
  // "Réf. : 1234567890"
  /[Rr][ée]f\.?\s*:\s*(\d{7,12}(?:\.\d+)?)/,
  // "Booking reference: 1234567890"
  /[Bb]ooking\s+reference\s*:\s*(\d{7,12}(?:\.\d+)?)/,
  // Numero seul dans un element HTML specifique
  /class="[^"]*(?:confirmation|booking)[_-]?(?:number|ref)[^"]*"[^>]*>(\d{7,12}(?:\.\d+)?)</i,
  // Dans le sujet : "Confirmation #1234567890"
  /[Cc]onfirmation\s*#?\s*(\d{7,12})/,
];

for (const pattern of refPatterns) {
  const match = html.match(pattern) || subject.match(pattern);
  if (match) {
    platformRefId = match[1].trim();
    break;
  }
}

// --- Extraction du nom de la propriete ---
let propertyName = '';

const propertyPatterns = [
  // "Nom de l'hébergement : Villa Sidi Kaouki"
  /[Nn]om\s+de\s+l'(?:hébergement|h[ée]bergement|logement)\s*:\s*([^<\n]+)/,
  // "Property: Villa Sidi Kaouki"
  /[Pp]roperty\s*:\s*([^<\n]+)/,
  // "pour Villa Sidi Kaouki"
  /pour\s+(?:le\s+|votre\s+)?([A-ZÀ-Ü][^<,\n]{2,40}?)(?:\s+[àa]\s+|\s*,|\s*<)/,
  // "Reservation at Villa Sidi Kaouki"
  /(?:at|pour|chez)\s+([A-ZÀ-Ü][^<,\n]{2,40}?)(?:\s*[-–,<]|\s*$)/i,
  // Dans le sujet
  /(?:pour|at|chez)\s+([A-ZÀ-Ü][^<,\n]{2,40})/i,
];

for (const pattern of propertyPatterns) {
  const match = html.match(pattern) || subject.match(pattern);
  if (match) {
    propertyName = match[1].trim();
    break;
  }
}

// --- Construction de l'output ---
const result = {
  platform: 'booking',
  emailType,
  guestName: guestName || '[NON DETECTE]',
  checkIn: checkIn || '[NON DETECTE]',
  checkOut: checkOut || '[NON DETECTE]',
  nbGuests,
  amount,
  platformRefId: platformRefId || '[NON DETECTE]',
  propertyName: propertyName || '[NON DETECTE]',
  sourceEmailId: messageId,
  _parseQuality: {
    guestName: !!guestName,
    dates: !!(checkIn && checkOut),
    amount: amount !== null,
    reference: !!platformRefId,
    property: !!propertyName,
  },
  _rawSubject: subject,
};

const criticalFields = [guestName, checkIn, checkOut, platformRefId];
result._isPartialParse = criticalFields.some(f => !f);

return [result];
```

### 2.5 Node 3c : Code Node -- Email inconnu

```javascript
// Log l'email non reconnu et preparer l'alerte
const from = $input.first().json.from || 'inconnu';
const subject = $input.first().json.subject || '(sans sujet)';
const date = $input.first().json.date || new Date().toISOString();

return [{
  alertType: 'unknown_email',
  from,
  subject,
  date,
  message: `Email non reconnu recu de ${from} : "${subject}"`,
}];
```

### 2.6 Node 4 : Switch (type d'email)

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Type email` |
| **Value** | `{{ $json.emailType }}` |

| Regle | Condition | Action |
|-------|-----------|--------|
| confirmation | `= confirmation` | Output 0 |
| modification | `= modification` | Output 1 |
| cancellation | `= cancellation` | Output 2 |

### 2.7 Node 5 : Set Nodes (preparation du payload)

**Confirmation / Modification** :

```javascript
// Preparer le payload pour l'API webhook
const data = $input.first().json;

return [{
  json: {
    platform: data.platform,
    platformRefId: data.platformRefId,
    propertyName: data.propertyName,
    guestName: data.guestName,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    nbGuests: data.nbGuests,
    amount: data.amount,
    currency: 'EUR',
    status: 'confirmed',
    sourceType: 'email_parse',
    sourceEmailId: data.sourceEmailId,
  }
}];
```

**Annulation** :

```javascript
const data = $input.first().json;

return [{
  json: {
    platform: data.platform,
    platformRefId: data.platformRefId,
    propertyName: data.propertyName,
    guestName: data.guestName,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    nbGuests: data.nbGuests,
    amount: data.amount,
    currency: 'EUR',
    status: 'cancelled',
    sourceType: 'email_parse',
    sourceEmailId: data.sourceEmailId,
  }
}];
```

### 2.8 Node 6 : HTTP Request (appel webhook reservation)

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Upsert reservation` |
| **Method** | POST |
| **URL** | `{{ $env.DASHBOARD_URL }}/api/webhooks/n8n/reservation` |
| **Authentication** | Header Auth (`API Key - Dashboard`) |
| **Body Type** | JSON |
| **Body** | `{{ $json }}` |
| **Retry on Fail** | Oui, 2 retries, delai 5000 ms |

### 2.9 Node 7 : IF (nouvelle reservation ?)

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Nouvelle reservation ?` |
| **Condition** | `{{ $json.action }}` est egal a `created` |

### 2.10 Nodes 8a/8b : HTTP Request (appel WF04 + WF05)

**Appel WF04 (creation tache menage)** :

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Creer tache menage` |
| **Method** | POST |
| **URL** | URL du webhook WF04 (generee par n8n) |
| **Body** | `{{ $json.reservation }}` |

> **Note** : L'API `/api/webhooks/n8n/reservation` cree deja automatiquement une tache de menage `checkout_clean` lors d'une insertion. Le WF04 est utilise pour la creation de taches supplementaires (ex: `checkin_prep`) et l'assignation au staff.

**Appel WF05 (message confirmation)** :

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Envoyer confirmation voyageur` |
| **Method** | POST |
| **URL** | URL du webhook WF05 (generee par n8n) |
| **Body** :

```json
{
  "triggerType": "confirmation",
  "reservationId": "{{ $json.reservation.id }}",
  "propertyId": "{{ $json.reservation.property_id }}",
  "guestName": "{{ $node['Parser email Airbnb'].json.guestName }}",
  "guestEmail": "{{ $node['Parser email Airbnb'].json.guestEmail }}",
  "checkIn": "{{ $json.reservation.check_in }}",
  "checkOut": "{{ $json.reservation.check_out }}"
}
```

---

## 3. Gestion des erreurs

### 3.1 Parsing partiel

Si le Code Node detecte que des champs critiques manquent (`_isPartialParse === true`), un branchement conditionnel envoie un email d'alerte au proprietaire avec :

- Le sujet original de l'email
- Les champs detectes et les champs manquants
- Un lien vers la page de creation manuelle de reservation

```javascript
// Node conditionnel apres le parsing
if ($json._isPartialParse) {
  // Envoyer alerte au proprietaire
  return [{
    to: $env.OWNER_EMAIL,
    subject: '[Loc Immo] Parsing partiel - verification requise',
    body: `Un email de ${$json.platform} n'a pas pu etre entierement parse.\n\n` +
      `Sujet : ${$json._rawSubject}\n` +
      `Voyageur : ${$json.guestName}\n` +
      `Dates : ${$json.checkIn} -> ${$json.checkOut}\n` +
      `Reference : ${$json.platformRefId}\n` +
      `Propriete : ${$json.propertyName}\n\n` +
      `Veuillez verifier et completer manuellement si necessaire :\n` +
      `${$env.DASHBOARD_URL}/dashboard/reservations/new`,
  }];
}
```

### 3.2 Erreur HTTP (webhook)

Le node HTTP est configure avec :
- **Retry on Fail** : 2 tentatives avec un delai de 5 secondes
- **Continue on Fail** : Non (l'erreur doit etre traitee)
- **Error Workflow** : En cas d'echec apres les retries, l'Error Trigger declenche un email au proprietaire

### 3.3 Error Trigger (global)

Configurer un **Error Trigger** au niveau du workflow :

```javascript
// Email d'alerte en cas d'erreur non geree
return [{
  to: $env.OWNER_EMAIL,
  subject: '[Loc Immo] ERREUR - WF01 Email Parser',
  body: `Le workflow d'email parsing a rencontre une erreur.\n\n` +
    `Erreur : ${$json.error?.message || 'Inconnue'}\n` +
    `Node : ${$json.error?.node || 'Inconnu'}\n` +
    `Heure : ${new Date().toISOString()}\n\n` +
    `Verifiez les executions n8n pour plus de details.`,
}];
```

---

## 4. Exemples de emails et resultats attendus

### 4.1 Airbnb -- Confirmation

**Sujet** : `Reservation confirmee -- Jean Dupont arrive le 15 mars`

**Resultat attendu** :
```json
{
  "platform": "airbnb",
  "emailType": "confirmation",
  "guestName": "Jean Dupont",
  "checkIn": "2026-03-15",
  "checkOut": "2026-03-18",
  "nbGuests": 2,
  "amount": 450.00,
  "platformRefId": "HMAB12CD34",
  "propertyName": "Villa Sidi Kaouki",
  "status": "confirmed"
}
```

### 4.2 Booking.com -- Annulation

**Sujet** : `Annulation de reservation -- Confirmation #1234567890`

**Resultat attendu** :
```json
{
  "platform": "booking",
  "emailType": "cancellation",
  "guestName": "Marie Martin",
  "checkIn": "2026-04-01",
  "checkOut": "2026-04-05",
  "nbGuests": 1,
  "amount": 320.00,
  "platformRefId": "1234567890",
  "propertyName": "Appartement Marais",
  "status": "cancelled"
}
```

---

## 5. Maintenance et evolution

### 5.1 Mise a jour des patterns regex

Les plateformes modifient periodiquement le format de leurs emails. En cas de changement :

1. Recuperer un email recent non parse (log d'erreur ou email d'alerte)
2. Identifier les nouveaux patterns dans le HTML
3. Mettre a jour le Code Node correspondant
4. Tester avec l'execution manuelle de n8n
5. Documenter le changement ici

### 5.2 Fallback LLM (Phase 2)

En Phase 2, un fallback par LLM (via l'API OpenAI ou Anthropic) sera ajoute :

1. Si le parsing regex echoue sur un ou plusieurs champs critiques
2. Envoyer le HTML brut a un LLM avec un prompt d'extraction structure
3. Valider la reponse du LLM avant injection en base
4. Cout estime : ~0.01 EUR par email parse

### 5.3 Nouveaux expediteurs

Pour ajouter le support d'une nouvelle plateforme (ex: Abritel, Vrbo) :

1. Ajouter une nouvelle branche dans le Switch Node
2. Creer un nouveau Code Node de parsing
3. Ajouter `'nouvelle_plateforme'` aux enums PostgreSQL
4. Tester avec un echantillon d'emails

---

*Document genere le 2026-02-12 -- Pipeline B04-Automations / WF01*
