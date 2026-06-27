import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { leaders } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = leaders.find(n => n.id === resolvedParams.id);
  if (!item) return { title: "Topilmadi" };
  return { title: `${item.name} | O'zbekiston Yoshlar Ittifoqi` };
}

export function generateStaticParams() {
  return leaders.map((item) => ({
    id: item.id,
  }));
}

export default async function SingleLeaderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = leaders.find(n => n.id === resolvedParams.id);
  
  if (!item) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', maxWidth: '1000px' }}>
      
      <Link href="/rahbariyat" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '32px', fontWeight: 600, fontSize: '14px' }}>
        <i className="fas fa-arrow-left" /> Rahbariyatga qaytish
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start' }}>
        {/* Left Side: Image */}
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} priority />
        </div>

        {/* Right Side: Info */}
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

          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
            <a href="#" style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--blue-pale)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: 'all 0.3s' }}>
              <i className="fab fa-telegram-plane" />
            </a>
            <a href="#" style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FCE7F3', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: 'all 0.3s' }}>
              <i className="fab fa-instagram" />
            </a>
            <a href="#" style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--green-pale)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: 'all 0.3s' }}>
              <i className="fas fa-envelope" />
            </a>
          </div>

          <div style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.8 }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-dark)' }}>Biografiya</h3>
            <p style={{ marginBottom: '16px' }}>
              Toshkent shahar Kengashida uzoq yillik tajribaga ega bo'lib, yoshlar siyosati, ijtimoiy dasturlar va grant loyihalarini boshqarishda faol ishtirok etib kelmoqda.
            </p>
            <p style={{ marginBottom: '32px' }}>
              O'zbekiston Milliy Universitetini tamomlagan. Xalqaro anjumanlar va konferensiyalarda O'zbekiston yoshlari nomidan ko'plab marotaba nutq so'zlagan.
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-dark)' }}>Qabul kunlari</h3>
            <div style={{ background: 'var(--white)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '12px' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Seshanba</span>
                <span>10:00 - 13:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Payshanba</span>
                <span>14:00 - 17:00</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
