import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error(
      "ADMIN_USERNAME va ADMIN_PASSWORD .env da bo'lishi shart. " +
        ".env.example ga qarang."
    );
  }

  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD kamida 12 belgi bo'lishi kerak.");
  }

  const existingAdmin = await prisma.user.findUnique({ where: { username } });
  if (existingAdmin) {
    console.log(`⚠️  "${username}" foydalanuvchisi allaqachon mavjud.`);
    return;
  }

  await prisma.user.create({
    data: {
      username,
      password: await bcrypt.hash(password, 12),
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin yaratildi: ${username}`);
  console.log("   Parol .env faylida. Konsolga chiqarilmaydi.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
