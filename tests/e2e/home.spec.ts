import { expect, test } from "@playwright/test";

test("home page renders the source-backed tracker shell", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /plain-english uk politics/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /view parties/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /polling movement/i })).toBeVisible();
  await expect(page.getByLabel(/UK date and time/i)).toBeVisible();
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
