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

    const resume = await prismaclient.resume.findUnique({
      where: { userId: user.id },
    });

    const profileData = resume ?? {
      title: "",
      summary: "",
      skills: [],
      experiences: [],
      educations: [],
      projects: [],
    };

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        success: true,
        data: {
          improvedSummary:
            profileData.summary ||
            "Passionate professional eager to contribute to innovative teams.",
          suggestedSkills: ["TypeScript", "React", "Communication", "Problem Solving"],
          tips: [
            "Add quantifiable achievements to your experience section",
            "Include 2-3 portfolio projects with tech stack details",
            "Write a concise 2-sentence professional summary",
          ],
        },
        isDemo: true,
        message: "Demo suggestions. Set GEMINI_API_KEY for personalized AI resume coaching.",
      });
    }

    const prompt = `You are a career coach. Improve this candidate's resume profile. Respond ONLY with valid JSON:
{
  "improvedSummary": "<2-3 sentence professional summary>",
  "suggestedSkills": ["skill1", "skill2", "skill3", "skill4"],
  "tips": ["tip1", "tip2", "tip3"]
}

Current profile:
Title: ${profileData.title}
Summary: ${profileData.summary || "empty"}
Skills: ${profileData.skills?.join(", ") || "none"}
Experience: ${profileData.experiences?.join("; ") || "none"}
Education: ${profileData.educations?.join("; ") || "none"}
Projects: ${profileData.projects?.join("; ") || "none"}`;

    const result = await generateWithGemini(prompt);

    const fallback = {
      improvedSummary: "Failed to automatically generate an improved summary.",
      suggestedSkills: [] as string[],
      tips: ["Review the AI suggestions and try updating your profile details manually."],
    };

    const parsed = cleanAndParseJSON(result.text, fallback);

    return NextResponse.json({ success: true, data: parsed, isDemo: false });
  } catch (error) {
    return serverError("Resume improve error:", error);
  }
}
