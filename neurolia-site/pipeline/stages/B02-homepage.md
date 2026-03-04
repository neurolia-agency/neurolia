# Étape 05 : Homepage

> **Phase B : Design / Vibe Coding** - Utiliser `frontend-design` pour chaque section.

## Invocation frontend-design

**OBLIGATOIRE** : Pour chaque section UI de cette étape, utiliser le skill frontend-design :

```bash
/frontend-design
```

**Workflow vibe coding** :
1. Lire la section du wireframe
2. Invoquer `/frontend-design` avec le brief
3. Réviser visuellement dans le navigateur
4. Itérer jusqu'à satisfaction
5. Passer à la section suivante

---

## Objectif

Créer la page d'accueil **section par section**, chaque section utilisant uniquement sa partie du wireframe.

## Input

| Fichier | Usage |
|---------|-------|
| `output/03.5-wireframes/homepage.md` | **SEUL fichier de contenu** |
| `app/globals.css` | Design tokens (source unique) |

**IMPORTANT** : Utiliser le pattern "Lazy Context Loading" :
1. Lire d'abord le wireframe (seul fichier de contenu)
2. Résoudre les références `fichier.md > clé` vers `01-brand/` à la demande
3. Ne pas pré-charger tout le dossier brand/

Voir `pipeline_workflow/DEPENDENCIES.md` pour le détail du pattern.

---

## Bonnes Pratiques Next.js 16 (2025)

### Server Components vs Client Components

| Section | Type | Raison |
|---------|------|--------|
| Hero | **Server** | Contenu statique, SEO critique |
| ServicesPreview | **Server** | Liste statique |
| PortfolioPreview | **Server** | Images statiques |
| Testimonials | **Server** | Contenu statique |
| ContactMini | **Client** | Form interactif (react-hook-form) |
| CtaFinal | **Server** | Contenu statique |
| AnimatedSection | **Client** | Wrapper animations (useInView) |

### Pattern Suspense pour Streaming

Wrapper chaque section avec Suspense pour un chargement progressif:

```tsx
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ServicesPreview />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <PortfolioPreview />
      </Suspense>

      {/* ... autres sections */}
    </>
  )
}
```

**Créer:** `components/skeletons/` avec des composants skeleton pour chaque section.

### Pattern Animation avec Server Components

```tsx
// animated-section.tsx (Client Component)
"use client"

import { useRef } from 'react'
import { useInView } from 'motion/react'

export function AnimatedSection({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease"
      }}
    >
      {children}
    </section>
  )
}
```

```tsx
// hero.tsx (Server Component qui utilise le wrapper Client)
import { AnimatedSection } from '@/components/ui/animated-section'

export default function Hero() {
  return (
    <AnimatedSection className="section-padding">
      <h1>Un business qui respire.</h1>
      {/* Contenu statique server-rendered */}
    </AnimatedSection>
  )
}
```

---

## Stack Contact Form (OBLIGATOIRE)

### Dépendances à installer

```bash
npm install react-hook-form @hookform/resolvers zod sonner
npx shadcn@latest add input textarea field button
```

### Architecture Form

```
app/
├── actions/
│   └── contact.ts          # Server Action pour soumission
components/
├── sections/
│   └── contact-mini.tsx    # Client Component ("use client")
```

### Server Action (app/actions/contact.ts)

```tsx
"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Nom requis (min 2 caractères)"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Message trop court (min 10 caractères)"),
})

export type ContactFormState = {
  success: boolean
  errors: Record<string, string[]> | null
  message?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const values = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  }

  // Validation côté serveur
  const result = contactSchema.safeParse(values)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  // TODO: Envoyer email (Resend, SendGrid, etc.)
  // await sendEmail(result.data)

  return {
    success: true,
    errors: null,
    message: "Message envoyé avec succès !",
  }
}
```

### Client Component Form (contact-mini.tsx)

```tsx
"use client"

import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export default function ContactMini() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    { success: false, errors: null }
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  // Afficher toast sur succès
  if (state.success && state.message) {
    toast.success(state.message)
  }

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <h2>Parlons de votre projet</h2>
        <form action={formAction} className="space-y-4 max-w-md">
          <div>
            <Input
              {...form.register("name")}
              name="name"
              placeholder="Votre nom"
              aria-invalid={!!state.errors?.name}
            />
            {state.errors?.name && (
              <p className="text-destructive text-sm mt-1">{state.errors.name[0]}</p>
            )}
          </div>
          <div>
            <Input
              {...form.register("email")}
              name="email"
              type="email"
              placeholder="votre@email.com"
              aria-invalid={!!state.errors?.email}
            />
            {state.errors?.email && (
              <p className="text-destructive text-sm mt-1">{state.errors.email[0]}</p>
            )}
          </div>
          <div>
            <Textarea
              {...form.register("message")}
              name="message"
              placeholder="Décrivez votre projet..."
              rows={4}
              aria-invalid={!!state.errors?.message}
            />
            {state.errors?.message && (
              <p className="text-destructive text-sm mt-1">{state.errors.message[0]}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full"
          >
            {isPending ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </div>
    </section>
  )
}
```

---

## Workflow : Section par Section

Pour **chaque section** du wireframe `homepage.md` :

1. **Lire** uniquement la section concernée du wireframe
2. **Résoudre** les références (`positioning.md > clé`) en lisant le fichier brand/ correspondant
3. **Déterminer** si Server ou Client Component
4. **Appeler** frontend-design avec le brief de cette section
5. **Créer** le composant React

---

## Sections à Créer

### Section 1 : Hero

