"use client";

import JobApplyBtn from "@/components/JobApplyBtn";
import AppliedUserList, {
  type ApplicantRecord,
} from "@/components/modals/AppliedUserList";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import WithdrawalBtn from "@/components/WithdrawalBtn";
import AICoverLetterModal from "@/components/AICoverLetterModal";
import AIJobMatchModal from "@/components/AIJobMatchModal";
import { UserContext } from "@/context/UserContext";
import JobDetailSkeleton from "@/components/skeleton/JobDetailSkeleton";
import { cachedFetch } from "@/lib/client-cache";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  employment_type: string;
  job_type: string;
  apply_through: string;
  company: { id: string; name: string };
  companyId: string;
  lastDate: string | null;
};

export default function JobDetailPage() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAppModal, setIsAppModal] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [applicants, setApplicants] = useState<ApplicantRecord[]>([]);
  const [isApplied, setIsApplied] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { user, company } = useContext(UserContext);

  useEffect(() => {
    if (!loading && job && user && user.role === "admin") {
      const isOwner = company?.id === job.companyId;
      if (!isOwner) {
        router.push("/profile");
      }
    }
  }, [loading, job, user, company, router]);

  useEffect(() => {
    async function fetchJob() {
      setLoading(true);
      try {
        const json = await cachedFetch<{ success?: boolean; data?: Job }>(
          `/api/job/${id}`,
          { ttlMs: 60_000 }
        );
        setJob(json.data ?? (json as unknown as Job));
      } catch (err) {
        console.error("Failed to load job:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  useEffect(() => {
    async function fetchApplicationState() {
      if (!job || !user) return;
      const isOwner = company?.id === job.companyId;

      if (isOwner) {
        try {
          const res = await fetch(`/api/applicants/${job.id}`);
          const data = await res.json();
          if (data.success) setApplicants(data.data ?? []);
        } catch (err) {
          console.error("Failed to load applicants:", err);
        }
        return;
      }

      try {
        const res = await fetch(`/api/applications/check/${job.id}`);
        const data = await res.json();
        if (data.success) setIsApplied(Boolean(data.applied));
      } catch (err) {
        console.error("Failed to check application:", err);
      }
    }
    fetchApplicationState();
  }, [job, user, company]);

  function handleStatusChange(applicationId: string, status: string) {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status } : a))
    );
  }

  if (loading) return <JobDetailSkeleton />;
  if (!job) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-500 font-semibold">Job not found.</p>
      </div>
    );
  }

  const isOwner = company?.id === job.companyId;
  const isCandidate = user && !isOwner;
  const isExpired = job.lastDate ? new Date() > new Date(job.lastDate) : false;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground mb-1 tracking-tight">{job.title}</h1>
          <p className="text-sm text-text-muted">
            {job.location} • {job.job_type} • {job.employment_type}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isOwner && (
            <button
              onClick={() => setIsAppModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/40 rounded-xl text-sm font-semibold transition duration-200"
            >
              <Users size={16} />
              Applicants ({applicants.length})
            </button>
          )}
          {isCandidate && (
            <>
              <button
                onClick={() => setIsMatchModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl text-sm font-semibold transition duration-200"
              >
                <TrendingUp size={16} /> AI Match
              </button>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-semibold transition duration-200"
              >
                <Sparkles size={16} /> AI Cover Letter
              </button>
            </>
          )}
          {isCandidate && (
            isExpired ? (
              !isApplied ? (
                <button
                  disabled
                  className="px-4 py-2 bg-border-muted/50 text-text-muted rounded-xl text-sm font-semibold cursor-not-allowed"
                >
                  Deadline Passed
                </button>
              ) : (
                <WithdrawalBtn job={job} isApplied={isApplied} setIsApplied={setIsApplied} />
              )
            ) : (
              !isApplied ? (
                <JobApplyBtn job={job} isApplied={isApplied} setIsApplied={setIsApplied} />
              ) : (
                <WithdrawalBtn job={job} isApplied={isApplied} setIsApplied={setIsApplied} />
              )
            )
          )}
        </div>
      </div>

      {isCandidate && (
        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-500 shrink-0" />
            <p className="text-sm text-text-muted">
              Use <strong>AI Match</strong> to see how well your profile fits this role, then generate a tailored cover letter.
            </p>
          </div>
        </div>
      )}

      <hr className="border-card-border/50" />

      <div className="p-4 bg-card-bg border border-card-border rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-500 text-lg border border-indigo-500/20 shrink-0">
            {job.company.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-lg font-semibold text-foreground">{job.company.name}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-foreground">Job Description</h2>
        <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line bg-card-bg/25 border border-card-border/40 p-5 rounded-2xl">{job.description}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Details</h2>
        <div className="flex flex-col gap-2.5 bg-card-bg/25 border border-card-border/40 p-5 rounded-2xl text-sm text-text-muted">
          <p><strong>Salary:</strong> ₹{job.salary.toLocaleString()}</p>
          <p><strong>Employment Type:</strong> {job.employment_type}</p>
          <p><strong>Job Type:</strong> {job.job_type}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <div className="flex items-center gap-2">
            <strong>Apply via:</strong>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
              {job.apply_through}
            </span>
          </div>
          {job.lastDate && (
            <p>
              <strong>Application Deadline:</strong>{" "}
              <span className={isExpired ? "text-red-500 font-semibold" : "text-indigo-600 dark:text-indigo-400 font-semibold"}>
                {new Date(job.lastDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                {isExpired && " (Passed)"}
              </span>
            </p>
          )}
        </div>
      </div>

      {isAppModal && (
        <AppliedUserList
          isAppModal={isAppModal}
          setIsAppModal={setIsAppModal}
          applicants={applicants}
          onStatusChange={handleStatusChange}
        />
      )}
      {isAiModalOpen && (
        <AICoverLetterModal job={job} isOpen={isAiModalOpen} setIsOpen={setIsAiModalOpen} />
      )}
      {isMatchModalOpen && (
        <AIJobMatchModal job={job} isOpen={isMatchModalOpen} setIsOpen={setIsMatchModalOpen} />
      )}
    </div>
  );
}
