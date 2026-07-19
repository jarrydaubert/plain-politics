import { SITE_URL } from "@/lib/seo";

export const INDEXNOW_API_ENDPOINT = "https://api.indexnow.org/indexnow";
export const INDEXNOW_KEY = "69ed25c7fa0e458c8bececd8374202b3";
export const INDEXNOW_CANONICAL_HOST = "plainpolitics.co.uk";

const INDEXNOW_BATCH_LIMIT = 10_000;

export type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

export function assertCanonicalSiteUrl(siteUrl: string): URL {
  let url: URL;

  try {
    url = new URL(siteUrl);
  } catch {
    throw new Error(`Refusing IndexNow submission: "${siteUrl}" is not a valid URL.`);
  }

  if (url.protocol !== "https:") {
    throw new Error(
      `Refusing IndexNow submission: only https URLs may be submitted (got "${siteUrl}").`
    );
  }

  if (url.hostname !== INDEXNOW_CANONICAL_HOST) {
    throw new Error(
      `Refusing IndexNow submission: only the canonical production host ${INDEXNOW_CANONICAL_HOST} may be submitted. Preview, localhost, www and other non-canonical hosts are not allowed (got "${url.hostname}").`
    );
  }

  return url;
}

export function buildIndexNowPayload(paths: string[], siteUrl = SITE_URL): IndexNowPayload {
  const url = assertCanonicalSiteUrl(siteUrl);
  const urlList = [...new Set(paths.map((path) => new URL(path, url).toString()))];

  if (urlList.length === 0) {
    throw new Error("Refusing IndexNow submission: the URL list is empty.");
  }

  if (urlList.length > INDEXNOW_BATCH_LIMIT) {
    throw new Error(
      `Refusing IndexNow submission: ${String(urlList.length)} URLs exceeds the ${String(INDEXNOW_BATCH_LIMIT)}-URL batch limit.`
    );
  }

  return {
    host: INDEXNOW_CANONICAL_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${url.origin}/${INDEXNOW_KEY}.txt`,
    urlList
  };
}

export function describeIndexNowStatus(status: number): { ok: boolean; summary: string } {
  switch (status) {
    case 200:
      return { ok: true, summary: "OK. The URL batch was submitted successfully." };
    case 202:
      return {
        ok: true,
        summary: "Accepted. The URL batch was received and IndexNow key validation is pending."
      };
    case 400:
      return { ok: false, summary: "Bad request. The payload JSON is invalid or malformed." };
    case 403:
      return {
        ok: false,
        summary:
          "Forbidden. The key is not valid: the key file is missing, unreachable, or does not match keyLocation."
      };
    case 422:
      return {
        ok: false,
        summary:
          "Unprocessable entity. Submitted URLs do not belong to the host, or the key does not match the schema."
      };
    case 429:
      return {
        ok: false,
        summary: "Too many requests. The submission was rate limited; retry later."
      };
    default:
      return {
        ok: false,
        summary: "Unexpected response status. Check the IndexNow documentation."
      };
  }
}
