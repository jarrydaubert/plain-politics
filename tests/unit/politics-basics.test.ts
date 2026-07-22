import { describe, expect, test } from "bun:test";

describe("Politics Basics orientation contract", () => {
  test("keeps the five-part model, simplified flow and live next steps together", async () => {
    const page = await Bun.file("app/how-politics-works/page.tsx").text();

    for (const heading of [
      "Your MP and constituency",
      "Parliament",
      "Government",
      "Political parties",
      "Elections and Government formation"
    ]) {
      expect(page).toContain(heading);
    }

    for (const step of [
      "People elect MPs",
      "MPs make up the House of Commons",
      "A Government is formed that can command the Commons",
      "Government runs departments and proposes policy",
      "Parliament debates, scrutinises and makes laws"
    ]) {
      expect(page).toContain(step);
    }

    for (const href of ["/my-area", "/parliament", "/glossary"]) {
      expect(page).toContain(`href: "${href}"`);
    }
    expect(page).toContain('href="/sources"');

    expect(page).not.toContain('href="/policies"');
    expect(page).not.toContain('href="/polls"');
  });

  test("attaches official evidence and avoids changing officeholders", async () => {
    const page = await Bun.file("app/how-politics-works/page.tsx").text();

    expect(page).toContain("UK Parliament — How MPs are elected");
    expect(page).toContain("UK Parliament — Parliament and the Government");
    expect(page).toContain("Electoral Commission — Campaigning");
    expect(page).toContain("UK Parliament — MPs and political parties");
    expect(page).toContain("Electoral Commission — UK Parliament elections");
    expect(page).toContain("Cabinet Office — The Cabinet Manual");
    expect(page).toContain("constitutional convention");
    expect(page).toContain("parties not in Government scrutinise it from opposition");
    expect(page).toContain("keep enough support from MPs to govern");
    expect(page).not.toMatch(/Keir Starmer|Rishi Sunak|current Prime Minister/i);
  });
});
