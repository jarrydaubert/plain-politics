import { ROBOTS_TXT } from "@/lib/robots";

export const dynamic = "force-static";

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: {
      "content-type": "text/plain; charset=utf-8"
    }
  });
}
