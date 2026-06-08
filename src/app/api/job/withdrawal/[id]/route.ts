import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const user = await Checkcookie();
  const { id } = await context.params;

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Not a valid user" },
      { status: 401 }
    );
  }

  const application = await prismaclient.applications.findFirst({
    where: {
      user_id: user.id,
      job_id: id,
    },
  });

  if (!application?.id) {
    return NextResponse.json(
      { success: false, message: "Application not found or already withdrawn" },
      { status: 404 }
    );
  }

  try {
    const applicationdata = await prismaclient.applications.delete({
      where: { id: application.id },
    });
    return NextResponse.json({ success: true, data: applicationdata });
  } catch (error) {
    console.error("Withdrawal error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
