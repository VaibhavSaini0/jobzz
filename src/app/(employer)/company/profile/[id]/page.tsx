"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { job, user, review, company } from "../../../../../../generated/prisma";
import Compreviews from "@/components/Compreviews";
import UserEndComJob from "@/components/cards/UserEndComJob";
import Loading from "@/components/lodingstate/Loading";
import AboutCompany from "@/components/AboutCompany";

type ReviewWithUser = review & {
  user: user;
};

type CompanyWithRelations = company & {
  jobs: job[] | null;
  review: review[] | null;
};

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const [company, setCompany] = useState<CompanyWithRelations | null>(null);
  const [companyJobs, setCompanyJobs] = useState<job[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"about" | "jobopening" | "reviews">("about");

  useEffect(() => {
    async function fetchCompany() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/company/profile/${id}?public=true`);
        const data = await res.json();

        if (data.success) {
          setCompany(data.data as CompanyWithRelations);
          if (data?.data?.jobs) {
            setCompanyJobs(data.data.jobs);
          }
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchCompany();
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-5 min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-5 min-h-screen flex items-center justify-center">
        <span className="text-sm text-text-muted">
          No company information available.
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="p-5 min-h-screen">
        <div className="flex justify-between items-start">
          <div className="mr-5 w-full">
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-foreground">{company?.name || "Company Name"}</h1>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                {company?.description || "Company description goes here."}
              </p>
            </div>

            <div className="mb-4 border-b border-card-border/60 flex gap-6 overflow-x-auto scrollbar-hidden">
              {[
                { id: "about", label: "About" },
                { id: "jobopening", label: "Job Openings" },
                { id: "reviews", label: "Reviews" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`cursor-pointer pb-3 text-sm font-bold border-b-2 transition-all duration-200 whitespace-nowrap active:scale-[0.98] ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-500"
                      : "border-transparent text-text-muted hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-4">
              {activeTab === "about" && (
                <AboutCompany company={company} isLoading={isLoading} />
              )}

              {activeTab === "jobopening" && (
                <div>
                  {!isLoading ? (
                    companyJobs && companyJobs.length > 0 ? (
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-3">
                          Open Positions
                        </h2>
                        <hr className="border-card-border mb-4" />
                        <div className="flex flex-col gap-4">
                          {companyJobs?.map((job) => (
                            <UserEndComJob key={job.id} job={job} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-3">
                          No Job Found
                        </h2>
                      </div>
                    )
                  ) : (
                    <Loading />
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <Compreviews companyId={company?.id} isloading={isLoading} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
