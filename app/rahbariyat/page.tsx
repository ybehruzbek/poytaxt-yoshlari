import Link from "next/link";
import Image from "next/image";
import styles from "./Rahbariyat.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { leaders, youthLeaders } from "@/lib/data";

export const metadata = {
  title: "Rahbariyat | O'zbekiston Yoshlar Ittifoqi",
  description: "Toshkent shahar Yoshlar Ittifoqi Kengashi rahbariyati, apparat tuzilmasi va joylardagi yetakchilar bilan tanishing.",
};

const apparatSections = [
  {
    icon: "fa-graduation-cap",
    title: "Ta'lim va Rivojlanish Bo'limi",
    desc: "Oliy va o'rta maxsus ta'lim muassasalaridagi yoshlar bilan ishlash, to'garaklar va intellektual tanlovlarni muvofiqlashtirish."
  },
  {
    icon: "fa-code",
    title: "IT va Innovatsiyalar",
    desc: "Yosh dasturchilarni qo'llab-quvvatlash, startap ekotizimi va zamonaviy raqamli loyihalarni amaliyotga joriy etish."
  },
  {
    icon: "fa-hands-holding-circle",
    title: "Ijtimoiy Himoya",
    desc: "Ehtiyojmand oilalar farzandlari, 'Yoshlar daftari' ga kiritilgan yoshlar bilan manzilli ishlash tizimi."
  },
  {
    icon: "fa-medal",
    title: "Sport va Salomatlik",
    desc: "Ommaviy sport tadbirlari, marafonlar va sog'lom turmush tarzini targ'ib qilish dasturlarini boshqarish."
  },
  {
    icon: "fa-briefcase",
    title: "Tadbirkorlik va Bandlik",
    desc: "Yoshlarni kasb-hunarga yo'naltirish, bandligini ta'minlash va biznes loyihalarini moliyalashtirishda ko'maklashish."
  },
  {
    icon: "fa-bullhorn",
    title: "Axborot xizmati",
    desc: "Tashkilot faoliyatini OAV va ijtimoiy tarmoqlarda yoritish, jamoatchilik bilan aloqalar o'rnatish."
  }
];

export default function LeadershipPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* ===== 1. EPIC HERO SECTION ===== */}
      <section className={styles.heroContainer}>
        <div className="container">
          <div className={styles.heroContent}>
            <ScrollReveal>
              <nav aria-label="breadcrumb" className={styles.heroBreadcrumbs}>
                <ol>
                  <li>
                    <Link href="/">Bosh sahifa</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li>
                    <Link href="/tashkilot">Tashkilot haqida</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li className={styles.activeCrumb}>
                    <span>Rahbariyat va Kengash</span>
                  </li>
                </ol>
              </nav>

              <h1 className={styles.heroTitle}>Kengash Rahbariyati</h1>
              <p className={styles.heroDesc}>
                Yoshlar manfaati yo'lida kun-u tun xizmat qilish, har bir murojaat ortidagi 
                inson taqdiriga daxldorlik hissi bilan yashash — bizning bosh maqsadimizdir.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== 2. QUOTE SECTION ===== */}
      <section className={styles.quoteSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.quoteContent}>
              <i className={`fas fa-quote-left ${styles.quoteIcon}`}></i>
              <h2 className={styles.quoteText}>
                "Rahbarlik bu — shunchaki kursida o'tirish emas. Bu yuz minglab yoshlarning taqdiri oldida javobgarlik va tinimsiz xizmat qilish deganidir."
              </h2>
              <div className={styles.quoteAuthor}>
                <div className={styles.quoteName}>Jasur Karimov</div>
                <div className={styles.quotePos}>Toshkent shahar Kengashi Raisi</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 3. MAIN LEADERS GRID ===== */}
      <section className={styles.leadersSection}>
        <div className="container">
          <div className={styles.leadersGrid}>
            {leaders.map((leader, index) => (
              <ScrollReveal key={leader.id} delay={index + 1}>
                <div className={styles.leaderCard}>
                  <div className={styles.leaderImageWrap}>
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className={styles.leaderInfo}>
                    <div className={styles.leaderPos}>{leader.position}</div>
                    <h3 className={styles.leaderName}>{leader.name}</h3>
                    
                    <ul className={styles.leaderContactList}>
                      <li>
                        <i className="fas fa-calendar-check"></i>
                        <span>Qabul kunlari: Seshanba, Payshanba 10:00-12:00</span>
                      </li>
                      <li>
                        <i className="fas fa-envelope"></i>
                        <span>info@yoshlartoshkent.uz</span>
                      </li>
                      <li>
                        <i className="fas fa-phone"></i>
                        <span>+998 71 233-55-77</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. STRUCTURE (APPARAT) ===== */}
      <section className={styles.structureSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Tuzilma</span>
              <h2 className={styles.sectionTitle}>Markaziy Apparat Bo'limlari</h2>
            </div>
          </ScrollReveal>

          <div className={styles.structureGrid}>
            {apparatSections.map((item, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <div className={styles.structureCard}>
                  <div className={styles.structureIcon}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <h3 className={styles.structureTitle}>{item.title}</h3>
                  <p className={styles.structureDesc}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. LOCAL YOUTH LEADERS ===== */}
      <section className={styles.localSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel} style={{ color: 'var(--green-pale)' }}>Qahramonlar</span>
              <h2 className={styles.sectionTitle}>Joylardagi Yetakchilarimiz</h2>
              <p className={styles.sectionDesc}>
                Yoshlar Ittifoqi faqatgina markaziy binoda emas, balki har bir mahalla, har bir oliygoh va maktabda eng ilg'or yoshlarimiz orqali faoliyat olib boradi.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.localGrid}>
            {youthLeaders.map((youth, index) => (
              <ScrollReveal key={youth.id} delay={index + 1}>
                <div className={styles.localCard}>
                  <div className={styles.localImage}>
                    <Image
                      src={youth.image}
                      alt={youth.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className={styles.localInfo}>
                    <span className={styles.localCat}>{youth.category}</span>
                    <h4 className={styles.localName}>{youth.name}</h4>
                    <p className={styles.localPlace}>{youth.place}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. CTA BANNER ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.ctaBox}>
              <h2 className={styles.ctaTitle}>Rahbar qabuliga yozilish</h2>
              <p className={styles.ctaDesc}>
                O'zingizni qiynayotgan masalalar, yangi innovatsion takliflar yoki muammolaringiz 
                bilan to'g'ridan-to'g'ri Kengash raisi qabuliga yozilishingiz mumkin. Biz ochiqmiz!
              </p>
              <Link href="/murojaat" className={styles.ctaBtn}>
                <span>Elektron murojaat yuborish</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
