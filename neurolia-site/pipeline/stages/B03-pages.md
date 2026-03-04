# Étape 06 : Pages Secondaires

> **Phase B : Design / Vibe Coding** - Utiliser `frontend-design` pour chaque section.

## Invocation frontend-design

**OBLIGATOIRE** : Pour chaque section UI de cette étape, utiliser le skill frontend-design :

```bash
/frontend-design
```

**Workflow vibe coding** :
1. Lire la section du wireframe de la page
2. Invoquer `/frontend-design` avec le brief
3. Réviser visuellement dans le navigateur
4. Itérer jusqu'à satisfaction
5. Passer à la section/page suivante

---

## Objectif

Créer les pages secondaires (Services, Portfolio, Contact, About), chaque page utilisant **uniquement son wireframe**.

## Input

| Page | Wireframe |
|------|-----------|
| Services | `output/03.5-wireframes/services.md` |
| Portfolio | `output/03.5-wireframes/portfolio.md` |
| Contact | `output/03.5-wireframes/contact.md` |
| About | `output/03.5-wireframes/about.md` |

**Fichiers techniques** :
- `app/globals.css` (design tokens - source unique)

**IMPORTANT** : Pattern "Lazy Context Loading" (comme étape 05) :
1. Chaque page lit d'abord son wireframe
2. Résoudre les références `fichier.md > clé` vers `01-brand/` à la demande
3. **Exception** : Page Contact peut lire `about.md` pour les coordonnées (email, téléphone, adresse)

Voir `pipeline_workflow/DEPENDENCIES.md` pour le détail des exceptions.

---

## Pattern Suspense pour Streaming

Wrapper chaque section avec Suspense pour un chargement progressif:

```tsx
import { Suspense } from 'react'
import { PageSkeleton, SectionSkeleton } from '@/components/skeletons'

export default function ServicesPage() {
  return (
    <>
      <Suspense fallback={<PageSkeleton />}>
        <ServicesHero />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ServicesGrid />
      </Suspense>

      {/* ... autres sections */}
    </>
  )
}
```

**Réutiliser** les skeletons créés dans `components/skeletons/`.

---

## Bonnes Pratiques Next.js 16 (2025)

### Server Components vs Client Components par Page

| Page | Composants Server | Composants Client |
|------|-------------------|-------------------|
| Services | Hero, ServicesGrid, Process, FAQ | AnimatedSection (wrapper) |
| Portfolio | Hero, ProjectsGrid, CaseStudy | AnimatedSection |
| Contact | Hero, Coordinates | **ContactForm** (form interactif) |
| About | Hero, Mission, Values, Stats | AnimatedSection |

### Pattern de Réutilisation

```tsx
// Les composants réutilisables sont dans components/sections/
// CtaFinal est partagé entre toutes les pages
import CtaFinal from '@/components/sections/cta-final'

// Les composants spécifiques à une page sont dans components/pages/[page]/
import ServicesHero from '@/components/pages/services/hero'
```

---

## Workflow : Page par Page

Pour **chaque page** :

1. **Lire** le wireframe correspondant (`03.5-wireframes/[page].md`)
2. **Traiter** section par section (comme pour Homepage)
3. **Résoudre** les références `fichier.md > clé` à la volée
4. **Déterminer** Server vs Client Component pour chaque section
5. **Créer** les composants et la page

---

## Page 1 : Services (`/services`)

**Wireframe** : `output/03.5-wireframes/services.md`

### Sections attendues

| Section | Composant | Type | Outil |
|---------|-----------|------|-------|
| Hero page | `components/pages/services/hero.tsx` | Server | frontend-design |
| Grid 7 services | `components/pages/services/services-grid.tsx` | Server | frontend-design |
| Process | `components/pages/services/process.tsx` | Server | frontend-design |
| FAQ | `components/pages/services/faq.tsx` | Server | frontend-design |
| CTA | Réutiliser `components/sections/cta-final.tsx` | Server | - |

### Assemblage

```tsx
// app/services/page.tsx
import { Metadata } from 'next'
import ServicesHero from '@/components/pages/services/hero'
import ServicesGrid from '@/components/pages/services/services-grid'
import Process from '@/components/pages/services/process'
import Faq from '@/components/pages/services/faq'
import CtaFinal from '@/components/sections/cta-final'

export const metadata: Metadata = {
  title: 'Services - Neurolia',
  description: 'Nos leviers de croissance : design web, automatisation, SEO...',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <Process />
      <Faq />
      <CtaFinal />
    </>
  )
}
```

---

## Page 2 : Portfolio (`/portfolio`)

