/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import type { Locale } from '@/i18n/config'

/** Biz haqimizda va raqamlar. ittifoq/index.html prototipidan avtomatik ko'chirilgan — dizaynni o'zgartirmang. */
export function About(_props: { locale: Locale }) {
  return (
    <>
<section className="sec" id="biz-haqimizda">
  <div className="wrap">
    <div className="about-head">
      <h2 className="h2">Biz Toshkent yoshlarining ovozi, tashabbusi <span className="mute">va g‘oyalarini qo‘llab-quvvatlaymiz, ularni real loyihalarga aylantiramiz.</span></h2>
      <div className="about-art" aria-hidden="true">
        <svg style={{ left: "6px", top: "15px", width: "166px" }} viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#43A574" strokeWidth="20" /></svg>
        <svg style={{ left: "213px", top: "25px", width: "32px" }} viewBox="0 0 40 40"><path fill="#43A574" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" /></svg>
        <svg style={{ left: "300px", top: "22px", width: "92px", transform: "rotate(18deg)" }} viewBox="0 0 100 100"><path fill="#FF854B" d="M50 2l8 9 12-4 3 12 12 2-3 12 10 8-9 8 6 11-12 4 1 12-12-1-4 12-11-6-8 9-8-9-11 6-4-12-12 1 1-12-12-4 6-11-9-8 10-8-3-12 12-2 3-12 12 4z" /></svg>
        <div style={{ left: "14px", top: "210px", width: "145px", height: "116px", background: "var(--sky)", borderRadius: "32px 32px 32px 136px", transform: "rotate(-157deg)" }}></div>
        <div style={{ left: "184px", top: "106px", width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", background: "var(--navy)", transform: "rotate(-17deg)" }}><img className="cover" src="/img/about-3.jpg" alt="" /></div>
        <svg style={{ left: "165px", top: "250px", width: "60px", transform: "rotate(-28deg)" }} viewBox="0 0 40 40"><path fill="#89C0FF" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" /></svg>
        <div style={{ left: "214px", top: "250px", width: "180px", height: "90px", borderRadius: "0 0 90px 90px", background: "var(--lime)", transform: "rotate(-40deg)" }}></div>
      </div>
    </div>
    <div className="about-row">
      <div className="ach">
        {/* Raqamlar NAMUNA: kengashning rasmiy ma'lumotlari bilan almashtiring */}
        <div><b data-namuna>100+</b><span>Boshlang‘ich tashkilotlar</span></div>
        <div><b data-namuna>150+</b><span>Yillik tadbirlar</span></div>
        <div><b data-namuna>40+</b><span>Hamkor tashkilotlar</span></div>
      </div>
      <p className="body4">Kengash faoliyati, poytaxt oliy ta’lim muassasalari va boshqa tuzilmalardagi boshlang‘ich tashkilotlar hayoti, yoshlarga poytaxt va davlat siyosati darajasida yaratilayotgan imkoniyatlar — barchasi shu yerda.</p>
    </div>
  </div>
</section>
    </>
  )
}
