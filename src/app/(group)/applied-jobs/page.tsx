"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Flex,
  Heading,
  Text,
  Card,
  Button,
  Box,
} from "@radix-ui/themes";
import {
  MapPin,
  Briefcase,
  FolderHeart,
  Loader2,
  ExternalLink,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import WithdrawlBtn from "@/components/WithdrawalBtn";
import ApplicationStatusBadge from "@/components/ApplicationStatusBadge";
import { ApplicationStatus, normalizeStatus } from "@/lib/application-status";

type Application = {
  id: string;
  status: string;
  appliedAt: string;
  statusNote?: string | null;
  jobs: {
    id: string;
    title: string;
    location: string;
    employment_type: string;
    company: { id: string; name: string };
  };
};

export default function AppliedJobsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Track Your Applied Jobs | Jobzz";
  }, []);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications/user");
        const data = await res.json();
        if (data.success) setApplications(data.data);
        else toast(data.message || "Failed to load applied jobs.", "error");
      } catch {
        toast("Something went wrong loading your applications.", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [toast]);

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const app of applications) {
      const s = normalizeStatus(app.status);
      counts[s] = (counts[s] || 0) + 1;
    }
    return {
      total: applications.length,
      pending: counts.pending || 0,
      active: (counts.reviewed || 0) + (counts.shortlisted || 0) + (counts.interview || 0),
      rejected: counts.rejected || 0,
      hired: counts.hired || 0,
    };
  }, [applications]);

  const handleWithdrawalSuccess = (jobId: string) => {
    setApplications((prev) => prev.filter((app) => app.jobs.id !== jobId));
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="70vh" direction="column" gap="3">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
        <Text size="3" className="text-text-muted">Loading applied jobs...</Text>
      </Flex>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-6 min-h-screen space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <Heading size="8" className="tracking-tight">
          Track Your{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Applications
          </span>
        </Heading>
        <Text size="3" className="text-text-muted block">
          Monitor hiring status updates from employers in real time.
        </Text>
      </motion.div>

      {/* Status metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, icon: Briefcase, color: "text-indigo-600" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "text-gray-500" },
          { label: "In Progress", value: stats.active, icon: Sparkles, color: "text-purple-600" },
          { label: "Hired", value: stats.hired, icon: CheckCircle2, color: "text-green-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-4 border border-card-border bg-card-bg/60">
            <Flex align="center" gap="2" mb="1">
              <Icon size={14} className={color} />
              <Text size="1" weight="bold" className="text-text-muted uppercase">{label}</Text>
            </Flex>
            <Heading size="6" className={color}>{value}</Heading>
          </Card>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-20 text-center border border-dashed border-card-border rounded-2xl"
          >
            <FolderHeart size={48} className="text-gray-400 mb-3" />
            <Text weight="bold" size="4">No applications yet</Text>
            <Text size="2" color="gray" className="mt-2 mb-6 max-w-sm">
              Browse jobs, use AI match scoring, and apply with tailored cover letters.
            </Text>
            <Link href="/jobs">
              <Button color="indigo">Browse Jobs</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {applications.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="h-full p-5 border border-card-border hover:border-indigo-500/30 transition-colors">
                  <Flex justify="between" align="start" gap="3" mb="3">
                    <Box>
                      <Heading size="4">{app.jobs.title}</Heading>
                      <Link href={`/company/profile/${app.jobs.company.id}?public=true`}>
                        <Text size="2" color="gray" className="hover:text-indigo-500 transition">
                          {app.jobs.company.name}
                        </Text>
                      </Link>
                    </Box>
                    <ApplicationStatusBadge status={app.status} />
                  </Flex>

                  <Flex gap="3" className="text-xs text-text-muted mb-2">
                    <Flex gap="1" align="center"><MapPin size={12} />{app.jobs.location}</Flex>
                    <Flex gap="1" align="center"><Briefcase size={12} />{app.jobs.employment_type}</Flex>
                  </Flex>

                  <Text size="1" color="gray" className="block mb-1">
                    Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    }) : "recently"}
                  </Text>

                  {app.statusNote && (
                    <Text size="1" className="text-text-muted italic block mb-2">
                      Note: {app.statusNote}
                    </Text>
                  )}

                  {(app.status as ApplicationStatus) === "rejected" && (
                    <Flex align="center" gap="1" className="text-red-500 text-xs mb-2">
                      <XCircle size={12} /> Not selected for this role
                    </Flex>
                  )}

                  {(app.status as ApplicationStatus) === "hired" && (
                    <Flex align="center" gap="1" className="text-green-600 text-xs mb-2">
                      <CheckCircle2 size={12} /> Congratulations — you were hired!
                    </Flex>
                  )}

                  <Flex justify="between" align="center" mt="4" pt="3" className="border-t border-card-border/50">
                    <Link href={`/jobs/${app.jobs.id}`}>
                      <Button variant="ghost" color="indigo" size="2">
                        View Job <ExternalLink size={12} />
                      </Button>
                    </Link>
                    {normalizeStatus(app.status) === "pending" && (
                      <WithdrawlBtn
                        job={app.jobs}
                        isApplied
                        setIsApplied={(val) => {
                          if (!val) handleWithdrawalSuccess(app.jobs.id);
                        }}
                      />
                    )}
                  </Flex>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}