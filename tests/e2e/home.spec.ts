import { expect, type Page, test } from "@playwright/test";

test("home page renders the source-backed tracker shell", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Plain Politics home" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /british politics, at a glance/i })).toBeVisible();
  const primaryHeroLink = page.getByRole("link", { name: /learn the basics/i }).first();
  await expect(primaryHeroLink).toBeVisible();
  await expect(primaryHeroLink).not.toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(page.getByRole("link", { name: /understand the parties/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /see parliament today/i }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /start from the landscape/i })).toBeVisible();
  await expect(page.getByText(/0 of 4 complete/i)).toBeVisible();
  await expect(page.getByLabel(/UK date and time/i)).toBeVisible();
  await expect(page.getByText(/not affiliated with any political party/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /info@plainpolitics.co.uk/i })).toBeVisible();
});

test("my area page renders the postcode starter", async ({ page }) => {
  await page.goto("/my-area");

  await expect(page.getByRole("heading", { name: /start with your area/i })).toBeVisible();
  await expect(page.getByLabel(/enter a postcode/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /find my mp/i })).toBeVisible();
  await expect(page.getByText(/1 of 4 complete/i)).toBeVisible();
  await expect(page.getByText(/never sent to or stored by us/i)).toBeVisible();
});

test("my area lookup resolves a sample postcode", async ({ page }) => {
  await mockMyAreaLookup(page);
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

test("my area lookup shows a friendly invalid postcode error", async ({ page }) => {
  let parliamentRequests = 0;

  await page.route("https://api.postcodes.io/postcodes/**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      json: {
        error: "Invalid postcode",
        status: 404
      },
      status: 404
    });
  });
  await page.route("https://members-api.parliament.uk/api/**", async (route) => {
    parliamentRequests += 1;
    await route.fulfill({
      contentType: "application/json",
      json: {},
      status: 500
    });
  });

  await page.goto("/my-area");
  await page.getByLabel(/enter a postcode/i).fill("ZZ99 9ZZ");
  await page.getByRole("button", { name: /find my mp/i }).click();

  await expect(page.getByText(/that postcode was not found/i)).toBeVisible();
  expect(parliamentRequests).toBe(0);
});

test("live my area lookup resolves a sample postcode", async ({ page }) => {
  test.skip(!process.env.LIVE_E2E, "Set LIVE_E2E=1 to run live third-party lookup smoke.");

  await page.goto("/my-area");

  await page.getByLabel(/enter a postcode/i).fill("SW1A 1AA");
  await page.getByRole("button", { name: /find my mp/i }).click();

  await expect(
    page.getByRole("heading", { name: /cities of london and westminster/i })
  ).toBeVisible({
    timeout: 15000
  });
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

test("about page explains the site without technical framing", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByRole("heading", { name: /about this site/i })).toBeVisible();
  await expect(page.getByText(/without spin, predictions or voting advice/i)).toBeVisible();
  await expect(page.getByText(/postcode lookups are not stored/i)).toBeVisible();
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

async function mockMyAreaLookup(page: Page) {
  await page.route("https://api.postcodes.io/postcodes/**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      json: {
        result: {
          admin_district: "Westminster",
          admin_ward: "St James's",
          codes: {
            parliamentary_constituency: "E14001172",
            parliamentary_constituency_2024: "E14001172"
          },
          parliamentary_constituency: "Cities of London and Westminster",
          parliamentary_constituency_2024: "Cities of London and Westminster",
          postcode: "SW1A 1AA"
        },
        status: 200
      }
    });
  });

  await page.route("https://members-api.parliament.uk/api/Members/Search**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      json: {
        items: [
          {
            value: {
              id: 5257,
              latestHouseMembership: {
                membershipFrom: "Cities of London and Westminster",
                membershipFromId: 4331,
                membershipStartDate: "2024-07-04T00:00:00"
              },
              latestParty: {
                backgroundColour: "d50000",
                name: "Labour (Co-op)"
              },
              nameDisplayAs: "Rachel Blake",
              nameFullTitle: "Rachel Blake MP",
              thumbnailUrl: null
            }
          }
        ],
        skip: 0,
        take: 1,
        totalResults: 1
      }
    });
  });

  await page.route("https://members-api.parliament.uk/api/Members/5257/Voting**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      json: {
        items: [
          {
            value: {
              date: "2026-06-24T00:00:00",
              divisionNumber: 43,
              id: 2394,
              inAffirmativeLobby: true,
              inNegativeLobby: false,
              numberAgainst: 93,
              numberInFavour: 330,
              title: "Draft Climate Change Act 2008 (Credit Limit) Order 2026"
            }
          }
        ]
      }
    });
  });

  await page.route(
    "https://members-api.parliament.uk/api/Members/5257/WrittenQuestions**",
    async (route) => {
      await route.fulfill({
        contentType: "application/json",
        json: {
          items: [
            {
              value: {
                dateAnswered: "2026-06-18T00:00:00",
                dateTabled: "2026-05-14T00:00:00",
                heading: "Pet Travel Scheme",
                id: 1905673,
                questionText:
                  "To ask the Secretary of State for Environment, Food and Rural Affairs, what progress she has made on implementing the new pet passports scheme.",
                uin: "1432"
              }
            }
          ]
        }
      });
    }
  );
}
