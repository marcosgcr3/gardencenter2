"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Plus,
  Trash2,
  Sparkles,
  Sun,
  Droplet,
  Eye,
  Settings2,
  Copy,
  Check,
  AlertCircle
} from "lucide-react";

export default function NuevaPlantaPage() {
  const router = useRouter();

  // Form State
  const [name, setName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [category, setCategory] = useState("Interior");
  const [difficulty, setDifficulty] = useState("Bajo");
  const [description, setDescription] = useState("");
  const [light, setLight] = useState("Luz indirecta brillante");
  const [temp, setTemp] = useState("15°C - 25°C");
  const [humidity, setHumidity] = useState("Media");
  
  // Watering
  const [waterGeneral, setWaterGeneral] = useState("Moderado");
  const [waterSummer, setWaterSummer] = useState("");
  const [waterWinter, setWaterWinter] = useState("");

  // Care and diseases
  const [care, setCare] = useState("");
  const [diseases, setDiseases] = useState("");
  
  // Image URL & Placeholders
  const [imageUrl, setImageUrl] = useState("");
  const placeholders = [
    { name: "Interior (Elegante)", url: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&auto=format&fit=crop" },
    { name: "Monstera / Hojas grandes", url: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=600&auto=format&fit=crop" },
    { name: "Árbol / Palmera", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop" },
    { name: "Olivo / Hojas grises", url: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=600&auto=format&fit=crop" },
    { name: "Suculenta / Cactus", url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop" }
  ];

  // Characteristics list
  const [charInput, setCharInput] = useState("");
  const [characteristics, setCharacteristics] = useState<string[]>([
    "Fácil mantenimiento en interiores.",
    "Ayuda a purificar el aire de la estancia."
  ]);

  const addCharacteristic = () => {
    if (charInput.trim()) {
      setCharacteristics([...characteristics, charInput.trim()]);
      setCharInput("");
    }
  };

  const removeCharacteristic = (index: number) => {
    setCharacteristics(characteristics.filter((_, i) => i !== index));
  };

  // Submission & Modal States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showFallbackModal, setShowFallbackModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate copyable code for fallback modal
  const generateTypeScriptCode = (slug: string) => {
    return `  {
    slug: "${slug}",
    name: "${name}",
    scientificName: "${scientificName}",
    category: "${category}",
    description: "${description}",
    characteristics: [
      ${characteristics.map(c => `"${c}"`).join(",\n      ")}
    ],
    care: "${care}",
    diseases: "${diseases}",
    watering: {
      summer: "${waterSummer || "Riego regular"}",
      winter: "${waterWinter || "Riego reducido"}",
      general: "${waterGeneral}"
    },
    light: "${light}",
    difficulty: "${difficulty}",
    imageUrl: "${imageUrl || placeholders[0].url}",
    temperature: "${temp}",
    humidity: "${humidity}"
  }`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const plantPayload = {
      name,
      scientificName,
      category,
      difficulty,
      description,
      light,
      temperature: temp,
      humidity,
      watering: {
        general: waterGeneral,
        summer: waterSummer || "Riego regular según calor",
        winter: waterWinter || "Riego reducido al mínimo"
      },
      care,
      diseases,
      imageUrl: imageUrl || placeholders[0].url,
      characteristics
    };

    const adminPass = typeof window !== "undefined" ? localStorage.getItem("gclv_admin_pass") || "" : "";
    try {
      const response = await fetch("/api/plants", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminPass}`
        },
        body: JSON.stringify(plantPayload)
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir en caso de éxito a la página del catálogo
        router.push("/plantas");
      } else {
        console.warn("API write failed, preparing fallback code:", data.error);
        const tempSlug = name
          .toLowerCase()
          .trim()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_]+/g, "-");
        
        const existingLocal = localStorage.getItem("local_plants") || "[]";
        const localPlants = JSON.parse(existingLocal);
        localPlants.push({ ...plantPayload, slug: tempSlug });
        localStorage.setItem("local_plants", JSON.stringify(localPlants));

        setGeneratedCode(generateTypeScriptCode(tempSlug));
        setShowFallbackModal(true);
      }
    } catch (err: any) {
      setErrorMsg("Error en la conexión. Guardando copia temporal...");
      const tempSlug = "planta-nueva";
      setGeneratedCode(generateTypeScriptCode(tempSlug));
      setShowFallbackModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Bajo": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200/50";
      case "Medio": return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200/50";
      case "Alto": return "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200/50";
      default: return "bg-zinc-50 text-zinc-700";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 animate-fade-in">
      
      {/* Left Column: Form (8 cols on lg) */}
      <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-900 pb-5">
          <span className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
            <Settings2 className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">Nueva Plantilla de Planta</h1>
            <p className="text-zinc-500 text-xs sm:text-sm font-light mt-0.5">Introduce las características y cuidados personalizados.</p>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 p-4 rounded-xl border border-rose-100/50 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Section 1: Identity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Nombre Común</label>
            <input
              type="text"
              required
              placeholder="Ej. Bananera Enana"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Nombre Científico</label>
            <input
              type="text"
              required
              placeholder="Ej. Musa acuminata"
              value={scientificName}
              onChange={(e) => setScientificName(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            >
              <option value="Interior">Interior</option>
              <option value="Exterior">Exterior</option>
              <option value="Suculentas">Suculentas</option>
              <option value="Árboles">Árboles y Arbustos</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Dificultad de Cuidado</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            >
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Breve Descripción</label>
          <textarea
            required
            rows={3}
            placeholder="Introduce un breve párrafo introductorio de la planta..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
          />
        </div>

        <div className="h-px bg-zinc-100 dark:bg-zinc-900" />

        {/* Section 2: Care metrics */}
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Parámetros de Cuidado</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Iluminación</label>
            <input
              type="text"
              required
              placeholder="Ej. Sol directo o luz brillante"
              value={light}
              onChange={(e) => setLight(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Temperatura</label>
            <input
              type="text"
              required
              placeholder="Ej. 15°C - 30°C"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Humedad</label>
            <input
              type="text"
              required
              placeholder="Ej. Alta (rociar a diario)"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
          </div>
        </div>

        {/* Section 3: Watering Plan */}
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Plan de Riego</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Riego General</label>
            <input
              type="text"
              required
              placeholder="Ej. Moderado a alto"
              value={waterGeneral}
              onChange={(e) => setWaterGeneral(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Primavera - Verano</label>
            <input
              type="text"
              required
              placeholder="Ej. Cada 3-4 días"
              value={waterSummer}
              onChange={(e) => setWaterSummer(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Otoño - Invierno</label>
            <input
              type="text"
              required
              placeholder="Ej. Cada 10-12 días"
              value={waterWinter}
              onChange={(e) => setWaterWinter(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
          </div>
        </div>

        <div className="h-px bg-zinc-100 dark:bg-zinc-900" />

        {/* Section 4: Care details and diseases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Cuidados Recomendados</label>
            <textarea
              required
              rows={3}
              placeholder="Ej. Evita corrientes de aire y rocía agua sobre sus hojas..."
              value={care}
              onChange={(e) => setCare(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Enfermedades y Plagas</label>
            <textarea
              required
              rows={3}
              placeholder="Ej. Sensible a la araña roja en ambientes secos..."
              value={diseases}
              onChange={(e) => setDiseases(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
          </div>
        </div>

        <div className="h-px bg-zinc-100 dark:bg-zinc-900" />

        {/* Section 5: Image Setup */}
        <div className="flex flex-col gap-4">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Imagen de la Planta (URL)</label>
          <input
            type="url"
            placeholder="Introduce la URL de una foto..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
          />
          
          <div className="flex flex-col gap-2">
            <span className="text-xs text-zinc-400">O elige uno de nuestros marcadores predefinidos:</span>
            <div className="flex flex-wrap gap-2">
              {placeholders.map((place, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(place.url)}
                  className={`px-3 py-1.5 rounded-lg text-xxs font-semibold border transition-all duration-300 ${
                    imageUrl === place.url
                      ? "bg-brand/10 border-brand text-brand"
                      : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  {place.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-100 dark:bg-zinc-900" />

        {/* Section 6: Characteristics list editor */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Rasgos / Características de la Ficha</label>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Añade un rasgo (ej. Hojas de color verde intenso)"
              value={charInput}
              onChange={(e) => setCharInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCharacteristic(); } }}
              className="flex-grow px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-200"
            />
            <button
              type="button"
              onClick={addCharacteristic}
              className="bg-brand hover:bg-brand-dark text-white p-3 rounded-xl transition-colors shrink-0"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <ul className="flex flex-col gap-2 mt-2">
            {characteristics.map((char, index) => (
              <li key={index} className="flex justify-between items-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-100 dark:border-zinc-900/50 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <span className="truncate">{char}</span>
                <button
                  type="button"
                  onClick={() => removeCharacteristic(index)}
                  className="text-zinc-400 hover:text-rose-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Action button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 bg-brand hover:bg-brand-dark text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-md shadow-brand/10 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? "Guardando..." : "Crear Nueva Planta"}
        </button>
      </form>

      {/* Right Column: Live Preview (4 cols on lg) */}
      <aside className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-zinc-500 font-semibold text-sm">
          <Eye className="w-4 h-4" />
          <span>Vista Previa de Tarjeta</span>
        </div>

        {/* Plant Card Live Preview */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl overflow-hidden shadow-md flex flex-col w-full">
          <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <img
              src={imageUrl || placeholders[0].url}
              alt={name || "Previsualización"}
              className="object-cover w-full h-full"
            />
            {/* Overlay Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 items-start">
              <span className="bg-white/95 dark:bg-zinc-950/95 text-zinc-800 dark:text-zinc-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm border border-zinc-200/20 w-fit">
                {category}
              </span>
              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm w-fit ${getDifficultyColor(difficulty)}`}>
                Dificultad: {difficulty}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-4">
            <div>
              <span className="italic text-brand text-xs font-semibold uppercase tracking-wider block truncate">
                {scientificName || "Nombre científico"}
              </span>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-1 truncate">
                {name || "Nombre común"}
              </h2>
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-light">
              {description || "Escribe una descripción para ver cómo se encuadra en la tarjeta."}
            </p>

            <div className="h-px bg-zinc-100 dark:bg-zinc-900/60" />

            <div className="grid grid-cols-2 gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 py-1">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-brand shrink-0" />
                <span className="truncate">{light || "Iluminación"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-brand shrink-0" />
                <span className="truncate">{waterGeneral || "Riego"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/40 dark:bg-zinc-900/20 border border-dashed border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 flex items-start gap-3 text-xs leading-relaxed text-zinc-500 font-light">
          <Sparkles className="w-4 h-4 text-brand shrink-0 mt-0.5" />
          <div>
            Los datos se formatean automáticamente según el estándar de TypeScript para garantizar la compatibilidad del motor SSG y el enrutamiento dinámico.
          </div>
        </div>
      </aside>

      {/* Fallback Copy/Paste Modal */}
      {showFallbackModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl flex flex-col gap-6 animate-slide-up">
            <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-900 pb-4">
              <span className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Persistencia Manual (Servidor Remoto)</h3>
                <p className="text-zinc-500 text-xs mt-0.5">El archivo local es de solo lectura en este entorno de producción.</p>
              </div>
            </div>

            <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed font-light">
              ¡La planta se ha guardado en la memoria de este navegador y aparecerá en tu catálogo mientras sigas en esta sesión! Para guardarla permanentemente en el código de tu repositorio, copia el siguiente fragmento de código y pégalo dentro de la lista de plantas del archivo <code className="font-mono bg-zinc-100 dark:bg-zinc-900 text-xs px-1.5 py-0.5 rounded text-brand">src/data/plants.ts</code>:
            </p>

            <div className="relative bg-zinc-900 dark:bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 max-h-60 overflow-y-auto text-zinc-300 font-mono text-xs leading-relaxed select-all">
              <button
                type="button"
                onClick={handleCopyCode}
                className="absolute top-3 right-3 bg-zinc-800/80 hover:bg-zinc-700 hover:scale-103 text-white p-2 rounded-lg transition-all"
                title="Copiar código"
              >
                {copied ? <Check className="w-4 h-4 text-brand" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre className="whitespace-pre">{generatedCode}</pre>
            </div>

            <button
              onClick={() => {
                setShowFallbackModal(false);
                router.push("/admin");
              }}
              className="w-full bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold py-3.5 rounded-2xl transition-all duration-300 cursor-pointer text-center"
            >
              Entendido y Volver al Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
