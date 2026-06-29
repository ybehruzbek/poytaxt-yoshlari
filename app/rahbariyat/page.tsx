import Image from "next/image";
import Link from "next/link";
import { leaders } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import styles from "./Rahbariyat.module.css";

export const metadata = {
  title: "Rahbariyat | O'zbekiston Yoshlar Ittifoqi",
};

export default function LeadershipPage() {
  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <PageHeader 
        label="Rahbariyat"
        title="Mas'ul rahbarlar"
        description="Toshkent shahar Yoshlar Ittifoqi Kengashining tajribali va shijoatli jamoasi bilan yaqindan tanishing."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Rahbariyat" }
        ]}
      />
      
      <div className={styles.grid}>
        {leaders.map(item => (
          <Link href={`/rahbariyat/${item.id}`} key={item.id} className={styles.card}>
            <div className={styles.imgWrap}>
              <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
              
              {/* Premium Socials on Hover */}
              <div className={styles.socialsHover}>
                <span className={`${styles.socialBtn} ${styles.instagram}`}>
                  <i className="fab fa-instagram" />
                </span>
                <span className={`${styles.socialBtn} ${styles.telegram}`}>
                  <i className="fab fa-telegram-plane" />
                </span>
              </div>
            </div>
            
            <div className={styles.body}>
              <h3>{item.name}</h3>
              <p>{item.position}</p>
              
              <div className={styles.actionBtn}>
                To'liq ma'lumot <i className="fas fa-arrow-right" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
