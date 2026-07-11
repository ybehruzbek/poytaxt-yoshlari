import Districts from "@/components/Districts/Districts";
import YouthLeaders from "@/components/YouthLeaders/YouthLeaders";
import PageHeader from "@/components/ui/PageHeader";
import SectionTheme from "@/components/ui/SectionTheme";
import { getDistricts, getYouthLeaders } from "@/lib/queries";

export const metadata = {
  title: "Hududlar - O'zbekiston Yoshlar Ittifoqi",
  description: "Toshkent shahridagi tumanlar miqyosidagi loyihalar va mahalliy yetakchilar.",
};

export const revalidate = 60;

export default async function HududlarPage() {
  const [districts, youthLeaders] = await Promise.all([
    getDistricts(),
    getYouthLeaders(),
  ]);

  return (
    <>
      <PageHeader
        label="Hududlar"
        title="Toshkent tumanlari"
        description="Poytaxtdagi tuman bo'limlari, mahalliy tashabbuslar va har bir hududning yosh yetakchilari — barchasi bir joyda."
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: "Hududlar" }]}
      />

      <SectionTheme theme="default">
        <Districts districts={districts} />
      </SectionTheme>

      <SectionTheme theme="youthleaders">
        <YouthLeaders items={youthLeaders} />
      </SectionTheme>
    </>
  );
}
