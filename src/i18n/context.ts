import { createContext, useContext } from 'react'

import type { Dictionary, Lang } from './types'

interface LanguageContextValue {
  lang: Lang
  t: Dictionary
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage needs a LanguageProvider above it')
  return value
}
