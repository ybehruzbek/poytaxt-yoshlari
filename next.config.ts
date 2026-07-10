import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TODO(Faza 1): server deploy'ga o'tgach `unoptimized` ni olib tashlash —
    // u faqat GitHub Pages statik eksporti uchun kerak edi.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "z-cdn-media.chatglm.cn" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
