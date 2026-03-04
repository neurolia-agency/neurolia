# Chatbot Neurolia

Chatbot IA pour le site Neurolia. Architecture hybride :
- **Frontend** : Vercel AI SDK (streaming) dans Next.js
- **Backend AI** : Claude Haiku 4.5 via API route
- **Intégrations** : n8n self-hosted pour le lead capture

## Architecture

```
[Widget Chat] → useChat() → /api/chat → Claude Haiku (streaming)
                                ↓ (lead qualifié)
                          POST webhook → n8n → Email + Sheets + Slack
```

## Fichiers

### Frontend (dans neurolia-site/)
```
app/api/chat/route.ts              # API route streaming
components/chatbot/chat-bubble.tsx  # Bouton flottant
components/chatbot/chat-panel.tsx   # Panel de conversation
components/chatbot/chat-message.tsx # Composant message
lib/chatbot/system-prompt.ts       # Prompt système
lib/chatbot/n8n-webhook.ts         # Client webhook n8n
```

### n8n Workflows
```
chatbot/n8n-workflows/
├── neurolia-lead-capture.json     # Workflow principal (11 nodes)
└── error-lead-capture.json        # Error handler (4 nodes)
```

## Setup

### 1. Variables d'environnement

```env
# .env.local (neurolia-site)
ANTHROPIC_API_KEY=sk-ant-...
N8N_WEBHOOK_URL=https://n8n.neurolia.com/webhook/chatbot-lead
N8N_WEBHOOK_SECRET=<token-partagé>
```

### 2. n8n

1. Importer `error-lead-capture.json` en premier
2. Noter l'ID du workflow d'erreur
3. Importer `neurolia-lead-capture.json`
4. Mettre à jour `settings.errorWorkflow` avec l'ID
5. Configurer les credentials :
   - Gmail OAuth2 (team@neurolia.com)
   - Google Sheets OAuth2 (spreadsheet CRM)
   - Slack OAuth2 (channels #leads + #tech-alerts)
6. Définir `N8N_WEBHOOK_SECRET` dans les env vars n8n
7. Activer les deux workflows

### 3. Google Sheets

Créer un spreadsheet "Neurolia CRM - Leads" avec les colonnes :
```
Lead ID | Timestamp | Priority | Name | Email | Company | Project Type | Budget | Timeline | Score | Conversation | Status
```

## Coûts estimés

| Composant | Coût/mois |
|-----------|-----------|
| Claude Haiku (20 leads/jour, ~10 msgs/lead) | ~5-10€ |
| n8n self-hosted | Inclus (Hostinger KVM2) |
| Gmail | Gratuit |
| Google Sheets | Gratuit |
| Slack | Gratuit (plan free) |
| **Total** | **~5-10€/mois** |
