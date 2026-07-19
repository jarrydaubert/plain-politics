import { expect, test } from "@playwright/test";

test("homepage recent-vote evidence disclosure opens with the keyboard and shows its fields", async ({
  page
}) => {
  await page.goto("/");

  const summary = page.locator("summary", { hasText: "Evidence for this vote" });
  const sourceLink = page.getByRole("link", { name: /UK Parliament Commons Votes API/ });

  await expect(summary).toBeVisible();
  await expect(sourceLink).toBeHidden();

  await summary.focus();
  await page.keyboard.press("Enter");

  await expect(sourceLink).toBeVisible();
  await expect(sourceLink).toHaveAttribute("href", /division\/2394\.json/);
  await expect(sourceLink).toHaveAttribute("target", "_blank");
  await expect(page.getByText(/Checked through the app cache .+ at /).nth(1)).toBeVisible();
  await expect(page.getByText("What this can and cannot prove", { exact: true })).toBeVisible();
  await expect(page.getByText(/does not by itself explain why an MP voted that way/)).toBeVisible();
  await expect(page.getByText(/Division 43 on .+: 330 ayes and 93 noes/)).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(sourceLink).toBeHidden();
});

test("parliament seat-count evidence disclosure exposes source, retrieval time and raw record", async ({
  page
}) => {
  await page.goto("/parliament");

  const summary = page.locator("summary", { hasText: "Evidence for the largest party row" });
  const sourceLink = page.getByRole("link", { name: /UK Parliament Members API/ });

  await expect(summary).toBeVisible();
  await expect(sourceLink).toBeHidden();

  await summary.click();

  await expect(sourceLink).toBeVisible();
  await expect(sourceLink).toHaveAttribute("href", /StateOfTheParties/);
  await expect(page.getByText(/lists Labour \(Lab\) with 649 Commons seats/)).toBeVisible();
  await expect(page.getByText(/do not show vote share, opinion polling/)).toBeVisible();
});

test("open evidence disclosures keep the 390px layout free of horizontal overflow", async ({
  page
}) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto("/");

  await page.locator("summary", { hasText: "Evidence for this vote" }).click();
  await expect(page.getByRole("link", { name: /UK Parliament Commons Votes API/ })).toBeVisible();

  const rootWidths = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth
  }));
  expect(rootWidths.scrollWidth).toBeLessThanOrEqual(rootWidths.viewportWidth);
});
