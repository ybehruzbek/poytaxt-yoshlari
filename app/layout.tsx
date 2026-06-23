import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "O'zbekiston Yoshlar Ittifoqi",
  description:
    "O'zbekiston Yoshlar Ittifoqi — yoshlarning huquq va manfaatlarini himoya qiluvchi yirik jamoat tashkiloti.",
  openGraph: {
    title: "O'zbekiston Yoshlar Ittifoqi",
    description:
      "O'zbekiston Yoshlar Ittifoqi — yoshlarning huquq va manfaatlarini himoya qiluvchi yirik jamoat tashkiloti.",
    type: "website",
    locale: "uz_UZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-body), -apple-system, sans-serif",
        }}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
