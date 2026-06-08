import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const user = await Checkcookie();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Get active company
    let company = null;
    if (user.companyId) {
      company = await prismaclient.company.findUnique({
        where: { id: user.companyId },
      });
    } else {
      company = await prismaclient.company.findUnique({
        where: { ownerId: user.id },
      });
    }

    if (!company) {
      return NextResponse.json(
        { success: false, message: "No registered company found. Please register a company first." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, email, password } = body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (String(password).length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Check if user exists
    const checkUser = await prismaclient.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (checkUser) {
      // User exists
      if (checkUser.companyId) {
        if (checkUser.companyId === company.id) {
          return NextResponse.json(
            { success: false, message: "User is already an employer in your company" },
            { status: 400 }
          );
        } else {
          return NextResponse.json(
            { success: false, message: "User already belongs to another company" },
            { status: 400 }
          );
        }
      }

      // Associate existing user
      const updatedUser = await prismaclient.user.update({
        where: { id: checkUser.id },
        data: {
          role: "admin",
          companyId: company.id,
        },
      });

      return NextResponse.json({
        success: true,
        message: `User ${updatedUser.name} has been added as an employer to ${company.name}`,
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
      });
    }

    // Create a new employer user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployer = await prismaclient.user.create({
      data: {
        name: String(name).trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "admin",
        companyId: company.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Employer ${newEmployer.name} successfully created and added to ${company.name}`,
      user: {
        id: newEmployer.id,
        name: newEmployer.name,
        email: newEmployer.email,
        role: newEmployer.role,
      },
    });
  } catch (error) {
    console.error("Add employer error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
