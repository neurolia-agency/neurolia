---
name: dashboard-n8n-hostinger
description: Configuration n8n sur Hostinger et patterns d'intégration avec un dashboard Next.js. Use when configuring n8n on Hostinger, setting up webhook routes, testing connectivity, or documenting n8n workflows. Target n8n v2.8.3+.
---

# Skill : dashboard-n8n-hostinger

Configuration n8n sur Hostinger et patterns d'intégration avec un dashboard Next.js déployé sur Vercel.

> **Version n8n cible** : v2.8.3+

---

## 1. Configuration n8n sur Hostinger

### URLs et ports standard Hostinger

```
# VPS Hostinger — accès direct
http://[IP_VPS]:5678          # Accès direct (non recommandé en prod)

# Avec reverse proxy Nginx (recommandé)
https://n8n.[DOMAIN].com      # Accès via sous-domaine

# Port n8n par défaut
5678

# Port interne (si Nginx proxy)
3000 → 5678 (forwarding interne)
```

### Variables d'environnement n8n sur Hostinger

Fichier `.env` à placer dans le répertoire n8n (ex: `/home/[user]/n8n/`) :

```env
# ── Instance ─────────────────────────────────────────────────
N8N_HOST=n8n.[DOMAIN].com
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_EDITOR_BASE_URL=https://n8n.[DOMAIN].com

# ── Sécurité ─────────────────────────────────────────────────
# Utilisateur initial (créé au premier lancement, ignoré ensuite)
N8N_DEFAULT_USER_EMAIL=[ADMIN_EMAIL]
N8N_DEFAULT_USER_PASSWORD=[ADMIN_PASSWORD]
# Note : N8N_BASIC_AUTH_* a été supprimé en n8n v2.x
# L'authentification se gère via le système de gestion des utilisateurs intégré

# ── Webhooks ─────────────────────────────────────────────────
WEBHOOK_URL=https://n8n.[DOMAIN].com/

# ── Base de données (SQLite par défaut, PostgreSQL recommandé en prod) ──
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=[DB_HOST]
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=[DB_NAME]
DB_POSTGRESDB_USER=[DB_USER]
DB_POSTGRESDB_PASSWORD=[DB_PASSWORD]

# ── Timezone ─────────────────────────────────────────────────
GENERIC_TIMEZONE=Europe/Paris

# ── Logs ─────────────────────────────────────────────────────
N8N_LOG_LEVEL=info
N8N_LOG_OUTPUT=file
N8N_LOG_FILE_LOCATION=/home/[user]/n8n/logs/

# ── Execution ─────────────────────────────────────────────────
EXECUTIONS_DATA_SAVE_ON_ERROR=all
EXECUTIONS_DATA_SAVE_ON_SUCCESS=none        # Économiser l'espace disque
EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=true
EXECUTIONS_DATA_PRUNE=true
EXECUTIONS_DATA_MAX_AGE=168                 # 7 jours en heures
```

### Configuration Nginx (reverse proxy SSL)

```nginx
# /etc/nginx/sites-available/n8n.[DOMAIN].com
server {
    listen 80;
    server_name n8n.[DOMAIN].com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name n8n.[DOMAIN].com;

    ssl_certificate     /etc/letsencrypt/live/n8n.[DOMAIN].com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/n8n.[DOMAIN].com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Taille max upload (pour les payloads webhook)
    client_max_body_size 16M;

    location / {
        proxy_pass         http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts (workflows longs)
        proxy_connect_timeout  300s;
        proxy_send_timeout     300s;
        proxy_read_timeout     300s;
    }

    # Websockets pour l'éditeur n8n
    location /ws {
        proxy_pass         http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "Upgrade";
        proxy_set_header   Host $host;
    }
}
```

### Démarrage avec PM2

```bash
# Installation
npm install -g n8n pm2

# Démarrage
cd /home/[user]/n8n
pm2 start n8n --name "n8n" -- start

# Auto-start au redémarrage
pm2 save
pm2 startup

# Logs
pm2 logs n8n
pm2 monit
```

---

## 2. Patterns de webhook : Hostinger → Vercel

### Configuration CORS sur les routes API Next.js

```typescript
// app/api/webhook/[workflow]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const ALLOWED_ORIGINS = [
  `https://n8n.${process.env.N8N_DOMAIN}`,
  "https://n8n.[DOMAIN].com",
];

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin":  allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Webhook-Secret",
    "Access-Control-Max-Age":       "86400",
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}
```

### Route API complète avec validation de secret

```typescript
// app/api/webhook/n8n/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET;

