"use client";

import {
  Building2,
  Sparkles,
  Edit3,
  Camera,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  Star,
  User,
  ExternalLink,
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { roleLabel } from "@/lib/roles";
import CompanyDetailTab from "@/components/CompanyDetailTab";
import CompanyJobCard from "@/components/cards/CompanyJobCard";

interface RecruiterDashboardProps {
  user: any;
  company: any;
  profileImageUrl: string;
  uploadingImage: boolean;
  phone: string;
  location: string;
  website: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsEditModalOpen: (open: boolean) => void;
}

export default function RecruiterDashboard({
  user,
  company,
  profileImageUrl,
  uploadingImage,
  phone,
  location,
  website,
  handleImageUpload,
  setIsEditModalOpen,
}: RecruiterDashboardProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [companyJobs, setCompanyJobs] = useState<any[]>([]);
  const [companyApps, setCompanyApps] = useState<any[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);

  const [jobsPage, setJobsPage] = useState(1);
  const JOBS_PER_PAGE = 5;

  const totalJobPages = Math.ceil(companyJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = companyJobs.slice(
    (jobsPage - 1) * JOBS_PER_PAGE,
    jobsPage * JOBS_PER_PAGE
  );

  const [activeTab, setActiveTab] = useState("jobs");

  // Load recruiter jobs and applications
  useEffect(() => {
    if (!user?.id) return;

    async function fetchEmployerData() {
      setJobsLoading(true);
      try {
        const jobsRes = await fetch("/api/company/jobs");
        const jobsData = await jobsRes.json();
        if (jobsData.success && jobsData.data?.jobs) {
          setCompanyJobs(jobsData.data.jobs);
        }

        const appsRes = await fetch("/api/company/applications");
        const appsData = await appsRes.json();
        if (appsData.success && appsData.data) {
          setCompanyApps(appsData.data);
        }
      } catch (err) {
        console.error("Error loading recruiter dashboard data:", err);
        toast("Failed to load recruiter data.", "error");
      } finally {
        setJobsLoading(false);
      }
    }

    fetchEmployerData();
  }, [user, toast]);

  return (
    <div className="space-y-8 w-full z-10 relative">

      {/* TOP PREMIUM COVER BANNER */}
      <div className="w-full relative z-10">

        {/* Circular Avatar overlap container */}
        <div className="bg-card-bg border border-card-border rounded-xl p-4 shadow-xl flex flex-col md:flex-row items-center md:items-end px-8 relative z-20 gap-6">
          {/* Interactive Avatar Wrapper with S3 Hover Upload Overlay */}
          <div className="relative group w-32 h-32 rounded-full overflow-hidden border-4 border-background bg-card-bg shadow-xl hover:scale-[1.03] transition-all duration-300 flex items-center justify-center shrink-0">
            {uploadingImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                <span className="w-6 h-6 border-2 border-t-transparent border-indigo-400 rounded-full animate-spin" />
              </div>
            )}
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={user?.name || "Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-indigo-soft/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl uppercase">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
            )}

            {/* S3 Hover Overlay */}
            <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-white z-10 text-[10px] font-semibold gap-1.5">
              <Camera size={18} className="text-indigo-400 animate-pulse" />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
          </div>

          {/* Details header block */}
          <div className="flex flex-row justify-between items-center md:items-end w-full flex-wrap gap-4 pb-2 text-center md:text-left">
            <div className="space-y-1.5 w-full md:w-auto">
              <div className="flex items-center gap-2.5 justify-center md:justify-start flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground m-0">
                  {user?.name}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                  <Sparkles size={11} className="mr-1.5 inline animate-pulse text-indigo-500" />
                  {roleLabel(user?.role)}
                </span>
              </div>
              <span className="text-sm sm:text-base text-indigo-500 font-semibold flex items-center gap-1.5 justify-center md:justify-start">
                <Building2 size={16} />
                {company?.name || "No Company Linked"}
              </span>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex gap-3 align-center shrink-0 justify-center w-full sm:w-auto mt-2 sm:mt-0">
              {company?.id && (
                <button
                  onClick={() => router.push(`/company/profile`)}
                  className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 border border-purple-500/15 shadow-sm px-4 py-2 transition-colors text-xs sm:text-sm active:scale-[0.98]"
                >
                  <Building2 size={14} className="text-purple-500" /> Company Center
                </button>
              )}
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md px-4 py-2 transition-all text-xs sm:text-sm active:scale-[0.98]"
              >
                <Edit3 size={14} /> Edit Recruiter Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* METRIC STATISTICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
          <div>
            <span className="block font-semibold uppercase tracking-wider text-[10px] text-text-muted">Posted Positions</span>
            <h2 className="text-lg font-black text-foreground mt-1 m-0">{companyJobs.length} Jobs</h2>
          </div>
          <div className="p-3 bg-indigo-500/5 text-indigo-500 rounded-2xl group-hover:scale-110 transition duration-300 shrink-0">
            <Briefcase size={20} />
          </div>
        </div>

        <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
          <div>
            <span className="block font-semibold uppercase tracking-wider text-[10px] text-text-muted">Total Applicants</span>
            <h2 className="text-lg font-black text-foreground mt-1 m-0">{companyApps.length} Received</h2>
          </div>
          <div className="p-3 bg-indigo-500/5 text-indigo-500 rounded-2xl group-hover:scale-110 transition duration-300 shrink-0">
            <User size={20} />
          </div>
        </div>

        <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
          <div>
            <span className="block font-semibold uppercase tracking-wider text-[10px] text-purple-600 dark:text-purple-400">Shortlisted</span>
            <h2 className="text-lg font-black text-foreground mt-1 m-0">{companyApps.filter(a => a.status.toLowerCase() === "shortlisted").length} Selected</h2>
          </div>
          <div className="p-3 bg-purple-500/5 text-purple-500 rounded-2xl group-hover:scale-110 transition duration-300 shrink-0">
            <Sparkles size={20} />
          </div>
        </div>

        <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
          <div>
            <span className="block font-semibold uppercase tracking-wider text-[10px] text-emerald-600 dark:text-emerald-400">Accepted</span>
            <h2 className="text-lg font-black text-foreground mt-1 m-0">{companyApps.filter(a => a.status.toLowerCase() === "accepted").length} Hired</h2>
          </div>
          <div className="p-3 bg-emerald-500/5 text-emerald-500 rounded-2xl group-hover:scale-110 transition duration-300 shrink-0">
            <Star size={20} className="text-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>

      {/* TWO COLUMN SIDEBAR & TABS CONTENT */}
      <div className="flex flex-col lg:flex-row relative z-10 items-start gap-6 w-full">
        {/* LEFT SIDEBAR: Personal Recruiter Contacts & Company widget */}
        <div className="w-full lg:w-[320px] space-y-6 shrink-0">
          <div className="p-6 border border-card-border bg-card-bg/70 backdrop-blur-md shadow-lg rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-card-border/50 pb-2 m-0">
              <User size={16} className="text-indigo-500" />
              <span>Recruiter Info</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="text-sm text-text-muted truncate">{phone || "Phone not set"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="text-sm text-text-muted truncate">{user?.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-sm text-text-muted truncate">{location || "Location not set"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 text-sm font-semibold hover:underline flex items-center gap-1 overflow-hidden truncate"
                  >
                    <span className="truncate">{website.replace(/^https?:\/\//, "")}</span>
                    <ExternalLink size={10} className="shrink-0" />
                  </a>
                ) : (
                  <span className="text-sm text-text-muted">Personal website not set</span>
                )}
              </div>
            </div>
          </div>

          {/* Company Info summary sidebar widget */}
          {company && (
            <div className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-card-border/50 pb-2 m-0">
                <Building2 size={16} className="text-indigo-500" />
                <span>Workspace Settings</span>
              </h3>
              <div className="space-y-2">
                <span className="text-sm font-bold text-foreground block">{company.name}</span>
                <span className="text-sm text-text-muted block line-clamp-3 leading-relaxed">{company.description}</span>
                <button
                  onClick={() => router.push(`/company/profile`)}
                  className="cursor-pointer mt-2 text-indigo-500 font-semibold flex items-center gap-1 hover:underline text-xs"
                >
                  Configure Company Page <ExternalLink size={10} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT MAIN COMMAND PANELS */}
        <div className="flex-1 space-y-6 w-full">
          <div className="w-full">
            <div className="flex border-b border-card-border/60 gap-4 mb-6">
              <button
                onClick={() => setActiveTab("jobs")}
                className={`pb-2 px-1 cursor-pointer font-bold text-sm border-b-2 transition ${
                  activeTab === "jobs"
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-text-muted hover:text-foreground"
                }`}
              >
                Active Job Openings
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`pb-2 px-1 cursor-pointer font-bold text-sm border-b-2 transition ${
                  activeTab === "applications"
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-text-muted hover:text-foreground"
                }`}
              >
                Candidate Submissions
              </button>
              <button
                onClick={() => setActiveTab("company")}
                className={`pb-2 px-1 cursor-pointer font-bold text-sm border-b-2 transition ${
                  activeTab === "company"
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-text-muted hover:text-foreground"
                }`}
              >
                Company Settings
              </button>
            </div>

            <div className="bg-card-bg/50 border border-card-border p-6 rounded-2xl shadow-sm w-full">

              {/* TAB 1: Job openings with clean pagination */}
              {activeTab === "jobs" && (
                <div>
                  {jobsLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-text-muted">
                      <span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Loading job listings...</span>
                    </div>
                  ) : paginatedJobs.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-card-border/50 pb-3 mb-2 flex-wrap gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-foreground m-0">
                          Company Open Positions
                        </h3>
                        <button
                          onClick={() => router.push("/add-job")}
                          className="cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold active:scale-[0.98] transition"
                        >
                          Post New Job
                        </button>
                      </div>

                      <div className="flex flex-col gap-4">
                        {paginatedJobs.map((job) => (
                          <CompanyJobCard key={job.id} job={job} />
                        ))}
                      </div>

                      {/* Interactive Jobs Pagination */}
                      {totalJobPages > 1 && (
                        <div className="flex justify-center items-center gap-3 pt-4 border-t border-card-border/40 mt-6">
                          <button
                            disabled={jobsPage === 1}
                            onClick={() => setJobsPage(prev => Math.max(prev - 1, 1))}
                            className="cursor-pointer px-3 py-1.5 text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-500/20 disabled:opacity-50 disabled:pointer-events-none font-semibold transition"
                          >
                            Previous
                          </button>

                          <div className="flex gap-1.5">
                            {Array.from({ length: totalJobPages }, (_, i) => i + 1).map((p) => (
                              <button
                                key={p}
                                onClick={() => setJobsPage(p)}
                                className={`cursor-pointer w-8 h-8 flex items-center justify-center font-bold rounded-lg text-xs transition ${
                                  jobsPage === p
                                    ? "bg-indigo-600 text-white"
                                    : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20"
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>

                          <button
                            disabled={jobsPage === totalJobPages}
                            onClick={() => setJobsPage(prev => Math.min(prev + 1, totalJobPages))}
                            className="cursor-pointer px-3 py-1.5 text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-500/20 disabled:opacity-50 disabled:pointer-events-none font-semibold transition"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 space-y-3 border border-dashed border-card-border/70 rounded-2xl">
                      <Briefcase size={28} className="text-text-muted mx-auto animate-pulse" />
                      <h3 className="text-base font-bold text-foreground m-0">No Jobs Created Yet</h3>
                      <span className="text-sm text-text-muted block">Create a job post to attract top-tier developer candidates.</span>
                      <button
                        onClick={() => router.push("/add-job")}
                        className="cursor-pointer mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
                      >
                        Create first job
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Applications Submissions Preview Panel */}
              {activeTab === "applications" && (
                <div className="text-center py-12 space-y-4 border border-dashed border-card-border/70 rounded-2xl p-6 bg-card-bg/40">
                  <Users size={32} className="text-indigo-500 mx-auto animate-bounce" />
                  <h3 className="text-lg font-bold text-foreground m-0">Applications Workspace</h3>
                  <span className="text-sm text-text-muted max-w-md mx-auto block leading-relaxed">
                    You have received a total of <strong>{companyApps.length}</strong> candidate submissions. Visit your dedicated applications pipeline dashboard to filter, search, AI screen, and record recruiter decisions.
                  </span>
                  <button
                    onClick={() => router.push("/company/applications")}
                    className="cursor-pointer font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl mt-2 px-5 py-2.5 shadow-md active:scale-[0.98] transition-all"
                  >
                    Go to Applications Pipeline
                  </button>
                </div>
              )}

              {/* TAB 3: Company Settings */}
              {activeTab === "company" && (
                <div className="mt-2">
                  <CompanyDetailTab />
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
