import { profile } from '@/data/profile'
import { useLanguage } from '@/i18n'

export function Footer() {
  const { t, lang, toggleLanguage } = useLanguage()
  const other = lang === 'es' ? 'en' : 'es'

  return (
    <footer className="label flex flex-col gap-2 border-t border-line px-[var(--gutter)] py-5 text-muted md:flex-row md:justify-between md:py-7">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>{t.footer.base}</span>
      <button type="button" onClick={toggleLanguage} aria-label={t.nav.switchLanguage} className="label text-left hover:text-fg">
        <b className="font-semibold text-fg">{lang}</b> / {other}
      </button>
    </footer>
  )
}
