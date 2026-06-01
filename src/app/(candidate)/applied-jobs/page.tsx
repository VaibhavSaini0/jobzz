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
  Separator,
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
  Calendar,
  Save,
  X,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import WithdrawlBtn from "@/components/WithdrawalBtn";
import ApplicationStatusBadge from "@/components/ApplicationStatusBadge";
import { normalizeStatus } from "@/lib/application-status";

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
  
  // Single active detail/edit modal state
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [tempNotes, setTempNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    document.title = "Applications Kanban Board | Jobzz";
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
    setSelectedApp(null);
  };

  function openDetailModal(app: Application) {
    setSelectedApp(app);
    setTempNotes(app.notes || "");
  }

  async function handleSaveNotes() {
    if (!selectedApp) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/applications/${selectedApp.id}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: tempNotes }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === selectedApp.id ? { ...app, notes: tempNotes } : app
          )
        );
        toast("Notes updated successfully!", "success");
        setSelectedApp(null);
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
      border: "border-t-2 border-t-gray-400 dark:border-t-gray-600",
      bg: "bg-gray-500/5",
      statuses: ["pending", "reviewed"],
      icon: Clock,
      colorClass: "text-gray-400",
    },
    {
      id: "shortlisted",
      title: "Shortlisted",
      border: "border-t-2 border-t-indigo-500",
      bg: "bg-indigo-500/5",
      statuses: ["shortlisted"],
      icon: Sparkles,
      colorClass: "text-indigo-500",
    },
    {
      id: "interviewing",
      title: "Interviewing",
      border: "border-t-2 border-t-purple-500",
      bg: "bg-purple-500/5",
      statuses: ["interview"],
      icon: Calendar,
      colorClass: "text-purple-500",
    },
    {
      id: "decisions",
      title: "Decisions",
      border: "border-t-2 border-t-green-500",
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
        <Text size="3" className="text-text-muted">Loading your tracker...</Text>
      </Flex>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-6 min-h-screen space-y-6 relative">
      {/* Background aesthetics */}
      <div className="absolute top-[-5%] left-[5%] w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Simplified, Clean Header */}
      <Flex justify="between" align="end" className="flex-wrap gap-4 border-b border-card-border/40 pb-4 relative z-10">
        <Box className="space-y-1">
          <Heading size="6" className="tracking-tight font-extrabold text-foreground">
            Applications Board
          </Heading>
          <Text size="2" className="text-text-muted">
            Track hiring status in real-time. Click any card to view details or add preparation notes.
          </Text>
        </Box>
        {/* Slim, Minimal Metrics row */}
        <Flex gap="3" align="center" className="text-xs font-semibold text-text-muted shrink-0">
          <span>Total: <strong className="text-foreground">{stats.total}</strong></span>
          <span className="text-card-border/60">|</span>
          <span>Pending: <strong className="text-foreground">{stats.pending}</strong></span>
          <span className="text-card-border/60">|</span>
          <span>In Progress: <strong className="text-purple-500">{stats.active}</strong></span>
          <span className="text-card-border/60">|</span>
          <span>Hired: <strong className="text-green-500">{stats.hired}</strong></span>
        </Flex>
      </Flex>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start relative z-10">
        {columns.map((col) => {
          const colApps = applications.filter((app) =>
            col.statuses.includes(normalizeStatus(app.status))
          );

          return (
            <div
              key={col.id}
              className={`p-3 rounded-xl border border-card-border/40 bg-card-bg/15 ${col.border} space-y-3`}
            >
              {/* Column Header */}
              <Flex justify="between" align="center" className="px-1">
                <Flex align="center" gap="2">
                  <col.icon size={14} className={col.colorClass} />
                  <Heading size="2" className="font-extrabold text-foreground text-xs uppercase tracking-wider">
                    {col.title}
                  </Heading>
                </Flex>
                <Badge size="1" color="gray" variant="soft" className="rounded-full font-bold">
                  {colApps.length}
                </Badge>
              </Flex>

              {/* Column Cards Container */}
              <div className="space-y-2.5 min-h-[350px]">
                {colApps.length > 0 ? (
                  colApps.map((app) => (
                    <Card
                      key={app.id}
                      onClick={() => openDetailModal(app)}
                      className="p-3 border border-card-border/80 bg-card-bg hover:bg-card-bg-hover hover:border-indigo-500/30 cursor-pointer transition-all duration-200 shadow-sm rounded-lg active:scale-[0.98]"
                    >
                      <Flex direction="column" className="gap-2">
                        <Flex justify="between" align="start" gap="2">
                          <Heading size="3" className="text-foreground font-bold tracking-tight text-xs leading-tight">
                            {app.jobs.title}
                          </Heading>
                          <ApplicationStatusBadge status={app.status} />
                        </Flex>

                        <Text size="1" className="text-text-muted font-medium truncate block">
                          {app.jobs.company.name}
                        </Text>

                        <Flex justify="between" align="center" className="pt-1.5 border-t border-card-border/30 text-[10px] text-text-muted">
                          <span>
                            Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString("en-US", {
                              month: "short", day: "numeric"
                            }) : "recently"}
                          </span>
                          
                          {/* Note icon if candidate has preparation notes */}
                          {app.notes && (
                            <Flex align="center" gap="0.5" className="text-indigo-500 font-bold">
                              <FileText size={10} />
                              <span>Prep Note</span>
                            </Flex>
                          )}
                        </Flex>
                      </Flex>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-card-border/30 rounded-lg bg-background/5">
                    <FolderHeart size={18} className="text-text-muted/30 mb-1.5" />
                    <Text size="1" className="text-text-muted/50 italic text-[11px]">No applications</Text>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Unified Card Detail Modal */}
      <Dialog.Root open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <Dialog.Content
          style={{ maxWidth: "520px" }}
          className="backdrop-blur-md bg-card-bg/95 border border-card-border rounded-xl shadow-xl p-6"
        >
          {/* Header */}
          <div className="space-y-1 mb-4">
            <Flex justify="between" align="start">
              <div>
                <Heading size="4" className="font-extrabold text-foreground">{selectedApp?.jobs.title}</Heading>
                <Text size="2" className="text-indigo-500 font-semibold">{selectedApp?.jobs.company.name}</Text>
              </div>
              <ApplicationStatusBadge status={selectedApp?.status || "pending"} />
            </Flex>
            <Flex gap="3" className="text-xs text-text-muted pt-1">
              <Flex gap="1" align="center"><MapPin size={11} />{selectedApp?.jobs.location}</Flex>
              <Flex gap="1" align="center"><Briefcase size={11} />{selectedApp?.jobs.employment_type}</Flex>
            </Flex>
          </div>

          <Separator size="4" className="opacity-20 my-3" />

          {/* Recruiter feedback notes */}
          {selectedApp?.statusNote && (
            <Box className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 mb-4 space-y-1">
              <Text size="1" className="text-indigo-500 font-bold uppercase tracking-wider text-[9px]">Recruiter Official Update</Text>
              <Text size="2" className="text-text-muted leading-relaxed italic">"{selectedApp.statusNote}"</Text>
            </Box>
          )}

          {/* Prep notes text area */}
          <Box className="space-y-1.5 mb-4">
            <Text size="1" className="text-text-muted font-bold uppercase tracking-wider text-[9px] block">My Interview Preparation Notes</Text>
            <TextArea
              placeholder="Jot down interview dates, key questions to prepare, portfolio links, or salary expectations..."
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              className="h-28 text-sm font-medium scrollbar-thin"
            />
          </Box>

          {/* Footer Actions */}
          <Flex gap="3" justify="between" align="center" className="mt-5 border-t border-card-border/30 pt-4">
            {/* Withdraw button (only shown for pending status) */}
            {selectedApp && normalizeStatus(selectedApp.status) === "pending" ? (
              <WithdrawlBtn
                job={selectedApp.jobs}
                isApplied
                setIsApplied={(val) => {
                  if (!val) handleWithdrawalSuccess(selectedApp.jobs.id);
                }}
              />
            ) : (
              <div />
            )}

            <Flex gap="2">
              <Button variant="soft" color="gray" onClick={() => setSelectedApp(null)} className="cursor-pointer" disabled={savingNotes}>
                <X size={14} /> Close
              </Button>
              <Button variant="solid" color="indigo" onClick={handleSaveNotes} className="cursor-pointer" disabled={savingNotes}>
                {savingNotes ? "Saving..." : <><Save size={14} /> Save Notes</>}
              </Button>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* No Applications Redirect Card */}
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