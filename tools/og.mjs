import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from '@playwright/test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'public/og.png')

const font = async (file) => (await readFile(resolve(root, 'public/fonts', file))).toString('base64')
const doto = await font('doto-latin.woff2')
const mono = await font('jetbrains-mono-latin.woff2')

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>
@font-face { font-family: 'Doto'; font-weight: 400 900; src: url(data:font/woff2;base64,${doto}) format('woff2'); }
@font-face { font-family: 'JetBrains Mono'; font-weight: 300 800; src: url(data:font/woff2;base64,${mono}) format('woff2'); }
html, body { margin: 0; }
body {
  width: 1200px; height: 630px; overflow: hidden; box-sizing: border-box; padding: 72px;
  display: flex; flex-direction: column; justify-content: space-between;
  background: #050806 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Crect x='4.5' y='4.5' width='3' height='3' fill='%237dff63' fill-opacity='.16'/%3E%3C/svg%3E");
  color: #dfe9dc; font-family: 'JetBrains Mono', monospace; -webkit-font-smoothing: antialiased;
}
h1 { margin: 0; font-family: 'Doto', monospace; font-weight: 900; font-variation-settings: 'ROND' 0; font-size: 150px; line-height: 0.86; letter-spacing: 0.01em; text-transform: uppercase; display: flex; flex-direction: column; white-space: nowrap; }
h1 span:last-child { color: #7dff63; }
p { margin: 0; font-size: 20px; letter-spacing: 0.16em; text-transform: uppercase; color: #86967f; }
footer { font-size: 24px; color: #7dff63; }
</style>
</head>
<body>
<div>
  <h1><span>Jaime</span> <span>García-Page</span></h1>
  <p style="margin-top: 40px">backend · middleware · bajo nivel</p>
</div>
<footer>jaimegpm.github.io/Portfolio</footer>
</body>
</html>`

const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html)
await page.evaluate(() => document.fonts.ready)
await writeFile(out, await page.screenshot({ type: 'png' }))
await browser.close()
console.log(`wrote ${out}`)
