"use client";

import HomeProfileNotification from "./HomeProfileNotification";
import HomeHero from "./HomeHero";
import HomeStatsGrid, { type PlatformStats } from "./HomeStatsGrid";
import HomeWorkflow from "./HomeWorkflow";
import HomeBenefits from "./HomeBenefits";
import HomeFeaturedJobs, { type FeaturedJob } from "./HomeFeaturedJobs";
import HomeTestimonial from "./HomeTestimonial";

export default function HomePage({
  featuredJobs,
  stats,
}: {
  featuredJobs: FeaturedJob[];
  stats: PlatformStats;
}) {
  return (
    <main className="relative min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-20 md:space-y-28 overflow-hidden">
      {/* Subtle Background gradient light overlays */}
      <div className="absolute top-[-8%] left-[15%] w-[320px] h-[320px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-5%] w-[380px] h-[380px] rounded-full bg-purple-500/10 blur-[110px] pointer-events-none" />

      {/* Profile Incomplete Notification Banner */}
      <HomeProfileNotification />

      {/* Hero Header */}
      <HomeHero />

      {/* Stats Primatives */}
      <HomeStatsGrid stats={stats} />

      {/* Onboarding Workflows */}
      <HomeWorkflow />

      {/* Value Benefits Grid */}
      <HomeBenefits />

      {/* Featured SQLite Openings */}
      <HomeFeaturedJobs featuredJobs={featuredJobs} />

      {/* Social Proof Testimonials */}
      <HomeTestimonial />
    </main>
  );
}

