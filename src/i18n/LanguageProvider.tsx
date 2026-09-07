import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { en } from './en'
import { es } from './es'
import type { Dictionary, Lang } from './types'
import { LanguageContext } from './context'

const STORAGE_KEY = 'language'

const dictionaries: Record<Lang, Dictionary> = { es, en }

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {}
  const preferred = navigator.languages?.[0] ?? navigator.language
  return preferred.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitialLang)

  useEffect(() => {
    const t = dictionaries[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {}
  }, [lang])

  const toggleLanguage = useCallback(() => setLang((current) => (current === 'es' ? 'en' : 'es')), [])

  const value = useMemo(
    () => ({ lang, t: dictionaries[lang], toggleLanguage }),
    [lang, toggleLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
