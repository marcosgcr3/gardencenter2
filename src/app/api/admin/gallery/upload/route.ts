import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    // 1. Authenticate using header
    const password = request.headers.get("x-admin-password");
    const EXPECTED_PASSWORD = process.env.ADMIN_PASSWORD || "lindavista2026";
    if (password !== EXPECTED_PASSWORD) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const altEs = formData.get("altEs") as string || "";
    const altEn = formData.get("altEn") as string || "";

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    // 3. Determine file type (image or video)
    const fileType = file.type.startsWith("video/") ? "video" : "image";
    
    // Validate extensions
    const ext = path.extname(file.name).toLowerCase();
    if (fileType === "video" && ext !== ".mp4") {
      return NextResponse.json({ error: "Solo se admiten vídeos en formato MP4" }, { status: 400 });
    }
    if (fileType === "image" && !['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
      return NextResponse.json({ error: "Formato de imagen no soportado (use JPG, PNG, WEBP o GIF)" }, { status: 400 });
    }

    // 4. Generate unique filename
    const timestamp = Date.now();
    const newFilename = `gallery_${timestamp}${ext}`;
    const publicDirPath = path.join(process.cwd(), "public", "gallery");
    
    // Ensure public/gallery folder exists
    await fs.mkdir(publicDirPath, { recursive: true });
    
    const filePath = path.join(publicDirPath, newFilename);
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Write file to public/gallery
    await fs.writeFile(filePath, buffer);

    // 5. Update src/data/gallery.json
    const galleryDbPath = path.join(process.cwd(), "src", "data", "gallery.json");
    const fileData = await fs.readFile(galleryDbPath, "utf-8");
    const galleryList = JSON.parse(fileData);

    const newItem = {
      src: `/gallery/${newFilename}`,
      type: fileType,
      key: `gallery.uploaded_${timestamp}`,
      altEs: altEs || (fileType === "video" ? "Vídeo de nuestras instalaciones" : "Instalaciones del Garden Center Linda Vista"),
      altEn: altEn || (fileType === "video" ? "Video of our facilities" : "Facilities of Garden Center Linda Vista")
    };

    // Prepend new item so it shows first
    galleryList.unshift(newItem);
    await fs.writeFile(galleryDbPath, JSON.stringify(galleryList, null, 2), "utf-8");

    return NextResponse.json(newItem);
  } catch (error: any) {
    console.error("Error al subir archivo a la galería:", error);
    return NextResponse.json({ error: "Error interno del servidor al procesar la subida" }, { status: 500 });
  }
}
