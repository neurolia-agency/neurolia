"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * PORTFOLIO SECTION - "SCROLL REVEAL CINÉMATIQUE"
 *
 * Desktop: Pinned section with 3 images revealed via clip-path animations (Zentry-style)
 * Mobile: Simple vertical stack with fade-in
 *
 * Animation sequence:
 *   Image 1 — visible from start, scale 1→1.125 (viewport 1)
 *   Image 2 — clip-path rect→full, scale 1→1.125→1.25 (viewport 1→2)
 *   Image 3 — clip-path point→full, scale 2.9→1 (viewport 3→4)
 */

const projects = [
  {
    number: "01",
    title: "E-commerce Premium",
    subtitle: "Refonte e-commerce orientée conversion",
    category: "E-commerce",
    metric: "+40",
    metricUnit: "%",
    metricLabel: "conversion",
    image: "/portfolio/futureofgrow/screenshots/project-1.webp",
  },
  {
    number: "02",
    title: "Formation Vidéaste",
    subtitle: "Plateforme e-learning sur-mesure",
    category: "Plateforme",
    metric: "10k",
    metricUnit: "+",
    metricLabel: "utilisateurs actifs",
    image: "/portfolio/pixel-academy/screenshots/project-2.webp",
  },
  {
    number: "03",
    title: "Opendoor Serrurerie",
    subtitle: "Site vitrine serrurier avec conversion appel",
    category: "Site vitrine",
    metric: "x3",
    metricUnit: "",
    metricLabel: "appels reçus par mois",
    image: "/portfolio/opendoor/screenshots/project-3.png",
  },
];

/* ─────────────────────────────────────────────
   Overlay info for each fullscreen project image
   ───────────────────────────────────────────── */
