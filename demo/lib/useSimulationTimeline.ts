"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Auto-play timeline: given an array of delays (seconds),
 * increments `visibleCount` after each delay.
 * Resets and restarts when `active` toggles to true.
 */
export function useSimulationTimeline(
  delays: number[],
  active: boolean
): number {
  const [visibleCount, setVisibleCount] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Cleanup previous timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisibleCount(0);

    if (!active) return;

    // Schedule each step
    let cumulative = 0;
    delays.forEach((delay, i) => {
      cumulative += delay * 1000;
      const timer = setTimeout(() => {
        setVisibleCount(i + 1);
      }, cumulative);
      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [active, delays]);

  return visibleCount;
}
