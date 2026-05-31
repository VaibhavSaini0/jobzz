"use client";

import { useContext, useState } from "react";
import { Button, Dialog, TextField, Flex, Text } from "@radix-ui/themes";
import { UserContext } from "@/context/UserContext";
import BtnLoading from "../lodingstate/BtnLoading";
import { useToast } from "@/context/ToastContext";

export default function LoginModal({
  open,
  setOpen,
  setSignUpOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  setSignUpOpen: (val: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const { toast } = useToast();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        toast("Login successful!", "success");
        setUser(data.user);
        setOpen(false);
      } else {
        toast(data.message || "Invalid credentials.", "error");
      }
    } catch (err) {
      toast("Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Login</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Login</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter your credentials below
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text>Email</Text>
            <TextField.Root
              placeholder="xyz@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <Text>Password</Text>
            <TextField.Root
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </Flex>

        <Flex mt="4" justify="end" gap="2">
          <Button onClick={handleSubmit}>
            {!loading ? (
              "Login"
            ) : (
              <BtnLoading />
            )}
          </Button>
        </Flex>
        <Text color="blue" onClick={() => {
          setOpen(false);
          setSignUpOpen(true);
        }} className="cursor-pointer hover:underline">
          Create a new account
        </Text>
      </Dialog.Content>
    </Dialog.Root>
  );
}
