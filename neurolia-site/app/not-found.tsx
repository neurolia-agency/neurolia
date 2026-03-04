import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-8">Page introuvable</p>
        <Link href="/" className="cta-outline-btn group inline-flex items-center gap-2.5 px-4 py-2 bg-transparent border border-[#C45C3B] hover:bg-[#C45C3B]">
          <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#C45C3B] group-hover:text-[#050810] transition-colors duration-300">
            Retour à l&apos;accueil
          </span>
          <svg
            className="w-3.5 h-3.5 text-[#C45C3B] group-hover:text-[#050810] transition-all duration-300 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
