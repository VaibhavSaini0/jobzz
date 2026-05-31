"use client";

import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  TextField,
  Flex,
  Text,
  Select,
} from "@radix-ui/themes";
import { UserContext } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import { ROLES } from "@/lib/roles";

export default function SignupModal({
  signUpOpen,
  setOpen,
  setSignUpOpen,
}: {
  signUpOpen: boolean;
  setOpen: (val: boolean) => void;
  setSignUpOpen: (val: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>(ROLES.CANDIDATE);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        toast("Signup successful!", "success");
        setSignUpOpen(false);
      } else {
        toast(data.message || "Signup failed.", "error");
      }
    } catch {
      toast("Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={signUpOpen} onOpenChange={setSignUpOpen}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create your account</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Join Jobzz as a candidate or employer
        </Dialog.Description>
        <Flex direction="column" gap="3">
          <label>
            <Text>Name</Text>
            <TextField.Root
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            <Text>Email</Text>
            <TextField.Root
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <Text>Password</Text>
            <TextField.Root
              type="password"
              value={password}
              placeholder="Min. 6 characters"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            <Flex gap="6" align="center">
              <Text>I am a</Text>
              <Select.Root value={role} onValueChange={setRole}>
                <Select.Trigger style={{ width: "180px" }} />
                <Select.Content>
                  <Select.Item value={ROLES.CANDIDATE}>Job Seeker</Select.Item>
                  <Select.Item value={ROLES.EMPLOYER}>Employer</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
          </label>
        </Flex>
        <Flex mt="4" justify="end" gap="3">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </Button>
        </Flex>
        <Text
          color="blue"
          onClick={() => {
            setSignUpOpen(false);
            setOpen(true);
          }}
          className="cursor-pointer hover:underline mt-3 block"
        >
          Already have an account? Log in
        </Text>
      </Dialog.Content>
    </Dialog.Root>
  );
}
