"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, LogOut, Plus, Printer, LayoutDashboard, Images } from "lucide-react";
import AdminGuard from "@/components/AdminGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("gclv_admin_auth");
    localStorage.removeItem("gclv_admin_pass");
    window.location.reload();
  };

  const navTabs = [
    { name: "Inicio Panel", href: "/admin", icon: LayoutDashboard },
    { name: "Añadir Planta", href: "/admin/nueva-planta", icon: Plus },
    { name: "Imprimir QR", href: "/admin/imprimir-qr", icon: Printer },
    { name: "Gestionar Galería", href: "/admin/galeria", icon: Images },
  ];

  return (
    <AdminGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 min-h-screen">
        {/* Top Header Navigation */}
        <div className="mb-8 flex justify-between items-center gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-5">
          <Link
            href="/plantas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-650 hover:text-brand dark:text-zinc-400 dark:hover:text-brand transition-colors bg-white dark:bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-150 dark:border-zinc-900 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al Catálogo
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-350 transition-colors bg-white dark:bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-150 dark:border-zinc-900 shadow-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>

        {/* Tab Navigation Segmented Control */}
        <div className="flex bg-zinc-100 dark:bg-zinc-900/60 p-1 rounded-2xl w-fit mb-8 gap-1 border border-zinc-200/30 dark:border-zinc-800/40">
          {navTabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-white dark:bg-zinc-800 text-brand shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Admin Content */}
        <main className="w-full">{children}</main>
      </div>
    </AdminGuard>
  );
}
