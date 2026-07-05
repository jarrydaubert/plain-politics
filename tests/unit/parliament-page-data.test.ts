import { describe, expect, test } from "bun:test";
import { getParliamentPageData } from "@/parliament/page-data";
import type { SourceRecord } from "@/sources/uk-parliament";

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

function fakeRecord<T>(data: T): SourceRecord<T> {
  return {
    data,
    dataStatus: {
      lastAttemptedCheckAt: "2026-07-03T10:00:00.000Z",
      lastSuccessfulCheckAt: "2026-07-03T10:00:00.000Z",
      state: "fresh"
    },
    sourceDocument: {
      publisher: "Test source",
      retrievedAt: "2026-07-03T10:00:00.000Z",
      title: "Test source",
      url: "https://example.com/source"
    }
  };
}