function ProjectOverlay({
  project,
  className,
  align = "left",
}: {
  project: (typeof projects)[number];
  className?: string;
  align?: "left" | "right";
}) {
  const isRight = align === "right";

  return (
    <div className={`absolute inset-0 z-10 pointer-events-none ${className ?? ""}`}>
      {/* Info zone with gradient scrim */}
      <div className={`absolute left-0 right-0 ${isRight ? "top-0 bg-gradient-to-b pt-10 pb-32" : "bottom-0 bg-gradient-to-t pt-32 pb-10"} from-[#050810]/90 via-[#050810]/50 to-transparent px-8 lg:px-14 ${isRight ? "text-right" : ""}`}>
        {/* Category tag */}
        <span className="inline-block text-[0.625rem] tracking-[0.3em] uppercase font-medium text-[#C45C3B] mb-4">
          {project.category}
        </span>

        {/* Metric */}
        <div className={`flex items-end gap-2 mb-3 ${isRight ? "justify-end" : ""}`}>
          <span
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#C45C3B] leading-none tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
          >
            {project.metric}
            {project.metricUnit}
          </span>
          <span className="text-xs tracking-[0.15em] uppercase text-[#A3A3A3] mb-2">
            {project.metricLabel}
          </span>
        </div>

        {/* Title + subtitle */}
        <h3
          className="text-2xl lg:text-4xl font-bold text-[#F5F5F5] tracking-[-0.02em] leading-[1.05]"
          style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
        >
          {project.title}
        </h3>
        <p className={`text-sm lg:text-base text-[#9A9A9A] mt-2 max-w-md ${isRight ? "ml-auto" : ""}`}>
          {project.subtitle}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Mobile card — simple stack with fade-in
   ───────────────────────────────────────────── */
function MobileProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={cardRef}
      className="relative border border-[rgba(196,92,59,0.2)] shadow-[0_0_20px_rgba(196,92,59,0.08)]"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Metric + category header */}
      <div className="px-4 pt-4 pb-3 border-b border-[rgba(196,92,59,0.12)] flex items-end justify-between">
        <div className="flex items-end gap-2">
          <span
            className="text-2xl sm:text-3xl font-black text-[#C45C3B] leading-none tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
          >
            {project.metric}
            {project.metricUnit}
          </span>
          <span className="text-[0.6rem] tracking-[0.12em] uppercase text-[#A3A3A3] mb-0.5">
            {project.metricLabel}
          </span>
        </div>
        <span className="text-[0.5rem] tracking-[0.3em] uppercase font-medium text-[#C45C3B]">
          {project.category}
        </span>
      </div>

      {/* Screenshot — 100% clean, no overlay */}
      <div className="relative aspect-[16/10]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Title + subtitle footer */}
      <div className="px-4 py-3 border-t border-[rgba(196,92,59,0.12)]">
        <h3
          className="text-base sm:text-lg font-bold text-[#F5F5F5] tracking-[-0.02em] leading-[1.1]"
          style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
        >
          {project.title}
        </h3>
        <p className="text-xs text-[#737373] mt-1">{project.subtitle}</p>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showSkipBtn, setShowSkipBtn] = useState(false);
  const lenisRef = useRef<ReturnType<typeof useLenis>>(null);
  const lenis = useLenis();
  lenisRef.current = lenis;

  // Discrete scroll state
  const currentSlideRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isPinnedRef = useRef(false);
  const cooldownRef = useRef(false);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const handleSkipUp = useCallback(() => {
    const l = lenisRef.current;
    if (!l) return;
    // If pinned, unpin first
    if (isPinnedRef.current) {
      isPinnedRef.current = false;
      currentSlideRef.current = 0;
      tlRef.current?.progress(0);
      setShowSkipBtn(false);
      l.start();
    }
    l.scrollTo(0, { duration: 1.5 });
  }, []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Discrete scroll-snap animations (desktop only) ──
     Paused GSAP timeline with labels at each slide.
     Wheel events drive transitions via tl.tweenTo(label).
     One wheel tick = one complete slide transition. */
  useEffect(
    () => {
      if (!isDesktop || !stickyRef.current) return;

      const section = stickyRef.current;
      const SLIDE_LABELS = ["start", "slide1", "slide2", "slide3"];
      const TRANSITION_DURATION = 0.8;

      // Reset state
      currentSlideRef.current = 0;
      isAnimatingRef.current = false;
      isPinnedRef.current = false;

      /* ── Master timeline (paused, driven by wheel events) ── */
      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      tl.addLabel("start", 0);

      // ── Transition start→slide1: Title fades, images slide up with glow ──
      tl.to(".portfolio-images-wrapper", { y: "0%", ease: "none", duration: 1 }, 0);
      tl.to(".portfolio-title-layer", { scale: 0.95, opacity: 0, ease: "none", duration: 1 }, 0);
      tl.fromTo(
        ".portfolio-glow-1",
        { filter: "drop-shadow(0 0 0px rgba(196,92,59,0))" },
        { filter: "drop-shadow(0 0 30px rgba(196,92,59,0.5))", ease: "none", duration: 0.5 },
        0
      );
      tl.to(
        ".portfolio-glow-1",
        { filter: "drop-shadow(0 0 0px rgba(196,92,59,0))", ease: "none", duration: 0.5, immediateRender: false },
        0.5
      );

      tl.addLabel("slide1", 1);

      // ── Transition slide1→slide2: Image 2 reveals over Image 1 ──
      tl.to(".portfolio-overlay-1", { opacity: 0, ease: "none", duration: 0.3 }, 1);
      tl.to(".portfolio-img-1 img", { scale: 1.125, ease: "none", duration: 1 }, 1);
      tl.fromTo(
        ".portfolio-glow-2",
        { filter: "drop-shadow(0 0 0px rgba(196,92,59,0))" },
        { filter: "drop-shadow(0 0 30px rgba(196,92,59,0.5))", ease: "none", duration: 0.5 },
        1
      );
      tl.to(
        ".portfolio-glow-2",
        { filter: "drop-shadow(0 0 0px rgba(196,92,59,0))", ease: "none", duration: 0.5, immediateRender: false },
        1.5
      );
      tl.fromTo(
        ".portfolio-img-2",
        { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none", duration: 1 },
        1
      );
      tl.to(".portfolio-img-2 img", { scale: 1.125, ease: "none", duration: 1 }, 1);
      tl.fromTo(
        ".portfolio-overlay-2",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "none", duration: 0.3 },
        1.7
      );

      tl.addLabel("slide2", 2);

      // ── Transition slide2→slide3: Image 3 reveals over Image 2 ──
      tl.to(".portfolio-overlay-2", { opacity: 0, ease: "none", duration: 0.3, immediateRender: false }, 2);
      tl.to(".portfolio-img-2 img", { scale: 1.25, ease: "none", duration: 1, immediateRender: false }, 2);
      tl.fromTo(
        ".portfolio-glow-3",
        { filter: "drop-shadow(0 0 0px rgba(196,92,59,0))" },
        { filter: "drop-shadow(0 0 30px rgba(196,92,59,0.5))", ease: "none", duration: 0.5 },
        2
      );
      tl.to(
        ".portfolio-glow-3",
        { filter: "drop-shadow(0 0 0px rgba(196,92,59,0))", ease: "none", duration: 0.5, immediateRender: false },
        2.5
      );
      tl.fromTo(
        ".portfolio-img-3",
        { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none", duration: 1 },
        2
      );
      tl.fromTo(
        ".portfolio-img-3 img",
        { scale: 2.9, transformOrigin: "top right" },
        { scale: 1, ease: "none", duration: 1, immediateRender: false },
        2
      );
      tl.fromTo(
        ".portfolio-overlay-3",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "none", duration: 0.3 },
        2.7
      );

      tl.addLabel("slide3", 3);

      /* ── ScrollTrigger for pinning only ── */
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=50",
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          isPinnedRef.current = true;
          currentSlideRef.current = 0;
          tl.progress(0);
          lenisRef.current?.stop();
          document.documentElement.classList.add("portfolio-pinned");
        },
        onLeaveBack: () => {
          isPinnedRef.current = false;
          currentSlideRef.current = 0;
          tl.progress(0);
          setShowSkipBtn(false);
          lenisRef.current?.start();
          document.documentElement.classList.remove("portfolio-pinned");
        },
      });
      stRef.current = st;

      /* ── Forward unpin helper ── */
      const unpinForward = () => {
        isPinnedRef.current = false;
        setShowSkipBtn(false);
        document.documentElement.classList.remove("portfolio-pinned");

        // Force final visual states
        gsap.set(".portfolio-img-2", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
        gsap.set(".portfolio-img-3", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
        gsap.set(".portfolio-img-3 img", { scale: 1, transformOrigin: "top right" });
        gsap.set(".portfolio-img-2 img", { scale: 1.25 });
        gsap.set(".portfolio-images-wrapper", { y: "0%" });
        gsap.set(".portfolio-img-1 img", { scale: 1.125 });
        gsap.set(".portfolio-overlay-1", { opacity: 0 });
        gsap.set(".portfolio-overlay-2", { opacity: 0 });
        gsap.set(".portfolio-overlay-3", { opacity: 1, y: 0 });
        gsap.set(".portfolio-glow-1", { filter: "none" });
        gsap.set(".portfolio-glow-2", { filter: "none" });
        gsap.set(".portfolio-glow-3", { filter: "none" });
        gsap.set(".portfolio-title-layer", { scale: 0.95, opacity: 0 });

        // Capture spacer info before killing
        const pinSpacer = section.parentElement;
        const spacerH = pinSpacer ? pinSpacer.offsetHeight : 0;
        const sectionH = section.offsetHeight;
        const extraH = spacerH - sectionH;
        const scrollBefore = window.scrollY;

        tl.progress(1);
        tl.kill();
        st.kill();

        // Compensate scroll for removed pin spacer
        if (extraH > 0) {
          const target = Math.max(0, scrollBefore - extraH);
          const l = lenisRef.current;
          if (l) {
            l.scrollTo(target, { immediate: true });
          } else {
            window.scrollTo(0, target);
          }
        }

        lenisRef.current?.start();
      };

      /* ── Wheel event handler ──
         cooldownRef blocks all wheel events for COOLDOWN_MS after each
         transition ends, absorbing trackpad momentum so one swipe = one slide. */
      const COOLDOWN_MS = 600;

      const handleWheel = (e: WheelEvent) => {
        if (!isPinnedRef.current) return;

        // Block during animation AND during post-animation cooldown
        if (isAnimatingRef.current || cooldownRef.current) {
          e.preventDefault();
          return;
        }

        const direction = e.deltaY > 0 ? 1 : -1;
        const next = currentSlideRef.current + direction;

        // Backward unpin: re-enable Lenis, let next scroll trigger onLeaveBack
        if (next < 0) {
          isPinnedRef.current = false;
          currentSlideRef.current = 0;
          tl.progress(0);
          setShowSkipBtn(false);
          lenisRef.current?.start();
          document.documentElement.classList.remove("portfolio-pinned");
          return; // Don't preventDefault — let this event scroll up naturally
        }

        e.preventDefault();

        // Forward unpin: kill everything, compensate scroll
        if (next >= SLIDE_LABELS.length) {
          unpinForward();
          return;
        }

        // Normal slide transition
        isAnimatingRef.current = true;
        currentSlideRef.current = next;
        setShowSkipBtn(next > 0);

        tl.tweenTo(SLIDE_LABELS[next], {
          duration: TRANSITION_DURATION,
          ease: "power2.inOut",
          onComplete: () => {
            isAnimatingRef.current = false;
            // Start cooldown — absorb remaining trackpad momentum
            cooldownRef.current = true;
            cooldownTimerRef.current = setTimeout(() => {
              cooldownRef.current = false;
            }, COOLDOWN_MS);
          },
        });
      };

      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleWheel);
        if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
        cooldownRef.current = false;
        document.documentElement.classList.remove("portfolio-pinned");
        tl.kill();
        st.kill();
        tlRef.current = null;
        stRef.current = null;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDesktop]
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: "#050810" }}
    >
      {/* Background grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(196,92,59,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,92,59,1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Diagonal line */}
      <div
        className="absolute top-0 left-[20%] w-px h-full hidden lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(196,92,59,0.08) 30%, rgba(196,92,59,0.08) 70%, transparent 100%)",
          transform: "rotate(-8deg)",
          transformOrigin: "top",
        }}
        aria-hidden="true"
      />

      {/* ── HEADER (before pinned area) ── */}
      <div
        ref={headerRef}
        className="lg:hidden px-6 md:px-12 max-w-[100rem] mx-auto pt-6 sm:pt-8 md:pt-10 lg:pt-24 pb-6 sm:pb-8 md:pb-10 lg:pb-24"
      >
        <div className="relative max-w-3xl">
          {/* Barre signature 4px */}
          <motion.div
            className="absolute -left-6 md:-left-8 top-0 w-[3px] bg-[#C45C3B]"
            initial={{ height: 0 }}
            animate={headerInView ? { height: "100%" } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          {/* Eyebrow */}
          <motion.span
            className="block text-[0.625rem] tracking-[0.3em] uppercase text-[#C45C3B] font-medium mb-3"
            initial={{ opacity: 0, x: -10 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Portfolio
          </motion.span>

          {/* Title */}
          <motion.h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] leading-[1.0]"
            style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-[#9A9A9A]">Nos derniers projets.</span>
            <br />
            <span className="text-[#F5F5F5]">Des résultats concrets</span>
            <span className="text-[#C45C3B]">.</span>
          </motion.h2>
        </div>
      </div>

      {/* ── DESKTOP: Pinned scroll reveal ── */}
      {isDesktop && (
        <div ref={stickyRef}>
          <div className="relative w-full h-screen overflow-hidden">
            {/* Title layer — centered, behind images */}
            <div className="portfolio-title-layer absolute inset-0 z-0 flex items-center justify-center">
              <div className="text-center px-6">
                <span className="block text-[0.625rem] tracking-[0.3em] uppercase text-[#C45C3B] font-medium mb-8">
                  Portfolio
                </span>
                <h2
                  className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.03em] leading-[1.05]"
                  style={{ fontFamily: "var(--font-display, 'Satoshi', sans-serif)" }}
                >
                  <span className="text-[#9A9A9A]">Nos derniers projets.</span>
                  <br />
                  <span className="text-[#F5F5F5]">Des résultats concrets</span>
                  <span className="text-[#C45C3B]">.</span>
                </h2>
              </div>
            </div>

            {/* Images layer — slides up over the title on scroll */}
            <div
              className="portfolio-images-wrapper absolute inset-0 z-10"
              style={{ transform: "translateY(100%)" }}
            >
            {/* Image 1 — visible from start (wrapper for drop-shadow glow) */}
            <div className="portfolio-glow-1 absolute inset-0">
              <div className="portfolio-img-1 absolute inset-0">
                <Image
                  src={projects[0].image}
                  alt={projects[0].title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <ProjectOverlay project={projects[0]} className="portfolio-overlay-1" />
              </div>
            </div>

            {/* Image 2 — clip-path reveal (wrapper for drop-shadow glow) */}
            <div className="portfolio-glow-2 absolute inset-0">
              <div
                className="portfolio-img-2 absolute inset-0"
                style={{
                  clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                }}
              >
                <Image
                  src={projects[1].image}
                  alt={projects[1].title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <ProjectOverlay project={projects[1]} className="portfolio-overlay-2 opacity-0" />
              </div>
            </div>

            {/* Image 3 — clip-path from center point (wrapper for drop-shadow glow) */}
            <div className="portfolio-glow-3 absolute inset-0">
              <div
                className="portfolio-img-3 absolute inset-0"
                style={{
                  clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                }}
              >
                <Image
                  src={projects[2].image}
                  alt={projects[2].title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  style={{ transformOrigin: "top right", transform: "scale(2.9)" }}
                />
                <ProjectOverlay project={projects[2]} className="portfolio-overlay-3 opacity-0" align="right" />
              </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE: Simple stacked cards ── */}
      {!isDesktop && (
        <div className="px-2 sm:px-4 md:px-12 space-y-8 sm:space-y-6">
          {projects.map((project, index) => (
            <MobileProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>
      )}

      {/* ── CTA (after pinned area) ── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-[100rem] mx-auto">
        <motion.div
          className="py-20 md:py-28 lg:py-32 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/portfolio"
            className="cta-outline-btn group inline-flex items-center gap-2.5 px-4 py-2 bg-transparent border border-[#C45C3B] hover:bg-[#C45C3B]"
          >
            <span className="text-xs tracking-[0.1em] uppercase font-medium text-[#C45C3B] group-hover:text-[#050810] transition-colors duration-300">
              Voir nos projets
            </span>
            <svg
              className="w-3.5 h-3.5 text-[#C45C3B] group-hover:text-[#050810] transition-all duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="square"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
      {/* ── Skip button (scroll up in pinned area) ── */}
      <AnimatePresence>
        {showSkipBtn && isDesktop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={handleSkipUp}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-2.5 px-5 py-3 bg-[#C45C3B] hover:bg-[#d4694a] shadow-[0_0_20px_rgba(196,92,59,0.4)] hover:shadow-[0_0_28px_rgba(196,92,59,0.55)] transition-all duration-300 cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#050810]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-xs tracking-[0.15em] uppercase font-semibold text-[#050810]">
              Remonter
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
