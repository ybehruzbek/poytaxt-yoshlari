import Leadership from "@/components/Leadership/Leadership";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Rahbariyat | O'zbekiston Yoshlar Ittifoqi",
};

export default function LeadershipPage() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg)' }}>
      <PageHeader 
        label="Rahbariyat"
        title="Mas'ul rahbarlar"
        description="Toshkent shahar Yoshlar Ittifoqi Kengashining tajribali va shijoatli jamoasi bilan yaqindan tanishing."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Rahbariyat" }
        ]}
      />
      <div style={{ marginTop: '-40px' }}>
        <Leadership />
      </div>
    </div>
  );
}
