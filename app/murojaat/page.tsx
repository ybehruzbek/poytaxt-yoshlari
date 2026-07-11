import Appeals from "@/components/Appeals/Appeals";
import Contact from "@/components/Contact/Contact";
import Faq from "@/components/Faq/Faq";
import PageHeader from "@/components/ui/PageHeader";
import SectionTheme from "@/components/ui/SectionTheme";
import { getDistricts } from "@/lib/queries";

export const metadata = {
  title: "Murojaat - O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqiga murojaat yo'llash, aloqa va kontakt ma'lumotlari.",
};

export const revalidate = 60;

export default async function MurojaatPage() {
  const districts = await getDistricts();

  return (
    <>
      <PageHeader
        label="Murojaat"
        title="Biz bilan bog'laning"
        description="Quyida murojaat formasi, ko'p beriladigan savollarga javoblar va aloqa ma'lumotlari jamlangan."
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: "Murojaat" }]}
      />

      <SectionTheme theme="appeals">
        <Appeals districtNames={districts.map((d) => d.name)} />
      </SectionTheme>

      <SectionTheme theme="about">
        <Faq />
      </SectionTheme>

      <SectionTheme theme="contact">
        <Contact />
      </SectionTheme>
    </>
  );
}
