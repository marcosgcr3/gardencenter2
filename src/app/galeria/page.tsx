"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Play, 
  Video, 
  Image as ImageIcon 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const mediaItems = [
  // Videos first
  { src: "/gallery/1000275447.mp4", type: "video", key: "gallery.video1", altEs: "Paseo por las instalaciones de plantas y flores", altEn: "Walkthrough of our plant and flower facilities" },
  { src: "/gallery/1000275448.mp4", type: "video", key: "gallery.video2", altEs: "Gran variedad de arbustos y plantas exteriores", altEn: "Wide variety of shrubs and outdoor plants" },
  { src: "/gallery/1000275449.mp4", type: "video", key: "gallery.video3", altEs: "Zona de alfarería, macetas y decoración", altEn: "Pottery, pots, and decoration area" },
  { src: "/gallery/1000275451.mp4", type: "video", key: "gallery.video4", altEs: "Exposición de flores de temporada y plantas de interior", altEn: "Exhibition of seasonal flowers and indoor plants" },

  // New photos from refotillo
  { src: "/gallery/1000275282.jpg", type: "image", key: "gallery.ref1" },
  { src: "/gallery/1000275284.jpg", type: "image", key: "gallery.ref2" },
  { src: "/gallery/1000275296.jpg", type: "image", key: "gallery.ref3" },
  { src: "/gallery/1000275298.jpg", type: "image", key: "gallery.ref4" },
  { src: "/gallery/1000275302.jpg", type: "image", key: "gallery.ref5" },
  { src: "/gallery/1000275304.jpg", type: "image", key: "gallery.ref6" },
  { src: "/gallery/1000275306.jpg", type: "image", key: "gallery.ref7" },
  { src: "/gallery/1000275311.jpg", type: "image", key: "gallery.ref8" },
  { src: "/gallery/1000275315.jpg", type: "image", key: "gallery.ref9" },
  { src: "/gallery/1000275318.jpg", type: "image", key: "gallery.ref10" },
  { src: "/gallery/1000275324.jpg", type: "image", key: "gallery.ref11" },
  { src: "/gallery/1000275331.jpg", type: "image", key: "gallery.ref12" },
  { src: "/gallery/1000275342.jpg", type: "image", key: "gallery.ref13" },
  { src: "/gallery/1000275369.jpg", type: "image", key: "gallery.ref14" },
  { src: "/gallery/1000275374.jpg", type: "image", key: "gallery.ref15" },
  { src: "/gallery/1000275376.jpg", type: "image", key: "gallery.ref16" },
  { src: "/gallery/1000275378.jpg", type: "image", key: "gallery.ref17" },
  { src: "/gallery/1000275411.jpg", type: "image", key: "gallery.ref18" },
  { src: "/gallery/1000275413.jpg", type: "image", key: "gallery.ref19" },
  { src: "/gallery/1000275423.jpg", type: "image", key: "gallery.ref20" },
  { src: "/gallery/1000275426.jpg", type: "image", key: "gallery.ref21" },
  { src: "/gallery/1000275429.jpg", type: "image", key: "gallery.ref22" },
  { src: "/gallery/1000275432.jpg", type: "image", key: "gallery.ref23" },
  { src: "/gallery/1000275435.jpg", type: "image", key: "gallery.ref24" },
  { src: "/gallery/1000275437.jpg", type: "image", key: "gallery.ref25" },
  { src: "/gallery/1000275440.jpg", type: "image", key: "gallery.ref26" },
  { src: "/gallery/1000275442.jpg", type: "image", key: "gallery.ref27" },
  { src: "/gallery/1000275469.jpg", type: "image", key: "gallery.ref28" },
  { src: "/gallery/1000275472.jpg", type: "image", key: "gallery.ref29" },
  { src: "/gallery/1000275475.jpg", type: "image", key: "gallery.ref30" },
  { src: "/gallery/1000275477.jpg", type: "image", key: "gallery.ref31" },
  { src: "/gallery/1000275478.jpg", type: "image", key: "gallery.ref32" },
  { src: "/gallery/1000275484.jpg", type: "image", key: "gallery.ref33" },
  { src: "/gallery/1000275487.jpg", type: "image", key: "gallery.ref34" },
  { src: "/gallery/1000275490.jpg", type: "image", key: "gallery.ref35" },
  { src: "/gallery/1000275493.jpg", type: "image", key: "gallery.ref36" },
  { src: "/gallery/1000275496.jpg", type: "image", key: "gallery.ref37" },
  { src: "/gallery/1000275499.jpg", type: "image", key: "gallery.ref38" },
  { src: "/gallery/1000275502.jpg", type: "image", key: "gallery.ref39" },
  { src: "/gallery/1000275504.jpg", type: "image", key: "gallery.ref40" },

  // Original photos
  { src: "/gallery/img1.jpg", type: "image", key: "gallery.photo1" },
  { src: "/gallery/img2.jpg", type: "image", key: "gallery.photo2" },
  { src: "/gallery/img3.jpg", type: "image", key: "gallery.photo3" },
  { src: "/gallery/img4.jpg", type: "image", key: "gallery.photo4" },
  { src: "/gallery/img5.jpg", type: "image", key: "gallery.photo5" },
  { src: "/gallery/img6.jpg", type: "image", key: "gallery.photo6" },
  { src: "/gallery/img7.jpg", type: "image", key: "gallery.photo7" },
  { src: "/gallery/img8.jpg", type: "image", key: "gallery.photo8" },
];

