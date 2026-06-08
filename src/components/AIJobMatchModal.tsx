"use client";

import { useState } from "react";
import { Sparkles, Loader2, AlertCircle, TrendingUp, X } from "lucide-react";

type MatchData = {
  score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
};

export default function AIJobMatchModal({
  job,
  isOpen,
  setIsOpen,
}: {
  job: { id: string; title: string; company: { name: string } };
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<MatchData | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyze() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/job-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id }),
      });
      const data = await res.json();
      console.log("Match data:", data);
      if (data.success) {
        setMatch(data.data);
        setIsDemo(data.isDemo || false);
      } else {
        setError(data.message || "Analysis failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

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
          max-w-[520px]
          p-6
          bg-card-bg
          border border-card-border/60
          shadow-2xl
          rounded-3xl
          animate-in fade-in zoom-in-95 duration-200
          z-10
          mx-4
          text-left
          text-foreground
        "
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2 items-center">
            <Sparkles size={20} className="text-indigo-500 shrink-0" />
            <h2 className="text-xl font-bold leading-tight m-0">AI Job Match Score</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer p-1.5 rounded-full hover:bg-card-border/40 transition-colors text-text-muted hover:text-foreground active:scale-95"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-text-muted mb-4">
          How well does your profile match <strong>{job.title}</strong>?
        </p>
        <hr className="border-card-border/50 mb-4" />

        {!match && !loading && !error && (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <TrendingUp size={40} className="text-indigo-400" />
            <p className="text-sm text-text-muted max-w-sm">
              AI compares your resume skills and experience against this job description.
            </p>
            <button
              onClick={analyze}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md px-4 py-2.5 text-xs transition active:scale-[0.98]"
            >
              <Sparkles size={16} /> Analyze My Fit
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <Loader2 className="animate-spin text-indigo-500" size={32} />
            <p className="text-sm text-text-muted">Analyzing your profile...</p>
          </div>
        )}

        {error && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-2xl text-xs flex items-center gap-2.5">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {match && (
          <div className="space-y-4">
            {isDemo && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 rounded-xl text-xs leading-relaxed">
                Demo mode — add GEMINI_API_KEY for real AI analysis
              </div>
            )}
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-bold">Match Score</span>
                <span className="font-bold text-indigo-500">{match.score}%</span>
              </div>
              <div className="w-full bg-card-border/50 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${match.score}%` }} />
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{match.summary}</p>
            
            {match.strengths?.length > 0 && (
              <div>
                <span className="text-xs font-bold text-foreground block mb-1">Strengths</span>
                <ul className="text-xs sm:text-sm text-text-muted list-disc pl-4 space-y-1">
                  {match.strengths.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            )}
            
            {match.gaps?.length > 0 && (
              <div>
                <span className="text-xs font-bold text-foreground block mb-1">Areas to improve</span>
                <ul className="text-xs sm:text-sm text-text-muted list-disc pl-4 space-y-1">
                  {match.gaps.map((g) => <li key={g}>{g}</li>)}
                </ul>
              </div>
            )}
            
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => { setMatch(null); analyze(); }}
                className="cursor-pointer px-4 py-2 text-xs font-bold border border-indigo-500/15 hover:bg-indigo-500/10 text-indigo-500 rounded-xl transition active:scale-[0.98]"
              >
                Re-analyze
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