**Wireframe** : `output/03.5-wireframes/portfolio.md`

### Sections attendues

| Section | Composant | Type | Outil |
|---------|-----------|------|-------|
| Hero page | `components/pages/portfolio/hero.tsx` | Server | frontend-design |
| Grid projets | `components/pages/portfolio/projects-grid.tsx` | Server | frontend-design |
| Étude de cas | `components/pages/portfolio/case-study.tsx` | Server | frontend-design |
| CTA | Réutiliser `cta-final.tsx` | Server | - |

### Assemblage

```tsx
// app/portfolio/page.tsx
import { Metadata } from 'next'
import PortfolioHero from '@/components/pages/portfolio/hero'
import ProjectsGrid from '@/components/pages/portfolio/projects-grid'
import CaseStudy from '@/components/pages/portfolio/case-study'
import CtaFinal from '@/components/sections/cta-final'

export const metadata: Metadata = {
  title: 'Portfolio - Neurolia',
  description: 'Découvrez nos réalisations : sites web, automatisations, identités visuelles.',
}

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <ProjectsGrid />
      <CaseStudy />
      <CtaFinal />
    </>
  )
}
```

---

## Page 3 : Contact (`/contact`)

**Wireframe** : `output/03.5-wireframes/contact.md`

### Sections attendues

| Section | Composant | Type | Outil |
|---------|-----------|------|-------|
| Hero page | `components/pages/contact/hero.tsx` | Server | frontend-design |
| Form complet | `components/pages/contact/contact-form.tsx` | **Client** | shadcn/ui + Server Action |
| Coordonnées | `components/pages/contact/coordinates.tsx` | Server | frontend-design |

### Stack Contact Form (OBLIGATOIRE)

Réutiliser le même pattern que la section Contact mini de la Homepage :

```bash
# Dépendances (si pas déjà installées)
npm install react-hook-form @hookform/resolvers zod sonner
npx shadcn@latest add input textarea select field button
```

### Server Action (réutiliser ou étendre)

Le fichier `app/actions/contact.ts` créé à l'étape 05 peut être étendu pour le formulaire complet :

```tsx
// app/actions/contact.ts
"use server"

import { z } from "zod"

// Schema étendu pour le formulaire complet
const contactFullSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  subject: z.enum(["projet-web", "automatisation", "conseil", "autre"]),
  message: z.string().min(10, "Message trop court"),
  budget: z.enum(["<5k", "5k-10k", "10k-20k", ">20k"]).optional(),
})

export type ContactFullFormState = {
  success: boolean
  errors: Record<string, string[]> | null
  message?: string
}

export async function submitContactFullForm(
  _prevState: ContactFullFormState,
  formData: FormData
): Promise<ContactFullFormState> {
  const values = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string || undefined,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    budget: formData.get("budget") as string || undefined,
  }

  const result = contactFullSchema.safeParse(values)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  // TODO: Envoyer email (Resend, SendGrid, Mailgun)
  // await sendEmail(result.data)

  return {
    success: true,
    errors: null,
    message: "Message envoyé ! Nous vous répondrons sous 24h.",
  }
}
```

### Client Component Form

```tsx
// components/pages/contact/contact-form.tsx
"use client"

import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { submitContactFullForm } from "@/app/actions/contact"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.enum(["projet-web", "automatisation", "conseil", "autre"]),
  message: z.string().min(10),
  budget: z.enum(["<5k", "5k-10k", "10k-20k", ">20k"]).optional(),
})

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactFullForm,
    { success: false, errors: null }
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "projet-web",
      message: "",
    },
  })

  if (state.success && state.message) {
    toast.success(state.message)
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Nom */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nom <span className="text-destructive">*</span>
        </label>
        <Input
          {...form.register("name")}
          id="name"
          name="name"
          placeholder="Votre nom"
          aria-invalid={!!state.errors?.name}
        />
        {state.errors?.name && (
          <p className="text-destructive text-sm mt-1">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-destructive">*</span>
        </label>
        <Input
          {...form.register("email")}
          id="email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          aria-invalid={!!state.errors?.email}
        />
        {state.errors?.email && (
          <p className="text-destructive text-sm mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      {/* Téléphone (optionnel) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Téléphone
        </label>
        <Input
          {...form.register("phone")}
          id="phone"
          name="phone"
          type="tel"
          placeholder="06 12 34 56 78"
        />
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Sujet <span className="text-destructive">*</span>
        </label>
        <Select name="subject" defaultValue="projet-web">
          <SelectTrigger>
            <SelectValue placeholder="Choisir un sujet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="projet-web">Projet web</SelectItem>
            <SelectItem value="automatisation">Automatisation</SelectItem>
            <SelectItem value="conseil">Conseil</SelectItem>
            <SelectItem value="autre">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-destructive">*</span>
        </label>
        <Textarea
          {...form.register("message")}
          id="message"
          name="message"
          placeholder="Décrivez votre projet, vos objectifs..."
          rows={6}
          aria-invalid={!!state.errors?.message}
        />
        {state.errors?.message && (
          <p className="text-destructive text-sm mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      {/* Budget (optionnel) */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium mb-2">
          Budget estimé
        </label>
        <Select name="budget">
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner (optionnel)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<5k">Moins de 5 000 €</SelectItem>
            <SelectItem value="5k-10k">5 000 € - 10 000 €</SelectItem>
            <SelectItem value="10k-20k">10 000 € - 20 000 €</SelectItem>
            <SelectItem value=">20k">Plus de 20 000 €</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full"
      >
        {isPending ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  )
}
```

