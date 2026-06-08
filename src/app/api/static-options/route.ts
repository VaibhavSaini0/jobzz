import { NextResponse } from "next/server";
import prismaclient from "@/services/prisma";

export async function GET() {
  try {
    const options = await prismaclient.staticOption.findMany({
      orderBy: { value: "asc" },
    });

    const grouped = options.reduce((acc: Record<string, string[]>, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item.value);
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      data: {
        industry: grouped.industry || [],
        size: grouped.size || [],
        location: grouped.location || [],
        skill: grouped.skill || [],
      },
    });
  } catch (error) {
    console.error("Static options error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
