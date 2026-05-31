"use client";

import { useState } from "react";
import {
  Dialog,
  Button,
  Flex,
  Text,
  Box,
  Separator,
  Callout,
  Progress,
} from "@radix-ui/themes";
import { Sparkles, Loader2, AlertCircle, TrendingUp } from "lucide-react";

type MatchData = {
  score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
};

export default function AIJobMatchModal({
  job,
  isOpen,
  setIsOpen,
}: {
  job: { id: string; title: string; company: { name: string } };
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<MatchData | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyze() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/job-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id }),
      });
      const data = await res.json();
      console.log("Match data:", data);
      if (data.success) {
        setMatch(data.data);
        setIsDemo(data.isDemo || false);
      } else {
        setError(data.message || "Analysis failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content maxWidth="520px">
        <Flex gap="2" align="center" mb="2">
          <Sparkles size={20} className="text-indigo-500" />
          <Dialog.Title>AI Job Match Score</Dialog.Title>
        </Flex>
        <Dialog.Description size="2" mb="3">
          How well does your profile match <strong>{job.title}</strong>?
        </Dialog.Description>
        <Separator size="4" mb="4" />

        {!match && !loading && !error && (
          <Flex direction="column" align="center" gap="3" py="4">
            <TrendingUp size={40} className="text-indigo-400" />
            <Text size="2" color="gray" align="center">
              AI compares your resume skills and experience against this job description.
            </Text>
            <Button onClick={analyze} color="indigo">
              <Sparkles size={16} /> Analyze My Fit
            </Button>
          </Flex>
        )}

        {loading && (
          <Flex direction="column" align="center" gap="2" py="6">
            <Loader2 className="animate-spin text-indigo-500" size={32} />
            <Text size="2" color="gray">Analyzing your profile...</Text>
          </Flex>
        )}

        {error && (
          <Callout.Root color="red">
            <Callout.Icon><AlertCircle /></Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        {match && (
          <Box className="space-y-4">
            {isDemo && (
              <Callout.Root color="yellow" size="1">
                <Callout.Text>Demo mode — add GEMINI_API_KEY for real AI analysis</Callout.Text>
              </Callout.Root>
            )}
            <Box>
              <Flex justify="between" mb="1">
                <Text weight="bold">Match Score</Text>
                <Text weight="bold" color="indigo">{match.score}%</Text>
              </Flex>
              <Progress value={match.score} color="indigo" />
            </Box>
            <Text size="2" className="text-text-muted">{match.summary}</Text>
            {match.strengths?.length > 0 && (
              <Box>
                <Text size="2" weight="bold" mb="1">Strengths</Text>
                <ul className="text-sm text-text-muted list-disc pl-4 space-y-1">
                  {match.strengths.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </Box>
            )}
            {match.gaps?.length > 0 && (
              <Box>
                <Text size="2" weight="bold" mb="1">Areas to improve</Text>
                <ul className="text-sm text-text-muted list-disc pl-4 space-y-1">
                  {match.gaps.map((g) => <li key={g}>{g}</li>)}
                </ul>
              </Box>
            )}
            <Flex gap="2" justify="end">
              <Button variant="soft" onClick={() => { setMatch(null); analyze(); }}>
                Re-analyze
              </Button>
              <Dialog.Close><Button>Done</Button></Dialog.Close>
            </Flex>
          </Box>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
