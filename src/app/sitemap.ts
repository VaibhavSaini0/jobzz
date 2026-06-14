import type { MetadataRoute } from "next";
import prismaclient from "@/services/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jobzz.dev";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/jobs`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${siteUrl}/search`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  ];

  if (!process.env.DATABASE_URL) {
    return staticRoutes;
  }

  try {
    const jobs = await prismaclient.job.findMany({
      select: { id: true },
      take: 500,
      orderBy: { id: "desc" },
    });

    const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
      url: `${siteUrl}/jobs/${job.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...jobRoutes];
  } catch {
    return staticRoutes;
  }
}
