import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RichText from "@/components/ui/RichText";
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

const socialBtn = {
  width: '44px', height: '44px', borderRadius: '12px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
} as const;

export default async function SingleYouthLeaderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getYouthLeaderById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', maxWidth: '1000px' }}>

      <Link href="/yetakchilar" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '32px', fontWeight: 600, fontSize: '14px' }}>
        <i className="fas fa-arrow-left" /> Yetakchilarga qaytish
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start' }}>
        <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} priority />
        </div>

        <div>
          <span style={{
            background: 'var(--blue-pale)', color: 'var(--blue)', padding: '6px 14px',
            borderRadius: '100px', fontSize: '13px', fontWeight: 700, display: 'inline-block', marginBottom: '16px'
          }}>
            {item.category} yetakchisi
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '12px', color: 'var(--primary-dark)', lineHeight: 1.2 }}>
            {item.name}
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-map-marker-alt" style={{ color: 'var(--blue)' }}/>
            {item.place}
          </p>

          {(item.telegram || item.instagram) && (
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
            </div>
          )}

          {item.bio && (
            <div style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.8 }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-dark)' }}>Faoliyati</h2>
              <RichText text={item.bio} style={{ marginBottom: '16px' }} />
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
