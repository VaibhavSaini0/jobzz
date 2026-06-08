"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Loader2, FileText, AlertCircle, X } from "lucide-react";

export default function AICoverLetterModal({
  job,
  isOpen,
  setIsOpen,
}: {
  job: any;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  async function generateCoverLetter() {
    setLoading(true);
    setError(null);
    setCoverLetter(null);
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id }),
      });
      const data = await res.json();
      if (data.success) {
        setCoverLetter(data.data);
        setIsDemo(data.isDemo || false);
      } else {
        setError(data.message || "Failed to generate cover letter.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
          max-w-[600px]
          p-6
          bg-card-bg
          border border-card-border/60
          shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),_0_8px_10px_-6px_rgba(0,0,0,0.1)]
          rounded-3xl
          animate-in fade-in zoom-in-95 duration-200
          z-10
          mx-4
          text-left
          text-foreground
        "
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500 shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight m-0">AI Cover Letter Generator</h2>
              <p className="text-sm text-text-muted mt-1">
                Generate a tailored cover letter for <strong>{job.title}</strong> at <strong>{job.company.name}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer p-1.5 rounded-full hover:bg-card-border/40 transition-colors text-text-muted hover:text-foreground active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        <hr className="border-card-border/50 my-4" />

        {/* Action / State Area */}
        <div className="min-h-[250px] flex flex-col justify-center">
          {!loading && !coverLetter && !error && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <FileText size={48} className="text-text-muted/60 animate-pulse" />
              <p className="text-sm text-text-muted max-w-[400px] leading-relaxed">
                Our Career AI will analyze your skills, experience, and the target job description to draft a high-impact cover letter.
              </p>
              <button
                onClick={generateCoverLetter}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md px-4 py-2.5 text-xs transition active:scale-[0.98]"
              >
                <Sparkles size={16} /> Draft My Cover Letter
              </button>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <Loader2 size={40} className="animate-spin text-indigo-600" />
              <p className="text-sm font-semibold text-indigo-500 animate-pulse">
                Analyzing resume and drafting cover letter...
              </p>
            </div>
          )}

          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-2xl text-xs flex items-center gap-2.5 my-4">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {coverLetter && (
            <div className="space-y-4">
              {isDemo && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 rounded-xl text-xs leading-relaxed">
                  <strong>Demo Mode Active:</strong> Add `GEMINI_API_KEY` to your `.env` file to experience real-time Gemini AI tailoring!
                </div>
              )}

              <div className="max-h-[300px] overflow-y-auto p-4 rounded-xl border border-card-border/60 bg-input-bg text-sm leading-relaxed whitespace-pre-line text-foreground scrollbar-thin">
                {coverLetter}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setCoverLetter(null)}
                  className="cursor-pointer px-4 py-2 text-xs font-bold border border-card-border hover:bg-card-border/30 rounded-xl transition text-text-muted active:scale-[0.98]"
                >
                  Regenerate
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-xl shadow-md transition active:scale-[0.98] flex items-center gap-1.5 ${
                      copied ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={16} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copy to Clipboard
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer px-4 py-2 text-xs font-bold bg-card-border/50 hover:bg-card-border/70 border border-card-border rounded-xl transition text-text-muted active:scale-[0.98]"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
