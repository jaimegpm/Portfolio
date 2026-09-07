import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('content fits phone and tablet viewports', async ({ page }) => {
  await page.goto('./')
  await page.evaluate(() => document.fonts.ready)
  for (const width of [320, 375, 768, 820, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    const bounds = await page.getByRole('group', { name: /^Maqueta/ }).boundingBox()
    expect(bounds!.x + bounds!.width, `frame at ${width}px`).toBeLessThanOrEqual(width)
    expect(bounds!.width, `usable frame at ${width}px`).toBeGreaterThanOrEqual(Math.min(280, width - 40))
    const titleWidth = await page.locator('#experience article h3').first().evaluate(e => e.getBoundingClientRect().width)
    expect(titleWidth, `experience at ${width}px`).toBeGreaterThan(160)
    const overflow = await page.evaluate(() => [...document.querySelectorAll('body *')].filter(element => {
      const box = element.getBoundingClientRect()
      return box.width > 0 && (box.right > innerWidth + 1 || box.left < -1) && getComputedStyle(element).position !== 'absolute'
    }).map(element => element.tagName))
    expect(overflow, `overflow at ${width}px`).toEqual([])
  }
})

test('Fleet opens the chosen terminal after another was maximized', async ({ page }) => {
  await page.goto('./')
  await page.getByTitle('Maximize terminal').first().click()
  await page.getByRole('button', { name: 'Fleet', exact: true }).click()
  await page.locator('button[title$="in the grid"]').last().click()
  await expect(page.getByTitle('Restore terminal')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Close Grok', exact: true })).toBeVisible()
})

test('rapid theme switches have no unhandled rejection', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('./')
  await page.getByRole('button', { name: 'Cambiar tema' }).evaluate((button: HTMLButtonElement) => {
    button.click()
    button.click()
    button.click()
  })
  await page.waitForTimeout(900)
  expect(errors).toEqual([])
})

test('byte trail clears on pointer leave', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('./')
  const canvas = page.locator('canvas')
  await expect(canvas).toBeVisible()
  await page.waitForTimeout(100)
  await page.mouse.move(400, 400)
  const painted = () => canvas.evaluate((c: HTMLCanvasElement) => c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data.some((v, i) => i % 4 === 3 && v > 0))
  await expect.poll(painted).toBe(true)
  await page.locator('html').dispatchEvent('pointerleave')
  await expect.poll(painted).toBe(false)
})

test('byte trail matches the viewport on high density screens', async ({ browser }) => {
  const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
  await page.goto('http://127.0.0.1:4174/Portfolio/')
  const canvas = page.locator('canvas')
  await expect(canvas).toBeVisible()
  expect(await canvas.evaluate(c => c.getBoundingClientRect().width)).toBe(1440)
  await page.close()
})

test('language, theme, navigation and local resources work in the production build', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('response', response => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
  })
  await page.goto('./')
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await page.getByRole('button', { name: 'Cambiar a inglés' }).first().click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await page.getByRole('button', { name: 'Switch theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.setViewportSize({ width: 375, height: 812 })
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  await page.locator('#mobile-nav a[href="#contact"]').click()
  await expect(page.locator('#mobile-nav')).toHaveCount(0)
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.locator('#contact')).toBeInViewport()
  const cv = await request.get(await page.getByRole('link', { name: 'CV (pdf)' }).getAttribute('href') ?? '')
  expect(cv.status()).toBe(200)
  expect(cv.headers()['content-type']).toContain('application/pdf')
  for (const resource of ['favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'og.png', 'fonts/doto-latin.woff2', 'fonts/jetbrains-mono-latin.woff2', 'cursors/arrow-dark.svg', 'cursors/arrow-light.svg', 'cursors/pointer-dark.svg', 'cursors/pointer-light.svg']) {
    expect((await request.get(resource)).status(), resource).toBe(200)
  }
  expect(errors).toEqual([])
})

test('all mockup modes pass the accessibility scan in both themes', async ({ browser }) => {
  const context = await browser.newContext({ bypassCSP: true, reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4174/Portfolio/')
  for (const theme of ['dark', 'light']) {
    await page.evaluate(value => { document.documentElement.dataset.theme = value }, theme)
    for (const mode of ['Code', 'Agent', 'Fleet']) {
      const button = page.getByRole('button', { name: mode, exact: true })
      await button.click()
      await page.mouse.move(0, 0)
      await expect(button).toHaveAttribute('aria-pressed', 'true')
      await page.evaluate(async () => {
        const transitions = document.getAnimations().filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity)
        await Promise.all(transitions.map(animation => animation.finished.catch(() => {})))
      })
      const { violations } = await new AxeBuilder({ page }).analyze()
      expect(violations.map(({ id, nodes }) => ({ id, elements: nodes.map(node => node.html) })), `${mode}, ${theme}`).toEqual([])
    }
  }
  await context.close()
})
