"use client";

import JobCard from "@/components/cards/job-card";
import CardLoading from "@/components/lodingstate/CardLoading";
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
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/search?q=${q}&et=${et}&jt=${jt}`);
        const data = await res.json();
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
          {isLoading
            ? arr.map((item) => (
                <div key={item} className="h-full">
                  <CardLoading fromSearch />
                </div>
              ))
            : jobs.map((job) => (
                <div key={job.id} className="h-full">
                  <JobCard fromSearch={true} job={job} />
                </div>
              ))}
        </div>
      </div>
    </main>
  );
}
