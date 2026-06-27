import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { newsItems } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = newsItems.find(n => n.id === resolvedParams.id);
  if (!item) return { title: "Topilmadi" };
  return { title: `${item.title} | O'zbekiston Yoshlar Ittifoqi` };
}

export function generateStaticParams() {
  return newsItems.map((item) => ({
    id: item.id,
  }));
}

export default async function SingleNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = newsItems.find(n => n.id === resolvedParams.id);
  
  if (!item) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', maxWidth: '900px' }}>
      
      <Link href="/yangiliklar" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '32px', fontWeight: 600, fontSize: '14px' }}>
        <i className="fas fa-arrow-left" /> Ortga qaytish
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <span style={{
          background: 'var(--blue-pale)', color: 'var(--blue)', padding: '6px 14px',
          borderRadius: '100px', fontSize: '13px', fontWeight: 700
        }}>
          {item.tag}
        </span>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>
          <i className="far fa-calendar" style={{ marginRight: '6px' }}/> {item.date}
        </div>
      </div>

      <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '32px', color: 'var(--primary-dark)', lineHeight: 1.3 }}>
        {item.title}
      </h1>

      <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '24px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} priority />
      </div>

      <div style={{ fontSize: '18px', color: 'var(--text)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '24px' }}>
          {item.excerpt || "Bu yerda yangilik matni bo'ladi. Hozircha bu demo ma'lumot bo'lgani uchun qisqa matn ko'rsatilmoqda. Aslida bu yerda to'liq maqola, qo'shimcha rasmlar va tafsilotlar bo'lishi kerak."}
        </p>
        <p style={{ marginBottom: '24px' }}>
          Yoshlar Ittifoqi doimo shunday tadbirlarni qo'llab-quvvatlab kelmoqda. Bu orqali minglab yoshlar o'z iqtidorlarini namoyon qilish imkoniyatiga ega bo'lmoqdalar. Maqsadimiz — kelajak avlod uchun barcha sharoitlarni yaratib berishdir.
        </p>
        <p style={{ marginBottom: '24px' }}>
          Tadbir so'ngida faol ishtirokchilarga faxriy yorliqlar va qimmatbaho sovg'alar topshirildi. Kelgusi yilda bunday loyihalar ko'lamini yanada kengaytirish rejalashtirilmoqda.
        </p>
      </div>

    </div>
  );
}
