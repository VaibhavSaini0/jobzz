"use client";

import JobApplyBtn from "@/components/JobApplyBtn";
import AppliedUserList, {
  type ApplicantRecord,
} from "@/components/modals/AppliedUserList";
import {
  Box,
  Flex,
  Heading,
  Text,
  Separator,
  Button,
  Card,
  Avatar,
  Badge,
} from "@radix-ui/themes";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import WithdrawalBtn from "@/components/WithdrawalBtn";
import AICoverLetterModal from "@/components/AICoverLetterModal";
import AIJobMatchModal from "@/components/AIJobMatchModal";
import { UserContext } from "@/context/UserContext";
import Loading from "@/components/lodingstate/Loading";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  employment_type: string;
  job_type: string;
  apply_through: string;
  company: { id: string; name: string };
  companyId: string;
  lastDate: string | null;
};

export default function JobDetailPage() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAppModal, setIsAppModal] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [applicants, setApplicants] = useState<ApplicantRecord[]>([]);
  const [isApplied, setIsApplied] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { user, company } = useContext(UserContext);

  useEffect(() => {
    if (!loading && job && user && user.role === "admin") {
      const isOwner = company?.id === job.companyId;
      if (!isOwner) {
        router.push("/profile");
      }
    }
  }, [loading, job, user, company, router]);

  useEffect(() => {
    async function fetchJob() {
      setLoading(true);
      try {
        const res = await fetch(`/api/job/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const json = await res.json();
        setJob(json.data ?? json);
      } catch (err) {
        console.error("Failed to load job:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  useEffect(() => {
    async function fetchApplicationState() {
      if (!job || !user) return;
      const isOwner = company?.id === job.companyId;

      if (isOwner) {
        try {
          const res = await fetch(`/api/applicants/${job.id}`);
          const data = await res.json();
          if (data.success) setApplicants(data.data ?? []);
        } catch (err) {
          console.error("Failed to load applicants:", err);
        }
        return;
      }

      try {
        const res = await fetch(`/api/applications/check/${job.id}`);
        const data = await res.json();
        if (data.success) setIsApplied(Boolean(data.applied));
      } catch (err) {
        console.error("Failed to check application:", err);
      }
    }
    fetchApplicationState();
  }, [job, user, company]);

  function handleStatusChange(applicationId: string, status: string) {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status } : a))
    );
  }

  if (loading) return <Loading />;
  if (!job) return <Text color="red">Job not found.</Text>;

  const isOwner = company?.id === job.companyId;
  const isCandidate = user && !isOwner;
  const isExpired = job.lastDate ? new Date() > new Date(job.lastDate) : false;

  return (
    <Box className="max-w-4xl mx-auto p-6 space-y-6">
      <Flex align="center" justify="between" wrap="wrap" className="gap-4">
        <Box>
          <Heading size="6" className="mb-1">{job.title}</Heading>
          <Text size="3" color="gray">
            {job.location} • {job.job_type} • {job.employment_type}
          </Text>
        </Box>
        <Flex gap="2" wrap="wrap" align="center">
          {isOwner && (
            <Button
              onClick={() => setIsAppModal(true)}
              size="3"
              variant="outline"
              color="indigo"
            >
              <Users size={16} />
              Applicants ({applicants.length})
            </Button>
          )}
          {isCandidate && (
            <>
              <Button
                onClick={() => setIsMatchModalOpen(true)}
                size="3"
                variant="soft"
                color="purple"
              >
                <TrendingUp size={16} /> AI Match
              </Button>
              <Button
                onClick={() => setIsAiModalOpen(true)}
                size="3"
                variant="soft"
                color="indigo"
              >
                <Sparkles size={16} /> AI Cover Letter
              </Button>
            </>
          )}
          {isCandidate && (
            isExpired ? (
              !isApplied ? (
                <Button size="3" variant="solid" color="gray" disabled>
                  Deadline Passed
                </Button>
              ) : (
                <WithdrawalBtn job={job} isApplied={isApplied} setIsApplied={setIsApplied} />
              )
            ) : (
              !isApplied ? (
                <JobApplyBtn job={job} isApplied={isApplied} setIsApplied={setIsApplied} />
              ) : (
                <WithdrawalBtn job={job} isApplied={isApplied} setIsApplied={setIsApplied} />
              )
            )
          )}
        </Flex>
      </Flex>

      {isCandidate && (
        <Card className="p-4 bg-indigo-500/5 border border-indigo-500/20">
          <Flex align="center" gap="2">
            <Sparkles size={16} className="text-indigo-500" />
            <Text size="2" className="text-text-muted">
              Use <strong>AI Match</strong> to see how well your profile fits this role, then generate a tailored cover letter.
            </Text>
          </Flex>
        </Card>
      )}

      <Separator size="4" />

      <Card size="2" className="bg-card-bg border border-card-border">
        <Flex align="center" gap="4">
          <Avatar fallback={job.company.name.charAt(0).toUpperCase()} size="4" radius="full" />
          <Text size="4" weight="medium">{job.company.name}</Text>
        </Flex>
      </Card>

      <Box>
        <Heading size="4" mb="2">Job Description</Heading>
        <Text as="p" size="3" color="gray" className="whitespace-pre-line">{job.description}</Text>
      </Box>

      <Box>
        <Heading size="4" mb="2">Details</Heading>
        <Flex direction="column" gap="2">
          <Text><strong>Salary:</strong> ₹{job.salary.toLocaleString()}</Text>
          <Text><strong>Employment Type:</strong> {job.employment_type}</Text>
          <Text><strong>Job Type:</strong> {job.job_type}</Text>
          <Text><strong>Location:</strong> {job.location}</Text>
          <Flex align="center" gap="2">
            <strong>Apply via:</strong>
            <Badge variant="soft">{job.apply_through}</Badge>
          </Flex>
          {job.lastDate && (
            <Text>
              <strong>Application Deadline:</strong>{" "}
              <span className={isExpired ? "text-red-500 font-semibold" : "text-indigo-600 dark:text-indigo-400 font-semibold"}>
                {new Date(job.lastDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                {isExpired && " (Passed)"}
              </span>
            </Text>
          )}
        </Flex>
      </Box>

      {isAppModal && (
        <AppliedUserList
          isAppModal={isAppModal}
          setIsAppModal={setIsAppModal}
          applicants={applicants}
          onStatusChange={handleStatusChange}
        />
      )}
      {isAiModalOpen && (
        <AICoverLetterModal job={job} isOpen={isAiModalOpen} setIsOpen={setIsAiModalOpen} />
      )}
      {isMatchModalOpen && (
        <AIJobMatchModal job={job} isOpen={isMatchModalOpen} setIsOpen={setIsMatchModalOpen} />
      )}
    </Box>
  );
}
