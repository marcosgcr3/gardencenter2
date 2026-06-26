"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  opacity: number;
  animationName: string;
}

export default function LeafParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShouldRender(false);
      return;
    }

    // Generate 10 randomized leaf particles
    const leafParticles: Particle[] = Array.from({ length: 10 }).map((_, i) => {
      const left = `${Math.random() * 90 + 5}%`; // horizontal position
      const delay = `${Math.random() * 15}s`; // staggered start times
      const duration = `${Math.random() * 15 + 15}s`; // slow float duration (15s to 30s)
      const size = Math.random() * 16 + 12; // size in pixels (12px to 28px)
      const opacity = Math.random() * 0.15 + 0.05; // very subtle translucency (5% to 20%)
      const anims = ["driftLeft", "driftRight", "driftSway"];
      const animationName = anims[i % anims.length];

      return {
        id: i,
        left,
        delay,
        duration,
        size,
        opacity,
        animationName,
      };
    });

    setParticles(leafParticles);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-1 select-none">
      {/* Inline styles for local hardware-accelerated animations */}
      <style jsx global>{`
        @keyframes driftLeft {
          0% {
            transform: translate3d(0, -10vh, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--leaf-opacity);
          }
          90% {
            opacity: var(--leaf-opacity);
          }
          100% {
            transform: translate3d(-12vw, 110vh, 0) rotate(-180deg);
            opacity: 0;
          }
        }
        @keyframes driftRight {
          0% {
            transform: translate3d(0, -10vh, 0) rotate(45deg);
            opacity: 0;
          }
          15% {
            opacity: var(--leaf-opacity);
          }
          85% {
            opacity: var(--leaf-opacity);
          }
          100% {
            transform: translate3d(12vw, 110vh, 0) rotate(240deg);
            opacity: 0;
          }
        }
        @keyframes driftSway {
          0% {
            transform: translate3d(0, -10vh, 0) rotate(-30deg);
            opacity: 0;
          }
          12% {
            opacity: var(--leaf-opacity);
          }
          88% {
            opacity: var(--leaf-opacity);
          }
          100% {
            transform: translate3d(6vw, 110vh, 0) rotate(120deg);
            opacity: 0;
          }
        }
        .leaf-particle {
          position: absolute;
          top: 0;
          will-change: transform, opacity;
        }
      `}</style>

      {particles.map((p) => (
        <svg
          key={p.id}
          className="leaf-particle fill-emerald-800/40 dark:fill-emerald-200/20"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            animationName: p.animationName,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            "--leaf-opacity": p.opacity,
          } as React.CSSProperties}
          viewBox="0 0 24 24"
        >
          {/* Detailed premium organic leaf outline */}
          <path d="M17 2s-3.5 2-6.5 5.5S6 13 5.5 17c-.3 2.5 1 4.5 3 4.5s4.5-2 6.5-5.5 4.5-7.5 4.5-9.5S17 2 17 2zm-5 14.5c-.8.8-2 1-2.5.5s-.3-1.8.5-2.5c1-1 2.5-1.5 3-1.2-.5 1-1 2.2-1 3.2z" />
        </svg>
      ))}
    </div>
  );
}
