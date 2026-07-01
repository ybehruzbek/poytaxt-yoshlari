import News from "@/components/News/News";
import Gallery from "@/components/Gallery/Gallery";
import SectionTheme from "@/components/ui/SectionTheme";

export const metadata = {
  title: "Axborot markazi - O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqi yangiliklari, foto va video galereyasi.",
};

export default function AxborotMarkaziPage() {
  return (
    <div style={{ paddingTop: "70px" }}>
      <SectionTheme theme="news">
        <News />
      </SectionTheme>
      
      <SectionTheme theme="gallery">
        <Gallery />
      </SectionTheme>
    </div>
  );
}
