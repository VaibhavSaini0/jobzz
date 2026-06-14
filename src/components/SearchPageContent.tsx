"use client";

import JobCard from "@/components/cards/job-card";
import { cachedFetch } from "@/lib/client-cache";
import { JobCardSkeletonGrid } from "@/components/skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { job } from "../../generated/prisma";
import { UserContext } from "@/context/UserContext";

export default function SearchPageContent() {
  const searchparams = useSearchParams();
  const router = useRouter();
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    if (user && user.role === "admin") {
      router.push("/profile");
    }
  }, [user, router]);

  const q = searchparams.get("q") || "";
  const et = searchparams.get("et") || "";
  const jt = searchparams.get("jt") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true);
        const data = await cachedFetch<{ success: boolean; data: job[] }>(
          `/api/search?q=${encodeURIComponent(q)}&et=${encodeURIComponent(et)}&jt=${encodeURIComponent(jt)}`,
          { ttlMs: 60_000 }
        );
        if (data.success) {
          setJobs(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, [q, et, jt]);

  return (
    <main className="max-w-7xl m-auto h-screen">
      <div className="h-full overflow-y-auto py-5 px-4 scrollbar-hidden pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            <JobCardSkeletonGrid count={9} />
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="h-full">
                <JobCard fromSearch={true} job={job} />
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
