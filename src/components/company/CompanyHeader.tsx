"use client";

import { Building2, UserPlus, Edit3 } from "lucide-react";

interface CompanyHeaderProps {
  company: any;
  onInviteRecruiter: () => void;
  onEditSettings: () => void;
}

export default function CompanyHeader({
  company,
  onInviteRecruiter,
  onEditSettings,
}: CompanyHeaderProps) {
  return (
    <div className="w-full relative z-10 mb-6">
      <div
        className="bg-card-bg border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex flex-col md:flex-row items-center md:items-end px-8 py-6 mt-5 relative z-20 gap-6"
      >
        <div className="relative group w-32 h-32 rounded-3xl overflow-hidden border-4 border-background bg-card-bg shadow-xl hover:scale-[1.03] transition-all duration-300 flex items-center justify-center shrink-0">
          {company?.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-indigo-soft/10 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-3xl">
              {company?.name ? company.name[0].toUpperCase() : "C"}
            </div>
          )}
        </div>

        <div className="flex flex-row justify-between items-center md:items-end w-full flex-wrap gap-4 pb-2 text-center md:text-left">
          <div className="space-y-1 w-full md:w-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground m-0">
              {company?.name || "Corporate Workspace"}
            </h1>
            <span className="text-sm sm:text-base text-indigo-500 font-semibold flex items-center gap-1.5 justify-center md:justify-start">
              <Building2 size={16} />
              {company?.industry || "Software & Technology"}
            </span>
          </div>

          <div className="flex gap-3 items-center shrink-0 justify-center w-full sm:w-auto mt-2 sm:mt-0">
            <button
              onClick={onInviteRecruiter}
              className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 border border-purple-500/15 shadow-sm px-4 py-2 transition-colors text-xs sm:text-sm active:scale-[0.98]"
            >
              <UserPlus size={14} className="text-purple-500" /> Invite Recruiter
            </button>
            <button
              onClick={onEditSettings}
              className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md px-4 py-2 transition text-xs sm:text-sm active:scale-[0.98]"
            >
              <Edit3 size={14} /> Edit Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
