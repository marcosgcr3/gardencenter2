"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

export default function Contacto() {
  const { t, language } = useLanguage();

  const contactCards = [
    {
      icon: <MapPin className="w-6 h-6 text-brand" />,
      title: t("contact.card.address"),
      details: [
        "Calle Araucaria 10",
        "29670 San Pedro Alcántara",
        "Marbella, Málaga, España",
      ],
      link: "https://maps.google.com/?q=Calle+Araucaria+10,+San+Pedro+Alcántara",
      linkText: t("contact.card.address.btn"),
    },
    {
      icon: <Phone className="w-6 h-6 text-brand" />,
      title: t("contact.card.phone"),
      details: ["952 78 52 06"],
      link: "tel:952785206",
      linkText: t("contact.card.phone.btn"),
    },
    {
      icon: <Mail className="w-6 h-6 text-brand" />,
      title: t("contact.card.email"),
      details: [
        "ventas@gardencenterlindavista.com",
      ],
      link: "mailto:ventas@gardencenterlindavista.com",
      linkText: t("contact.card.email.btn"),
    },
    {
      icon: <Clock className="w-6 h-6 text-brand" />,
      title: t("contact.card.hours"),
      details: [
        t("contact.card.hours.mon-fri"),
        t("contact.card.hours.sat"),
        t("contact.card.hours.sun"),
      ],
    },
  ];

  const titleText = language === "es"
    ? "Contacto y Horarios | Garden Center Linda Vista Marbella"
    : "Contact & Hours | Garden Center Linda Vista Marbella";

  React.useEffect(() => {
    document.title = titleText;
  }, [titleText]);

  const descText = language === "es"
    ? "Contacta con nosotros, solicita presupuesto de jardinería o consulta nuestros horarios. Estamos en Calle Araucaria 10, San Pedro Alcántara."
    : "Get in touch, request a gardening quote, or check our working hours. Located at Calle Araucaria 10, San Pedro Alcántara.";
  const pageUrl = "http://gardencenterlindavista.com/contacto";
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
          alt={t("contact.title").toUpperCase()}
          fill
          className="object-cover"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 flex flex-col gap-4 animate-slide-up">
          <span className="text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit backdrop-blur-xs">
            {t("contact.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            {t("contact.title")}
          </h1>
          <p className="text-zinc-200 text-lg max-w-xl font-light">
            {t("contact.header.desc")}
          </p>
        </div>
      </section>

      {/* 2. Main Contact Form & Details Grid */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Cards and hours details */}
            <div className="lg:col-span-6 flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-2">
                <span className="text-brand font-semibold text-sm uppercase tracking-wider">
                  {t("contact.info.badge")}
                </span>
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  {t("contact.info.title")}
                </h2>
                <p className="text-zinc-500 mt-2 leading-relaxed">
                  {t("contact.info.desc")}
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                {contactCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                      {card.icon}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-grow">
                      <h3 className="font-bold text-zinc-900 dark:text-white text-base">{card.title}</h3>
                      <div className="flex flex-col text-sm text-zinc-500 dark:text-zinc-400 gap-0.5 leading-6">
                        {card.details.map((detail, index) => (
                          <span key={index}>{detail}</span>
                        ))}
                      </div>
                    </div>
                    {card.link && (
                      <a
                        href={card.link}
                        target={card.link.startsWith("http") ? "_blank" : undefined}
                        rel={card.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-xs text-brand hover:text-brand-dark font-bold tracking-wide uppercase mt-1 border-t border-zinc-200/55 dark:border-zinc-800 pt-3"
                      >
                        {card.linkText}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form side */}
            <div className="lg:col-span-6 w-full">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Embedded Google Maps Iframe */}
      <section className="w-full h-[500px] relative bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-900">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1907.5323942711286!2d-4.99649123988893!3d36.479921369558205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd73298a5bf33e2b%3A0x7c93bac2ca9622c6!2sGarden%20Center%20Linda%20Vista%20S.L.!5e0!3m2!1ses!2ses!4v1621503010199!5m2!1ses!2ses"
          className="absolute inset-0 w-full h-full border-0 dark:invert-[0.9] dark:hue-rotate-180"
          allowFullScreen
          loading="lazy"
          title={language === "es" ? "Ubicación de Garden Center Linda Vista en Google Maps" : "Location of Garden Center Linda Vista on Google Maps"}
        />
      </section>
    </div>
  );
}
