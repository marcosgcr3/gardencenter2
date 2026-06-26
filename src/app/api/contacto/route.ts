import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, Correo y Mensaje son obligatorios" },
        { status: 400 }
      );
    }

    // 1. Gather mail settings
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const recipient = "ventas@gardencenterlindavista.com";
    const emailSubject = `[Contacto Web] Nuevo mensaje de ${name}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 30px; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #4a5d3e; padding-bottom: 15px;">
          <h2 style="color: #4a5d3e; margin: 0; font-size: 24px; font-weight: bold;">Garden Center Linda Vista</h2>
          <p style="color: #718096; margin: 5px 0 0 0; font-size: 14px;">Nuevo mensaje desde el formulario de contacto de la web</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 10px 0; font-weight: bold; width: 150px; border-bottom: 1px solid #edf2f7; color: #4a5568;">Nombre:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #2d3748;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #edf2f7; color: #4a5568;">Correo Electrónico:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #2d3748;"><a href="mailto:${email}" style="color: #4a5d3e; text-decoration: none; font-weight: bold;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #edf2f7; color: #4a5568;">Teléfono:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #2d3748;">${phone || "No especificado"}</td>
          </tr>
        </table>
        
        <div style="margin-top: 25px; padding: 20px; background-color: #f7fafc; border-left: 4px solid #4a5d3e; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #2d3748; font-size: 15px; font-weight: bold; margin-bottom: 10px;">Mensaje recibido:</h3>
          <p style="white-space: pre-wrap; font-size: 14px; color: #4a5568; margin: 0; line-height: 1.6;">${message}</p>
        </div>
        
        <footer style="margin-top: 35px; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; padding-top: 15px; text-align: center;">
          Este correo fue enviado automáticamente desde el formulario de contacto del sitio web oficial de Garden Center Linda Vista.
        </footer>
      </div>
    `;

    // 2. Check if SMTP configuration is available
    if (smtpHost && smtpUser && smtpPass) {
      console.log(`CONTACT_API: SMTP configured. Sending email via ${smtpHost}...`);
      
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // True for port 465, false for 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name} via Web" <${smtpUser}>`,
        to: recipient,
        replyTo: email,
        subject: emailSubject,
        html: emailHtml,
      });

      console.log(`CONTACT_API: Email successfully sent to ${recipient}!`);
    } else {
      console.warn("CONTACT_API WARNING: SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS) are not configured. The form request was logged, but no email was actually sent.");
      console.log("=== CONTACT FORM SUBMISSION ===");
      console.log(`Nombre: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Teléfono: ${phone}`);
      console.log(`Mensaje: ${message}`);
      console.log("===============================");
    }

    return NextResponse.json({
      success: true,
      message: "Consulta recibida de forma exitosa.",
    });
  } catch (error: any) {
    console.error("CONTACT_API_ERROR: Failed to process contact request:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor al procesar el mensaje",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
