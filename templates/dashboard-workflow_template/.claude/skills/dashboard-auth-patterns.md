# Skill : dashboard-auth-patterns

## Description

Snippets complets et prets a l'emploi pour implementer l'authentification Supabase dans un dashboard Next.js : clients, middleware, layouts, invitation flow.

## Usage

Invoquer pendant B01-setup pour le setup auth complet.

## Snippets

### 1. Supabase Browser Client — `lib/supabase/client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 2. Supabase Server Client — `lib/supabase/server.ts`

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component — ignore
          }
        },
      },
    }
  )
}
```

### 3. Supabase Admin Client — `lib/supabase/admin.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

// WARNING: JAMAIS utiliser cote client — Server Actions et API Routes uniquement
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)
```

### 4. Middleware — `middleware.ts`

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes publiques (pas d'auth requise)
const PUBLIC_ROUTES = ['/login', '/register', '/register-staff', '/forgot-password', '/auth/callback']

// Redirections par role
const ROLE_REDIRECTS: Record<string, string> = {
  owner: '/dashboard',
  staff: '/[STAFF_HOME]',
}

// Routes par role (prefix → role requis)
const ROLE_ROUTES: Record<string, string[]> = {
  owner: ['/dashboard', '/[entite-1]', '/[entite-2]', '/settings'],
  staff: ['/[staff-home]', '/[staff-tasks]', '/profile'],
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // Route publique → laisser passer
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    // Si deja connecte sur /login → redirect vers home du role
    if (user && pathname === '/login') {
      const role = user.app_metadata?.role || 'owner'
      const redirectUrl = ROLE_REDIRECTS[role] || '/dashboard'
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
    return supabaseResponse
  }

  // Pas connecte → login
  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verification role
  const userRole = user.app_metadata?.role || 'owner'
  const allowedRoutes = ROLE_ROUTES[userRole] || []
  const isAllowed = allowedRoutes.some(route => pathname.startsWith(route))

  if (!isAllowed && pathname !== '/') {
    // Redirect vers home du role
    const redirectUrl = ROLE_REDIRECTS[userRole] || '/dashboard'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

### 5. Layout Auth (public) — `app/(auth)/layout.tsx`

```typescript
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[--bg-base]">
      <div className="w-full max-w-md px-4">
        {children}
      </div>
    </div>
  )
}
```

### 6. Layout Role (avec sidebar) — `app/(owner)/layout.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { MobileNav } from '@/components/layout/mobile-nav'

export default async function OwnerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[--bg-base]">
      <Sidebar user={profile} />
      <div className="lg:pl-[--sidebar-width]">
        <Header user={profile} />
        <main className="p-[--spacing-page]">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
```

### 7. Invitation Flow — Server Action

```typescript
'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const inviteSchema = z.object({
  email: z.string().email('Email invalide'),
  role: z.enum(['staff']),
})

export async function createInvitation(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Non authentifie' }

  const parsed = inviteSchema.safeParse({
    email: formData.get('email'),
    role: formData.get('role') || 'staff',
  })
  if (!parsed.success) return { success: false, error: parsed.error.flatten().fieldErrors }

  const { data, error } = await supabaseAdmin
    .from('invitations')
    .insert({
      owner_id: user.id,
      email: parsed.data.email,
      role: parsed.data.role,
    })
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  // TODO: Envoyer email d'invitation via n8n ou SMTP
  // const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/register-staff?token=${data.token}`

  revalidatePath('/settings/team')
  return { success: true, data }
}
```

### 8. Auth Callback Route — `app/auth/callback/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirect = searchParams.get('redirect') || '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${redirect}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
```

## Checklist Setup Auth

- [ ] 4 fichiers Supabase client crees (client, server, admin, middleware)
- [ ] middleware.ts avec routing par role
- [ ] Layout (auth)/ pour pages publiques
- [ ] Layout (owner)/ et (staff)/ pour pages protegees
- [ ] Auth callback route
- [ ] .env.example avec toutes les variables Supabase
- [ ] service_role JAMAIS expose cote client
- [ ] Routes publiques explicitement listees
- [ ] Redirections par role configurees
