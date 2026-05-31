"use client";

import { useState } from "react";
import {
  Dialog,
  Button,
  Flex,
  Text,
  Box,
  Heading,
  Separator,
  Callout,
} from "@radix-ui/themes";
import { Sparkles, Copy, Check, Loader2, FileText, AlertCircle } from "lucide-react";

export default function AICoverLetterModal({
  job,
  isOpen,
  setIsOpen,
}: {
  job: any;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  async function generateCoverLetter() {
    setLoading(true);
    setError(null);
    setCoverLetter(null);
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id }),
      });
      const data = await res.json();
      if (data.success) {
        setCoverLetter(data.data);
        setIsDemo(data.isDemo || false);
      } else {
        setError(data.message || "Failed to generate cover letter.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content
        maxWidth="600px"
        style={{
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        }}
      >
        <Flex gap="3" align="center" className="mb-2">
          <Box className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg text-blue-600 dark:text-blue-400">
            <Sparkles size={24} />
          </Box>
          <Box>
            <Dialog.Title className="m-0">AI Cover Letter Generator</Dialog.Title>
            <Dialog.Description size="2">
              Generate a tailored cover letter for **{job.title}** at **{job.company.name}**
            </Dialog.Description>
          </Box>
        </Flex>

        <Separator size="4" className="my-4" />

        {/* Action / State Area */}
        <Box className="min-h-[250px] flex flex-col justify-center">
          {!loading && !coverLetter && !error && (
            <Flex direction="column" align="center" gap="4" py="6" className="text-center">
              <FileText size={48} className="text-gray-400 animate-pulse" />
              <Box maxWidth="400px">
                <Text size="3" color="gray" as="p">
                  Our Career AI will analyze your skills, experience, and the target job description to draft a high-impact cover letter.
                </Text>
              </Box>
              <Button
                size="3"
                color="blue"
                className="cursor-pointer"
                onClick={generateCoverLetter}
              >
                <Sparkles size={16} /> Draft My Cover Letter
              </Button>
            </Flex>
          )}

          {loading && (
            <Flex direction="column" align="center" gap="3" py="8">
              <Loader2 size={40} className="animate-spin text-blue-600" />
              <Text size="3" className="font-medium text-blue-600 animate-pulse">
                Analyzing resume and drafting cover letter...
              </Text>
            </Flex>
          )}

          {error && (
            <Callout.Root color="red" role="alert" className="my-4">
              <Callout.Icon>
                <AlertCircle />
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          {coverLetter && (
            <Box className="space-y-4">
              {isDemo && (
                <Callout.Root color="yellow" className="mb-3">
                  <Callout.Icon>
                    <AlertCircle />
                  </Callout.Icon>
                  <Callout.Text>
                    <strong>Demo Mode Active:</strong> Add `GEMINI_API_KEY` to your `.env` file to experience real-time Gemini AI tailoring!
                  </Callout.Text>
                </Callout.Root>
              )}

              <Box
                style={{
                  maxHeight: "350px",
                  overflowY: "auto",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid var(--gray-5)",
                  backgroundColor: "var(--gray-2)",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "pre-line",
                }}
                className="text-sm leading-relaxed text-gray-800 dark:text-gray-200"
              >
                {coverLetter}
              </Box>

              <Flex justify="between" align="center">
                <Button variant="outline" color="gray" onClick={() => setCoverLetter(null)}>
                  Regenerate
                </Button>
                <Flex gap="3">
                  <Button
                    variant="soft"
                    color={copied ? "green" : "blue"}
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <Check size={16} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copy to Clipboard
                      </>
                    )}
                  </Button>
                  <Dialog.Close>
                    <Button color="blue">Done</Button>
                  </Dialog.Close>
                </Flex>
              </Flex>
            </Box>
          )}
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
