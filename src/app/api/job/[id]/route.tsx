import { NextRequest, NextResponse } from "next/server";
import { getCachedJobById } from "@/lib/data-cache";
import { withPublicCache } from "@/lib/http-cache";
import { serverError } from "@/lib/api-error";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const job = await getCachedJobById(id);

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    return withPublicCache(
      NextResponse.json({ success: true, data: job })
    );
  } catch (error) {
    return serverError("Job fetch error:", error);
  }
}
