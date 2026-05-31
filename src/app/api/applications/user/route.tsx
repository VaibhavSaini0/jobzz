import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";
import { serverError } from "@/lib/api-error";

export async function GET() {
  const existingUser = await Checkcookie();
  if (!existingUser) {
    return NextResponse.json(
      { success: false, message: "The user is not valid" },
      { status: 401 }
    );
  }

  try {
    const applications = await prismaClient.applications.findMany({
      where: { user_id: existingUser.id },
      orderBy: { appliedAt: "desc" },
      include: {
        jobs: { include: { company: true } },
      },
    });

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    return serverError("Applications fetch error:", error);
  }
}
