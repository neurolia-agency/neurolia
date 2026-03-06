# Node: Code: Format Error

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$('Error Trigger')` et `$('Config')` |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par erreur |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF00 — Format error message and detect severity
// ============================================================

const errorData = $('Error Trigger').item.json;
const config = $('Config').item.json;

const execution = errorData.execution || {};
const workflow = errorData.workflow || {};
const error = execution.error || {};
const errorNode = error.node || {};

const workflowName = workflow.name || 'Unknown Workflow';
const nodeName = errorNode.name || execution.lastNodeExecuted || 'Unknown Node';
const errorMessage = error.message || 'Unknown error';
const executionId = execution.id || 'N/A';
const executionUrl = execution.url || '';
const timestamp = new Date().toISOString();

// --- Detect severity ---
const criticalPatterns = [
  /ECONNREFUSED/i,
  /supabase/i,
  /IMAP.*connection/i,
  /API.*unreachable/i,
  /ETIMEDOUT/i,
  /502\s+Bad\s+Gateway/i,
  /503\s+Service\s+Unavailable/i,
  /authentication.*fail/i,
  /credential.*invalid/i
];

const isCritical = criticalPatterns.some(pattern => pattern.test(errorMessage));
const severity = isCritical ? 'critical' : 'warning';

// --- Build severity label ---
const severityLabel = severity === 'critical' ? 'CRITIQUE' : 'WARNING';
const severityColor = severity === 'critical' ? '#dc2626' : '#f59e0b';

// --- Build recommended action ---
let recommendedAction = 'Verifier les logs dans n8n et relancer manuellement si necessaire.';
if (/ECONNREFUSED|ETIMEDOUT/i.test(errorMessage)) {
  recommendedAction = 'Verifier la connectivite reseau et le statut du service cible.';
} else if (/supabase/i.test(errorMessage)) {
  recommendedAction = 'Verifier le statut Supabase : https://status.supabase.com';
} else if (/IMAP/i.test(errorMessage)) {
  recommendedAction = 'Verifier les credentials IMAP et la connexion au serveur email.';
} else if (/authentication|credential/i.test(errorMessage)) {
  recommendedAction = 'Verifier les credentials dans les settings n8n.';
} else if (/timeout/i.test(errorMessage)) {
  recommendedAction = 'Le service est probablement lent. L\'execution sera retentee au prochain cycle.';
}

// --- Build email HTML ---
const html = `
<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:${severityColor};color:#fff;padding:16px;border-radius:8px 8px 0 0;">
    <h2 style="margin:0;">[${severityLabel}] Erreur Workflow</h2>
  </div>
  <div style="padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px;font-weight:bold;">Workflow</td><td style="padding:8px;">${workflowName}</td></tr>
      <tr style="background:#f3f4f6;"><td style="padding:8px;font-weight:bold;">Node</td><td style="padding:8px;">${nodeName}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Erreur</td><td style="padding:8px;color:#dc2626;">${errorMessage}</td></tr>
      <tr style="background:#f3f4f6;"><td style="padding:8px;font-weight:bold;">Execution</td><td style="padding:8px;">#${executionId}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Timestamp</td><td style="padding:8px;">${new Date(timestamp).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</td></tr>
      <tr style="background:#f3f4f6;"><td style="padding:8px;font-weight:bold;">Severite</td><td style="padding:8px;"><span style="background:${severityColor};color:#fff;padding:2px 8px;border-radius:4px;">${severityLabel}</span></td></tr>
    </table>
    <div style="margin-top:16px;padding:12px;background:#fef3c7;border-radius:6px;">
      <strong>Action recommandee :</strong> ${recommendedAction}
    </div>
    ${executionUrl ? `<p style="margin-top:16px;"><a href="${executionUrl}" style="display:inline-block;background:#1a1a2e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Voir l'execution dans n8n</a></p>` : ''}
  </div>
</div>`;

return [{
  json: {
    severity: severity,
    severityLabel: severityLabel,
    workflowName: workflowName,
    nodeName: nodeName,
    errorMessage: errorMessage,
    executionId: executionId,
    executionUrl: executionUrl,
    timestamp: timestamp,
    recommendedAction: recommendedAction,
    emailSubject: `[Neurolia-Immo] ERREUR ${severityLabel} — ${workflowName}`,
    emailHtml: html
  }
}];
```

## Sortie attendue

```json
{
  "severity": "critical",
  "severityLabel": "CRITIQUE",
  "workflowName": "WF02 — iCal Sync",
  "nodeName": "HTTP: Get Properties",
  "errorMessage": "ECONNREFUSED - connect ECONNREFUSED 127.0.0.1:5432",
  "executionId": "12345",
  "executionUrl": "https://n8n.locimmo.fr/workflow/xxx/executions/12345",
  "timestamp": "2026-02-20T10:30:00.000Z",
  "recommendedAction": "Verifier la connectivite reseau et le statut du service cible.",
  "emailSubject": "[Neurolia-Immo] ERREUR CRITIQUE — WF02 — iCal Sync",
  "emailHtml": "<div>...</div>"
}
```

## Connexions

- **Entree** : Config
- **Sortie** : Send Email