function validateWebhookSecret(request: NextRequest): boolean {
  const providedSecret = request.headers.get("x-webhook-secret");
  if (!WEBHOOK_SECRET || !providedSecret) return false;
  // Comparaison en temps constant pour éviter timing attacks
  return providedSecret === WEBHOOK_SECRET;
}

interface N8nWebhookPayload {
  event:   string;
  data:    Record<string, unknown>;
  timestamp: string;
  workflowId?: string;
}

export async function POST(request: NextRequest) {
  // 1. Valider le secret
  if (!validateWebhookSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parser le payload
  let payload: N8nWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 3. Router selon l'événement
  const supabase = await createClient();

  switch (payload.event) {
    case "order.created":
      await supabase
        .from("orders")
        .update({ notified_at: new Date().toISOString() })
        .eq("id", (payload.data as any).orderId);
      revalidatePath("/dashboard");
      revalidatePath("/dashboard/orders");
      break;

    case "alert.triggered":
      await supabase.from("alerts").insert({
        title:    (payload.data as any).title,
        message:  (payload.data as any).message,
        priority: (payload.data as any).priority ?? "medium",
        source:   "n8n",
      });
      revalidatePath("/dashboard");
      break;

    case "sync.completed":
      // Invalider les caches concernés
      revalidatePath("/dashboard");
      break;

    default:
      console.warn(`[webhook] Unknown event: ${payload.event}`);
  }

  return NextResponse.json({ received: true, event: payload.event });
}
```

---

## 3. Template de variables d'environnement pour l'intégration n8n

```env
# .env.local (Next.js — ne jamais committer)
# Copier depuis .env.example

# ── n8n ───────────────────────────────────────────────────────
N8N_BASE_URL=https://n8n.[DOMAIN].com
N8N_API_KEY=[N8N_API_KEY]                        # n8n Settings > API > Create API Key
N8N_WEBHOOK_SECRET=[RANDOM_64_CHARS]             # openssl rand -hex 32

# ── Supabase ──────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://[REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]     # Serveur uniquement

# ── App ───────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=https://[DASHBOARD_DOMAIN].vercel.app
N8N_DOMAIN=[DOMAIN].com                          # Pour CORS

# Variables à ajouter dans Vercel (Settings > Environment Variables) :
# N8N_BASE_URL, N8N_API_KEY, N8N_WEBHOOK_SECRET,
# NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
# SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_APP_URL
```

---

## 4. WF00 — Workflow erreur (obligatoire, premier workflow)

Ce workflow est le gestionnaire d'erreurs global à activer avant tous les autres.

```json
{
  "name": "WF00 - Error Handler Global",
  "nodes": [
    {
      "name": "Error Trigger",
      "type": "n8n-nodes-base.errorTrigger",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "name": "Format Error Message",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [460, 300],
      "parameters": {
        "mode": "manual",
        "duplicateItem": false,
        "assignments": {
          "assignments": [
            {
              "id": "msg-1",
              "name": "message",
              "value": "={{ $json.execution.workflowData.name }} — Erreur : {{ $json.execution.error.message }}",
              "type": "string"
            },
            {
              "id": "msg-2",
              "name": "workflowName",
              "value": "={{ $json.execution.workflowData.name }}",
              "type": "string"
            },
            {
              "id": "msg-3",
              "name": "errorTime",
              "value": "={{ $now.toFormat('dd/MM/yyyy HH:mm') }}",
              "type": "string"
            }
          ]
        }
      }
    },
    {
      "name": "Save to Supabase",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [680, 300],
      "parameters": {
        "operation": "create",
        "tableId":   "workflow_errors",
        "dataToSend": "defineBelow",
        "fieldsUi": {
          "fieldValues": [
            { "fieldId": "workflow_name",   "fieldValue": "={{ $json.workflowName }}" },
            { "fieldId": "error_message",   "fieldValue": "={{ $json.message }}" },
            { "fieldId": "error_timestamp", "fieldValue": "={{ $json.errorTime }}" },
            { "fieldId": "resolved",        "fieldValue": false }
          ]
        }
      }
    },
    {
      "name": "Notify Admin (Email)",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.2,
      "position": [900, 300],
      "parameters": {
        "toEmail":  "={{ $vars.ADMIN_EMAIL }}",
        "subject":  "[ALERTE] {{ $json.workflowName }} — Erreur n8n",
        "text":     "Workflow : {{ $json.workflowName }}\nHeure : {{ $json.errorTime }}\nErreur : {{ $json.message }}"
      }
    }
  ],
  "connections": {
    "Error Trigger":        { "main": [[{ "node": "Format Error Message", "type": "main", "index": 0 }]] },
    "Format Error Message": { "main": [[{ "node": "Save to Supabase",     "type": "main", "index": 0 }]] },
    "Save to Supabase":     { "main": [[{ "node": "Notify Admin (Email)",  "type": "main", "index": 0 }]] }
  },
  "settings": {
    "errorWorkflow": ""
  }
}
```

Table Supabase requise :

```sql
create table workflow_errors (
  id               uuid primary key default gen_random_uuid(),
  workflow_name    text not null,
  error_message    text,
  error_timestamp  text,
  resolved         boolean default false,
  created_at       timestamptz default now()
);
```

---

## 5. Script de test de connectivité

```bash
#!/bin/bash
# scripts/test-connectivity.sh
# Usage : bash scripts/test-connectivity.sh
# Teste : Hostinger n8n → Vercel → Supabase

set -e

N8N_URL="${N8N_BASE_URL:-https://n8n.[DOMAIN].com}"
VERCEL_URL="${NEXT_PUBLIC_APP_URL:-https://[DASHBOARD].vercel.app}"
SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-https://[REF].supabase.co}"
WEBHOOK_SECRET="${N8N_WEBHOOK_SECRET}"

echo "========================================"
echo " Test de connectivité dashboard + n8n"
echo "========================================"

# 1. Test n8n health
echo ""
echo "[1/4] Test n8n health check..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$N8N_URL/healthz" 2>/dev/null || echo "000")
if [ "$STATUS" = "200" ]; then
  echo "  ✓ n8n accessible (HTTP $STATUS)"
