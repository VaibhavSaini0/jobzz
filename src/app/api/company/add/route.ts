import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest) {
  const body = await res.json();
  const user = await Checkcookie();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 }
    );
  }

  const { name, description } = body;

  if (!name?.trim() || !description?.trim()) {
    return NextResponse.json(
      { success: false, message: "Company name and description are required" },
      { status: 400 }
    );
  }

  try {
    const existing = await prismaclient.company.findUnique({
      where: { ownerId: user.id },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "You already have a registered company" },
        { status: 409 }
      );
    }

    const company = await prismaclient.company.create({
      data: {
        name: String(name).trim(),
        description: String(description).trim(),
        ownerId: user.id,
      },
    });

    await prismaclient.user.update({
      where: { id: user.id },
      data: { companyId: company.id },
    });

    return NextResponse.json({
      success: true,
      message: "Company created successfully",
      res: company,
    });
  } catch (err) {
    console.error("Company create error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
