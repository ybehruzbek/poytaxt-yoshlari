import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { youthLeaders } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = youthLeaders.find(n => n.id === resolvedParams.id);
  if (!item) return { title: "Topilmadi" };
  return { title: `${item.name} | O'zbekiston Yoshlar Ittifoqi` };
}

export function generateStaticParams() {
  return youthLeaders.map((item) => ({
    id: item.id,
  }));
}

export default async function SingleYouthLeaderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = youthLeaders.find(n => n.id === resolvedParams.id);
  
  if (!item) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', maxWidth: '1000px' }}>
      
      <Link href="/yetakchilar" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '32px', fontWeight: 600, fontSize: '14px' }}>
        <i className="fas fa-arrow-left" /> Yetakchilarga qaytish
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start' }}>
        {/* Left Side: Image */}
        <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} priority />
        </div>

        {/* Right Side: Info */}
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

          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
            <a href="#" style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--blue-pale)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: 'all 0.3s' }}>
              <i className="fab fa-telegram-plane" />
            </a>
            <a href="#" style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FCE7F3', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: 'all 0.3s' }}>
              <i className="fab fa-instagram" />
            </a>
          </div>

          <div style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.8 }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-dark)' }}>Faoliyati</h3>
            <p style={{ marginBottom: '16px' }}>
              Ushbu yetakchi o'z hududida yoshlar bilan yaqindan ishlab, ularning muammolarini o'rganish, qiziqishlarini qo'llab-quvvatlash va bo'sh vaqtlarini mazmunli tashkil etish bo'yicha ko'plab loyihalarni amalga oshirib kelmoqda.
            </p>
            <p style={{ marginBottom: '32px' }}>
              Shuningdek, iqtidorli yoshlarni kashf etish va ularni rag'batlantirish bo'yicha maxsus tanlovlar va to'garaklar tashkil etishda faol ishtirok etadi.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
