import { describe, expect, test } from "bun:test";

const pageHeaderRoutes = [
  "app/about/page.tsx",
  "app/error.tsx",
  "app/explainers/page.tsx",
  "app/glossary/page.tsx",
  "app/my-area/page.tsx",
  "app/not-found.tsx",
  "app/parliament/page.tsx",
  "app/parties/page.tsx",
  "app/privacy/page.tsx",
  "app/sources/page.tsx",
  "app/status/page.tsx"
];

describe("Ink and Paper design system", () => {
  test("defines Ink ground tokens and retires notebook treatments", async () => {
    const globals = await Bun.file("app/globals.css").text();
    const home = await Bun.file("app/page.tsx").text();

    for (const token of [
      "--ink-bg",
      "--ink-panel",
      "--ink-border",
      "--paper-on-ink",
      "--muted-on-ink",
      "--stop-red-on-ink",
      "--focus-on-ink"
    ]) {
      expect(globals).toContain(token);
    }

    expect(globals).toContain(".ground-ink");
    expect(globals).not.toContain("--hl-");
    expect(globals).not.toContain("--rule-");
    expect(home).not.toContain("repeating-linear-gradient");
    expect(home).not.toContain("hover:-translate-y");
  });

  test("keeps sticky chrome and small Ink punctuation accessible", async () => {
    const globals = await Bun.file("app/globals.css").text();
    const mark = await Bun.file("src/components/plain-politics-logo.tsx").text();
    const red = globals.match(/--stop-red-on-ink:\s*(#[0-9a-f]{6})/i)?.[1];
    const ink = globals.match(/--ink-bg:\s*(#[0-9a-f]{6})/i)?.[1];

    expect(globals).toContain("overflow-x: clip");
    expect(globals).not.toContain("overflow-x: hidden");
    expect(mark).toContain("var(--stop-red)");
    expect(red).toBeDefined();
    expect(ink).toBeDefined();
    expect(contrastRatio(red ?? "#000000", ink ?? "#ffffff")).toBeGreaterThanOrEqual(4.5);
  });

  test("uses Ink for chrome and the homepage orientation surface", async () => {
    const home = await Bun.file("app/page.tsx").text();
    const header = await Bun.file("src/components/site-header.tsx").text();
    const footer = await Bun.file("src/components/site-footer.tsx").text();

    expect(home).toContain('className="ground-ink');
    expect(header).toContain('className="ground-ink');
    expect(header).toContain('variant="bare"');
    expect(footer).toContain('className="ground-ink');
  });

  test("uses the shared editorial page header on section and error pages", async () => {
    for (const path of pageHeaderRoutes) {
      const source = await Bun.file(path).text();
      expect(source).toContain("PageHeader");
    }
  });

  test("keeps install and social assets on Ink", async () => {
    const manifest = await Bun.file("public/site.webmanifest").json();
    const image = new Uint8Array(await Bun.file("public/og-image.png").arrayBuffer());
    const dimensions = new DataView(image.buffer, image.byteOffset, image.byteLength);

    expect(manifest.background_color).toBe("#071F3A");
    expect(dimensions.getUint32(16)).toBe(1200);
    expect(dimensions.getUint32(20)).toBe(630);
  });

  test("documents the canonical two-ground rules", async () => {
    const designSystem = await Bun.file("docs/brand/design-system.md").text();
    const priorBrief = await Bun.file("docs/brand/ui-redesign-brief.md").text();

    expect(designSystem).toContain("## Two Grounds");
    expect(designSystem).toContain("## Retired Treatments");
    expect(designSystem).toContain("Status badges keep their own semantic backgrounds");
    expect(priorBrief).toContain("Superseded on 2026-07-05");
  });
});

function contrastRatio(first: string, second: string) {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);

  return (
    (Math.max(firstLuminance, secondLuminance) + 0.05) /
    (Math.min(firstLuminance, secondLuminance) + 0.05)
  );
}

function relativeLuminance(hex: string) {
  const channels = [1, 3, 5].map(
    (offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255
  );
  const [red = 0, green = 0, blue = 0] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}
