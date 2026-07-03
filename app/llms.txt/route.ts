import { LLMS_TXT } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      "content-type": "text/markdown; charset=utf-8"
    }
  });
}
