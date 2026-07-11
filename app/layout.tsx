import type { Metadata, Viewport } from "next";
import { Jost, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import BackgroundController from "@/components/ui/BackgroundController";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${jost.variable} ${inter.variable}`}>
      <head>
        {/* CSS versiya — JS versiyasi <i> ni <svg> ga almashtirib, React
            hydration bilan urishardi (151 joyda). Lokal SVG sprite'ga
            o'tish PLAN.md Faza 4 da. */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <ThemeProvider>
          <BackgroundController />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
