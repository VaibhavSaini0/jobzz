import JobCard from "@/components/cards/job-card";
import FilterSidebar from "@/components/filter-sidebar";
import prismaclient from "@/services/prisma";
import Link from "next/link";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Developer & Tech Jobs",
  description: "Browse the latest open tech jobs, remote developer positions, full stack engineering opportunities, and manage your applications on Jobzz.",
};

type SearchParams = Promise<{ q?: string; et?: string; jt?: string; page?: string }>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const et = params.et?.trim() || "";
  const jt = params.jt?.trim() || "";
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = 6;

  const whereClause: any = {
    AND: [],
  };

  if (q) {
    whereClause.AND.push({
      title: {
        contains: q,
        mode: "insensitive",
      },
    });
  }

  if (et) {
    whereClause.AND.push({
      employment_type: {
        equals: et,
      },
    });
  }

  if (jt) {
    whereClause.AND.push({
      job_type: {
        equals: jt,
      },
    });
  }

  if (whereClause.AND.length === 0) {
    delete whereClause.AND;
  }

  const [jobs, totalJobs] = await Promise.all([
    prismaclient.job.findMany({
      where: whereClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        company: true,
      },
    }),
    prismaclient.job.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalJobs / pageSize);

  function buildPageUrl(targetPage: number) {
    const queryParams = new URLSearchParams();
    if (q) queryParams.set("q", q);
    if (et) queryParams.set("et", et);
    if (jt) queryParams.set("jt", jt);
    queryParams.set("page", String(targetPage));
    return `/jobs?${queryParams.toString()}`;
  }

  return (
    <div className="max-w-[100vw] min-h-screen py-8">
      <div className="max-w-7xl m-auto flex flex-col md:flex-row gap-8 px-6">
        <aside className="w-full md:w-64 shrink-0">
          <FilterSidebar />
        </aside>
        
        <main className="flex-1 flex flex-col justify-between">
          <div>
            {jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-card-bg border border-card-border rounded-2xl p-8 shadow-sm">
                <p className="text-lg font-bold text-foreground">No jobs found matching your filters.</p>
                <p className="text-sm text-text-muted mt-2">Try clearing your filters or widening your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard fromSearch={true} key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <Flex justify="center" align="center" gap="4" mt="8" className="pt-6 border-t border-card-border/50">
              {page > 1 ? (
                <Link href={buildPageUrl(page - 1)}>
                  <Button variant="outline" color="indigo" className="cursor-pointer flex items-center gap-1">
                    <ChevronLeft size={16} /> Previous
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" color="gray" disabled className="flex items-center gap-1 opacity-50">
                  <ChevronLeft size={16} /> Previous
                </Button>
              )}

              <Text size="2" className="text-text-muted font-medium">
                Page <span className="text-foreground font-semibold">{page}</span> of <span className="text-foreground font-semibold">{totalPages}</span>
              </Text>

              {page < totalPages ? (
                <Link href={buildPageUrl(page + 1)}>
                  <Button variant="outline" color="indigo" className="cursor-pointer flex items-center gap-1">
                    Next <ChevronRight size={16} />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" color="gray" disabled className="flex items-center gap-1 opacity-50">
                  Next <ChevronRight size={16} />
                </Button>
              )}
            </Flex>
          )}
        </main>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
