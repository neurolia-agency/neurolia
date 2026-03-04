"use client";

import { Slide } from "@/components/deck/Slide";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { PainPoint } from "@/components/ui/PainPoint";

interface PainPointData {
  icon: string;
  quote: string;
  source?: string;
}

interface ProblemSlideProps {
  title: string;
  painPoints: PainPointData[];
}

export function ProblemSlide({ title, painPoints }: ProblemSlideProps) {
  return (
    <Slide>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-primary" />
        <span className="text-sm font-medium uppercase tracking-wider text-primary">
          Le problème
        </span>
      </div>

      <AnimatedText
        text={title}
        as="h1"
        className="mb-12 font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl"
      />

      <div className="flex flex-col gap-4">
        {painPoints.map((point, i) => (
          <PainPoint
            key={i}
            icon={point.icon}
            quote={point.quote}
            source={point.source}
            delay={0.2 + i * 0.15}
          />
        ))}
      </div>
    </Slide>
  );
}
