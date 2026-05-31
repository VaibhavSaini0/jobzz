"use client";

import Link from "next/link";
import { Button, Flex, Heading, Text, Badge, Box } from "@radix-ui/themes";
import {
  Briefcase,
  MapPin,
  Star,
  Rocket,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  TrendingUp,
  UserCheck,
  Building,
  Workflow,
  Search,
  ArrowRight,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { isEmployer } from "@/lib/roles";

export type FeaturedJob = {
  id: string;
  title: string;
  location: string;
  job_type: string;
  company: { name: string };
};

export type PlatformStats = {
  jobs: number;
  companies: number;
  users: number;
  applications: number;
};

const trendingTags = [
  { label: "Remote", query: "Remote" },
  { label: "React", query: "React" },
  { label: "Full Stack", query: "Developer" },
  { label: "Designer", query: "Designer" },
  { label: "Hybrid", query: "Hybrid" },
];

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

function formatStat(value: number, fallback: string): string {
  if (value <= 0) return fallback;
  if (value >= 1000) return `${Math.floor(value / 100) / 10}k+`;
  return `${value}+`;
}

export default function HomePage({
  featuredJobs,
  stats,
}: {
  featuredJobs: FeaturedJob[];
  stats: PlatformStats;
}) {
  const { user } = useContext(UserContext);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);

  useEffect(() => {
    async function checkProfile() {
      if (!user?.id || isEmployer(user.role)) return;

      setLoadingResume(true);
      try {
        const res = await fetch("/api/profile/resume");
        const data = await res.json();
        if (data.success && data.data) {
          const r = data.data;
          const incomplete =
            !r ||
            !r.summary ||
            !r.skills || r.skills.length === 0 ||
            !r.experiences || r.experiences.length === 0 ||
            !r.resumePdfUrl;
          setIsIncomplete(incomplete);
        } else {
          setIsIncomplete(true);
        }
      } catch (err) {
        console.error("Failed to check profile completion:", err);
      } finally {
        setLoadingResume(false);
      }
    }
    checkProfile();
  }, [user]);

  const statCards = [
    { value: formatStat(stats.jobs, "100+"), label: "Live Openings", color: "indigo" as const },
    { value: formatStat(stats.companies, "50+"), label: "Registered Companies", color: "green" as const },
    { value: formatStat(stats.users, "500+"), label: "Platform Members", color: "indigo" as const },
    { value: formatStat(stats.applications, "200+"), label: "Applications Sent", color: "purple" as const },
  ];

  return (
    <main className="relative min-h-screen px-4 md:px-16 lg:px-24 py-10 md:py-14 space-y-20 md:space-y-28 overflow-hidden">
      <div className="absolute top-[-8%] left-[15%] w-[320px] h-[320px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-5%] w-[380px] h-[380px] rounded-full bg-purple-500/10 blur-[110px] pointer-events-none" />

      {/* Profile Incomplete Notification Banner */}
      <AnimatePresence>
        {user && !isEmployer(user.role) && !loadingResume && isIncomplete && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full max-w-4xl mx-auto z-40 relative -mb-6 mt-2"
          >
            <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 border border-amber-500/30 backdrop-blur-md p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-amber-500/5 text-left">
              <Flex align="center" gap="3" className="flex-1">
                <div className="p-2.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <Box className="space-y-0.5">
                  <Text size="3" weight="bold" className="text-foreground block">
                    Complete your candidate profile!
                  </Text>
                  <Text size="2" className="text-text-muted block">
                    Stand out to recruiters! Add your experiences, skills, and upload your PDF resume to unlock full matching capabilities.
                  </Text>
                </Box>
              </Flex>
              <Link href="/profile">
                <Button color="amber" size="3" className="cursor-pointer font-bold whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  Update Profile <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-6 max-w-4xl mx-auto pt-6 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-soft/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide">
          <Sparkles size={14} />
          <span>AI-assisted job search & hiring</span>
        </div>

        <Heading as="h1" size="9" className="tracking-tight leading-[1.1]">
          Find tech jobs.{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            Hire faster.
          </span>
        </Heading>

        <Text as="p" size="5" className="text-text-muted max-w-2xl mx-auto leading-relaxed">
          Jobzz connects developers, designers, and engineers with companies hiring for remote, hybrid, and on-site roles — with smart search, profile resumes, and AI cover letters.
        </Text>

        <Flex justify="center" gap="3" wrap="wrap" className="mt-6">
          <Link href="/jobs">
            <Button size="4" color="indigo" className="cursor-pointer shadow-lg shadow-indigo-500/20">
              <Search size={18} /> Browse Jobs
            </Button>
          </Link>
          <Link href="/add-job">
            <Button size="4" variant="outline" color="indigo" className="cursor-pointer">
              Post a Job <ArrowRight size={16} />
            </Button>
          </Link>
        </Flex>

        <Flex justify="center" align="center" gap="2" className="pt-4" wrap="wrap">
          <Flex align="center" gap="1.5" className="text-text-muted text-sm">
            <TrendingUp size={14} className="text-indigo-500" />
            <span>Popular searches:</span>
          </Flex>
          {trendingTags.map((tag) => (
            <Link key={tag.label} href={`/jobs?q=${encodeURIComponent(tag.query)}`}>
              <Badge size="2" color="indigo" variant="surface" className="cursor-pointer rounded-full hover:bg-indigo-soft/20">
                {tag.label}
              </Badge>
            </Link>
          ))}
        </Flex>
      </motion.section>

      {/* Stats */}
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
            <Heading size="7" color={stat.color} className="font-extrabold">
              {stat.value}
            </Heading>
            <Text size="2" className="text-text-muted mt-1 block font-medium uppercase tracking-wider">
              {stat.label}
            </Text>
          </div>
        ))}
      </motion.section>

      {/* How it works */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto relative z-10 space-y-10"
      >
        <div className="text-center space-y-2">
          <Flex justify="center" align="center" gap="2" className="text-indigo-500">
            <Workflow size={18} />
            <Text className="font-bold text-xs uppercase tracking-widest">How Jobzz works</Text>
          </Flex>
          <Heading as="h2" size="7">Built for candidates and employers</Heading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="bg-card-bg/60 border border-card-border p-7 rounded-3xl space-y-5">
            <Flex align="center" gap="3" className="pb-2 border-b border-card-border/50">
              <div className="p-2.5 bg-indigo-soft/20 text-indigo-600 rounded-xl">
                <UserCheck size={22} />
              </div>
              <div>
                <Heading as="h3" size="4">For job seekers</Heading>
                <Text size="2" className="text-text-muted">Search, apply, and track in one place</Text>
              </div>
            </Flex>
            {[
              "Build a resume profile with skills and experience",
              "Generate tailored AI cover letters per job",
              "Apply in one click and track applications",
              "Filter by remote, hybrid, or on-site roles",
            ].map((step, i) => (
              <Flex key={step} gap="3" align="start">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-500/10 px-2 py-1 rounded-md">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Text size="2" className="text-text-muted">{step}</Text>
              </Flex>
            ))}
            <Link href="/profile">
              <Button variant="soft" color="indigo" className="mt-2">
                Set up your profile
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-card-bg/60 border border-card-border p-7 rounded-3xl space-y-5">
            <Flex align="center" gap="3" className="pb-2 border-b border-card-border/50">
              <div className="p-2.5 bg-purple-500/10 text-purple-600 rounded-xl">
                <Building size={22} />
              </div>
              <div>
                <Heading as="h3" size="4">For employers</Heading>
                <Text size="2" className="text-text-muted">Post roles and review applicants</Text>
              </div>
            </Flex>
            {[
              "Register your company profile",
              "Publish detailed job listings",
              "Review applicants from your dashboard",
              "Manage listings and hiring pipeline",
            ].map((step, i) => (
              <Flex key={step} gap="3" align="start">
                <span className="text-xs font-bold text-purple-600 bg-purple-500/10 px-2 py-1 rounded-md">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Text size="2" className="text-text-muted">{step}</Text>
              </Flex>
            ))}
            <Link href="/add-job">
              <Button variant="soft" color="purple" className="mt-2">
                Post your first job
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 space-y-8"
      >
        <div className="text-center">
          <Heading as="h2" size="7">Why teams choose Jobzz</Heading>
        </div>
        <Flex wrap="wrap" gap="5" justify="center">
          {[
            { icon: Rocket, title: "Fast applications", desc: "Apply with your saved profile and skip repetitive forms." },
            { icon: Zap, title: "AI cover letters", desc: "Generate job-specific cover letters powered by Gemini AI." },
            { icon: ShieldCheck, title: "Structured hiring", desc: "Employers manage listings and applicants from one dashboard." },
            { icon: HeartHandshake, title: "Modern UX", desc: "Clean search, filters, dark mode, and mobile-friendly design." },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={itemVariants} className="w-full sm:w-72">
              <div className="h-full bg-card-bg border border-card-border p-6 rounded-2xl hover:border-indigo-500/30 transition-colors">
                <div className="p-2.5 bg-indigo-soft/15 text-indigo-600 w-fit rounded-xl mb-3">
                  <Icon size={22} />
                </div>
                <Heading as="h3" size="4" mb="2">{title}</Heading>
                <Text size="2" className="text-text-muted leading-relaxed">{desc}</Text>
              </div>
            </motion.div>
          ))}
        </Flex>
      </motion.section>

      {/* Featured jobs from DB */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <Heading as="h2" size="7">Latest openings</Heading>
          <Text size="3" className="text-text-muted">Real jobs posted on Jobzz right now</Text>
        </div>

        {featuredJobs.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-card-border rounded-2xl">
            <Text className="text-text-muted">No jobs posted yet. Be the first employer to list a role.</Text>
            <Link href="/add-job" className="inline-block mt-4">
              <Button color="indigo">Post a Job</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <motion.div key={job.id} variants={itemVariants} whileHover={{ y: -4 }}>
                <Link href={`/jobs/${job.id}`}>
                  <article className="h-full flex flex-col justify-between bg-card-bg border border-card-border hover:border-indigo-500/40 p-6 rounded-2xl transition-all group">
                    <div>
                      <Heading as="h3" size="4" className="group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </Heading>
                      <Text size="2" className="text-text-muted mt-1 block">{job.company.name}</Text>
                    </div>
                    <Flex gap="3" mt="5" className="text-xs text-text-muted">
                      <Flex gap="1" align="center"><MapPin size={12} />{job.location}</Flex>
                      <Flex gap="1" align="center"><Briefcase size={12} />{job.job_type}</Flex>
                    </Flex>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <Flex justify="center">
          <Link href="/jobs">
            <Button size="3" variant="outline" color="indigo">
              View all jobs <ArrowRight size={16} />
            </Button>
          </Link>
        </Flex>
      </motion.section>

      {/* Testimonial */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl border border-card-border bg-card-bg/60 relative z-10"
      >
        <Flex justify="center" mb="3">
          <Star className="text-amber-400 fill-amber-400" size={24} />
        </Flex>
        <Heading as="h2" size="5" mb="3">Trusted by growing teams</Heading>
        <Text as="p" className="text-text-muted italic leading-relaxed">
          &ldquo;Jobzz helped me land a remote developer role quickly. The job filters are sharp, and the AI cover letter tool saved hours of writing.&rdquo;
        </Text>
        <Text className="font-semibold text-foreground text-sm mt-4 block">— Priya M., Full Stack Developer</Text>
      </motion.section>
    </main>
  );
}
