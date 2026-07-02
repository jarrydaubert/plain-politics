import type { MetadataRoute } from "next";

const siteUrl = "https://plainpolitics.co.uk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*"
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
