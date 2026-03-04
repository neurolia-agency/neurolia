# Skill: dashboard-polish-patterns

Patterns complets pour le polish d'un dashboard : responsive adaptatif, skeletons, error boundary, PWA, micro-interactions et accessibilité.

---

## 1. Table → Cards responsive

Composant qui affiche une table sur desktop et des cards sur mobile.

```tsx
// components/dashboard/ResponsiveTable.tsx
'use client'

import { cn } from '@/lib/utils'

export interface Column<T> {
  key: keyof T | string
  header: string
  cell: (row: T) => React.ReactNode
  mobileVisible?: boolean    // Shown in card view (default: true)
  mobileLabel?: string       // Label in card (default: header)
  sortable?: boolean
  className?: string         // Table column className
}

interface ResponsiveTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string
  onRowClick?: (row: T) => void
  emptyState?: React.ReactNode
  stickyHeader?: boolean
  className?: string
}

export function ResponsiveTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyState,
  stickyHeader = false,
  className,
}: ResponsiveTableProps<T>) {
  const visibleInCard = columns.filter(col => col.mobileVisible !== false)

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>
  }

  return (
    <>
      {/* DESKTOP: Table */}
      <div className={cn('hidden md:block overflow-x-auto rounded-lg border border-[var(--color-border)]', className)}>
        <table className="w-full text-sm">
          <thead className={cn(
            'bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)]',
            stickyHeader && 'sticky top-0 z-10'
          )}>
            <tr>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className={cn(
                    'px-4 py-3 text-left font-medium whitespace-nowrap',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--color-text-tertiary)]">
                  {emptyState ?? 'Aucune donnée'}
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr
                  key={keyExtractor(row)}
                  className={cn(
                    'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map(col => (
                    <td
                      key={String(col.key)}
                      className={cn('px-4 py-3', col.className)}
                    >
                      {col.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE: Cards */}
      <div className="md:hidden space-y-3">
        {data.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-text-tertiary)]">
            {emptyState ?? 'Aucune donnée'}
          </div>
        ) : (
          data.map(row => (
            <div
              key={keyExtractor(row)}
              className={cn(
                'bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-4 space-y-2',
                onRowClick && 'cursor-pointer active:bg-[var(--color-surface-hover)] transition-colors'
              )}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              role={onRowClick ? 'button' : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={onRowClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onRowClick(row) } : undefined}
            >
              {visibleInCard.map((col, colIndex) => (
                <div
                  key={String(col.key)}
                  className={cn(
                    'flex items-start justify-between gap-2',
                    colIndex === 0 && 'text-[var(--color-text-primary)] font-medium'
                  )}
                >
                  {colIndex > 0 && (
                    <span className="text-xs text-[var(--color-text-tertiary)] shrink-0 mt-0.5">
                      {col.mobileLabel ?? col.header}
                    </span>
                  )}
                  <span className={cn('text-sm', colIndex > 0 && 'text-[var(--color-text-secondary)]')}>
                    {col.cell(row)}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  )
}
```

---

## 2. Sidebar → Tab bar responsive (auto-switch)

Voir `dashboard-layout-patterns.md` pour l'implémentation complète. Pattern résumé :

```tsx
// Règle: un seul composant de layout gère les deux modes
// - Sidebar: hidden lg:flex (disparaît < 1024px)
// - MobileTabBar: lg:hidden (disparaît >= 1024px)
// - Mobile drawer: lg:hidden fixed ... (overlay)
// Pas de duplication de la nav — même navItems, deux rendus différents
```

---

## 3. Modal → Full-screen mobile

```tsx
// components/dashboard/Modal.tsx
'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'md:max-w-sm',
  md: 'md:max-w-md',
  lg: 'md:max-w-lg',
  xl: 'md:max-w-xl',
}

export function Modal({ open, onClose, title, description, children, footer, size = 'md' }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Trap focus + handle Escape
  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialogRef.current?.close()
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? 'modal-description' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — full-screen on mobile, centered window on md+ */}
      <div className={cn(
        'relative z-10 flex flex-col bg-[var(--color-surface)]',
        'w-full max-h-[100dvh] md:max-h-[90vh]',
        'md:rounded-xl md:shadow-2xl md:w-full',
        'rounded-t-2xl shadow-xl', // mobile: sheet from bottom
        sizeClasses[size],
        'animate-modal-in'
      )}>
        {/* Header */}
        <div className="flex items-start justify-between p-4 md:p-6 border-b border-[var(--color-border)] shrink-0">
          {/* Drag handle (mobile) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-[var(--color-border)] md:hidden" aria-hidden="true" />

          <div className="mt-3 md:mt-0">
            <h2 id="modal-title" className="text-lg font-semibold text-[var(--color-text-primary)]">
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors ml-4 shrink-0"
            aria-label="Fermer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-[var(--color-border)] shrink-0 safe-pb">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
```

