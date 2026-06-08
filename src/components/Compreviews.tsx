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
    <div className="max-w-7xl mx-auto w-full flex flex-col items-end">
      <div className="w-full sm:w-[70%] lg:w-[50%] flex flex-col gap-3 mb-5 items-end">
        <textarea
          placeholder="Leave a review..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm resize-none"
        />
        <button
          onClick={handleclick}
          disabled={!user}
          className="cursor-pointer px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition active:scale-[0.98] disabled:opacity-50"
        >
          Add Review
        </button>
      </div>
      <hr className="border-card-border mb-4 w-full" />

      {isloading ? (
        <Loading />
      ) : companyReview?.length > 0 ? (
        <div className="flex flex-col gap-4 w-full sm:w-[70%] lg:w-[50%] text-left">
          {companyReview.map((rev) => (
            <div
              key={rev.id}
              className="relative bg-card-bg border border-card-border rounded-2xl shadow-sm p-4"
            >
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 mb-2">
                {rev.user?.name ?? "Anonymous"}
              </span>
              <p className="text-sm text-text-muted leading-relaxed">
                {rev.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <span className="text-sm text-text-muted w-full text-center py-4 block">
          No reviews yet.
        </span>
      )}
    </div>
  );
}
