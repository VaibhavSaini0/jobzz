import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setAuthCookies } from "@/lib/auth-cookies";
import { normalizeRole } from "@/lib/roles";
import { serverError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Enter valid name, email, and password" },
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
    const safeRole = normalizeRole(role);

    const check = await prismaclient.user.findFirst({
      where: { email: normalizedEmail },
    });

    if (check) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaclient.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        role: safeRole,
        name: String(name).trim(),
      },
    });

    const TokenKey = process.env.SECRET;
    if (!TokenKey) {
      throw new Error("JWT Secret Key is not defined in .env");
    }

    const token = jwt.sign({ id: user.id }, TokenKey, { expiresIn: "1d" });
    const usersTokenPayload: Record<string, string> = { User_0: token };

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    setAuthCookies(response, token, JSON.stringify(usersTokenPayload));
    return response;
  } catch (error) {
    return serverError("Signup error:", error);
  }
}
