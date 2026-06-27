import Image from "next/image";
import Link from "next/link";
import { leaders } from "@/lib/data";

export const metadata = {
  title: "Rahbariyat | O'zbekiston Yoshlar Ittifoqi",
};

export default function LeadershipPage() {
  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="section-label">Rahbariyat</div>
      <h1 className="section-title">Mas'ul rahbarlar</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '32px', 
        marginTop: '48px' 
      }}>
        {leaders.map(item => (
          <Link href={`/rahbariyat/${item.id}`} key={item.id} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div className="hover-card"
              style={{ 
                background: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(12px)',
                borderRadius: '24px', 
                overflow: 'hidden', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)', 
                border: '1px solid rgba(255,255,255,0.5)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <div style={{ position: 'relative', height: '360px', width: '100%' }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--white)', marginTop: '-20px', position: 'relative', zIndex: 2, borderRadius: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary-dark)' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {item.position}
                </p>
                <div style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue)', fontSize: '13px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  To'liq ma'lumot <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}/>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
