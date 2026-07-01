import { describe, expect, test } from "bun:test";
import { hashText, stableId } from "@/lib/provenance";

describe("provenance helpers", () => {
  test("creates stable hashes for source snapshots", () => {
    expect(hashText("same source text")).toBe(hashText("same source text"));
    expect(hashText("same source text")).not.toBe(hashText("different source text"));
  });

  test("creates prefixed stable ids", () => {
    const id = stableId("source_excerpt", "https://example.com/source#row-1");

    expect(id.startsWith("source_excerpt_")).toBe(true);
    expect(id).toBe(stableId("source_excerpt", "https://example.com/source#row-1"));
  });
});
