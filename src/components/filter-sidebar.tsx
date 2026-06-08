"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";

export default function FilterSidebar() {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const q = searchparams.get("q") || "";
  const initialEt = searchparams.get("et") || "";
  const initialJt = searchparams.get("jt") || "";

  const [jobType, setJobType] = useState(initialJt);
  const [employmentType, setEmploymentType] = useState(initialEt);

  // Sync state if URL changes
  useEffect(() => {
    setJobType(searchparams.get("jt") || "");
    setEmploymentType(searchparams.get("et") || "");
  }, [searchparams]);

  function handleclick() {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (employmentType) params.set("et", employmentType);
    if (jobType) params.set("jt", jobType);
    
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleClear() {
    setJobType("");
    setEmploymentType("");
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasFilters = jobType || employmentType;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 bg-card-bg border border-card-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-center pb-3 border-b border-card-border/50">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-foreground text-lg">Filters</span>
          </div>
          {hasFilters && (
            <button
              onClick={handleClear}
              className="text-xs font-semibold text-red-500 hover:text-red-600 cursor-pointer flex items-center gap-1 transition"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <span className="font-bold text-text-muted text-xs tracking-wide uppercase block">
              Job Type
            </span>
            <div className="space-y-2.5">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="jobType"
                  value="Remote"
                  id="jt-remote"
                  checked={jobType === "Remote"}
                  onChange={(e) => setJobType(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-card-border bg-input-bg focus:ring-indigo-500 cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
                <label htmlFor="jt-remote" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  Remote
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="jobType"
                  value="On-site"
                  id="jt-onsite"
                  checked={jobType === "On-site"}
                  onChange={(e) => setJobType(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-card-border bg-input-bg focus:ring-indigo-500 cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
                <label htmlFor="jt-onsite" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  On-site
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="jobType"
                  value="Hybrid"
                  id="jt-hybrid"
                  checked={jobType === "Hybrid"}
                  onChange={(e) => setJobType(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-card-border bg-input-bg focus:ring-indigo-500 cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
                <label htmlFor="jt-hybrid" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  Hybrid
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-text-muted text-xs tracking-wide uppercase block">
              Employment Type
            </span>
            <div className="space-y-2.5">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="employmentType"
                  value="Full-Time"
                  id="et-fulltime"
                  checked={employmentType === "Full-Time"}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-card-border bg-input-bg focus:ring-indigo-500 cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
                <label htmlFor="et-fulltime" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  Full-Time
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="employmentType"
                  value="Part-Time"
                  id="et-parttime"
                  checked={employmentType === "Part-Time"}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-card-border bg-input-bg focus:ring-indigo-500 cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
                <label htmlFor="et-parttime" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  Part-Time
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="employmentType"
                  value="Contract"
                  id="et-contract"
                  checked={employmentType === "Contract"}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-card-border bg-input-bg focus:ring-indigo-500 cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
                <label htmlFor="et-contract" className="text-sm text-foreground cursor-pointer font-medium hover:text-indigo-500 transition">
                  Contract
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleclick}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl cursor-pointer hover:bg-indigo-700 hover:shadow-lg transition-all duration-300 font-semibold active:scale-[0.98]"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
