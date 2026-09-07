import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'
const THEME_COLOR: Record<Theme, string> = { dark: '#050806', light: '#f2f3ea' }

const listeners = new Set<() => void>()

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function writeTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {}
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => 'dark')
}

export function toggleTheme() {
  const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!document.startViewTransition || reduced) {
    writeTheme(next)
    return
  }

  const transition = document.startViewTransition(() => writeTheme(next))
  void transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: ['inset(0 0 100% 0)', 'inset(0)'] },
      { pseudoElement: '::view-transition-new(root)', duration: 600, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
    )
  }, () => {})
}
