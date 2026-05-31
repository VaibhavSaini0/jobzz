import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { serverError } from "@/lib/api-error";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id: jobId } = await context.params;

    const application = await prismaclient.applications.findFirst({
      where: { user_id: user.id, job_id: jobId },
      select: { id: true },
    });

    return NextResponse.json({
      success: true,
      applied: Boolean(application),
    });
  } catch (error) {
    return serverError("Application check error:", error);
  }
}
