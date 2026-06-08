import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await Checkcookie();
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    let company = null;
    if (user.companyId) {
      company = await prismaclient.company.findUnique({
        where: { id: user.companyId },
        include: { jobs: true },
      });
    } else {
      company = await prismaclient.company.findUnique({
        where: { ownerId: user.id },
        include: { jobs: true },
      });
    }

    if (!company) {
      return NextResponse.json({
        success: false,
        message: "Company does not exist",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Jobs fetched successfully",
      data: company,
    });
  } catch (err) {
    console.error("Error fetching company jobs:", err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
