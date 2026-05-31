import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini, cleanAndParseJSON } from "@/lib/gemini";
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

    const { applicationId } = await req.json();
    if (!applicationId) {
      return NextResponse.json(
        { success: false, message: "applicationId is required" },
        { status: 400 }
      );
    }

    const application = await prismaclient.applications.findUnique({
      where: { id: applicationId },
      include: {
        user: true,
        jobs: { include: { company: true } },
        Resume: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    const company = await prismaclient.company.findUnique({
      where: {
        id: application.jobs.companyId,
        ownerId: user.id,
      },
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const resume = application.Resume ?? await prismaclient.resume.findUnique({
      where: { userId: application.user_id },
    });

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        success: true,
        data: {
          score: 68,
          recommendation: "Consider for further review",
          summary: `${application.user.name} shows potential for ${application.jobs.title}. Enable GEMINI_API_KEY for detailed AI screening.`,
          highlights: ["Profile submitted", "Application received"],
          concerns: ["Limited resume data for deep analysis"],
        },
        isDemo: true,
      });
    }

    const prompt = `You are a technical recruiter. Screen this candidate for the job. Respond ONLY with valid JSON:
{
  "score": <0-100>,
  "recommendation": "Strong Fit" | "Consider" | "Weak Fit",
  "summary": "<2-3 sentences>",
  "highlights": ["point1", "point2"],
  "concerns": ["point1"]
}

Candidate: ${application.user.name}
Skills: ${resume?.skills?.join(", ") || "none"}
Summary: ${resume?.summary || "none"}
Experience: ${resume?.experiences?.join("; ") || "none"}

Job: ${application.jobs.title} at ${application.jobs.company.name}
Description: ${application.jobs.description.slice(0, 1200)}`;

    const result = await generateWithGemini(prompt);

    const fallback = {
      score: 65,
      recommendation: "Consider",
      summary: "Could not screen the candidate profile automatically.",
      highlights: [] as string[],
      concerns: [] as string[],
    };

    const parsed = cleanAndParseJSON(result.text, fallback);

    return NextResponse.json({ success: true, data: parsed, isDemo: false });
  } catch (error) {
    return serverError("Candidate screening error:", error);
  }
}
