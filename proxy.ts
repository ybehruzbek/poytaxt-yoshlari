import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { NextFetchEvent } from "next/server";
import { NEXTAUTH_SECRET } from "@/lib/env";

// Admin autentifikatsiyasi — token bor bo'lishi yetarli emas, rol ham tekshiriladi.
const authProxy = withAuth({
  callbacks: {
    authorized: ({ token }) =>
      token?.role === "ADMIN" || token?.role === "MODERATOR",
  },
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin/login",
  },
});

/**
 * "Sayt qurilmoqda" rejimi.
 *
 * MAINTENANCE_MODE:
 *   "1" | "true" | "on"   → yoqilgan
 *   "0" | "false" | "off" → o'chirilgan
 *   (belgilanmagan)       → productionda yoqilgan, dev'da o'chiq
 *
 * Ishga tushirish uchun productionda MAINTENANCE_MODE=0 qo'ying.
 */
function maintenanceEnabled(): boolean {
  const v = process.env.MAINTENANCE_MODE?.toLowerCase();
  if (v === "1" || v === "true" || v === "on") return true;
  if (v === "0" || v === "false" || v === "off") return false;
  return process.env.NODE_ENV === "production";
}

// Placeholder saytning haqiqiy landing (hero) uslubini takrorlaydi —
// och fon, brend logotipi, uppercase Jost sarlavha, romb naqsh, ark-maskali rasm.
// O'zicha yetarli: DB/layout/komponentlarga bog'liq emas.
function maintenancePage(): NextResponse {
  const html = `<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="robots" content="noindex, nofollow" />
<meta name="theme-color" content="#F6F8FC" />
<title>Sayt qurilmoqda — O'zbekiston Yoshlar Ittifoqi</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  :root {
    --blue: #22375B;
    --blue-deep: #0F2547;
    --green: #6CA23C;
    --amber: #F5B53A;
    --teal: #176F8E;
    --orange: #F47B2E;
    --bg: #F6F8FC;
    --white: #FFFFFF;
    --text-secondary: #3D4D63;
    --text-muted: #8A97A8;
    --border-light: #EEF2F8;
    --blue-pale: #EAF1FB;
    --heading: "Jost", system-ui, -apple-system, "Segoe UI", sans-serif;
    --body: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { min-height: 100%; }
  body {
    position: relative;
    min-height: 100dvh;
    font-family: var(--body);
    color: var(--blue-deep);
    background:
      radial-gradient(30vw 30vw at 94% -6%, rgba(108, 162, 60, 0.12), transparent 60%),
      radial-gradient(26vw 26vw at -8% 114%, rgba(245, 181, 58, 0.10), transparent 60%),
      linear-gradient(180deg, var(--bg) 0%, var(--white) 62%);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 76px;
    display: flex;
    align-items: center;
    padding: 0 clamp(20px, 3vw, 28px);
    z-index: 3;
  }
  .bar img { height: 44px; width: auto; }

  .wrap {
    max-width: 1180px;
    margin: 0 auto;
    padding: 96px clamp(20px, 3vw, 28px) 64px;
    min-height: 100dvh;
    display: grid;
    place-content: center;
    justify-items: center;
    text-align: center;
  }

  .content {
    max-width: 680px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 18px;
    border-radius: 999px;
    background: var(--white);
    border: 1px solid var(--border-light);
    box-shadow: 0 1px 3px rgba(30, 58, 95, 0.06), 0 1px 2px rgba(30, 58, 95, 0.04);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.4px;
    color: var(--text-secondary);
    margin-bottom: 26px;
  }
  .label .d {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 0 4px rgba(108, 162, 60, 0.18);
  }

  h1 {
    font-family: var(--heading);
    font-size: clamp(38px, 6.4vw, 78px);
    font-weight: 700;
    line-height: 1.04;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: var(--blue-deep);
    margin-bottom: 24px;
  }
  h1 .accent { color: var(--green); }

  .subtitle {
    font-size: clamp(16px, 1.3vw, 19px);
    line-height: 1.7;
    color: var(--text-secondary);
    max-width: 480px;
    margin: 0 auto 32px;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 13px 22px;
    border-radius: 999px;
    background: var(--blue-pale);
    color: var(--blue);
    font-family: var(--heading);
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 34px;
  }
  .spin {
    width: 15px; height: 15px;
    border-radius: 50%;
    border: 2px solid rgba(34, 55, 91, 0.25);
    border-top-color: var(--blue);
    animation: spin 0.9s linear infinite;
  }

  .ornament { display: flex; gap: 10px; }
  .ornament span {
    width: 9px; height: 9px;
    transform: rotate(45deg);
    border-radius: 2px;
  }
  .ornament span:nth-child(1) { background: var(--blue-deep); }
  .ornament span:nth-child(2) { background: var(--green); }
  .ornament span:nth-child(3) { background: var(--amber); }
  .ornament span:nth-child(4) { background: var(--teal); }
  .ornament span:nth-child(5) { background: var(--orange); }

  /* Kirish animatsiyasi */
  .content > * { opacity: 0; transform: translateY(28px); animation: rise 1s var(--ease) forwards; }
  .content > *:nth-child(1) { animation-delay: 0.05s; }
  .content > *:nth-child(2) { animation-delay: 0.15s; }
  .content > *:nth-child(3) { animation-delay: 0.25s; }
  .content > *:nth-child(4) { animation-delay: 0.35s; }
  .content > *:nth-child(5) { animation-delay: 0.45s; }

  @keyframes rise { to { opacity: 1; transform: none; } }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (prefers-reduced-motion: reduce) {
    .content > * { animation: none; opacity: 1; transform: none; }
    .spin { animation: none; }
  }
</style>
</head>
<body>
  <header class="bar">
    <img src="/logo.png" alt="O'zbekiston Yoshlar Ittifoqi" />
  </header>

  <main class="wrap">
    <div class="content">
      <div class="label"><span class="d"></span>O'zbekiston Yoshlar Ittifoqi · Toshkent</div>
      <h1>Sayt <span class="accent">qurilmoqda</span></h1>
      <p class="subtitle">Toshkent yoshlari uchun yangi platforma tayyorlanmoqda. Tez orada to‘liq ishga tushamiz — e’tiboringiz uchun rahmat.</p>
      <div class="status"><span class="spin"></span>Ishlar davom etmoqda</div>
      <div class="ornament" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
    </div>
  </main>
</body>
</html>`;

  return new NextResponse(html, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Retry-After": "3600",
    },
  });
}

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // API yo'llari har doim ishlaydi — autentifikatsiya va admin-panel ma'lumotlari uchun.
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Admin sohasi — har doim autentifikatsiya bilan himoyalanadi (login sahifasidan tashqari).
  // Jamoa "qurilmoqda" rejimida ham admin-panelda ishlashi mumkin.
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    // @ts-expect-error withAuth qaytargan handler NextRequest bilan mos ishlaydi
    return authProxy(req, event);
  }

  // Ommaviy sahifalar — qurilmoqda rejimida bo'lsa, hammaga placeholder ko'rsatiladi.
  if (maintenanceEnabled()) {
    return maintenancePage();
  }

  return NextResponse.next();
}

export const config = {
  // Static fayllar, rasm optimizatsiyasi va public assetlar (nuqtali fayllar) chetlab o'tiladi.
  // /api chetlab o'tilmaydi — admin-panel ma'lumot olishi uchun; login/auth ishlashi uchun.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
    "/admin/:path*",
  ],
};
