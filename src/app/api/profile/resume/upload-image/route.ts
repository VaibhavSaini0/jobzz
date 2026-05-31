import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import { serverError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  try {
    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image file uploaded" },
        { status: 400 }
      );
    }

    // Only allow image files
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload image file to S3 in 'avatars' folder
    const profileImageUrl = await uploadToS3(buffer, file.name, file.type, "avatars");

    // Update or create the Resume record with the profile image URL
    const resume = await prismaclient.resume.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        title: "Developer Profile",
        profileImageUrl,
      },
      update: {
        profileImageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile image uploaded successfully",
      data: resume,
    });
  } catch (error) {
    return serverError("Profile image S3 upload error:", error);
  }
}
