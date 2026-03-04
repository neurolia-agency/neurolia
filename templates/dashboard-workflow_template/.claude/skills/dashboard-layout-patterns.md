# Skill: dashboard-layout-patterns

Composants TypeScript/React complets pour la structure d'un dashboard. Tous les composants utilisent les tokens CSS de `globals.css`. Mobile-first avec touch targets 44px minimum.

---

## Règles d'utilisation

1. Copier les composants dans `components/dashboard/`
2. Adapter les `navItems` et les routes au projet
3. Les tokens CSS (`--color-*`, `--spacing-*`, etc.) doivent être définis dans `globals.css`
4. Utiliser `app/(dashboard)/layout.tsx` comme layout racine du dashboard

---

## Sidebar Component

```tsx
// components/dashboard/Sidebar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
  children?: NavItem[]
}

interface SidebarProps {
  navItems: NavItem[]
  bottomItems?: NavItem[]
  logo?: React.ReactNode
  userInfo?: {
    name: string
    role: string
    avatar?: string
  }
  defaultCollapsed?: boolean
}

export function Sidebar({
  navItems,
  bottomItems = [],
  logo,
  userInfo,
  defaultCollapsed = false,
}: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])

  // Restore collapsed state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed')
    if (stored !== null) setCollapsed(stored === 'true')
  }, [])

  const toggleCollapsed = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar-collapsed', String(next))
  }

  const toggleGroup = (href: string) => {
    setExpandedGroups(prev =>
      prev.includes(href) ? prev.filter(h => h !== href) : [...prev, href]
    )
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)]',
        'transition-[width] duration-200 ease-in-out',
        collapsed ? 'w-16' : 'w-[280px]'
      )}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--color-border)] shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            {logo ?? <span className="font-bold text-[var(--color-text-primary)] truncate">Dashboard</span>}
          </div>
        )}
        <button
          onClick={toggleCollapsed}
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-md',
            'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
            'hover:bg-[var(--color-surface-hover)] transition-colors',
            collapsed && 'mx-auto'
          )}
          aria-label={collapsed ? 'Développer la barre latérale' : 'Réduire la barre latérale'}
        >
          <ChevronIcon collapsed={collapsed} />
        </button>
      </div>

      {/* User Info */}
      {userInfo && (
        <div className={cn(
          'flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] shrink-0',
          collapsed && 'justify-center px-2'
        )}>
          <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center shrink-0 text-white text-sm font-medium">
            {userInfo.avatar
              ? <img src={userInfo.avatar} alt="" className="w-full h-full rounded-full object-cover" />
              : userInfo.name.charAt(0).toUpperCase()
            }
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{userInfo.name}</p>
              <p className="text-xs text-[var(--color-text-secondary)] truncate">{userInfo.role}</p>
            </div>
          )}
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2" aria-label="Navigation principale">
        <ul className="space-y-0.5" role="list">
          {navItems.map(item => (
            <NavItemComponent
              key={item.href}
              item={item}
              collapsed={collapsed}
              isActive={isActive}
              expandedGroups={expandedGroups}
              onToggleGroup={toggleGroup}
            />
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      {bottomItems.length > 0 && (
        <div className="border-t border-[var(--color-border)] py-3 px-2 shrink-0">
          <ul className="space-y-0.5" role="list">
            {bottomItems.map(item => (
              <NavItemComponent
                key={item.href}
                item={item}
                collapsed={collapsed}
                isActive={isActive}
                expandedGroups={expandedGroups}
                onToggleGroup={toggleGroup}
              />
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}

function NavItemComponent({
  item,
  collapsed,
  isActive,
  expandedGroups,
  onToggleGroup,
}: {
  item: NavItem
  collapsed: boolean
  isActive: (href: string) => boolean
  expandedGroups: string[]
  onToggleGroup: (href: string) => void
}) {
  const active = isActive(item.href)
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expandedGroups.includes(item.href)

  if (hasChildren && !collapsed) {
    return (
      <li>
        <button
          onClick={() => onToggleGroup(item.href)}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm min-h-[44px]',
            'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
            'hover:bg-[var(--color-surface-hover)] transition-colors',
            active && 'text-[var(--color-text-primary)] bg-[var(--color-surface-active)]'
          )}
          aria-expanded={isExpanded}
        >
          <span className="w-5 h-5 shrink-0">{item.icon}</span>
          <span className="flex-1 text-left truncate">{item.label}</span>
          <span className={cn('transition-transform duration-150', isExpanded && 'rotate-90')}>›</span>
        </button>
        {isExpanded && (
          <ul className="mt-0.5 ml-4 pl-4 border-l border-[var(--color-border)] space-y-0.5">
            {item.children!.map(child => (
              <NavItemComponent
                key={child.href}
                item={child}
                collapsed={false}
                isActive={isActive}
                expandedGroups={expandedGroups}
                onToggleGroup={onToggleGroup}
              />
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li>
      <Link
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-md text-sm min-h-[44px]',
          'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
          'hover:bg-[var(--color-surface-hover)] transition-colors',
          active && 'text-[var(--color-accent)] bg-[var(--color-accent-muted)] font-medium',
          collapsed && 'justify-center px-2'
        )}
        aria-current={active ? 'page' : undefined}
      >
        <span className="w-5 h-5 shrink-0">{item.icon}</span>
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto min-w-[20px] h-5 px-1 rounded-full bg-[var(--color-accent)] text-white text-xs font-medium flex items-center justify-center">
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </>
        )}
        {collapsed && item.badge !== undefined && item.badge > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
        )}
      </Link>
    </li>
  )
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      className={cn('transition-transform duration-200', collapsed && 'rotate-180')}
    >
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
```

