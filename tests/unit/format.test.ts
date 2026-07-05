import { describe, expect, test } from "bun:test";
import { formatUkDate, formatUkDateTime, formatUkTime, maxIsoDate } from "@/lib/format";
import { cleanOptionalText } from "@/lib/text";

describe("shared formatting helpers", () => {
  test("formats public timestamps consistently in Europe/London", () => {
    const value = "2026-07-05T19:30:00.000Z";

    expect(formatUkDate(value)).toBe("5 Jul 2026");
    expect(formatUkDateTime(value)).toBe("5 Jul 2026 at 20:30");
    expect(formatUkTime(value)).toBe("20:30");
  });

  test("finds the latest ISO timestamp without mutating the input", () => {
    const values = ["2026-07-03T10:00:00.000Z", "2026-07-05T09:00:00.000Z"];

    expect(maxIsoDate(values)).toBe("2026-07-05T09:00:00.000Z");
    expect(values).toEqual(["2026-07-03T10:00:00.000Z", "2026-07-05T09:00:00.000Z"]);
    expect(maxIsoDate([])).toBeNull();
  });

  test("normalizes optional source text", () => {
    expect(cleanOptionalText("  House   of\nCommons ")).toBe("House of Commons");
    expect(cleanOptionalText("   ")).toBeUndefined();
    expect(cleanOptionalText(null)).toBeUndefined();
  });
});
