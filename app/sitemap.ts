import type { MetadataRoute } from "next";

const siteUrl = "https://plainpolitics.co.uk";

const staticRoutes = [
  "",
  "/about",
  "/glossary",
  "/methodology",
  "/my-area",
  "/parliament",
  "/parties",
  "/sources"
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ...staticRoutes.map((route) => ({
      changeFrequency:
        route === "" || route === "/parliament" ? ("hourly" as const) : ("weekly" as const),
      lastModified: now,
      priority: route === "" ? 1 : 0.7,
      url: `${siteUrl}${route}`
    }))
  ];

  return routes;
}
