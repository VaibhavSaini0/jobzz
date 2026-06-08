"use client";

import {
  Briefcase,
  Users,
  Sparkles,
  Star,
  User,
  ExternalLink,
  FileText,
  GraduationCap,
  Search,
  ArrowLeft,
} from "lucide-react";
import { useContext, useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import Loading from "@/components/lodingstate/Loading";

function renderStatusBadge(status: string) {
  const norm = String(status).toLowerCase();
  if (norm === "accepted" || norm === "hired") {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Accepted</span>;
  }
  if (norm === "rejected") {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">Rejected</span>;
  }
  if (norm === "shortlisted" || norm === "shortlist") {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Shortlisted</span>;
  }
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Pending</span>;
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

export default function JobApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
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
    if (!user || !id) return;

    async function fetchApplications() {
      setLoading(true);
      try {
        const res = await fetch(`/api/applicants/${id}`);
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
  }, [user, id, reloadTrigger, toast]);

  if (isuserLoading || loading) {
    return <Loading />;
  }

  // Filter application listings
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.user.name.toLowerCase().includes(searchQuery.toLowerCase());

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

  const jobTitle = applications.length > 0 ? applications[0].jobs?.title : "Job Posting";

  return (
    <main className="max-w-7xl mx-auto py-10 px-4 min-h-screen text-foreground relative">
      {/* Background gradients */}
      <div className="absolute top-[-5%] left-[5%] w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" style={{ animationDuration: '4s' }} />

      <div className="space-y-8 w-full z-10 relative">
        {/* PREMIUM COVER HEADER BLOCK */}
        <div className="bg-card-bg border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-4">
            <div>
              <button
                onClick={() => router.back()}
                className="cursor-pointer font-bold inline-flex items-center gap-1.5 hover:translate-x-[-2px] transition-all duration-200 text-indigo-600 dark:text-indigo-400 text-sm"
              >
                <ArrowLeft size={16} /> Back to Dashboard
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-indigo-500 font-bold uppercase tracking-wider block">JOB SPECIFIC PIPELINE</span>
                <h1 className="text-3xl text-foreground tracking-tight font-black m-0">
                  Applications for {jobTitle}
                </h1>
                <p className="text-sm text-text-muted block">
                  Review and manage the active candidate pipeline specifically for this job posting.
                </p>
              </div>

              {company && (
                <span className="inline-flex items-center px-4.5 py-1 text-xs font-bold uppercase shadow-sm bg-purple-600 text-white rounded-full">
                  {company.name}
                </span>
              )}
            </div>
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
                placeholder="Search by candidate name..."
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
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
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
                          Position: {jobTitle}
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

        {/* Dynamic Candidate Application Review Modal */}
        {selectedApp && isReviewModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setIsReviewModalOpen(false)}
          >
            <div
              className="relative bg-card-bg border border-card-border w-full max-w-[640px] rounded-2xl shadow-xl overflow-hidden p-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl tracking-tight text-foreground font-extrabold m-0">
                    Review Submission: {selectedApp.user.name}
                  </h2>
                  <span className="text-sm text-indigo-500 font-semibold block mt-1">
                    Position: {jobTitle}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="text-text-muted hover:text-foreground font-semibold text-xs"
                >
                  ✕ Close
                </button>
              </div>

              {/* Scrollable details wrapper */}
              <div className="space-y-5 my-4 pr-2">
                {/* Profile Summary */}
                <div className="bg-background/50 border border-card-border/60 p-4 rounded-xl space-y-2">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2 m-0">
                    <User size={15} className="text-indigo-500" /> Professional Summary
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed block whitespace-pre-line">
                    {selectedApp.Resume?.summary || "No summary provided by candidate."}
                  </p>
                </div>

                {/* S3 PDF Resume Download */}
                <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-xl flex justify-between items-center flex-wrap gap-3">
                  <div className="flex items-center gap-2.5">
                    <FileText className="text-indigo-500 shrink-0" size={24} />
                    <div>
                      <span className="text-sm font-bold text-foreground block">
                        Candidate Resume PDF
                      </span>
                      <span className="text-xs text-text-muted block">
                        {selectedApp.Resume?.resumePdfName || "resume.pdf"}
                      </span>
                    </div>
                  </div>
                  {selectedApp.Resume?.resumePdfUrl ? (
                    <a
                      href={selectedApp.Resume.resumePdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer font-bold px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs inline-flex items-center shadow-sm"
                    >
                      Download PDF
                    </a>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">No PDF Resume Uploaded</span>
                  )}
                </div>

                {/* Skills stack */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2 m-0">
                    <Star size={15} className="text-indigo-500" /> Skills Stack
                  </h3>
                  {selectedApp.Resume?.skills && selectedApp.Resume.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.Resume.skills.map((skill: string) => (
                        <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-foreground border border-card-border/40">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-text-muted italic">No skills listed.</span>
                  )}
                </div>

                {/* Work Experience */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2 m-0">
                    <Briefcase size={15} className="text-indigo-500" /> Work History
                  </h3>
                  {selectedApp.Resume?.experiences && selectedApp.Resume.experiences.length > 0 ? (
                    <div className="space-y-4 pl-3 border-l border-card-border/60 ml-1">
                      {selectedApp.Resume.experiences.map((expStr: string, idx: number) => {
                        const exp = parseExperience(expStr);
                        return (
                          <div key={idx} className="space-y-1 relative">
                            <span className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 border border-background" />
                            <span className="text-xs font-bold text-foreground block">{exp.role}</span>
                            <span className="text-xs text-indigo-500 font-semibold block">{exp.company}</span>
                            <span className="text-[10px] text-text-muted block">{exp.duration}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-xs text-text-muted italic">No experiences listed.</span>
                  )}
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2 m-0">
                    <GraduationCap size={15} className="text-indigo-500" /> Education History
                  </h3>
                  {selectedApp.Resume?.educations && selectedApp.Resume.educations.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedApp.Resume.educations.map((eduStr: string, idx: number) => {
                        const edu = parseEducation(eduStr);
                        return (
                          <div key={idx} className="p-3 bg-background/50 border border-card-border/50 rounded-xl space-y-1">
                            <span className="text-xs font-bold text-foreground block">{edu.degree}</span>
                            <span className="text-xs text-indigo-500 font-medium block">{edu.school}</span>
                            <span className="text-[10px] text-text-muted block">{edu.year}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-xs text-text-muted italic">No education history listed.</span>
                  )}
                </div>

                {/* Candidate Notes */}
                {selectedApp.notes && (
                  <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-indigo-500 block">Candidate note:</span>
                    <p className="text-xs text-text-muted block italic">"{selectedApp.notes}"</p>
                  </div>
                )}

                <hr className="my-3 border-card-border/40" />

                {/* RECRUITER DECISIONS BOARD */}
                <div className="bg-indigo-500/5 border border-indigo-500/10 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-black text-foreground m-0">
                    Recruiter Decisions Manager
                  </h3>

                  {/* Status Selection Buttons */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-text-muted">Candidate status</span>
                    <div className="flex gap-2.5 flex-wrap">
                      {(["pending", "shortlisted", "accepted", "rejected"] as const).map((s) => {
                        const isActive = reviewStatus === s;
                        const reviewColorMap = {
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
                        const classes = isActive ? reviewColorMap[s].active : reviewColorMap[s].inactive;

                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setReviewStatus(s)}
                            className={`font-bold text-xs uppercase rounded-xl px-4 py-2 cursor-pointer transition duration-200 ${classes}`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status Notes Input */}
                  <div className="space-y-2">
                    <label htmlFor="recruiter-note" className="text-xs text-text-muted font-semibold uppercase tracking-wider block cursor-pointer">
                      Recruiter decisions feedback note (Internal / Shareable)
                    </label>
                    <textarea
                      id="recruiter-note"
                      className="w-full bg-background border border-card-border rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 text-foreground"
                      placeholder="Leave standard recruiter notes or interview candidate feedback..."
                      value={reviewStatusNote}
                      onChange={(e) => setReviewStatusNote(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end mt-3">
                    <button
                      type="button"
                      onClick={handleSubmitReview}
                      disabled={isSubmittingReview}
                      className="cursor-pointer font-bold px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmittingReview ? "Saving decisions..." : "Save Decisions"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
