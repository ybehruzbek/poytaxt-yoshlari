import Link from "next/link";
import Image from "next/image";
import styles from "./Rahbariyat.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { leaders, youthLeaders } from "@/lib/data";
import RahbariyatHero from "@/components/RahbariyatHero/RahbariyatHero";
import RahbariyatIntro from "@/components/RahbariyatIntro/RahbariyatIntro";
import RahbariyatApparat from "@/components/RahbariyatApparat/RahbariyatApparat";
import RahbariyatHeroes from "@/components/RahbariyatHeroes/RahbariyatHeroes";
import NavigationCards from "@/components/NavigationCards/NavigationCards";

export const metadata = {
  title: "Rahbariyat | O'zbekiston Yoshlar Ittifoqi",
  description: "Toshkent shahar Yoshlar Ittifoqi Kengashi rahbariyati, apparat tuzilmasi va joylardagi yetakchilar bilan tanishing.",
};



export default function LeadershipPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* ===== 1. EPIC HERO SECTION ===== */}
      <RahbariyatHero />

      {/* ===== 2. QUOTE SECTION ===== */}
      <RahbariyatIntro />

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
      <RahbariyatApparat />

      {/* ===== 5. LOCAL YOUTH LEADERS ===== */}
      <RahbariyatHeroes />

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

      {/* ===== 7. CONTINUE NAVIGATION ===== */}
      <NavigationCards />
    </div>
  );
}
