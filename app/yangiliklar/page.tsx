import { getNews } from "@/lib/queries";
import YangiliklarClient from "./YangiliklarClient";

export const metadata = {
  title: "Yangiliklar | O'zbekiston Yoshlar Ittifoqi",
  description: "Poytaxt yoshlari hayotidagi eng so'nggi va muhim yangiliklar.",
};

// Bazadan o'qiydi — aks holda build paytida bir marta render bo'lib qotib qoladi.
export const revalidate = 60;

export default async function AllNewsPage() {
  const news = await getNews();

  return <YangiliklarClient initialNews={news} />;
}
