import Image from "next/image";
import Link from "next/link";
import { getYouthLeaders } from "@/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import styles from "./Yetakchilar.module.css";
import { TelegramLogo, InstagramLogo, MapPin, ArrowRight } from "@phosphor-icons/react/ssr";

export const metadata = {
  title: "Yoshlar yetakchilari | O'zbekiston Yoshlar Ittifoqi",
};

export const revalidate = 60;

export default async function YouthLeadersPage() {
  // Ilgari bu yerda `leaders` (rahbariyat) ro'yxati chizilar, havolalar esa
  // /yetakchilar/[id] ga ketardi — ya'ni butunlay boshqa odamning sahifasiga.
  const youthLeaders = await getYouthLeaders();

  return (
    <>
      <PageHeader
        label="Yetakchilar"
        title="Tuman yetakchilari"
        description="Poytaxt tumanlaridagi faol yoshlar yetakchilari bilan tanishing. Ular bilan o'z tumaningizdagi loyihalarda ishtirok eting."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Yoshlar yetakchilari" }
        ]}
      />

      <div className="container page-body">
      <div className={styles.grid}>
        {youthLeaders.map((item) => (
          <Link href={`/yetakchilar/${item.id}`} key={item.id} className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className={styles.imgWrap}>
              <span className={styles.districtBadge}>{item.category} yetakchisi</span>
              <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
              
              {/* Socials on hover */}
              <div className={styles.socialsHover}>
                <span className={`${styles.socialBtn} ${styles.telegram}`}>
                  <TelegramLogo weight="duotone" />
                </span>
                <span className={`${styles.socialBtn} ${styles.instagram}`}>
                  <InstagramLogo weight="duotone" />
                </span>
              </div>
            </div>

            <div className={styles.body}>
              <h3>{item.name}</h3>
              <p className={styles.location}>
                <MapPin weight="duotone" /> {item.place}
              </p>

              <div className={styles.actionBtn}>
                Bog'lanish <ArrowRight weight="duotone" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </>
  );
}
