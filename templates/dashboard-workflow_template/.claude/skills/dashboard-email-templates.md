---
name: dashboard-email-templates
description: Templates HTML email transactionnels et composants reutilisables. Use when building email HTML, assembling email components, or converting design tokens to inline styles.
---

# Skill : dashboard-email-templates

Templates HTML responsifs pour les emails transactionnels, compatibles avec le noeud `emailSend` (v2.2+) de n8n.

> **Principe** : Les emails doivent refleter l'identite visuelle du dashboard. Les tokens CSS ne fonctionnent pas dans les emails — on les convertit en valeurs inline.

> **Skills associes** :
> - `dashboard-email-design` — methodologie de contenu, brief obligatoire, processus design-first
> - `dashboard-email-n8n` — configuration emailSend n8n, emails auth Supabase

---

## 1. Mapping tokens CSS → inline email

Extraire les valeurs depuis `app/globals.css` et les injecter en inline :

| Token CSS (globals.css) | Usage email | Exemple valeur |
|------------------------|-------------|----------------|
| `--color-primary` | Boutons CTA, liens, header bar | `#3B82F6` |
| `--color-primary-foreground` | Texte sur bouton CTA | `#FFFFFF` |
| `--bg-surface` | Fond du contenu email | `#FFFFFF` |
| `--bg-app` | Fond externe (wrapper) | `#F3F4F6` |
| `--text-primary` | Texte principal | `#1F2937` |
| `--text-secondary` | Texte secondaire | `#6B7280` |
| `--text-muted` | Texte discret (footer, mentions) | `#9CA3AF` |
| `--border-subtle` | Separateurs, bordures sections | `#E5E7EB` |
| `--font-ui` | Font-family body | `Arial, Helvetica, sans-serif` |
| `--radius-lg` | Border-radius boutons | `8px` |

**IMPORTANT** : Les polices Google Fonts ne sont pas fiables dans les emails. Utiliser `Arial, Helvetica, sans-serif` comme fallback systematique.

---

## 2. Structure HTML email — Template de base

Ce template est compatible avec tous les clients email majeurs (Gmail, Outlook, Apple Mail, Yahoo).

```html
<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>[SUJET_EMAIL]</title>
  <!--[if mso]>
  <style>table,td {font-family: Arial, sans-serif !important;}</style>
  <![endif]-->
  <style>
    /* Reset email client defaults */
    body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; }

    /* Responsive */
    @media only screen and (max-width: 600px) {
      .wrapper { width: 100% !important; }
      .content { padding: 16px !important; }
      .btn { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:[BG_APP]; font-family:Arial, Helvetica, sans-serif;">

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:[BG_APP];">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <!-- Container 600px -->
        <table role="presentation" class="wrapper" width="600" cellpadding="0" cellspacing="0" style="background-color:[BG_SURFACE]; border-radius:8px; overflow:hidden;">

          <!-- Header bar -->
          <tr>
            <td style="background-color:[COLOR_PRIMARY]; padding:24px 32px; text-align:center;">
              <h1 style="margin:0; color:[COLOR_PRIMARY_FG]; font-size:20px; font-weight:600;">
                [NOM_PROJET]
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="content" style="padding:32px;">
              [CONTENU_EMAIL]
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px; border-top:1px solid [BORDER_SUBTLE]; text-align:center;">
              <p style="margin:0; font-size:12px; color:[TEXT_MUTED]; line-height:1.5;">
                [NOM_PROJET] — [DESCRIPTION_COURTE]<br />
                <a href="[URL_DASHBOARD]" style="color:[TEXT_MUTED]; text-decoration:underline;">Acceder au dashboard</a>
              </p>
            </td>
          </tr>

        </table><!-- /Container -->

      </td>
    </tr>
  </table><!-- /Wrapper -->

</body>
</html>
```

---

## 3. Composants email reutilisables

### Bouton CTA

```html
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
  <tr>
    <td align="center" style="background-color:[COLOR_PRIMARY]; border-radius:[RADIUS_LG]; padding:12px 32px;">
      <a href="[URL_ACTION]" target="_blank" style="color:[COLOR_PRIMARY_FG]; text-decoration:none; font-size:14px; font-weight:600; display:inline-block;">
        [TEXTE_BOUTON]
      </a>
    </td>
  </tr>
</table>
```

### Bloc information (key-value)

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0; border:1px solid [BORDER_SUBTLE]; border-radius:8px; overflow:hidden;">
  <tr>
    <td style="padding:12px 16px; background-color:[BG_SUBTLE]; border-bottom:1px solid [BORDER_SUBTLE];">
      <strong style="font-size:14px; color:[TEXT_PRIMARY];">[TITRE_BLOC]</strong>
    </td>
  </tr>
  <tr>
    <td style="padding:16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:4px 0; font-size:13px; color:[TEXT_SECONDARY]; width:40%;">[LABEL_1]</td>
          <td style="padding:4px 0; font-size:13px; color:[TEXT_PRIMARY]; font-weight:500;">[VALEUR_1]</td>
        </tr>
        <tr>
          <td style="padding:4px 0; font-size:13px; color:[TEXT_SECONDARY]; width:40%;">[LABEL_2]</td>
          <td style="padding:4px 0; font-size:13px; color:[TEXT_PRIMARY]; font-weight:500;">[VALEUR_2]</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

### Alerte / notification

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
  <tr>
    <td style="padding:16px; background-color:[COLOR_WARNING_LIGHT]; border-left:4px solid [COLOR_WARNING]; border-radius:0 8px 8px 0;">
      <p style="margin:0; font-size:13px; color:[TEXT_PRIMARY]; line-height:1.5;">
        <strong>[TITRE_ALERTE]</strong><br />
        [MESSAGE_ALERTE]
      </p>
    </td>
  </tr>
</table>
```

---

## 4. Anti-patterns techniques

- **NE PAS** utiliser CSS Grid ou Flexbox dans les emails
- **NE PAS** utiliser `<div>` comme conteneur principal (utiliser `<table>`)
- **NE PAS** utiliser des polices Google Fonts (fallback Arial)
- **NE PAS** utiliser les tokens CSS `var(--xxx)` (convertir en valeurs inline)
- **NE PAS** utiliser `margin` sur les `<table>` (utiliser `padding` sur `<td>`)
- **NE PAS** depasser 600px de largeur (standard email)
- **NE PAS** oublier `role="presentation"` sur les tables de mise en page
- **NE PAS** utiliser `={{ }}` dans le HTML inline du noeud emailSend (utiliser `{{ }}` sans `=`)
