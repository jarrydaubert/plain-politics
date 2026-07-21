import { expect, test } from "@playwright/test";

const parties = [
  { holder: "Andy Burnham", name: "Labour", route: "/parties/labour/people" },
  {
    holder: "Kemi Badenoch",
    name: "Conservatives",
    route: "/parties/conservatives/people"
  },
  {
    holder: "Ed Davey",
    name: "Liberal Democrats",
    route: "/parties/liberal-democrats/people"
  },
  { holder: "Nigel Farage", name: "Reform UK", route: "/parties/reform-uk/people" },
  {
    holder: "Zack Polanski",
    name: "Green Party of England and Wales",
    route: "/parties/green-party-england-wales/people"
  }
];

const sectionHeadings = ["Party leadership", "Parliamentary leadership", "Government roles"];

test("all five leadership pages share sections, expose gaps and are noindex", async ({ page }) => {
  for (const party of parties) {
    await page.goto(party.route);

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(`${party.name} leadership`);
    await expect(page.getByRole("heading", { name: party.holder }).first()).toBeVisible();

    for (const heading of sectionHeadings) {
      await expect(page.getByRole("heading", { level: 2, name: heading })).toBeVisible();
    }
  }

  await page.goto("/parties/conservatives/people");
  await expect(page.locator('[data-coverage-gap="government"]')).toBeVisible();
});

test("unknown leadership slugs return not found and sitemap excludes proof routes", async ({
  request
}) => {
  const unknown = await request.get("/parties/not-a-party/people");
  expect(unknown.status()).toBe(404);

  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).not.toContain("/parties/labour/people");
});

test("leadership evidence disclosure works from the keyboard", async ({ page }) => {
  await page.goto("/parties/labour/people");

  const summary = page.locator("summary", { hasText: "Evidence for Andy Burnham" }).first();
  const source = page.getByRole("link", { name: /GOV\.UK — Prime Minister/ }).first();

  await expect(summary).toBeVisible();
  await expect(source).toBeHidden();

  await summary.focus();
  await page.keyboard.press("Enter");

  await expect(source).toBeVisible();
  await expect(page.getByText("Reviewed evidence", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Snapshot SHA-256", { exact: true }).first()).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(source).toBeHidden();
});

test("leadership pages have no console errors or overflow at 390px", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.setViewportSize({ height: 844, width: 390 });

  for (const { route } of parties) {
    await page.goto(route);
    const summaries = page.locator("summary");

    for (let index = 0; index < (await summaries.count()); index += 1) {
      await summaries.nth(index).click();
    }

    const widths = await page.evaluate(() => ({
      root: document.documentElement.scrollWidth,
      viewport: window.innerWidth
    }));
    expect(widths.root, `${route} should not overflow`).toBeLessThanOrEqual(widths.viewport);
  }

  expect(errors).toEqual([]);
});