### Assemblage Page Contact

```tsx
// app/contact/page.tsx
import { Metadata } from 'next'
import ContactHero from '@/components/pages/contact/hero'
import ContactForm from '@/components/pages/contact/contact-form'
import Coordinates from '@/components/pages/contact/coordinates'

export const metadata: Metadata = {
  title: 'Contact - Neurolia',
  description: 'Parlons de votre projet. Contactez-nous pour un devis gratuit.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />    {/* Client Component */}
            <Coordinates />    {/* Server Component */}
          </div>
        </div>
      </section>
    </>
  )
}
```

---

## Page 4 : About (`/about`)

**Wireframe** : `output/03.5-wireframes/about.md`

### Sections attendues

| Section | Composant | Type | Outil |
|---------|-----------|------|-------|
| Hero page | `components/pages/about/hero.tsx` | Server | frontend-design |
| Mission | `components/pages/about/mission.tsx` | Server | frontend-design |
| Valeurs | `components/pages/about/values.tsx` | Server | frontend-design |
| Chiffres | `components/pages/about/stats.tsx` | Server | frontend-design |
| CTA | Réutiliser `cta-final.tsx` | Server | - |

### Assemblage

```tsx
// app/about/page.tsx
import { Metadata } from 'next'
import AboutHero from '@/components/pages/about/hero'
import Mission from '@/components/pages/about/mission'
import Values from '@/components/pages/about/values'
import Stats from '@/components/pages/about/stats'
import CtaFinal from '@/components/sections/cta-final'

export const metadata: Metadata = {
  title: 'À propos - Neurolia',
  description: 'Découvrez notre mission : créer des business qui respirent.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Mission />
      <Values />
      <Stats />
      <CtaFinal />
    </>
  )
}
```

---

## Output

```
app/
├── services/
│   └── page.tsx
├── portfolio/
│   └── page.tsx
├── contact/
│   └── page.tsx
├── about/
│   └── page.tsx
└── actions/
    └── contact.ts              # Server Actions (mini + full)

components/pages/
├── services/
│   ├── hero.tsx               (Server)
│   ├── services-grid.tsx      (Server)
│   ├── process.tsx            (Server)
│   └── faq.tsx                (Server)
├── portfolio/
│   ├── hero.tsx               (Server)
│   ├── projects-grid.tsx      (Server)
│   └── case-study.tsx         (Server)
├── contact/
│   ├── hero.tsx               (Server)
│   ├── contact-form.tsx       (Client - "use client")
│   └── coordinates.tsx        (Server)
└── about/
    ├── hero.tsx               (Server)
    ├── mission.tsx            (Server)
    ├── values.tsx             (Server)
    └── stats.tsx              (Server)
```

---

## Résumé : Outil par Page

| Page | frontend-design | shadcn/ui | Server Actions |
|------|-------------------|-----------|----------------|
| Services | 100% | 0% | Non |
| Portfolio | 100% | 0% | Non |
| Contact | 60% | 40% (form) | **Oui** |
| About | 100% | 0% | Non |

---

## Validation

- [ ] 4 pages créées avec metadata SEO
- [ ] Chaque page lit uniquement son wireframe
- [ ] Composants organisés par page dans `components/pages/`
- [ ] **Server/Client Components** correctement séparés
- [ ] Contact form avec react-hook-form + zod + Server Action
- [ ] shadcn/ui uniquement pour Contact form (Input, Textarea, Select)
- [ ] Responsive mobile-first
- [ ] CTA Final réutilisé sur toutes les pages
- [ ] Accessibilité : labels, aria-invalid, focus visible

---

## Prochaine Étape

→ `stages/07-polish.md`
