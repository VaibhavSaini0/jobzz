import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini, demoUnavailable, cleanAndParseJSON } from "@/lib/gemini";
import { serverError } from "@/lib/api-error";

function formatExperience(rawList: string[] | undefined): string {
  if (!rawList || rawList.length === 0) return "none";
  return rawList
    .map((raw) => {
      try {
        const parsed = JSON.parse(raw);
        return `${parsed.role} at ${parsed.company} (${parsed.duration})`;
      } catch {
        return raw;
      }
    })
    .join("; ");
}

function formatEducation(rawList: string[] | undefined): string {
  if (!rawList || rawList.length === 0) return "none";
  return rawList
    .map((raw) => {
      try {
        const parsed = JSON.parse(raw);
        return `${parsed.degree} from ${parsed.school} (${parsed.year})`;
      } catch {
        return raw;
      }
    })
    .join("; ");
}

function formatProject(rawList: string[] | undefined): string {
  if (!rawList || rawList.length === 0) return "none";
  return rawList
    .map((raw) => {
      try {
        const parsed = JSON.parse(raw);
        return `${parsed.name}: ${parsed.description}${parsed.link ? ` (Link: ${parsed.link})` : ""}`;
      } catch {
        return raw;
      }
    })
    .join("; ");
}

export async function POST(req: NextRequest) {
  try {
    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { jobId } = await req.json();
    if (!jobId) {
      return NextResponse.json(
        { success: false, message: "jobId is required" },
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

    if (!process.env.GEMINI_API_KEY) {
      const demo = demoUnavailable("AI job match scoring");
      return NextResponse.json({
        success: true,
        data: {
          score: 72,
          summary:
            "Based on your profile, you appear to be a reasonable match for this role. Enable GEMINI_API_KEY for a personalized AI analysis.",
          strengths: ["Relevant tech stack", "Profile completeness"],
          gaps: ["Add more project details to improve match accuracy"],
        },
        isDemo: true,
        message: demo.text,
      });
    }

    const prompt = `Analyze how well this candidate matches the job. Respond ONLY with valid JSON (no markdown):
{
  "score": <number 0-100>,
  "summary": "<2 sentences>",
  "strengths": ["<strength1>", "<strength2>"],
  "gaps": ["<gap1>", "<gap2>"]
}

Candidate: ${user.name}
Skills: ${resume?.skills?.join(", ") || "none listed"}
Summary: ${resume?.summary || "none"}
Experience: ${formatExperience(resume?.experiences)}
Education: ${formatEducation(resume?.educations)}
Projects: ${formatProject(resume?.projects)}

Job: ${job.title} at ${job.company.name}
Type: ${job.job_type} | ${job.employment_type} | ${job.location}
Description: ${job.description.slice(0, 1200)}`;

    const result = await generateWithGemini(prompt);

    const fallback = {
      score: 70,
      summary: "Could not analyze the profile match automatically.",
      strengths: [] as string[],
      gaps: [] as string[],
    };

    const parsed = cleanAndParseJSON(result.text, fallback);

    return NextResponse.json({
      success: true,
      data: parsed,
      isDemo: false,
    });
  } catch (error) {
    return serverError("Job match error:", error);
  }
}
