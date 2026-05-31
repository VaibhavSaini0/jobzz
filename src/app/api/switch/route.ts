import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serverError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  const TotalUser: { id: string; name: string; email: string; role: string }[] = [];
  const existingToken = req.cookies.get("token")?.value || "";

  try {
    const TokenKey = process.env.SECRET;
    if (!TokenKey) {
      throw new Error("JWT Secret is not defined in env");
    }

    if (existingToken) {
      const data = JSON.parse(existingToken) as Record<string, string>;
      for (const key of Object.keys(data)) {
        try {
          const decoded = jwt.verify(data[key], TokenKey) as { id: string };
          const user = await prismaclient.user.findUnique({
            where: { id: decoded.id },
            omit: { password: true },
          });
          if (user) TotalUser.push(user);
        } catch {
          continue;
        }
      }
    }

    return NextResponse.json({ success: true, users: TotalUser });
  } catch (error) {
    return serverError("Switch list error:", error);
  }
}
