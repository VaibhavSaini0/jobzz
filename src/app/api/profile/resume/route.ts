import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { serverError } from "@/lib/api-error";

export async function GET() {
  try {
    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const resume = await prismaclient.resume.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({ success: true, data: resume });
  } catch (error) {
    return serverError("Resume fetch error:", error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await Checkcookie();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title = "",
      summary = "",
      phone = "",
      location = "",
      website = "",
      skills = [],
      experiences = [],
      educations = [],
      projects = [],
      profileImageUrl = null,
    } = body;

    const resume = await prismaclient.resume.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        title: String(title),
        summary: summary ? String(summary) : null,
        phone: phone ? String(phone) : null,
        location: location ? String(location) : null,
        website: website ? String(website) : null,
        skills: Array.isArray(skills) ? skills.map(String) : [],
        experiences: Array.isArray(experiences) ? experiences.map(String) : [],
        educations: Array.isArray(educations) ? educations.map(String) : [],
        projects: Array.isArray(projects) ? projects.map(String) : [],
        profileImageUrl: profileImageUrl ? String(profileImageUrl) : null,
      },
      update: {
        title: String(title),
        summary: summary ? String(summary) : null,
        phone: phone ? String(phone) : null,
        location: location ? String(location) : null,
        website: website ? String(website) : null,
        skills: Array.isArray(skills) ? skills.map(String) : [],
        experiences: Array.isArray(experiences) ? experiences.map(String) : [],
        educations: Array.isArray(educations) ? educations.map(String) : [],
        projects: Array.isArray(projects) ? projects.map(String) : [],
        profileImageUrl: profileImageUrl ? String(profileImageUrl) : null,
      },
    });

    return NextResponse.json({ success: true, data: resume });
  } catch (error) {
    return serverError("Resume save error:", error);
  }
}
