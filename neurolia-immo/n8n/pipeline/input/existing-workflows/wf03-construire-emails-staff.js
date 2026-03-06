// ============================================================
// WF03 — Construire emails staff
// Regrouper les taches par staff assigne
// ============================================================

const tasks = $("Taches menage aujourd'hui + demain").all().map(i => i.json);
const allUsers = $("Get tous les owners").all().map(i => i.json);
const properties = $("Get properties").all().map(i => i.json);

// Combiner toutes les reservations pour lookup
const allReservations = [
  ...$("Check-ins aujourd'hui").all().map(i => i.json),
  ...$("Check-outs aujourd'hui").all().map(i => i.json),
  ...$("Check-ins demain").all().map(i => i.json),
];
const resvMap = {};
for (const r of allReservations) {
  resvMap[r.id] = r;
}

// Lookups
const userMap = {};
for (const u of allUsers) {
  userMap[u.id] = u;
}
const propMap = {};
for (const p of properties) {
  propMap[p.id] = p;
}

// Regrouper par staff
const staffMap = new Map();

for (const task of tasks) {
  if (task.status === "completed") continue;
  if (!task.assigned_to) continue;

  const staffId = task.assigned_to;
  const staffUser = userMap[staffId];

  if (!staffMap.has(staffId)) {
    staffMap.set(staffId, {
      staffId,
      staffName: staffUser ? staffUser.full_name : "Inconnu",
      staffEmail: staffUser ? staffUser.email : null,
      tasks: [],
    });
  }

  const prop = propMap[task.property_id] || {};
  const resv = resvMap[task.reservation_id] || {};

  staffMap.get(staffId).tasks.push({
    propertyName: prop.name || "-",
    propertyAddress: prop.address || "-",
    propertyCity: prop.city || "-",
    accessCode: prop.access_code || "-",
    wifiSsid: prop.wifi_ssid || "-",
    wifiPassword: prop.wifi_password || "-",
    type: task.task_type || task.type,
    scheduledDate: task.scheduled_date,
    nbGuests: resv.nb_guests || "-",
    arrivalTime: resv.arrival_time || "non renseignee",
    guestName: resv.guest_name || "-",
    specialRequests: resv.special_requests || null,
    notes: task.notes || null,
  });
}

// Construire un email par staff
var emails = [];
var todayStr = new Date().toLocaleDateString("fr-FR", {
  weekday: "long", day: "numeric", month: "long"
});

for (const [, staff] of staffMap) {
  if (!staff.staffEmail) continue;

  var firstName = staff.staffName.split(" ")[0];
  var html = "<div style=\"font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;\">";
  html += "<h1 style=\"color: #1a1a2e;\">Bonjour " + firstName + ",</h1>";
  html += "<p>Voici ton planning pour aujourdhui et demain.</p>";

  for (const task of staff.tasks) {
    var typeLabel = "Menage";
    if (task.type === "checkout_clean") typeLabel = "Menage depart";
    if (task.type === "checkin_prep") typeLabel = "Preparation arrivee";

    var todayDate = new Date().toISOString().slice(0, 10);
    var isToday = (task.scheduledDate === todayDate);
    var dateLabel = isToday ? "Aujourdhui" : "Demain";
    var borderColor = isToday ? "#dc2626" : "#3b82f6";

    html += "<div style=\"margin: 16px 0; padding: 16px; background: #f9fafb; border-radius: 8px; border-left: 4px solid " + borderColor + ";\">";
    html += "<h3 style=\"margin: 0 0 8px 0;\">" + typeLabel + " - " + dateLabel + " (" + task.scheduledDate + ")</h3>";
    html += "<p style=\"margin: 4px 0;\"><strong>Logement :</strong> " + task.propertyName + "</p>";
    html += "<p style=\"margin: 4px 0;\"><strong>Adresse :</strong> ";
    html += "<a href=\"https://maps.google.com/?q=" + encodeURIComponent(task.propertyAddress + ", " + task.propertyCity) + "\">";
    html += task.propertyAddress + ", " + task.propertyCity + "</a></p>";
    html += "<p style=\"margin: 4px 0;\"><strong>Code acces :</strong> " + task.accessCode + "</p>";
    html += "<p style=\"margin: 4px 0;\"><strong>Wifi :</strong> " + task.wifiSsid + " / " + task.wifiPassword + "</p>";
    html += "<p style=\"margin: 4px 0;\"><strong>Voyageur :</strong> " + task.guestName + " (" + task.nbGuests + " pers.)</p>";
    html += "<p style=\"margin: 4px 0;\"><strong>Heure arrivee :</strong> " + task.arrivalTime + "</p>";

    if (task.specialRequests) {
      html += "<div style=\"margin-top: 8px; padding: 8px; background: #fef3c7; border-radius: 4px;\">";
      html += "<strong>Demande speciale :</strong> " + task.specialRequests + "</div>";
    }

    if (task.notes) {
      html += "<p style=\"margin: 8px 0 0 0; color: #6b7280;\"><em>Notes : " + task.notes + "</em></p>";
    }

    html += "</div>";
  }

  html += "</div>";

  emails.push({
    json: {
      to: staff.staffEmail,
      subject: "[Loc Immo] Ton planning - " + todayStr + " (" + staff.tasks.length + " tache(s))",
      html: html,
      staffName: staff.staffName,
    }
  });
}

if (emails.length === 0) {
  return [{ json: { warning: "Aucun email staff a envoyer" } }];
}

return emails;
