import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { serverError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  try {
    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Please log in to leave a review" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { content, companyId } = body;

    if (!content?.trim() || !companyId) {
      return NextResponse.json(
        { success: false, message: "Review content and company are required" },
        { status: 400 }
      );
    }

    const company = await prismaclient.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    const existing = await prismaclient.review.findFirst({
      where: { userId: user.id, companyId },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "You have already reviewed this company" },
        { status: 409 }
      );
    }

    const review = await prismaclient.review.create({
      data: {
        content: String(content).trim(),
        userId: user.id,
        companyId,
      },
      include: { user: true },
    });

    return NextResponse.json({ success: true, data: review });
  } catch (error) {
    return serverError("Review add error:", error);
  }
}