```css
/* globals.css */
@keyframes modal-in {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-modal-in {
  animation: modal-in 180ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
/* Mobile: slide up from bottom */
@media (max-width: 767px) {
  @keyframes modal-in {
    from { opacity: 0; transform: translateY(100%); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
```

---

## 4. Skeleton Components Library

```tsx
// components/dashboard/skeletons/index.tsx
import { cn } from '@/lib/utils'

// Base pulse animation class
const pulse = 'animate-pulse bg-[var(--color-skeleton)] rounded'

// ─── Primitives ───────────────────────────────────────────────────────────────

export function SkeletonBox({ className }: { className?: string }) {
  return <div className={cn(pulse, className)} aria-hidden="true" />
}

export function SkeletonText({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(pulse, 'h-4', i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  )
}

// ─── Table Row Skeleton ────────────────────────────────────────────────────────

export function SkeletonTableRow({ columns = 5 }: { columns?: number }) {
  return (
    <tr aria-hidden="true">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className={cn(pulse, 'h-4', i === 0 ? 'w-3/4' : i === columns - 1 ? 'w-16 ml-auto' : 'w-full max-w-[120px]')} />
        </td>
      ))}
    </tr>
  )
}

export function SkeletonTable({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] overflow-hidden" aria-busy="true" aria-label="Chargement...">
      <table className="w-full">
        <thead className="bg-[var(--color-surface-subtle)]">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <div className={cn(pulse, 'h-4 w-20')} aria-hidden="true" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonTableRow key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── KPI Card Skeleton ─────────────────────────────────────────────────────────

export function SkeletonKpiCard() {
  return (
    <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5" aria-hidden="true">
      <div className="flex items-center justify-between mb-4">
        <div className={cn(pulse, 'h-4 w-24')} />
        <div className={cn(pulse, 'w-8 h-8 rounded-md')} />
      </div>
      <div className={cn(pulse, 'h-8 w-32 mb-2')} />
      <div className={cn(pulse, 'h-3 w-20')} />
    </div>
  )
}

export function SkeletonKpiGrid({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      aria-busy="true"
      aria-label="Chargement des indicateurs..."
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonKpiCard key={i} />
      ))}
    </div>
  )
}

// ─── Chart Skeleton ────────────────────────────────────────────────────────────

export function SkeletonChart({ height = 280 }: { height?: number }) {
  return (
    <div
      className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5"
      style={{ height }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn(pulse, 'h-5 w-40')} />
        <div className={cn(pulse, 'h-8 w-24 rounded-md')} />
      </div>
      {/* Fake bars */}
      <div className="flex items-end gap-2 h-[calc(100%-64px)]">
        {[60, 85, 45, 90, 70, 55, 80, 65, 75, 50, 88, 40].map((h, i) => (
          <div
            key={i}
            className={cn(pulse, 'flex-1 rounded-t')}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Detail Page Skeleton ──────────────────────────────────────────────────────

export function SkeletonDetailPage() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Chargement...">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={cn(pulse, 'h-8 w-20 rounded-md')} />
        <div className={cn(pulse, 'h-7 w-48')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 space-y-4">
            <div className={cn(pulse, 'h-5 w-40')} />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className={cn(pulse, 'h-4 w-24 shrink-0')} />
                <div className={cn(pulse, 'h-4 flex-1')} />
              </div>
            ))}
          </div>
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 space-y-3">
            <div className={cn(pulse, 'h-5 w-32')} />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className={cn(pulse, 'h-4 w-48')} />
                <div className={cn(pulse, 'h-4 w-16')} />
              </div>
            ))}
          </div>
        </div>

        {/* Side column (1/3) */}
        <div className="space-y-4">
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 space-y-3">
            <div className={cn(pulse, 'h-5 w-28')} />
            <div className={cn(pulse, 'h-6 w-20 rounded-full')} />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className={cn(pulse, 'h-3 w-20')} />
                <div className={cn(pulse, 'h-3 w-24')} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Form Skeleton ─────────────────────────────────────────────────────────────

export function SkeletonForm({ fields = 6 }: { fields?: number }) {
  return (
    <div className="space-y-5 max-w-2xl" aria-busy="true" aria-label="Chargement du formulaire...">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <div className={cn(pulse, 'h-4 w-28')} />
          <div className={cn(pulse, 'h-10 w-full rounded-md')} />
        </div>
      ))}
      <div className="flex justify-end gap-3 pt-2">
        <div className={cn(pulse, 'h-10 w-24 rounded-md')} />
        <div className={cn(pulse, 'h-10 w-32 rounded-md')} />
      </div>
    </div>
  )
}
```

