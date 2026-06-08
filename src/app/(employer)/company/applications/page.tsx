"use client";

import {
  Briefcase,
  Users,
  Sparkles,
  Star,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  FileText,
  GraduationCap,
  Search,
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import { roleLabel } from "@/lib/roles";
import Loading from "@/components/lodingstate/Loading";
import RecruiterReviewModal from "@/components/modals/RecruiterReviewModal";

function renderStatusBadge(status: string) {
  const norm = String(status).toLowerCase();
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border shrink-0";
  
  if (norm === "accepted" || norm === "hired") {
    return (
      <span className={`${baseClasses} bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20`}>
        Accepted
      </span>
    );
  }
  if (norm === "rejected") {
    return (
      <span className={`${baseClasses} bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20`}>
        Rejected
      </span>
    );
  }
  if (norm === "shortlisted" || norm === "shortlist") {
    return (
      <span className={`${baseClasses} bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20`}>
        Shortlisted
      </span>
    );
  }
  return (
    <span className={`${baseClasses} bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20`}>
      Pending
    </span>
  );
}

function parseExperience(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return { role: raw, company: "", duration: "" };
  }
}

function parseEducation(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return { school: raw, degree: "", year: "" };
  }
}

export default function ApplicationsPage() {
  const router = useRouter();
  const { user, company, isuserLoading } = useContext(UserContext);
  const { toast } = useToast();

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "shortlisted" | "accepted" | "rejected">("all");

  // Application Review states
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<"pending" | "shortlisted" | "accepted" | "rejected">("pending");
  const [reviewStatusNote, setReviewStatusNote] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const APPS_PER_PAGE = 8;

  useEffect(() => {
    if (!isuserLoading && !user) {
      router.push("/");
    }
  }, [user, isuserLoading, router]);

  useEffect(() => {
    if (!user) return;

    async function fetchApplications() {
      setLoading(true);
      try {
        const res = await fetch("/api/company/applications");
        const data = await res.json();
        if (data.success && data.data) {
          setApplications(data.data);
        } else {
          toast(data.message || "Failed to fetch applications", "error");
        }
      } catch (err) {
        console.error("Error fetching applications:", err);
        toast("Failed to load applications.", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [user, reloadTrigger, toast]);

  if (isuserLoading || loading) {
    return <Loading />;
  }

  // Filter application listings
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobs.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === "all" ||
      app.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Pagination bounds
  const totalPages = Math.ceil(filteredApps.length / APPS_PER_PAGE);
  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * APPS_PER_PAGE,
    currentPage * APPS_PER_PAGE
  );

  // Handle pagination index changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenReviewModal = (app: any) => {
    setSelectedApp(app);
    setReviewStatus(app.status.toLowerCase() as any);
    setReviewStatusNote(app.statusNote || "");
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedApp) return;

    setIsSubmittingReview(true);
    try {
      const res = await fetch(`/api/applications/${selectedApp.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: reviewStatus,
          statusNote: reviewStatusNote,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast("Application review saved successfully!", "success");
        setApplications((prev) =>
          prev.map((app) =>
            app.id === selectedApp.id
              ? { ...app, status: reviewStatus, statusNote: reviewStatusNote }
              : app
          )
        );
        setIsReviewModalOpen(false);
        setSelectedApp(null);
      } else {
        toast(data.message || "Failed to save application review", "error");
      }
    } catch (err) {
      console.error(err);
      toast("Error saving application review", "error");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Metrics Widgets values
  const totalReceived = applications.length;
  const totalShortlisted = applications.filter(a => a.status.toLowerCase() === "shortlisted").length;
  const totalAccepted = applications.filter(a => a.status.toLowerCase() === "accepted").length;
  const totalRejected = applications.filter(a => a.status.toLowerCase() === "rejected").length;

  return (
    <main className="max-w-7xl mx-auto py-10 px-4 min-h-screen text-foreground relative">
      {/* Background gradients */}
      <div className="absolute top-[-5%] left-[5%] w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" style={{ animationDuration: '4s' }} />

      <div className="space-y-8 w-full z-10 relative">
        {/* PREMIUM COVER HEADER BLOCK */}
        <div className="bg-card-bg border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-indigo-500 font-bold uppercase tracking-wider block">WORKSPACE MANAGER</span>
              <h1 className="text-3xl text-foreground tracking-tight font-black m-0">
                Company Applications
              </h1>
              <p className="text-sm text-text-muted block">
                Manage candidate submissions, download resumes, and update recruitment pipeline statuses.
              </p>
            </div>
            
            {company && (
              <span className="inline-flex items-center px-4.5 py-1 text-xs font-bold uppercase shadow-sm bg-purple-600 text-white rounded-full">
                {company.name}
              </span>
            )}
          </div>
        </div>

        {/* METRICS METERS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-text-muted">Total Received</span>
              <h2 className="text-lg text-foreground font-black mt-1 m-0">{totalReceived} Applications</h2>
            </div>
            <div className="p-3 bg-indigo-500/5 text-indigo-500 rounded-2xl group-hover:scale-110 transition duration-300 shrink-0">
              <Users size={20} />
            </div>
          </div>

          <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Shortlisted</span>
              <h2 className="text-lg text-foreground font-black mt-1 m-0">{totalShortlisted} Selected</h2>
            </div>
            <div className="p-3 bg-purple-500/5 text-purple-500 rounded-2xl group-hover:scale-110 transition duration-300 shrink-0">
              <Sparkles size={20} />
            </div>
          </div>

          <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Accepted Candidates</span>
              <h2 className="text-lg text-foreground font-black mt-1 m-0">{totalAccepted} Hired</h2>
            </div>
            <div className="p-3 bg-emerald-500/5 text-emerald-500 rounded-2xl group-hover:scale-110 transition duration-300 shrink-0">
              <Star size={20} className="text-emerald-500 animate-pulse" />
            </div>
          </div>

          <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">Rejected</span>
              <h2 className="text-lg text-foreground font-black mt-1 m-0">{totalRejected} Passed</h2>
            </div>
            <div className="p-3 bg-rose-500/5 text-rose-500 rounded-2xl group-hover:scale-110 transition duration-300 shrink-0">
              <Users size={20} className="text-rose-500" />
            </div>
          </div>
        </div>

        {/* FILTERS & SEARCH ROW */}
        <div className="p-5 border border-card-border bg-card-bg/50 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            {/* Search Input Box */}
            <div className="relative w-full md:w-96 flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-text-muted" />
              <input
                type="text"
                className="w-full bg-background border border-card-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/25 text-foreground placeholder:text-text-muted"
                placeholder="Search by candidate name or job title..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Filter Buttons group */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {(["all", "pending", "shortlisted", "accepted", "rejected"] as const).map((s) => {
                const isActive = statusFilter === s;
                const colorMap = {
                  all: {
                    active: "bg-indigo-600 hover:bg-indigo-700 text-white",
                    inactive: "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                  },
                  pending: {
                    active: "bg-neutral-600 hover:bg-neutral-700 text-white",
                    inactive: "bg-neutral-500/10 hover:bg-neutral-500/20 text-text-muted"
                  },
                  shortlisted: {
                    active: "bg-purple-600 hover:bg-purple-700 text-white",
                    inactive: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400"
                  },
                  accepted: {
                    active: "bg-emerald-600 hover:bg-emerald-700 text-white",
                    inactive: "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  },
                  rejected: {
                    active: "bg-rose-600 hover:bg-rose-700 text-white",
                    inactive: "bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400"
                  }
                };
                const classes = isActive ? colorMap[s].active : colorMap[s].inactive;

                return (
                  <button
                    key={s}
                    onClick={() => {
                      setStatusFilter(s);
                      setCurrentPage(1);
                    }}
                    className={`font-bold text-xs uppercase px-4.5 py-2.5 rounded-xl shadow-sm hover:scale-[1.01] transition duration-200 cursor-pointer ${classes}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* APPLICATIONS LIST DATA */}
        {paginatedApps.length > 0 ? (
          <div className="space-y-4">
            {/* Desktop View: Structured Table */}
            <div className="hidden md:block bg-card-bg/60 backdrop-blur-md border border-card-border/60 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-card-border/60 text-text-muted text-xs uppercase tracking-wider font-bold bg-card-bg/40">
                      <th className="py-4 px-5">Candidate</th>
                      <th className="py-4 px-5">Position</th>
                      <th className="py-4 px-5">Applied Date</th>
                      <th className="py-4 px-5">Resume</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border/30">
                    {paginatedApps.map((app) => (
                      <tr key={app.id} className="hover:bg-indigo-500/5 transition duration-150">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            {app.Resume?.profileImageUrl ? (
                              <img
                                src={app.Resume.profileImageUrl}
                                alt={app.user.name}
                                className="w-10 h-10 rounded-xl object-cover border border-card-border/40 shadow-inner shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-extrabold border border-card-border/40 shadow-inner text-sm shrink-0">
                                {app.user.name[0].toUpperCase()}
                              </div>
                            )}
                            <div className="min-w-0">
                              <span className="font-bold text-foreground block truncate max-w-[180px]">{app.user.name}</span>
                              <span className="text-xs text-text-muted block truncate max-w-[180px]">{app.user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <span className="text-sm font-semibold text-foreground">{app.jobs.title}</span>
                        </td>
                        <td className="py-4 px-5 text-text-muted text-xs">
                          {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : "recently"}
                        </td>
                        <td className="py-4 px-5">
                          {app.Resume?.resumePdfUrl ? (
                            <a
                              href={app.Resume.resumePdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-indigo-500 hover:text-indigo-600 text-xs font-bold hover:underline transition"
                            >
                              <FileText size={13} /> PDF Resume
                            </a>
                          ) : (
                            <span className="text-xs text-rose-500 font-semibold block">No resume</span>
                          )}
                        </td>
                        <td className="py-4 px-5">
                          {renderStatusBadge(app.status)}
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button
                            onClick={() => handleOpenReviewModal(app)}
                            className="cursor-pointer font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm px-4 py-2 hover:scale-[1.01] transition duration-200"
                          >
                            Review & Decide
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View: Dynamic Cards */}
            <div className="block md:hidden grid gap-4 sm:grid-cols-1">
              {paginatedApps.map((app) => (
                <div key={app.id} className="p-5 border border-card-border/60 hover:border-indigo-500/20 bg-card-bg/60 hover:shadow-md transition-all duration-300 rounded-2xl flex flex-col justify-between h-full gap-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-3.5">
                      {app.Resume?.profileImageUrl ? (
                        <img
                          src={app.Resume.profileImageUrl}
                          alt={app.user.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-card-border/40 shadow-inner"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-extrabold border border-card-border/40 shadow-inner text-base shrink-0">
                          {app.user.name[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-bold text-foreground block">{app.user.name}</span>
                        <span className="text-xs text-indigo-500 font-semibold block mt-0.5">
                          Position: {app.jobs.title}
                        </span>
                        <span className="text-[10px] text-text-muted block mt-1">
                          Applied: {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "recently"}
                        </span>
                      </div>
                    </div>
                    {renderStatusBadge(app.status)}
                  </div>

                  {/* Resume Details Preview block */}
                  {app.Resume?.summary && (
                    <p className="text-xs text-text-muted leading-relaxed italic block pl-1">
                      "{app.Resume.summary}"
                    </p>
                  )}

                  <hr className="my-0.5 border-card-border/40" />

                  <div className="flex justify-between items-center flex-wrap gap-2 pt-1">
                    {app.Resume?.resumePdfUrl ? (
                      <a
                        href={app.Resume.resumePdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-indigo-500 hover:text-indigo-600 text-xs font-bold hover:underline transition"
                      >
                        <FileText size={13} /> View Resume PDF
                      </a>
                    ) : (
                      <span className="text-xs text-rose-500 font-semibold block">No resume PDF uploaded</span>
                    )}
                    
                    <button
                      onClick={() => handleOpenReviewModal(app)}
                      className="cursor-pointer font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm px-4 py-2 hover:scale-[1.01] transition duration-200"
                    >
                      Review & Decide
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Applications Pagination Control */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-6 pt-5 border-t border-card-border/40">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className="cursor-pointer font-semibold rounded-lg bg-neutral-500/10 hover:bg-neutral-500/20 text-text-muted disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 text-xs transition duration-200"
                >
                  Previous
                </button>
                
                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`cursor-pointer w-8 h-8 flex items-center justify-center font-bold rounded-lg text-xs transition duration-200 ${
                        currentPage === p
                          ? "bg-indigo-600 text-white"
                          : "bg-neutral-500/10 hover:bg-neutral-500/20 text-text-muted"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  className="cursor-pointer font-semibold rounded-lg bg-neutral-500/10 hover:bg-neutral-500/20 text-text-muted disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 text-xs transition duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3 border border-dashed border-card-border/70 rounded-2xl">
            <Users size={32} className="text-text-muted mx-auto animate-pulse" />
            <h2 className="text-lg font-semibold text-foreground m-0">No Submissions Found</h2>
            <p className="text-xs text-text-muted block">No candidate applications match your current status filters or search queries.</p>
          </div>
        )}

        {/* Reusable Candidate Application Review Modal */}
        {selectedApp && (
          <RecruiterReviewModal
            isOpen={isReviewModalOpen}
            setIsOpen={setIsReviewModalOpen}
            selectedApp={selectedApp}
            jobTitle={selectedApp.jobs?.title || "Job Posting"}
            reviewStatus={reviewStatus}
            setReviewStatus={setReviewStatus}
            reviewStatusNote={reviewStatusNote}
            setReviewStatusNote={setReviewStatusNote}
            isSubmittingReview={isSubmittingReview}
            handleSubmitReview={handleSubmitReview}
          />
        )}
      </div>
    </main>
  );
}
