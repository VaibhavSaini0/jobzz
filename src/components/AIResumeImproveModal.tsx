"use client";

import { useState } from "react";
import { Sparkles, Loader2, AlertCircle, Wand2, X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

type ImproveData = {
  improvedSummary: string;
  suggestedSkills: string[];
  tips: string[];
};

export default function AIResumeImproveModal({
  isOpen,
  setIsOpen,
  onApplySummary,
  onApplySkills,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onApplySummary?: (summary: string) => void;
  onApplySkills?: (skills: string[]) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ImproveData | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const { toast } = useToast();

  async function improve() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/resume-improve", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setIsDemo(json.isDemo || false);
      } else {
        toast(json.message || "Failed", "error");
      }
    } catch {
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative bg-card-bg border border-card-border w-full max-w-[520px] rounded-2xl shadow-xl overflow-hidden p-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-text-muted hover:text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Wand2 size={20} className="text-purple-500" />
          <h2 className="text-xl font-semibold text-foreground">AI Resume Coach</h2>
        </div>
        
        <p className="text-sm text-text-muted mb-4">
          Get AI suggestions to strengthen your profile
        </p>
        
        <hr className="border-card-border mb-4" />

        {!data && !loading && (
          <div className="flex flex-col items-center gap-3 py-6">
            <Sparkles size={36} className="text-purple-400 animate-pulse" />
            <button
              type="button"
              onClick={improve}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-md shadow-purple-500/20 active:scale-95"
            >
              Analyze My Profile
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <Loader2 className="animate-spin text-purple-500" size={36} />
            <span className="text-sm text-text-muted">Analyzing your resume...</span>
          </div>
        )}

        {data && (
          <div className="space-y-5">
            {isDemo && (
              <div className="flex items-start gap-2.5 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl text-xs leading-relaxed">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>Demo suggestions — set GEMINI_API_KEY for personalized coaching</span>
              </div>
            )}
            
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-foreground">Suggested Summary</h3>
              <p className="text-sm text-text-muted leading-relaxed bg-background p-3 rounded-xl border border-card-border/50">{data.improvedSummary}</p>
              {onApplySummary && (
                <button
                  type="button"
                  onClick={() => {
                    onApplySummary(data.improvedSummary);
                    toast("Summary applied!", "success");
                  }}
                  className="px-3 py-1.5 text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg font-medium transition duration-200"
                >
                  Apply Summary
                </button>
              )}
            </div>

            {data.suggestedSkills?.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-foreground">Suggested Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.suggestedSkills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {onApplySkills && (
                  <button
                    type="button"
                    onClick={() => {
                      onApplySkills(data.suggestedSkills);
                      toast("Skills added!", "success");
                    }}
                    className="px-3 py-1.5 text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg font-medium transition duration-200"
                  >
                    Add Suggested Skills
                  </button>
                )}
              </div>
            )}

            {data.tips?.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-foreground">Tips</h3>
                <ul className="text-sm text-text-muted list-disc pl-5 space-y-1 bg-background p-3 rounded-xl border border-card-border/50">
                  {data.tips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition duration-200"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
