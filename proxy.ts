import { withAuth } from "next-auth/middleware";
import { NEXTAUTH_SECRET } from "@/lib/env";

export default withAuth({
  callbacks: {
    // Token borligi yetarli emas — rol ham tekshiriladi.
    authorized: ({ token }) =>
      token?.role === "ADMIN" || token?.role === "MODERATOR",
  },
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin/login",
  },
});

// `/admin/login` himoyalanmaydi — aks holda kirish sahifasi o'ziga qayta yo'naltiradi.
export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
