import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Checkcookie } from "@/HelperFun/Checkcookie";
import { serverError } from "@/lib/api-error";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const job = await prismaClient.job.findUnique({
      where: { id },
      select: { companyId: true },
    });

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    const company = await prismaClient.company.findUnique({
      where: { id: job.companyId, ownerId: user.id },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "Forbidden: You are not the employer for this job" },
        { status: 403 }
      );
    }

    const applications = await prismaClient.applications.findMany({
      where: { job_id: id },
      orderBy: { appliedAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        jobs: {
          select: {
            id: true,
            title: true,
            location: true,
            salary: true,
            employment_type: true,
            job_type: true,
          },
        },
        Resume: {
          select: {
            id: true,
            title: true,
            summary: true,
            phone: true,
            location: true,
            website: true,
            educations: true,
            experiences: true,
            skills: true,
            projects: true,
            resumePdfUrl: true,
            resumePdfName: true,
            profileImageUrl: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    return serverError("Applicants fetch error:", error);
  }
}
