import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { serverError } from "@/lib/api-error";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await req.json();
    const { notes } = body;

    const application = await prismaclient.applications.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    // Security check: Only the candidate who created this application can edit their notes
    if (application.user_id !== user.id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const updated = await prismaclient.applications.update({
      where: { id },
      data: {
        notes: notes ? String(notes).trim() : null,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return serverError("Notes update error:", error);
  }
}
