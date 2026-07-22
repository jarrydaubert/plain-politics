import { expect, test } from "@playwright/test";

test("explainer distinguishes the institutions and links onward", async ({ page }) => {
  await page.goto("/explainers/parliament-vs-government");

  await expect(page).toHaveTitle("Parliament versus Government - Plain Politics");
  await expect(
    page.getByRole("heading", {
      exact: true,
      name: "Parliament and Government: what's the difference?"
    })
  ).toBeVisible();

  for (const heading of [
    "Why the distinction matters",
    "Parliament versus Government, side by side",
    "The parts that make up each",
    "Shared people, separate institutions",
    "What different records prove"
  ]) {
    await expect(page.getByRole("heading", { exact: true, name: heading })).toBeVisible();
  }

  await expect(page.getByText(/they are not the same institution/i)).toBeVisible();
  await expect(page.getByText(/many parliamentarians are not ministers/i)).toBeVisible();

  const commencementEvidence = page.locator("summary", { hasText: "Evidence for commencement" });
  await commencementEvidence.click();
  await expect(
    page.getByRole("link", { name: /legislation\.gov\.uk — Understanding legislation/i }).first()
  ).toBeVisible();
  await expect(page.getByText(/not automatically at Royal Assent/i)).toBeVisible();

  await expect(page.getByRole("heading", { exact: true, name: "Where next?" })).toBeVisible();
  await expect(page.getByRole("link", { name: /How UK politics works/i }).last()).toHaveAttribute(
    "href",
    "/how-politics-works"
  );
  await expect(page.getByRole("link", { name: /Find my MP/i })).toHaveAttribute("href", "/my-area");
  await expect(page.getByRole("link", { name: /Open Parliament records/i })).toHaveAttribute(
    "href",
    "/parliament"
  );
});

test("explainer evidence is keyboard operable and headings remain semantic", async ({ page }) => {
  await page.goto("/explainers/parliament-vs-government");

  const evidence = page.locator("summary", { hasText: "Evidence for the distinction" });
  await evidence.focus();
  await expect(evidence).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("link", { name: /UK Parliament — Parliament and the Government/i }).first()
  ).toBeVisible();

  const headingLevels = await page
    .locator("h1, h2, h3")
    .evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.slice(1))));
  expect(headingLevels.filter((level) => level === 1)).toHaveLength(1);
  expect(
    headingLevels.every((level, index) => index === 0 || level <= headingLevels[index - 1] + 1)
  ).toBe(true);
});

test("explainer stays readable without horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto("/explainers/parliament-vs-government");

  await expect(
    page.getByRole("heading", {
      exact: true,
      name: "Parliament and Government: what's the difference?"
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { exact: true, name: "What different records prove" })
  ).toBeVisible();
  expect(
    await page.evaluate(() => ({
      rootWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth
    }))
  ).toEqual({ rootWidth: 390, viewportWidth: 390 });
});
