import { Terminal } from '@/components/hero/Terminal'
import { LinkButton } from '@/components/ui/LinkButton'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/effects/useMediaQuery'
import { useLanguage } from '@/i18n'

export function Hero() {
  const { t, lang } = useLanguage()
  const reduced = useReducedMotion()

  return (
    <section
      id="home"
      className="relative flex flex-col justify-end overflow-hidden px-[var(--gutter)] pt-16 pb-9 md:min-h-[828px] md:pt-[104px] md:pb-14"
    >
      <div aria-hidden="true" className="dots-bg pointer-events-none absolute inset-0" />
      {!reduced && <div aria-hidden="true" className="beam pointer-events-none absolute inset-x-0" />}

      <p className="label relative mb-5 text-muted md:mb-6">{t.hero.eyebrow}</p>
      <h1 className="display relative flex flex-col text-[clamp(44px,9.4vw,132px)] whitespace-nowrap">
        <span>{profile.firstName}</span>{' '}
        <span className="text-accent">{profile.lastName}</span>
      </h1>

      <div className="relative mt-7 grid gap-7 md:mt-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end lg:gap-14">
        <Terminal
          key={lang}
          user="jaime@portfolio"
          prompt={t.hero.prompt}
          session={t.hero.session}
          intro={t.hero.intro}
          commands={t.hero.commands}
          skipLabel={t.hero.skip}
          summary={t.hero.summary}
        />

        <aside className="flex flex-col gap-3.5 border border-line bg-bg p-5 text-[13px] md:p-7">
          {t.hero.readout.map((row) => (
            <div key={row.key} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 md:grid-cols-[104px_minmax(0,1fr)]">
              <span className="text-muted">{row.key}</span>
              <span>
                {row.value}
                {row.note && <em className="text-accent not-italic"> · {row.note}</em>}
              </span>
            </div>
          ))}
          <div className="mt-2">
            <LinkButton href="#projects" primary>
              {t.hero.cta}
            </LinkButton>
          </div>
        </aside>
      </div>

      <div className="label relative mt-10 flex flex-col gap-2.5 text-muted md:mt-14 md:flex-row md:justify-between">
        <span className="normal-case">{t.hero.index}</span>
        <span>{t.hero.hint}</span>
        <span>
          {t.hero.rev} {__BUILD_DATE__}
        </span>
      </div>
    </section>
  )
}
