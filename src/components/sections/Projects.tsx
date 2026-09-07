import { Esp } from '@/components/ui/Esp'
import { ArrowIcon } from '@/components/ui/icons'
import { SectionHead } from '@/components/ui/SectionHead'
import { eclipseProjects, otherProjects, type Project } from '@/data/projects'
import { useLanguage } from '@/i18n'

function ProjectLinks({ project }: { project: Project }) {
  const { t } = useLanguage()
  if (!project.repo && !project.site) return null
  return (
    <div className="label flex gap-6 text-[12px]">
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent hover:text-fg">
          {t.projects.code} <ArrowIcon />
        </a>
      )}
      {project.site && (
        <a href={project.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent hover:text-fg">
          {t.projects.site} <ArrowIcon />
        </a>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useLanguage()
  return (
    <article className="group relative flex min-h-[260px] flex-col gap-3.5 border border-line bg-bg p-6 md:p-8">
      <Esp tag={`${project.index} · ${project.name.toLowerCase()}`} />
      <div className="label flex justify-between text-muted">
        <span className="text-accent normal-case">{project.index}</span>
        <span>{t.projects.access[project.access]}</span>
      </div>
      <h3 className="text-[20px] leading-snug font-semibold">{project.name}</h3>
      <p>{project.tagline[lang]}</p>
      <p className="text-[14px] text-muted">{project.text[lang]}</p>
      {project.tos && <p className="text-[13px] text-muted">{t.projects.tos}</p>}
      <p className="mt-auto pt-3 text-[12px] tracking-[0.06em] text-muted">{project.stack.join(' · ')}</p>
      <ProjectLinks project={project} />
    </article>
  )
}

export function Projects() {
  const { t, lang } = useLanguage()

  return (
    <section id="projects" className="border-t border-line px-[var(--gutter)] py-14 md:py-24">
      <SectionHead index={t.projects.index} label={t.projects.label} title={t.projects.title} />
      <p className="mt-6 max-w-[600px] text-[17px]">{t.projects.lede}</p>

      <div className="reveal mt-10 grid gap-6 md:grid-cols-2">
        {eclipseProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="reveal mt-20 md:mt-24">
        <h3 className="display text-[28px] md:text-[40px]">{t.projects.othersTitle}</h3>
        <p className="mt-3 text-muted">{t.projects.othersLede}</p>
        <ul className="mt-8 border-t border-line">
          {otherProjects.map((project) => (
            <li
              key={project.id}
              className="grid gap-1.5 border-b border-line py-5 md:grid-cols-[64px_220px_minmax(0,1fr)_auto] md:items-baseline md:gap-6"
            >
              <span className="label text-accent normal-case">{project.index}</span>
              <span className="text-[16px] font-semibold">{project.name}</span>
              <span>
                <span>{project.tagline[lang]}. </span>
                <span className="text-muted">{project.text[lang]}</span>
                <span className="mt-1 block text-[12px] tracking-[0.06em] text-muted">{project.stack.join(' · ')}</span>
              </span>
              <span className="md:justify-self-end">
                <ProjectLinks project={project} />
                {!project.repo && !project.site && <span className="label text-[12px] text-muted">{t.projects.access[project.access]}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
