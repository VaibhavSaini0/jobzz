import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { isValidStatus, normalizeStatus } from "@/lib/application-status";
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
    const { status, statusNote } = body;

    if (!isValidStatus(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }

    const application = await prismaclient.applications.findUnique({
      where: { id },
      include: { jobs: { select: { companyId: true } } },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    const company = await prismaclient.company.findUnique({
      where: {
        id: application.jobs.companyId,
        ownerId: user.id,
      },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "Only the employer can update application status" },
        { status: 403 }
      );
    }

    const updated = await prismaclient.applications.update({
      where: { id },
      data: {
        status: normalizeStatus(status),
        statusNote: statusNote ? String(statusNote).trim() : null,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        jobs: { select: { id: true, title: true } },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return serverError("Status update error:", error);
  }
}
