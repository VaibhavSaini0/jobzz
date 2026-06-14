import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import prismaclient from "@/services/prisma";
import { Checkcookie } from "@/HelperFun/Checkcookie";
import { CompanybyUser } from "@/HelperFun/CompanybyUser";
import { CACHE_TAGS } from "@/lib/data-cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requiredFields = [
      "title",
      "description",
      "location",
      "salary",
      "employment_type",
      "job_type",
      "apply_through",
      "companyId",
    ];

    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const company = await prismaclient.company.findFirst({
      where: {
        id: body.companyId,
        OR: [
          { ownerId: user.id },
          { employers: { some: { id: user.id } } }
        ]
      },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "You are not authorized to create a job listing for this company" },
        { status: 403 }
      );
    }

    const job = await prismaclient.job.create({
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        salary: Number(body.salary),
        employment_type: body.employment_type,
        job_type: body.job_type,
        apply_through: body.apply_through,
        companyId: body.companyId,
        lastDate: body.lastDate ? new Date(body.lastDate) : null,
      },
    });

    revalidateTag(CACHE_TAGS.jobsList);
    revalidateTag(CACHE_TAGS.featuredJobs);
    revalidateTag(CACHE_TAGS.platformStats);

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error("POST /api/job error:", error);
    return NextResponse.json(
      { success: false, message:  "Something went wrong" },
      { status: 500 }
    );
  }
}

