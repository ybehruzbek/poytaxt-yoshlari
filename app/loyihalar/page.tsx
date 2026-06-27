import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Barcha loyihalar | O'zbekiston Yoshlar Ittifoqi",
};

export default function AllProjectsPage() {
  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="section-label">Faol loyihalar</div>
      <h1 className="section-title">Hozirda amalga oshirilayotgan dasturlar</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '32px', 
        marginTop: '48px' 
      }}>
        {projects.map(item => (
          <Link href={`/loyihalar/${item.id}`} key={item.id} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
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
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '240px', width: '100%' }}>
                <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                <span style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'var(--green)', color: 'white', padding: '6px 12px',
                  borderRadius: '100px', fontSize: '12px', fontWeight: 600,
                  boxShadow: '0 4px 10px rgba(46, 139, 87, 0.3)'
                }}>
                  {item.status}
                </span>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px', color: 'var(--primary-dark)' }}>
                  {item.title}
                </h3>
                <p style={{ 
                  fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6,
                  marginBottom: '24px', flex: 1
                }}>
                  {item.desc}
                </p>
                <div style={{ fontWeight: 600, color: 'var(--white)', background: 'var(--blue)', padding: '12px', borderRadius: '12px', textAlign: 'center', fontSize: '14px', transition: 'all 0.2s' }}>
                  Loyihani ko'rish <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}/>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
