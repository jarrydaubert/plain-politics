import { describe, expect, test } from "bun:test";
import { displayFactSchema, sourceDocumentSchema } from "@/lib/source-contracts";

describe("source contracts", () => {
  test("accepts a tiered source document", () => {
    const parsed = sourceDocumentSchema.parse({
      id: "00000000-0000-4000-8000-000000000001",
      title: "Example public source",
      publisher: "Example publisher",
      url: "https://example.com/source",
      sourceType: "official_page",
      sourceTier: "tier_1",
      publishedAt: null,
      retrievedAt: "2026-06-30T12:00:00.000Z"
    });

    expect(parsed.sourceTier).toBe("tier_1");
  });

  test("requires displayed facts to have at least one source excerpt", () => {
    expect(() =>
      displayFactSchema.parse({
        id: "00000000-0000-4000-8000-000000000002",
        subjectType: "party",
        subjectId: "00000000-0000-4000-8000-000000000003",
        summaryText: "A sourced public statement.",
        sourceExcerptIds: [],
        coverageState: "strong",
        lastCheckedAt: "2026-06-30T12:00:00.000Z"
      })
    ).toThrow();
  });
});
