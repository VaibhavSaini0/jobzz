"use client";

import Link from "next/link";
import { Sparkles, Search, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const trendingTags = [
  { label: "Remote", key: "jt", value: "Remote" },
  { label: "React", key: "q", value: "React" },
  { label: "Full Stack", key: "q", value: "Developer" },
  { label: "Designer", key: "q", value: "Designer" },
  { label: "Hybrid", key: "jt", value: "Hybrid" },
];

export default function HomeHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center space-y-6 max-w-4xl mx-auto pt-6 relative z-10 animate-fadeIn"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-soft/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide">
        <Sparkles size={14} />
        <span>AI-assisted job search & hiring</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] text-foreground font-black">
        Find tech jobs.{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
          Hire faster.
        </span>
      </h1>

      <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
        Jobzz connects developers, designers, and engineers with companies hiring for remote, hybrid, and on-site roles — with smart search, profile resumes, and AI cover letters.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <Link href="/jobs">
          <button className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition cursor-pointer flex items-center gap-2">
            <Search size={18} /> Browse Jobs
          </button>
        </Link>
        <Link href="/add-job">
          <button className="px-5 py-3 border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-soft/10 rounded-xl font-bold active:scale-[0.98] transition cursor-pointer flex items-center gap-2">
            Post a Job <ArrowRight size={16} />
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2.5 pt-4">
        <div className="flex items-center gap-1.5 text-text-muted text-sm font-semibold">
          <TrendingUp size={14} className="text-indigo-500" />
          <span>Popular searches:</span>
        </div>
        {trendingTags.map((tag) => (
          <Link key={tag.label} href={`/jobs?${tag.key}=${encodeURIComponent(tag.value)}`}>
            <span className="cursor-pointer rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 font-bold px-3 py-1 text-xs transition">
              {tag.label}
            </span>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
