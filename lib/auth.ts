import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { NEXTAUTH_SECRET } from "@/lib/env";
import type { Role } from "@/types/next-auth";

/** Tasodifiy satrning bcrypt hashi — hech qachon mos kelmaydi. */
const DUMMY_HASH = "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        // Foydalanuvchi topilmaganda ham hash solishtiramiz: aks holda javob
        // vaqti "bunday login bormi yo'qmi" degan savolga javob berib qo'yadi.
        const passwordHash = user?.password ?? DUMMY_HASH;
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          passwordHash
        );

        if (!user || !isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.username,
          role: user.role as Role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: NEXTAUTH_SECRET,
};

/** Sessiyani serverda o'qish. */
export function auth() {
  return getServerSession(authOptions);
}

/**
 * Sahifa/action ichida rolni majburlash. `proxy.ts` ga tayanib qolmaymiz —
 * matcher o'zgarsa yoki proxy ishlamay qolsa, sahifa o'zini o'zi himoya qiladi.
 */
export async function requireRole(...allowed: Role[]) {
  const session = await auth();
  if (!session?.user || !allowed.includes(session.user.role)) {
    return null;
  }
  return session;
}
