// ============================================================
// WF01 — Parse Airbnb email (v2 - adapte au format reel)
// IMPORTANT: utilise textHtml (pas html) pour IMAP v2
// ============================================================

var html = $input.first().json.textHtml || $input.first().json.html || "";
var subject = $input.first().json.subject || "";
var messageId = $input.first().json.messageId || "";

// --- Detection du type d email ---
var emailType = "confirmation";

// "En attente" ou "demande" = pending
if (/en attente/i.test(subject) || /demande de r/i.test(subject)) {
  emailType = "confirmation"; // on traite comme confirmation pour creer la resa
}
if (/annul/i.test(subject) || /cancel/i.test(subject)) {
  emailType = "cancellation";
}
if (/modifi/i.test(subject) || /updated/i.test(subject) || /changed/i.test(subject)) {
  emailType = "modification";
}

// --- Extraction du nom du voyageur ---
var guestName = "";

// Pattern 1: "demande de Alexis" ou "demande de Jean Dupont"
var m = subject.match(/demande de ([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)/);
if (m) guestName = m[1].trim();

// Pattern 2: dans le HTML "demande de Alexis"
if (!guestName) {
  m = html.match(/demande de ([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)/);
  if (m) guestName = m[1].trim();
}

// Pattern 3: "a reserve" ou "a r\u00e9serv\u00e9"
if (!guestName) {
  m = html.match(/([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)\s+a\s+r[e\u00e9]serv/);
  if (m) guestName = m[1].trim();
}

// Pattern 4: aria-label avec un prenom
if (!guestName) {
  m = html.match(/aria-label="([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)"/);
  if (m) guestName = m[1].trim();
}

// Pattern 5: "Votre voyageur : Xxx"
if (!guestName) {
  m = html.match(/voyageur\s*:\s*([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)/i);
  if (m) guestName = m[1].trim();
}

// --- Extraction des dates ---
var moisFR = {
  "janv": "01", "janvier": "01", "jan": "01",
  "f\u00e9vr": "02", "fevr": "02", "f\u00e9vrier": "02", "fevrier": "02", "fev": "02", "feb": "02",
  "mars": "03", "mar": "03",
  "avr": "04", "avril": "04", "apr": "04",
  "mai": "05", "may": "05",
  "juin": "06", "jun": "06",
  "juil": "07", "juillet": "07", "jul": "07",
  "ao\u00fbt": "08", "aout": "08", "aug": "08",
  "sept": "09", "septembre": "09", "sep": "09",
  "oct": "10", "octobre": "10",
  "nov": "11", "novembre": "11",
  "d\u00e9c": "12", "d\u00e9cembre": "12", "dec": "12", "decembre": "12"
};

function getMonth(str) {
  var key = str.toLowerCase().replace(/\./g, "");
  return moisFR[key] || null;
}

var checkIn = "";
var checkOut = "";

// Pattern 1: format compact "19\u201320 f\u00e9vr. 2026" (jour\u2013jour mois annee)
m = subject.match(/(\d{1,2})\s*[\u2013\u2014-]\s*(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})/);
if (!m) m = html.match(/(\d{1,2})\s*[\u2013\u2014-]\s*(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})/);
if (m) {
  var month = getMonth(m[3]);
  if (month) {
    checkIn = m[4] + "-" + month + "-" + m[1].padStart(2, "0");
    checkOut = m[4] + "-" + month + "-" + m[2].padStart(2, "0");
  }
}

// Pattern 2: format complet "19 f\u00e9vr. 2026 \u2013 20 f\u00e9vr. 2026"
if (!checkIn) {
  m = (subject + " " + html).match(/(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})\s*[\u2013\u2014-]\s*(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})/);
  if (m) {
    var m1 = getMonth(m[2]);
    var m2 = getMonth(m[5]);
    if (m1) checkIn = m[3] + "-" + m1 + "-" + m[1].padStart(2, "0");
    if (m2) checkOut = m[6] + "-" + m2 + "-" + m[4].padStart(2, "0");
  }
}

