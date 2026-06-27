import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = projects.find(n => n.id === resolvedParams.id);
  if (!item) return { title: "Topilmadi" };
  return { title: `${item.title} | O'zbekiston Yoshlar Ittifoqi` };
}

export function generateStaticParams() {
  return projects.map((item) => ({
    id: item.id,
  }));
}

export default async function SingleProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = projects.find(n => n.id === resolvedParams.id);
  
  if (!item) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', maxWidth: '900px' }}>
      
      <Link href="/loyihalar" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '32px', fontWeight: 600, fontSize: '14px' }}>
        <i className="fas fa-arrow-left" /> Loyihalarga qaytish
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <span style={{
          background: 'var(--green-pale)', color: 'var(--green)', padding: '6px 14px',
          borderRadius: '100px', fontSize: '13px', fontWeight: 700
        }}>
          {item.status}
        </span>
      </div>

      <h1 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '20px', color: 'var(--primary-dark)', lineHeight: 1.2 }}>
        {item.title}
      </h1>
      
      <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
        {item.desc}
      </p>

      <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '24px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} priority />
      </div>

      <div style={{ fontSize: '17px', color: 'var(--text)', lineHeight: 1.8 }}>
        <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-dark)' }}>Loyiha maqsadi</h3>
        <p style={{ marginBottom: '24px' }}>
          Ushbu loyiha yoshlarimizning salohiyatini ro'yobga chiqarish, ularning bandligini ta'minlash va yangi bilimlarni egallashlari uchun qulay sharoit yaratish maqsadida amalga oshirilmoqda. Bu yerda siz turli yo'nalishlar bo'yicha bepul kurslar va master-klasslarda qatnashishingiz mumkin.
        </p>
        
        <div style={{ background: 'var(--white)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-light)', marginTop: '40px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Loyihada qatnashish</h4>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px' }}>Agar ushbu loyihaga qo'shilishni istasangiz, quyidagi tugma orqali anketa to'ldiring. Biz siz bilan tez orada bog'lanamiz.</p>
          <a href="#murojaat" style={{ display: 'inline-block', background: 'var(--blue)', color: 'var(--white)', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>
            Ariza topshirish
          </a>
        </div>
      </div>

    </div>
  );
}
