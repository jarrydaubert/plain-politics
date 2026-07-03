import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getSitemapRoutes } from "@/lib/sitemap-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return getSitemapRoutes(now).map((route) => ({
    changeFrequency: route.changeFrequency,
    lastModified: route.lastModified,
    priority: route.priority,
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`
  }));
}
