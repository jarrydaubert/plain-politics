import { expect, test } from "@playwright/test";

test("live postcode and Members APIs resolve a sample postcode", async ({ page }) => {
  await page.goto("/my-area");

  await page.getByLabel(/enter a postcode/i).fill("SW1A 1AA");
  await page.getByRole("button", { name: /find my mp/i }).click();

  await expect(
    page.getByRole("heading", { name: /cities of london and westminster/i })
  ).toBeVisible({
    timeout: 15000
  });
  await expect(page.getByRole("heading", { name: /source links/i })).toBeVisible();
});

test("live Parliament APIs render usable records", async ({ page }) => {
  await page.goto("/parliament");

  await expect(
    page.getByRole("table", { name: /Current House of Commons party seat counts/i })
  ).toBeVisible();
  await expect(page.getByRole("table", { name: /Upcoming parliamentary business/i })).toBeVisible();
  await expect(
    page.getByRole("table", { name: /Recent House of Commons divisions/i })
  ).toBeVisible();
});

test("live data-status checks return all source families", async ({ request }) => {
  const response = await request.get("/api/data-status");
  const report = (await response.json()) as {
    overall: string;
    sources: Array<{ id: string }>;
  };

  expect(response.ok()).toBe(true);
  expect(["healthy", "degraded", "offline"]).toContain(report.overall);
  expect(report.sources.map((source) => source.id)).toEqual([
    "uk-parliament-members",
    "uk-parliament-commons-votes",
    "uk-parliament-whatson",
    "postcodes-ons",
    "static-glossary"
  ]);
});
