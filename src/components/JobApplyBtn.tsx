"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import JobApplyModal from "./modals/JobApplyModal";

export default function JobApplyBtn({
  job,
  setIsApplied,
}: {
  job: any;
  isApplied: boolean;
  setIsApplied: (value: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition active:scale-[0.98]"
      >
        <span>Apply Now</span>
        <ChevronRight size={18} />
      </button>

      {/* Reusable, Polished Apply Modal Component */}
      <JobApplyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        job={job}
        setIsApplied={setIsApplied}
      />
    </>
  );
}
