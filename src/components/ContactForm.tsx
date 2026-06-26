"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactForm() {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Simple validations
    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage(t("form.val.name"));
      return;
    }
    if (!formData.email.trim()) {
      setStatus("error");
      setErrorMessage(t("form.val.email"));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage(t("form.val.email.invalid"));
      return;
    }
    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage(t("form.val.message"));
      return;
    }

    setStatus("loading");
    
    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || (language === "es" ? "Error al enviar el mensaje." : "Failed to send message."));
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(language === "es" ? "Error de conexión con el servidor." : "Server connection error.");
    }
  };

  return (
    <div className="w-full glassmorphism dark:bg-zinc-900/60 rounded-3xl p-6 sm:p-10 shadow-xl border border-zinc-100 dark:border-zinc-800">
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
        {t("form.title")}
      </h3>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center text-center py-8 gap-4 animate-fade-in">
          <CheckCircle2 className="w-16 h-16 text-brand" />
          <h4 className="text-xl font-bold text-zinc-900 dark:text-white">{t("form.success.title")}</h4>
          <p className="text-zinc-500 text-sm max-w-sm leading-6">
            {t("form.success.desc")}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-2.5 rounded-full transition-colors active:scale-95 text-sm"
          >
            {t("form.success.btn")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Status/Error alert */}
          {status === "error" && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm animate-slide-up">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-zinc-700 dark:text-zinc-300 font-semibold text-sm">
              {t("form.label.name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={language === "es" ? "Ej: Juan Pérez" : "e.g. John Doe"}
              disabled={status === "loading"}
              className="w-full bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-800 dark:text-zinc-200 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
            />
          </div>

          {/* Email input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-zinc-700 dark:text-zinc-300 font-semibold text-sm">
              {t("form.label.email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={language === "es" ? "Ej: juan.perez@example.com" : "e.g. john.doe@example.com"}
              disabled={status === "loading"}
              className="w-full bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-800 dark:text-zinc-200 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
            />
          </div>

          {/* Phone input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-zinc-700 dark:text-zinc-300 font-semibold text-sm">
              {t("form.label.phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={language === "es" ? "Ej: 952 78 52 06" : "e.g. +34 952 78 52 06"}
              disabled={status === "loading"}
              className="w-full bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-800 dark:text-zinc-200 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
            />
          </div>

          {/* Message input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-zinc-700 dark:text-zinc-300 font-semibold text-sm">
              {t("form.label.message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={t("form.placeholder.message")}
              disabled={status === "loading"}
              className="w-full bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-800 dark:text-zinc-200 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                {t("form.btn.sending")}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t("form.btn.send")}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