---

## Header Component

```tsx
// components/dashboard/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  // Custom breadcrumb segments override; if omitted, auto-generated from pathname
  breadcrumbs?: { label: string; href?: string }[]
  onMenuClick?: () => void // Mobile hamburger callback
  showMobileMenu?: boolean
  userInfo?: {
    name: string
    email?: string
    avatar?: string
    role?: string
  }
  notificationCount?: number
  onNotificationsClick?: () => void
  actions?: React.ReactNode // Slot for custom header actions
}

export function Header({
  breadcrumbs,
  onMenuClick,
  showMobileMenu = false,
  userInfo,
  notificationCount = 0,
  onNotificationsClick,
  actions,
}: HeaderProps) {
  const pathname = usePathname()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const resolvedBreadcrumbs = breadcrumbs ?? generateBreadcrumbs(pathname)

  return (
    <header className="flex items-center h-16 px-4 gap-4 bg-[var(--color-surface)] border-b border-[var(--color-border)] shrink-0">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
        aria-label="Ouvrir le menu"
        aria-expanded={showMobileMenu}
      >
        <HamburgerIcon />
      </button>

      {/* Breadcrumb */}
      <nav className="flex-1 overflow-hidden" aria-label="Fil d'Ariane">
        <ol className="flex items-center gap-1.5 text-sm min-w-0" role="list">
          {resolvedBreadcrumbs.map((crumb, index) => {
            const isLast = index === resolvedBreadcrumbs.length - 1
            return (
              <li key={index} className="flex items-center gap-1.5 min-w-0">
                {index > 0 && (
                  <span className="text-[var(--color-text-tertiary)] shrink-0" aria-hidden="true">/</span>
                )}
                {isLast ? (
                  <span className="text-[var(--color-text-primary)] font-medium truncate" aria-current="page">
                    {crumb.label}
                  </span>
                ) : crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors truncate"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--color-text-secondary)] truncate">{crumb.label}</span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        {actions}

        {/* Notifications */}
        <button
          onClick={onNotificationsClick}
          className="relative flex items-center justify-center w-10 h-10 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
          aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} non lues)` : ''}`}
        >
          <BellIcon />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-0.5 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* User menu */}
        {userInfo && (
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(prev => !prev)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--color-surface-hover)] transition-colors min-h-[44px]"
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-medium shrink-0">
                {userInfo.avatar
                  ? <img src={userInfo.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                  : userInfo.name.charAt(0).toUpperCase()
                }
              </div>
              <span className="hidden md:block text-sm text-[var(--color-text-primary)] font-medium max-w-[120px] truncate">
                {userInfo.name}
              </span>
              <ChevronDownIcon />
            </button>

            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} aria-hidden="true" />
                <div
                  className="absolute right-0 top-full mt-1 w-56 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg z-20 py-1"
                  role="menu"
                >
                  <div className="px-3 py-2 border-b border-[var(--color-border)]">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{userInfo.name}</p>
                    {userInfo.email && (
                      <p className="text-xs text-[var(--color-text-secondary)] truncate">{userInfo.email}</p>
                    )}
                    {userInfo.role && (
                      <p className="text-xs text-[var(--color-text-tertiary)]">{userInfo.role}</p>
                    )}
                  </div>
                  <Link
                    href="/parametres/profil"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profil
                  </Link>
                  <Link
                    href="/parametres"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Paramètres
                  </Link>
                  <div className="border-t border-[var(--color-border)] mt-1 pt-1">
                    <button
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error-muted)] transition-colors"
                      role="menuitem"
                      onClick={() => { setUserMenuOpen(false); /* handle sign out */ }}
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

function generateBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split('/').filter(Boolean)
  return segments.map((segment, index) => ({
    label: formatSegment(segment),
    href: '/' + segments.slice(0, index + 1).join('/'),
  }))
}

function formatSegment(segment: string): string {
  // [locale] segments: skip or capitalize
  if (segment.length === 2 || segment.length === 5) return segment.toUpperCase()
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2a6 6 0 0 1 6 6v2.5l1.5 2.5H2.5L4 10.5V8a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 16a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
```

