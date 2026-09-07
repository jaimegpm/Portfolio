import { ArrowIcon } from '@/components/ui/icons'
import { SectionHead } from '@/components/ui/SectionHead'
import { profile } from '@/data/profile'
import { useLanguage } from '@/i18n'

export function Contact() {
  const { t } = useLanguage()
  const links = [
    { label: t.contact.github, href: profile.github, external: true },
    { label: t.contact.linkedin, href: profile.linkedin, external: true },
    { label: t.contact.cv, href: profile.cv, external: false },
  ]

  return (
    <section id="contact" className="border-t border-line px-[var(--gutter)] py-14 md:py-24">
      <SectionHead index={t.contact.index} label={t.contact.label} title={t.contact.title} />
      <div className="reveal">
        <p className="mt-6 text-[17px] md:text-[20px]">{t.contact.text}</p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block border-b-2 border-accent pb-1.5 text-[20px] leading-tight font-medium break-all transition-colors duration-[var(--dur-fast)] hover:text-accent md:mt-9 md:text-[40px]"
        >
          {profile.email}
        </a>
        <div className="label mt-8 flex flex-wrap gap-5 md:gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex items-center gap-2.5 text-muted transition-colors duration-[var(--dur-fast)] hover:text-accent"
            >
              {link.label} <ArrowIcon />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
