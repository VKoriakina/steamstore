
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './steam-store/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  timeout: 60000,
  expect: {
    timeout: 40000,
  },

  use: {
    baseURL: 'https://store.steampowered.com/',
    trace: 'on-first-retry',
    locale: process.env.locale || 'de-DE',
    navigationTimeout: 30000,
    actionTimeout: 40000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});

