import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import EventCard from "@/components/EventCard/EventCard";
import { EVENT_TYPES } from "@/lib/admin/resources";
import { getPastEvents, getUpcomingEvents } from "@/lib/queries";
import { Lightning, Calendar, ClockCounterClockwise } from "@phosphor-icons/react/ssr";
import styles from "./Tadbirlar.module.css";

export const metadata = {
  title: "Tadbirlar | O'zbekiston Yoshlar Ittifoqi",
  description:
    "Toshkent yoshlari uchun tadbirlar: tanlovlar, forumlar, seminarlar va volontyorlik aksiyalari. Onlayn ro'yxatdan o'ting.",
};

export const revalidate = 60;

export default async function TadbirlarPage({
  searchParams,
}: {
  searchParams: Promise<{ turi?: string }>;
}) {
  const { turi } = await searchParams;
  const activeType = EVENT_TYPES.find((t) => t === turi) ?? null;

  const [upcomingAll, pastAll] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);
  const upcoming = activeType
    ? upcomingAll.filter((e) => e.type === activeType)
    : upcomingAll;
  const past = activeType
    ? pastAll.filter((e) => e.type === activeType)
    : pastAll;

  return (
    <div className={styles.page}>
      <PageHeader
        label="Tadbirlar"
        title="Yoshlar hayotidagi muhim voqealar"
        description="Tanlovlar, forumlar, seminarlar va volontyorlik aksiyalari — ishtirok eting, ro'yxatdan o'ting, rivojlaning."
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: "Tadbirlar" }]}
      />

      <div className="container">
        <div className={styles.filters}>
          <Link
            href="/tadbirlar"
            className={`${styles.filterChip}${!activeType ? ` ${styles.filterChipActive}` : ""}`}
          >
            Barchasi
          </Link>
          {EVENT_TYPES.map((type) => (
            <Link
              key={type}
              href={`/tadbirlar?turi=${encodeURIComponent(type)}`}
              className={`${styles.filterChip}${activeType === type ? ` ${styles.filterChipActive}` : ""}`}
            >
              {type}
            </Link>
          ))}
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Lightning weight="duotone" /> Bo&apos;lajak tadbirlar
          </h2>
          {upcoming.length === 0 ? (
            <div className={styles.empty}>
              <Calendar weight="duotone" />
              Hozircha {activeType ? `«${activeType}» turida ` : ""}bo&apos;lajak
              tadbir yo&apos;q. Tez orada yangilari e&apos;lon qilinadi.
            </div>
          ) : (
            <div className={styles.grid}>
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <ClockCounterClockwise weight="duotone" /> O&apos;tgan tadbirlar
            </h2>
            <div className={styles.grid}>
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
