"use client";

import { motion } from "framer-motion";

export type PlatformStats = {
  jobs: number;
  companies: number;
  users: number;
  applications: number;
};

function formatStat(value: number, fallback: string): string {
  if (value <= 0) return fallback;
  if (value >= 1000) return `${Math.floor(value / 100) / 10}k+`;
  return `${value}+`;
}

const colorMap = {
  indigo: "text-indigo-600 dark:text-indigo-400",
  green: "text-emerald-600 dark:text-emerald-400",
  purple: "text-purple-600 dark:text-purple-400",
};

export default function HomeStatsGrid({ stats }: { stats: PlatformStats }) {
  const statCards = [
    { value: formatStat(stats.jobs, "100+"), label: "Live Openings", color: "indigo" as const },
    { value: formatStat(stats.companies, "50+"), label: "Registered Companies", color: "green" as const },
    { value: formatStat(stats.users, "500+"), label: "Platform Members", color: "indigo" as const },
    { value: formatStat(stats.applications, "200+"), label: "Applications Sent", color: "purple" as const },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10"
    >
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="bg-card-bg/50 border border-card-border p-5 md:p-6 rounded-2xl backdrop-blur-sm text-center hover:border-indigo-500/30 transition-colors"
        >
          <h2 className={`text-3xl md:text-4xl font-extrabold m-0 ${colorMap[stat.color]}`}>
            {stat.value}
          </h2>
          <span className="text-[10px] sm:text-xs text-text-muted mt-1.5 block font-bold uppercase tracking-wider">
            {stat.label}
          </span>
        </div>
      ))}
    </motion.section>
  );
}
