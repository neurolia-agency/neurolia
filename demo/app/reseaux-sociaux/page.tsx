"use client";

import { useCallback, useRef } from "react";
import { Deck } from "@/components/deck/Deck";
import { ProblemSlide } from "@/components/slides/ProblemSlide";
import { SolutionSlide } from "@/components/slides/SolutionSlide";
import { FlowSlide } from "@/components/slides/FlowSlide";
import { ResultSlide } from "@/components/slides/ResultSlide";
import { SimReseauxSociaux } from "@/components/slides/simulations/SimReseauxSociaux";
import { SimSocialCalendrier } from "@/components/slides/simulations/SimSocialCalendrier";
import { SimSocialRepurposing } from "@/components/slides/simulations/SimSocialRepurposing";
import { SimSocialReponse } from "@/components/slides/simulations/SimSocialReponse";
import { SimSocialVeille } from "@/components/slides/simulations/SimSocialVeille";
import { SimSocialModeration } from "@/components/slides/simulations/SimSocialModeration";
import { reseauxSociaux as data } from "@/data/reseaux-sociaux";

export default function ReseauxSociauxPage() {
  const goToSlideRef = useRef<((index: number) => void) | undefined>(undefined);

  const handleGoToSlide = useCallback((fn: (index: number) => void) => {
    goToSlideRef.current = fn;
  }, []);

  const handleNavigate = useCallback((slideIndex: number) => {
    goToSlideRef.current?.(slideIndex);
  }, []);

  return (
    <Deck service={data.name} onGoToSlide={handleGoToSlide}>
      <ProblemSlide title={data.problem.title} painPoints={data.problem.painPoints} />
      <SolutionSlide title={data.solution.title} steps={data.solution.steps} useCases={data.solution.useCases} onNavigate={handleNavigate} />
      <FlowSlide title={data.flow.title} nodes={data.flow.nodes} stack={data.flow.stack} />
      <ResultSlide title={data.result.title} metrics={data.result.metrics} />
      <SimReseauxSociaux />
      <SimSocialCalendrier />
      <SimSocialRepurposing />
      <SimSocialReponse />
      <SimSocialVeille />
      <SimSocialModeration />
    </Deck>
  );
}
