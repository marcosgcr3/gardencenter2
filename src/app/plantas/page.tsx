"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Sprout,
  Filter,
  ArrowRight,
  Droplet,
  Sun,
  X,
  Compass,
  Sparkles,
  TreePine,
  Home,
  CheckCircle2,
  Settings2
} from "lucide-react";
import { plants, Plant } from "@/data/plants";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslatedPlant } from "@/data/plantsTranslations";

// Custom SVG Water Droplet Icon
function WaterDropletIcon({ level, className = "w-5 h-5" }: { level: number; className?: string }) {
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
function SunIcon({ level, className = "w-5 h-5" }: { level: number; className?: string }) {
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

export default function PlantasPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Todas");
  const [allPlants, setAllPlants] = useState<Plant[]>(plants);

  // Cargar plantas adicionales guardadas en localStorage (si existen)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("local_plants");
      if (local) {
        try {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed)) {
            const merged = [...plants];
            parsed.forEach((localPlant: Plant) => {
              if (!merged.some(p => p.slug === localPlant.slug)) {
                merged.push(localPlant);
              }
            });
            setAllPlants(merged);
          }
        } catch (e) {
          console.error("Error al parsear plantas locales:", e);
        }
      }
    }
  }, []);

  // Filter Categories list
  const categories = ["Todas", "Interior", "Exterior", "Suculentas", "Árboles"];
  const difficulties = ["Todas", "Bajo", "Medio", "Alto"];

  // Translate all plants based on the current language
  const translatedAllPlants = useMemo(() => {
    return allPlants.map(p => getTranslatedPlant(p, language));
  }, [allPlants, language]);

  // Filter and search logic
  const filteredPlants = useMemo(() => {
    return translatedAllPlants.filter((plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "Todas" || plant.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === "Todas" || plant.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [translatedAllPlants, searchTerm, selectedCategory, selectedDifficulty]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Todas");
    setSelectedDifficulty("Todas");
  };

  // Helper to render difficulty badge styling
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

  // Helper to render category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Interior":
        return <Home className="w-4 h-4" />;
      case "Exterior":
        return <Sun className="w-4 h-4" />;
      case "Suculentas":
        return <Compass className="w-4 h-4" />;
      case "Árboles":
        return <TreePine className="w-4 h-4" />;
      default:
        return <Sprout className="w-4 h-4" />;
    }
  };

  const titleText = language === "es"
    ? "Catálogo de Plantas y Guía de Cuidados | Garden Center Linda Vista"
    : "Plants Catalog & Care Guide | Garden Center Linda Vista";

  useEffect(() => {
    document.title = titleText;
  }, [titleText]);

  const descText = language === "es"
    ? "Guía completa de plantas de interior y exterior en Marbella. Filtra por dificultad de cuidado y consulta pautas de riego, luz y mantenimiento."
    : "Complete guide to indoor and outdoor plants in Marbella. Filter by care difficulty and check watering, light, and maintenance guidelines.";
  const pageUrl = "http://gardencenterlindavista.com/plantas";
  const shareImage = "http://gardencenterlindavista.com/hero1.jpg";

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-50/40 dark:bg-zinc-950/20 py-8">
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
      {/* 1. Breadcrumbs & Minimal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <nav className="text-zinc-500 text-xs sm:text-sm font-medium mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand transition-colors">
                {t("nav.home")}
              </Link>
            </li>
            <li className="text-zinc-400 select-none">/</li>
            <li className="text-zinc-800 dark:text-zinc-300 font-semibold" aria-current="page">
              {t("nav.gallery") === "Gallery" ? "Plants Catalog" : "Catálogo de Plantas"}
            </li>
          </ol>
        </nav>

        {/* Text Header - Clean, without large image banner */}
        <div className="relative border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-sm flex flex-col gap-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
          <div className="flex flex-wrap justify-between items-start gap-4 z-10">
            <span className="text-brand font-bold text-xs sm:text-sm uppercase tracking-widest bg-brand/10 text-brand px-3.5 py-1.5 rounded-full w-fit flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {t("catalog.badge")}
            </span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-brand dark:text-zinc-400 dark:hover:text-brand transition-colors bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/60 dark:hover:bg-zinc-900/80 px-3.5 py-1.5 rounded-full border border-zinc-200/40 dark:border-zinc-800/80 print:hidden shadow-xs shrink-0"
            >
              <Settings2 className="w-3.5 h-3.5 text-brand" />
              {t("catalog.adminBtn")}
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t("catalog.title")}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed text-sm sm:text-base font-light">
            {t("catalog.desc")}
          </p>
        </div>
      </div>

      {/* 2. Interactive Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 flex flex-col gap-6">
        <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
          {/* Top Search & Reset Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder={t("catalog.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-zinc-800 dark:text-zinc-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  aria-label={language === "es" ? "Borrar búsqueda" : "Clear search"}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Clear Button / Count */}
            <div className="lg:col-span-4 flex justify-between lg:justify-end items-center gap-4">
              <span className="text-zinc-500 text-xs sm:text-sm font-medium">
                {filteredPlants.length} {filteredPlants.length === 1 ? t("catalog.found.single") : t("catalog.found")}
              </span>
              {(searchTerm || selectedCategory !== "Todas" || selectedDifficulty !== "Todas") && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1 transition-colors px-3 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20"
                >
                  <X className="w-3.5 h-3.5" />
                  {t("catalog.clear")}
                </button>
              )}
            </div>
          </div>

          <div className="h-px bg-zinc-100 dark:bg-zinc-900" />

          {/* Filtering tabs */}
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            {/* Category tabs */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                {t("catalog.filter.cat")}
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-brand text-white shadow-md shadow-brand/10"
                          : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                      }`}
                    >
                      {getCategoryIcon(cat)}
                      {t(`category.${cat}`)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t("catalog.filter.diff")}
              </span>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((diff) => {
                  const isActive = selectedDifficulty === diff;
                  return (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                          : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                      }`}
                    >
                      {t(`difficulty.${diff}`)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Plant Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 mb-20">
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlants.map((plant) => (
              <article
                key={plant.slug}
                className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative aspect-video sm:aspect-[4/3] md:aspect-video lg:aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={plant.imageUrl}
                    alt={plant.name}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 items-start">
                    <span className="bg-white/95 dark:bg-zinc-950/95 text-zinc-800 dark:text-zinc-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm border border-zinc-200/20 w-fit">
                      {t(`category.${plant.category}`)}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm w-fit ${getDifficultyColor(plant.difficulty)}`}>
                      {t("details.difficulty")}: {t(`difficulty.${plant.difficulty}`)}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow gap-4">
                  <div>
                    <span className="italic text-brand text-xs font-semibold uppercase tracking-wider">
                      {plant.scientificName}
                    </span>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-1 group-hover:text-brand transition-colors duration-300">
                      {plant.name}
                    </h2>
                  </div>

                  <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-light">
                    {plant.description}
                  </p>

                  <div className="h-px bg-zinc-100 dark:bg-zinc-900/60 mt-auto" />

                  {/* Core indicators */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 py-1">
                    <div className="flex items-center gap-2">
                      <SunIcon level={plant.sunLevel} className="w-5 h-5 text-brand shrink-0" />
                      <span className="truncate" title={plant.light}>{plant.light}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <WaterDropletIcon level={plant.wateringLevel} className="w-5 h-5 text-brand shrink-0" />
                      <span className="truncate" title={plant.watering.general}>{plant.watering.general}</span>
                    </div>
                  </div>

                  {/* CTA Link Button */}
                  <Link
                    href={`/plantas/${plant.slug}`}
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-zinc-50 hover:bg-brand dark:bg-zinc-900/50 dark:hover:bg-brand text-zinc-700 hover:text-white dark:text-zinc-300 dark:hover:text-white font-bold text-xs sm:text-sm py-3 rounded-2xl transition-all duration-300 group/btn"
                  >
                    {t("catalog.btn.view")}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-md mx-auto text-center py-16 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-8 shadow-sm flex flex-col items-center gap-5 mt-10">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 flex items-center justify-center">
              <X className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{t("catalog.empty.title")}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">
                {t("catalog.empty.desc")}
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="bg-brand hover:bg-brand-dark text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors active:scale-95 shadow-lg shadow-brand/10"
            >
              {t("catalog.empty.btn")}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
