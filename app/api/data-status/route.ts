import { getDataStatusReport } from "@/status/data-status";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const report = await getDataStatusReport();

  return Response.json(report, {
    headers: {
      "cache-control": "no-store, max-age=0"
    }
  });
}