**Type** : Server Component (+ wrapper AnimatedSection)
**Wireframe** : `homepage.md > Section 1 : Hero`

**Prompt frontend-design** :
```
Créer section Hero pour Neurolia (Next.js 16)

Brief (depuis wireframe) :
- H1 : "Un business qui respire."
- Baseline : [résoudre depuis positioning.md]
- CTA : "Discuter de votre projet" → /contact
- Layout : Plein écran (min-h-screen), centré, typographie seule
- Interaction : Fade-in staggered via AnimatedSection wrapper
- Ref : papertiger.com

Architecture :
- Server Component (pas de "use client")
- Utiliser AnimatedSection wrapper pour animations

Contraintes :
- H1 : text-7xl desktop, text-5xl mobile (depuis globals.css)
- Pas d'image, typo = élément visuel
- Monochrome + accent au hover
- Classes Tailwind uniquement

Output : components/sections/hero.tsx (Server Component)
```

---

### Section 2 : Services (aperçu)

**Type** : Server Component
**Wireframe** : `homepage.md > Section 2 : Services`

**Prompt frontend-design** :
```
Créer section Services aperçu pour Neurolia

Brief (depuis wireframe) :
- Titre : "Nos leviers de croissance"
- 3 cards : [résoudre services.md > services 1, 2, 3]
- Lien : "Tous nos services" → /services
- Layout : Grid 3 colonnes (1 col mobile)
- Interaction : Hover scale via CSS (hover:scale-[1.02])
- Ref : eszterbial.com

Architecture : Server Component

Contraintes :
- Cards custom (pas de shadcn/ui Card)
- Stagger animation via AnimatedSection
- Icônes Lucide si nécessaire

Output : components/sections/services-preview.tsx
```

---

### Section 3 : Portfolio (aperçu)

**Type** : Server Component
**Wireframe** : `homepage.md > Section 3 : Portfolio`

**Prompt frontend-design** :
```
Créer section Portfolio aperçu pour Neurolia

Brief (depuis wireframe) :
- Titre : [résoudre positioning.md > portfolio_message]
- 2-3 projets (placeholder images)
- Lien : "Voir nos réalisations" → /portfolio
- Layout : Asymétrique, images grandes
- Interaction : Hover overlay avec titre projet
- Ref : papertiger.com

Architecture : Server Component

Contraintes :
- Images avec next/image (placeholder blur)
- Aspect ratio contrôlé

Output : components/sections/portfolio-preview.tsx
```

---

### Section 4 : Témoignages

**Type** : Server Component
**Wireframe** : `homepage.md > Section 4 : Témoignages`

**Prompt frontend-design** :
```
Créer section Témoignages pour Neurolia

Brief (depuis wireframe) :
- Titre : "Ils nous font confiance"
- 2 témoignages (placeholder)
- Layout : Stack vertical ou 2 colonnes

Architecture : Server Component

Output : components/sections/testimonials.tsx
```

---

### Section 5 : Contact (mini)

**Type** : Client Component
**Wireframe** : `homepage.md > Section 5 : Contact`

**Stack obligatoire** :
- react-hook-form + zod pour validation client
- Server Action pour soumission
- shadcn/ui Input + Textarea
- sonner pour toasts feedback

Voir section "Stack Contact Form" ci-dessus pour l'implémentation complète.

**Output** :
- `components/sections/contact-mini.tsx` (Client Component)
- `app/actions/contact.ts` (Server Action)

---

### Section 6 : CTA Final

**Type** : Server Component
**Wireframe** : `homepage.md > Section 6 : CTA Final`

**Prompt frontend-design** :
```
Créer section CTA Final pour Neurolia

Brief (depuis wireframe) :
- Titre : "Prêt à transformer votre présence digitale ?"
- CTA : "Discuter de votre projet" → /contact
- Layout : Pleine largeur, fond accent subtil (bg-primary/5)

Architecture : Server Component

Output : components/sections/cta-final.tsx
```

---

## Assemblage Page

Une fois toutes les sections créées, assembler dans `app/page.tsx` :

```tsx
import Hero from '@/components/sections/hero'
import ServicesPreview from '@/components/sections/services-preview'
import PortfolioPreview from '@/components/sections/portfolio-preview'
import Testimonials from '@/components/sections/testimonials'
import ContactMini from '@/components/sections/contact-mini'
import CtaFinal from '@/components/sections/cta-final'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <PortfolioPreview />
      <Testimonials />
      <ContactMini />
      <CtaFinal />
    </>
  )
}
```

---

## Output

```
app/
├── page.tsx                    # Assemblage homepage
└── actions/
    └── contact.ts              # Server Action contact

components/
├── sections/
│   ├── hero.tsx                (Server Component)
│   ├── services-preview.tsx    (Server Component)
│   ├── portfolio-preview.tsx   (Server Component)
│   ├── testimonials.tsx        (Server Component)
│   ├── contact-mini.tsx        (Client Component)
│   └── cta-final.tsx           (Server Component)
└── ui/
    └── animated-section.tsx    (Client Component - wrapper)
```

---

## Validation

- [ ] Chaque section créée individuellement
- [ ] Wireframe respecté (contenu, layout, interactions)
- [ ] **Server/Client Components** correctement séparés
- [ ] Contact form avec react-hook-form + zod + Server Action
- [ ] shadcn/ui uniquement pour Input/Textarea (pas Button/Card)
- [ ] Animations via AnimatedSection wrapper (useInView)
- [ ] Responsive mobile-first
- [ ] Accessibilité : labels, aria-invalid sur inputs

---

## Prochaine Étape

→ `stages/06-pages.md`
