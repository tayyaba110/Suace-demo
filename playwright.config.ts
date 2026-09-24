import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Use only 1 worker
  workers: 1,

  // Fail if test.only is accidentally used in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // HTML report
  reporter: 'html',

  use: {
    // Take screenshot only when a test fails
    screenshot: 'only-on-failure',

    // Collect trace on first retry
    trace: 'on-first-retry',

    // Slow down Playwright actions
    launchOptions: {
      slowMo: 2000,
    },
  },

  projects: [
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});