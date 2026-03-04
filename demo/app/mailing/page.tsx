"use client";

import { useCallback, useRef } from "react";
import { Deck } from "@/components/deck/Deck";
import { ProblemSlide } from "@/components/slides/ProblemSlide";
import { SolutionSlide } from "@/components/slides/SolutionSlide";
import { FlowSlide } from "@/components/slides/FlowSlide";
import { ResultSlide } from "@/components/slides/ResultSlide";
import { SimMailing } from "@/components/slides/simulations/SimMailing";
import { SimMailingCold } from "@/components/slides/simulations/SimMailingCold";
import { SimMailingTransac } from "@/components/slides/simulations/SimMailingTransac";
import { SimMailingNewsletter } from "@/components/slides/simulations/SimMailingNewsletter";
import { SimMailingNurturing } from "@/components/slides/simulations/SimMailingNurturing";
import { SimMailingAnalyse } from "@/components/slides/simulations/SimMailingAnalyse";
import { mailing as data } from "@/data/mailing";

export default function MailingPage() {
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
      <SimMailing />
      <SimMailingCold />
      <SimMailingTransac />
      <SimMailingNewsletter />
      <SimMailingNurturing />
      <SimMailingAnalyse />
    </Deck>
  );
}
