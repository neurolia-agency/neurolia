"use client";

import { useCallback, useRef } from "react";
import { Deck } from "@/components/deck/Deck";
import { ProblemSlide } from "@/components/slides/ProblemSlide";
import { SolutionSlide } from "@/components/slides/SolutionSlide";
import { FlowSlide } from "@/components/slides/FlowSlide";
import { ResultSlide } from "@/components/slides/ResultSlide";
import { SimAssistants } from "@/components/slides/simulations/SimAssistants";
import { SimAssistantRedaction } from "@/components/slides/simulations/SimAssistantRedaction";
import { SimAssistantCR } from "@/components/slides/simulations/SimAssistantCR";
import { SimAssistantRecherche } from "@/components/slides/simulations/SimAssistantRecherche";
import { SimAssistantReporting } from "@/components/slides/simulations/SimAssistantReporting";
import { SimAssistantVeille } from "@/components/slides/simulations/SimAssistantVeille";
import { assistants as data } from "@/data/assistants";

export default function AssistantsPage() {
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
      <SimAssistants />
      <SimAssistantRedaction />
      <SimAssistantCR />
      <SimAssistantRecherche />
      <SimAssistantReporting />
      <SimAssistantVeille />
    </Deck>
  );
}