```css
/* globals.css */
:root {
  --color-skeleton: color-mix(in srgb, var(--color-border) 60%, transparent);
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
```

---

## 5. Error Boundary (Next.js error.tsx)

```tsx
// app/(dashboard)/error.tsx
'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error monitoring (Sentry, etc.)
    console.error('[Dashboard Error]', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-[var(--color-error-muted)] flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--color-error)]">
          <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        Une erreur est survenue
      </h2>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-sm">
        Impossible de charger cette page. Veuillez réessayer ou contacter le support si le problème persiste.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <details className="mb-6 text-left max-w-md w-full">
          <summary className="text-xs text-[var(--color-text-tertiary)] cursor-pointer mb-2">
            Détails de l'erreur (dev)
          </summary>
          <pre className="text-xs bg-[var(--color-surface-subtle)] p-3 rounded-md overflow-auto text-[var(--color-error)] border border-[var(--color-error-muted)]">
            {error.message}
            {error.digest && `\nDigest: ${error.digest}`}
          </pre>
        </details>
      )}

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-md bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors min-h-[44px]"
        >
          Réessayer
        </button>
        <a
          href="/dashboard"
          className="px-4 py-2 rounded-md border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors min-h-[44px] flex items-center"
        >
          Retour au tableau de bord
        </a>
      </div>
    </div>
  )
}
```

```tsx
// app/(dashboard)/loading.tsx — utiliser les skeletons ici
export { SkeletonDetailPage as default } from '@/components/dashboard/skeletons'
```

---

## 6. PWA Manifest + Service Worker

```json
// public/manifest.json
{
  "name": "[Nom Application]",
  "short_name": "[Nom Court]",
  "description": "[Description courte]",
  "start_url": "/dashboard",
  "display": "standalone",
  "background_color": "#0f0f0f",
  "theme_color": "#0f0f0f",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "shortcuts": [
    {
      "name": "Tableau de bord",
      "url": "/dashboard",
      "icons": [{ "src": "/icons/icon-96.png", "sizes": "96x96" }]
    }
  ],
  "categories": ["productivity", "business"],
  "lang": "fr"
}
```

```js
// public/sw.js — Service Worker basique (cache-first pour assets, network-first pour API)
const CACHE_NAME = 'dashboard-v1'
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET and API routes (always network for /api/*)
  if (request.method !== 'GET' || url.pathname.startsWith('/api/')) return

  // Cache-first for static assets
  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(
      caches.match(request).then(cached => cached ?? fetch(request).then(response => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        return response
      }))
    )
    return
  }

  // Network-first for HTML pages (with cache fallback)
  event.respondWith(
    fetch(request)
      .then(response => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        return response
      })
      .catch(() => caches.match(request))
  )
})
```

```tsx
// components/PwaRegister.tsx — à ajouter dans app/layout.tsx
'use client'

import { useEffect } from 'react'

export function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(console.error)
      })
    }
  }, [])
  return null
}
```

```tsx
// app/layout.tsx — ajouter dans <head> et <body>
// <link rel="manifest" href="/manifest.json" />
// <meta name="theme-color" content="#0f0f0f" />
// <meta name="apple-mobile-web-app-capable" content="yes" />
// <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
// <PwaRegister /> dans <body>
```

---

## 7. Notification Permission Request UX

```tsx
// components/dashboard/NotificationPermissionBanner.tsx
'use client'

import { useState, useEffect } from 'react'

export function NotificationPermissionBanner() {
  const [show, setShow] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission | null>(null)

  useEffect(() => {
    if (!('Notification' in window)) return
    setPermission(Notification.permission)

    // Show banner only if not yet decided and not previously dismissed
    const dismissed = sessionStorage.getItem('notif-banner-dismissed')
    if (Notification.permission === 'default' && !dismissed) {
      // Delay to avoid jarring on first load
      const t = setTimeout(() => setShow(true), 3000)
      return () => clearTimeout(t)
    }
  }, [])

  const handleAccept = async () => {
    const result = await Notification.requestPermission()
    setPermission(result)
    setShow(false)
  }

  const handleDismiss = () => {
    sessionStorage.setItem('notif-banner-dismissed', 'true')
    setShow(false)
  }

  if (!show || permission !== 'default') return null

  return (
    <div
      role="alert"
      className="fixed bottom-20 lg:bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-80 z-40 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg p-4 animate-slide-up"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-[var(--color-accent-muted)] flex items-center justify-center shrink-0 text-[var(--color-accent)]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6v2l1.25 2H2.25L3.5 8V6A4.5 4.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M6.5 12a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            Activer les notifications
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Recevez des alertes pour les nouvelles commandes et mises à jour importantes.
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAccept}
              className="flex-1 px-3 py-1.5 rounded-md bg-[var(--color-accent)] text-white text-xs font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Activer
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 px-3 py-1.5 rounded-md border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              Plus tard
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] w-5 h-5 shrink-0"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  )
}
```

