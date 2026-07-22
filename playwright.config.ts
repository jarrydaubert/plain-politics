import { defineConfig, devices } from "@playwright/test";

const fixtureServerUrl = "http://127.0.0.1:4010";
const liveE2E = process.env.LIVE_E2E === "1";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "blocking",
      testIgnore: /\.live\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "live",
      testMatch: /\.live\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  webServer: liveE2E
    ? {
        command: "bun run dev",
        reuseExistingServer: !process.env.CI,
        url: "http://127.0.0.1:3000"
      }
    : [
        {
          command: "bun tests/e2e/fixtures/upstream-server.ts",
          reuseExistingServer: !process.env.CI,
          url: `${fixtureServerUrl}/health`
        },
        {
          command: "bun run dev",
          env: {
            E2E_UPSTREAM_BASE_URL: fixtureServerUrl
          },
          reuseExistingServer: !process.env.CI,
          url: "http://127.0.0.1:3000"
        }
      ]
});
