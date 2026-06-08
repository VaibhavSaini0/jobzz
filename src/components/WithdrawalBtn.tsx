"use client";

import { Check } from "lucide-react";
import BtnLoading from "./lodingstate/BtnLoading";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

export default function WithdrawlBtn({
  job,
  setIsApplied,
}: {
  job: any;
  isApplied: boolean;
  setIsApplied: (value: boolean) => void;
}) {
  const [isloading, setIsloading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toast } = useToast();

  async function handleWithdrawl() {
    setIsloading(true);
    try {
      const res = await fetch(`/api/job/withdrawal/${job?.id}`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setIsApplied(false);
        toast("Withdrawal successful.", "success");
        setIsOpen(false);
      } else {
        toast(data.message || "Something went wrong", "error");
      }
    } catch (error) {
      toast("Something went wrong", "error");
    } finally {
      setIsloading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex items-center justify-center gap-2 border border-emerald-500/30 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition active:scale-[0.98]"
      >
        {isloading ? (
          <BtnLoading />
        ) : (
          <>
            Applied
            <Check size={16} />
          </>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          {/* Content */}
          <div className="relative w-full max-w-[450px] p-6 bg-card-bg border border-card-border shadow-2xl rounded-2xl animate-in fade-in zoom-in-95 duration-200 z-10 mx-4 text-left">
            <h2 className="text-xl font-bold text-foreground">Withdraw Application</h2>
            <p className="text-sm text-text-muted mt-2 mb-6">
              Are you sure you want to withdraw your application for this position? This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer px-4 py-2 text-xs font-bold border border-card-border hover:bg-card-border/30 rounded-xl transition text-text-muted active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdrawl}
                disabled={isloading}
                className="cursor-pointer px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition active:scale-[0.98]"
              >
                Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
