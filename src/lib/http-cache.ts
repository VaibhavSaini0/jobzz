import { NextResponse } from "next/server";

export function withPublicCache(
  response: NextResponse,
  maxAge = 60,
  staleWhileRevalidate = 120
) {
  response.headers.set(
    "Cache-Control",
    `public, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`
  );
  return response;
}
