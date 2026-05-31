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
} from "@radix-ui/themes";
import { Sparkles, Loader2, AlertCircle, Wand2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

type ImproveData = {
  improvedSummary: string;
  suggestedSkills: string[];
  tips: string[];
};

export default function AIResumeImproveModal({
  isOpen,
  setIsOpen,
  onApplySummary,
  onApplySkills,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onApplySummary?: (summary: string) => void;
  onApplySkills?: (skills: string[]) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ImproveData | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const { toast } = useToast();

  async function improve() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/resume-improve", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setIsDemo(json.isDemo || false);
      } else {
        toast(json.message || "Failed", "error");
      }
    } catch {
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content maxWidth="520px">
        <Flex gap="2" align="center" mb="2">
          <Wand2 size={20} className="text-purple-500" />
          <Dialog.Title>AI Resume Coach</Dialog.Title>
        </Flex>
        <Dialog.Description size="2" mb="3">
          Get AI suggestions to strengthen your profile
        </Dialog.Description>
        <Separator size="4" mb="4" />

        {!data && !loading && (
          <Flex direction="column" align="center" gap="3" py="4">
            <Sparkles size={36} className="text-purple-400" />
            <Button onClick={improve} color="purple">
              Analyze My Profile
            </Button>
          </Flex>
        )}

        {loading && (
          <Flex justify="center" py="6">
            <Loader2 className="animate-spin text-purple-500" size={32} />
          </Flex>
        )}

        {data && (
          <Box className="space-y-4">
            {isDemo && (
              <Callout.Root color="yellow" size="1">
                <Callout.Icon><AlertCircle /></Callout.Icon>
                <Callout.Text>Demo suggestions — set GEMINI_API_KEY for personalized coaching</Callout.Text>
              </Callout.Root>
            )}
            <Box>
              <Text size="2" weight="bold" mb="1">Suggested Summary</Text>
              <Text size="2" className="text-text-muted leading-relaxed">{data.improvedSummary}</Text>
              {onApplySummary && (
                <Button size="1" variant="soft" mt="2" onClick={() => { onApplySummary(data.improvedSummary); toast("Summary applied!", "success"); }}>
                  Apply Summary
                </Button>
              )}
            </Box>
            {data.suggestedSkills?.length > 0 && (
              <Box>
                <Text size="2" weight="bold" mb="1">Suggested Skills</Text>
                <Flex gap="2" wrap="wrap">
                  {data.suggestedSkills.map((s) => (
                    <Text key={s} size="1" className="px-2 py-1 bg-purple-500/10 rounded-full">{s}</Text>
                  ))}
                </Flex>
                {onApplySkills && (
                  <Button size="1" variant="soft" mt="2" onClick={() => { onApplySkills(data.suggestedSkills); toast("Skills added!", "success"); }}>
                    Add Suggested Skills
                  </Button>
                )}
              </Box>
            )}
            {data.tips?.length > 0 && (
              <Box>
                <Text size="2" weight="bold" mb="1">Tips</Text>
                <ul className="text-sm text-text-muted list-disc pl-4 space-y-1">
                  {data.tips.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </Box>
            )}
            <Dialog.Close><Button className="w-full">Done</Button></Dialog.Close>
          </Box>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
