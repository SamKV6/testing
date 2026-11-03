import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Один тест может грузить тяжёлую главную — 90с с запасом
  timeout: 90_000,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [['html', { open: 'never' }], ['list']],

    use: {
      baseURL: 'https://vladivostok.e-sweets.ru/',

      // Сайт медленный — увеличиваем таймауты
      navigationTimeout: 60_000,
      actionTimeout: 15_000,

      // Сертификат сайта может быть невалидным — не падать
      ignoreHTTPSErrors: true,

      // Стабильность в CI
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
