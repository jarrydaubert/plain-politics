import {
  buildIndexNowPayload,
  describeIndexNowStatus,
  INDEXNOW_API_ENDPOINT
} from "@/lib/indexnow";
import { getSitemapRoutes } from "@/lib/sitemap-routes";

const submit = process.argv.includes("--submit");

if (process.env.VERCEL) {
  console.error(
    "Refusing to run IndexNow submission inside a Vercel build or deployment environment. Run it manually from an operator machine after a production deploy."
  );
  process.exit(1);
}

const payload = buildIndexNowPayload(getSitemapRoutes().map((route) => route.path));

console.log(`Host:         ${payload.host}`);
console.log(`Key location: ${payload.keyLocation}`);
console.log(`Endpoint:     ${INDEXNOW_API_ENDPOINT}`);
console.log(`URL count:    ${String(payload.urlList.length)}`);
console.log(`First URLs:   ${payload.urlList.slice(0, 3).join(", ")}`);

if (!submit) {
  console.log("");
  console.log("Dry run only: nothing was submitted.");
  console.log("Run `bun run indexnow:submit` to submit this batch to IndexNow.");
  process.exit(0);
}

const response = await fetch(INDEXNOW_API_ENDPOINT, {
  body: JSON.stringify(payload),
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: "POST"
});

const { ok, summary } = describeIndexNowStatus(response.status);

console.log("");
console.log(`HTTP ${String(response.status)}: ${summary}`);
process.exit(ok ? 0 : 1);