---

## Mobile Bottom Tab Bar

```tsx
// components/dashboard/MobileTabBar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface TabItem {
  label: string
  href: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode // optional filled icon when active
  badge?: number
}

interface MobileTabBarProps {
  tabs: TabItem[]
}

export function MobileTabBar({ tabs }: MobileTabBarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav
      className="lg:hidden flex items-stretch h-16 bg-[var(--color-surface)] border-t border-[var(--color-border)] safe-pb"
      aria-label="Navigation principale"
    >
      {tabs.map(tab => {
        const active = isActive(tab.href)
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 relative',
              'min-h-[44px] transition-colors',
              'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]',
              active && 'text-[var(--color-accent)]'
            )}
            aria-current={active ? 'page' : undefined}
          >
            {/* Active indicator bar */}
            {active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[var(--color-accent)] rounded-full" />
            )}

            {/* Icon */}
            <span className="w-6 h-6 relative">
              {active && tab.activeIcon ? tab.activeIcon : tab.icon}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold flex items-center justify-center">
                  {tab.badge > 9 ? '9+' : tab.badge}
                </span>
              )}
            </span>

            {/* Label */}
            <span className="text-[10px] font-medium leading-none truncate max-w-full px-1">
              {tab.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
```

---

## Breadcrumb Component (auto-generated)

```tsx
// components/dashboard/Breadcrumb.tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BreadcrumbSegment {
  label: string
  href?: string
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[]
  className?: string
  maxVisible?: number // truncate long paths on mobile
}

export function Breadcrumb({ segments, className, maxVisible = 3 }: BreadcrumbProps) {
  // On mobile, show only the last maxVisible segments
  const visibleSegments = segments.length > maxVisible
    ? [segments[0], { label: '...', href: undefined }, ...segments.slice(-Math.floor(maxVisible / 2))]
    : segments

  return (
    <nav className={cn('flex', className)} aria-label="Fil d'Ariane">
      <ol className="flex items-center flex-wrap gap-1 text-sm" role="list">
        {visibleSegments.map((segment, index) => {
          const isLast = index === visibleSegments.length - 1
          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-[var(--color-text-tertiary)] shrink-0">
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {isLast ? (
                <span
                  className="text-[var(--color-text-primary)] font-medium"
                  aria-current="page"
                >
                  {segment.label}
                </span>
              ) : segment.href ? (
                <Link
                  href={segment.href}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  {segment.label}
                </Link>
              ) : (
                <span className="text-[var(--color-text-tertiary)]">{segment.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
```

---

## Layout Composition (Next.js App Router)

