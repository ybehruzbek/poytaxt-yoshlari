import { prisma } from "@/lib/prisma";
import YangiliklarClient from "./YangiliklarClient";

export const metadata = {
  title: "Yangiliklar | O'zbekiston Yoshlar Ittifoqi",
  description: "Poytaxt yoshlari hayotidagi eng so'nggi va muhim yangiliklar.",
};

export default async function AllNewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <YangiliklarClient initialNews={news} />;
}
