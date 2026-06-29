import Image from "next/image";
import Link from "next/link";
import { leaders } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import styles from "./Yetakchilar.module.css";

export const metadata = {
  title: "Yoshlar yetakchilari | O'zbekiston Yoshlar Ittifoqi",
};

export default function YouthLeadersPage() {
  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <PageHeader 
        label="Yetakchilar"
        title="Tuman yetakchilari"
        description="Poytaxt tumanlaridagi faol yoshlar yetakchilari bilan tanishing. Ular bilan o'z tumaningizdagi loyihalarda ishtirok eting."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Yoshlar yetakchilari" }
        ]}
      />
      
      <div className={styles.grid}>
        {leaders.map((item, i) => (
          <Link href={`/yetakchilar/${item.id}`} key={item.id} className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className={styles.imgWrap}>
              <span className={styles.districtBadge}>Tuman yetakchisi</span>
              <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
              
              {/* Socials on hover */}
              <div className={styles.socialsHover}>
                <span className={`${styles.socialBtn} ${styles.telegram}`}>
                  <i className="fab fa-telegram-plane" />
                </span>
                <span className={`${styles.socialBtn} ${styles.instagram}`}>
                  <i className="fab fa-instagram" />
                </span>
              </div>
            </div>
            
            <div className={styles.body}>
              <h3>{item.name}</h3>
              <p className={styles.location}>
                <i className="fas fa-map-marker-alt" /> Toshkent shahar
              </p>
              
              <div className={styles.actionBtn}>
                Bog'lanish <i className="fas fa-arrow-right" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
