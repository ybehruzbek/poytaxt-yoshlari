import { notFound } from "next/navigation";
import RichText from "@/components/ui/RichText";
import ProfileDetail, { type ProfileSocial } from "@/components/ui/ProfileDetail/ProfileDetail";
import styles from "@/components/ui/ProfileDetail/ProfileDetail.module.css";
import { getYouthLeaderById, getYouthLeaders } from "@/lib/queries";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getYouthLeaderById(id);
  if (!item) return { title: "Topilmadi" };
  return {
    title: `${item.name} | O'zbekiston Yoshlar Ittifoqi`,
    description: `${item.category} yetakchisi — ${item.place}`,
  };
}

export async function generateStaticParams() {
  const items = await getYouthLeaders();
  return items.map((item) => ({ id: item.id }));
}

export default async function SingleYouthLeaderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getYouthLeaderById(id);

  if (!item) {
    notFound();
  }

  const socials: ProfileSocial[] = [];
  if (item.telegram) {
    socials.push({ href: item.telegram, icon: "fab fa-telegram-plane", label: "Telegram", variant: "blue" });
  }
  if (item.instagram) {
    socials.push({ href: item.instagram, icon: "fab fa-instagram", label: "Instagram", variant: "pink" });
  }

  return (
    <ProfileDetail
      backHref="/yetakchilar"
      backLabel="Yetakchilarga qaytish"
      image={item.image}
      imageAlt={item.name}
      imagePosition="center top"
      badge={`${item.category} yetakchisi`}
      name={item.name}
      subtitle={<><i className="fas fa-map-marker-alt" /> {item.place}</>}
      socials={socials}
    >
      {item.bio && (
        <>
          <h2 className={styles.sectionHeading}>Faoliyati</h2>
          <RichText text={item.bio} style={{ marginBottom: "16px" }} />
        </>
      )}
    </ProfileDetail>
  );
}
