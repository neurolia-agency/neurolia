"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data/projects";
import { useReducedMotion } from "@/components/ui/use-reduced-motion";

/* ─── Hooks ─────────────────────────────────────────── */

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

/* ─── Mouse-tracking CTA (desktop only) ────────────── */

function MouseTrackingCta({ href }: { href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { width, height, left, top } =
      ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - (left + width / 2),
      y: e.clientY - (top + height / 2),
    });
  };

  const onMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-outline-btn inline-flex items-center gap-2 px-6 py-3 border border-[var(--primary)] text-[var(--primary)] font-semibold text-sm tracking-wide"
      >
        Voir le projet
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

/* ─── Project Card ──────────────────────────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const isReversed = index % 2 === 1;

  /* ── Image column ── */
  const imageColumn = (
    <div className="lg:w-[55%] flex flex-col gap-4">
      {isDesktop ? (
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          scale={1}
          transitionSpeed={300}
          gyroscope={false}
        >
          <div className="relative overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={500}
              className="w-full h-full object-cover aspect-[16/10]"
            />
          </div>
        </Tilt>
      ) : (
        <div className="relative overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={500}
            className="w-full h-full object-cover aspect-[16/10]"
          />
        </div>
      )}

      {project.metrics && project.metrics.length > 0 && (
        <div className="flex gap-4">
          {project.metrics.map((m, i) => (
            <div key={i} className="flex-1 p-4 border border-[var(--border)] bg-[var(--background)]">
              <span className="number-accent block" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
                {m.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mt-1 block">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ── Details column ── */
  const detailsColumn = (
    <div className="lg:w-[45%] flex flex-col gap-4">
      <span className="text-[0.625rem] tracking-[0.3em] uppercase text-[var(--primary)]">
        {project.category}
      </span>

      <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] font-display tracking-[-0.02em]">
        {project.title}
      </h3>

      <span className="text-sm text-subtle-fg">
        {project.client} &bull; {project.year}
      </span>

      <p className="text-base text-[var(--text-secondary)] leading-relaxed">
        {project.description}
      </p>

      <ul className="flex flex-col gap-2">
        {project.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
          >
            <span className="text-[var(--primary)] mt-[3px] text-[0.5rem] shrink-0">
              ●
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-2">
        {project.tags.map((tag) => (
          <span key={tag} className="badge-secondary">
            {tag}
          </span>
        ))}
      </div>

      <>
        <div className="mt-4 hidden lg:block">
          <MouseTrackingCta href={project.liveUrl || "#"} />
        </div>
        <div className="mt-4 lg:hidden">
          <a
            href={project.liveUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-outline-btn inline-flex items-center gap-2 px-6 py-3 border border-[var(--primary)] text-[var(--primary)] font-semibold text-sm tracking-wide"
          >
            Voir le projet
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </>
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
      className="border border-[var(--border)] bg-[var(--muted)] p-6 md:p-10 hover-lift-glow transition-smooth"
    >
      <div
        className={`flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 ${
          isReversed ? "lg:flex-row-reverse" : ""
        }`}
      >
        {imageColumn}
        {detailsColumn}
      </div>
    </motion.div>
  );
}

/* ─── Showcase ──────────────────────────────────────── */

export default function ProjectsShowcase() {
  return (
    <section className="section-padding bg-[var(--background)]">
      <div className="container-custom">
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
