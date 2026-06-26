"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  UploadCloud, 
  Trash2, 
  Video, 
  Image as ImageIcon, 
  Loader2, 
  Plus, 
  Check, 
  AlertTriangle 
} from "lucide-react";

interface GalleryItem {
  src: string;
  type: string;
  key: string;
  altEs?: string;
  altEn?: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altEs, setAltEs] = useState("");
  const [altEn, setAltEn] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch current gallery items
  const fetchItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else {
        throw new Error("Error al obtener la lista de galería");
      }
    } catch (err: any) {
      console.error(err);
      setError("No se pudo cargar la galería.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check size (max 50MB for video, 10MB for image)
    const isVideo = selectedFile.type.startsWith("video/");
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    
    if (selectedFile.size > maxSize) {
      setError(
        isVideo 
          ? "El vídeo excede el límite de 50MB." 
          : "La imagen excede el límite de 10MB."
      );
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
    setSuccess(null);

    // Create preview
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  // Handle file upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    const savedPassword = localStorage.getItem("gclv_admin_pass") || "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("altEs", altEs);
    formData.append("altEn", altEn);

    try {
      const res = await fetch("/api/admin/gallery/upload", {
        method: "POST",
        headers: {
          "x-admin-password": savedPassword
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Archivo subido con éxito y agregado a la galería.");
        setFile(null);
        setPreviewUrl(null);
        setAltEs("");
        setAltEn("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        
        // Refresh items list
        fetchItems();
      } else {
        setError(data.error || "Ocurrió un error al subir el archivo.");
      }
    } catch (err) {
      setError("Error de red al intentar subir el archivo.");
    } finally {
      setUploading(false);
    }
  };

  // Handle item deletion
  const handleDelete = async (src: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este elemento de la galería de forma permanente?"
    );
    if (!confirmDelete) return;

    const savedPassword = localStorage.getItem("gclv_admin_pass") || "";

    try {
      const res = await fetch("/api/admin/gallery/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": savedPassword
        },
        body: JSON.stringify({ src })
      });

      if (res.ok) {
        setSuccess("Elemento eliminado correctamente.");
        // Refresh items list
        fetchItems();
      } else {
        const data = await res.json();
        setError(data.error || "No se pudo eliminar el elemento.");
      }
    } catch (err) {
      setError("Error de red al intentar eliminar.");
    }
  };

  return (
    <div className="flex flex-col gap-10 mb-16 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Gestión de Galería Multimedia
        </h1>
        <p className="text-zinc-500 mt-2 text-sm font-light">
          Añade o elimina fotos y vídeos expuestos en la galería del vivero. El contenido se almacena directamente en el servidor.
        </p>
      </div>

      {/* Upload and list section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Side: Upload panel */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Subir nuevo recurso
            </h2>

            <form onSubmit={handleUpload} className="flex flex-col gap-5">
              {/* File Dropzone / Select */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-brand rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/30 flex flex-col items-center justify-center gap-3 relative min-h-[160px] overflow-hidden"
              >
                {previewUrl ? (
                  file?.type.startsWith("video/") ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Video className="w-10 h-10 text-emerald-500 animate-pulse" />
                      <span className="text-xs text-zinc-500 font-medium truncate max-w-[200px]">
                        {file.name}
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-full h-28 rounded-lg overflow-hidden">
                      <Image 
                        src={previewUrl} 
                        alt="Preview" 
                        fill 
                        className="object-contain"
                      />
                    </div>
                  )
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 text-zinc-400 group-hover:text-brand" />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-zinc-850 dark:text-zinc-200">
                        Selecciona un archivo
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        Imágenes (JPG, PNG, WEBP) o Vídeos (MP4)
                      </span>
                    </div>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  accept="image/*,video/mp4" 
                  className="hidden" 
                />
              </div>

              {/* Input for Spanish Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Descripción (ES)
                </label>
                <input 
                  type="text" 
                  value={altEs}
                  onChange={(e) => setAltEs(e.target.value)}
                  placeholder="Ej: Zona de macetas de barro cocido"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-zinc-800 dark:text-zinc-200"
                />
              </div>

              {/* Input for English Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Description (EN)
                </label>
                <input 
                  type="text" 
                  value={altEn}
                  onChange={(e) => setAltEn(e.target.value)}
                  placeholder="Ej: Terracotta flowerpots section"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-zinc-800 dark:text-zinc-200"
                />
              </div>

              {/* Feedback messages */}
              {error && (
                <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-500 text-xs p-3.5 rounded-xl border border-rose-200/50 dark:border-rose-900/50 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 text-xs p-3.5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/50 flex items-start gap-2">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              {/* Submit button */}
              <button 
                type="submit"
                disabled={!file || uploading}
                className="w-full bg-brand hover:bg-brand-dark disabled:bg-zinc-150 disabled:dark:bg-zinc-900 disabled:text-zinc-400 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs animate-all duration-300"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Subiendo archivo...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Añadir a la Galería</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Media list & grid */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Elementos expuestos ({items.length})
              </h2>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-zinc-400">
                <Loader2 className="w-8 h-8 animate-spin text-brand" />
                <span className="text-xs">Cargando elementos de la galería...</span>
              </div>
            ) : items.length === 0 ? (
              <div className="py-20 text-center text-zinc-400 text-xs font-light">
                No hay elementos en la galería. Usa el formulario para subir fotos o vídeos.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div 
                    key={item.src} 
                    className="relative aspect-[3/2] w-full rounded-xl overflow-hidden border border-zinc-150 dark:border-zinc-900 group bg-zinc-900 shadow-xs"
                  >
                    {item.type === "video" ? (
                      <div className="relative w-full h-full">
                        <video 
                          src={item.src} 
                          className="w-full h-full object-cover opacity-80" 
                          muted 
                          playsInline 
                          preload="metadata"
                        />
                        <div className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur-md p-1 rounded-md border border-zinc-800">
                          <Video className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                      </div>
                    ) : (
                      <Image 
                        src={item.src} 
                        alt="Gallery item" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    )}

                    {/* Delete button (displays on hover) */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <button
                        onClick={() => handleDelete(item.src)}
                        className="bg-rose-500 hover:bg-rose-600 text-white p-2.5 rounded-full transition-all shadow-md hover:scale-110 cursor-pointer"
                        title="Eliminar elemento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