---

## 8. Micro-interactions CSS

Toutes les animations utilisent uniquement `transform` et `opacity` (GPU-accelerated).
Jamais `filter: blur()`, jamais `transition: all`, jamais de propriétés qui déclenchent le layout.

```css
/* globals.css — Micro-interactions */

/* ─── Hover / Press / Focus (boutons) ─────────────────────────────────────── */
.btn-primary {
  background-color: var(--color-accent);
  color: white;
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: 500;
  font-size: 14px;
  transition: background-color 150ms ease, transform 100ms ease, opacity 150ms ease;
  cursor: pointer;
}
.btn-primary:hover  { background-color: var(--color-accent-hover); }
.btn-primary:active { transform: scale(0.97); }
.btn-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

/* ─── Card hover lift ─────────────────────────────────────────────────────── */
.card-interactive {
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -4px rgba(0,0,0,0.15);
}
.card-interactive:active { transform: translateY(0); }

/* ─── Row hover (table, list) ─────────────────────────────────────────────── */
.row-interactive {
  transition: background-color 100ms ease;
}
.row-interactive:hover { background-color: var(--color-surface-hover); }

/* ─── Icon button ─────────────────────────────────────────────────────────── */
.icon-btn {
  transition: background-color 120ms ease, transform 100ms ease;
  border-radius: 8px;
  padding: 8px;
}
.icon-btn:hover  { background-color: var(--color-surface-hover); }
.icon-btn:active { transform: scale(0.9); }

/* ─── Slide-up entrance ───────────────────────────────────────────────────── */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
  animation: slide-up 200ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* ─── Fade in ─────────────────────────────────────────────────────────────── */
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 200ms ease both;
}

/* ─── Stagger enfants (liste) ─────────────────────────────────────────────── */
.stagger-children > * {
  opacity: 0;
  animation: slide-up 200ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.stagger-children > *:nth-child(1)  { animation-delay: 0ms; }
.stagger-children > *:nth-child(2)  { animation-delay: 50ms; }
.stagger-children > *:nth-child(3)  { animation-delay: 100ms; }
.stagger-children > *:nth-child(4)  { animation-delay: 150ms; }
.stagger-children > *:nth-child(5)  { animation-delay: 200ms; }
.stagger-children > *:nth-child(n+6) { animation-delay: 250ms; }

/* ─── Spinner ─────────────────────────────────────────────────────────────── */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

/* ─── Page transition ─────────────────────────────────────────────────────── */
@keyframes page-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
main > * { animation: page-in 250ms cubic-bezier(0.16, 1, 0.3, 1) both; }

/* ─── Respect prefers-reduced-motion ─────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Accessibilité — Patterns aria-* pour dashboards

### Tables

```tsx
// Table accessible avec tri et sélection
<table role="grid" aria-label="Liste des commandes" aria-rowcount={totalRows}>
  <thead>
    <tr role="row">
      <th
        role="columnheader"
        aria-sort={sortCol === 'date' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
        scope="col"
      >
        <button onClick={() => onSort('date')}>Date</button>
      </th>
      <th role="columnheader" scope="col">Statut</th>
    </tr>
  </thead>
  <tbody aria-live="polite" aria-busy={isLoading}>
    {rows.map((row, i) => (
      <tr role="row" aria-rowindex={offset + i + 1} key={row.id}>
        <td role="gridcell">{row.date}</td>
        <td role="gridcell">{row.status}</td>
      </tr>
    ))}
  </tbody>
</table>
```

### Modales

```tsx
// Modale accessible (focus trap manuel si pas d'usage de <dialog>)
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">Confirmer la suppression</h2>
  <p id="dialog-desc">Cette action est irréversible.</p>
  <button autoFocus onClick={onCancel}>Annuler</button>
  <button onClick={onConfirm}>Supprimer</button>
</div>
```

### Navigation

```tsx
// Sidebar nav
<nav aria-label="Navigation principale">
  <ul role="list">
    <li>
      <a href="/dashboard" aria-current="page">Tableau de bord</a>
    </li>
    <li>
      <button aria-expanded={open} aria-controls="sub-menu-id">
        Produits
      </button>
      <ul id="sub-menu-id" hidden={!open} role="list">
        <li><a href="/produits/catalogue">Catalogue</a></li>
      </ul>
    </li>
  </ul>
</nav>

// Tab bar
<nav aria-label="Navigation principale">
  <a href="/dashboard" aria-current="page" aria-label="Tableau de bord">
    <Icon /> <span>Accueil</span>
  </a>
</nav>
```

### Formulaires

```tsx
// Champs avec erreurs et descriptions
<div>
  <label htmlFor="email">
    Adresse email <span aria-hidden="true">*</span>
    <span className="sr-only">(requis)</span>
  </label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : 'email-hint'}
  />
  <p id="email-hint" className="text-xs text-[var(--color-text-secondary)]">
    Format: exemple@domaine.com
  </p>
  {errors.email && (
    <p id="email-error" role="alert" className="text-xs text-[var(--color-error)]">
      {errors.email}
    </p>
  )}
