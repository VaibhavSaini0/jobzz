import { NextResponse } from "next/server";

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}

export function serverError(context: string, error: unknown) {
  console.error(context, error);
  return NextResponse.json(
    { success: false, message: "Something went wrong" },
    { status: 500 }
  );
}
