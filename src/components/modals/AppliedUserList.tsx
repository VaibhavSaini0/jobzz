"use client";

import {
  Dialog,
  Text,
  Avatar,
  Box,
  Heading,
  Flex,
  Badge,
  Select,
  Button,
  Callout,
} from "@radix-ui/themes";
import { useState } from "react";
import { Sparkles, Loader2, FileText } from "lucide-react";
import ApplicationStatusBadge from "@/components/ApplicationStatusBadge";
import {
  APPLICATION_STATUSES,
  STATUS_LABELS,
  ApplicationStatus,
} from "@/lib/application-status";
import { useToast } from "@/context/ToastContext";

export type ApplicantRecord = {
  id: string;
  status: string;
  appliedAt: string;
  statusNote?: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  Resume?: {
    resumePdfUrl: string | null;
    resumePdfName: string | null;
    skills?: string[] | null;
    experiences?: string[] | null;
  } | null;
};

type ScreeningResult = {
  score: number;
  recommendation: string;
  summary: string;
  highlights: string[];
  concerns: string[];
};

function parseExperience(raw: string): { role: string; company: string; duration: string } {
  try {
    return JSON.parse(raw);
  } catch {
    return { role: raw, company: "", duration: "" };
  }
}

export default function AppliedUserList({
  isAppModal,
  setIsAppModal,
  applicants,
  onStatusChange,
}: {
  isAppModal: boolean;
  setIsAppModal: (val: boolean) => void;
  applicants: ApplicantRecord[];
  onStatusChange?: (applicationId: string, status: string) => void;
}) {
  const { toast } = useToast();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [screeningId, setScreeningId] = useState<string | null>(null);
  const [screeningResults, setScreeningResults] = useState<Record<string, ScreeningResult>>({});

  async function updateStatus(applicationId: string, status: ApplicationStatus) {
    setUpdatingId(applicationId);
    try {
      const res = await fetch(`/api/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        onStatusChange?.(applicationId, status);
        toast(`Status updated to ${STATUS_LABELS[status]}`, "success");
      } else {
        toast(data.message || "Update failed", "error");
      }
    } catch {
      toast("Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  }

  async function screenCandidate(applicationId: string) {
    setScreeningId(applicationId);
    try {
      const res = await fetch("/api/ai/screen-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId }),
      });
      const data = await res.json();
      if (data.success) {
        setScreeningResults((prev) => ({ ...prev, [applicationId]: data.data }));
      } else {
        toast(data.message || "Screening failed", "error");
      }
    } catch {
      toast("AI screening failed", "error");
    } finally {
      setScreeningId(null);
    }
  }

  return (
    <Dialog.Root open={isAppModal} onOpenChange={setIsAppModal}>
      <Dialog.Content
        style={{
          maxHeight: "80vh",
          maxWidth: "560px",
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        <Dialog.Title>Applicants</Dialog.Title>
        <Dialog.Description size="2" mb="3">
          Review candidates, update status, and run AI screening
        </Dialog.Description>

        <Box style={{ overflowY: "auto", flexGrow: 1 }} className="space-y-4">
          {applicants.length > 0 ? (
            applicants.map((app) => {
              const screening = screeningResults[app.id];
              return (
                <Box
                  key={app.id}
                  className="border border-card-border rounded-xl p-4 space-y-3"
                >
                  <Flex justify="between" align="start" gap="3">
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        fallback={app.user.name.charAt(0).toUpperCase()}
                        radius="full"
                      />
                      <Box>
                        <Heading size="3">{app.user.name}</Heading>
                        <Text size="1" color="gray">{app.user.email}</Text>
                        <Text size="1" color="gray" className="block mt-0.5">
                          Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "recently"}
                        </Text>
                        
                        {/* Skills list preview */}
                        {app.Resume?.skills && app.Resume.skills.length > 0 && (
                          <Flex gap="1.5" wrap="wrap" className="mt-2 max-w-sm">
                            {app.Resume.skills.slice(0, 4).map((skill) => (
                              <Badge key={skill} size="1" color="gray" variant="surface" className="rounded-md">
                                {skill}
                              </Badge>
                            ))}
                            {app.Resume.skills.length > 4 && (
                              <Badge size="1" color="gray" variant="surface" className="rounded-md">
                                +{app.Resume.skills.length - 4} more
                              </Badge>
                            )}
                          </Flex>
                        )}

                        {/* Experience preview */}
                        {app.Resume?.experiences && app.Resume.experiences.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {app.Resume.experiences.slice(0, 2).map((expStr, idx) => {
                              const exp = parseExperience(expStr);
                              return (
                                <Text key={idx} size="1" className="text-text-muted block">
                                  💼 <strong>{exp.role}</strong> {exp.company && `at ${exp.company}`} {exp.duration && `(${exp.duration})`}
                                </Text>
                              );
                            })}
                          </div>
                        )}

                        {app.Resume?.resumePdfUrl && (
                          <a
                            href={app.Resume.resumePdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold text-xs px-2.5 py-1 rounded-md mt-2.5 transition"
                          >
                            <FileText size={12} /> Download Resume
                          </a>
                        )}
                      </Box>
                    </Flex>
                    <ApplicationStatusBadge status={app.status} />
                  </Flex>

                  <Flex gap="2" align="center" wrap="wrap">
                    <Select.Root
                      value={app.status}
                      onValueChange={(val) => updateStatus(app.id, val as ApplicationStatus)}
                      disabled={updatingId === app.id}
                    >
                      <Select.Trigger placeholder="Status" style={{ minWidth: 140 }} />
                      <Select.Content>
                        {APPLICATION_STATUSES.map((s) => (
                          <Select.Item key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>

                    <Button
                      size="2"
                      variant="soft"
                      color="indigo"
                      onClick={() => screenCandidate(app.id)}
                      disabled={screeningId === app.id}
                    >
                      {screeningId === app.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Sparkles size={14} />
                      )}
                      AI Screen
                    </Button>
                  </Flex>

                  {screening && (
                    <Callout.Root color="indigo" size="1">
                      <Callout.Text>
                        <strong>{screening.recommendation}</strong> — Score: {screening.score}/100
                        <br />
                        {screening.summary}
                      </Callout.Text>
                    </Callout.Root>
                  )}
                </Box>
              );
            })
          ) : (
            <Text size="2" color="gray">No applicants yet.</Text>
          )}
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
