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

    // 2. Parse request body
    const { src } = await request.json();
    if (!src || !src.startsWith("/gallery/")) {
      return NextResponse.json({ error: "Ruta de archivo no válida" }, { status: 400 });
    }

    // 3. Remove file from public/gallery
    const filename = path.basename(src);
    const filePath = path.join(process.cwd(), "public", "gallery", filename);
    
    try {
      await fs.unlink(filePath);
    } catch (err: any) {
      // If file doesn't exist, we still want to remove it from the DB
      console.warn(`File not found at ${filePath}, proceeding with DB removal`);
    }

    // 4. Update src/data/gallery.json
    const galleryDbPath = path.join(process.cwd(), "src", "data", "gallery.json");
    const fileData = await fs.readFile(galleryDbPath, "utf-8");
    let galleryList = JSON.parse(fileData);

    galleryList = galleryList.filter((item: any) => item.src !== src);
    await fs.writeFile(galleryDbPath, JSON.stringify(galleryList, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error al eliminar archivo de la galería:", error);
    return NextResponse.json({ error: "Error interno al eliminar el archivo" }, { status: 500 });
  }
}
