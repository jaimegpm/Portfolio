import { AppFrame } from '@/components/featured/AppFrame'
import { Esp } from '@/components/ui/Esp'
import { SectionHead } from '@/components/ui/SectionHead'
import { useLanguage } from '@/i18n'

export function Featured() {
  const { t, lang } = useLanguage()
  const { featured } = t

  return (
    <section className="border-t border-line px-[var(--gutter)] py-14 md:py-24">
      <SectionHead index={featured.index} label={featured.label} />
      <div className="reveal grid grid-cols-1 gap-8 min-[1440px]:grid-cols-[440px_minmax(0,1fr)] min-[1440px]:items-start min-[1440px]:gap-[64px]">
        <div className="min-w-0">
          <h2 className="display text-[40px] md:text-[56px]">{featured.title}</h2>
          <p className="mt-6 text-[20px] leading-normal">{featured.lede}</p>
          <p className="mt-5">{featured.text}</p>
          <dl className="mt-6 grid grid-cols-[110px_minmax(0,1fr)] text-[13px] md:grid-cols-[130px_minmax(0,1fr)]">
            {featured.spec.map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="label border-t border-line pt-3.5 pb-2.5 text-[11px] text-muted">{key}</dt>
                <dd className="border-t border-line py-2.5">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="label mt-7 flex flex-wrap gap-6 text-muted">
            {featured.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-muted">{featured.frame.hint}</p>
        </div>

        <div className="group relative min-w-0">
          <Esp tag={featured.tag} />
          <AppFrame key={lang} label={featured.frame.summary} />
        </div>
      </div>
    </section>
  )
}
