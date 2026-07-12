import Link from "next/link";
import Image from "next/image";
import styles from "./Tarix.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TarixHero from "@/components/TarixHero/TarixHero";
import TarixIntro from "@/components/TarixIntro/TarixIntro";
import TarixStats from "@/components/TarixStats/TarixStats";
import NavigationCards from "@/components/NavigationCards/NavigationCards";
import { ArrowRight } from "@phosphor-icons/react/ssr";

export const metadata = {
  title: "Boy Tariximiz | O'zbekiston Yoshlar Ittifoqi",
  description: "O'zbekiston Yoshlar Ittifoqining shakllanishidan tortib bugungi kunga qadar bosib o'tgan ulkan yo'li va erishgan natijalari.",
};

const historyData = [
  {
    year: "2017",
    events: [
      {
        date: "30 Iyun, 2017 yil",
        title: "Buyuk O'zgarish va Yangi Ibtido",
        image: "/news-strategy.png",
        desc: [
          "O'zbekiston yoshlari hayotida mutlaqo yangi davr boshlandi. Eskirgan yondashuv va qoliplardan voz kechilib, yoshlarning dardini tushunadigan, ularning real muammolariga yechim topadigan tamoman yangi tuzilma – O'zbekiston Yoshlar Ittifoqi rasman tashkil etildi.",
          "Davlat rahbarining tashabbusi bilan ushbu sana mamlakatimizda rasman «Yoshlar kuni» sifatida qabul qilindi. Bu shunchaki tashkilot emas, butun mamlakat bo'ylab millionlab yoshlarni yagona maqsad yo'lida birlashtiruvchi markazga aylandi."
        ]
      }
    ]
  },
  {
    year: "2018",
    events: [
      {
        date: "27 Iyun, 2018 yil",
        title: "\"Yoshlar - Kelajagimiz\" Davlat Dasturi",
        image: "/news-education.png",
        desc: [
          "Ittifoq tashabbusi va qat'iy sa'y-harakatlari bilan yoshlarning iqtisodiy mustaqilligini ta'minlashga qaratilgan misli ko'rilmagan davlat dasturi qabul qilindi.",
          "Yoshlarning biznes startaplari, innovatsion g'oyalari va tadbirkorlik tashabbuslarini qo'llab-quvvatlash uchun yuzlab milliard so'mlik imtiyozli kreditlar ajratildi. O'zbekiston bo'ylab minglab yoshlar qisqa muddatda o'z shaxsiy bizneslariga asos soldilar va minglab yangi ish o'rinlari yaratildi."
        ]
      },
      {
        date: "Avgust, 2018 yil",
        title: "Yoshlar Parlamenti va Siyosiy Iroda",
        image: "/login-bg-1920.jpeg",
        desc: [
          "Qaror qabul qilish jarayonlarida va qonun ijodkorligida bevosita yoshlarning faol ishtirokini ta'minlash maqsadida Oliy Majlis huzurida yoshlar tuzilmalari va parlamentlari shakllantirildi."
        ]
      }
    ]
  },
  {
    year: "2019",
    events: [
      {
        date: "Mart, 2019 yil",
        title: "Tarixiy \"Besh Muhim Tashabbus\"",
        image: "/news-hackathon.png",
        desc: [
          "Yangi O'zbekiston tarixida ta'lim va ma'naviyatning tub burilish davri. O'zbekiston Yoshlar Ittifoqi tomonidan mamlakatning har bir hududida san'at, sport, IT, kitobxonlik va qizlar bandligini o'z ichiga olgan «Besh muhim tashabbus» amaliyotga tatbiq etildi.",
          "Chekka qishloqlardagi minglab maktablar raqamli texnologiyalar, elektron kutubxonalar va zamonaviy sport anjomlari bilan ta'minlanib, olis hududlardagi iste'dodlarni kashf qilish ishlari boshlandi."
        ]
      }
    ]
  },
  {
    year: "2020",
    events: [
      {
        date: "Aprel - Noyabr, 2020 yil",
        title: "Pandemiya Sinovi va Volontyorlar",
        image: "/news-sports.png",
        desc: [
          "Koronavirus pandemiyasi va karantin davrida Yoshlar Ittifoqining qanchalik zarur tashkilot ekanligi amalda isbotlandi. Bir necha kun ichida 10 000 dan ortiq yosh ko'ngillilar (volontyorlar) birlashdi.",
          "«Saxovat va Ko'mak» umumxalq harakati doirasida Ittifoq a'zolari o'z hayotlarini xavf ostiga qo'yib bo'lsa-da, yuz minglab ehtiyojmand oilalarga beminnat va uzluksiz oziq-ovqat, dori-darmon tarqatishda yetakchilik qildilar."
        ]
      }
    ]
  },
  {
    year: "2024",
    events: [
      {
        date: "Bugungi kun",
        title: "Tizimli Yangilanish va Inson Kapitali",
        image: "/login-bg.jpg",
        desc: [
          "Bugun O'zbekiston Yoshlar Ittifoqi — xalqaro tajribalarga tayangan, korrupsiyadan holi, raqamli va mutlaqo zamonaviy inson kapitalini shakllantiruvchi yirik klaster hisoblanadi.",
          "Biz «Mahallabay» ishlash tizimi orqali Toshkent shahri va butun respublikadagi har bir ko'cha, har bir xonadondagi yigit-qizning dardi bilan yashaydigan hamda ularga zamonaviy IT-kasblar, xorijiy tillarni o'rganishda cheksiz imkoniyat eshiklarini ochuvchi tashkilotga aylandik."
        ]
      }
    ]
  }
];

