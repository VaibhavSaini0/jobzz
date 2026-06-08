import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const job = body.job;
  const user = await Checkcookie();

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const company = await prismaclient.company.findUnique({
      where: {
        id: job.companyId,
        ownerId: user.id,
      },
    });

    if (!company) {
      return NextResponse.json({
        success: false,
        message: "You do not own this job's company",
      });
    }

    const deleted = await prismaclient.job.delete({
      where: {
        id: job.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (err) {
    console.error("Error deleting job:", err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