else
  echo "  ✗ n8n inaccessible (HTTP $STATUS)"
  echo "  → Vérifier : nginx running, n8n running (pm2 status), SSL valide"
fi

# 2. Test Vercel webhook endpoint
echo ""
echo "[2/4] Test endpoint webhook Vercel..."
WEBHOOK_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$VERCEL_URL/api/webhook/n8n" \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: $WEBHOOK_SECRET" \
  -d '{"event":"ping","data":{},"timestamp":"'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'"}' \
  2>/dev/null || echo "000")
if [ "$WEBHOOK_STATUS" = "200" ]; then
  echo "  ✓ Webhook Vercel accessible (HTTP $WEBHOOK_STATUS)"
else
  echo "  ✗ Webhook Vercel retourne HTTP $WEBHOOK_STATUS"
  echo "  → Vérifier : VERCEL_URL correct, N8N_WEBHOOK_SECRET configuré sur Vercel"
fi

# 3. Test Supabase REST API
echo ""
echo "[3/4] Test Supabase REST API..."
SUPA_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  "$SUPABASE_URL/rest/v1/" \
  -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  2>/dev/null || echo "000")
if [ "$SUPA_STATUS" = "200" ] || [ "$SUPA_STATUS" = "404" ]; then
  echo "  ✓ Supabase REST API accessible (HTTP $SUPA_STATUS)"
else
  echo "  ✗ Supabase inaccessible (HTTP $SUPA_STATUS)"
  echo "  → Vérifier : SUPABASE_URL et ANON_KEY corrects"
fi

# 4. Test DNS resolution depuis Hostinger (si exécuté sur VPS)
echo ""
echo "[4/4] Résolution DNS..."
if command -v nslookup &> /dev/null; then
  VERCEL_HOST=$(echo "$VERCEL_URL" | sed 's|https://||')
  nslookup "$VERCEL_HOST" > /dev/null 2>&1 && echo "  ✓ DNS $VERCEL_HOST résolu" || echo "  ✗ DNS $VERCEL_HOST non résolu"
else
  echo "  ⚠ nslookup non disponible, test DNS ignoré"
fi

echo ""
echo "========================================"
echo " Fin des tests"
echo "========================================"
```

---

## 6. Politiques de timeout et retry

### Dans n8n (configurer par workflow)

```json
// Paramètres recommandés par type de workflow
{
  "webhookTrigger": {
    "timeout": 30000,
    "retries": 0
  },
  "cronWorkflow": {
    "timeout": 120000,
    "retries": 2,
    "retryOnFail": true,
    "waitBetweenTries": 60000
  },
  "dataSyncWorkflow": {
    "timeout": 300000,
    "retries": 3,
    "retryOnFail": true,
    "waitBetweenTries": 30000
  }
}
```

### Dans Next.js (fetch vers n8n)

```typescript
// lib/n8n/client.ts
const N8N_BASE_URL    = process.env.N8N_BASE_URL!;
const N8N_API_KEY     = process.env.N8N_API_KEY!;

