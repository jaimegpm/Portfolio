import { SectionHead } from '@/components/ui/SectionHead'
import { stack, type LayerId } from '@/data/stack'
import { useLanguage } from '@/i18n'

const LAYERS: readonly LayerId[] = ['backend', 'low', 'frontend', 'tools']

export function Stack() {
  const { t } = useLanguage()

  return (
    <section id="stack" className="border-t border-line px-[var(--gutter)] py-14 md:py-24">
      <SectionHead index={t.stack.index} label={t.stack.label} title={t.stack.title} />
      <div className="reveal mt-8 grid grid-cols-2 gap-6 md:mt-12 md:grid-cols-4 md:gap-12">
        {LAYERS.map((layer) => (
          <div key={layer}>
            <h3 className="label mb-4 font-semibold text-accent">{t.stack.layers[layer]}</h3>
            <ol className="numbered">
              {stack[layer].map((item) => (
                <li key={item} className="flex gap-4 border-t border-line py-2.5 last:border-b">
                  {item}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  )
}
