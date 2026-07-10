import PageHeader from "@/components/ui/PageHeader";
import GalereyaClient from "./GalereyaClient";
import { getGalleryImages } from "@/lib/queries";

export const metadata = {
  title: "Galereya | O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar tadbirlari, jamoat loyihalari va rasmiy uchrashuvlardan foto lahzalar.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <PageHeader
        label="Galereya"
        title="Foto lahzalar"
        description="Yoshlar tadbirlari, jamoat loyihalari va rasmiy uchrashuvlardan eng yorqin lahzalar bilan tanishing."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Galereya" }
        ]}
      />

      <GalereyaClient images={images} />
    </div>
  );
}
