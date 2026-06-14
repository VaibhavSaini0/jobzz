"use client";

import { useState } from "react";
import { Sparkles, Loader2, FileText, X } from "lucide-react";
import ApplicationStatusBadge from "@/components/ApplicationStatusBadge";
import {
  APPLICATION_STATUSES,
  STATUS_LABELS,
  ApplicationStatus,
} from "@/lib/application-status";
import { useToast } from "@/context/ToastContext";

export type ApplicantRecord = {
  id: string;
  status: string;
  appliedAt: string;
  statusNote?: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  Resume?: {
    resumePdfUrl: string | null;
    resumePdfName: string | null;
    skills?: string[] | null;
    experiences?: string[] | null;
  } | null;
};

type ScreeningResult = {
  score: number;
  recommendation: string;
  summary: string;
  highlights: string[];
  concerns: string[];
};

function parseExperience(raw: string): { role: string; company: string; duration: string } {
  try {
    return JSON.parse(raw);
  } catch {
    return { role: raw, company: "", duration: "" };
  }
}

export default function AppliedUserList({
  isAppModal,
  setIsAppModal,
  applicants,
  onStatusChange,
}: {
  isAppModal: boolean;
  setIsAppModal: (val: boolean) => void;
  applicants: ApplicantRecord[];
  onStatusChange?: (applicationId: string, status: string) => void;
}) {
  const { toast } = useToast();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [screeningId, setScreeningId] = useState<string | null>(null);
  const [screeningResults, setScreeningResults] = useState<Record<string, ScreeningResult>>({});

  async function updateStatus(applicationId: string, status: ApplicationStatus) {
    setUpdatingId(applicationId);
    try {
      const res = await fetch(`/api/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        onStatusChange?.(applicationId, status);
        toast(`Status updated to ${STATUS_LABELS[status]}`, "success");
      } else {
        toast(data.message || "Update failed", "error");
      }
    } catch {
      toast("Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  }

  async function screenCandidate(applicationId: string) {
    setScreeningId(applicationId);
    try {
      const res = await fetch("/api/ai/screen-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId }),
      });
      const data = await res.json();
      if (data.success) {
        setScreeningResults((prev) => ({ ...prev, [applicationId]: data.data }));
      } else {
        toast(data.message || "Screening failed", "error");
      }
    } catch {
      toast("AI screening failed", "error");
    } finally {
      setScreeningId(null);
    }
  }

  if (!isAppModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        onClick={() => setIsAppModal(false)}
      />
      {/* Content */}
      <div
        className="
          relative
          w-full
          max-w-[560px]
          max-h-[80vh]
          overflow-hidden
          rounded-3xl
          border border-card-border/60
          bg-card-bg/95
          backdrop-blur-xl
          shadow-[0_20px_80px_rgba(0,0,0,0.25)]
          p-6
          text-foreground
          flex
          flex-col
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-foreground m-0">Applicants</h2>
            <p className="text-sm text-text-muted mt-1">
              Review candidates, update status, and run AI screening
            </p>
          </div>
          <button
            onClick={() => setIsAppModal(false)}
            className="cursor-pointer p-1.5 rounded-full hover:bg-card-border/40 transition-colors text-text-muted hover:text-foreground active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto scrollbar-jobzz pr-1 space-y-4">
          {applicants.length > 0 ? (
            applicants.map((app) => {
              const screening = screeningResults[app.id];
              return (
                <div
                  key={app.id}
                  className="border border-card-border rounded-2xl p-4 space-y-3 bg-card-bg/40"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex gap-3 items-start flex-1 min-w-0">
                      <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white font-extrabold rounded-full shrink-0 shadow-sm">
                        {app.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-foreground truncate">{app.user.name}</h3>
                        <span className="text-xs text-text-muted block truncate mt-0.5">{app.user.email}</span>
                        <span className="text-[10px] text-text-muted block mt-0.5">
                          Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "recently"}
                        </span>
                        
                        {/* Skills list preview */}
                        {app.Resume?.skills && app.Resume.skills.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap mt-2 max-w-sm">
                            {app.Resume.skills.slice(0, 4).map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center rounded-md bg-card-border/50 dark:bg-card-border/30 px-2 py-0.5 text-[10px] font-bold text-text-muted"
                              >
                                {skill}
                              </span>
                            ))}
                            {app.Resume.skills.length > 4 && (
                              <span className="inline-flex items-center rounded-md bg-card-border/50 dark:bg-card-border/30 px-2 py-0.5 text-[10px] font-bold text-text-muted">
                                +{app.Resume.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Experience preview */}
                        {app.Resume?.experiences && app.Resume.experiences.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {app.Resume.experiences.slice(0, 2).map((expStr, idx) => {
                              const exp = parseExperience(expStr);
                              return (
                                <span key={idx} className="text-xs text-text-muted block leading-relaxed">
                                  💼 <strong>{exp.role}</strong> {exp.company && `at ${exp.company}`} {exp.duration && `(${exp.duration})`}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {app.Resume?.resumePdfUrl && (
                          <a
                            href={app.Resume.resumePdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold text-xs px-2.5 py-1 rounded-md mt-2.5 transition"
                          >
                            <FileText size={12} /> Download Resume
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <ApplicationStatusBadge status={app.status} />
                    </div>
                  </div>

                  <div className="flex gap-2 items-center flex-wrap">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value as ApplicationStatus)}
                      disabled={updatingId === app.id}
                      className="px-3 py-1.5 bg-input-bg border border-card-border rounded-xl text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs cursor-pointer shadow-sm min-w-[140px] disabled:opacity-50"
                    >
                      {APPLICATION_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => screenCandidate(app.id)}
                      disabled={screeningId === app.id}
                      className="cursor-pointer px-3 py-1.5 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl transition active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {screeningId === app.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Sparkles size={14} />
                      )}
                      AI Screen
                    </button>
                  </div>

                  {screening && (
                    <div className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-xl text-xs text-text-muted space-y-2 mt-2 animate-in fade-in duration-200">
                      <div>
                        <strong className="text-indigo-600 dark:text-indigo-400">{screening.recommendation}</strong>
                        <span className="text-foreground font-bold ml-1.5">— Score: {screening.score}/100</span>
                      </div>
                      <p className="leading-relaxed">{screening.summary}</p>
                      {screening.highlights && screening.highlights.length > 0 && (
                        <div className="space-y-1">
                          <strong className="text-emerald-600 dark:text-emerald-400 block font-bold">Key Strengths:</strong>
                          <ul className="list-disc pl-4 space-y-0.5">
                            {screening.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {screening.concerns && screening.concerns.length > 0 && (
                        <div className="space-y-1">
                          <strong className="text-rose-600 dark:text-rose-400 block font-bold">Key Concerns / Missing:</strong>
                          <ul className="list-disc pl-4 space-y-0.5">
                            {screening.concerns.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <span className="text-sm text-text-muted block text-center py-6">No applicants yet.</span>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-card-border/50 shrink-0 mt-4">
          <button
            onClick={() => setIsAppModal(false)}
            className="cursor-pointer px-4 py-2 text-xs font-bold border border-card-border hover:bg-card-border/30 rounded-xl transition text-text-muted active:scale-[0.98]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
