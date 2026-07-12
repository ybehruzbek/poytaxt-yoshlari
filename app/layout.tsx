import type { Metadata, Viewport } from "next";
import { Jost, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import BackgroundController from "@/components/ui/BackgroundController";
import PageTransition from "@/components/ui/PageTransition";
import { getNavLinks } from "@/lib/queries";

// Sarlavhalar — Jost (geometrik grotesk, baraka.gov.uz sarlavha shrifti;
// kirillchasi bor — 4 til rejasi uchun ham mos)
const jost = Jost({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  display: "swap",
});

// Matn — Inter
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

// Editorial urg'u — iqtibos/pull-quote uchun, boshqa joyda ishlatilmaydi
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://poytaxtyoshlari.uz"
  ),
  title: "O'zbekiston Yoshlar Ittifoqi",
  description:
    "O'zbekiston Yoshlar Ittifoqi — yoshlarning huquq va manfaatlarini himoya qiluvchi yirik jamoat tashkiloti.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "O'zbekiston Yoshlar Ittifoqi",
    description:
      "O'zbekiston Yoshlar Ittifoqi — yoshlarning huquq va manfaatlarini himoya qiluvchi yirik jamoat tashkiloti.",
    type: "website",
    locale: "uz_UZ",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F2547",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = await getNavLinks();

  return (
    <html lang="uz" data-scroll-behavior="smooth" className={`${jost.variable} ${inter.variable} ${cormorant.variable}`}>
      <body>
        <ThemeProvider>
          <BackgroundController />
          <Navbar links={navLinks} />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
