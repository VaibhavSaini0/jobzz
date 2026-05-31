import {
  Badge,
  Box,
  Button,
  Flex,
  Separator,
  Text,
  TextArea,
} from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import { review, user } from "../../generated/prisma";
import { UserContext } from "@/context/UserContext";
import Loading from "./lodingstate/Loading";
import { useToast } from "@/context/ToastContext";

type ReviewWithUser = review & { user: user };

export default function Compreviews({
  companyId,
  isloading,
}: {
  companyId: string;
  isloading: boolean;
}) {
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const [companyReview, setCompanyReview] = useState<ReviewWithUser[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/review/${companyId}`);
        const data = await res.json();
        if (data.success) setCompanyReview(data.data);
      } catch {
        toast("Failed to fetch reviews.", "error");
      }
    }
    if (companyId) fetchReviews();
  }, [companyId, toast]);

  async function handleclick(e: React.MouseEvent) {
    e.preventDefault();

    if (!user) {
      toast("Please log in to leave a review.", "error");
      return;
    }

    if (!content.trim()) {
      toast("Please write a review first.", "error");
      return;
    }

    try {
      const res = await fetch("/api/review/add", {
        method: "POST",
        body: JSON.stringify({ content, companyId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setCompanyReview([...companyReview, { ...data.data, user }]);
        setContent("");
        toast("Review posted!", "success");
      } else {
        toast(data.message || "Could not post review.", "error");
      }
    } catch {
      toast("Something went wrong.", "error");
    }
  }

  return (
    <Box className="max-w-7xl mx-auto w-full flex flex-col items-end">
      <Flex
        direction="column"
        gap="3"
        mb="5"
        align="end"
        className="w-full sm:w-[70%] lg:w-[50%]"
      >
        <TextArea
          placeholder="Leave a review..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full"
        />
        <Button variant="surface" onClick={handleclick} disabled={!user}>
          Add Review
        </Button>
      </Flex>
      <Separator size="4" className="mb-4" />

      {isloading ? (
        <Loading />
      ) : companyReview?.length > 0 ? (
        <div className="flex flex-col gap-4 w-full sm:w-[70%] lg:w-[50%]">
          {companyReview.map((rev) => (
            <div
              key={rev.id}
              className="relative bg-card-bg border border-card-border rounded-2xl shadow-sm p-4"
            >
              <Badge color="green" className="rounded-xl mb-2">
                {rev.user?.name ?? "Anonymous"}
              </Badge>
              <Text size="2" className="text-text-muted leading-relaxed">
                {rev.content}
              </Text>
            </div>
          ))}
        </div>
      ) : (
        <Text size="2" color="gray">
          No reviews yet.
        </Text>
      )}
    </Box>
  );
}
