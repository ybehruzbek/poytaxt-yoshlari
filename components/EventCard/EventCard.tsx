import Image from "next/image";
import Link from "next/link";
import type { Event } from "@prisma/client";
import { UZ_MONTHS_SHORT, uzTime } from "@/lib/format";
import styles from "./EventCard.module.css";
import { CalendarBlank, Clock, MapPin, ArrowRight } from "@phosphor-icons/react/ssr";

export type EventWithCount = Event & {
  _count?: { registrations: number };
};

/** Tadbir holatiga qarab karta pastidagi harakat matni. */
function actionText(event: EventWithCount, isPast: boolean): string {
  if (event.status === "Bekor qilingan") return "Bekor qilingan";
  if (event.status === "Yakunlangan" || isPast) return "Natijalarni ko'rish";
  const taken = event._count?.registrations ?? 0;
  if (event.capacity > 0 && taken >= event.capacity) return "O'rinlar to'lgan";
  if (event.regOpen) return "Ro'yxatdan o'tish";
  return "Batafsil";
}

export default function EventCard({ event }: { event: EventWithCount }) {
  const isPast = event.startsAt < new Date();
  const cancelled = event.status === "Bekor qilingan";

  return (
    <Link
      href={`/tadbirlar/${event.slug}`}
      className={`${styles.card}${cancelled ? ` ${styles.cardCancelled}` : ""}`}
    >
      <div className={styles.imageWrapper}>
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className={styles.imageFallback}>
            <CalendarBlank weight="duotone" />
          </div>
        )}
        <div className={styles.dateBadge}>
          <span className={styles.dateDay}>{event.startsAt.getDate()}</span>
          <span className={styles.dateMonth}>
            {UZ_MONTHS_SHORT[event.startsAt.getMonth()]}
          </span>
        </div>
        <span className={styles.typeBadge}>{event.type}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Clock weight="duotone" /> {uzTime(event.startsAt)}
          </span>
          <span className={styles.metaItem}>
            <MapPin weight="duotone" /> {event.location}
          </span>
        </div>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.desc}>{event.desc}</p>
        <div className={styles.action}>
          {actionText(event, isPast)} <ArrowRight weight="duotone" />
        </div>
      </div>
    </Link>
  );
}
