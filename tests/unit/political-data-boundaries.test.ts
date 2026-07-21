import { describe, expect, test } from "bun:test";
import { getSitemapRoutes } from "@/lib/sitemap-routes";

describe("political data architecture boundaries", () => {
  test("raw canonical data and its adapter stay behind the query module", async () => {
    const files = [new Bun.Glob("app/**/*.{ts,tsx}"), new Bun.Glob("src/**/*.{ts,tsx}")];

    for (const glob of files) {
      for await (const path of glob.scan(".")) {
        const source = await Bun.file(path).text();

        if (path !== "src/political-data/storage.ts") {
          expect(source, `${path} cannot import the raw canonical store`).not.toContain(
            "canonical-data.json"
          );
        }
        if (path !== "src/political-data/queries.ts") {
          expect(source, `${path} cannot bypass the server query boundary`).not.toMatch(
            /political-data\/storage/
          );
        }
      }
    }
  });

  test("pages and components cannot import raw canonical data, storage adapters or database clients", async () => {
    const files = [new Bun.Glob("app/**/*.tsx"), new Bun.Glob("src/components/**/*.tsx")];
    const forbiddenImports = [
      /canonical-data\.json/,
      /political-data\/storage/,
      /@supabase\//,
      /supabase\/(client|server)/
    ];

    for (const glob of files) {
      for await (const path of glob.scan(".")) {
        const source = await Bun.file(path).text();

        for (const pattern of forbiddenImports) {
          expect(source, `${path} must use the server query boundary`).not.toMatch(pattern);
        }
      }
    }
  });

  test("server query module exposes the narrow named queries", async () => {
    const source = await Bun.file("src/political-data/queries.ts").text();

    expect(source).toContain('import "server-only"');
    expect(source).toContain("function getPartyBySlug");
    expect(source).toContain("function getCurrentLeadership");
    expect(source).toContain("function getRoleHistory");
  });

  test("leadership proof pages stay out of the sitemap and navigation", async () => {
    expect(getSitemapRoutes().some((route) => route.path.includes("/people"))).toBe(false);

    const navigationFiles = ["src/components/site-header.tsx", "src/components/site-footer.tsx"];
    for (const path of navigationFiles) {
      expect(await Bun.file(path).text()).not.toContain("/people");
    }
  });
});
