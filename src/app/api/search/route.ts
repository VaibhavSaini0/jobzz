import { NextRequest, NextResponse } from "next/server";
import { getCachedJobsPage } from "@/lib/data-cache";
import { withPublicCache } from "@/lib/http-cache";

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

    const { jobs, total } = await getCachedJobsPage(where, page, pageSize);

    return withPublicCache(
      NextResponse.json({
        success: true,
        data: jobs,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
        message: "Search completed",
      })
    );
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
