"use client";

import React from "react";
import Link from "next/link";
import { Plus, Printer, ShieldCheck, Sprout, Images } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in mb-16">
      {/* Welcome Card */}
      <div className="relative border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 rounded-3xl p-8 sm:p-10 overflow-hidden shadow-sm flex flex-col gap-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
        
        <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand/10 text-brand px-3.5 py-1.5 rounded-full w-fit flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Sesión de Administrador Activa
        </span>
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Panel de Control - Garden Center Linda Vista
        </h1>
        
        <p className="text-zinc-650 dark:text-zinc-400 max-w-2xl leading-relaxed text-sm font-light">
          Bienvenido al centro de gestión interna. Desde aquí puedes dar de alta nuevas variedades de plantas y árboles en la base de datos, gestionar los recursos de la galería multimedia o generar e imprimir las etiquetas QR correspondientes para el vivero físico.
        </p>
      </div>

      {/* Admin Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Add plant */}
        <Link href="/admin/nueva-planta" className="group">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-6 h-full hover:-translate-y-1.5">
            <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Plus className="w-7 h-7" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-brand transition-colors duration-300 flex items-center gap-2">
                Añadir Planta
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">
                Introduce los nombres, parámetros de riego, necesidades de luz, cuidados recomendados e imágenes de una nueva planta para guardarla en el catálogo.
              </p>
            </div>
          </div>
        </Link>

        {/* Card 2: Manage Gallery */}
        <Link href="/admin/galeria" className="group">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-6 h-full hover:-translate-y-1.5">
            <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Images className="w-7 h-7" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-brand transition-colors duration-300 flex items-center gap-2">
                Gestionar Galería
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">
                Sube nuevas fotos o vídeos en alta definición directamente desde tu ordenador para mostrarlas en la galería pública o elimina recursos antiguos.
              </p>
            </div>
          </div>
        </Link>

        {/* Card 3: Print QR */}
        <Link href="/admin/imprimir-qr" className="group">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-6 h-full hover:-translate-y-1.5">
            <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Printer className="w-7 h-7" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-brand transition-colors duration-300 flex items-center gap-2">
                Imprimir Etiquetas QR
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">
                Genera la plantilla completa de códigos QR para colgar en las macetas físicas. Permite que los clientes escaneen los códigos en el vivero para ver las guías de cuidado.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Info Banner */}
      <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/40 rounded-3xl p-6 flex items-start gap-4 text-xs sm:text-sm text-zinc-500 font-light">
        <Sprout className="w-5 h-5 text-brand shrink-0 mt-0.5" />
        <div>
          Recuerda cerrar la sesión si accedes desde un ordenador público o compartido en las oficinas del vivero para evitar modificaciones no autorizadas en el catálogo de plantas.
        </div>
      </div>
    </div>
  );
}
