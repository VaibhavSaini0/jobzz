"use client";

import Link from "next/link";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export type FeaturedJob = {
  id: string;
  title: string;
  location: string;
  job_type: string;
  company: { name: string };
};

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

export default function HomeFeaturedJobs({ featuredJobs }: { featuredJobs: FeaturedJob[] }) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-7xl mx-auto relative z-10 space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-foreground m-0">Latest openings</h2>
        <span className="text-sm sm:text-base text-text-muted block">Real jobs posted on Jobzz right now</span>
      </div>

      {featuredJobs.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-card-border rounded-2xl bg-card-bg/25">
          <span className="text-sm text-text-muted block">No jobs posted yet. Be the first employer to list a role.</span>
          <Link href="/add-job" className="inline-block mt-4">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold cursor-pointer transition active:scale-[0.98]">Post a Job</button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <motion.div key={job.id} variants={itemVariants} whileHover={{ y: -4 }}>
              <Link href={`/jobs/${job.id}`}>
                <article className="h-full flex flex-col justify-between bg-card-bg border border-card-border hover:border-indigo-500/40 p-6 rounded-2xl transition-all group cursor-pointer">
                  <div>
                    <h3 className="group-hover:text-indigo-600 transition-colors font-bold text-foreground text-base sm:text-lg">
                      {job.title}
                    </h3>
                    <span className="text-sm text-text-muted mt-1 block font-medium">{job.company.name}</span>
                  </div>
                  <div className="flex gap-3 mt-5 text-xs text-text-muted font-semibold">
                    <div className="flex gap-1 items-center"><MapPin size={12} />{job.location}</div>
                    <div className="flex gap-1 items-center"><Briefcase size={12} />{job.job_type}</div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex justify-center pt-2">
        <Link href="/jobs">
          <button className="px-4 py-2.5 border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-soft/10 rounded-xl font-bold active:scale-[0.98] transition cursor-pointer flex items-center gap-1.5 text-sm">
            View all jobs <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </motion.section>
  );
}
