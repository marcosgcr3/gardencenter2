"use client";

import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // Comprobar la sesión en el cliente
    const authStatus = localStorage.getItem("gclv_admin_auth");
    const savedPassword = localStorage.getItem("gclv_admin_pass");
    
    if (authStatus === "true" && savedPassword) {
      // Verificar la contraseña de forma asíncrona con el servidor para máxima seguridad
      fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: savedPassword })
      })
        .then((res) => {
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem("gclv_admin_auth");
            localStorage.removeItem("gclv_admin_pass");
          }
        })
        .catch(() => {
          // Si hay un error de red y ya estaba autenticado localmente, permitimos ver de forma temporal
          setIsAuthenticated(true);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        localStorage.setItem("gclv_admin_auth", "true");
        localStorage.setItem("gclv_admin_pass", password);
        setIsAuthenticated(true);
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => setShake(false), 500); // Duración de la animación de sacudida
      }
    } catch (err) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  // Cargando estado inicial
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-brand animate-spin" />
          <span className="text-zinc-500 text-sm font-medium">Verificando credenciales...</span>
        </div>
      </div>
    );
  }

  // Si está autenticado, renderizar el contenido protegido
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Pantalla de Login de administración
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-zinc-50/50 dark:bg-zinc-950/20">
      <div
        className={`w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-3xl p-8 sm:p-10 shadow-xl transition-all duration-300 ${
          shake ? "animate-shake" : ""
        }`}
      >
        {/* Encabezado */}
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Acceso Restringido
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-light mt-1.5 leading-relaxed">
              Introduce la contraseña de administración para gestionar el catálogo y las etiquetas QR.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-zinc-800 dark:text-zinc-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-450 hover:text-zinc-750 dark:text-zinc-500 dark:hover:text-zinc-350 transition-colors p-1"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 p-4 rounded-2xl border border-rose-100/50 flex items-center gap-3 text-xs sm:text-sm animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Contraseña incorrecta. Por favor, inténtalo de nuevo.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3.5 rounded-2xl transition-all duration-300 shadow-md shadow-brand/10 hover:shadow-lg active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verificando...</span>
              </>
            ) : (
              <span>Entrar al Panel</span>
            )}
          </button>
        </form>
      </div>

      {/* Estilos locales para animación de sacudida */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
