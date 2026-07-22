import { expect, test } from "@playwright/test";

test("orientation page distinguishes the system and offers inspectable next steps", async ({
  page
}) => {
  await page.goto("/how-politics-works");

  await expect(page).toHaveTitle("How UK politics works - Plain Politics");
  await expect(
    page.getByRole("heading", { exact: true, name: "How UK politics fits together" })
  ).toBeVisible();
  await expect(
    page.getByText(
      /Parliament and Government are connected, but they are not the same\. Parliament includes the elected Commons/i
    )
  ).toBeVisible();

  for (const heading of [
    "Your MP and constituency",
    "Parliament",
    "Government",
    "Political parties",
    "Elections and Government formation"
  ]) {
    await expect(page.getByRole("heading", { exact: true, name: heading })).toBeVisible();
  }

  await expect(page.getByRole("heading", { name: "From a vote to governing" })).toBeVisible();
  await expect(page.getByText("People elect MPs", { exact: true })).toBeVisible();
  await expect(
    page.getByText("A Government is formed that can command the Commons", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText("Parliament debates, scrutinises and makes laws", { exact: true })
  ).toBeVisible();

  const formationEvidence = page.locator("summary", {
    hasText: "Evidence for Government formation"
  });
  await formationEvidence.click();
  await expect(
    page.getByRole("link", { name: /Cabinet Office — The Cabinet Manual/i })
  ).toBeVisible();
  await expect(page.getByText(/constitutional convention/i)).toBeVisible();

  await expect(page.getByRole("heading", { name: "Where should I go next?" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Find my MP/i }).last()).toHaveAttribute(
    "href",
    "/my-area"
  );
  await expect(page.getByRole("link", { name: /Open Parliament records/i })).toHaveAttribute(
    "href",
    "/parliament"
  );
  await expect(page.getByRole("link", { name: /Use the glossary/i })).toHaveAttribute(
    "href",
    "/glossary"
  );
  await expect(page.getByRole("link", { name: /Browse the source directory/i })).toHaveAttribute(
    "href",
    "/sources"
  );
});

test("orientation evidence is keyboard operable and headings remain semantic", async ({ page }) => {
  await page.goto("/how-politics-works");

  const evidence = page.locator("summary", { hasText: "Evidence for MPs and constituencies" });
  await evidence.focus();
  await expect(evidence).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("link", { name: /UK Parliament — How MPs are elected/i })
  ).toBeVisible();

  const headingLevels = await page
    .locator("h1, h2, h3")
    .evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.slice(1))));
  expect(headingLevels.filter((level) => level === 1)).toHaveLength(1);
  expect(
    headingLevels.every((level, index) => index === 0 || level <= headingLevels[index - 1] + 1)
  ).toBe(true);
});

test("orientation route stays readable without horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto("/how-politics-works");

  await expect(
    page.getByRole("heading", { exact: true, name: "How UK politics fits together" })
  ).toBeVisible();
  await expect(page.getByText("People elect MPs", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Where should I go next?" })).toBeVisible();
  expect(
    await page.evaluate(() => ({
      rootWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth
    }))
  ).toEqual({ rootWidth: 390, viewportWidth: 390 });
});
