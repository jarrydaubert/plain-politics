import type { Metadata } from "next";
import type { Explainer } from "@/data/explainers";
import type { GlossaryTerm } from "@/data/glossary";

export const SITE_NAME = "Plain Politics";
export const SITE_URL = "https://plainpolitics.co.uk";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const CONTENT_LAST_REVIEWED = "2026-07-03";

export type RouteMetadataConfig = {
  path: string;
  title: string;
  description: string;
  index: boolean;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export const routeMetadata = [
  {
    changeFrequency: "hourly",
    description:
      "Plain-English UK politics: find your MP, decode parliamentary words, and check public records.",
    index: true,
    path: "/",
    priority: 1,
    title: "Plain Politics - UK politics in plain English"
  },
  {
    changeFrequency: "weekly",
    description:
      "Find your Westminster constituency and current MP from a postcode, with privacy-safe defaults.",
    index: true,
    path: "/my-area",
    priority: 0.85,
    title: "Find your MP and constituency - Plain Politics"
  },
  {
    changeFrequency: "hourly",
    description:
      "Commons seats, current MPs, recent divisions and upcoming parliamentary business from official UK Parliament sources.",
    index: true,
    path: "/parliament",
    priority: 0.9,
    title: "Commons votes, seats and Parliament today - Plain Politics"
  },
  {
    changeFrequency: "weekly",
    description:
      "Plain-English meanings for UK politics and Parliament terms, each linked to a source.",
    index: true,
    path: "/glossary",
    priority: 0.9,
    title: "UK politics glossary in plain English - Plain Politics"
  },
  {
    changeFrequency: "weekly",
    description:
      "Short, source-linked explainers for beginner questions about UK politics and Parliament.",
    index: true,
    path: "/explainers",
    priority: 0.85,
    title: "UK politics explainers in plain English - Plain Politics"
  },
  {
    changeFrequency: "weekly",
    description:
      "The public sources, records, limitations and correction policy behind Plain Politics.",
    index: true,
    path: "/sources",
    priority: 0.8,
    title: "Sources and public records - Plain Politics"
  },
  {
    changeFrequency: "weekly",
    description: "Plain Politics explains UK politics without spin, predictions or voting advice.",
    index: true,
    path: "/about",
    priority: 0.75,
    title: "About Plain Politics"
  },
  {
    changeFrequency: "hourly",
    description:
      "A public data health page showing whether Plain Politics source checks are healthy, degraded or offline.",
    index: true,
    path: "/status",
    priority: 0.7,
    title: "Data status - Plain Politics"
  },
  {
    changeFrequency: "hourly",
    description:
      "A beginner view of the current House of Commons party balance from UK Parliament records.",
    index: true,
    path: "/parties",
    priority: 0.75,
    title: "Commons party balance - Plain Politics"
  },
  {
    changeFrequency: "monthly",
    description: "Plain Politics methodology now redirects to the About page and source policy.",
    index: false,
    path: "/methodology",
    priority: 0.1,
    title: "Methodology - Plain Politics"
  },
  {
    changeFrequency: "monthly",
    description:
      "Policy comparison is planned but not yet part of the source-backed public launch.",
    index: false,
    path: "/policies",
    priority: 0.1,
    title: "Policy comparison status - Plain Politics"
  },
  {
    changeFrequency: "monthly",
    description:
      "Polling pages are planned but not yet published because source and methodology checks are not ready.",
    index: false,
    path: "/polls",
    priority: 0.1,
    title: "Polling status - Plain Politics"
  }
] as const satisfies RouteMetadataConfig[];

export function getRouteMetadata(path: string): RouteMetadataConfig {
  const route = routeMetadata.find((item) => item.path === path);

  if (!route) {
    throw new Error(`Missing SEO metadata for route: ${path}`);
  }

  return route;
}

export function canonicalUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function createMetadata(config: {
  path: string;
  title: string;
  description: string;
  index?: boolean;
}): Metadata {
  const index = config.index ?? true;

  return {
    alternates: {
      canonical: config.path
    },
    description: config.description,
    openGraph: {
      description: config.description,
      images: [
        {
          alt: "Plain Politics - British politics, without the fog",
          height: 630,
          url: DEFAULT_OG_IMAGE,
          width: 1200
        }
      ],
      locale: "en_GB",
      siteName: SITE_NAME,
      title: config.title,
      type: "website",
      url: config.path
    },
    robots: index
      ? {
          follow: true,
          index: true
        }
      : {
          follow: false,
          index: false
        },
    title: config.title,
    twitter: {
      card: "summary_large_image",
      description: config.description,
      images: [DEFAULT_OG_IMAGE],
      title: config.title
    }
  };
}

export function buildSiteIdentityJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${SITE_URL}/#website`,
        "@type": "WebSite",
        description: getRouteMetadata("/").description,
        inLanguage: "en-GB",
        name: SITE_NAME,
        publisher: {
          "@id": `${SITE_URL}/#organization`
        },
        url: SITE_URL
      },
      {
        "@id": `${SITE_URL}/#organization`,
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL
      }
    ]
  };
}

export function buildWebPageJsonLd(config: { path: string; title: string; description: string }) {
  const url = canonicalUrl(config.path);

  return {
    "@context": "https://schema.org",
    "@id": `${url}#webpage`,
    "@type": "WebPage",
    description: config.description,
    inLanguage: "en-GB",
    isPartOf: {
      "@id": `${SITE_URL}/#website`
    },
    name: config.title,
    publisher: {
      "@id": `${SITE_URL}/#organization`
    },
    url
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: canonicalUrl(item.path),
      name: item.name,
      position: index + 1
    }))
  };
}

export function buildDefinedTermSetJsonLd(terms: (GlossaryTerm & { slug: string })[]) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    description: getRouteMetadata("/glossary").description,
    inLanguage: "en-GB",
    name: "Plain Politics glossary",
    url: canonicalUrl("/glossary"),
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      description: term.plainEnglish,
      inDefinedTermSet: canonicalUrl("/glossary"),
      name: term.term,
      termCode: term.slug,
      url: canonicalUrl(`/glossary/${term.slug}`)
    }))
  };
}

export function buildDefinedTermJsonLd(term: GlossaryTerm & { slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    description: term.plainEnglish,
    inDefinedTermSet: canonicalUrl("/glossary"),
    name: term.term,
    termCode: term.slug,
    url: canonicalUrl(`/glossary/${term.slug}`)
  };
}

export function buildArticleJsonLd(explainer: Explainer) {
  const url = canonicalUrl(`/explainers/${explainer.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    author: {
      "@id": `${SITE_URL}/#organization`
    },
    citation: explainer.sourceLinks.map((source) => source.url),
    dateModified: explainer.lastReviewed,
    datePublished: explainer.lastReviewed,
    description: explainer.description,
    headline: explainer.title,
    image: [canonicalUrl(DEFAULT_OG_IMAGE)],
    inLanguage: "en-GB",
    mainEntityOfPage: url,
    publisher: {
      "@id": `${SITE_URL}/#organization`
    },
    url
  };
}
