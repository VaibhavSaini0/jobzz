"use client";
import { Button, ThickChevronRightIcon } from "@radix-ui/themes";
import { useState } from "react";
import BtnLoading from "./lodingstate/BtnLoading";
import { useToast } from "@/context/ToastContext";

export default function JobApplyBtn({
  job,
  setIsApplied,
}: {
  job: any;
  isApplied: boolean;
  setIsApplied: (value: boolean) => void;
}) {
  const [isloading, setIsloading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit() {
    setIsloading(true);
    try {
      const res = await fetch("/api/job/apply/" + job?.id, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        toast("Applied Successfully.", "success");
        setIsApplied(true);
      } else if (data.message === "The user already applied for this job") {
        toast("You have already applied for this job.", "info");
        setIsApplied(true);
      } else {
        toast(data.message || "Failed to apply", "error");
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong.", "error");
    } finally {
      setIsloading(false);
    }
  }

  return (
    <Button
      className="flex justify-center items-center border-2"
      color="green"
      size="3"
      onClick={handleSubmit}
    >
      {isloading ? (
        <BtnLoading />
      ) : (
        <div className="flex gap-3 items-center">
          Apply
          <ThickChevronRightIcon />
        </div>
      )}
    </Button>
  );
}
