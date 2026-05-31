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
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Only allow PDF files
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { success: false, message: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload file to S3 and get the public URL
    const resumePdfUrl = await uploadToS3(buffer, file.name, file.type);
    const resumePdfName = file.name;

    // Upsert into Resume table for the authenticated user
    const resume = await prismaclient.resume.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        title: "Developer Profile",
        resumePdfUrl,
        resumePdfName,
      },
      update: {
        resumePdfUrl,
        resumePdfName,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Resume uploaded successfully",
      data: resume,
    });
  } catch (error) {
    return serverError("Resume S3 upload error:", error);
  }
}
