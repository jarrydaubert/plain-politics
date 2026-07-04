import { expect, test } from "@playwright/test";
import { routeMetadata } from "@/lib/seo";
import { getSitemapRoutes } from "@/lib/sitemap-routes";

test("every indexed route and internal navigation link resolves", async ({ page, request }) => {
  test.setTimeout(90_000);

  const browserErrors: string[] = [];
  const routeFailures: Array<{ path: string; status: number }> = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    browserErrors.push(error.message);
  });

  for (const route of getSitemapRoutes()) {
    const response = await request.get(route.path);

    if (!response.ok()) {
      routeFailures.push({ path: route.path, status: response.status() });
    }
  }

  expect(routeFailures).toEqual([]);

  const internalLinks = new Set<string>();
  const topLevelRoutes = routeMetadata.filter((route) => route.index).map((route) => route.path);

  for (const path of topLevelRoutes) {
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });

    expect(response?.status(), `${path} should render`).toBeLessThan(400);
    await expect(page.locator("main"), `${path} should render meaningful content`).toBeVisible();
    await expect(page.locator("body")).not.toContainText("Application error");

    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href"))
          .filter((href): href is string => Boolean(href))
      );

    for (const href of hrefs) {
      internalLinks.add(href);
    }
  }

  const linkFailures: Array<{ path: string; status: number }> = [];

  for (const href of internalLinks) {
    const response = await request.get(href);

    if (!response.ok()) {
      linkFailures.push({ path: href, status: response.status() });
    }
  }

  expect(linkFailures).toEqual([]);
  expect(browserErrors).toEqual([]);
});

test("removed future-feature placeholders return not found", async ({ request }) => {
  for (const path of ["/policies", "/polls"]) {
    const response = await request.get(path);

    expect(response.status(), `${path} should not be public`).toBe(404);
  }
});

test("the legacy methodology route resolves to the current trust page", async ({ request }) => {
  const response = await request.get("/methodology", { maxRedirects: 0 });

  expect([307, 308]).toContain(response.status());
  expect(response.headers().location).toBe("/about");
});
