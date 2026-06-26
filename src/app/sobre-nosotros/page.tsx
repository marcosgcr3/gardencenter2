"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sprout, Users, Award, MapPin, Calendar, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SobreNosotros() {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: <Calendar className="w-6 h-6 text-brand" />,
      title: t("about.val.title1"),
      desc: t("about.val.desc1"),
    },
    {
      icon: <Users className="w-6 h-6 text-brand" />,
      title: t("about.val.title2"),
      desc: t("about.val.desc2"),
    },
    {
      icon: <Heart className="w-6 h-6 text-brand" />,
      title: t("about.val.title3"),
      desc: t("about.val.desc3"),
    },
    {
      icon: <Sprout className="w-6 h-6 text-brand" />,
      title: t("about.val.title4"),
      desc: t("about.val.desc4"),
    },
  ];

  const locations = [
    { name: "Puerto Banús", distance: "3 min" },
    { name: language === "es" ? "Marbella Centro" : "Marbella Center", distance: "10 min" },
    { name: "Estepona", distance: "10 min" },
    { name: "Benahavís", distance: "12 min" },
  ];

  const titleText = language === "es"
    ? "Sobre Nosotros | Garden Center Linda Vista Marbella"
    : "About Us | Garden Center Linda Vista Marbella";

  React.useEffect(() => {
    document.title = titleText;
  }, [titleText]);

  const descText = language === "es"
    ? "Conoce la historia y valores de Garden Center Linda Vista, vivero y centro de jardinería familiar fundado en 1989 en San Pedro Alcántara, Marbella."
    : "Learn about the history and values of Garden Center Linda Vista, a family-run nursery and garden center founded in 1989 in San Pedro Alcántara, Marbella.";
  const pageUrl = "http://gardencenterlindavista.com/sobre-nosotros";
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
          alt={t("about.title").toUpperCase()}
          fill
          className="object-cover"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 flex flex-col gap-4 animate-slide-up">
          <span className="text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit backdrop-blur-xs">
            {t("about.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            {t("about.title")}
          </h1>
          <p className="text-zinc-200 text-lg max-w-xl font-light">
            {t("about.header.desc")}
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Text details column */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-brand font-semibold text-sm uppercase tracking-wider">
                  {t("about.subtitle")}
                </span>
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  {t("about.main.title")}
                </h2>
              </div>
              
              <div className="flex flex-col gap-6 text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
                <p>{t("about.p3")}</p>
              </div>

              {/* Location Cards */}
              <div className="flex flex-col gap-4 mt-2">
                <a
                  href="https://maps.google.com/?q=Calle+Araucaria+10,+San+Pedro+Alcántara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-zinc-900 hover:text-brand dark:text-white dark:hover:text-brand flex items-center gap-2 group w-fit transition-colors"
                >
                  <MapPin className="w-5 h-5 text-brand group-hover:scale-110 transition-transform" />
                  {t("about.location.title")}
                </a>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {t("about.location.desc")}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                  {locations.map((loc, idx) => (
                    <a
                      key={idx}
                      href="https://maps.google.com/?q=Calle+Araucaria+10,+San+Pedro+Alcántara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-50 hover:bg-brand/5 dark:bg-zinc-900 dark:hover:bg-brand/10 border border-zinc-100 dark:border-zinc-800/80 hover:border-brand rounded-xl p-4 text-center block transition-all duration-300 hover:scale-103 cursor-pointer"
                    >
                      <span className="block text-zinc-800 dark:text-zinc-200 font-bold text-sm">{loc.name}</span>
                      <span className="block text-brand text-xs mt-1 font-semibold">{loc.distance}</span>
                    </a>
                  ))}
                </div>
                {/* Embedded Map */}
                <div className="w-full h-[260px] md:h-[300px] relative rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-md mt-4 group">
                  <a
                    href="https://maps.google.com/?q=Calle+Araucaria+10,+San+Pedro+Alcántara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 block z-20"
                    title={language === "es" ? "Abrir en Google Maps" : "Open in Google Maps"}
                  />
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1907.5323942711286!2d-4.99649123988893!3d36.479921369558205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd73298a5bf33e2b%3A0x7c93bac2ca9622c6!2sGarden%20Center%20Linda%20Vista%20S.L.!5e0!3m2!1ses!2ses!4v1621503010199!5m2!1ses!2ses"
                    className="absolute inset-0 w-full h-full border-0 dark:invert-[0.9] dark:hue-rotate-180 z-10 transition-transform duration-700 group-hover:scale-102"
                    allowFullScreen
                    loading="lazy"
                    title={language === "es" ? "Ubicación de Garden Center Linda Vista en Google Maps" : "Location of Garden Center Linda Vista on Google Maps"}
                  />
                </div>
              </div>
            </div>

            {/* Side Image & Badge */}
            <div className="lg:col-span-5 flex flex-col gap-8 w-full">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-8 border-zinc-100 dark:border-zinc-900 shadow-xl group">
                <Image
                  src="/about.jpg"
                  alt={t("about.title")}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                />
                
                {/* Years Experience Badge Overlay */}
                <div className="absolute bottom-6 right-6 bg-brand text-white p-5 rounded-2xl flex flex-col items-center justify-center shadow-lg z-20">
                  <span className="text-3xl font-extrabold tracking-tight">35+</span>
                  <span className="text-xs uppercase tracking-widest font-semibold mt-1">{t("about.experience.badge")}</span>
                </div>
              </div>

              <div className="glassmorphism rounded-2xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-base">{t("about.advice.title")}</h4>
                  <p className="text-zinc-500 text-xs mt-1 leading-5">
                    {t("about.advice.desc")}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-100 dark:border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-brand font-bold text-sm uppercase tracking-wider">
              {t("about.values.badge")}
            </span>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {t("about.values.title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {t("about.values.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-8 flex flex-col gap-4 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{val.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Call to Action Banner */}
      <section className="bg-zinc-950 text-white py-24 relative overflow-hidden text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-6 items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {t("about.cta.title")}
          </h2>
          <p className="text-zinc-400 text-base max-w-xl font-light leading-relaxed">
            {t("about.cta.desc")}
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href="/contacto"
              className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl active:scale-95"
            >
              {t("about.cta.btn")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