export default function HistoryPage() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* ===== 1. HERO SECTION ===== */}
      <TarixHero />

      {/* ===== 2. ORIGIN INTRO ===== */}
      <TarixIntro />

      {/* ===== 3. STICKY TIMELINE WITH IMAGES (EDITORIAL) ===== */}
      <section className={styles.chronologySection}>
        <div className="container">
          {historyData.map((data, index) => (
            <div key={index} className={styles.yearBlock}>
              
              {/* Sticky Year Column */}
              <div className={styles.yearStickyCol}>
                <ScrollReveal>
                  <h3 className={styles.yearLarge}>{data.year}</h3>
                </ScrollReveal>
              </div>

              {/* Scrolling Events Column with Images */}
              <div className={styles.yearContentCol}>
                {data.events.map((event, i) => (
                  <ScrollReveal key={i} delay={i + 1}>
                    <div className={styles.eventCard}>
                      
                      {/* Image section */}
                      <div className={styles.eventImageWrap}>
                        <Image src={event.image} alt={event.title} fill sizes="(max-width: 900px) 100vw, 500px" />
                      </div>

                      {/* Content section */}
                      <div className={styles.eventContentBox}>
                        <span className={styles.eventDate}>{event.date}</span>
                        <h4 className={styles.eventTitle}>{event.title}</h4>
                        <div className={styles.eventDesc}>
                          {event.desc.map((para, pIndex) => (
                            <p key={pIndex}>{para}</p>
                          ))}
                        </div>
                      </div>
                      
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              
            </div>
          ))}
        </div>
      </section>

      {/* ===== 4. STATS GRID ===== */}
      <TarixStats />

      {/* ===== 5. CTA SECTION (MODERN BENTO) ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaCardContent}>
              <ScrollReveal>
                <h2 className={styles.ctaTitle}>Tarix davom etadi!</h2>
                <p className={styles.ctaDesc}>
                  Siz o'qiyotgan bu tarix sahifalarining davomini yozish navbati endi sizga keldi. 
                  Safimizga qo'shiling, loyihalarimizda qatnashib, o'z taqdiringizni biz bilan birga yarating.
                </p>
                <Link href="/loyihalar" className={styles.ctaButton}>
                  <span>Tashkilot loyihalari bilan tanishish</span>
                  <div className={styles.btnIcon}>
                    <ArrowRight weight="duotone" />
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      {/* ===== 6. NAVIGATION CARDS ===== */}
      <NavigationCards
        items={[
          {
            id: "01",
            title: "Missiya va Qadriyatlar",
            desc: "Ittifoqimizning asosiy maqsad va qadriyatlari, tamoyillari hamda strategik yo'nalishlarimiz bilan tanishing.",
            href: "/tashkilot/missiya",
            image: "/images/tashkilot/tashkilot_chairman_1782907129930.png"
          },
          {
            id: "02",
            title: "Tashkilot haqida",
            desc: "O'zbekiston Yoshlar Ittifoqi umumiy tuzilmasi, maqsadlari va asosiy arxitekturasi bilan tanishing.",
            href: "/tashkilot",
            image: "/images/tashkilot/tashkilot_hero_1782907121959.png"
          },
          {
            id: "03",
            title: "Rasmiy Hujjatlar",
            desc: "Tashkilot faoliyatiga oid barcha qarorlar, nizomlar va huquqiy hujjatlar bilan tanishing.",
            href: "/hujjatlar",
            image: "/images/tashkilot/tashkilot_impact_1782907138342.png"
          }
        ]}
      />

    </div>
  );
}
