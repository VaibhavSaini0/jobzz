import { unstable_cache } from "next/cache";
import prismaclient from "@/services/prisma";
import type { Prisma } from "../../generated/prisma";

export const CACHE_TTL = 60;

export const CACHE_TAGS = {
  jobsList: "jobs-list",
  featuredJobs: "featured-jobs",
  platformStats: "platform-stats",
  job: (id: string) => `job-${id}`,
} as const;

export const getFeaturedJobs = unstable_cache(
  async () =>
    prismaclient.job.findMany({
      take: 6,
      orderBy: { id: "desc" },
      include: { company: { select: { name: true } } },
    }),
  ["featured-jobs"],
  { revalidate: CACHE_TTL, tags: [CACHE_TAGS.featuredJobs, CACHE_TAGS.jobsList] }
);

export const getPlatformStats = unstable_cache(
  async () => {
    const [jobs, companies, users, applications] = await Promise.all([
      prismaclient.job.count(),
      prismaclient.company.count(),
      prismaclient.user.count(),
      prismaclient.applications.count(),
    ]);
    return { jobs, companies, users, applications };
  },
  ["platform-stats"],
  { revalidate: CACHE_TTL, tags: [CACHE_TAGS.platformStats, CACHE_TAGS.jobsList] }
);

type JobWhere = Prisma.jobWhereInput;

export function getCachedJobsPage(
  where: JobWhere | undefined,
  page: number,
  pageSize: number
) {
  const cacheKey = JSON.stringify({ where, page, pageSize });
  return unstable_cache(
    async () => {
      const [jobs, total] = await Promise.all([
        prismaclient.job.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: { company: true },
          orderBy: { id: "desc" },
        }),
        prismaclient.job.count({ where }),
      ]);
      return { jobs, total };
    },
    ["jobs-list", cacheKey],
    { revalidate: CACHE_TTL, tags: [CACHE_TAGS.jobsList] }
  )();
}

export function getCachedJobById(id: string) {
  return unstable_cache(
    async () =>
      prismaclient.job.findUnique({
        where: { id },
        include: { company: true },
      }),
    ["job", id],
    { revalidate: CACHE_TTL, tags: [CACHE_TAGS.jobsList, CACHE_TAGS.job(id)] }
  )();
}

export function getCachedJobMetadata(id: string) {
  return unstable_cache(
    async () =>
      prismaclient.job.findUnique({
        where: { id },
        include: { company: { select: { name: true } } },
      }),
    ["job-meta", id],
    { revalidate: CACHE_TTL, tags: [CACHE_TAGS.job(id)] }
  )();
}
