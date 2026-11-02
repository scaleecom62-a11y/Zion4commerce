import { defineConfig, devices } from "@playwright/test";

// Runs against a production build started with EDITOR_DEMO_MODE=1 (no database needed):
//   EDITOR_DEMO_MODE=1 npm run build && EDITOR_DEMO_MODE=1 npm start
//   npm run test:e2e
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    viewport: { width: 1440, height: 900 },
    launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } }],
});
