"use client";

import Link from "next/link";
import { Workflow, UserCheck, Building } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function HomeWorkflow() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="max-w-7xl mx-auto relative z-10 space-y-10"
    >
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-2 text-indigo-500">
          <Workflow size={18} />
          <span className="font-bold text-xs uppercase tracking-widest">How Jobzz works</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground m-0">
          Built for candidates and employers
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seeker Workflow */}
        <motion.div variants={itemVariants} className="bg-card-bg/60 border border-card-border p-7 rounded-3xl space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-card-border/50">
            <div className="p-2.5 bg-indigo-soft/20 text-indigo-600 rounded-xl shrink-0">
              <UserCheck size={22} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold m-0 text-foreground">For job seekers</h3>
              <span className="text-xs sm:text-sm text-text-muted block mt-0.5">Search, apply, and track in one place</span>
            </div>
          </div>
          {[
            "Build a resume profile with skills and experience",
            "Generate tailored AI cover letters per job",
            "Apply in one click and track applications",
            "Filter by remote, hybrid, or on-site roles",
          ].map((step, i) => (
            <div key={step} className="flex gap-3 items-start">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-500/10 px-2 py-1 rounded-md shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-text-muted leading-relaxed">{step}</span>
            </div>
          ))}
          <Link href="/profile" className="inline-block mt-2">
            <button className="px-4 py-2 text-sm bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 rounded-xl font-bold cursor-pointer transition active:scale-[0.98]">
              Set up your profile
            </button>
          </Link>
        </motion.div>

        {/* Employer Workflow */}
        <motion.div variants={itemVariants} className="bg-card-bg/60 border border-card-border p-7 rounded-3xl space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-card-border/50">
            <div className="p-2.5 bg-purple-500/10 text-purple-600 rounded-xl shrink-0">
              <Building size={22} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold m-0 text-foreground">For employers</h3>
              <span className="text-xs sm:text-sm text-text-muted block mt-0.5">Post roles and review applicants</span>
            </div>
          </div>
          {[
            "Register your company profile",
            "Publish detailed job listings",
            "Review applicants from your dashboard",
            "Manage listings and hiring pipeline",
          ].map((step, i) => (
            <div key={step} className="flex gap-3 items-start">
              <span className="text-xs font-bold text-purple-600 bg-purple-500/10 px-2 py-1 rounded-md shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-text-muted leading-relaxed">{step}</span>
            </div>
          ))}
          <Link href="/add-job" className="inline-block mt-2">
            <button className="px-4 py-2 text-sm bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 rounded-xl font-bold cursor-pointer transition active:scale-[0.98]">
              Post your first job
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
