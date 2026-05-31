"use client";
import {
  Button,
  Dialog,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
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
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          className="flex justify-center items-center border-2"
          color="green"
          size={"3"}
        >
          {isloading ? (
            <BtnLoading />
          ) : (
            <div className="flex gap-3 items-center">
              Applied
              <Check />
            </div>
          )}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title className="text-4xl">
          <Text className="my-2 text-2xl">Withdrawl Application</Text>
        </Dialog.Title>

        <Dialog.Description size="2" mb="4" className="text-2xl">
          Are you sure you want to Withdrawl the application
        </Dialog.Description>

        <Flex gap="7" mt="4" justify="center">
          <Dialog.Close>
            <Button size={"3"} variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleWithdrawl} color="red" size={"3"}>Withdrawal</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
