import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const isPublicView = req.nextUrl.searchParams.get("public") === "true";

  try {
    const company = await prismaclient.company.findUnique({
      where: { id },
      include: {
        jobs: true,
        review: { include: { user: { select: { id: true, name: true } } } },
      },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    if (isPublicView) {
      return NextResponse.json({ success: true, data: company });
    }

    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not a valid user" },
        { status: 401 }
      );
    }

    if (company.ownerId !== user.id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, data: company });
  } catch (error) {
    console.error("Fetch company error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
