"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/sobre-nosotros" },
    { name: t("nav.plants"), href: "/plantas" },
    { name: t("nav.gallery"), href: "/galeria" },
    { name: t("nav.contact"), href: "/contacto" },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-400 text-sm mt-auto border-t border-zinc-900 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Brand & Logo */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="inline-block relative h-12 w-40">
            <Image
              src="/logo-garden.png"
              alt="Garden Center Linda Vista Logo"
              fill
              className="object-contain filter brightness-0 invert"
            />
          </Link>
          <p className="text-zinc-550 dark:text-zinc-500 leading-6 font-light">
            {t("footer.desc")}
          </p>
          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://es-es.facebook.com/GardenCenterLindaVista/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 hover:bg-brand text-zinc-300 hover:text-white p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/GardenCenterLindaVista/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 hover:bg-brand text-zinc-300 hover:text-white p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.796.056 1.03.047 1.8.213 2.279.397.496.188.91.446 1.275.81.365.364.623.778.81 1.275.184.477.35.1.397 1.279.047 1.01.056 1.366.056 3.796v3.796c0 2.43-.01 2.784-.056 3.796-.047 1.03-.213 1.8-.397 2.279-.188.496-.446.91-.81 1.275-.364.365-.778.623-1.275.81-.477.184-1.279.35-2.279.397-1.01.047-1.366.056-3.796.056H11.686c-2.43 0-2.784-.01-3.796-.056-1.03-.047-1.8-.213-2.279-.397-.496-.188-.91-.446-1.275-.81-.365-.364-.623-.778-.81-1.275-.184-.477-.35-1.279-.397-2.279C2.01 14.347 2 13.99 2 11.562V7.766c0-2.43.01-2.784.056-3.796.047-1.03.213-1.8.397-2.279.188-.496.446-.91.81-1.275.364-.365.778-.623 1.275-.81.477-.184 1.279-.35 2.279-.397 1.01-.047 1.366-.056 3.796-.056h.63zm-.315 2.428H11.686c-2.43 0-2.784.01-3.796.056-.934.043-1.634.207-2.025.358-.39.15-.62.33-.86.57-.24.24-.42.47-.57.86-.15.39-.315 1.09-.358 2.025-.047 1.01-.056 1.366-.056 3.796v3.796c0 2.43.01 2.784.056 3.796.043.934.207 1.634.358 2.025.15.39.33.62.57.86.24.24.47.42.86.57.39.15 1.09.315 2.025.358 1.01.047 1.366.056 3.796.056h3.796c2.43 0 2.784-.01 3.796-.056.934-.043 1.634-.207 2.025-.358.39-.15.62-.33.86-.57.24-.24.42-.47.57-.86.15-.39.315-1.09.358-2.025.047-1.01.056-1.366.056-3.796v-3.796c0-2.43-.01-2.784-.056-3.796-.043-.934-.207-1.634-.358-2.025-.15-.39-.33-.62-.57-.86-.24-.24-.47-.42-.86-.57-.39-.15-1.09-.315-2.025-.358-1.01-.047-1.366-.056-3.796-.056h-.63zm0 4.144c-2.754 0-5 2.246-5 5s2.246 5 5 5 5-2.246 5-5-2.246-5-5-5zm0 7.572c-1.42 0-2.572-1.152-2.572-2.572 0-1.42 1.152-2.572 2.572-2.572 1.42 0 2.572 1.152 2.572 2.572 0 1.42-1.152 2.572-2.572 2.572zm5.278-8.835a1.002 1.002 0 11-2.004 0 1.002 1.002 0 012.004 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white font-bold text-base tracking-wide relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-brand">
            {t("footer.title.links")}
          </h3>
          <ul className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-brand transition-colors flex items-center before:content-['•'] before:text-brand before:mr-2"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white font-bold text-base tracking-wide relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-brand">
            {t("footer.title.contact")}
          </h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <span className="leading-6">
                Calle Araucaria 10,<br />
                29670 San Pedro Alcántara,<br />
                Marbella, Málaga, España
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand shrink-0" />
              <a href="tel:952785206" className="hover:text-brand transition-colors font-medium">
                952 78 52 06
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <a href="mailto:ventas@gardencenterlindavista.com" className="hover:text-brand transition-colors break-all">
                  ventas@gardencenterlindavista.com
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4: Opening Timetable */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white font-bold text-base tracking-wide relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-brand">
            {t("footer.title.hours")}
          </h3>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-white">{t("days.mon-fri")}</span>
                <span className="text-zinc-550">08:30 - 14:00 / 16:00 - 20:00</span>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-white">{t("days.sat")}</span>
                <span className="text-zinc-550">10:00 - 14:00</span>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-white">{t("days.sun")}</span>
                <span className="text-zinc-550">{t("status.closed")}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-zinc-950 border-t border-zinc-900/60 py-6 text-center text-zinc-650 text-xs font-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <p>© {new Date().getFullYear()} Garden Center Linda Vista S.L. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
