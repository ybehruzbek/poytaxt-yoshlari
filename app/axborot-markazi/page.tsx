import News from "@/components/News/News";
import Gallery from "@/components/Gallery/Gallery";
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
    <div style={{ paddingTop: "70px" }}>
      <SectionTheme theme="news">
        <News items={news} />
      </SectionTheme>

      <SectionTheme theme="gallery">
        <Gallery images={images} />
      </SectionTheme>
    </div>
  );
}
