import { describe, expect, test } from "bun:test";
import { routeMetadata } from "@/lib/seo";

const currentProductDocs = [
  "README.md",
  "docs/project/action-plan.md",
  "docs/strategy/current-assessment.md",
  "docs/strategy/v1.0.0-scope.md",
  "docs/strategy/source-hooks.md"
];

describe("documentation drift", () => {
  test("README lists every indexed top-level public route", async () => {
    const readme = await Bun.file("README.md").text();
    const documentedRoutes = routeMetadata
      .filter((route) => route.index && route.path !== "/")
      .map((route) => route.path);

    for (const path of documentedRoutes) {
      expect(readme).toContain(path);
    }
  });

  test("current product docs do not describe removed placeholder routes", async () => {
    const stalePatterns = [
      /policies placeholder/i,
      /polls placeholder/i,
      /current members sample/i,
      /non-blocking Playwright smoke/i,
      /UK date\/time.*navbar/i
    ];

    for (const path of currentProductDocs) {
      const content = await Bun.file(path).text();

      for (const pattern of stalePatterns) {
        expect(content).not.toMatch(pattern);
      }
    }
  });

  test("documents and config agree on blocking and live E2E modes", async () => {
    const readme = await Bun.file("README.md").text();
    const workflow = await Bun.file(".github/workflows/ci.yml").text();
    const deterministicJob = workflow.split("\n  e2e-live:")[0]?.split("\n  e2e:")[1] ?? "";
    const liveJob = workflow.split("\n  e2e-live:")[1] ?? "";

    expect(readme).toContain("Deterministic Playwright tests");
    expect(readme).toContain("separate non-blocking Playwright job");
    expect(deterministicJob).not.toContain("continue-on-error: true");
    expect(liveJob).toContain("continue-on-error: true");
  });

  test("current docs distinguish live source metadata from planned durable provenance", async () => {
    const readme = await Bun.file("README.md").text();
    const sourceHooks = await Bun.file("docs/strategy/source-hooks.md").text();
    const hookedSection = sourceHooks.split("## Candidate Next")[0] ?? sourceHooks;
    const backlog = await Bun.file("docs/project/backlog.md").text();

    expect(readme).not.toContain("in-memory provenance objects");
    expect(hookedSection).not.toContain("Snapshot hash");
    expect(hookedSection).not.toContain("Source excerpt path");
    expect(backlog).not.toContain("Review the homepage visual direction");
  });
});
