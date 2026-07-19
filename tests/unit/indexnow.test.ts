import { describe, expect, test } from "bun:test";
import {
  assertCanonicalSiteUrl,
  buildIndexNowPayload,
  describeIndexNowStatus,
  INDEXNOW_API_ENDPOINT,
  INDEXNOW_KEY
} from "@/lib/indexnow";
import { getSitemapRoutes } from "@/lib/sitemap-routes";

describe("IndexNow payload", () => {
  const payload = buildIndexNowPayload(getSitemapRoutes().map((route) => route.path));

  test("uses the official endpoint and generated key", () => {
    expect(INDEXNOW_API_ENDPOINT).toBe("https://api.indexnow.org/indexnow");
    expect(INDEXNOW_KEY).toBe("69ed25c7fa0e458c8bececd8374202b3");
    expect(payload.key).toBe(INDEXNOW_KEY);
  });

  test("targets the canonical production host and key location", () => {
    expect(payload.host).toBe("plainpolitics.co.uk");
    expect(payload.keyLocation).toBe(
      "https://plainpolitics.co.uk/69ed25c7fa0e458c8bececd8374202b3.txt"
    );
  });

  test("submits every indexed sitemap route as an absolute canonical URL", () => {
    const routeCount = getSitemapRoutes().length;

    expect(payload.urlList.length).toBe(routeCount);
    expect(payload.urlList.length).toBeGreaterThan(0);

    for (const url of payload.urlList) {
      expect(url.startsWith("https://plainpolitics.co.uk/")).toBe(true);
    }

    expect(payload.urlList).toContain("https://plainpolitics.co.uk/glossary/mp");
    expect(new Set(payload.urlList).size).toBe(payload.urlList.length);
  });

  test("refuses an empty URL list", () => {
    expect(() => buildIndexNowPayload([])).toThrow(/URL list is empty/);
  });
});

describe("IndexNow host refusals", () => {
  test("refuses localhost, preview, www and non-https hosts", () => {
    expect(() => assertCanonicalSiteUrl("http://localhost:3000")).toThrow(/only https/);
    expect(() => assertCanonicalSiteUrl("https://localhost:3000")).toThrow(/canonical/);
    expect(() => assertCanonicalSiteUrl("https://plain-politics-abc123.vercel.app")).toThrow(
      /canonical/
    );
    expect(() => assertCanonicalSiteUrl("https://www.plainpolitics.co.uk")).toThrow(/canonical/);
    expect(() => assertCanonicalSiteUrl("http://plainpolitics.co.uk")).toThrow(/only https/);
    expect(() => assertCanonicalSiteUrl("not a url")).toThrow(/not a valid URL/);
  });

  test("accepts only the canonical production origin", () => {
    expect(assertCanonicalSiteUrl("https://plainpolitics.co.uk").origin).toBe(
      "https://plainpolitics.co.uk"
    );
  });

  test("payload building refuses non-canonical site URLs", () => {
    expect(() => buildIndexNowPayload(["/"], "https://preview.plainpolitics.co.uk")).toThrow(
      /canonical/
    );
  });
});

describe("IndexNow key file", () => {
  test("public key file contains exactly the key", async () => {
    const keyFile = Bun.file(`${import.meta.dir}/../../public/${INDEXNOW_KEY}.txt`);

    expect(await keyFile.text()).toBe(INDEXNOW_KEY);
  });
});

describe("IndexNow response reporting", () => {
  test("maps documented statuses to clear outcomes", () => {
    expect(describeIndexNowStatus(200)).toEqual({
      ok: true,
      summary: "OK. The URL batch was submitted successfully."
    });
    expect(describeIndexNowStatus(202).ok).toBe(true);
    expect(describeIndexNowStatus(202).summary).toMatch(/key validation is pending/);
    expect(describeIndexNowStatus(400).ok).toBe(false);
    expect(describeIndexNowStatus(400).summary).toMatch(/invalid or malformed/);
    expect(describeIndexNowStatus(403).ok).toBe(false);
    expect(describeIndexNowStatus(403).summary).toMatch(/key/);
    expect(describeIndexNowStatus(422).ok).toBe(false);
    expect(describeIndexNowStatus(422).summary).toMatch(/do not belong to the host/);
    expect(describeIndexNowStatus(429).ok).toBe(false);
    expect(describeIndexNowStatus(429).summary).toMatch(/rate limited/);
    expect(describeIndexNowStatus(500).ok).toBe(false);
  });
});
