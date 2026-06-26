"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/sobre-nosotros" },
    { name: t("nav.plants"), href: "/plantas" },
    { name: t("nav.gallery"), href: "/galeria" },
    { name: t("nav.contactBtn"), href: "/contacto" },
  ];

  // Determine navbar appearance state
  // Transparent only on Homepage when scrolled is false
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out print:hidden ${
          isTransparent
            ? "bg-transparent border-b border-white/10 py-5"
            : "bg-white/90 dark:bg-zinc-950/90 shadow-md backdrop-blur-md py-3.5 border-b border-zinc-200/40 dark:border-zinc-800/40"
        }`}
      >
        {/* Top Banner Contact bar (Only show when NOT transparent on other pages/scrolled, or just hidden on homepage for pure clean aesthetic) */}
        {!isHome && (
          <div className="bg-zinc-900 text-zinc-400 text-xxs sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/60 md:block hidden -mt-3.5 mb-3.5 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5 hover:text-brand-light transition-colors">
                  <Phone className="w-3 h-3 text-brand-light" />
                  <a href="tel:952785206" className="font-light">952 78 52 06</a>
                </span>
                <span className="flex items-center gap-1.5 hover:text-brand-light transition-colors">
                  <Mail className="w-3 h-3 text-brand-light" />
                  <a href="mailto:ventas@gardencenterlindavista.com" className="font-light">ventas@gardencenterlindavista.com</a>
                </span>
                <span className="flex items-center gap-1.5 hover:text-brand-light transition-colors">
                  <MapPin className="w-3 h-3 text-brand-light" />
                  <a
                    href="https://maps.google.com/?q=Calle+Araucaria+10,+San+Pedro+Alcántara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-light"
                  >
                    Calle Araucaria 10, San Pedro Alcántara
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-450 font-light">
                <Clock className="w-3 h-3 text-brand-light" />
                <span>{t("contact.banner")}</span>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className={`relative h-10 w-32 sm:h-12 sm:w-40 transition-all duration-500 group-hover:scale-[1.02] ${
                isTransparent ? "brightness-0 invert animate-fade-in" : "animate-fade-in"
              }`}
            >
              <Image
                src="/logo-garden.png"
                alt="Garden Center Linda Vista Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <nav className="flex gap-6 lg:gap-8 items-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                // Special styling for the Contact item in menu
                const isContact = link.href === "/contacto";
                
                if (isContact) {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative font-medium text-sm px-5 py-2 rounded-full transition-all duration-300 active:scale-95 whitespace-nowrap ${
                        isTransparent
                          ? "bg-white text-zinc-950 hover:bg-white/90 shadow-sm"
                          : "bg-brand hover:bg-brand-dark text-white shadow-md hover:shadow-brand/10"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-medium tracking-wide transition-colors py-1.5 ${
                      isTransparent
                        ? isActive
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                        : isActive
                        ? "text-brand"
                        : "text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-brand"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavLine"
                        className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${
                          isTransparent ? "bg-white" : "bg-brand"
                        }`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Language Selector Desktop */}
            <div
              className={`flex items-center border rounded-full p-0.5 text-xs font-bold shadow-xs shrink-0 transition-all duration-500 ${
                isTransparent
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-zinc-100 border-zinc-200/50 dark:bg-zinc-900 dark:border-zinc-800/60"
              }`}
            >
              <button
                onClick={() => setLanguage("es")}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  language === "es"
                    ? isTransparent
                      ? "bg-white text-zinc-950 shadow-xs"
                      : "bg-white dark:bg-zinc-800 text-brand shadow-xs"
                    : isTransparent
                    ? "text-white/70 hover:text-white"
                    : "text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-250"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  language === "en"
                    ? isTransparent
                      ? "bg-white text-zinc-950 shadow-xs"
                      : "bg-white dark:bg-zinc-800 text-brand shadow-xs"
                    : isTransparent
                    ? "text-white/70 hover:text-white"
                    : "text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-250"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Actions (Language Selector & Hamburger Toggle) */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Language Selector */}
            <div
              className={`flex items-center border rounded-full p-0.5 text-xxs font-bold transition-all duration-500 ${
                isTransparent
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-zinc-100 border-zinc-200/50 dark:bg-zinc-900 dark:border-zinc-800/60"
              }`}
            >
              <button
                onClick={() => setLanguage("es")}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  language === "es"
                    ? isTransparent
                      ? "bg-white text-zinc-950 shadow-xs"
                      : "bg-white dark:bg-zinc-800 text-brand shadow-xs"
                    : isTransparent
                    ? "text-white/70"
                    : "text-zinc-500"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  language === "en"
                    ? isTransparent
                      ? "bg-white text-zinc-950 shadow-xs"
                      : "bg-white dark:bg-zinc-800 text-brand shadow-xs"
                    : isTransparent
                    ? "text-white/70"
                    : "text-zinc-500"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors duration-300 rounded-lg ${
                isTransparent
                  ? "text-white hover:text-white/80 hover:bg-white/10"
                  : "text-zinc-700 hover:text-brand dark:text-zinc-300 dark:hover:text-brand hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden fixed inset-x-0 top-[68px] bg-white/95 dark:bg-zinc-950/95 shadow-xl border-t border-zinc-100 dark:border-zinc-800/80 py-6 px-6 flex flex-col gap-4.5 backdrop-blur-lg z-50"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isContact = link.href === "/contacto";
                
                if (isContact) {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="bg-brand hover:bg-brand-dark text-white font-semibold text-center py-3 rounded-xl transition-colors mt-2 shadow-md"
                    >
                      {link.name}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-semibold transition-colors py-2.5 px-3.5 rounded-xl ${
                      isActive
                        ? "text-brand bg-brand/5 dark:bg-brand/10 font-bold"
                        : "text-zinc-700 hover:text-brand dark:text-zinc-300 dark:hover:text-brand hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to push content down only on non-home pages */}
      {!isHome && (
        <div className="h-[68px] sm:h-[76px] md:h-[110px]" />
      )}
    </>
  );
}
