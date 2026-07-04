import { describe, expect, test } from "bun:test";
import { explainers } from "@/data/explainers";
import { glossaryCategories, glossaryTermSlug, glossaryTerms } from "@/data/glossary";
import { LLMS_TXT } from "@/lib/llms";
import { ROBOTS_TXT } from "@/lib/robots";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildDefinedTermJsonLd,
  buildDefinedTermSetJsonLd,
  buildSiteIdentityJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata,
  routeMetadata
} from "@/lib/seo";
import { getSitemapRoutes } from "@/lib/sitemap-routes";

const staticPublicRoutes = [
  "/",
  "/about",
  "/explainers",
  "/glossary",
  "/methodology",
  "/my-area",
  "/parliament",
  "/parties",
  "/privacy",
  "/sources",
  "/status"
];

describe("SEO metadata", () => {
  test("defines metadata for every static public route", () => {
    const routePaths = routeMetadata.map((route) => String(route.path)).sort();

    expect(routePaths).toEqual([...staticPublicRoutes].sort());

    for (const route of routeMetadata) {
      const metadata = createMetadata(route);

      expect(metadata.title).toBeTruthy();
      expect(metadata.description).toBeTruthy();
      expect(metadata.alternates?.canonical).toBe(route.path);
      expect(metadata.openGraph).toMatchObject({
        description: route.description,
        siteName: "Plain Politics",
        title: route.title,
        url: route.path
      });
      expect(metadata.twitter).toMatchObject({
        card: "summary_large_image",
        description: route.description,
        title: route.title
      });
    }
  });

  test("creates metadata for generated glossary and explainer routes", () => {
    const glossaryMetadata = createMetadata({
      description: glossaryTerms[0].plainEnglish,
      path: `/glossary/${glossaryTermSlug(glossaryTerms[0])}`,
      title: `${glossaryTerms[0].term} meaning - Plain Politics`
    });
    const explainerMetadata = createMetadata({
      description: explainers[0].description,
      path: `/explainers/${explainers[0].slug}`,
      title: `${explainers[0].title} - Plain Politics`
    });

    expect(glossaryMetadata.alternates?.canonical).toBe("/glossary/mp");
    expect(explainerMetadata.alternates?.canonical).toBe("/explainers/what-is-pmqs");
  });
});

describe("crawl files", () => {
  test("robots.txt includes sitemap and explicit OpenAI crawler policy", () => {
    expect(ROBOTS_TXT).toContain("Sitemap: https://plainpolitics.co.uk/sitemap.xml");
    expect(ROBOTS_TXT).toContain("User-agent: OAI-SearchBot");
    expect(ROBOTS_TXT).toContain("User-agent: ChatGPT-User");
    expect(ROBOTS_TXT).toContain("User-agent: GPTBot");
    expect(ROBOTS_TXT).toContain("Disallow: /");
    expect(ROBOTS_TXT).toContain("Allow: /");
  });

  test("llms.txt includes source policy and key routes", () => {
    expect(LLMS_TXT).toContain("# Plain Politics");
    expect(LLMS_TXT).toContain("No factual claim without a source");
    expect(LLMS_TXT).toContain("/sources");
    expect(LLMS_TXT).toContain("/about");
    expect(LLMS_TXT).toContain("/glossary");
    expect(LLMS_TXT).toContain("/parliament");
    expect(LLMS_TXT).toContain("/status");
  });
});

describe("sitemap routes", () => {
  test("includes indexed static, glossary and explainer routes", () => {
    const routes = getSitemapRoutes(new Date("2026-07-03T12:00:00.000Z")).map(
      (route) => route.path
    );

    expect(routes).toContain("/");
    expect(routes).toContain("/about");
    expect(routes).toContain("/parliament");
    expect(routes).toContain("/privacy");
    expect(routes).toContain("/status");
    expect(routes).toContain("/glossary/mp");
    expect(routes).toContain("/glossary/division");
    expect(routes).toContain("/glossary/pmqs");
    expect(routes).toContain("/explainers/what-is-pmqs");
    expect(routes).toContain("/explainers/how-commons-votes-work");
  });

  test("excludes redirects and removed placeholder routes", () => {
    const routes = getSitemapRoutes(new Date("2026-07-03T12:00:00.000Z")).map(
      (route) => route.path
    );

    expect(routes).not.toContain("/methodology");
    expect(routes).not.toContain("/policies");
    expect(routes).not.toContain("/polls");
    expect(routes).not.toContain("/parties/labour");
  });
});

describe("structured data", () => {
  test("builds parseable JSON-LD for page, breadcrumb, article and glossary schemas", () => {
    const term = {
      ...glossaryTerms[0],
      slug: glossaryTermSlug(glossaryTerms[0])
    };
    const schemas = [
      buildSiteIdentityJsonLd(),
      buildWebPageJsonLd(getRouteMetadata("/about")),
      buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" }
      ]),
      buildDefinedTermSetJsonLd([term]),
      buildDefinedTermJsonLd(term),
      buildArticleJsonLd(explainers[0])
    ];

    for (const schema of schemas) {
      expect(JSON.parse(JSON.stringify(schema))).toBeTruthy();
    }
  });
});

describe("crawler text quality", () => {
  test("keeps glossary category text separated", () => {
    const categoryText = glossaryCategories.join(" ");

    expect(categoryText).toBe("Parliament Elections Parties Traditions");
    expect(categoryText).not.toContain("ParliamentElectionsPartiesTraditions");
  });

  test("uses semantic table captions and headers on crawler-sensitive pages", async () => {
    const glossaryPage = await Bun.file("app/glossary/page.tsx").text();
    const parliamentPage = await Bun.file("app/parliament/page.tsx").text();

    expect(glossaryPage).toContain('aria-label="Glossary categories"');
    expect(parliamentPage).toContain("<caption");
    expect(parliamentPage).toContain('scope="col"');
    expect(parliamentPage).toContain('headers="party-seat-party"');
    expect(parliamentPage).toContain("function CrawlerBoundary");
    expect(parliamentPage).not.toContain("Abbrev.");
    expect(parliamentPage).not.toContain("Party Abbrev.Seats");
    expect(parliamentPage).not.toContain("Labour (Co-op)Ipswich");
  });
});
