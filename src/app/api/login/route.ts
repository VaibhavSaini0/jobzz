import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { setAuthCookies } from "@/lib/auth-cookies";
import { serverError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  const existingToken = req.cookies.get("token")?.value || "";

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Login details are not valid" },
        { status: 400 }
      );
    }

    const user = await prismaclient.user.findUnique({
      where: { email: String(email).trim().toLowerCase() },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { success: false, message: "User does not exist or credentials are wrong" },
        { status: 401 }
      );
    }

    const TokenKey = process.env.SECRET;
    if (!TokenKey) {
      throw new Error("JWT Secret Key is not defined in .env");
    }

    const newToken = jwt.sign({ id: user.id }, TokenKey, { expiresIn: "1d" });

    let usersTokenPayload: Record<string, string> = {};

    if (existingToken) {
      try {
        usersTokenPayload = JSON.parse(existingToken);
      } catch {
        usersTokenPayload = {};
      }
    }

    const userAlreadyExists = Object.values(usersTokenPayload).some((token) => {
      try {
        const decoded = jwt.verify(token, TokenKey) as { id: string };
        return decoded.id === user.id;
      } catch {
        return false;
      }
    });

    if (!userAlreadyExists) {
      const newKey = `User_${Object.keys(usersTokenPayload).length + 1}`;
      usersTokenPayload[newKey] = newToken;
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    setAuthCookies(response, newToken, JSON.stringify(usersTokenPayload));
    return response;
  } catch (error) {
    return serverError("Login error:", error);
  }
}
