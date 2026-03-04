"use client";

import { useCallback, useRef } from "react";
import { Deck } from "@/components/deck/Deck";
import { ProblemSlide } from "@/components/slides/ProblemSlide";
import { SolutionSlide } from "@/components/slides/SolutionSlide";
import { FlowSlide } from "@/components/slides/FlowSlide";
import { ResultSlide } from "@/components/slides/ResultSlide";
import { SimDevisFacturation } from "@/components/slides/simulations/SimDevisFacturation";
import { SimDevisFormulaire } from "@/components/slides/simulations/SimDevisFormulaire";
import { SimDevisCatalogue } from "@/components/slides/simulations/SimDevisCatalogue";
import { SimDevisSignature } from "@/components/slides/simulations/SimDevisSignature";
import { SimDevisRelances } from "@/components/slides/simulations/SimDevisRelances";
import { SimDevisTresorerie } from "@/components/slides/simulations/SimDevisTresorerie";
import { devisFacturation as data } from "@/data/devis-facturation";

export default function DevisFacturationPage() {
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
      <SimDevisFacturation />
      <SimDevisFormulaire />
      <SimDevisCatalogue />
      <SimDevisSignature />
      <SimDevisRelances />
      <SimDevisTresorerie />
    </Deck>
  );
}
