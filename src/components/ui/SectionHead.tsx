interface SectionHeadProps {
  index: string
  label: string
  title?: string
}

export function SectionHead({ index, label, title }: SectionHeadProps) {
  return (
    <>
      <div className="label mb-8 flex gap-5 text-muted md:mb-10">
        <span className="text-accent normal-case">{index}</span>
        <span>{label}</span>
      </div>
      {title && <h2 className="display text-[40px] md:text-[64px]">{title}</h2>}
    </>
  )
}
