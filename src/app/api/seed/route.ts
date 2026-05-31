import { NextResponse } from "next/server";
import prismaclient from "@/services/prisma";
import { jobs } from "@/data";
import { Checkcookie } from "@/HelperFun/Checkcookie";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { success: false, message: "Seeding is disabled in production" },
      { status: 403 }
    );
  }

  const user = await Checkcookie();
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401 }
    );
  }

  const jobdata = jobs.data;
  const et = ["Full-Time", "Part-Time", "Contract"];
  const jt = ["Remote", "On-site", "Hybrid"];
  const at = ["Google", "LinkedIn"];

  if (!Array.isArray(jobdata)) {
    return NextResponse.json({ success: false, message: "Invalid job data" }, { status: 400 });
  }

  const company = await prismaclient.company.findFirst();
  if (!company) {
    return NextResponse.json(
      { success: false, message: "Create a company first before seeding jobs" },
      { status: 400 }
    );
  }

  let seeded = 0;
  for (const item of jobdata) {
    await prismaclient.job.create({
      data: {
        title: item.job_title,
        description: item.job_description,
        location: item.job_location,
        salary: Math.floor(Math.random() * 100000) + 30000,
        employment_type: et[Math.floor(Math.random() * et.length)],
        job_type: jt[Math.floor(Math.random() * jt.length)],
        apply_through: at[Math.floor(Math.random() * at.length)],
        companyId: company.id,
      },
    });
    seeded++;
  }

  return NextResponse.json({
    success: true,
    message: `Seeded ${seeded} jobs for ${company.name}`,
  });
}
