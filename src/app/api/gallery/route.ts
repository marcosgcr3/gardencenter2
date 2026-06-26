import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "gallery.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileData);
    
    // Disable caching for real-time updates in client-side queries
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Error reading gallery data:", error);
    return NextResponse.json({ error: "Failed to read gallery data" }, { status: 500 });
  }
}
