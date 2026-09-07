import { Esp } from '@/components/ui/Esp'
import { SectionHead } from '@/components/ui/SectionHead'
import { useLanguage } from '@/i18n'

export function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="border-t border-line px-[var(--gutter)] py-14 md:py-24">
      <SectionHead index={t.experience.index} label={t.experience.label} />
      <div className="reveal grid gap-7 min-[1280px]:grid-cols-[400px_minmax(0,1fr)] min-[1280px]:items-start min-[1280px]:gap-[72px]">
        <h2 className="display text-[40px] md:text-[64px]">{t.experience.title}</h2>
        <div className="flex flex-col">
          {t.experience.items.map((item) => (
            <article
              key={item.tag}
              className="group relative grid gap-2 border-t border-line py-6 last:border-b md:grid-cols-[160px_minmax(0,1fr)] md:gap-8 md:py-8"
            >
              <Esp tag={item.tag} />
              <div className="text-[13px] tracking-[0.06em] text-accent md:pt-1">{item.when}</div>
              <div>
                <h3 className="text-[20px] leading-snug font-semibold">{item.role}</h3>
                <p className="mt-1.5 text-[14px] text-muted">{item.org}</p>
                {item.text && <p className="mt-3.5">{item.text}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
