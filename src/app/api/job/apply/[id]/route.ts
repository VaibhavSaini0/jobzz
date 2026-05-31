import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { isEmployer } from "@/lib/roles";
import { serverError } from "@/lib/api-error";

export async function POST(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = await Checkcookie();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Not a valid user" },
      { status: 401 }
    );
  }

  if (isEmployer(user.role)) {
    return NextResponse.json(
      { success: false, message: "Employers cannot apply for jobs" },
      { status: 403 }
    );
  }

  const job = await prismaclient.job.findUnique({
    where: { id },
  });

  if (!job) {
    return NextResponse.json(
      { success: false, message: "Job not found" },
      { status: 404 }
    );
  }

  if (job.lastDate && new Date() > new Date(job.lastDate)) {
    return NextResponse.json(
      { success: false, message: "The application deadline for this job has passed" },
      { status: 403 }
    );
  }

  const check = await prismaclient.applications.findFirst({
    where: { user_id: user.id, job_id: id },
  });

  if (check) {
    return NextResponse.json(
      { success: false, message: "You already applied for this job" },
      { status: 409 }
    );
  }

  const resume = await prismaclient.resume.findUnique({
    where: { userId: user.id },
  });

  try {
    const application = await prismaclient.applications.create({
      data: {
        user_id: user.id,
        job_id: id,
        resumeId: resume?.id ?? null,
        status: "pending",
        appliedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    return serverError("Apply error:", error);
  }
}
