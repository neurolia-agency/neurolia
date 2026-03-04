# Skill : dashboard-crud-patterns

## Description

7 patterns TypeScript complets pour implementer des pages CRUD dans un dashboard Next.js avec Supabase, react-hook-form, zod, et shadcn/ui.

## Usage

Invoquer pendant B02-core pour les pages CRUD. Copier et adapter les snippets.

## Pattern 1 : Page Liste (Server Component)

```typescript
// app/(owner)/[entite]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { EntityList } from '@/components/[entite]/entity-list'

export default async function EntitePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: entities, error } = await supabase
    .from('[table_name]')
    .select('*, [relation](id, name)')
    .order('created_at', { ascending: false })

  if (error) throw error

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[--text-primary]">[Entites]</h1>
          <p className="text-sm text-[--text-secondary]">{entities?.length || 0} [entites] au total</p>
        </div>
        <a
          href="/[entite]/new"
          className="inline-flex items-center gap-2 rounded-[--radius-md] bg-[--color-primary-600] px-4 py-2 text-sm font-medium text-white hover:bg-[--color-primary-700] transition-colors duration-[--duration-fast]"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </a>
      </div>

      <EntityList entities={entities || []} />
    </div>
  )
}
```

## Pattern 2 : Client Table (avec recherche, filtres, tri, pagination)

```typescript
// components/[entite]/entity-list.tsx
'use client'

import { useState, useMemo } from 'react'
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Entity = {
  id: string
  name: string
  status: string
  created_at: string
}

const PAGE_SIZE = 10

export function EntityList({ entities }: { entities: Entity[] }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<keyof Entity>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    let result = entities

    // Search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(e => e.name.toLowerCase().includes(q))
    }

    // Filter
    if (statusFilter !== 'all') {
      result = result.filter(e => e.status === statusFilter)
    }

    // Sort
    result = [...result].sort((a, b) => {
      const aVal = a[sortField] ?? ''
      const bVal = b[sortField] ?? ''
      const cmp = String(aVal).localeCompare(String(bVal))
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [entities, search, statusFilter, sortField, sortDir])

  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  if (entities.length === 0) {
    return <EntityEmptyState />
  }

  return (
    <div className="space-y-4">
      {/* Search + Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-muted]" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0) }}
            className="w-full pl-10 pr-4 py-2 rounded-[--radius-md] border border-[--border-default] bg-[--bg-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(0) }}
          className="rounded-[--radius-md] border border-[--border-default] bg-[--bg-surface] px-3 py-2 text-sm"
        >
          <option value="all">Tous les statuts</option>
          {/* Add status options dynamically */}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-[--radius-lg] border border-[--border-default] bg-[--bg-surface] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[--bg-base]">
            <tr>
              <SortableHeader label="Nom" field="name" current={sortField} dir={sortDir} onSort={(f, d) => { setSortField(f); setSortDir(d) }} />
              <SortableHeader label="Statut" field="status" current={sortField} dir={sortDir} onSort={(f, d) => { setSortField(f); setSortDir(d) }} />
              <SortableHeader label="Date" field="created_at" current={sortField} dir={sortDir} onSort={(f, d) => { setSortField(f); setSortDir(d) }} />
              <th className="px-4 py-3 text-right text-xs font-medium text-[--text-secondary] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[--border-default]">
            {paged.map(entity => (
              <tr key={entity.id} className="hover:bg-[--bg-base] transition-colors duration-[--duration-fast]">
                <td className="px-4 py-3">
                  <Link href={`/[entite]/${entity.id}`} className="font-medium text-[--text-primary] hover:text-[--color-primary-600]">
                    {entity.name}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={entity.status} />
                </td>
                <td className="px-4 py-3 text-sm text-[--text-secondary]">
                  {new Date(entity.created_at).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/[entite]/${entity.id}`} className="text-sm text-[--color-primary-600] hover:underline">
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-[--text-secondary]">
          <span>{filtered.length} resultat{filtered.length > 1 ? 's' : ''}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
              className="p-1 rounded hover:bg-[--bg-base] disabled:opacity-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span>Page {page + 1} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
              className="p-1 rounded hover:bg-[--bg-base] disabled:opacity-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

