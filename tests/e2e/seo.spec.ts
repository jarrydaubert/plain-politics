import { expect, test } from "@playwright/test";

test("homepage metadata and explainer links render in HTML", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Plain Politics - UK politics in plain English");
  await expect(page.getByRole("link", { name: /what is pmqs/i })).toHaveAttribute(
    "href",
    "/explainers/what-is-pmqs"
  );
  await expect(page.locator('script[type="application/ld+json"]').first()).toBeAttached();
});

test("glossary hub and term pages expose crawlable sourced content", async ({ page }) => {
  await page.goto("/glossary");

  const glossaryText = await page.locator("body").innerText();
  expect(glossaryText).not.toContain("ParliamentElectionsPartiesTraditions");
  await expect(page.getByRole("link", { name: "MP" }).first()).toHaveAttribute(
    "href",
    "/glossary/mp"
  );

  await page.goto("/glossary/mp");
  await expect(page).toHaveTitle("MP meaning - Plain Politics");
  await expect(page.getByRole("heading", { exact: true, name: "MP" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What it means" })).toBeVisible();
  await expect(page.getByText(/UK Parliament glossary/i)).toBeVisible();

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsedSchemas = schemas.map((schema) => JSON.parse(schema));
  expect(JSON.stringify(parsedSchemas)).toContain("DefinedTerm");
});

test("explainer pages expose article schema and source links", async ({ page }) => {
  await page.goto("/explainers/what-is-pmqs");

  await expect(page).toHaveTitle("What is PMQs? - Plain Politics");
  await expect(page.getByRole("heading", { name: "What is PMQs?" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sources for this explainer" })).toBeVisible();
  await expect(page.getByRole("link", { name: /UK Parliament glossary/i })).toBeVisible();

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsedSchemas = schemas.map((schema) => JSON.parse(schema));
  expect(JSON.stringify(parsedSchemas)).toContain("Article");
  expect(JSON.stringify(parsedSchemas)).toContain("BreadcrumbList");
});

test("crawl files expose robots, llms and sitemap routes", async ({ page }) => {
  await page.goto("/robots.txt");
  const robotsText = await page.locator("body").innerText();
  expect(robotsText).toContain("User-agent: OAI-SearchBot");
  expect(robotsText).toContain("User-agent: ChatGPT-User");
  expect(robotsText).toContain("User-agent: GPTBot");
  expect(robotsText).toContain("Disallow: /");
  expect(robotsText).toContain("Sitemap: https://plainpolitics.co.uk/sitemap.xml");

  await page.goto("/llms.txt");
  const llmsText = await page.locator("body").innerText();
  expect(llmsText).toContain("No factual claim without a source");
  expect(llmsText).toContain("/sources");
  expect(llmsText).toContain("/status");

  await page.goto("/sitemap.xml");
  const sitemapText = await page.locator("body").innerText();
  expect(sitemapText).toContain("https://plainpolitics.co.uk/glossary/mp");
  expect(sitemapText).toContain("https://plainpolitics.co.uk/how-politics-works");
  expect(sitemapText).toContain("https://plainpolitics.co.uk/explainers/what-is-pmqs");
  expect(sitemapText).not.toContain("https://plainpolitics.co.uk/policies");
});

test("parliament tables expose separated machine-readable text", async ({ page }) => {
  await page.goto("/parliament");

  const firstTableText = await page
    .getByRole("table", {
      name: /Current House of Commons party seat counts/i
    })
    .evaluate((table) => table.textContent ?? "");

  expect(firstTableText).toContain("Party name; Party abbreviation; Commons seats");
  expect(firstTableText).not.toContain("Party Abbrev.Seats");
  expect(firstTableText).not.toContain("Male MPs");
});

test("footer data status badge refreshes from the no-store status endpoint", async ({ page }) => {
  await page.route("**/api/data-status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      json: {
        checkedAt: "2026-07-03T11:15:00.000Z",
        lastAttemptedCheckAt: "2026-07-03T11:15:00.000Z",
        lastSuccessfulCheckAt: "2026-07-03T11:15:00.000Z",
        overall: "healthy",
        sources: []
      },
      status: 200
    });
  });

  await page.goto("/");

  await expect(
    page.getByRole("link", { name: /Data status: Healthy .* checked 12:15/i })
  ).toBeVisible();
});

test("data status page renders deterministic quality checks", async ({ page }) => {
  await page.goto("/status");

  await expect(page.getByRole("heading", { exact: true, name: "Data status" })).toBeVisible();
  await expect(page.getByRole("complementary").getByText("Healthy", { exact: true })).toBeVisible();
  await expect(page.getByText("UK Parliament Members API", { exact: true })).toBeVisible();
  await expect(page.getByText("UK Parliament Commons Votes API", { exact: true })).toBeVisible();
  await expect(page.getByText("UK Parliament What's On API", { exact: true })).toBeVisible();
  await expect(page.getByText("postcodes.io / ONS lookup", { exact: true })).toBeVisible();
  await expect(page.getByText("Static glossary sources", { exact: true })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Expected record shape" }).first()).toBeVisible();
  await expect(page.getByRole("cell", { name: "Obvious data sanity" }).first()).toBeVisible();
});

test("new glossary term page remains readable on mobile", async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto("/glossary/mp");

  await expect(page.getByRole("heading", { exact: true, name: "MP" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Source" })).toBeVisible();
  await expect(page.getByText(/A Member of Parliament/i)).toBeVisible();
});
