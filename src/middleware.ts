import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/add-job", "/applied-jobs", "/company/profile", "/company/applications", "/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/adddata")) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/seed") && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { success: false, message: "Not available in production" },
      { status: 403 }
    );
  }

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isProtected) {
    const token = request.cookies.get("Active_User")?.value;
    if (!token) {
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("login", "required");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-job/:path*",
    "/applied-jobs/:path*",
    "/company/profile/:path*",
    "/company/applications/:path*",
    "/profile/:path*",
    "/adddata/:path*",
    "/api/seed",
  ],
};