## Pattern 3 : Page Detail (Server Component)

```typescript
// app/(owner)/[entite]/[id]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function EntityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: entity } = await supabase
    .from('[table_name]')
    .select('*, [relation](*)')
    .eq('id', id)
    .single()

  if (!entity) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/[entite]" className="p-2 rounded-[--radius-md] hover:bg-[--bg-base] transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-[--text-primary]">{entity.name}</h1>
          <p className="text-sm text-[--text-secondary]">Cree le {new Date(entity.created_at).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      {/* Detail content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Main content */}
          <div className="rounded-[--radius-lg] border border-[--border-default] bg-[--bg-surface] p-6">
            <h2 className="text-lg font-medium text-[--text-primary] mb-4">Informations</h2>
            {/* Fields */}
          </div>
        </div>
        <div className="space-y-6">
          {/* Sidebar content (metadata, actions) */}
          <div className="rounded-[--radius-lg] border border-[--border-default] bg-[--bg-surface] p-6">
            <h2 className="text-lg font-medium text-[--text-primary] mb-4">Actions</h2>
            <div className="space-y-2">
              <Link href={`/[entite]/${id}/edit`} className="block w-full text-center rounded-[--radius-md] bg-[--color-primary-600] px-4 py-2 text-sm font-medium text-white hover:bg-[--color-primary-700]">
                Modifier
              </Link>
              <DeleteButton entityId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Pattern 4 : Formulaire (react-hook-form + zod + Server Action)

```typescript
// components/[entite]/entity-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createEntity, updateEntity } from '@/app/actions/[entite]'

const entitySchema = z.object({
  name: z.string().min(1, 'Le nom est requis').max(100, '100 caracteres maximum'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']),
})

type EntityFormData = z.infer<typeof entitySchema>

type Props = {
  entity?: EntityFormData & { id: string }
  mode: 'create' | 'edit'
}

export function EntityForm({ entity, mode }: Props) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EntityFormData>({
    resolver: zodResolver(entitySchema),
    defaultValues: entity || { status: 'active' },
  })

  async function onSubmit(data: EntityFormData) {
    const result = mode === 'create'
      ? await createEntity(data)
      : await updateEntity(entity!.id, data)

    if (result.success) {
      toast.success(mode === 'create' ? '[Entite] creee' : '[Entite] mise a jour')
      router.push('/[entite]')
      router.refresh()
    } else {
      toast.error(result.error || 'Une erreur est survenue')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-[--radius-lg] border border-[--border-default] bg-[--bg-surface] p-6 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-[--text-primary] mb-1">Nom</label>
          <input
            {...register('name')}
            className="w-full rounded-[--radius-md] border border-[--border-default] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]"
          />
          {errors.name && <p className="mt-1 text-sm text-[--color-error]">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[--text-primary] mb-1">Description</label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full rounded-[--radius-md] border border-[--border-default] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-[--text-primary] mb-1">Statut</label>
          <select
            {...register('status')}
            className="w-full rounded-[--radius-md] border border-[--border-default] px-3 py-2 text-sm"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="pending">En attente</option>
          </select>
          {errors.status && <p className="mt-1 text-sm text-[--color-error]">{errors.status.message}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => router.back()} className="rounded-[--radius-md] border border-[--border-default] px-4 py-2 text-sm hover:bg-[--bg-base]">
          Annuler
        </button>
        <button type="submit" disabled={isSubmitting} className="rounded-[--radius-md] bg-[--color-primary-600] px-4 py-2 text-sm font-medium text-white hover:bg-[--color-primary-700] disabled:opacity-50">
          {isSubmitting ? 'Enregistrement...' : mode === 'create' ? 'Creer' : 'Enregistrer'}
        </button>
      </div>
    </form>
  )
}
```

## Pattern 5 : Server Action (auth + zod + mutation + revalidate)

```typescript
// app/actions/[entite].ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const entitySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']),
})

type ActionResult = { success: true; data?: any } | { success: false; error: string }

