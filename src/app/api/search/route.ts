import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchparams = req.nextUrl.searchParams;
    const q = searchparams.get("q")?.trim() || "";
    const et = searchparams.get("et")?.trim() || "";
    const jt = searchparams.get("jt")?.trim() || "";
    const page = Math.max(1, Number(searchparams.get("page")) || 1);
    const pageSize = Math.min(50, Math.max(1, Number(searchparams.get("limit")) || 20));

    const whereClause: { AND: Record<string, unknown>[] } = { AND: [] };

    if (q) {
      whereClause.AND.push({
        title: { contains: q, mode: "insensitive" },
      });
    }

    if (et) {
      whereClause.AND.push({ employment_type: { equals: et } });
    }

    if (jt) {
      whereClause.AND.push({ job_type: { equals: jt } });
    }

    const where =
      whereClause.AND.length === 0 ? undefined : whereClause;

    const [jobs, total] = await Promise.all([
      prismaclient.job.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { company: true },
        orderBy: { id: "desc" },
      }),
      prismaclient.job.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: jobs,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
      message: "Search completed",
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
