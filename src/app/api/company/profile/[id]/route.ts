import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const isPublicView = req.nextUrl.searchParams.get("public") === "true";

  try {
    const company = await prismaclient.company.findUnique({
      where: { id },
      include: {
        jobs: true,
        review: { include: { user: { select: { id: true, name: true } } } },
        employers: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    if (isPublicView) {
      return NextResponse.json({ success: true, data: company });
    }

    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not a valid user" },
        { status: 401 }
      );
    }

    if (company.ownerId !== user.id && user.companyId !== company.id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, data: company });
  } catch (error) {
    console.error("Fetch company error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = await Checkcookie();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Not a valid user" },
      { status: 401 }
    );
  }

  try {
    const company = await prismaclient.company.findUnique({
      where: { id },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    if (company.ownerId !== user.id && user.companyId !== company.id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      name,
      description,
      website,
      location,
      logoUrl,
      industry,
      companySize,
      founded,
      phone,
      email,
    } = body;

    const updated = await prismaclient.company.update({
      where: { id },
      data: {
        name: name !== undefined ? String(name).trim() : undefined,
        description: description !== undefined ? String(description).trim() : undefined,
        website: website !== undefined ? String(website).trim() : undefined,
        location: location !== undefined ? String(location).trim() : undefined,
        logoUrl: logoUrl !== undefined ? String(logoUrl).trim() : undefined,
        industry: industry !== undefined ? String(industry).trim() : undefined,
        companySize: companySize !== undefined ? String(companySize).trim() : undefined,
        founded: founded !== undefined ? String(founded).trim() : undefined,
        phone: phone !== undefined ? String(phone).trim() : undefined,
        email: email !== undefined ? String(email).trim() : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Company updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update company error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
