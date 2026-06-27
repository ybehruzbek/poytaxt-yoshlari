import Image from "next/image";
import Link from "next/link";
import { youthLeaders } from "@/lib/data";

export const metadata = {
  title: "Yoshlar yetakchilari | O'zbekiston Yoshlar Ittifoqi",
};

export default function YouthLeadersPage() {
  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="section-label">Yoshlar yetakchilari</div>
      <h1 className="section-title">Bizning yetakchilar</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '32px', 
        marginTop: '48px' 
      }}>
        {youthLeaders.map(item => (
          <Link href={`/yetakchilar/${item.id}`} key={item.id} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
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
              }}
            >
              <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="(max-width: 768px) 100vw, 33vw" />
                <span style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'var(--white)', padding: '6px 12px',
                  borderRadius: '100px', fontSize: '12px', fontWeight: 600,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  color: 'var(--primary-dark)'
                }}>
                  {item.category}
                </span>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary-dark)' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  <i className="fas fa-map-marker-alt" style={{ marginRight: '6px', color: 'var(--blue)' }}/>
                  {item.place}
                </p>
                <div style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Batafsil ma'lumot <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}/>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
