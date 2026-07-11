import News from "@/components/News/News";
import Gallery from "@/components/Gallery/Gallery";
import PageHeader from "@/components/ui/PageHeader";
import SectionTheme from "@/components/ui/SectionTheme";
import { getNews, getGalleryImages } from "@/lib/queries";

export const metadata = {
  title: "Axborot markazi - O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqi yangiliklari, foto va video galereyasi.",
};

export const revalidate = 60;

export default async function AxborotMarkaziPage() {
  const [news, images] = await Promise.all([getNews(), getGalleryImages()]);

  return (
    <>
      <PageHeader
        label="Axborot markazi"
        title="Yangiliklar va media"
        description="Ittifoq hayotidagi so'nggi voqealar, e'lonlar va foto lavhalar — bir sahifada."
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: "Axborot markazi" }]}
      />

      <SectionTheme theme="news">
        <News items={news} />
      </SectionTheme>

      <SectionTheme theme="gallery">
        <Gallery images={images} />
      </SectionTheme>
    </>
  );
}
