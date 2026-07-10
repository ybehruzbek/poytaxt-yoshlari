import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RichText from "@/components/ui/RichText";
import { getLeaderById, getLeaders } from "@/lib/queries";

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

/** "Seshanba|10:00 - 13:00" qatorlarini jadvalga aylantiradi. */
function parseReceptionDays(raw: string | null) {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => line.split("|").map((s) => s.trim()))
    .filter((parts) => parts.length === 2)
    .map(([day, time]) => ({ day, time }));
}

const socialBtn = {
  width: '44px', height: '44px', borderRadius: '12px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
} as const;

export default async function SingleLeaderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getLeaderById(id);

  if (!item) {
    notFound();
  }

  const receptionDays = parseReceptionDays(item.receptionDays);

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', maxWidth: '1000px' }}>

      <Link href="/rahbariyat" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '32px', fontWeight: 600, fontSize: '14px' }}>
        <i className="fas fa-arrow-left" /> Rahbariyatga qaytish
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start' }}>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} priority />
        </div>

        <div>
          <span style={{
            background: 'var(--blue-pale)', color: 'var(--blue)', padding: '6px 14px',
            borderRadius: '100px', fontSize: '13px', fontWeight: 700, display: 'inline-block', marginBottom: '16px'
          }}>
            Toshkent shahar kengashi
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '12px', color: 'var(--primary-dark)', lineHeight: 1.2 }}>
            {item.name}
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '32px', fontWeight: 500 }}>
            {item.position}
          </p>

          {/* Faqat kiritilgan havolalar ko'rsatiladi — ilgari bu yerda uchta bo'sh `href="#"` turardi. */}
          {(item.telegram || item.instagram || item.email) && (
            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
              {item.telegram && (
                <a href={item.telegram} style={{ ...socialBtn, background: 'var(--blue-pale)', color: 'var(--blue)' }} aria-label="Telegram">
                  <i className="fab fa-telegram-plane" />
                </a>
              )}
              {item.instagram && (
                <a href={item.instagram} style={{ ...socialBtn, background: '#FCE7F3', color: '#EC4899' }} aria-label="Instagram">
                  <i className="fab fa-instagram" />
                </a>
              )}
              {item.email && (
                <a href={`mailto:${item.email}`} style={{ ...socialBtn, background: 'var(--green-pale)', color: 'var(--green)' }} aria-label="Email">
                  <i className="fas fa-envelope" />
                </a>
              )}
            </div>
          )}

          <div style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.8 }}>
            {item.bio && (
              <>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-dark)' }}>Biografiya</h2>
                <RichText text={item.bio} style={{ marginBottom: '16px' }} />
              </>
            )}

            {receptionDays.length > 0 && (
              <>
                <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '32px 0 16px', color: 'var(--primary-dark)' }}>Qabul kunlari</h2>
                <div style={{ background: 'var(--white)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                  {receptionDays.map(({ day, time }, i) => (
                    <div
                      key={day}
                      style={{
                        display: 'flex', justifyContent: 'space-between',
                        borderBottom: i < receptionDays.length - 1 ? '1px solid var(--border-light)' : 'none',
                        paddingBottom: i < receptionDays.length - 1 ? '12px' : 0,
                        marginBottom: i < receptionDays.length - 1 ? '12px' : 0,
                      }}
                    >
                      <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{day}</span>
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
