import { describe, expect, test } from "bun:test";
import { explainers } from "@/data/explainers";
import { glossaryTerms } from "@/data/glossary";

const internalVoicePatterns = [
  /Plain Politics should/i,
  /Plain Politics can/i,
  /the site should/i,
  /replace with/i,
  /placeholder/i
];

describe("public copy", () => {
  test("does not leak internal product instructions", () => {
    const publicStrings = [
      ...glossaryTerms.flatMap((term) => [
        term.plainEnglish,
        term.whyItMatters,
        term.sourceName,
        term.term
      ]),
      ...explainers.flatMap((explainer) => [
        explainer.description,
        explainer.title,
        ...explainer.sections.flatMap((section) => [section.heading, section.body])
      ])
    ];

    for (const value of publicStrings) {
      for (const pattern of internalVoicePatterns) {
        expect(value).not.toMatch(pattern);
      }
    }
  });

  test("keeps glossary sources as HTTPS URLs", () => {
    for (const term of glossaryTerms) {
      expect(term.sourceUrl.startsWith("https://")).toBe(true);
    }
  });

  test("does not ship public party placeholder profile routes", async () => {
    expect(await Bun.file("app/parties/[slug]/page.tsx").exists()).toBe(false);
  });

  test("does not ship public future-feature placeholder routes", async () => {
    expect(await Bun.file("app/policies/page.tsx").exists()).toBe(false);
    expect(await Bun.file("app/polls/page.tsx").exists()).toBe(false);
  });

  test("does not expose roadmap or internal navigation language on public pages", async () => {
    const publicPagePatterns = [
      /Back to dashboard/i,
      /coming soon/i,
      /not in the launch version/i,
      /planned after v1/i,
      /still to come/i
    ];
    const pages = new Bun.Glob("app/**/page.tsx");

    for await (const path of pages.scan(".")) {
      const pageSource = await Bun.file(path).text();

      for (const pattern of publicPagePatterns) {
        expect(pageSource).not.toMatch(pattern);
      }
    }
  });
});
