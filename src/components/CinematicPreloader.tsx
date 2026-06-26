"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CinematicPreloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Prevent scrolling during preloading intro
    document.body.style.overflow = "hidden";

    if (!pathRef.current || !logoRef.current || !topPanelRef.current || !bottomPanelRef.current) return;

    // Get the length of the organic leaf path for line-drawing effect
    const pathLength = pathRef.current.getTotalLength();
    
    // Set initial dasharray state
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        document.body.style.overflow = ""; // restore default scroll behaviors
      }
    });

    // 1. Draw the leaf outline progressively
    tl.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
    })
    // 2. Fade in the luxurious text caption
    .fromTo(textRef.current, {
      opacity: 0,
      y: 10,
    }, {
      opacity: 0.8,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.3")
    // 3. Stagger scale & blur fade-out of logo/text
    .to([logoRef.current, textRef.current], {
      scale: 1.04,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.inOut",
    }, "+=0.3")
    // 4. Split open the panels vertically (top slides up, bottom slides down)
    .to(topPanelRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
    }, "-=0.5")
    .to(bottomPanelRef.current, {
      y: "100%",
      duration: 1.2,
      ease: "power4.inOut",
    }, "-=1.2");

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-[9999] pointer-events-none select-none"
    >
      {/* Top Split Panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-[50vh] bg-zinc-950 border-b border-zinc-900/40 pointer-events-auto"
      />

      {/* Centered Floating Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-[10000] gap-4">
        {/* Organic Leaf Logo Outline */}
        <svg
          ref={logoRef}
          className="w-16 h-16 text-brand-light drop-shadow-[0_0_12px_rgba(129,168,112,0.25)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Detailed premium organic leaf path */}
          <path
            ref={pathRef}
            d="M17 2s-3.5 2-6.5 5.5S6 13 5.5 17c-.3 2.5 1 4.5 3 4.5s4.5-2 6.5-5.5 4.5-7.5 4.5-9.5S17 2 17 2z"
          />
        </svg>

        {/* Luxury Subtitle */}
        <div
          ref={textRef}
          className="text-[9px] text-zinc-400 tracking-[0.35em] uppercase font-light opacity-0"
        >
          Linda Vista Marbella
        </div>
      </div>

      {/* Bottom Split Panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-zinc-950 border-t border-zinc-900/40 pointer-events-auto"
      />
    </div>
  );
}
