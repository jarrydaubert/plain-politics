import { getDataStatusReport } from "@/status/data-status";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const REPORT_CACHE_TTL_MS = 60_000;

let cachedReport:
  | {
      expiresAt: number;
      report: Awaited<ReturnType<typeof getDataStatusReport>>;
    }
  | undefined;

export async function GET() {
  const now = Date.now();

  if (!cachedReport || cachedReport.expiresAt <= now) {
    cachedReport = {
      expiresAt: now + REPORT_CACHE_TTL_MS,
      report: await getDataStatusReport()
    };
  }

  return Response.json(cachedReport.report, {
    headers: {
      "cache-control": "no-store, max-age=0"
    }
  });
}
