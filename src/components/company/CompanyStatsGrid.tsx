"use client";

import { Briefcase, Star, Users } from "lucide-react";

interface CompanyStatsGridProps {
  activeJobsCount: number;
  reviewCount: number;
  teamCount: number;
}

export default function CompanyStatsGrid({
  activeJobsCount,
  reviewCount,
  teamCount,
}: CompanyStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-10">
      <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
        <div>
          <span className="block text-[10px] text-text-muted font-bold uppercase tracking-wider">Active Openings</span>
          <h3 className="text-xl sm:text-2xl text-foreground font-extrabold mt-1">{activeJobsCount} Jobs</h3>
        </div>
        <div className="p-3 bg-indigo-500/5 text-indigo-500 rounded-2xl group-hover:scale-110 transition duration-300">
          <Briefcase size={20} />
        </div>
      </div>

      <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
        <div>
          <span className="block text-[10px] text-text-muted font-bold uppercase tracking-wider">Developer Reviews</span>
          <h3 className="text-xl sm:text-2xl text-foreground font-extrabold mt-1">{reviewCount} Reviews</h3>
        </div>
        <div className="p-3 bg-indigo-500/5 text-indigo-500 rounded-2xl group-hover:scale-110 transition duration-300">
          <Star size={20} className="text-yellow-500" />
        </div>
      </div>

      <div className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
        <div>
          <span className="block text-[10px] text-text-muted font-bold uppercase tracking-wider">Recruiting Team</span>
          <h3 className="text-xl sm:text-2xl text-foreground font-extrabold mt-1">{teamCount} Members</h3>
        </div>
        <div className="p-3 bg-indigo-500/5 text-indigo-500 rounded-2xl group-hover:scale-110 transition duration-300">
          <Users size={20} />
        </div>
      </div>
    </div>
  );
}
