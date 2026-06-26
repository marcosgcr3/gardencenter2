"use client";

import React, { use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Sun,
  Droplet,
  Thermometer,
  Wind,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sprout,
  Heart,
  CalendarDays
} from "lucide-react";
import { plants, Plant } from "@/data/plants";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslatedPlant } from "@/data/plantsTranslations";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Custom SVG Water Droplet Icon
function WaterDropletIcon({ level, className = "w-8 h-8" }: { level: number; className?: string }) {
  const fillPercentage = level === 1 ? 33 : level === 2 ? 66 : 100;
  const id = React.useId().replace(/:/g, "-");
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0 select-none`}>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset={`${fillPercentage}%`} stopColor="#3b82f6" />
          <stop offset={`${fillPercentage}%`} stopColor="rgba(156, 163, 175, 0.2)" />
          <stop offset="100%" stopColor="rgba(156, 163, 175, 0.2)" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
        fill={`url(#${id})`}
        stroke="#2563eb"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Custom SVG Sun Icon
function SunIcon({ level, className = "w-8 h-8" }: { level: number; className?: string }) {
  const fillPercentage = level === 1 ? 33 : level === 2 ? 66 : 100;
  const id = React.useId().replace(/:/g, "-");
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0 select-none`}>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset={`${fillPercentage}%`} stopColor="#f59e0b" />
          <stop offset={`${fillPercentage}%`} stopColor="rgba(156, 163, 175, 0.2)" />
          <stop offset="100%" stopColor="rgba(156, 163, 175, 0.2)" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="5"
        fill={`url(#${id})`}
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <path
        d="M12 1v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="#d97706"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Custom SVG Thermometer Icon
function ThermometerIcon({ percentage, className = "w-8 h-8" }: { percentage: number; className?: string }) {
  const id = React.useId().replace(/:/g, "-");
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0 select-none`}>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset={`${percentage}%`} stopColor="#ef4444" />
          <stop offset={`${percentage}%`} stopColor="rgba(156, 163, 175, 0.2)" />
          <stop offset="100%" stopColor="rgba(156, 163, 175, 0.2)" />
        </linearGradient>
      </defs>
      <path
        d="M14 4.5a2 2 0 0 0-4 0v9.75a4.5 4.5 0 1 0 4 0V4.5z"
        fill={`url(#${id})`}
        stroke="#dc2626"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const getShortTemp = (tempStr: string): string => {
  const matches = tempStr.match(/-?\d+\s*°C/g);
  if (matches && matches.length >= 2) {
    return `${matches[0]} - ${matches[1]}`;
  } else if (matches && matches.length === 1) {
    return `> ${matches[0]}`;
  }
  return tempStr;
};

const getWaterLabel = (level: number, lang: string): string => {
  if (lang === "es") {
    return level === 1 ? "Poco" : level === 2 ? "Moderado" : "Abundante";
  }
  return level === 1 ? "Low" : level === 2 ? "Moderate" : "Abundant";
};

const getLightLabel = (level: number, lang: string): string => {
  if (lang === "es") {
    return level === 1 ? "Sombra" : level === 2 ? "Indirecta" : "Directa";
  }
  return level === 1 ? "Shade" : level === 2 ? "Indirect" : "Direct";
};

export default function PlantaDetailPage({ params }: PageProps) {
  const { t, language } = useLanguage();
  const { slug } = use(params);
  
  const rawPlant = plants.find((p) => p.slug === slug);

  if (!rawPlant) {
    notFound();
  }

  // Get translated plant data
  const plant = getTranslatedPlant(rawPlant, language);

  const getDifficultyColor = (difficulty: Plant["difficulty"]) => {
    switch (difficulty) {
      case "Bajo":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30";
      case "Medio":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30";
      case "Alto":
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30";
    }
  };

  const absoluteImageUrl = plant.imageUrl.startsWith("http")
    ? plant.imageUrl
    : `http://gardencenterlindavista.com${plant.imageUrl}`;

  const titleText = language === "es"
    ? `${plant.name} (${plant.scientificName}) | Cuidados y Riego | Garden Center Linda Vista`
    : `${plant.name} (${plant.scientificName}) | Care & Watering | Garden Center Linda Vista`;

  useEffect(() => {
    document.title = titleText;
  }, [titleText]);

  const descText = language === "es"
    ? `Guía de cuidados para ${plant.name} (${plant.scientificName}). Ficha técnica, frecuencia de riego estacional, luz ideal y prevención de plagas.`
    : `Care guide for ${plant.name} (${plant.scientificName}). Technical datasheet, seasonal watering frequency, ideal light, and pest prevention.`;
  const pageUrl = `http://gardencenterlindavista.com/plantas/${slug}`;

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-50/40 dark:bg-zinc-950/20 pt-2 pb-8 md:py-8">
      <title>{titleText}</title>
      <meta name="description" content={descText} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={pageUrl} />

      {/* OpenGraph */}
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={descText} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Garden Center Linda Vista" />
      <meta property="og:locale" content={language === "es" ? "es_ES" : "en_US"} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:description" content={descText} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      {/* 1. Navigation & Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-1 md:mt-4">
        {/* Back Link & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 md:mb-8">
          <Link
            href="/plantas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-brand dark:text-zinc-400 dark:hover:text-brand transition-colors bg-white dark:bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-150 dark:border-zinc-900 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("details.btn.back")}
          </Link>

          <nav className="text-zinc-500 text-xs sm:text-sm font-medium" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li className="text-zinc-400 select-none">/</li>
              <li>
                <Link href="/plantas" className="hover:text-brand transition-colors">
                  {language === "es" ? "Catálogo" : "Catalog"}
                </Link>
              </li>
              <li className="text-zinc-400 select-none">/</li>
              <li className="text-zinc-800 dark:text-zinc-300 font-semibold truncate max-w-[150px] sm:max-w-none" aria-current="page">
                {plant.name}
              </li>
            </ol>
          </nav>
        </div>
        {/* MOBILE VIEW (lg:hidden): Compact & Above the fold */}
        <div className="block lg:hidden w-full flex flex-col gap-5 mb-8">
          {/* 1. Header Details (Title & Scientific Name) */}
          <div>
            <span className="italic text-brand font-semibold text-xs uppercase tracking-wider block">
              {plant.scientificName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mt-1 leading-tight">
              {plant.name}
            </h1>
          </div>

          {/* 2. Compact Banner Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-4 border-white dark:border-zinc-900 shadow-md bg-white dark:bg-zinc-950">
            <Image
              src={plant.imageUrl}
              alt={plant.name}
              fill
              priority
              className="object-cover"
            />
            {/* Overlay Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 items-start">
              <span className="bg-white/95 dark:bg-zinc-950/95 text-zinc-800 dark:text-zinc-200 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs w-fit">
                {t(`category.${plant.category}`)}
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs w-fit ${getDifficultyColor(plant.difficulty)}`}>
                {t("details.difficulty")}: {t(`difficulty.${plant.difficulty}`)}
              </span>
            </div>
          </div>

          {/* 3. Care Dashboard (Gota, Sol, Termómetro) */}
          <div className="grid grid-cols-3 gap-3">
            {/* Riego */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-150/65 dark:border-zinc-900 p-3 rounded-2xl flex flex-col items-center text-center gap-1.5 shadow-xs">
              <WaterDropletIcon level={plant.wateringLevel} className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider">
                  {language === "es" ? "Riego" : "Watering"}
                </span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                  {getWaterLabel(plant.wateringLevel, language)}
                </span>
              </div>
            </div>

            {/* Sol */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-150/65 dark:border-zinc-900 p-3 rounded-2xl flex flex-col items-center text-center gap-1.5 shadow-xs">
              <SunIcon level={plant.sunLevel} className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider">
                  {language === "es" ? "Luz" : "Light"}
                </span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                  {getLightLabel(plant.sunLevel, language)}
                </span>
              </div>
            </div>

            {/* Temperatura */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-150/65 dark:border-zinc-900 p-3 rounded-2xl flex flex-col items-center text-center gap-1.5 shadow-xs">
              <ThermometerIcon percentage={plant.tempLevel} className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider">
                  {language === "es" ? "Temperatura" : "Temp"}
                </span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                  {getShortTemp(plant.temperature)}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Highlighted Fun Fact Card */}
          <div className="bg-brand/5 dark:bg-brand/10 border border-brand/10 dark:border-brand/20 rounded-2xl p-4 flex gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-brand/10 dark:bg-brand/20 text-brand flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-bold text-brand tracking-wider">
                {t("details.funFact")}
              </span>
              <p className="text-xs leading-relaxed font-light text-zinc-700 dark:text-zinc-300">
                {plant.funFact}
              </p>
            </div>
          </div>

          {/* 5. Description */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-150/65 dark:border-zinc-900 p-4 rounded-2xl shadow-xs">
            <p className="text-xs leading-relaxed font-light text-zinc-650 dark:text-zinc-400">
              {plant.description}
            </p>
          </div>

          {/* 6. Detailed specs grid (Original cards relocated below) */}
          <div className="grid grid-cols-1 gap-4 mt-2">
            {/* Light requirement detailed */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-150/65 dark:border-zinc-900 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center shrink-0">
                <SunIcon level={plant.sunLevel} className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xxs uppercase font-bold text-zinc-400 tracking-wider">{t("details.light")}</span>
                <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 leading-relaxed">{plant.light}</span>
              </div>
            </div>

            {/* Water requirement detailed */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-150/65 dark:border-zinc-900 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center shrink-0">
                <WaterDropletIcon level={plant.wateringLevel} className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xxs uppercase font-bold text-zinc-400 tracking-wider">
                  {language === "es" ? "Riego General" : "General Watering"}
                </span>
                <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 leading-relaxed">{plant.watering.general}</span>
              </div>
            </div>

            {/* Temperature requirement detailed */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-150/65 dark:border-zinc-900 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center shrink-0">
                <ThermometerIcon percentage={plant.tempLevel} className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xxs uppercase font-bold text-zinc-400 tracking-wider">{t("details.temperature")}</span>
                <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 leading-relaxed">{plant.temperature}</span>
              </div>
            </div>

            {/* Humidity requirement detailed */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-150/65 dark:border-zinc-900 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 flex items-center justify-center shrink-0">
                <Wind className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xxs uppercase font-bold text-zinc-400 tracking-wider">{t("details.humidity")}</span>
                <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 leading-relaxed">{plant.humidity}</span>
              </div>
            </div>
            
            {/* Difficulty Bar detailed */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-150/65 dark:border-zinc-900 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-xxs uppercase font-bold text-zinc-400 tracking-wider">
                  {language === "es" ? "Nivel de Cuidado" : "Care Level"}
                </span>
                <span className="text-xs font-light text-zinc-500 dark:text-zinc-400">
                  {language === "es" ? "Atención necesaria para la planta" : "Attention needed for the plant"}
                </span>
              </div>
              <span className={`text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-xl border ${getDifficultyColor(plant.difficulty)}`}>
                {t("details.difficulty")}: {t(`difficulty.${plant.difficulty}`)}
              </span>
            </div>
          </div>
        </div>

        {/* DESKTOP VIEW (lg:grid): Clean Two-Column Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-start mb-12">
          {/* Left Column: Visual Container */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <div className="relative aspect-square rounded-3xl overflow-hidden border-8 border-white dark:border-zinc-900 shadow-xl bg-white dark:bg-zinc-950 group">
              <Image
                src={plant.imageUrl}
                alt={plant.name}
                fill
                priority
                sizes="(max-w-768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-102"
              />
              
              {/* Floating Badge category */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/95 dark:bg-zinc-950/95 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-sm border border-zinc-200/10">
                  {t(`category.${plant.category}`)}
                </span>
              </div>
            </div>

            {/* Quick Micro-Stats card */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                  {language === "es" ? "Garantía Linda Vista" : "Linda Vista Guarantee"}
                </h4>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                  {language === "es"
                    ? "Todas nuestras plantas son seleccionadas directamente por expertos y pasan controles periódicos de salud vegetal antes de la entrega."
                    : "All our plants are directly selected by experts and undergo regular plant health checks before delivery."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Identity & Core specs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="italic text-brand font-semibold text-sm sm:text-base uppercase tracking-wider block">
                {plant.scientificName}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mt-2 leading-tight">
                {plant.name}
              </h1>
            </div>

            <p className="text-zinc-650 dark:text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
              {plant.description}
            </p>

            <div className="h-px bg-zinc-100 dark:bg-zinc-900" />

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Light requirement */}
              <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center shrink-0">
                  <SunIcon level={plant.sunLevel} className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xxs uppercase font-bold text-zinc-400 tracking-wider">{t("details.light")}</span>
                  <span className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{plant.light}</span>
                </div>
              </div>

              {/* Water requirement */}
              <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center shrink-0">
                  <WaterDropletIcon level={plant.wateringLevel} className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xxs uppercase font-bold text-zinc-400 tracking-wider">
                    {language === "es" ? "Riego General" : "General Watering"}
                  </span>
                  <span className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{plant.watering.general}</span>
                </div>
              </div>

              {/* Temperature requirement */}
              <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center shrink-0">
                  <ThermometerIcon percentage={plant.tempLevel} className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xxs uppercase font-bold text-zinc-400 tracking-wider">{t("details.temperature")}</span>
                  <span className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{plant.temperature}</span>
                </div>
              </div>

              {/* Humidity requirement */}
              <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 flex items-center justify-center shrink-0">
                  <Wind className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xxs uppercase font-bold text-zinc-400 tracking-wider">{t("details.humidity")}</span>
                  <span className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{plant.humidity}</span>
                </div>
              </div>
            </div>

            {/* Highlighted Fun Fact Card (Desktop) */}
            <div className="bg-brand/5 dark:bg-brand/10 border border-brand/10 dark:border-brand/20 rounded-2xl p-6 flex gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand/10 dark:bg-brand/20 text-brand flex items-center justify-center shrink-0">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xxs uppercase font-bold text-brand tracking-wider">
                  {t("details.funFact")}
                </span>
                <p className="text-sm leading-relaxed font-light text-zinc-700 dark:text-zinc-300">
                  {plant.funFact}
                </p>
              </div>
            </div>

            {/* Difficulty Bar */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex flex-col gap-0.5">
                <span className="text-xxs uppercase font-bold text-zinc-400 tracking-wider">
                  {language === "es" ? "Nivel de Cuidado" : "Care Level"}
                </span>
                <span className="text-sm font-light text-zinc-600 dark:text-zinc-400">
                  {language === "es" ? "Atención necesaria para la planta" : "Attention needed for the plant"}
                </span>
              </div>
              <span className={`text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-xl border ${getDifficultyColor(plant.difficulty)}`}>
                {t("details.difficulty")}: {t(`difficulty.${plant.difficulty}`)}
              </span>
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-200/60 dark:bg-zinc-900 mb-12" />

        {/* 3. Detailed Data Cards (Care, Watering, Diseases) */}
        <div className="flex flex-col gap-8 mb-20">
          
          {/* Card 1: Cuidados y Características */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col gap-3">
              <span className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">{t("details.title.care")}</h2>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                {language === "es"
                  ? "Recomendaciones generales para mantener tu planta vigorosa y una descripción de sus rasgos físicos principales."
                  : "General recommendations to keep your plant vigorous and a description of its main physical traits."}
              </p>
            </div>
            
            <div className="md:w-2/3 flex flex-col gap-6">
              <div className="bg-zinc-50/50 dark:bg-zinc-900/35 border border-zinc-100 dark:border-zinc-900/60 rounded-2xl p-6">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand" />
                  {language === "es" ? "Guía de Mantenimiento" : "Maintenance Guide"}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
                  {plant.care}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base mb-3 flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-brand" />
                  {language === "es" ? "Rasgos Distintivos" : "Distinctive Traits"}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-light">
                  {plant.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start gap-2 bg-zinc-50/30 dark:bg-zinc-900/10 p-3 rounded-xl border border-zinc-100/50 dark:border-zinc-900/30">
                      <span className="text-brand font-bold text-sm shrink-0 select-none">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2: Plan de Riego Estacional */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col gap-3">
              <span className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center">
                <CalendarDays className="w-6 h-6" />
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">{t("details.title.wateringPlan")}</h2>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                {language === "es"
                  ? "El agua es vida, pero el exceso de agua es el error más común. Sigue esta pauta adaptada a las estaciones de la Costa del Sol."
                  : "Water is life, but overwatering is the most common mistake. Follow this pattern adapted to the seasons of the Costa del Sol."}
              </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Summer watering */}
              <div className="bg-amber-50/20 dark:bg-amber-950/10 border border-amber-200/20 dark:border-amber-900/20 rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  {t("details.watering.summer")}
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                  {language === "es"
                    ? "Durante los meses cálidos de mayor crecimiento y evaporación, la pauta aproximada es:"
                    : "During the warm months of highest growth and evaporation, the approximate pattern is:"}
                </p>
                <div className="bg-white/80 dark:bg-zinc-900/60 border border-amber-200/10 dark:border-amber-900/10 rounded-xl p-4 font-bold text-sm text-zinc-800 dark:text-zinc-200">
                  {plant.watering.summer}
                </div>
              </div>

              {/* Winter watering */}
              <div className="bg-blue-50/20 dark:bg-blue-950/10 border border-blue-200/20 dark:border-blue-900/20 rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  {t("details.watering.winter")}
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                  {language === "es"
                    ? "En los meses fríos de descanso vegetativo y alta humedad ambiente, la pauta es:"
                    : "In the cold months of vegetative rest and high ambient humidity, the pattern is:"}
                </p>
                <div className="bg-white/80 dark:bg-zinc-900/60 border border-blue-200/10 dark:border-blue-900/10 rounded-xl p-4 font-bold text-sm text-zinc-800 dark:text-zinc-200">
                  {plant.watering.winter}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Plagas, Enfermedades y Prevención */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col gap-3">
              <span className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">{t("details.title.diseases")}</h2>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                {language === "es"
                  ? "Identifica a tiempo los síntomas comunes y mantén a raya a los parásitos para salvar la vida de tu planta."
                  : "Identify common symptoms in time and keep pests at bay to save your plant's life."}
              </p>
            </div>

            <div className="md:w-2/3 bg-rose-50/10 dark:bg-rose-950/5 border border-rose-200/10 dark:border-rose-900/10 rounded-2xl p-6 sm:p-8 flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                  {language === "es" ? "Alerta de Plagas" : "Pest Alert"}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
                  {plant.diseases}
                </p>
                <div className="bg-white/40 dark:bg-zinc-900/30 border border-rose-200/5 dark:border-rose-900/5 p-4 rounded-xl text-xs text-zinc-500 mt-2 leading-relaxed italic">
                  {language === "es"
                    ? "*Tip de Garden Center Linda Vista: Un tratamiento preventivo con Aceite de Neem e Jabón Potásico diluidos en agua cada 15 días mantendrá alejados a la mayoría de insectos chupadores de forma 100% ecológica."
                    : "*Garden Center Linda Vista Tip: A preventive treatment with Neem Oil and Potassium Soap diluted in water every 15 days will keep most sucking insects away in a 100% ecological way."}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
