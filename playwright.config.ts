import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    channel: 'msedge',
    baseURL: 'http://127.0.0.1:4174/Portfolio/',
    viewport: { width: 1440, height: 1000 },
    locale: 'es-ES',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174/Portfolio/',
  },
})
