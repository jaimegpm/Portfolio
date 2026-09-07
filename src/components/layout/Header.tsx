import { useState } from 'react'

import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from '@/components/ui/icons'
import { profile } from '@/data/profile'
import { useActiveSection } from '@/effects/useActiveSection'
import { useLanguage } from '@/i18n'
import type { SectionId } from '@/i18n/types'
import { toggleTheme, useTheme } from '@/theme/theme'

const SECTIONS: readonly SectionId[] = ['experience', 'projects', 'stack', 'contact']

export function Header() {
  const { t, lang, toggleLanguage } = useLanguage()
  const theme = useTheme()
  const active = useActiveSection(SECTIONS)
  const [open, setOpen] = useState(false)

  const links = SECTIONS.map((id) => ({ id, label: t.nav[id] }))
  const other = lang === 'es' ? 'en' : 'es'

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg">
      <div className="flex h-[var(--header-h)] items-center justify-between px-[var(--gutter)] text-[13px] tracking-[0.04em]">
        <a href="#home" className="font-semibold lowercase">
          {profile.name}
        </a>

        <nav aria-label={t.nav.menu} className="hidden gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'location' : undefined}
              className={`transition-colors duration-[var(--dur-fast)] hover:text-fg ${
                active === link.id ? 'text-fg' : 'text-muted'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6 text-muted">
          <button type="button" onClick={toggleLanguage} aria-label={t.nav.switchLanguage} className="hover:text-fg">
            <b className="font-semibold text-fg">{lang}</b> / {other}
          </button>
          <button type="button" onClick={toggleTheme} aria-label={t.nav.switchTheme} className="hover:text-fg">
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((was) => !was)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t.nav.menu}
            className="hover:text-fg md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t.nav.menu} className="flex flex-col border-t border-line px-[var(--gutter)] py-2 md:hidden">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className={`py-3 text-[13px] tracking-[0.04em] ${active === link.id ? 'text-fg' : 'text-muted'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
