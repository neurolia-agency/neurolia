# B02 — Core : CRUD Principal

## Objectif

Construire les pages CRUD principales du dashboard : listes, details, formulaires de creation/edition, avec donnees reelles (Supabase) ou mock data.

## Inputs

- `pipeline/output/03-structure/data-model.md` — tables et relations
- `pipeline/output/04-wireframes/` — wireframes par page
- `pipeline/output/02-design-system/constraints.md` — regles visuelles
- `app/globals.css` — tokens CSS
- `seed/seed-scenario.sql` — donnees de test

## Agent

**`dashboard-ui-builder`** (sonnet) — pages UI
**`backend-layer`** (sonnet) — server actions, data fetching

## Processus

### 1. Identifier les Pages CRUD

A partir du PLAN.md, lister les pages Batch B et C :

| Page | Type | Route | Wireframe | Agent |
|------|------|-------|-----------|-------|
| [Entity] List | Liste | /[entity] | [wireframe].md | dashboard-ui-builder |
| [Entity] Detail | Detail | /[entity]/[id] | [wireframe].md | dashboard-ui-builder |
| [Entity] Create/Edit | Formulaire | /[entity]/new | [wireframe].md | dashboard-ui-builder |

### 2. Pattern Liste

```typescript
// src/app/([role])/[entity]/page.tsx (Server Component)
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { EntityList } from '@/components/[entity]/entity-list'

export default async function EntitiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: entities } = await supabase
    .from('[table]')
    .select('*')
    .order('created_at', { ascending: false })

  return <EntityList entities={entities ?? []} />
}
```

```typescript
// src/components/[entity]/entity-list.tsx (Client Component)
'use client'

// Table avec : recherche, filtres, pagination, tri
// Empty state avec CTA
// Loading skeleton
```

### 3. Pattern Detail

```typescript
// src/app/([role])/[entity]/[id]/page.tsx (Server Component)
import { notFound } from 'next/navigation'

export default async function EntityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // ... fetch entity by id
  if (!entity) notFound()

  return <EntityDetail entity={entity} />
}
```

### 4. Pattern Formulaire

```typescript
// src/components/[entity]/entity-form.tsx (Client Component)
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const schema = z.object({
  name: z.string().min(1, 'Le nom est obligatoire'),
  // ...
})

export function EntityForm({ entity }: { entity?: Entity }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: entity ?? {},
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    const result = await createOrUpdateEntity(data)
    if (result.error) {
      toast.error('Erreur lors de la sauvegarde')
    } else {
      toast.success(entity ? 'Mis a jour' : 'Cree avec succes')
    }
  }

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>
}
```

### 5. Server Actions

```typescript
// src/app/actions/[entity].ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function createEntity(data: { name: string }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { server: ['Non authentifie'] } }

  const { error } = await supabase
    .from('[table]')
    .insert({ ...data, owner_id: user.id })

  if (error) return { error: { server: [error.message] } }

  revalidatePath('/[route]')
  return { success: true }
}
```

### 6. Organisation des Batchs

**Parallele (Batch B)** : Pages du role principal
- Chaque page est independante
- Utiliser mock data si le seed n'est pas encore pret
- TODO pour branchement donnees reelles

**Parallele (Batch C)** : Pages du role secondaire
- Meme pattern
- Peut commencer en parallele de Batch B

**Regle** : Les pages UI (Batch B/C) peuvent utiliser des mock data en attendant le backend (Batch E). Marquer chaque mock avec un commentaire `// TODO: Replace with real data`.

## Validation

- [ ] `npm run build` sans erreurs
- [ ] Chaque page liste affiche les donnees (seed ou mock)
- [ ] Recherche et filtres fonctionnent
- [ ] Navigation liste → detail → retour fonctionne
- [ ] Formulaire cree/modifie l'entite
- [ ] Toast de confirmation affiche
- [ ] Empty states avec CTA
- [ ] Loading skeletons visibles
- [ ] Responsive (desktop + mobile)
- [ ] Server Components pour le data fetching, Client Components pour l'interactivite
