export function Esp({ tag }: { tag: string }) {
  return (
    <>
      <i aria-hidden="true" className="esp esp-tl" />
      <i aria-hidden="true" className="esp esp-tr" />
      <i aria-hidden="true" className="esp esp-bl" />
      <i aria-hidden="true" className="esp esp-br" />
      <span aria-hidden="true" className="esp-tag">
        {tag}
      </span>
    </>
  )
}
