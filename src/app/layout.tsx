import type { Metadata, Viewport } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  keywords: "vivero san pedro alcantara, vivero marbella, garden center marbella, plantas marbella, jardineria san pedro, floristeria san pedro alcantara, macetas marbella, decoracion jardin costa del sol",
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#7abf17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${inter.variable} ${playfair.variable} h-full antialiased font-sans`}
    >
      <body
        className="min-h-full flex flex-col bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200"
        spellCheck={false}
      >
        <LanguageProvider>
          <SmoothScroll>
            <Navbar />
            <main className="flex-grow flex flex-col w-full">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
