import { describe, expect, test } from "bun:test";
import { getParliamentPageData } from "@/parliament/page-data";
import type { ProvenancedRecord } from "@/sources/uk-parliament";

describe("Parliament page data", () => {
  test("keeps available panels when one source fails", async () => {
    const data = await getParliamentPageData({
      divisions: async () => {
        throw new Error("Commons Votes API unavailable");
      },
      seatCounts: async () => fakeRecord([]),
      upcomingEvents: async () => fakeRecord([])
    });

    expect(data.seatCounts.status).toBe("available");
    expect(data.divisions.status).toBe("unavailable");
    expect(data.upcomingEvents.status).toBe("available");
  });
});

function fakeRecord<T>(data: T): ProvenancedRecord<T> {
  return {
    data,
    dataStatus: {
      lastAttemptedCheckAt: "2026-07-03T10:00:00.000Z",
      lastSuccessfulCheckAt: "2026-07-03T10:00:00.000Z",
      state: "fresh"
    },
    displayFacts: [],
    sourceDocument: {
      id: "source_document_test",
      publisher: "Test source",
      retrievedAt: "2026-07-03T10:00:00.000Z",
      sourceTier: "tier_1",
      sourceType: "api",
      title: "Test source",
      url: "https://example.com/source"
    },
    sourceExcerpts: [],
    sourceSnapshot: {
      capturedAt: "2026-07-03T10:00:00.000Z",
      contentHash: "abc123",
      id: "source_snapshot_test",
      sourceDocumentId: "source_document_test"
    }
  };
}
