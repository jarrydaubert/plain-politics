import { expect, test } from "@playwright/test";

test("home page renders the source-backed tracker shell", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /start with where you live/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /start with my area/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /barebones public launch/i })).toBeVisible();
  await expect(page.getByLabel(/UK date and time/i)).toBeVisible();
});

test("my area page renders the postcode starter", async ({ page }) => {
  await page.goto("/my-area");

  await expect(page.getByRole("heading", { name: /start with your area/i })).toBeVisible();
  await expect(page.getByLabel(/enter a postcode/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /find my mp/i })).toBeVisible();
  await expect(page.getByText(/does not store your postcode/i)).toBeVisible();
});

test("my area lookup resolves a sample postcode", async ({ page }) => {
  await page.goto("/my-area");

  await page.getByLabel(/enter a postcode/i).fill("SW1A 1AA");
  await page.getByRole("button", { name: /find my mp/i }).click();

  await expect(
    page.getByRole("heading", { name: /cities of london and westminster/i })
  ).toBeVisible({
    timeout: 15000
  });
  await expect(page.getByText(/public record, not automatic local impact/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /sources checked/i })).toBeVisible();
});

test("parliament page renders live source-backed tables", async ({ page }) => {
  await page.goto("/parliament");

  await expect(page.getByRole("heading", { exact: true, name: "Parliament" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /state of the parties/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /current commons members sample/i })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /upcoming parliamentary business/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /recent commons divisions/i })).toBeVisible();
  await expect(page.getByText(/displayed facts backed by excerpts/i).first()).toBeVisible();
});

test("sources page renders hook inventory and datapoint groups", async ({ page }) => {
  await page.goto("/sources");

  await expect(page.getByRole("heading", { name: /sources and datapoints/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /what is hooked now/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /candidate feeds/i })).toBeVisible();
  await expect(page.getByText("State of the parties")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Polling and popularity" }).first()).toBeVisible();
});

test("glossary page renders sourced political terms", async ({ page }) => {
  await page.goto("/glossary");

  await expect(page.getByRole("heading", { name: /political glossary/i })).toBeVisible();
  await expect(page.getByRole("heading", { exact: true, name: "Parliament" })).toBeVisible();
  await expect(page.getByRole("heading", { exact: true, name: "Elections" })).toBeVisible();
  await expect(page.getByRole("heading", { exact: true, name: "Traditions" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "First Past the Post" })).toBeVisible();
  await expect(page.getByText(/UK Parliament glossary/i).first()).toBeVisible();
});
