"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { StarsCanvas } from "./canvas";

const RocketIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState("idle"); // idle, launching, complete
  const [rocketY, setRocketY] = useState(0);
  const containerRef = useRef(null);
  const smokeParticlesRef = useRef([]);
  const fireParticlesRef = useRef([]);
  const groundSmokeRef = useRef([]);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const [, forceUpdate] = useState(0);

  // Generate smoke trail particle
  const generateSmokeParticle = useCallback((rocketBottomY) => {
    return {
      id: Math.random(),
      x: 50 + (Math.random() - 0.5) * 6,
      y: rocketBottomY,
      vx: (Math.random() - 0.5) * 1.5,
      vy: 0.3 + Math.random() * 0.5,
      size: 25 + Math.random() * 35,
      opacity: 0.8,
      life: 1,
      maxLife: 3 + Math.random() * 2,
      growth: 0.8 + Math.random() * 0.5,
    };
  }, []);

  // Generate fire particle
  const generateFireParticle = useCallback((rocketBottomY) => {
    return {
      id: Math.random(),
      x: 50 + (Math.random() - 0.5) * 3,
      y: rocketBottomY,
      vx: (Math.random() - 0.5) * 1,
      vy: 2 + Math.random() * 3,
      size: 10 + Math.random() * 15,
      opacity: 1,
      life: 1,
      maxLife: 0.15 + Math.random() * 0.15,
      hue: 30 + Math.random() * 30,
    };
  }, []);

  // Generate ground smoke
  const generateGroundSmoke = useCallback(() => {
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      particles.push({
        id: Math.random(),
        x: 50,
        y: 65,
        vx: Math.cos(angle) * (2 + Math.random() * 3),
        vy: -0.5 - Math.random() * 1,
        size: 40 + Math.random() * 60,
        opacity: 0.7,
        life: 1,
        maxLife: 4 + Math.random() * 2,
        growth: 1.5 + Math.random(),
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setPhase("launching");
      startTimeRef.current = Date.now();
      groundSmokeRef.current = generateGroundSmoke();
    }, 1000);

    const fadeStartTimer = setTimeout(() => {
      onComplete?.();
    }, 4500);

    const completeTimer = setTimeout(() => {
      setPhase("complete");
    }, 6500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(fadeStartTimer);
      clearTimeout(completeTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete, generateGroundSmoke]);

  // Animation loop
  useEffect(() => {
    if (phase === "complete") return;

    let lastTime = performance.now();

    const animate = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Calculate rocket position for particle spawning
      // Rocket starts at 50% from top, and moves up
      let rocketBottomY = 58; // Default position (bottom of rocket at ~58% from top)

      if (phase === "launching" && startTimeRef.current) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        // Accelerating upward movement (goes off screen in ~2.5s)
        const movement = Math.pow(elapsed, 2.2) * 35;
        const newY = -movement;
        setRocketY(newY);

        // Calculate where rocket bottom is in screen percentage
        // As rocket moves up, rocketBottomY decreases
        rocketBottomY = 58 + (newY / window.innerHeight) * 100;

        // Add smoke trail particles (spawn at rocket exhaust)
        if (rocketBottomY > -20 && rocketBottomY < 100) {
          if (Math.random() < 0.5) {
            smokeParticlesRef.current.push(
              generateSmokeParticle(rocketBottomY)
            );
          }
          // Add fire particles
          for (let i = 0; i < 4; i++) {
            if (Math.random() < 0.9) {
              fireParticlesRef.current.push(
                generateFireParticle(rocketBottomY)
              );
            }
          }
        }
      }

      // Idle phase - small fire
      if (phase === "idle") {
        if (Math.random() < 0.4) {
          fireParticlesRef.current.push(generateFireParticle(rocketBottomY));
        }
      }

      // Update smoke particles
      smokeParticlesRef.current = smokeParticlesRef.current.filter((p) => {
        p.x += p.vx * delta * 15;
        p.y += p.vy * delta * 15;
        p.size += p.growth * delta * 25;
        p.life -= delta / p.maxLife;
        p.opacity = Math.max(0, p.life * 0.6);
        return p.life > 0;
      });

      // Update fire particles
      fireParticlesRef.current = fireParticlesRef.current.filter((p) => {
        p.x += p.vx * delta * 20;
        p.y += p.vy * delta * 40;
        p.life -= delta / p.maxLife;
        p.opacity = p.life;
        p.size *= 0.95;
        return p.life > 0;
      });

      // Update ground smoke
      groundSmokeRef.current = groundSmokeRef.current.filter((p) => {
        p.x += p.vx * delta * 12;
        p.y += p.vy * delta * 8;
        p.size += p.growth * delta * 20;
        p.life -= delta / p.maxLife;
        p.opacity = Math.max(0, p.life * 0.5);
        p.vx *= 0.98;
        return p.life > 0;
      });

      // Limit particle counts
      if (smokeParticlesRef.current.length > 100) {
        smokeParticlesRef.current = smokeParticlesRef.current.slice(-100);
      }
      if (fireParticlesRef.current.length > 60) {
        fireParticlesRef.current = fireParticlesRef.current.slice(-60);
      }

      // Force re-render
      forceUpdate((n) => n + 1);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase, generateSmokeParticle, generateFireParticle]);

  if (phase === "complete") return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] banner overflow-hidden transition-opacity duration-[1500ms] ${
        phase === "launching" ? "pointer-events-none" : ""
      }`}
      style={{
        opacity: phase === "launching" ? 0 : 1,
        transitionDelay: phase === "launching" ? "3.5s" : "0s",
      }}
    >
      {/* Stars background */}
      <StarsCanvas />

      {/* Ground smoke particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {groundSmokeRef.current.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(90,50,180,${
                p.opacity
              }) 0%, rgba(60,30,120,${p.opacity * 0.5}) 40%, transparent 70%)`,
              filter: "blur(4px)",
            }}
          />
        ))}
      </div>

      {/* Smoke trail particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {smokeParticlesRef.current.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgb(42, 161, 220,${
                p.opacity
              }) 0%, rgb(42, 161, 220,${
                p.opacity * 0.5
              }) 40%, transparent 70%)`,
              filter: "blur(3px)",
            }}
          />
        ))}
      </div>

      {/* Fire particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fireParticlesRef.current.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size * 1.5,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(ellipse, rgba(255,255,100,${
                p.opacity
              }) 0%, rgba(255,${Math.floor(150 - p.hue)},0,${
                p.opacity * 0.8
              }) 40%, transparent 70%)`,
              filter: "blur(1px)",
              mixBlendMode: "screen",
            }}
          />
        ))}
      </div>

      {/* Rocket */}
      <div
        className="absolute left-1/2 top-1/2 z-10"
        style={{
          transform: `translate(-50%, -50%) translateY(${rocketY}px)`,
        }}
      >
        <div className={phase === "launching" ? "rocket-shake" : ""}>
          <Image
            src="/rocket.png"
            alt="Rocket"
            width={150}
            height={225}
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default RocketIntro;
