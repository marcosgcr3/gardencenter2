"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface FlowerData {
  x: number;
  y: number;
  scale: number;
}

export default function ScrollVine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const flowerRefs = useRef<(SVGGElement | null)[]>([]);
  const [pathData, setPathData] = useState<string>("");
  const [flowers, setFlowers] = useState<FlowerData[]>([]);
  const [pathLength, setPathLength] = useState<number>(0);
  const [shouldRender, setShouldRender] = useState(true);

  // Measure scrollHeight and generate vine path and flower coordinates dynamically
  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShouldRender(false);
      return;
    }

    const calculateVine = () => {
      const scrollHeight = document.documentElement.scrollHeight || 4000;
      
      // Procedurally generate a organic winding bezier path for the vine
      let d = "M 32 0";
      const segmentHeight = 220; // height of each wave cycle
      const totalPoints = Math.ceil(scrollHeight / segmentHeight);
      
      for (let i = 1; i <= totalPoints; i++) {
        const y = i * segmentHeight;
        // Winding sine-wave style coordinate oscillations
        const x = i % 2 === 0 ? 24 : 40; 
        const controlY = (i - 0.5) * segmentHeight;
        const controlX = i % 2 === 0 ? 44 : 20;
        
        d += ` S ${controlX} ${controlY}, ${x} ${y}`;
      }
      
      setPathData(d);

      // Place 4 flowers progressively blooming near the footer (bottom 800px)
      const footerAreaStart = scrollHeight - 750;
      const flowerPositions: FlowerData[] = [
        { x: 30, y: footerAreaStart, scale: 0.8 },
        { x: 26, y: footerAreaStart + 200, scale: 1.1 },
        { x: 38, y: footerAreaStart + 400, scale: 0.9 },
        { x: 28, y: footerAreaStart + 600, scale: 1.2 },
      ];
      setFlowers(flowerPositions);
    };

    calculateVine();

    // Re-calculate on window resize or load
    window.addEventListener("resize", calculateVine);
    window.addEventListener("load", calculateVine);
    
    // Staggered checks for dynamic content loads
    const timer1 = setTimeout(calculateVine, 500);
    const timer2 = setTimeout(calculateVine, 1500);

    return () => {
      window.removeEventListener("resize", calculateVine);
      window.removeEventListener("load", calculateVine);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Animate the path drawing and flower blooming using GSAP
  useGSAP(() => {
    if (!shouldRender || !pathRef.current || !pathData) return;

    gsap.registerPlugin(ScrollTrigger);

    // Measure total path length to set up dasharray offset drawing
    const length = pathRef.current.getTotalLength();
    setPathLength(length);

    // Dynamic stroke drawing synced to scroll progress
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8, // Smooth catch-up delay for premium feeling
      }
    })
    .fromTo(pathRef.current, 
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, ease: "none" }
    );

    // Bloom flowers near the footer on enter
    flowerRefs.current.forEach((flower) => {
      if (!flower) return;

      gsap.fromTo(
        flower,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: "back.out(1.8)", // Springy organic bloom animation
          scrollTrigger: {
            trigger: flower,
            start: "top 88%", // Triggers when the flower enters the bottom viewport area
            toggleActions: "play none none reverse",
          }
        }
      );
    });

  }, [pathData, shouldRender]);

  if (!shouldRender || !pathData) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-16 h-full pointer-events-none z-30 overflow-visible select-none md:block hidden"
    >
      <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow/glow track for depth */}
        <path
          d={pathData}
          fill="none"
          stroke="rgba(74, 93, 62, 0.04)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* The growing green vine stem */}
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke="url(#vineGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ strokeDasharray: pathLength, strokeDashoffset: pathLength }}
        />

        {/* SVG Gradients definitions */}
        <defs>
          <linearGradient id="vineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#81a870" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#4a5d3e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2d3c26" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
        </defs>

        {/* Blooming Chamomile/Daisy Flowers near bottom */}
        {flowers.map((f, idx) => (
          <g
            key={idx}
            ref={(el) => {
              flowerRefs.current[idx] = el;
            }}
            transform={`translate(${f.x}, ${f.y}) scale(${f.scale})`}
            className="origin-center opacity-0"
          >
            {/* Small leaves next to flower */}
            <path
              d="M 0 0 Q -10 -8 -16 -3 Q -10 6 0 0"
              className="fill-emerald-800/80 dark:fill-emerald-700/60"
            />
            <path
              d="M 0 0 Q 10 -6 14 0 Q 8 8 0 0"
              className="fill-emerald-750/70 dark:fill-emerald-650/50"
            />

            {/* Petals (5 symmetrical rotated circles) */}
            <circle cx="0" cy="-6" r="4.5" className="fill-white dark:fill-zinc-100 shadow-xs" />
            <circle cx="5.2" cy="-2.2" r="4.5" className="fill-white dark:fill-zinc-100 shadow-xs" />
            <circle cx="3.2" cy="4.2" r="4.5" className="fill-white dark:fill-zinc-100 shadow-xs" />
            <circle cx="-3.2" cy="4.2" r="4.5" className="fill-white dark:fill-zinc-100 shadow-xs" />
            <circle cx="-5.2" cy="-2.2" r="4.5" className="fill-white dark:fill-zinc-100 shadow-xs" />

            {/* Rich gold center pistil */}
            <circle cx="0" cy="0" r="3.2" fill="url(#centerGradient)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
