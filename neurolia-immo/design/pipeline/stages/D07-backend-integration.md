# Etape D07 : Backend Integration

> **Phase D-B : Code** - Connexion des ecrans aux APIs et webhooks.

## Objectif

Connecter chaque ecran code en D06 aux endpoints API et webhooks n8n definis dans le template architecture. Remplacer les donnees statiques par des donnees reelles.

## Input

| Fichier | Usage |
|---------|-------|
| `pipeline/input/imports/api-contracts.md` | Endpoints API (si disponible) |
| `pipeline/input/imports/webhook-map.md` | Webhooks n8n (si disponible) |
| Ecrans codes en D06 | Code a connecter |

**Note** : Si les fichiers `api-contracts.md` et `webhook-map.md` ne sont pas encore disponibles (template n8n pas encore execute), utiliser des mocks et revenir a cette etape plus tard.

## Instructions

### 1. Inventaire des Connexions

Lister toutes les connexions necessaires par ecran :

| Ecran | Donnees | Source | Methode |
|-------|---------|--------|---------|
| Home | Liste items | API GET /items | fetch / SWR / React Query |
| Detail | Item unique | API GET /items/:id | fetch |
| Formulaire | Soumission | API POST /items | form action |
| Login | Auth | API POST /auth/login | fetch |
| Profile | User data | API GET /users/me | fetch |
| [Action] | Trigger | Webhook n8n | POST webhook URL |

### 2. Configuration API Client

#### PWA (Next.js)

```typescript
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
```

#### React Native (Expo)

```typescript
// services/api.ts
import * as SecureStore from 'expo-secure-store';

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = await SecureStore.getItemAsync('auth_token');

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
```

### 3. Connexion Ecran par Ecran

Pour chaque ecran :

1. **Identifier les donnees** necessaires (depuis l'inventaire)
2. **Creer le hook/service** de recuperation de donnees
3. **Connecter au composant** en remplacement des donnees statiques
4. **Gerer les etats** : loading → data → error (deja structures en D06)
5. **Tester le flux** : donnees reelles affichees correctement

### 4. Webhooks n8n

Pour les actions qui declenchent des workflows n8n :

```typescript
// services/webhooks.ts
const N8N_BASE = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

export async function triggerWebhook(
  hookId: string,
  payload: Record<string, unknown>
) {
  const res = await fetch(`${N8N_BASE}/${hookId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Webhook Error: ${res.status}`);
  }

  return res.json();
}
```

### 5. Gestion des Etats de Connexion

| Etat | UI | Action |
|------|-----|--------|
| Loading | Skeleton screens (D06) | Afficher pendant fetch |
| Success | Donnees reelles | Cacher skeleton |
| Error reseau | Error state (D06) + retry | Bouton "Reessayer" |
| Error serveur | Error state + message specifique | Message adapte |
| Offline | Banner "Hors ligne" | Cache local si applicable |
| Token expire | Redirect login | Rafraichir token ou logout |

### 6. Authentification Reelle

Remplacer le flow auth placeholder de D05 :

1. Login : API POST /auth/login → stocker token
2. Register : API POST /auth/register → stocker token
3. Refresh : API POST /auth/refresh → mettre a jour token
4. Logout : Supprimer token → redirect login
5. Social Login : OAuth flow (si applicable)

## Variables d'Environnement

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.[domain].com
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.[domain].com/webhook
```

## Validation

- [ ] Tous les ecrans affichent des donnees reelles (ou mocks realistes)
- [ ] Etats loading fonctionnent (skeleton pendant fetch)
- [ ] Etats error fonctionnent (message + retry)
- [ ] Authentification fonctionnelle (login → token → acces)
- [ ] Webhooks n8n connectes (si applicable)
- [ ] Variables d'environnement documentees
- [ ] Pas de credentials dans le code (utiliser .env)
- [ ] Gestion offline basique (banner ou message)

## Prochaine Etape

→ `stages/D08-polish.md`

---

**Version** : 1.0
**Phase** : D-B (Code)
**Dependances** : D06 (Core Screens), imports (api-contracts.md, webhook-map.md)
**Produit pour** : D08 (Polish)
