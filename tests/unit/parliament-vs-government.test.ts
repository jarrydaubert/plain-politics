import { describe, expect, test } from "bun:test";

const pagePath = "app/explainers/parliament-vs-government/page.tsx";

describe("Parliament versus Government explainer contract", () => {
  test("keeps the core sections, comparison and evidence ladder", async () => {
    const page = (await Bun.file(pagePath).text()).replace(/\s+/g, " ");

    for (const heading of [
      "Why the distinction matters",
      "Parliament versus Government, side by side",
      "The parts that make up each",
      "Shared people, separate institutions",
      "What different records prove",
      "Where next?"
    ]) {
      expect(page).toContain(heading);
    }

    for (const record of [
      "Manifesto",
      "Government publication",
      "Bill",
      "Parliamentary vote",
      "Act",
      "Commencement",
      "Implemented policy"
    ]) {
      expect(page).toContain(record);
    }

    for (const href of ["/how-politics-works", "/my-area", "/parliament", "/glossary/mp"]) {
      expect(page).toContain(href);
    }
  });

  test("attaches official evidence and keeps neutrality guarantees", async () => {
    const page = (await Bun.file(pagePath).text()).replace(/\s+/g, " ");

    expect(page).toContain("UK Parliament — Parliament and the Government");
    expect(page).toContain("GOV.UK — The Civil Service Code");
    expect(page).toContain("Cabinet Office — The Cabinet Manual");
    expect(page).toContain("Electoral Commission — Campaigning");
    expect(page).toContain("legislation.gov.uk — Understanding legislation");
    expect(page).toContain("UK Parliament — MPs and political parties");

    expect(page).toContain("they are not the same institution");
    expect(page).toContain("politically impartial");
    expect(page).toContain("many parliamentarians are not ministers");
    expect(page).toContain("not the Prime Minister directly");
    expect(page).toContain("Royal Assent does not mean every provision is already in force");

    expect(page).not.toMatch(/Keir Starmer|Rishi Sunak|current Prime Minister/i);
  });
});