const getMediaTitle = (item: typeof mediaItems[0], language: string, t: (k: string) => string) => {
  const translation = t(item.key);
  if (translation !== item.key) {
    return translation;
  }
  if (item.altEs && language === "es") return item.altEs;
  if (item.altEn && language !== "es") return item.altEn;
  
  if (item.type === "video") {
    return language === "es" ? "Vídeo de nuestras instalaciones" : "Video of our facilities";
  }
  return language === "es" ? "Instalaciones del Garden Center Linda Vista" : "Facilities of Garden Center Linda Vista";
};

export default function Galeria() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<"all" | "images" | "videos">("all");
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [items, setItems] = useState<typeof mediaItems>(mediaItems);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch gallery");
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Error loading dynamic gallery:", err));
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filter === "all") return true;
      if (filter === "images") return item.type === "image";
      if (filter === "videos") return item.type === "video";
      return true;
    });
  }, [filter, items]);

  const handlePrev = React.useCallback(() => {
    setActivePhoto((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
  }, [filteredItems.length]);

  const handleNext = React.useCallback(() => {
    setActivePhoto((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
  }, [filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto === null) return;
      if (e.key === "Escape") setActivePhoto(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, handlePrev, handleNext]);

  const titleText = language === "es"
    ? "Galería de Fotos y Vídeos | Garden Center Linda Vista Marbella"
    : "Photo and Video Gallery | Garden Center Linda Vista Marbella";

  useEffect(() => {
    document.title = titleText;
  }, [titleText]);

  const descText = language === "es"
    ? "Explora nuestras instalaciones en San Pedro Alcántara, Marbella. Descubre nuestra gran exposición de plantas, flores, alfarería y vídeos de nuestro vivero."
    : "Explore our facilities in San Pedro Alcántara, Marbella. Discover our large exhibition of plants, flowers, pottery, and videos of our nursery.";
  const pageUrl = "http://gardencenterlindavista.com/galeria";
  const shareImage = "http://gardencenterlindavista.com/hero1.jpg";

  return (
    <div className="flex flex-col w-full">
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

      {/* 1. Header Banner */}
      <section className="relative h-[40vh] min-h-[300px] w-full flex items-center bg-zinc-950 text-white">
        <div className="absolute inset-0 bg-black/55 z-10" />
        <Image
          src="/hero1.png"
          alt={t("gallery.title").toUpperCase()}
          fill
          className="object-cover"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 flex flex-col gap-4 animate-slide-up">
          <span className="text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit backdrop-blur-xs">
            {t("gallery.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            {t("gallery.title")}
          </h1>
          <p className="text-zinc-200 text-lg max-w-xl font-light">
            {t("gallery.header.desc")}
          </p>
        </div>
      </section>

      {/* 2. Media Grid Section */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-brand font-semibold text-sm uppercase tracking-wider">
                {t("gallery.info.badge")}
              </span>
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-2 tracking-tight">
                {t("gallery.info.title")}
              </h2>
              <p className="text-zinc-500 mt-4 leading-relaxed">
                {t("gallery.info.desc")}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2.5 self-start md:self-auto bg-zinc-50 dark:bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-200/40 dark:border-zinc-800/80">
              <button
                onClick={() => { setFilter("all"); setActivePhoto(null); }}
                className={`flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  filter === "all"
                    ? "bg-brand text-white shadow-md shadow-brand/10"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {language === "es" ? "Todos" : "All"}
              </button>
              <button
                onClick={() => { setFilter("images"); setActivePhoto(null); }}
                className={`flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  filter === "images"
                    ? "bg-brand text-white shadow-md shadow-brand/10"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                {language === "es" ? "Fotos" : "Photos"}
              </button>
              <button
                onClick={() => { setFilter("videos"); setActivePhoto(null); }}
                className={`flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  filter === "videos"
                    ? "bg-brand text-white shadow-md shadow-brand/10"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <Video className="w-4 h-4 shrink-0" />
                {language === "es" ? "Vídeos" : "Videos"}
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredItems.map((item, idx) => (
              <button
                key={item.src}
                onClick={() => setActivePhoto(idx)}
                className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-900 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                aria-label={`Open ${item.type === "video" ? "video" : "photo"} ${idx + 1} in lightbox`}
              >
                {item.type === "video" ? (
                  <div className="relative w-full h-full bg-zinc-950">
                    <video
                      src={item.src}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black/10 z-10" />
                    {/* Play Badge */}
                    <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 z-20 border border-zinc-800">
                      <Video className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{language === "es" ? "Vídeo" : "Video"}</span>
                    </div>
                    {/* Centered Play Button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-25">
                      <div className="bg-brand text-white p-3.5 rounded-full shadow-lg border border-brand/20 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                        <Play className="w-5 h-5 fill-white text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Image
                      src={item.src}
                      alt={getMediaTitle(item, language, t)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Lightbox Modal Overlay */}
      {activePhoto !== null && filteredItems[activePhoto] && (
        <div className="fixed inset-0 bg-zinc-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none animate-fade-in">
          {/* Close button */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-brand text-white p-3 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-brand text-white p-3 rounded-full transition-all duration-300 z-50 hover:scale-105 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-brand text-white p-3 rounded-full transition-all duration-300 z-50 hover:scale-105 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Centered Media Card */}
          <div className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center justify-center p-2">
            <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-900 bg-zinc-900 flex items-center justify-center">
              {filteredItems[activePhoto].type === "video" ? (
                <video
                  key={filteredItems[activePhoto].src}
                  src={filteredItems[activePhoto].src}
                  controls
                  autoPlay
                  className="max-h-full max-w-full rounded-2xl bg-black object-contain w-full h-full"
                  playsInline
                />
              ) : (
                <Image
                  src={filteredItems[activePhoto].src}
                  alt={getMediaTitle(filteredItems[activePhoto], language, t)}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              )}
            </div>
            
            {/* Description Info overlay */}
            <div className="text-center mt-6 text-zinc-300 max-w-xl">
              <p className="text-sm font-medium">{getMediaTitle(filteredItems[activePhoto], language, t)}</p>
              <span className="text-zinc-500 text-xs mt-2 block">
                {language === "es"
                  ? `${filteredItems[activePhoto].type === "video" ? "Vídeo" : "Imagen"} ${activePhoto + 1} de ${filteredItems.length}`
                  : `${filteredItems[activePhoto].type === "video" ? "Video" : "Image"} ${activePhoto + 1} of ${filteredItems.length}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
