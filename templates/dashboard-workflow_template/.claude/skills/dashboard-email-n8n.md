---
name: dashboard-email-n8n
description: Configuration du noeud emailSend n8n et personnalisation des emails auth Supabase. Use when wiring emails in n8n workflows, configuring SMTP, setting up emailSend nodes, or customizing Supabase authentication emails.
---

# Skill : dashboard-email-n8n

Configuration technique pour l'envoi d'emails via n8n et la personnalisation des emails d'authentification Supabase.

> **Skills associes** :
> - `dashboard-email-templates` — templates HTML, composants, mapping tokens
> - `dashboard-email-design` — methodologie de contenu, brief obligatoire, processus design-first

---

## 1. Configuration dans n8n emailSend (v2.2+)

### Parametres du noeud emailSend

```json
{
  "type": "n8n-nodes-base.emailSend",
  "typeVersion": 2.2,
  "parameters": {
    "fromEmail": "={{ $vars.SMTP_FROM || 'noreply@[DOMAIN]' }}",
    "toEmail": "={{ $json.email }}",
    "subject": "[SUJET] — {{ $json.dynamicPart }}",
    "emailFormat": "html",
    "html": "[CONTENU_HTML_COMPLET]",
    "options": {
      "appendAttribution": false
    }
  },
  "credentials": {
    "smtp": {
      "id": "[CRED_ID]",
      "name": "SMTP [PROVIDER]"
    }
  }
}
```

### Points cles

- `emailFormat: "html"` — obligatoire pour envoyer du HTML
- Le champ `html` accepte du HTML avec des expressions n8n `{{ }}`
- Toujours fournir une version `text` en alternative (champ `text` du noeud)
- Les expressions n8n dans le HTML : `{{ $json.field }}` (pas de `=` prefix dans le HTML inline)
- Pour les URLs dynamiques : `href="{{ $json.link }}"` (pas de `={{ }}`)

### Version texte

Toujours ajouter le champ `text` avec une version plain text :

```
Bonjour {{ $json.userName }},

{{ $json.message }}

Acceder au dashboard : {{ $json.dashboardUrl }}

---
[NOM_PROJET] — [DESCRIPTION_COURTE]
```

---

## 2. Emails auth Supabase (personnalisation)

Les emails natifs Supabase (confirmation, reset password, magic link) se configurent dans **Supabase Dashboard > Authentication > Email Templates**.

### Template Supabase — Confirmation email

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:[BG_APP]; font-family:Arial, sans-serif;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:[BG_SURFACE]; border-radius:8px;">
      <tr><td style="background-color:[COLOR_PRIMARY]; padding:24px 32px; text-align:center;">
        <h1 style="margin:0; color:[COLOR_PRIMARY_FG]; font-size:20px;">Confirmez votre email</h1>
      </td></tr>
      <tr><td style="padding:32px;">
        <p style="font-size:14px; color:[TEXT_SECONDARY]; line-height:1.6;">
          Cliquez sur le bouton ci-dessous pour confirmer votre adresse email.
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
          <tr><td style="background-color:[COLOR_PRIMARY]; border-radius:8px; padding:12px 32px;">
            <a href="{{ .ConfirmationURL }}" style="color:[COLOR_PRIMARY_FG]; text-decoration:none; font-size:14px; font-weight:600;">
              Confirmer mon email
            </a>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:24px 32px; border-top:1px solid [BORDER_SUBTLE]; text-align:center;">
        <p style="margin:0; font-size:12px; color:[TEXT_MUTED];">[NOM_PROJET]</p>
      </td></tr>
    </table>
  </td></tr>
</table>
```

**Note** : Supabase utilise la syntaxe Go template `{{ .ConfirmationURL }}`, `{{ .Token }}` — differente de n8n.
