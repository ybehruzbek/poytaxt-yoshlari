import Image from "next/image";
import Link from "next/link";
import { newsItems } from "@/lib/data";

export const metadata = {
  title: "Barcha yangiliklar | O'zbekiston Yoshlar Ittifoqi",
};

export default function AllNewsPage() {
  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="section-label">Yangiliklar</div>
      <h1 className="section-title">Barcha yangiliklar va voqealar</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '32px', 
        marginTop: '48px' 
      }}>
        {newsItems.map(item => (
          <Link href={`/yangiliklar/${item.id}`} key={item.id} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div className="hover-card"
              style={{ 
                background: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(12px)',
                borderRadius: '20px', 
                overflow: 'hidden', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)', 
                border: '1px solid rgba(255,255,255,0.5)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                <span style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: 'var(--white)', padding: '6px 12px',
                  borderRadius: '100px', fontSize: '12px', fontWeight: 600,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  color: 'var(--text)'
                }}>
                  {item.tag}
                </span>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 500 }}>
                  <i className="far fa-calendar" style={{ marginRight: '6px' }}/> {item.date}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark)', lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p style={{ 
                    fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    marginBottom: '20px'
                  }}>
                    {item.excerpt}
                  </p>
                )}
                <div style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Batafsil o'qish <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}/>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
