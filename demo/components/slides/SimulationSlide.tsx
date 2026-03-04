"use client";

import type { ReactNode } from "react";
import { Slide } from "@/components/deck/Slide";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { DeviceFrame } from "@/components/ui/simulation/DeviceFrame";

interface SimulationSlideProps {
  title: string;
  label?: string;
  device?: "desktop" | "phone";
  deviceTitle?: string;
  children: ReactNode;
}

export function SimulationSlide({
  title,
  label,
  device = "desktop",
  deviceTitle,
  children,
}: SimulationSlideProps) {
  return (
    <Slide>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-primary" />
        <span className="text-sm font-medium uppercase tracking-wider text-primary">
          Simulation
        </span>
        {label && (
          <span className="text-sm font-medium text-text-muted">— {label}</span>
        )}
      </div>

      <AnimatedText
        text={title}
        as="h2"
        className="mb-8 font-display text-2xl font-bold leading-tight text-text-primary md:text-3xl lg:text-4xl"
      />

      <DeviceFrame type={device} title={deviceTitle}>
        {children}
      </DeviceFrame>
    </Slide>
  );
}
