import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'À Propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const serviceLinks = [
    { label: 'Site Vitrine', href: '/services#vitrine' },
    { label: 'E-commerce', href: '/services#ecommerce' },
    { label: 'SEO', href: '/services#seo' },
    { label: 'Automatisation', href: '/services#automation' },
    { label: 'Maintenance', href: '/services#maintenance' },
  ];

  const legalLinks = [
    { label: 'Mentions Légales', href: '/mentions-legales' },
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/neurolia.agency',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com/neurolia.agency',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/neurolia',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      ),
    },
    {
      label: 'X',
      href: 'https://x.com/neurolia_agency',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#050810' }}
    >
      {/* Subtle grid texture — same as other sections */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(196,92,59,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,92,59,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto pt-16 pb-10 lg:pt-24 lg:pb-12">

        {/* ── Top row: Brand + Nav columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 lg:gap-x-12">

          {/* Brand block — spans 5 cols on desktop */}
          <div className="md:col-span-5 lg:col-span-5">
            {/* Logo SVG — same as header for perfect consistency */}
            <Link
              href="/"
              className="inline-block transition-opacity duration-300 hover:opacity-80 mb-6"
              aria-label="Neurolia - Retour à l'accueil"
            >
              <svg
                viewBox="0 0 71.06 13.94"
                className="h-4 w-auto text-[#F5F5F5]"
                aria-label="Neurolia"
              >
                <path fill="currentColor" d="M7.78,6.66c.47.7.78,1.22,1.17,1.94-.06-.75-.1-1.5-.1-2.41v-3.71c0-1.07-.03-1.73-.13-2.47h3.47c-.1.73-.13,1.42-.13,2.47v8.65c0,.99.05,1.74.13,2.43h-3.57c-.29-.62-.67-1.22-1.22-2.07l-3.01-4.54c-.44-.65-.72-1.14-1.17-2,.08.73.11,1.63.11,2.43v3.65c0,1.12.03,1.84.13,2.54H0c.1-.63.13-1.35.13-2.56V2.43C.13,1.48.1.75,0,0h3.53c.16.44.52,1.09,1.16,2.04l3.09,4.62Z"/>
                <path fill="currentColor" d="M15.99,9.49c.16,1.32.93,2.02,2.21,2.02.65,0,1.22-.21,1.64-.6.24-.23.36-.41.49-.83l2.83.8c-.37.85-.62,1.22-1.07,1.68-.93.91-2.23,1.38-3.84,1.38s-2.85-.46-3.78-1.38c-.96-.98-1.48-2.36-1.48-3.97,0-3.22,2.07-5.36,5.18-5.36,2.54,0,4.31,1.38,4.88,3.81.13.52.2,1.21.24,2.13,0,.07,0,.16.02.33h-7.33ZM20.22,7.25c-.23-1.04-.93-1.6-2.05-1.6s-1.86.52-2.13,1.6h4.18Z"/>
                <path fill="currentColor" d="M34.37,3.61c-.1.77-.13,1.45-.13,2.44v5.03c0,1.12.03,1.79.13,2.44h-3.24v-.7c0-.08,0-.33.02-.44-1.07,1.01-2,1.4-3.39,1.4-1.09,0-1.97-.31-2.59-.91-.65-.65-.93-1.45-.93-2.74v-4.09c0-.94-.05-1.76-.13-2.44h3.39c-.1.78-.13,1.46-.13,2.44v3.34c0,.67.06.96.26,1.22.23.29.59.46,1.06.46.9,0,1.81-.64,2.44-1.68v-3.34c0-.91-.03-1.6-.13-2.44h3.37Z"/>
                <path fill="currentColor" d="M55.22,0c-.1.68-.13,1.35-.13,2.46v8.63c0,.98.03,1.6.13,2.46h-3.4c.1-.73.13-1.29.13-2.46V2.46c0-1.16-.03-1.84-.13-2.46h3.4Z"/>
                <path fill="currentColor" d="M59.42,3.61c-.1.67-.13,1.32-.13,2.46v5.01c0,.88.05,1.76.13,2.46h-3.4c.1-.8.13-1.42.13-2.46v-5.01c0-1.06-.03-1.73-.13-2.46h3.4ZM59.37,0v2.44h-3.3V0h3.3Z"/>
                <path fill="currentColor" d="M70.93,5.95c0-1.14.03-1.79.13-2.46h-3.4c.02.15.04.3.05.44-.71-.38-1.52-.61-2.38-.61-2.82,0-5.11,2.29-5.11,5.11s2.29,5.11,5.11,5.11c.87,0,1.67-.24,2.38-.61-.02.16-.03.32-.05.49h3.4c-.08-.7-.13-1.58-.13-2.46v-5.01ZM65.49,11.1c-1.47,0-2.67-1.19-2.67-2.67s1.19-2.67,2.67-2.67,2.67,1.19,2.67,2.67-1.19,2.67-2.67,2.67Z"/>
                <g>
                  <circle fill="#c45c3b" cx="45.91" cy="8.46" r="1.66"/>
                  <path fill="currentColor" d="M45.91,3.35c-2.82,0-5.11,2.29-5.11,5.11s2.29,5.11,5.11,5.11,5.11-2.29,5.11-5.11-2.29-5.11-5.11-5.11ZM45.91,11.14c-1.48,0-2.69-1.2-2.69-2.69s1.2-2.69,2.69-2.69,2.69,1.2,2.69,2.69-1.2,2.69-2.69,2.69Z"/>
                </g>
                <path fill="currentColor" d="M38.91,7.11c.36-.45.81-.72,1.37-.83.45-1.15,1.23-2.14,2.24-2.82-.29-.04-.54-.05-.84-.05-1.48,0-2.46.44-3.26,1.48v-1.29h-3.25c.1.7.13,1.27.13,2.46v5.02c0,1.06-.03,1.65-.13,2.46h3.38c-.1-.78-.13-1.4-.13-2.45v-2.54c.07-.72.18-1.06.49-1.45Z"/>
              </svg>
            </Link>

            {/* Description */}
            <p className="text-sm text-[#A3A3A3] leading-[1.7] max-w-sm mb-6">
              Design web & automatisation pour les entreprises
              qui veulent grandir sans complexité.
            </p>

            {/* Contact email with underline reveal */}
            <a
              href="mailto:contact@neurolia.work"
              className="group relative inline-block text-sm font-medium text-[#F5F5F5] transition-colors duration-300 hover:text-[#C45C3B]"
            >
              contact@neurolia.work
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C45C3B] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Navigation columns — spans 7 cols, split into 3 sub-columns */}
          <div className="md:col-span-7 lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-8">

              {/* Column: Navigation */}
              <div>
                <h3 className="flex items-center gap-3 mb-6">
                  <span className="w-5 h-px bg-[#C45C3B]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#737373]">
                    Navigation
                  </span>
                </h3>
                <ul className="space-y-3 ml-0 list-none">
                  {navigationLinks.map((link) => (
                    <li key={link.label} className="mb-0">
                      <Link
                        href={link.href}
                        className="group relative inline-block text-sm text-[#A3A3A3] transition-colors duration-300 hover:text-[#F5F5F5]"
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C45C3B] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column: Services */}
              <div>
                <h3 className="flex items-center gap-3 mb-6">
                  <span className="w-5 h-px bg-[#C45C3B]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#737373]">
                    Services
                  </span>
                </h3>
                <ul className="space-y-3 ml-0 list-none">
                  {serviceLinks.map((link) => (
                    <li key={link.label} className="mb-0">
                      <Link
                        href={link.href}
                        className="group relative inline-block text-sm text-[#A3A3A3] transition-colors duration-300 hover:text-[#F5F5F5]"
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C45C3B] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column: Réseaux */}
              <div className="col-span-2 sm:col-span-1">
                <h3 className="flex items-center gap-3 mb-6">
                  <span className="w-5 h-px bg-[#C45C3B]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#737373]">
                    Réseaux
                  </span>
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-[#737373] hover:text-[#F5F5F5] transition-colors duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <ul className="space-y-3 ml-0 list-none">
                  {legalLinks.map((link) => (
                    <li key={link.label} className="mb-0">
                      <Link
                        href={link.href}
                        className="group relative inline-block text-sm text-[#A3A3A3] transition-colors duration-300 hover:text-[#F5F5F5]"
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C45C3B] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 lg:mt-20 pt-8 relative">
          {/* Separator line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(to right, rgba(196,92,59,0.25), rgba(136,146,176,0.1) 30%, rgba(136,146,176,0.1) 70%, rgba(196,92,59,0.25))',
            }}
          />

          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            {/* Copyright */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#525252]">
              &copy; {currentYear} Neurolia. Tous droits r&eacute;serv&eacute;s.
            </p>

            {/* Signature stamp */}
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#525252]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full bg-[#C45C3B] opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 bg-[#C45C3B]" />
              </span>
              {currentYear}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
