import prismaclient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [jobCount, companyCount, userCount, applicationCount] = await Promise.all([
      prismaclient.job.count(),
      prismaclient.company.count(),
      prismaclient.user.count(),
      prismaclient.applications.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        jobs: jobCount,
        companies: companyCount,
        users: userCount,
        applications: applicationCount,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