// Pattern 3: "Arriv\u00e9e" et "D\u00e9part" dans le HTML
if (!checkIn) {
  var arrM = html.match(/[Aa]rriv[e\u00e9]e[^<\d]*?(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})/);
  var depM = html.match(/[Dd][e\u00e9]part[^<\d]*?(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})/);
  if (arrM) {
    var am = getMonth(arrM[2]);
    if (am) checkIn = arrM[3] + "-" + am + "-" + arrM[1].padStart(2, "0");
  }
  if (depM) {
    var dm = getMonth(depM[2]);
    if (dm) checkOut = depM[3] + "-" + dm + "-" + depM[1].padStart(2, "0");
  }
}

// --- Extraction du nombre de voyageurs ---
var nbGuests = 1;
m = html.match(/(\d+)\s+voyageur/i);
if (!m) m = html.match(/(\d+)\s+guest/i);
if (!m) m = html.match(/voyageurs?\s*:\s*(\d+)/i);
if (m) nbGuests = parseInt(m[1], 10);

// --- Extraction du montant ---
var amount = null;
m = html.match(/[Tt]otal[^0-9\u20ac]*[\u20ac]?\s*([\d\s]+[.,]\d{2})\s*[\u20acEUR]?/);
if (!m) m = html.match(/[Rr]evenus?\s*:?\s*[\u20ac]?\s*([\d\s]+[.,]\d{2})/);
if (!m) m = html.match(/[\u20acEUR]\s*([\d\s]+[.,]\d{2})/);
if (!m) m = html.match(/([\d\s]+[.,]\d{2})\s*[\u20acEUR]/);
if (m) {
  amount = parseFloat(m[1].replace(/\s/g, "").replace(",", "."));
}

// --- Extraction de la reference Airbnb ---
// Format: HMXXXXXXXXXX dans les URLs
var platformRefId = "";
m = html.match(/reservations\/details\/(HM[A-Z0-9]+)/);
if (!m) m = html.match(/\b(HM[A-Z0-9]{6,12})\b/);
if (!m) m = subject.match(/\b(HM[A-Z0-9]{6,12})\b/);
if (!m) m = html.match(/[Cc]ode\s+de\s+confirmation\s*:?\s*([A-Z0-9]{8,14})/);
if (!m) m = html.match(/[Cc]onfirmation\s+code\s*:?\s*([A-Z0-9]{8,14})/);
if (m) platformRefId = m[1].trim();

// --- Extraction du nom de la propriete ---
var propertyName = "";

// Pattern 1: sujet "l annonce Villa Sidi Kaouki"
m = subject.match(/l'annonce\s+(.+?)\s+pour\s/i);
if (!m) m = subject.match(/annonce\s+(.+?)\s+pour\s/i);
if (!m) m = subject.match(/concernant\s+(.+?)\s+pour\s/i);

// Pattern 2: "votre logement X"
if (!m) m = html.match(/votre\s+(?:logement|bien|propri[e\u00e9]t[e\u00e9]|appartement|studio|maison|annonce)\s+([^<\n"]+)/i);

// Pattern 3: "Logement : X"
if (!m) m = html.match(/[Ll]ogement\s*:\s*([^<\n]+)/);

if (m) {
  propertyName = m[1].trim();
  // Nettoyer les guillemets
  propertyName = propertyName.replace(/["\u00ab\u00bb]/g, "").trim();
}

// --- Construction de l output ---
var result = {
  platform: "airbnb",
  emailType: emailType,
  guestName: guestName || "[NON DETECTE]",
  checkIn: checkIn || "[NON DETECTE]",
  checkOut: checkOut || "[NON DETECTE]",
  nbGuests: nbGuests,
  amount: amount,
  platformRefId: platformRefId || "[NON DETECTE]",
  propertyName: propertyName || "[NON DETECTE]",
  sourceEmailId: messageId,
  _parseQuality: {
    guestName: !!guestName,
    dates: !!(checkIn && checkOut),
    amount: amount !== null,
    reference: !!platformRefId,
    property: !!propertyName
  },
  _rawSubject: subject
};

var criticalFields = [guestName, checkIn, checkOut, platformRefId];
result._isPartialParse = criticalFields.some(function(f) { return !f; });

return [{json: result}];