### Structure des routes par rôle

```
app/
├── (auth)/                  # Auth pages — no sidebar
│   ├── layout.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── account-created/page.tsx
│
├── (owner)/                 # Owner/admin pages — full sidebar
│   ├── layout.tsx
│   ├── dashboard/page.tsx
│   ├── [entite-1]/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   └── parametres/page.tsx
│
└── (staff)/                 # Staff pages — limited sidebar
    ├── layout.tsx
    └── dashboard/page.tsx
```

### Auth Layout

```tsx
// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
```

### Owner Dashboard Layout

```tsx
// app/(owner)/layout.tsx
'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Header } from '@/components/dashboard/Header'
import { MobileTabBar } from '@/components/dashboard/MobileTabBar'
import { navItems, bottomNavItems, tabItems } from '@/lib/dashboard/nav-config'
import { useUser } from '@/lib/auth/use-user'
import { cn } from '@/lib/utils'

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => { setMobileMenuOpen(false) }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-background)]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar
          navItems={navItems}
          bottomItems={bottomNavItems}
          userInfo={user ? { name: user.name, role: user.role } : undefined}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div className={cn(
        'lg:hidden fixed inset-y-0 left-0 z-50 w-72 flex flex-col',
        'transform transition-transform duration-250 ease-out',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <Sidebar
          navItems={navItems}
          bottomItems={bottomNavItems}
          userInfo={user ? { name: user.name, role: user.role } : undefined}
        />
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Header
          onMenuClick={() => setMobileMenuOpen(prev => !prev)}
          showMobileMenu={mobileMenuOpen}
          userInfo={user ? { name: user.name, email: user.email, role: user.role } : undefined}
        />

        <main
          className="flex-1 overflow-y-auto p-4 md:p-6"
          id="main-content"
        >
          {children}
        </main>

        {/* Mobile Tab Bar */}
        <MobileTabBar tabs={tabItems} />
      </div>
    </div>
  )
}
```

### Nav Configuration File

```ts
// lib/dashboard/nav-config.tsx
import type { NavItem } from '@/components/dashboard/Sidebar'
import type { TabItem } from '@/components/dashboard/MobileTabBar'

// Reuse SVG icons or import from icon library
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 9.5L10 3l7 6.5V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)

export const navItems: NavItem[] = [
  { label: 'Tableau de bord', href: '/dashboard', icon: <HomeIcon /> },
  // Add project-specific items below:
  // { label: 'Commandes', href: '/commandes', icon: <OrdersIcon />, badge: 3 },
  // { label: 'Produits', href: '/produits', icon: <ProductsIcon />, children: [
  //   { label: 'Catalogue', href: '/produits/catalogue', icon: <span /> },
  //   { label: 'Catégories', href: '/produits/categories', icon: <span /> },
  // ]},
]

export const bottomNavItems: NavItem[] = [
  // { label: 'Paramètres', href: '/parametres', icon: <SettingsIcon /> },
  // { label: 'Déconnexion', href: '/auth/signout', icon: <LogoutIcon /> },
]

export const tabItems: TabItem[] = [
  // Mirror the 4-5 most important navItems for mobile tab bar
  { label: 'Accueil', href: '/dashboard', icon: <HomeIcon /> },
]
```

---

## Responsive Pattern: Sidebar desktop + Tab bar mobile

```tsx
// Pattern de switch responsive intégré au layout
// - lg et plus → sidebar visible, tab bar cachée
// - < lg → sidebar cachée (drawer), tab bar visible en bas

// CSS classes summary:
// Sidebar container:  className="hidden lg:flex"
// Tab bar container:  className="lg:hidden"
// Mobile drawer:      className="lg:hidden fixed inset-y-0 left-0 z-50 w-72"

// Tailwind breakpoints utilisés:
// lg = 1024px (apparition sidebar + disparition tab bar)

// Touch targets: min-h-[44px] sur tous les éléments interactifs
// Safe area: classe "safe-pb" sur MobileTabBar pour env(safe-area-inset-bottom)
```

```css
/* globals.css — à ajouter */
.safe-pb {
  padding-bottom: env(safe-area-inset-bottom);
}
```
