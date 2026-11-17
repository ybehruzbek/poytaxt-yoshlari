/** Silliq aylantiriş faqat “harakatni kamaytiriş”, öqiş va yengil rejim öçiq bölsa; aks holda — darhol */
export function smoothScroll(el: Element | null | undefined, opts: ScrollIntoViewOptions = {}) {
  if (!el) return
  const html = document.documentElement
  const still =
    matchMedia('(prefers-reduced-motion: reduce)').matches ||
    html.hasAttribute('data-a11y-read') ||
    html.hasAttribute('data-lite')
  el.scrollIntoView({ ...opts, behavior: still ? 'auto' : 'smooth' })
}
