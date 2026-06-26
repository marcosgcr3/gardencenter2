import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const EXPECTED_PASSWORD = process.env.ADMIN_PASSWORD || "lindavista2026";

    if (!password) {
      return NextResponse.json(
        { authenticated: false, error: "Contraseña requerida" },
        { status: 400 }
      );
    }

    if (password === EXPECTED_PASSWORD) {
      return NextResponse.json({ authenticated: true });
    } else {
      return NextResponse.json(
        { authenticated: false, error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("Error en login API:", error);
    return NextResponse.json(
      { authenticated: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
