/**
 * Hamkor taşkilotlar — Kengaş birgalikda işlaydigan vazirlik, idora va taşkilotlar.
 * Logotiplar har bir taşkilotning öz rasmiy saytidan olingan (public/img/hamkorlar).
 * Yangi hamkor qöşiş uçun röyxatga bitta yozuv va logotip fayli qöşiladi.
 */
export type Partner = {
  /** töliq rasmiy nomi */
  name: string
  /** logotip (eni böyiça kengroq bölsa ham bölaveradi — balandlikka moslanadi) */
  logo: string
  /** rasmiy sayti */
  site: string
  /** saytning qisqa körinişi */
  domain: string
  /** birgalikdagi faoliyat */
  what: string
}

export const PARTNERS: Partner[] = [
  {
    name: 'Özbekiston Respublikasi Yoşlar işlari agentligi',
    logo: '/img/hamkorlar/yoshlar-ishlari-agentligi.webp',
    site: 'https://yoshlar.gov.uz',
    domain: 'yoshlar.gov.uz',
    what: 'Yoşlarga oid davlat siyosatini amalga oşiruvçi vakolatli davlat organi. Yoşlar uçun dasturlar, tanlovlar va “Yoşlar daftari” böyiça hamkorlikda işlaymiz.',
  },
  {
    name: 'Özbekiston Respublikasi Taʼlim va ilm-fan vazirligi',
    logo: '/img/hamkorlar/talim-va-ilm-fan-vazirligi.webp',
    site: 'https://edu.uz',
    domain: 'edu.uz',
    what: 'Oliy taʼlim taşkilotlaridagi Ittifoq boşlanğiç taşkilotlari faoliyatini birgalikda yölga qöyamiz, talaba yoşlar uçun tadbir va loyihalar ötkazamiz.',
  },
]
