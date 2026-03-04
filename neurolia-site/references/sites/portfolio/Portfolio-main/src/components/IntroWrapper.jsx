"use client";
import { useState, useCallback, createContext, useContext } from "react";
import RocketIntro from "./RocketIntro";

export const IntroContext = createContext({ introComplete: false });

export const useIntro = () => useContext(IntroContext);

const IntroWrapper = ({ children }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    // Remove intro from DOM after animations complete
    setTimeout(() => {
      setShowIntro(false);
    }, 500);
  }, []);

  return (
    <IntroContext.Provider value={{ introComplete }}>
      {/* Content is always visible - Hero has same background as intro */}
      {children}
      {/* Intro overlays on top with same background, fades away to reveal Hero */}
      {showIntro && <RocketIntro onComplete={handleIntroComplete} />}
    </IntroContext.Provider>
  );
};

export default IntroWrapper;
