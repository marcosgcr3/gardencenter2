const fs = require('fs');
const path = require('path');
const https = require('https');

// Lista de slugs de las 20 plantas del catálogo
const plantSlugs = [
  "monstera-deliciosa",
  "palmera-canaria",
  "ficus-lira",
  "olivo",
  "buganvilla",
  "sansevieria",
  "aloe-vera",
  "cinta",
  "lavanda",
  "poto",
  "rosal",
  "echeveria",
  "helecho-espada",
  "hibisco",
  "kentia",
  "arbol-de-jade",
  "espatifilo",
  "calatea",
  "geranio",
  "romero"
];

// Configuración de URL base y directorio de salida
const BASE_URL = "https://gardencenterlindavista.solarrv.tech/plantas/"; // O tu dominio definitivo
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'qrcodes');

// Crear la carpeta si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`Generando códigos QR en: ${OUTPUT_DIR}\n`);

// Descargar cada código QR usando la API pública gratuita qrserver.com
plantSlugs.forEach((slug) => {
  const targetUrl = `${BASE_URL}${slug}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(targetUrl)}`;
  const filePath = path.join(OUTPUT_DIR, `${slug}-qr.png`);

  https.get(qrApiUrl, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log(`✓ Descargado con éxito: ${slug}-qr.png`);
      });
    } else {
      console.error(`✗ Error generando QR para ${slug}: Estado HTTP ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`✗ Error de red al descargar QR para ${slug}:`, err.message);
  });
});
