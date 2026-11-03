import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90_000,

  // Сайт медленный — ассерты ждут дольше стандартных 5с
  expect: { timeout: 15_000 },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'https://vladivostok.e-sweets.ru/',

    navigationTimeout: 60_000,
    actionTimeout: 15_000,

    ignoreHTTPSErrors: true,

    locale: 'ru-RU',
    timezoneId: 'Asia/Vladivostok',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});