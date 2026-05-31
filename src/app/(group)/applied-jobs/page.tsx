"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Flex,
  Heading,
  Text,
  Card,
  Button,
  Box,
  Dialog,
  TextArea,
  Badge,
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
  FileText,
  Calendar,
  Save,
  X,
  Edit2,
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
  notes?: string | null;
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
  
  // Notes states
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [tempNotes, setTempNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    document.title = "Kanban Application Tracker | Jobzz";
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

  function startEditingNotes(app: Application) {
    setEditingApp(app);
    setTempNotes(app.notes || "");
  }

  async function handleSaveNotes() {
    if (!editingApp) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/applications/${editingApp.id}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: tempNotes }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === editingApp.id ? { ...app, notes: tempNotes } : app
          )
        );
        toast("Notes updated successfully!", "success");
        setEditingApp(null);
      } else {
        toast(data.message || "Failed to save notes.", "error");
      }
    } catch {
      toast("Failed to save notes.", "error");
    } finally {
      setSavingNotes(false);
    }
  }

  // Kanban column definitions mapped to standard candidate application states
  const columns = [
    {
      id: "applied",
      title: "Applied",
      color: "border-t-4 border-t-gray-500",
      bg: "bg-gray-500/5",
      statuses: ["pending", "reviewed"],
      icon: Clock,
      colorClass: "text-gray-500",
    },
    {
      id: "shortlisted",
      title: "Shortlisted",
      color: "border-t-4 border-t-indigo-500",
      bg: "bg-indigo-500/5",
      statuses: ["shortlisted"],
      icon: Sparkles,
      colorClass: "text-indigo-500",
    },
    {
      id: "interviewing",
      title: "Interview Scheduled",
      color: "border-t-4 border-t-purple-500",
      bg: "bg-purple-500/5",
      statuses: ["interview"],
      icon: Calendar,
      colorClass: "text-purple-500",
    },
    {
      id: "decisions",
      title: "Decisions",
      color: "border-t-4 border-t-green-500",
      bg: "bg-green-500/5",
      statuses: ["hired", "rejected"],
      icon: CheckCircle2,
      colorClass: "text-green-500",
    },
  ];

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="70vh" direction="column" gap="3">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
        <Text size="3" className="text-text-muted">Loading Kanban Board...</Text>
      </Flex>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-6 min-h-screen space-y-8 relative">
      {/* Background aesthetics */}
      <div className="absolute top-[-5%] left-[5%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2 relative z-10"
      >
        <Text size="1" className="text-indigo-500 font-bold uppercase tracking-wider block">APPLICATION CENTER</Text>
        <Heading size="8" className="tracking-tight font-extrabold text-foreground">
          Kanban{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Tracker Board
          </span>
        </Heading>
        <Text size="3" className="text-text-muted block">
          Track hiring milestones, schedule preparation tasks, and add interview reminders.
        </Text>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
        {[
          { label: "Total Applications", value: stats.total, icon: Briefcase, color: "text-indigo-600 bg-indigo-500/5" },
          { label: "Pending Response", value: stats.pending, icon: Clock, color: "text-gray-500 bg-gray-500/5" },
          { label: "In Progress", value: stats.active, icon: Sparkles, color: "text-purple-600 bg-purple-500/5" },
          { label: "Success / Hired", value: stats.hired, icon: CheckCircle2, color: "text-green-600 bg-green-500/5" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-4 border border-card-border bg-card-bg/60 backdrop-blur-sm rounded-xl">
            <Flex align="center" gap="2.5">
              <span className={`p-2 rounded-lg ${color}`}>
                <Icon size={16} />
              </span>
              <Box>
                <Text size="1" className="text-text-muted font-bold block uppercase">{label}</Text>
                <Heading size="5" className="text-foreground tracking-tight font-extrabold">{value}</Heading>
              </Box>
            </Flex>
          </Card>
        ))}
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start relative z-10">
        {columns.map((col) => {
          const colApps = applications.filter((app) =>
            col.statuses.includes(normalizeStatus(app.status))
          );

          return (
            <div
              key={col.id}
              className={`p-4 rounded-2xl border border-card-border/60 ${col.bg} backdrop-blur-sm ${col.color} space-y-4`}
            >
              {/* Column Header */}
              <Flex justify="between" align="center" className="pb-1 border-b border-card-border/30">
                <Flex align="center" gap="2">
                  <col.icon size={16} className={col.colorClass} />
                  <Heading size="3" className="font-extrabold text-foreground text-sm tracking-tight">
                    {col.title}
                  </Heading>
                </Flex>
                <Badge size="1" color={col.id === "decisions" ? "green" : col.id === "interviewing" ? "purple" : "indigo"} className="rounded-full">
                  {colApps.length}
                </Badge>
              </Flex>

              {/* Column Cards Container */}
              <div className="space-y-3.5 min-h-[300px]">
                {colApps.length > 0 ? (
                  colApps.map((app) => (
                    <Card
                      key={app.id}
                      className="p-4.5 border border-card-border bg-card-bg/90 rounded-xl hover:border-indigo-500/20 transition-all duration-300 shadow-sm relative group"
                    >
                      <Flex justify="between" align="start" gap="2" mb="2">
                        <Box className="max-w-[75%]">
                          <Heading size="3" className="text-foreground font-extrabold tracking-tight text-sm truncate">
                            {app.jobs.title}
                          </Heading>
                          <Link href={`/company/profile/${app.jobs.company.id}?public=true`}>
                            <Text size="1" className="text-text-muted hover:text-indigo-500 transition truncate block font-semibold mt-0.5">
                              {app.jobs.company.name}
                            </Text>
                          </Link>
                        </Box>
                        <ApplicationStatusBadge status={app.status} />
                      </Flex>

                      <Flex gap="2" className="text-[10px] text-text-muted mb-2 font-medium">
                        <Flex gap="1" align="center"><MapPin size={10} />{app.jobs.location}</Flex>
                        <Flex gap="1" align="center"><Briefcase size={10} />{app.jobs.employment_type}</Flex>
                      </Flex>

                      {/* Recruiter status note */}
                      {app.statusNote && (
                        <div className="p-2 bg-indigo-500/5 rounded-lg border border-indigo-500/10 mb-2">
                          <Text size="1" className="text-indigo-600 dark:text-indigo-400 font-semibold block mb-0.5">Recruiter Note:</Text>
                          <Text size="1" className="text-text-muted italic block truncate">{app.statusNote}</Text>
                        </div>
                      )}

                      {/* Candidate preparation notes */}
                      <div
                        onClick={() => startEditingNotes(app)}
                        className="p-2 bg-background/40 hover:bg-background/80 rounded-lg border border-dashed border-card-border/60 mb-3 cursor-pointer transition-colors relative"
                      >
                        <Flex justify="between" align="center" className="mb-0.5">
                          <Text size="1" className="text-text-muted font-bold block uppercase tracking-wider text-[9px]">My Interview Prep Notes</Text>
                          <Edit2 size={8} className="text-text-muted group-hover:text-indigo-500" />
                        </Flex>
                        <Text size="1" className="text-text-muted line-clamp-2 leading-relaxed">
                          {app.notes || "Click to add prep checklist, dates, or salary targets..."}
                        </Text>
                      </div>

                      {/* Timeline decisions */}
                      {app.status === "rejected" && (
                        <Flex align="center" gap="1" className="text-red-500 text-[10px] mb-2 font-semibold">
                          <XCircle size={10} /> Not selected for this role
                        </Flex>
                      )}
                      {app.status === "hired" && (
                        <Flex align="center" gap="1" className="text-green-600 text-[10px] mb-2 font-semibold animate-pulse">
                          <CheckCircle2 size={10} /> Congratulations — you were hired!
                        </Flex>
                      )}

                      {/* Bottom Quick Actions */}
                      <Flex justify="between" align="center" className="border-t border-card-border/50 pt-2 mt-2">
                        <Link href={`/jobs/${app.jobs.id}`}>
                          <Button variant="ghost" color="indigo" size="1" className="text-[10px] font-bold">
                            View Job <ExternalLink size={10} />
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
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-card-border/40 rounded-xl bg-background/5">
                    <FolderHeart size={24} className="text-text-muted/40 mb-2" />
                    <Text size="1" className="text-text-muted italic">Empty column</Text>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate Notes Editing Dialog */}
      <Dialog.Root open={!!editingApp} onOpenChange={(open) => !open && setEditingApp(null)}>
        <Dialog.Content
          style={{ maxWidth: "480px" }}
          className="backdrop-blur-md bg-card-bg/95 border border-card-border rounded-xl shadow-xl"
        >
          <Dialog.Title>
            <Heading size="4">Interview Prep Notes</Heading>
          </Dialog.Title>
          <Dialog.Description size="1" className="text-text-muted mb-3">
            Track interview questions, checklist items, research notes, and dates for:{" "}
            <span className="font-bold text-foreground">{editingApp?.jobs.title}</span> at{" "}
            <span className="font-bold text-indigo-500">{editingApp?.jobs.company.name}</span>
          </Dialog.Description>

          <TextArea
            placeholder="Type your target checklist here (e.g. mock queries, coding prep, offer details)..."
            value={tempNotes}
            onChange={(e) => setTempNotes(e.target.value)}
            className="h-40 text-sm font-medium scrollbar-thin"
          />

          <Flex gap="3" justify="end" className="mt-4 border-t border-card-border/30 pt-3">
            <Button variant="soft" color="gray" onClick={() => setEditingApp(null)} className="cursor-pointer" disabled={savingNotes}>
              <X size={14} /> Cancel
            </Button>
            <Button variant="solid" color="indigo" onClick={handleSaveNotes} className="cursor-pointer" disabled={savingNotes}>
              {savingNotes ? "Saving..." : <><Save size={14} /> Save Notes</>}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* No Applications Empty State Redirect */}
      {applications.length === 0 && (
        <div className="flex flex-col items-center py-20 text-center border border-dashed border-card-border rounded-2xl relative z-10 bg-card-bg/40 backdrop-blur-sm">
          <FolderHeart size={48} className="text-text-muted/60 mb-3" />
          <Text weight="bold" size="4">No active applications yet</Text>
          <Text size="2" className="text-text-muted mt-2 mb-6 max-w-sm">
            Browse current jobs, run matching scores, and apply with custom AI cover letters.
          </Text>
          <Link href="/jobs">
            <Button color="indigo" className="cursor-pointer shadow-md">Browse Jobs</Button>
          </Link>
        </div>
      )}
    </main>
  );
}