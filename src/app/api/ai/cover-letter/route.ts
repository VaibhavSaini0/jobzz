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
        { success: false, message: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    const { jobId } = await req.json();
    if (!jobId) {
      return NextResponse.json(
        { success: false, message: "Missing jobId" },
        { status: 400 }
      );
    }

    const [resume, job] = await Promise.all([
      prismaclient.resume.findUnique({ where: { userId: user.id } }),
      prismaclient.job.findUnique({
        where: { id: jobId },
        include: { company: true },
      }),
    ]);

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    const candidateResume = resume ?? {
      title: "Professional",
      summary: null as string | null,
      skills: [] as string[],
      educations: [] as string[],
      experiences: [] as string[],
      projects: [] as string[],
    };

    if (!process.env.GEMINI_API_KEY) {
      const skillsText =
        candidateResume.skills.length > 0
          ? candidateResume.skills.slice(0, 4).join(", ")
          : "your relevant technical skills";

      const fallbackLetter = `Dear Hiring Team at ${job.company.name},

I am writing to express my interest in the ${job.title} position. With experience in modern software development, I believe my background aligns well with your team's needs.

This ${job.job_type} role in ${job.location} is a strong match for my skill set, including ${skillsText}. I am excited about the opportunity to contribute to ${job.company.name}.

Thank you for your consideration.

Sincerely,
${user.name}`;

      return NextResponse.json({
        success: true,
        data: fallbackLetter,
        isDemo: true,
        message: "Demo cover letter. Set GEMINI_API_KEY for AI-powered letters.",
      });
    }

    const prompt = `Draft a professional cover letter (300-400 words) for this candidate applying to the job below. Use actual names and details. Output only the letter text.

Candidate: ${user.name}
Skills: ${candidateResume.skills?.join(", ") || "Not provided"}
Summary: ${candidateResume.summary || "Not provided"}
Experience: ${candidateResume.experiences?.join("; ") || "Not provided"}
Education: ${candidateResume.educations?.join("; ") || "Not provided"}

Job: ${job.title} at ${job.company.name}
Location: ${job.location} | Type: ${job.job_type} | Employment: ${job.employment_type}
Description: ${job.description.slice(0, 1500)}`;

    const result = await generateWithGemini(prompt);

    return NextResponse.json({
      success: true,
      data: result.text || "Failed to generate cover letter.",
      isDemo: false,
    });
  } catch (error) {
    return serverError("AI Cover Letter error:", error);
  }
}
