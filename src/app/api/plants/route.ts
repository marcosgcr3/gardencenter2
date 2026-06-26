import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get("Authorization");
    const EXPECTED_PASSWORD = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "lindavista2026";
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No autorizado. Acceso denegado." },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    if (token !== EXPECTED_PASSWORD) {
      return NextResponse.json(
        { error: "No autorizado. Contraseña incorrecta." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validar campos obligatorios
    if (
      !body.name ||
      !body.scientificName ||
      !body.category ||
      !body.description ||
      !body.care ||
      !body.diseases ||
      !body.watering ||
      !body.watering.summer ||
      !body.watering.winter ||
      !body.watering.general ||
      !body.light ||
      !body.difficulty
    ) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios en el formulario" },
        { status: 400 }
      );
    }

    // Generar slug a partir del nombre
    const slug = body.name
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
      .replace(/[^\w\s-]/g, "") // Eliminar caracteres especiales
      .replace(/[\s_]+/g, "-") // Reemplazar espacios por guiones
      .replace(/^-+|-+$/g, ""); // Eliminar guiones al inicio/fin

    const newPlant = {
      slug,
      name: body.name,
      scientificName: body.scientificName,
      category: body.category,
      description: body.description,
      characteristics: body.characteristics || [],
      care: body.care,
      diseases: body.diseases,
      watering: {
        summer: body.watering.summer,
        winter: body.watering.winter,
        general: body.watering.general,
      },
      light: body.light,
      difficulty: body.difficulty,
      imageUrl: body.imageUrl || "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&auto=format&fit=crop",
      temperature: body.temperature || "15°C - 25°C",
      humidity: body.humidity || "Media",
    };

    // Ruta física de plants.ts
    const filePath = path.join(process.cwd(), "src", "data", "plants.ts");

    // Leer el archivo existente
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Buscar el final del array "plants" (el último ];)
    const lastIndex = fileContent.lastIndexOf("];");
    if (lastIndex === -1) {
      return NextResponse.json(
        { error: "No se pudo encontrar la estructura del catálogo en plants.ts" },
        { status: 500 }
      );
    }

    // Formatear el nuevo objeto para insertarlo
    const newPlantString = `,\n  {\n    slug: "${newPlant.slug}",\n    name: "${newPlant.name}",\n    scientificName: "${newPlant.scientificName}",\n    category: "${newPlant.category}",\n    description: "${newPlant.description}",\n    characteristics: [\n      ${newPlant.characteristics.map((char: string) => `"${char}"`).join(",\n      ")}\n    ],\n    care: "${newPlant.care}",\n    diseases: "${newPlant.diseases}",\n    watering: {\n      summer: "${newPlant.watering.summer}",\n      winter: "${newPlant.watering.winter}",\n      general: "${newPlant.watering.general}"\n    },\n    light: "${newPlant.light}",\n    difficulty: "${newPlant.difficulty}",\n    imageUrl: "${newPlant.imageUrl}",\n    temperature: "${newPlant.temperature}",\n    humidity: "${newPlant.humidity}"\n  }`;

    // Construir el nuevo contenido del archivo
    const updatedContent = 
      fileContent.slice(0, lastIndex) + 
      newPlantString + 
      "\n" + 
      fileContent.slice(lastIndex);

    // Escribir en el archivo
    await fs.writeFile(filePath, updatedContent, "utf-8");

    return NextResponse.json({ success: true, plant: newPlant });
  } catch (error: any) {
    console.error("Error al escribir nueva planta en plants.ts:", error);
    return NextResponse.json(
      { error: `Error en el servidor: ${error.message}` },
      { status: 500 }
    );
  }
}
