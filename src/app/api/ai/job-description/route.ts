import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/gemini";
import { serverError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  try {
    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, location, employment_type, job_type, companyName } =
      await req.json();

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, message: "Job title is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      const demo = `About the Role

We are looking for a ${title} to join ${companyName || "our team"}. You will work on meaningful projects in a ${job_type || "collaborative"} environment.

Responsibilities:
• Design, build, and maintain high-quality software
• Collaborate with cross-functional teams
• Write clean, testable, and scalable code

Requirements:
• Strong problem-solving skills
• Experience relevant to ${title}
• Good communication and teamwork

(Add GEMINI_API_KEY for AI-generated descriptions tailored to your role.)`;

      return NextResponse.json({
        success: true,
        data: demo,
        isDemo: true,
      });
    }

    const prompt = `Write a professional job description for a job posting. Output plain text only, 150-250 words, with sections: About the Role, Responsibilities, Requirements.

Title: ${title}
Company: ${companyName || "Our company"}
Location: ${location || "Not specified"}
Employment Type: ${employment_type || "Full-Time"}
Work Mode: ${job_type || "Hybrid"}`;

    const result = await generateWithGemini(prompt);

    return NextResponse.json({
      success: true,
      data: result.text || "Could not generate description.",
      isDemo: false,
    });
  } catch (error) {
    return serverError("Job description AI error:", error);
  }
}
