# Conventions API et Server Actions

## Server Actions (Mutations)

### Pattern Standard

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  // ...
})

export async function createEntity(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Non authentifie')

  const parsed = schema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  const { error } = await supabase
    .from('entities')
    .insert({ ...parsed.data, owner_id: user.id })

  if (error) {
    return { error: { server: [error.message] } }
  }

  revalidatePath('/[route]')
  return { success: true }
}
```

### Regles
- Toujours valider avec **zod** avant d'inserer
- Toujours verifier l'auth (`getUser()`)
- Toujours `revalidatePath` apres mutation
- Retourner `{ success }` ou `{ error }` — jamais throw en production
- Utiliser `createClient()` (server) — jamais `createBrowserClient()`

## API Routes (Webhooks)

### Pattern Standard

```typescript
// app/api/webhooks/[provider]/route.ts
import { createClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

const bodySchema = z.object({
  // ...
})

export async function POST(request: NextRequest) {
  // 1. Valider le secret
  const secret = request.headers.get('x-webhook-secret')
  if (secret !== WEBHOOK_SECRET) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // 2. Parser et valider le body
  const body = await request.json()
  const parsed = bodySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 }
    )
  }

  // 3. Traiter la requete
  const supabase = createClient() // admin client (service_role)

  const { error } = await supabase
    .from('entities')
    .upsert(parsed.data, { onConflict: 'external_id' })

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
```

### Regles
- **Secret en premier** — rejeter 401 avant tout traitement
- Validation **zod** du body — rejeter 400 si invalide
- Utiliser `createClient()` admin (service_role) pour les webhooks n8n
- Reponse standardisee : `{ success: boolean, error?: string }`
- Pas de `console.log` de donnees sensibles
- Rate limiting si endpoint public

## Data Fetching (Server Components)

### Pattern Standard

```typescript
// app/(role)/page/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: entities } = await supabase
    .from('entities')
    .select('*')
    .order('created_at', { ascending: false })

  return <EntityList entities={entities ?? []} />
}
```

### Regles
- Fetch dans les **Server Components** — jamais dans useEffect
- Utiliser `createClient()` server (avec cookies)
- Gerer le cas `data === null` (afficher empty state)
- Rediriger vers `/login` si pas de user
- Pas de `try/catch` autour de Supabase queries (RLS gere les permissions)

## Supabase Realtime

### Pattern (si applicable)

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'

export function useRealtimeSubscription(table: string, onUpdate: () => void) {
  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel(`${table}-changes`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table,
      }, onUpdate)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [table, onUpdate])
}
```

### Regles
- Client Components uniquement (`'use client'`)
- Cleanup obligatoire (`removeChannel` dans le return)
- Limiter aux tables qui le necessitent (dashboard, notifications)
- Combiner avec `revalidatePath` pour la coherence

## Error Handling

### Pattern

```typescript
// Reponse API standard
type ApiResponse<T = unknown> = {
  success: true
  data: T
} | {
  success: false
  error: string
}

// Server Action standard
type ActionResult = {
  success: true
} | {
  error: Record<string, string[]>
}
```

### Regles
- Jamais `throw` dans les Server Actions exposees au client
- Toujours typer les erreurs (pas de `any`)
- Logger les erreurs serveur (Sentry ou console.error)
- Messages d'erreur utilisateur en francais
- Messages d'erreur technique en anglais (logs)

## Variables d'Environnement

### `.env.example` obligatoire

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Webhooks
WEBHOOK_SECRET=

# n8n
N8N_BASE_URL=

# Email (SMTP)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
```

### Regles
- `NEXT_PUBLIC_` uniquement pour les cles publiques (anon key)
- `SUPABASE_SERVICE_ROLE_KEY` jamais `NEXT_PUBLIC_`
- `.env.local` dans `.gitignore` (jamais versionne)
- `.env.example` versionne (sans valeurs)
