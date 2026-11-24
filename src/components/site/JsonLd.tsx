/** Qidiruv tizimlari uçun tuzilgan maʼlumot. “<” belgisi qoçirilgan — matn ichidagi “</script>” sahifani buzmaydi. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
