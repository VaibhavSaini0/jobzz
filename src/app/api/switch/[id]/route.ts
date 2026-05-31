import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { AUTH_COOKIE_OPTIONS } from "@/lib/auth-cookies";
import { serverError } from "@/lib/api-error";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is missing" },
        { status: 400 }
      );
    }

    const TokenKey = process.env.SECRET;
    if (!TokenKey) {
      throw new Error("JWT Secret Key is not defined in .env");
    }

    const existingTokenCookie = req.cookies.get("token")?.value || "";
    let authorized = false;

    if (existingTokenCookie) {
      try {
        const usersTokenPayload = JSON.parse(existingTokenCookie);
        for (const key of Object.keys(usersTokenPayload)) {
          try {
            const decoded = jwt.verify(usersTokenPayload[key], TokenKey) as { id: string };
            if (decoded.id === id) {
              authorized = true;
              break;
            }
          } catch {
            continue;
          }
        }
      } catch {
        authorized = false;
      }
    }

    if (!authorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized account switch attempt" },
        { status: 401 }
      );
    }

    const user = await prismaclient.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const { password: _password, ...userData } = user;
    const token = jwt.sign({ id: user.id }, TokenKey, { expiresIn: "1d" });

    const res = NextResponse.json({ success: true, user: userData });
    res.cookies.set("Active_User", token, AUTH_COOKIE_OPTIONS);
    return res;
  } catch (error) {
    return serverError("Switch account error:", error);
  }
}
