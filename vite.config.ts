import { createHash } from 'node:crypto'
import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, type Plugin } from 'vite'
function contentSecurityPolicy(): Plugin {
  return {
    name: 'content-security-policy',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
          (match) => `'sha256-${createHash('sha256').update(match[1] ?? '').digest('base64')}'`,
        )
        const policy = [
          "default-src 'self'",
          ["script-src 'self'", ...inlineScripts].join(' '),
          "style-src 'self'",
          "img-src 'self' data:",
          "font-src 'self'",
          "connect-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'none'",
          'upgrade-insecure-requests',
        ].join('; ')
        return [
          {
            tag: 'meta',
            attrs: { 'http-equiv': 'Content-Security-Policy', content: policy },
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}

export default defineConfig({
  base: '/Portfolio/',
  plugins: [react(), tailwindcss(), contentSecurityPolicy()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 7).replace('-', '.')),
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
})