export async function createEntity(input: z.infer<typeof entitySchema>): Promise<ActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Non authentifie' }

  const parsed = entitySchema.safeParse(input)
  if (!parsed.success) return { success: false, error: 'Donnees invalides' }

  const { data, error } = await supabase
    .from('[table_name]')
    .insert({ ...parsed.data, owner_id: user.id })
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  revalidatePath('/[entite]')
  return { success: true, data }
}

export async function updateEntity(id: string, input: z.infer<typeof entitySchema>): Promise<ActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Non authentifie' }

  const parsed = entitySchema.safeParse(input)
  if (!parsed.success) return { success: false, error: 'Donnees invalides' }

  const { error } = await supabase
    .from('[table_name]')
    .update(parsed.data)
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/[entite]')
  revalidatePath(`/[entite]/${id}`)
  return { success: true }
}

export async function deleteEntity(id: string): Promise<ActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Non authentifie' }

  const { error } = await supabase
    .from('[table_name]')
    .delete()
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/[entite]')
  return { success: true }
}
```

## Pattern 6 : Empty State

```typescript
// components/[entite]/entity-empty-state.tsx
import { [Icon] } from 'lucide-react'
import Link from 'next/link'

export function EntityEmptyState() {
  return (
    <div className="rounded-[--radius-lg] border border-dashed border-[--border-default] bg-[--bg-surface] p-12 text-center">
      <[Icon] className="mx-auto h-12 w-12 text-[--text-muted]" />
      <h3 className="mt-4 text-lg font-medium text-[--text-primary]">Aucun(e) [entite]</h3>
      <p className="mt-2 text-sm text-[--text-secondary]">
        Commencez par ajouter votre premier(e) [entite].
      </p>
      <Link
        href="/[entite]/new"
        className="mt-6 inline-flex items-center gap-2 rounded-[--radius-md] bg-[--color-primary-600] px-4 py-2 text-sm font-medium text-white hover:bg-[--color-primary-700]"
      >
        <Plus className="h-4 w-4" />
        Ajouter un(e) [entite]
      </Link>
    </div>
  )
}
```

## Pattern 7 : Delete Confirmation (Dialog + Server Action)

```typescript
// components/[entite]/delete-button.tsx
'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { deleteEntity } from '@/app/actions/[entite]'

export function DeleteButton({ entityId }: { entityId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setIsDeleting(true)
    const result = await deleteEntity(entityId)
    if (result.success) {
      toast.success('[Entite] supprime(e)')
      router.push('/[entite]')
      router.refresh()
    } else {
      toast.error(result.error || 'Erreur lors de la suppression')
    }
    setIsDeleting(false)
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-[--radius-md] border border-[--color-error] px-4 py-2 text-sm font-medium text-[--color-error] hover:bg-red-50 transition-colors"
      >
        <Trash2 className="inline h-4 w-4 mr-1" />
        Supprimer
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-[--radius-lg] bg-[--bg-surface] p-6 shadow-[--shadow-modal]">
            <h3 className="text-lg font-semibold text-[--text-primary]">Confirmer la suppression</h3>
            <p className="mt-2 text-sm text-[--text-secondary]">
              Cette action est irreversible. Etes-vous sur de vouloir supprimer cet element ?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsOpen(false)} className="rounded-[--radius-md] border border-[--border-default] px-4 py-2 text-sm hover:bg-[--bg-base]">
                Annuler
              </button>
              <button onClick={handleDelete} disabled={isDeleting} className="rounded-[--radius-md] bg-[--color-error] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
```

## Helpers

### SortableHeader Component

```typescript
function SortableHeader<T extends string>({
  label, field, current, dir, onSort,
}: {
  label: string; field: T; current: T; dir: 'asc' | 'desc';
  onSort: (field: T, dir: 'asc' | 'desc') => void;
}) {
  const isActive = current === field
  return (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-[--text-secondary] uppercase cursor-pointer hover:text-[--text-primary] select-none"
      onClick={() => onSort(field, isActive && dir === 'asc' ? 'desc' : 'asc')}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {isActive && (dir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
      </span>
    </th>
  )
}
```

### StatusBadge Component

```typescript
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-green-50 text-green-700 border-green-200',
    inactive: 'bg-gray-50 text-gray-700 border-gray-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status] || styles.inactive}`}>
      {status}
    </span>
  )
}
```
