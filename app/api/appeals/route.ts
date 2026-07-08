import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ism, familiya, tel, tuman, turi, xabar } = body;

    if (!ism || !familiya || !tel || !tuman || !turi || !xabar) {
      return NextResponse.json(
        { error: "Barcha maydonlarni to'ldirish majburiy!" },
        { status: 400 }
      );
    }

    const appeal = await prisma.appeal.create({
      data: {
        fullName: `${ism} ${familiya}`.trim(),
        phone: tel,
        district: tuman,
        type: turi,
        message: xabar,
        status: "Yangi",
      },
    });

    return NextResponse.json({ success: true, appeal }, { status: 201 });
  } catch (error) {
    console.error("Murojaat saqlashda xatolik:", error);
    return NextResponse.json(
      { error: "Ichki server xatosi yuz berdi" },
      { status: 500 }
    );
  }
}
