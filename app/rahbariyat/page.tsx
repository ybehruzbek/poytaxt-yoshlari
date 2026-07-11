import Link from "next/link";
import Image from "next/image";
import styles from "./Rahbariyat.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getLeaders, getYouthLeaders } from "@/lib/queries";
import { parseReceptionDays } from "@/lib/format";
import RahbariyatHero from "@/components/RahbariyatHero/RahbariyatHero";
import RahbariyatIntro from "@/components/RahbariyatIntro/RahbariyatIntro";
import RahbariyatApparat from "@/components/RahbariyatApparat/RahbariyatApparat";
import RahbariyatHeroes from "@/components/RahbariyatHeroes/RahbariyatHeroes";
import NavigationCards from "@/components/NavigationCards/NavigationCards";

export const metadata = {
  title: "Rahbariyat | O'zbekiston Yoshlar Ittifoqi",
  description: "Toshkent shahar Yoshlar Ittifoqi Kengashi rahbariyati, apparat tuzilmasi va joylardagi yetakchilar bilan tanishing.",
};



export const revalidate = 60;

export default async function LeadershipPage() {
  const [leaders, youthLeaders] = await Promise.all([getLeaders(), getYouthLeaders()]);

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
            {leaders.map((leader, index) => {
              const receptionDays = parseReceptionDays(leader.receptionDays);
              return (
                <ScrollReveal key={leader.id} delay={index + 1}>
                  <Link href={`/rahbariyat/${leader.id}`} className={styles.leaderCard}>
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
                        {receptionDays.length > 0 && (
                          <li>
                            <i className="fas fa-calendar-check"></i>
                            <span>
                              Qabul kunlari: {receptionDays.map((r) => `${r.day} ${r.time}`).join(", ")}
                            </span>
                          </li>
                        )}
                        {leader.email && (
                          <li>
                            <i className="fas fa-envelope"></i>
                            <span>{leader.email}</span>
                          </li>
                        )}
                        {!leader.email && receptionDays.length === 0 && (
                          <li>
                            <i className="fas fa-arrow-right"></i>
                            <span>Batafsil profil</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 4. STRUCTURE (APPARAT) ===== */}
      <RahbariyatApparat />

      {/* ===== 5. LOCAL YOUTH LEADERS ===== */}
      <RahbariyatHeroes items={youthLeaders} />

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
