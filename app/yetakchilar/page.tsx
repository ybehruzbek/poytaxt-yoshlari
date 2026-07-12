import { getYouthLeaders } from "@/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import YetakchilarClient from "./YetakchilarClient";
import styles from "./Yetakchilar.module.css";

export const metadata = {
  title: "Yoshlar yetakchilari | O'zbekiston Yoshlar Ittifoqi",
};

export const revalidate = 60;

export default async function YouthLeadersPage() {
  // Ilgari bu yerda `leaders` (rahbariyat) ro'yxati chizilar, havolalar esa
  // /yetakchilar/[id] ga ketardi — ya'ni butunlay boshqa odamning sahifasiga.
  const youthLeaders = await getYouthLeaders();

  return (
    <div className={styles.pageWrap}>
      <div className={`${styles.naqshBg} naqsh naqsh-yulduz`} aria-hidden="true" />

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
        <YetakchilarClient initialLeaders={youthLeaders} />
      </div>
    </div>
  );
}
