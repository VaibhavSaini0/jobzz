"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { AUTH_COOKIE_OPTIONS } from "@/lib/auth-cookies";

export async function DeleteAccfromSwitch(id: string) {
  const userCookie = await cookies();
  const existingToken = userCookie.get("token")?.value || "";
  const TokenKey = process.env.SECRET;

  if (!TokenKey) {
    throw new Error("JWT Secret Key is not defined in .env");
  }

  let userdata: Record<string, string> = {};

  if (existingToken) {
    try {
      userdata = JSON.parse(existingToken);
    } catch {
      return { success: false, message: "Invalid token format" };
    }
  }

  const filteredTokens: Record<string, string> = {};
  let i = 0;
  for (const [, token] of Object.entries(userdata)) {
    try {
      const decoded = jwt.verify(token, TokenKey) as { id: string };
      if (decoded.id !== id) {
        filteredTokens[`User_${i}`] = token;
        i++;
      }
    } catch {
      continue;
    }
  }

  userCookie.set("token", JSON.stringify(filteredTokens), AUTH_COOKIE_OPTIONS);

  const active = userCookie.get("Active_User")?.value;
  if (active) {
    try {
      const activeDecoded = jwt.verify(active, TokenKey) as { id: string };
      if (activeDecoded.id === id) {
        userCookie.delete("Active_User");
      }
    } catch {
      // ignore invalid active token
    }
  }

  return { success: true, message: "Account removed from switch list" };
}
