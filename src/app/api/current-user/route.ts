import { NextRequest, NextResponse } from "next/server";
import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { AUTH_COOKIE_OPTIONS } from "@/lib/auth-cookies";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("Active_User")?.value || "";
  const user = await Checkcookie();

  if (!user) {
    const res = NextResponse.json({
      success: false,
      message: "The user does not exist",
    });
    res.cookies.delete("Active_User");
    return res;
  }

  let company = null;
  if (user.companyId) {
    company = await prismaclient.company.findUnique({
      where: { id: user.companyId },
    });
  } else {
    company = await prismaclient.company.findUnique({
      where: { ownerId: user.id },
    });
    if (company) {
      await prismaclient.user.update({
        where: { id: user.id },
        data: { companyId: company.id },
      });
      user.companyId = company.id;
    }
  }

  const res = NextResponse.json({ success: true, user, company });
  if (token) {
    res.cookies.set("Active_User", token, AUTH_COOKIE_OPTIONS);
  }
  return res;
}
