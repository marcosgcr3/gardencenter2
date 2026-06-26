"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sprout,
  Compass,
  Truck,
  Flower2,
  TreePine,
  Armchair,
  Star,
  Quote,
  Clock,
  Heart
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "@/components/Hero";
import ScrollVine from "@/components/ScrollVine";
import LeafParticles from "@/components/LeafParticles";
import CinematicPreloader from "@/components/CinematicPreloader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const { t, language } = useLanguage();
  const pageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 1. Every section fades into view on scroll (except Hero, which has internal timeline)
    const sections = pageRef.current.querySelectorAll("section:not(:first-of-type)");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 2. Features Grid staggered fade-in
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.querySelectorAll(".feature-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 3. Cinematic Clip-Path Reveal and Parallax for Large Section Image
    const parallaxContainers = pageRef.current.querySelectorAll(".parallax-image-container");
    parallaxContainers.forEach((container) => {
      const img = container.querySelector("img");
      if (!img) return;

      // Premium clip-path swipe reveal (opens like window panels)
      gsap.fromTo(
        img,
        { clipPath: "inset(0% 50% 0% 50%)", scale: 1.1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1.05,
          duration: 1.8,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtle parallax shift
      gsap.to(img, {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, { scope: pageRef });

  // Testimonials Carousel Logic
  const [currentReview, setCurrentReview] = useState(0);
  const reviews = [
    {
      name: "Carlo Piran",
      text: t("review.1"),
      stars: 5,
    },
    {
      name: "Monika Aloka",
      text: t("review.2"),
      stars: 5,
    },
    {
      name: "Dholdings",
      text: t("review.3"),
      stars: 5,
    },
    {
      name: "Brian Hurley",
      text: t("review.4"),
      stars: 5,
    },
    {
      name: "Paul Wilcox",
      text: t("review.5"),
      stars: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const titleText = language === "es"
    ? "Garden Center Linda Vista | Vivero y Jardinería en Marbella"
    : "Garden Center Linda Vista | Nursery & Gardening in Marbella";

  useEffect(() => {
    document.title = titleText;
  }, [titleText]);

  const descText = language === "es"
    ? "Vivero familiar en San Pedro Alcántara (Marbella) desde 1989. Amplia selección de plantas de interior, exterior, alfarería artesanal y servicios de jardinería profesional."
    : "Family nursery in San Pedro Alcántara (Marbella) since 1989. Large selection of indoor and outdoor plants, artisan pottery, and professional gardening services.";
  const pageUrl = "http://gardencenterlindavista.com";
  const shareImage = "http://gardencenterlindavista.com/hero1.jpg";

  return (
    <div ref={pageRef} className="flex flex-col w-full overflow-hidden relative">
      {/* Cinematic Split Preloader Intro */}
      <CinematicPreloader />

      {/* Premium Luxury Scroll Vine on left margin */}
      <ScrollVine />

      {/* Premium Soft Floating Leaf Particles in background */}
      <LeafParticles />

      <title>{titleText}</title>
      <meta name="description" content={descText} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={pageUrl} />

      {/* OpenGraph */}
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={descText} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Garden Center Linda Vista" />
      <meta property="og:locale" content={language === "es" ? "es_ES" : "en_US"} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:description" content={descText} />
      <meta name="twitter:image" content={shareImage} />

      {/* 1. Premium Hero Component */}
      <Hero />

      {/* 2. Premium Features Quick Grid */}
      <section ref={featuresRef} className="py-20 bg-zinc-50 dark:bg-zinc-900/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glassmorphism feature-card rounded-2xl p-8 flex flex-col gap-4 group opacity-0 translate-y-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/10 dark:hover:shadow-none">
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-[family:var(--font-playfair)] text-zinc-900 dark:text-white">{t("home.features.title1")}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                {t("home.features.desc1")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glassmorphism feature-card rounded-2xl p-8 flex flex-col gap-4 group opacity-0 translate-y-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/10 dark:hover:shadow-none">
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-[family:var(--font-playfair)] text-zinc-900 dark:text-white">{t("home.features.title2")}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                {t("home.features.desc2")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glassmorphism feature-card rounded-2xl p-8 flex flex-col gap-4 group opacity-0 translate-y-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/10 dark:hover:shadow-none">
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-[family:var(--font-playfair)] text-zinc-900 dark:text-white">{t("home.features.title3")}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                {t("home.features.desc3")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Us Preview Section (Asymmetric Overlapping Editorial Layout) */}
      <section className="py-24 bg-white dark:bg-zinc-950 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            
            {/* Image Side - Spans left-to-center (6 cols) */}
            <div className="col-span-12 lg:col-span-6 lg:col-start-1 lg:row-start-1 relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl z-10 border border-zinc-200/20 dark:border-zinc-800/20 bg-white p-8 sm:p-12 lg:pl-16 lg:pr-40 flex items-center justify-start parallax-image-container">
              <div className="relative w-full h-full">
                <Image
                  src="/about.jpg"
                  alt="Instalaciones Garden Center Linda Vista"
                  fill
                  className="object-contain object-left will-change-transform"
                  sizes="(max-w-1024px) 100vw, 65vw"
                  priority
                />
              </div>
            </div>

            {/* Text Side - Floating Glass Card overlaps the Image (7 cols) */}
            <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:row-start-1 relative z-20 flex flex-col gap-6 lg:-ml-12 mt-6 lg:mt-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl shadow-zinc-900/5">
              <span className="text-brand font-bold text-xs uppercase tracking-[0.2em]">
                {t("home.about.badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-[family:var(--font-playfair)] text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
                {t("home.about.title")}
              </h2>
              <p className="text-zinc-650 dark:text-zinc-350 leading-relaxed text-sm font-light">
                {t("home.about.desc1")}
              </p>
              <p className="text-zinc-650 dark:text-zinc-350 leading-relaxed text-sm font-light">
                {t("home.about.desc2")}
              </p>
              <div className="pt-2">
                <Link
                  href="/sobre-nosotros"
                  className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-semibold text-sm transition-colors group"
                >
                  {t("home.about.link")}
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. Services Grid Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-brand font-bold text-xs uppercase tracking-[0.2em]">
              {t("home.services.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-[family:var(--font-playfair)] text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
              {t("home.services.title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {t("home.services.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-8 flex flex-col gap-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/10 dark:hover:shadow-none group">
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold font-[family:var(--font-playfair)] text-zinc-900 dark:text-white mb-2">{t("home.services.s1.title")}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  {t("home.services.s1.desc")}
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-8 flex flex-col gap-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/10 dark:hover:shadow-none group">
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Flower2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold font-[family:var(--font-playfair)] text-zinc-900 dark:text-white mb-2">{t("home.services.s2.title")}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  {t("home.services.s2.desc")}
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-8 flex flex-col gap-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/10 dark:hover:shadow-none group">
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <TreePine className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold font-[family:var(--font-playfair)] text-zinc-900 dark:text-white mb-2">{t("home.services.s3.title")}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  {t("home.services.s3.desc")}
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-8 flex flex-col gap-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/10 dark:hover:shadow-none group">
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Armchair className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold font-[family:var(--font-playfair)] text-zinc-900 dark:text-white mb-2">{t("home.services.s4.title")}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  {t("home.services.s4.desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Timetable & Callback CTA Section */}
      <section className="relative py-28 bg-brand text-white overflow-hidden z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-light/35 via-brand/10 to-brand-dark/20 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-[family:var(--font-playfair)] tracking-tight text-white leading-[1.15]">
                {t("home.cta.title")}
              </h2>
              <p className="text-zinc-100 font-light text-base leading-relaxed">
                {t("home.cta.desc")}
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <a
                  href="tel:952785206"
                  className="bg-zinc-950 hover:bg-zinc-900 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-500 ease-out hover:scale-103 hover:shadow-xl active:scale-97 text-center"
                >
                  {t("home.cta.btn.call")}
                </a>
                <Link
                  href="/contacto"
                  className="border-2 border-white hover:bg-white hover:text-brand text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-500 ease-out hover:scale-103 hover:shadow-xl active:scale-97 text-center"
                >
                  {t("home.cta.btn.msg")}
                </Link>
              </div>
            </div>

            {/* Timetable card with luxury hover */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-[1.01] hover:border-white/30 transition-all duration-500 ease-out">
              <h3 className="text-xl font-bold text-white tracking-wide border-b border-white/20 pb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-light" />
                {t("home.cta.hours.title")}
              </h3>
              <div className="flex flex-col gap-4 text-zinc-100 font-light">
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium text-white">{t("days.mon-fri")}</span>
                  <span>08:30 - 14:00 / 16:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-white/10 pt-4">
                  <span className="font-medium text-white">{t("days.sat")}</span>
                  <span>10:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-white/10 pt-4">
                  <span className="font-medium text-white">{t("days.sun")}</span>
                  <span className="text-brand-light font-medium bg-zinc-950/20 px-3 py-1 rounded-full text-xs">{t("status.closed")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-24 bg-white dark:bg-zinc-950 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-brand font-bold text-xs uppercase tracking-[0.2em]">
              {t("home.reviews.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-[family:var(--font-playfair)] text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
              {t("home.reviews.title")}
            </h2>
          </div>

          {/* Testimonial Box with luxury hover shadow */}
          <div className="relative glassmorphism dark:bg-zinc-900/60 rounded-3xl p-10 md:p-14 shadow-xl flex flex-col gap-6 min-h-[300px] justify-center transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-brand/5">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand rounded-full flex items-center justify-center shadow-lg shadow-brand/20">
              <Quote className="w-5 h-5 text-white" />
            </div>

            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 flex flex-col gap-6 ${
                  idx === currentReview
                    ? "opacity-100 scale-100 flex"
                    : "opacity-0 scale-95 hidden"
                }`}
              >
                <div className="flex justify-center gap-1">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 italic font-light leading-relaxed px-4 md:px-8">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                    {rev.name}
                  </h4>
                  <span className="text-xs text-zinc-400 uppercase tracking-widest mt-1 block">
                    {t("home.reviews.subtitle")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Nav dots */}
          <div className="flex justify-center gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReview(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentReview ? "w-8 bg-brand" : "w-2.5 bg-zinc-200 dark:bg-zinc-800"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
