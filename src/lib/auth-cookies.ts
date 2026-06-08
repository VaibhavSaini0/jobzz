import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const isProduction = process.env.NODE_ENV === "production";

export const AUTH_COOKIE_OPTIONS: Partial<ResponseCookie> = {
  path: "/",
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  maxAge: 60 * 60 * 24, // 1 day
};

export function setAuthCookies(
  response: { cookies: { set: (name: string, value: string, options?: Partial<ResponseCookie>) => void } },
  activeToken: string,
  tokenPayload: string
) {
  response.cookies.set("Active_User", activeToken, AUTH_COOKIE_OPTIONS);
  response.cookies.set("token", tokenPayload, AUTH_COOKIE_OPTIONS);
}
