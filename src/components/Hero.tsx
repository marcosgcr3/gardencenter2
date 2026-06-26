"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Register ScrollTrigger plugin locally
    gsap.registerPlugin(ScrollTrigger);

    // Timeline for hero parallax scroll-away effects
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true, // Ties animation progress directly to scroll position
      }
    })
    .to(videoRef.current, {
      scale: 0.95, // Scales down slightly on scroll
      yPercent: 12, // Slow shift downwards for parallax depth
      opacity: 0.4, // Fades out slightly as it leaves
      ease: "none",
    }, 0)
    .to(contentRef.current, {
      y: -100, // Content moves upward
      opacity: 0, // Content fades out
      scale: 0.98, // Contents shrink slightly for premium depth exit
      ease: "none",
    }, 0)
    .to(scrollIndicatorRef.current, {
      opacity: 0, // Quickly fade out scroll indicator
      y: -30,
      ease: "none",
    }, 0);
  }, { scope: containerRef });

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 30, // Slight offset for perfect overlap transition
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950 text-white select-none"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 scale-[1.02] will-change-transform" // will-change-transform for optimized 60fps scrolling
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-zinc-950 z-10 pointer-events-none" />

      {/* Center Content */}
      <div
        ref={contentRef}
        className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center z-20 will-change-transform"
      >
        {/* Animated Accent Line / Premium Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-light bg-brand/10 border border-brand/20 px-4 py-2 rounded-full backdrop-blur-md">
            Est. 1989 • Marbella
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="font-[family:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 max-w-4xl"
        >
          {t("home.hero.title1")}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-white to-brand-light">
            {t("home.hero.title2")}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="font-[family:var(--font-inter)] text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 font-light max-w-2xl leading-relaxed mb-10"
        >
          {t("home.hero.desc")}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <button
            onClick={handleScrollDown}
            className="px-8 py-3.5 bg-brand hover:bg-brand-dark text-white font-semibold text-sm rounded-full transition-all duration-350 ease-out shadow-lg hover:shadow-brand/20 hover:scale-[1.03] active:scale-[0.97] w-full sm:w-48 text-center cursor-pointer"
          >
            {t("home.hero.btn.discover")}
          </button>

          {/* Secondary CTA */}
          <Link
            href="/contacto"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-full border border-white/20 hover:border-white/30 transition-all duration-350 ease-out backdrop-blur-md hover:scale-[1.03] active:scale-[0.97] w-full sm:w-48 text-center"
          >
            {t("nav.contactBtn")}
          </Link>
        </motion.div>
      </div>

      {/* Modern Animated Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 cursor-pointer will-change-transform"
        onClick={handleScrollDown}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-medium">Scroll</span>
        <div className="w-[24px] h-[40px] rounded-full border-2 border-white/30 flex justify-center p-1.5 hover:border-white/50 transition-colors duration-300">
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
        </div>
      </div>
    </section>
  );
}
