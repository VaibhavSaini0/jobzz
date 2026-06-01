"use client";

import {
  Dialog,
  Text,
  Box,
  Heading,
  Flex,
  Button,
  TextField,
} from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { UserPlus, X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

type AddEmployerModalProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onSuccess: () => void;
};

export default function AddEmployerModal({
  isOpen,
  setIsOpen,
  onSuccess,
}: AddEmployerModalProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  async function handleAdd() {
    if (!name.trim()) {
      toast("Name is required", "error");
      return;
    }
    if (!email.trim()) {
      toast("Email is required", "error");
      return;
    }
    if (!password.trim()) {
      toast("Password is required", "error");
      return;
    }
    if (password.length < 6) {
      toast("Password must be at least 6 characters", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/company/employers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast(data.message || "Employer added successfully!", "success");
        onSuccess();
        setIsOpen(false);
      } else {
        toast(data.message || "Failed to add employer", "error");
      }
    } catch {
      toast("Error adding employer", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="max-w-[460px] bg-card-bg border border-card-border shadow-2xl rounded-2xl p-6 text-foreground">
        
        {/* Header */}
        <Flex justify="between" align="center" mb="4">
          <Box>
            <Dialog.Title size="5" className="text-foreground font-extrabold tracking-tight m-0">
              Add Recruiter Teammate
            </Dialog.Title>
            <Dialog.Description size="1" className="text-text-muted mt-1.5 block">
              Grant backend recruiter permissions to another employee.
            </Dialog.Description>
          </Box>
          <Button
            variant="ghost"
            color="gray"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer p-1 rounded-full hover:bg-card-border/40 transition-colors"
          >
            <X size={18} />
          </Button>
        </Flex>

        <Box className="space-y-4 pr-1">
          {/* Teammate Name */}
          <Box className="space-y-1.5">
            <Text size="1" className="font-bold text-foreground block">
              Full Name <span className="text-red-500">*</span>
            </Text>
            <TextField.Root
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border border-card-border/60 rounded-xl"
            />
          </Box>

          {/* Teammate Email */}
          <Box className="space-y-1.5">
            <Text size="1" className="font-bold text-foreground block">
              Teammate Email Address <span className="text-red-500">*</span>
            </Text>
            <TextField.Root
              type="email"
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border border-card-border/60 rounded-xl"
            />
          </Box>

          {/* Teammate Temporary Password */}
          <Box className="space-y-1.5">
            <Text size="1" className="font-bold text-foreground block">
              Temporary Password <span className="text-red-500">*</span>
            </Text>
            <TextField.Root
              type="password"
              placeholder="Must be at least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border border-card-border/60 rounded-xl"
            />
          </Box>
        </Box>

        {/* Footer Actions */}
        <Flex justify="end" gap="3" mt="6" className="border-t border-card-border/50 pt-4">
          <Button
            variant="soft"
            color="gray"
            onClick={() => setIsOpen(false)}
            disabled={saving}
            className="cursor-pointer rounded-xl font-semibold shadow-sm px-4 py-2 hover:bg-card-border/40 transition-colors"
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="indigo"
            onClick={handleAdd}
            disabled={saving}
            className="cursor-pointer rounded-xl font-semibold shadow-md px-4 py-2 flex items-center gap-1.5 hover:bg-indigo-700 transition"
          >
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin mr-1" />
                Adding...
              </>
            ) : (
              <>
                <UserPlus size={14} />
                Add Recruiter
              </>
            )}
          </Button>
        </Flex>

      </Dialog.Content>
    </Dialog.Root>
  );
}
