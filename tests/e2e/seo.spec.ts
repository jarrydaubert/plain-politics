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
  expect(robotsText).toContain("Sitemap: https://plainpolitics.co.uk/sitemap.xml");

  await page.goto("/llms.txt");
  const llmsText = await page.locator("body").innerText();
  expect(llmsText).toContain("No factual claim without a source");
  expect(llmsText).toContain("/sources");
  expect(llmsText).toContain("/status");

  await page.goto("/sitemap.xml");
  const sitemapText = await page.locator("body").innerText();
  expect(sitemapText).toContain("https://plainpolitics.co.uk/glossary/mp");
  expect(sitemapText).toContain("https://plainpolitics.co.uk/explainers/what-is-pmqs");
  expect(sitemapText).not.toContain("https://plainpolitics.co.uk/policies");
});

test("new glossary term page remains readable on mobile", async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto("/glossary/mp");

  await expect(page.getByRole("heading", { exact: true, name: "MP" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Source" })).toBeVisible();
  await expect(page.getByText(/A Member of Parliament/i)).toBeVisible();
});