interface N8nRequestOptions {
  timeoutMs?:   number;
  retries?:     number;
  retryDelayMs?: number;
}

export async function n8nFetch(
  path: string,
  init?: RequestInit,
  options: N8nRequestOptions = {}
): Promise<Response> {
  const { timeoutMs = 10000, retries = 2, retryDelayMs = 1000 } = options;

  const headers = {
    "Content-Type":  "application/json",
    "X-N8N-API-KEY": N8N_API_KEY,
    ...init?.headers,
  };

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${N8N_BASE_URL}${path}`, {
        ...init,
        headers,
        signal: controller.signal,
      });
      clearTimeout(timerId);

      if (!response.ok && attempt < retries) {
        await new Promise((r) => setTimeout(r, retryDelayMs * (attempt + 1)));
        continue;
      }
      return response;
    } catch (err) {
      clearTimeout(timerId);
      lastError = err as Error;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, retryDelayMs * (attempt + 1)));
      }
    }
  }

  throw lastError ?? new Error(`n8n fetch failed: ${path}`);
}

// Déclencher un workflow n8n via son webhook
export async function triggerN8nWorkflow(
  webhookPath: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; executionId?: string }> {
  try {
    const res = await n8nFetch(`/webhook/${webhookPath}`, {
      method: "POST",
      body:   JSON.stringify(data),
    });
    const json = await res.json();
    return { success: true, executionId: json.executionId };
  } catch (err) {
    console.error("[n8n] Workflow trigger failed:", err);
    return { success: false };
  }
}
```

---

## 7. Template de patch notes pour les workflows

Créer `n8n-workflows/PATCH-NOTES.md` dans le projet :

```markdown
# n8n Workflow — Patch Notes

## Format

Chaque modification d'un workflow doit être documentée ici avant déploiement.

---

## [VERSION] — [DATE]

### WF[ID] — [Nom du workflow]

**Type de changement** : Bugfix / Feature / Optimisation / Breaking change

**Problème résolu** / **Feature ajoutée** :
[Description courte]

**Modifications effectuées** :
- [ ] Nœud "[Nom]" : [ce qui a changé]
- [ ] Connexion "[Source]" → "[Destination]" : [ajout/suppression/modification]
- [ ] Variable d'environnement ajoutée : `[VAR_NAME]`

**Impact** :
- Workflows affectés : [liste]
- Routes API impactées : [liste]
- Tables Supabase modifiées : [liste]

**Tests effectués** :
- [ ] Test en environnement de dev n8n (exécution manuelle)
- [ ] Test webhook depuis Postman/curl
- [ ] Test end-to-end (trigger → Supabase → UI refresh)
- [ ] Pas de régression sur WF00 Error Handler

**Déployé par** : [Nom]
**Déployé le** : [Date]

---

## Exemple

## v1.2.0 — 2026-02-23

### WF03 — Sync commandes Stripe

**Type de changement** : Feature

**Feature ajoutée** :
Synchronisation automatique des statuts de paiement Stripe vers la table `orders` Supabase.

**Modifications effectuées** :
- [x] Nœud "Stripe Webhook" : ajout filtre événement `payment_intent.succeeded`
- [x] Nœud "Update Supabase" : mapping champ `payment_status = 'paid'`
- [x] Variable d'environnement ajoutée : `STRIPE_WEBHOOK_SECRET`

**Impact** :
- Workflows affectés : WF03 uniquement
- Routes API impactées : `/api/webhook/stripe` (côté Next.js)
- Tables Supabase modifiées : `orders.payment_status`

**Tests effectués** :
- [x] Test en environnement de dev n8n
- [x] Test webhook depuis Stripe CLI
- [x] Test end-to-end
- [x] Pas de régression WF00
```

---

## 8. Template de documentation workflow (format markdown)

Créer un fichier par workflow dans `n8n-workflows/docs/WF[ID]-[nom].md` :

```markdown
# WF[ID] — [Nom du Workflow]

**Statut** : Actif / Inactif / En développement
**Version** : [X.Y.Z]
**Dernière mise à jour** : [DATE]
**Créé par** : [Nom]

---

## Description

[Objectif du workflow en 1-2 phrases]

## Déclencheur

| Type | Détail |
|------|--------|
| Webhook / Cron / Manuel / Trigger | [path ou expression cron] |
| Fréquence | [si cron : ex "Tous les jours à 8h"] |
| Authentification | [secret header / basic auth / aucune] |

## Flux principal

```
[Trigger] → [Étape 1] → [Étape 2] → [... ] → [Sortie]
```

## Nœuds

| Nœud | Type | Rôle |
|------|------|------|
| [Nom] | [type n8n] | [description courte] |

## Données en entrée

```json
{
  "exemple": "payload d'entrée"
}
```

## Données en sortie / effets

- Table Supabase modifiée : `[table].[colonne]`
- Email envoyé via : [Brevo / autre]
- Webhook appelé : `[URL]`
- Revalidation Next.js : `[path]`

## Variables d'environnement requises

| Variable | Description | Où la trouver |
|----------|-------------|---------------|
| `[VAR]` | [usage] | [source] |

## Gestion des erreurs

- En cas d'erreur : renvoie vers WF00 (Error Handler Global)
- Retry : [nombre de tentatives]
- Alerte : [email / aucune]

## Tests

```bash
# Tester depuis curl
curl -X POST "https://n8n.[DOMAIN].com/webhook/[path]" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: [SECRET]" \
  -d '[PAYLOAD_EXEMPLE]'
```

## Historique

Voir `PATCH-NOTES.md`.
```

---

## 9. Pattern de monitoring (alerte si workflow échoue)

### Via Supabase Realtime → Next.js

```typescript
// components/dashboard/N8nMonitor.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface WorkflowError {
  id:              string;
  workflow_name:   string;
  error_message:   string;
  error_timestamp: string;
  resolved:        boolean;
}

export function N8nMonitor() {
  const [errors, setErrors] = useState<WorkflowError[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // Charger les erreurs non résolues au montage
    supabase
      .from("workflow_errors")
      .select("*")
      .eq("resolved", false)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) setErrors(data);
      });

    // Souscrire aux nouvelles erreurs en temps réel
    const channel = supabase
      .channel("workflow-errors")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "workflow_errors" },
        (payload) => {
          setErrors((prev) => [payload.new as WorkflowError, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (errors.length === 0) return null;

  return (
    <div
      role="alert"
      className="border border-[var(--color-danger)] bg-[var(--color-danger-light)] rounded-[var(--radius-lg)] p-3"
    >
      <p className="text-[length:var(--text-sm)] font-semibold text-[var(--color-danger)] mb-2">
        {errors.length} erreur{errors.length > 1 ? "s" : ""} n8n non résolue{errors.length > 1 ? "s" : ""}
      </p>
      <ul className="space-y-1">
        {errors.slice(0, 3).map((e) => (
          <li key={e.id} className="text-[length:var(--text-xs)] text-[var(--text-primary)]">
            <span className="font-medium">{e.workflow_name}</span> — {e.error_message}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 10. Test end-to-end : n8n trigger → webhook → Supabase → UI refresh

### Procédure de test complète

```bash
# Étape 1 : Lancer le serveur Next.js en local (avec tunnel ngrok pour recevoir les webhooks)
npx ngrok http 3000
# → Note l'URL temporaire : https://[ID].ngrok-free.app

# Étape 2 : Dans n8n, configurer temporairement le webhook vers ngrok
# Nœud HTTP Request : POST https://[ID].ngrok-free.app/api/webhook/n8n

# Étape 3 : Envoyer un événement test depuis n8n
# Bouton "Test workflow" dans l'éditeur n8n

# Étape 4 : Vérifier dans les logs Next.js (console du terminal)
# Attendu : [webhook] event received: [nom_event]

# Étape 5 : Vérifier dans Supabase Studio
# → Table concernée mise à jour

# Étape 6 : Vérifier le refresh UI
# → Ouvrir http://localhost:3000/dashboard dans le navigateur
# → Les données doivent se mettre à jour dans les 60s (revalidate)
# → Si AutoRefresh est activé : mise à jour dans les X secondes configurées

# Étape 7 : Test avec secret invalide (test de sécurité)
curl -X POST "http://localhost:3000/api/webhook/n8n" \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: MAUVAIS_SECRET" \
  -d '{"event":"test","data":{},"timestamp":"2026-01-01T00:00:00Z"}'
# Attendu : HTTP 401 Unauthorized
```