</div>

// Bouton de soumission avec état de chargement
<button
  type="submit"
  aria-disabled={isSubmitting}
  aria-busy={isSubmitting}
>
  {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
</button>
```

### Live regions (notifications dynamiques)

```tsx
// Annonces pour les lecteurs d'écran
<div aria-live="polite" aria-atomic="true" className="sr-only" id="announcer">
  {announcement}
</div>
// Usage: setAnnouncement('Commande #123 créée avec succès')

// Compteur de résultats de filtrage
<p aria-live="polite" className="sr-only">
  {filteredCount} résultats trouvés
</p>
```

---

## Print Stylesheet

```css
/* globals.css */
@media print {
  /* Masquer éléments non imprimables */
  .sidebar,
  .header,
  .mobile-tab-bar,
  .no-print,
  button,
  nav {
    display: none !important;
  }

  /* Mise en page impression */
  body { background: white; color: black; font-size: 12pt; }
  main { padding: 0; margin: 0; }

  /* Forcer affichage complet des tables */
  table { page-break-inside: auto; }
  tr    { page-break-inside: avoid; page-break-after: auto; }
  thead { display: table-header-group; }
  tfoot { display: table-footer-group; }

  /* Éviter coupure dans les cards */
  .card, .invoice-section { page-break-inside: avoid; }

  /* Afficher les URLs dans les liens */
  a[href]::after { content: ' (' attr(href) ')'; font-size: 10pt; color: #666; }
  a[href^="#"]::after,
  a[href^="javascript:"]::after { content: ''; }

  /* En-tête d'impression */
  @page {
    margin: 20mm;
    @top-center { content: "[Nom Application]"; }
    @bottom-right { content: 'Page ' counter(page) ' / ' counter(pages); }
  }
}
```

---

## Keyboard Shortcuts

```tsx
// hooks/useKeyboardShortcuts.ts
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Shortcut {
  key: string
  ctrlOrMeta?: boolean
  shift?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return

      for (const shortcut of shortcuts) {
        const metaMatch = shortcut.ctrlOrMeta ? (e.ctrlKey || e.metaKey) : true
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey
        if (e.key === shortcut.key && metaMatch && shiftMatch) {
          e.preventDefault()
          shortcut.action()
          return
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [shortcuts])
}

// Composant d'aide aux raccourcis (modale ? key)
export function KeyboardShortcutsHelp({ shortcuts }: { shortcuts: Shortcut[] }) {
  return (
    <div role="dialog" aria-label="Raccourcis clavier">
      <h3 className="font-semibold mb-4">Raccourcis clavier</h3>
      <dl className="space-y-2">
        {shortcuts.map((s, i) => (
          <div key={i} className="flex justify-between gap-4">
            <dt className="text-sm text-[var(--color-text-secondary)]">{s.description}</dt>
            <dd>
              <kbd className="text-xs font-mono bg-[var(--color-surface-subtle)] border border-[var(--color-border)] px-1.5 py-0.5 rounded">
                {s.ctrlOrMeta && '⌘/Ctrl + '}{s.shift && '⇧ + '}{s.key}
              </kbd>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// Usage dans un layout:
// const router = useRouter()
// useKeyboardShortcuts([
//   { key: 'g', action: () => router.push('/dashboard'), description: 'Aller au tableau de bord' },
//   { key: 'n', action: () => router.push('/commandes/new'), description: 'Nouvelle commande' },
//   { key: '/', action: () => searchRef.current?.focus(), description: 'Rechercher' },
//   { key: '?', shift: true, action: openHelpModal, description: 'Afficher les raccourcis' },
// ])
```
