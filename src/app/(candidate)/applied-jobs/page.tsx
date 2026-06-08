"use client";

import { useEffect, useState, useMemo } from "react";
import {
  MapPin,
  Briefcase,
  FolderHeart,
  Loader2,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
  Save,
  X,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";
import WithdrawlBtn from "@/components/WithdrawalBtn";
import ApplicationStatusBadge from "@/components/ApplicationStatusBadge";
import { normalizeStatus } from "@/lib/application-status";

type Application = {
  id: string;
  status: string;
  appliedAt: string;
  statusNote?: string | null;
  notes?: string | null;
  jobs: {
    id: string;
    title: string;
    location: string;
    employment_type: string;
    company: { id: string; name: string };
  };
};

export default function AppliedJobsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Single active detail/edit modal state
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [tempNotes, setTempNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    document.title = "Applications Kanban Board | Jobzz";
  }, []);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications/user");
        const data = await res.json();
        if (data.success) setApplications(data.data);
        else toast(data.message || "Failed to load applied jobs.", "error");
      } catch {
        toast("Something went wrong loading your applications.", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [toast]);

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const app of applications) {
      const s = normalizeStatus(app.status);
      counts[s] = (counts[s] || 0) + 1;
    }
    return {
      total: applications.length,
      pending: counts.pending || 0,
      active: (counts.reviewed || 0) + (counts.shortlisted || 0) + (counts.interview || 0),
      rejected: counts.rejected || 0,
      hired: counts.hired || 0,
    };
  }, [applications]);

  const handleWithdrawalSuccess = (jobId: string) => {
    setApplications((prev) => prev.filter((app) => app.jobs.id !== jobId));
    setSelectedApp(null);
  };

  function openDetailModal(app: Application) {
    setSelectedApp(app);
    setTempNotes(app.notes || "");
  }

  async function handleSaveNotes() {
    if (!selectedApp) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/applications/${selectedApp.id}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: tempNotes }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === selectedApp.id ? { ...app, notes: tempNotes } : app
          )
        );
        toast("Notes updated successfully!", "success");
        setSelectedApp(null);
      } else {
        toast(data.message || "Failed to save notes.", "error");
      }
    } catch {
      toast("Failed to save notes.", "error");
    } finally {
      setSavingNotes(false);
    }
  }

  // Kanban column definitions mapped to standard candidate application states
  const columns = [
    {
      id: "applied",
      title: "Applied",
      border: "border-t-2 border-t-gray-400 dark:border-t-gray-600",
      bg: "bg-gray-500/5",
      statuses: ["pending", "reviewed"],
      icon: Clock,
      colorClass: "text-gray-400",
    },
    {
      id: "shortlisted",
      title: "Shortlisted",
      border: "border-t-2 border-t-indigo-500",
      bg: "bg-indigo-500/5",
      statuses: ["shortlisted"],
      icon: Sparkles,
      colorClass: "text-indigo-500",
    },
    {
      id: "interviewing",
      title: "Interviewing",
      border: "border-t-2 border-t-purple-500",
      bg: "bg-purple-500/5",
      statuses: ["interview"],
      icon: Calendar,
      colorClass: "text-purple-500",
    },
    {
      id: "decisions",
      title: "Decisions",
      border: "border-t-2 border-t-green-500",
      bg: "bg-green-500/5",
      statuses: ["hired", "rejected"],
      icon: CheckCircle2,
      colorClass: "text-green-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] gap-3">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
        <span className="text-sm text-text-muted font-medium">Loading your tracker...</span>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-6 min-h-screen space-y-6 relative">
      {/* Background aesthetics */}
      <div className="absolute top-[-5%] left-[5%] w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" style={{ animationDuration: '4s' }} />

      {/* Simplified, Clean Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-card-border/40 pb-4 relative z-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Applications Board
          </h1>
          <p className="text-sm text-text-muted">
            Track hiring status in real-time. Click any card to view details or add preparation notes.
          </p>
        </div>
        {/* Slim, Minimal Metrics row */}
        <div className="flex items-center gap-3 text-xs font-semibold text-text-muted shrink-0">
          <span>Total: <strong className="text-foreground">{stats.total}</strong></span>
          <span className="text-card-border/60">|</span>
          <span>Pending: <strong className="text-foreground">{stats.pending}</strong></span>
          <span className="text-card-border/60">|</span>
          <span>In Progress: <strong className="text-purple-500">{stats.active}</strong></span>
          <span className="text-card-border/60">|</span>
          <span>Hired: <strong className="text-green-500">{stats.hired}</strong></span>
        </div>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start relative z-10">
        {columns.map((col) => {
          const colApps = applications.filter((app) =>
            col.statuses.includes(normalizeStatus(app.status))
          );

          return (
            <div
              key={col.id}
              className={`p-3 rounded-xl border border-card-border/40 bg-card-bg/15 ${col.border} space-y-3`}
            >
              {/* Column Header */}
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <col.icon size={14} className={col.colorClass} />
                  <h2 className="font-extrabold text-foreground text-xs uppercase tracking-wider">
                    {col.title}
                  </h2>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-foreground">
                  {colApps.length}
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="space-y-2.5 min-h-[350px]">
                {colApps.length > 0 ? (
                  colApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => openDetailModal(app)}
                      className="p-3 border border-card-border/80 bg-card-bg hover:bg-card-bg-hover hover:border-indigo-500/30 cursor-pointer transition-all duration-200 shadow-sm rounded-lg active:scale-[0.98] flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-foreground font-bold tracking-tight text-xs leading-tight line-clamp-2">
                          {app.jobs.title}
                        </h3>
                        <ApplicationStatusBadge status={app.status} />
                      </div>

                      <span className="text-xs text-text-muted font-medium truncate block">
                        {app.jobs.company.name}
                      </span>

                      <div className="flex justify-between items-center pt-1.5 border-t border-card-border/30 text-[10px] text-text-muted">
                        <span>
                          Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric"
                          }) : "recently"}
                        </span>

                        {/* Note icon if candidate has preparation notes */}
                        {app.notes && (
                          <div className="flex items-center gap-0.5 text-indigo-500 font-bold">
                            <FileText size={10} />
                            <span>Prep Note</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-card-border/30 rounded-lg bg-background/5">
                    <FolderHeart size={18} className="text-text-muted/30 mb-1.5" />
                    <span className="text-xs text-text-muted/50 italic text-[11px]">No applications</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Unified Card Detail Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="relative bg-card-bg border border-card-border w-full max-w-[520px] rounded-2xl shadow-xl overflow-hidden p-6 animate-in zoom-in-95 duration-200 text-foreground max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-foreground transition-colors"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="space-y-1 pr-8">
              <div className="flex justify-between items-start gap-2 flex-wrap">
                <div>
                  <h2 className="text-xl font-extrabold text-foreground leading-snug">{selectedApp.jobs.title}</h2>
                  <span className="text-sm text-indigo-500 font-semibold">{selectedApp.jobs.company.name}</span>
                </div>
                <ApplicationStatusBadge status={selectedApp.status || "pending"} />
              </div>
              <div className="flex gap-3 text-xs text-text-muted pt-2 flex-wrap">
                <span className="flex gap-1 items-center"><MapPin size={11} />{selectedApp.jobs.location}</span>
                <span className="flex gap-1 items-center"><Briefcase size={11} />{selectedApp.jobs.employment_type}</span>
              </div>
            </div>

            <hr className="border-card-border/30 my-4" />

            {/* Recruiter feedback notes */}
            {selectedApp.statusNote && (
              <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 mb-4 space-y-1">
                <span className="text-indigo-500 font-bold uppercase tracking-wider text-[9px] block">Recruiter Official Update</span>
                <p className="text-sm text-text-muted leading-relaxed italic">"{selectedApp.statusNote}"</p>
              </div>
            )}

            {/* Prep notes text area */}
            <div className="space-y-1.5 mb-4">
              <label htmlFor="prep-notes" className="text-text-muted font-bold uppercase tracking-wider text-[9px] block cursor-pointer">My Interview Preparation Notes</label>
              <textarea
                id="prep-notes"
                placeholder="Jot down interview dates, key questions to prepare, portfolio links, or salary expectations..."
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                className="w-full p-3 border border-card-border/60 bg-background/50 text-text-muted rounded-2xl h-28 text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-all focus:border-indigo-500/50 resize-none scrollbar-thin"
              />
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center gap-3 mt-5 border-t border-card-border/30 pt-4">
              {/* Withdraw button (only shown for pending status) */}
              {selectedApp && normalizeStatus(selectedApp.status) === "pending" ? (
                <WithdrawlBtn
                  job={selectedApp.jobs}
                  isApplied
                  setIsApplied={(val) => {
                    if (!val) handleWithdrawalSuccess(selectedApp.jobs.id);
                  }}
                />
              ) : (
                <div />
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedApp(null)}
                  disabled={savingNotes}
                  className="px-4 py-2 border border-card-border text-text-muted rounded-xl text-sm font-semibold hover:bg-neutral-500/10 transition duration-200 inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={14} /> Close
                </button>
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition duration-200 inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-500/10"
                >
                  {savingNotes ? "Saving..." : <><Save size={14} /> Save Notes</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Applications Redirect Card */}
      {applications.length === 0 && (
        <div className="flex flex-col items-center py-20 text-center border border-dashed border-card-border rounded-2xl relative z-10 bg-card-bg/40 backdrop-blur-sm">
          <FolderHeart size={48} className="text-text-muted/60 mb-3" />
          <h2 className="font-bold text-lg text-foreground">No active applications yet</h2>
          <p className="text-sm text-text-muted mt-2 mb-6 max-w-sm">
            Browse current jobs, run matching scores, and apply with custom AI cover letters.
          </p>
          <Link href="/jobs">
            <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition duration-200 shadow-md shadow-indigo-500/20 active:scale-95 cursor-pointer">
              Browse Jobs
            </button>
          </Link>
        </div>
      )}
    </main>
  );
}