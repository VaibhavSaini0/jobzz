import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { serverError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    let company = null;
    if (user.companyId) {
      company = await prismaclient.company.findUnique({
        where: { id: user.companyId },
      });
    } else {
      company = await prismaclient.company.findUnique({
        where: { ownerId: user.id },
      });
    }

    if (!company) {
      return NextResponse.json({
        success: true,
        message: "No company registered yet",
        data: [],
      });
    }

    const applications = await prismaclient.applications.findMany({
      where: {
        jobs: {
          companyId: company.id,
        },
      },
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

    return NextResponse.json({
      success: true,
      message: "Company applications fetched successfully",
      data: applications,
    });
  } catch (error) {
    return serverError("Company applications fetch error:", error);
  }
}
