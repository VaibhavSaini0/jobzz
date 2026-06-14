"use client";

import {
  MapPin,
  Briefcase,
  Save,
  X,
} from "lucide-react";
import ApplicationStatusBadge from "@/components/ApplicationStatusBadge";
import WithdrawlBtn from "@/components/WithdrawalBtn";
import { normalizeStatus } from "@/lib/application-status";

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedApp: any;
  tempNotes: string;
  setTempNotes: (notes: string) => void;
  savingNotes: boolean;
  handleSaveNotes: () => void;
  handleWithdrawalSuccess: (jobId: string) => void;
}

export default function ApplicationDetailsModal({
  isOpen,
  setIsOpen,
  selectedApp,
  tempNotes,
  setTempNotes,
  savingNotes,
  handleSaveNotes,
  handleWithdrawalSuccess,
}: ApplicationDetailsModalProps) {
  if (!isOpen || !selectedApp) return null;

  const status = selectedApp.status || "pending";
  const normalized = normalizeStatus(status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          max-w-[620px]
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
        {/* Spotlights */}
        <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Sticky Header */}
        <div className="sticky top-0 z-20 border-b border-card-border/50 bg-card-bg/90 backdrop-blur-xl px-6 py-5 shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold leading-tight m-0 text-foreground">
                {selectedApp.jobs?.title}
              </h2>
              <span className="text-sm text-indigo-500 font-semibold block mt-1">
                {selectedApp.jobs?.company?.name}
              </span>
              <div className="flex gap-3 text-xs text-text-muted mt-2">
                <div className="flex gap-1 items-center"><MapPin size={11} />{selectedApp.jobs?.location}</div>
                <div className="flex gap-1 items-center"><Briefcase size={11} />{selectedApp.jobs?.employment_type}</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <ApplicationStatusBadge status={status} />
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-text-muted hover:text-foreground hover:bg-card-border/40 transition-colors cursor-pointer active:scale-95"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div
          className="
            px-6
            py-5
            overflow-y-auto
            max-h-[calc(85vh-160px)]
            space-y-5
            flex-grow
            scrollbar-jobzz
          "
        >
          {/* Recruiter feedback notes */}
          {selectedApp.statusNote && (
            <div className="p-4 bg-indigo-500/[0.03] border border-indigo-500/10 rounded-2xl space-y-1.5">
              <span className="text-indigo-500 font-bold uppercase tracking-wider text-[9px] block">
                Recruiter Official Update
              </span>
              <span className="text-sm text-text-muted leading-relaxed italic block pl-1">
                "{selectedApp.statusNote}"
              </span>
            </div>
          )}

          {/* Prep notes text area */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground block">
              My Interview Preparation Notes
            </span>
            <textarea
              placeholder="Jot down interview dates, key questions to prepare, portfolio links, or salary expectations..."
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              className="w-full min-h-[140px] px-3 py-2 text-sm font-medium bg-background border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm resize-none"
            />
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="flex gap-3 justify-between items-center px-6 py-4 border-t border-card-border/50 shrink-0 bg-card-bg/90 rounded-b-3xl">
          {/* Withdraw button (only shown for pending status) */}
          {normalized === "pending" ? (
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
              onClick={() => setIsOpen(false)}
              className="cursor-pointer px-4 py-2 text-xs font-bold border border-card-border hover:bg-card-border/30 rounded-xl transition text-text-muted active:scale-[0.98] flex items-center gap-1.5"
              disabled={savingNotes}
            >
              <X size={14} /> Close
            </button>
            <button
              onClick={handleSaveNotes}
              className="cursor-pointer px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition active:scale-[0.98] flex items-center gap-1.5 disabled:opacity-50"
              disabled={savingNotes}
            >
              {savingNotes ? (
                "Saving..."
              ) : (
                <>
                  <Save size={14} /> Save Notes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
