"use client";

import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  Check,
  Star,
  X,
} from "lucide-react";
import Portal from "@/components/Portal";

interface RecruiterReviewModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedApp: any;
  jobTitle: string;
  reviewStatus: "pending" | "shortlisted" | "accepted" | "rejected";
  setReviewStatus: (status: "pending" | "shortlisted" | "accepted" | "rejected") => void;
  reviewStatusNote: string;
  setReviewStatusNote: (note: string) => void;
  isSubmittingReview: boolean;
  handleSubmitReview: () => void;
}

// Helpers for parsing resume history
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

export default function RecruiterReviewModal({
  isOpen,
  setIsOpen,
  selectedApp,
  jobTitle,
  reviewStatus,
  setReviewStatus,
  reviewStatusNote,
  setReviewStatusNote,
  isSubmittingReview,
  handleSubmitReview,
}: RecruiterReviewModalProps) {
  if (!isOpen || !selectedApp) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      {/* Content */}
      <div
        className="
          relative
          w-full
          max-w-[720px]
          max-h-[85vh]
          overflow-hidden
          rounded-3xl
          border border-card-border/60
          bg-card-bg/95
          backdrop-blur-xl
          shadow-[0_20px_80px_rgba(0,0,0,0.25)]
          p-0
          text-foreground
          flex
          flex-col
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        {/* Decorative Ambient Background Spotlights */}
        <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Sticky Header */}
        <div className="sticky top-0 z-20 border-b border-card-border/50 bg-card-bg/90 backdrop-blur-xl px-6 py-5 shrink-0 text-left">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold leading-tight m-0 text-foreground">
                Review Submission: {selectedApp.user?.name}
              </h2>
              <span className="text-sm text-indigo-500 font-semibold block mt-1">
                Position: {jobTitle}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-1.5 text-text-muted hover:text-foreground hover:bg-card-border/40 transition-colors cursor-pointer active:scale-95"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div
          className="
            px-6
            py-5
            overflow-y-auto
            max-h-[calc(85vh-160px)]
            space-y-5
            flex-grow
            scrollbar-thin
            text-left
          "
        >
          {/* Professional Summary */}
          <div className="bg-background/20 border border-card-border/50 p-5 rounded-2xl space-y-2.5">
            <h3 className="text-foreground font-bold flex items-center gap-2 m-0 text-sm">
              <User size={15} className="text-indigo-500 shrink-0" /> Professional Summary
            </h3>
            <p className="text-sm text-text-muted leading-relaxed block whitespace-pre-line">
              {selectedApp.Resume?.summary || "No professional summary provided by the candidate."}
            </p>
          </div>

          {/* S3 PDF Resume Download Row */}
          <div className="bg-indigo-500/[0.03] border border-indigo-500/15 p-5 rounded-2xl flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 shrink-0">
                <FileText className="text-indigo-500" size={22} />
              </div>
              <div>
                <span className="text-sm font-bold text-foreground block">
                  Candidate Resume PDF
                </span>
                <span className="text-xs text-text-muted block mt-0.5 truncate max-w-[200px]">
                  {selectedApp.Resume?.resumePdfName || "resume.pdf"}
                </span>
              </div>
            </div>
            {selectedApp.Resume?.resumePdfUrl ? (
              <a
                href={selectedApp.Resume.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-bold rounded-xl shadow-md bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-xs transition active:scale-[0.98] inline-block"
              >
                Download PDF
              </a>
            ) : (
              <span className="inline-flex items-center rounded-md bg-rose-500/10 px-2.5 py-1 text-xs font-bold text-rose-500 border border-rose-500/25">No PDF Resume Uploaded</span>
            )}
          </div>

          {/* Skills stack */}
          <div className="space-y-3">
            <h3 className="text-foreground font-bold flex items-center gap-2 m-0 text-sm">
              <Star size={15} className="text-indigo-500 shrink-0" /> Skills Stack
            </h3>
            {selectedApp.Resume?.skills && selectedApp.Resume.skills.length > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {selectedApp.Resume.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md bg-card-border/50 dark:bg-card-border/30 px-3 py-1 text-xs font-bold text-text-muted border border-card-border/25"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-sm text-text-muted italic pl-1 block">No skills listed.</span>
            )}
          </div>

          {/* Work Experience */}
          <div className="space-y-3.5">
            <h3 className="text-foreground font-bold flex items-center gap-2 m-0 text-sm">
              <Briefcase size={15} className="text-indigo-500 shrink-0" /> Work History
            </h3>
            {selectedApp.Resume?.experiences && selectedApp.Resume.experiences.length > 0 ? (
              <div className="space-y-5 pl-4 border-l border-card-border/60 ml-2 pt-1">
                {selectedApp.Resume.experiences.map((expStr: string, idx: number) => {
                  const exp = parseExperience(expStr);
                  return (
                    <div key={idx} className="space-y-1 relative">
                      <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 border border-background shrink-0" />
                      <span className="text-sm font-bold text-foreground block leading-tight">{exp.role}</span>
                      <span className="text-xs text-indigo-500 font-semibold block mt-0.5">{exp.company}</span>
                      <span className="text-xs text-text-muted block mt-0.5">{exp.duration}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <span className="text-sm text-text-muted italic pl-1 block">No experiences listed.</span>
            )}
          </div>

          {/* Education */}
          <div className="space-y-3.5">
            <h3 className="text-foreground font-bold flex items-center gap-2 m-0 text-sm">
              <GraduationCap size={15} className="text-indigo-500 shrink-0" /> Education History
            </h3>
            {selectedApp.Resume?.educations && selectedApp.Resume.educations.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {selectedApp.Resume.educations.map((eduStr: string, idx: number) => {
                  const edu = parseEducation(eduStr);
                  return (
                    <div key={idx} className="p-4 bg-background/20 border border-card-border/50 rounded-2xl space-y-1.5">
                      <span className="text-sm font-bold text-foreground block leading-tight">{edu.degree}</span>
                      <span className="text-xs text-indigo-500 font-semibold block">{edu.school}</span>
                      <span className="text-xs text-text-muted block">{edu.year}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <span className="text-sm text-text-muted italic pl-1 block">No education history listed.</span>
            )}
          </div>

          {/* Candidate Notes */}
          {selectedApp.notes && (
            <div className="bg-indigo-500/[0.03] border border-indigo-500/10 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-indigo-500 block">Candidate note:</span>
              <span className="text-sm text-text-muted block italic leading-relaxed">
                "{selectedApp.notes}"
              </span>
            </div>
          )}

          <hr className="border-card-border/50 opacity-40 my-2" />

          {/* RECRUITER DECISIONS BOARD */}
          <div className="bg-indigo-500/[0.03] border border-indigo-500/15 p-5 rounded-2xl space-y-4">
            <h3 className="text-foreground font-bold m-0 text-sm flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-500 shrink-0" /> Recruiter Decisions Manager
            </h3>

            {/* Status Selection Buttons */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-text-muted uppercase tracking-wider">Candidate status</span>
              <div className="flex gap-2.5 flex-wrap">
                {(["pending", "shortlisted", "accepted", "rejected"] as const).map((s) => {
                  const isActive = reviewStatus === s;
                  let styleClass = "border border-card-border bg-card-bg text-text-muted hover:text-foreground hover:bg-card-border/30";
                  if (isActive) {
                    if (s === "pending") styleClass = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-sm";
                    if (s === "shortlisted") styleClass = "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 shadow-sm";
                    if (s === "accepted") styleClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm";
                    if (s === "rejected") styleClass = "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 shadow-sm";
                  }

                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setReviewStatus(s)}
                      className={`cursor-pointer font-bold text-xs uppercase rounded-xl px-4.5 py-2.5 transition active:scale-95 ${styleClass}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Notes Input */}
            <div className="space-y-2">
              <label htmlFor="recruiter-note" className="text-xs text-text-muted font-bold uppercase tracking-wider block">
                Recruiter decisions feedback note (Internal / Shareable)
              </label>
              <textarea
                id="recruiter-note"
                className="w-full bg-background border border-card-border rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-foreground resize-none"
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
                className="cursor-pointer font-bold px-5 py-2.5 rounded-xl shadow-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs flex items-center gap-1.5 transition active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmittingReview ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin mr-1 shrink-0" />
                    Saving decisions...
                  </>
                ) : (
                  <>
                    <Check size={15} />
                    Save Decisions
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-card-border/50 shrink-0 bg-card-bg/90 rounded-b-3xl flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded-xl font-semibold border border-card-border px-4 py-2 text-xs hover:bg-card-border/40 transition-colors text-text-muted active:scale-[0.98] flex items-center gap-1.5"
          >
            <X size={14} className="shrink-0" /> Close
          </button>
        </div>
      </div>
    </div>
  </Portal>
);
}
