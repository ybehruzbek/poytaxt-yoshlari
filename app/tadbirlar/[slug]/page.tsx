import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import RichText from "@/components/ui/RichText";
import EventRegistrationForm from "@/components/EventRegistrationForm/EventRegistrationForm";
import { getEventBySlug, getEventSlugs } from "@/lib/queries";
import { uzDateTime, uzTime } from "@/lib/format";
import { Trophy, Calendar, Clock, MapPin, Buildings, Handshake, Users } from "@phosphor-icons/react/ssr";
import styles from "./TadbirDetail.module.css";

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await getEventSlugs();
  return events.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Tadbir topilmadi" };
  return {
    title: `${event.title} | Tadbirlar`,
    description: event.desc,
    openGraph: event.image ? { images: [event.image] } : undefined,
  };
}

export default async function TadbirDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const isPast = event.startsAt < new Date();
  const cancelled = event.status === "Bekor qilingan";
  const finished = event.status === "Yakunlangan" || isPast;
  const taken = event._count.registrations;
  const isFull = event.capacity > 0 && taken >= event.capacity;
  const canRegister = !cancelled && !finished && event.regOpen && !isFull;

  // Google'da tadbir rich-result chiqishi uchun (PLAN.md, yangi g'oyalar #3)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.desc,
    startDate: event.startsAt.toISOString(),
    ...(event.endsAt && { endDate: event.endsAt.toISOString() }),
    eventStatus: cancelled
      ? "https://schema.org/EventCancelled"
      : "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
      address: event.location,
    },
    organizer: { "@type": "Organization", name: event.organizer },
    ...(event.image && { image: [event.image] }),
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        label={event.type}
        title={event.title}
        description={event.desc}
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Tadbirlar", href: "/tadbirlar" },
          { label: event.title },
        ]}
      />

      <div className="container">
        <div className={styles.layout}>
          <article className={styles.main}>
            {event.image && (
              <div className={styles.banner}>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className={styles.bannerImage}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            )}
            <div className={styles.body}>
              <div className={styles.badges}>
                <span className={styles.badge}>{event.type}</span>
                {cancelled && (
                  <span className={`${styles.badge} ${styles.badgeCancelled}`}>
                    Bekor qilingan
                  </span>
                )}
                {finished && !cancelled && (
                  <span className={`${styles.badge} ${styles.badgeDone}`}>
                    Yakunlangan
                  </span>
                )}
              </div>

              <RichText
                text={event.content || event.desc}
                className={styles.paragraph}
              />

              {event.results && (
                <div className={styles.resultsBox}>
                  <div className={styles.resultsTitle}>
                    <Trophy weight="duotone" /> Natijalar
                  </div>
                  <RichText text={event.results} className={styles.paragraph} />
                </div>
              )}
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Tadbir ma&apos;lumotlari</h2>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <Calendar weight="duotone" />
                  <span>{uzDateTime(event.startsAt)}</span>
                </li>
                {event.endsAt && (
                  <li className={styles.infoItem}>
                    <Clock weight="duotone" />
                    <span>Tugashi: {uzTime(event.endsAt)}</span>
                  </li>
                )}
                <li className={styles.infoItem}>
                  <MapPin weight="duotone" />
                  <span>
                    {event.location}
                    {event.mapUrl && (
                      <>
                        {" · "}
                        <a href={event.mapUrl} target="_blank" rel="noopener noreferrer">
                          Xaritada ko&apos;rish
                        </a>
                      </>
                    )}
                  </span>
                </li>
                <li className={styles.infoItem}>
                  <Buildings weight="duotone" />
                  <span>{event.organizer}</span>
                </li>
                {event.partners && (
                  <li className={styles.infoItem}>
                    <Handshake weight="duotone" />
                    <span>Hamkorlar: {event.partners}</span>
                  </li>
                )}
                {event.capacity > 0 && !finished && !cancelled && (
                  <li className={styles.infoItem}>
                    <Users weight="duotone" />
                    <span>
                      {taken} / {event.capacity} o&apos;rin band
                      <span className={styles.capacityBar}>
                        <span
                          className={styles.capacityFill}
                          style={{
                            width: `${Math.min(100, Math.round((taken / event.capacity) * 100))}%`,
                          }}
                        />
                      </span>
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {canRegister && (
              <div className={styles.regCard}>
                <h2 className={styles.infoTitle}>Ro&apos;yxatdan o&apos;tish</h2>
                <EventRegistrationForm eventId={event.id} />
              </div>
            )}

            {isFull && !finished && !cancelled && (
              <div className={styles.regCard}>
                <h2 className={styles.infoTitle}>O&apos;rinlar to&apos;ldi</h2>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Afsuski, barcha o&apos;rinlar band bo&apos;ldi. Boshqa
                  tadbirlarimizga qarab ko&apos;ring.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
