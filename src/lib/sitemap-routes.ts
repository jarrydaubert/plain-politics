import { explainers } from "@/data/explainers";
import { glossaryTermSlug, glossaryTerms } from "@/data/glossary";
import { CONTENT_LAST_REVIEWED, routeMetadata } from "@/lib/seo";

export type SitemapRoute = {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  lastModified: Date;
};

const contentReviewedAt = new Date(`${CONTENT_LAST_REVIEWED}T00:00:00.000Z`);

export function getSitemapRoutes(_now = new Date()): SitemapRoute[] {
  const staticRoutes = routeMetadata
    .filter((route) => route.index)
    .map((route) => ({
      changeFrequency: route.changeFrequency,
      lastModified: contentReviewedAt,
      path: route.path,
      priority: route.priority
    }));

  const glossaryRoutes = glossaryTerms.map((term) => ({
    changeFrequency: "monthly" as const,
    lastModified: contentReviewedAt,
    path: `/glossary/${glossaryTermSlug(term)}`,
    priority: 0.62
  }));

  const explainerRoutes = explainers.map((explainer) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(`${explainer.lastReviewed}T00:00:00.000Z`),
    path: `/explainers/${explainer.slug}`,
    priority: 0.7
  }));

  return [...staticRoutes, ...glossaryRoutes, ...explainerRoutes].sort((a, b) =>
    a.path.localeCompare(b.path)
  );
}
