"use client";

import { useCallback, useRef } from "react";
import { Deck } from "@/components/deck/Deck";
import { ProblemSlide } from "@/components/slides/ProblemSlide";
import { SolutionSlide } from "@/components/slides/SolutionSlide";
import { FlowSlide } from "@/components/slides/FlowSlide";
import { ResultSlide } from "@/components/slides/ResultSlide";
import { SimChatbot } from "@/components/slides/simulations/SimChatbot";
import { SimChatbotFaq } from "@/components/slides/simulations/SimChatbotFaq";
import { SimChatbotSupport } from "@/components/slides/simulations/SimChatbotSupport";
import { SimChatbotProduit } from "@/components/slides/simulations/SimChatbotProduit";
import { SimChatbotMulticanal } from "@/components/slides/simulations/SimChatbotMulticanal";
import { SimChatbotOnboarding } from "@/components/slides/simulations/SimChatbotOnboarding";
import { chatbot as data } from "@/data/chatbot";

export default function ChatbotPage() {
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
      <SimChatbot />
      <SimChatbotFaq />
      <SimChatbotSupport />
      <SimChatbotProduit />
      <SimChatbotMulticanal />
      <SimChatbotOnboarding />
    </Deck>
  );
}
