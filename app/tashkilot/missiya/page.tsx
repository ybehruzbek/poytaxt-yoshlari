import styles from "@/components/About/About.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutCards } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Missiya va qadriyatlar | O'zbekiston Yoshlar Ittifoqi",
};

export default function MissionPage() {
  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <PageHeader 
        label="Tashkilot"
        title="Missiya va Qadriyatlar"
        description="O'zbekiston Yoshlar Ittifoqi — yoshlarning huquq va manfaatlarini himoya qiluvchi, ularning g'oya va tashabbuslarini qo'llab-quvvatlaydigan va ro'yobga chiqaradigan eng yirik hamda ishonchli jamoat tashkilotidir."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Tashkilot haqida", href: "/tashkilot" },
          { label: "Missiya" }
        ]}
      />
      
      <div className={styles.bentoGrid} style={{ marginTop: '40px' }}>
        {aboutCards.map((card, i) => (
          <ScrollReveal key={i} delay={i + 1} className={`${styles.bentoCard} ${styles.missionCard}`}>
            <div className={`${styles.missionIcon} ${styles[card.iconClass]}`}>
              <i className={`fas ${card.icon}`} />
            </div>
            <div>
              <h3 className={styles.missionTitle}>{card.title}</h3>
              <p className={styles.missionDesc}>{card.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
