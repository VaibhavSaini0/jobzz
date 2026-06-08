import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const guest = cookieStore.get("guest_user");

  if (guest?.value === "true") {
    return Response.json({ success: true });
  }

  return Response.json({ success: false });
}
