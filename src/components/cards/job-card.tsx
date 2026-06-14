"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Building, ChevronRight } from "lucide-react";

export default function Jobcard({
  job,
  fromSearch = false,
}: {
  job: any;
  fromSearch: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <div className="h-full flex flex-col bg-card-bg border border-card-border hover:border-indigo-500/50 dark:hover:border-indigo-400/40 rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group text-left">
        
        {/* Subtle hover gradient background blob */}
        <div className="absolute -inset-y-0 -left-4 w-12 bg-indigo-500/5 blur-xl group-hover:w-24 transition-all duration-500 rounded-full pointer-events-none" />

        <div className="flex justify-between items-start mb-3 gap-3">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-foreground line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {job.title}
            </h3>
          </div>
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
            {job.employment_type}
          </span>
        </div>

        <div className="flex-1 mb-4">
          <p className="text-text-muted text-sm leading-relaxed line-clamp-4">
            {job.description}
          </p>
        </div>

        {/* Location & Details Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 rounded-md bg-card-border/50 dark:bg-card-border/30 px-2 py-0.5 text-xs font-semibold text-text-muted">
            <MapPin size={10} /> {job.location}
          </span>
          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ₹{job.salary ? job.salary.toLocaleString() : "Competitive"}
          </span>
        </div>

        <div className="flex justify-between items-center mt-auto gap-3">
          <div className="max-w-[60%] shrink-0">
            <Link href={`/companies/${job.company.id}`} prefetch={false}>
              <div className="flex items-center gap-2 p-1.5 rounded-lg border border-card-border bg-background hover:bg-indigo-soft/10 transition duration-200">
                {(job.employer_logo || job.company?.logoUrl) ? (
                  <img
                    src={job.employer_logo || job.company?.logoUrl}
                    alt={job.company.name}
                    className="w-5 h-5 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-indigo-soft/20 text-indigo-500 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {job?.company?.name?.charAt(0).toUpperCase() || <Building size={12} />}
                  </div>
                )}
                <span className="text-xs font-bold text-foreground line-clamp-1 truncate block">
                  {job.company.name}
                </span>
              </div>
            </Link>
          </div>

          <Link href={`/jobs/${job.id}`} className="cursor-pointer font-bold rounded-xl shadow-md bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs flex items-center gap-1 transition active:scale-[0.98]">
            <span>Details</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
