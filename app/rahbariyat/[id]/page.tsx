import { notFound } from "next/navigation";
import RichText from "@/components/ui/RichText";
import ProfileDetail, { type ProfileSocial } from "@/components/ui/ProfileDetail/ProfileDetail";
import styles from "@/components/ui/ProfileDetail/ProfileDetail.module.css";
import { getLeaderById, getLeaders } from "@/lib/queries";
import { parseReceptionDays } from "@/lib/format";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getLeaderById(id);
  if (!item) return { title: "Topilmadi" };
  return {
    title: `${item.name} | O'zbekiston Yoshlar Ittifoqi`,
    description: item.position,
  };
}

export async function generateStaticParams() {
  const leaders = await getLeaders();
  return leaders.map((item) => ({ id: item.id }));
}

export default async function SingleLeaderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getLeaderById(id);

  if (!item) {
    notFound();
  }

  const receptionDays = parseReceptionDays(item.receptionDays);

  // Faqat kiritilgan havolalar ko'rsatiladi — ilgari bu yerda uchta bo'sh `href="#"` turardi.
  const socials: ProfileSocial[] = [];
  if (item.telegram) {
    socials.push({ href: item.telegram, icon: "fab fa-telegram-plane", label: "Telegram", variant: "blue" });
  }
  if (item.instagram) {
    socials.push({ href: item.instagram, icon: "fab fa-instagram", label: "Instagram", variant: "pink" });
  }
  if (item.email) {
    socials.push({ href: `mailto:${item.email}`, icon: "fas fa-envelope", label: "Email", variant: "green" });
  }

  return (
    <ProfileDetail
      backHref="/rahbariyat"
      backLabel="Rahbariyatga qaytish"
      image={item.image}
      imageAlt={item.name}
      badge="Toshkent shahar kengashi"
      name={item.name}
      subtitle={item.position}
      socials={socials}
    >
      {item.bio && (
        <>
          <h2 className={styles.sectionHeading}>Biografiya</h2>
          <RichText text={item.bio} style={{ marginBottom: "16px" }} />
        </>
      )}

      {receptionDays.length > 0 && (
        <>
          <h2 className={styles.sectionHeadingSpaced}>Qabul kunlari</h2>
          <div className={styles.infoCard}>
            {receptionDays.map(({ day, time }) => (
              <div key={day} className={styles.receptionRow}>
                <span className={styles.receptionDay}>{day}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </ProfileDetail>
  );
}
