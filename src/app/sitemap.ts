import { MetadataRoute } from "next";
import { plants } from "@/data/plants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://gardencenterlindavista.com";

  // Core static pages
  const staticRoutes = ["", "/sobre-nosotros", "/galeria", "/contacto", "/plantas"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic plant care pages
  const plantRoutes = plants.map((plant) => ({
    url: `${baseUrl}/plantas/${plant.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...plantRoutes];
}
