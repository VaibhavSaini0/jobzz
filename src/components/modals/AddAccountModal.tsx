//@ts-nocheck
"use client";
import { useContext, useState } from "react";
import { Button, Dialog, TextField, Flex, Text } from "@radix-ui/themes";
import { UserContext } from "@/context/UserContext";
import { HeaderContext } from "../headers/headerWrapper";

export default function AddAccountModal()
 {
    const headerCtx = useContext(HeaderContext);
  if (!headerCtx) return null;
  const { setIsAddAc, isAddAc,setSignUpOpen,setUsersData } = headerCtx;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {setUser}=useContext(UserContext)
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        
        setUser(data.user)
setUsersData((prev) => [...(prev || []), data.user]);
        setTimeout(() => {
          setIsAddAc(false); // Close after short delay
        }, 800);
      } else {
        setMessage(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={isAddAc} onOpenChange={setIsAddAc}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Account</Dialog.Title>
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

        {message && (
          <Text mt="2" color={message.includes("success") ? "green" : "red"}>
            {message}
          </Text>
        )}

        <Flex mt="4" justify="end" gap="2">
          <Button onClick={handleSubmit}>
            {!loading ? (
              "Add"
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <circle cx="18" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin=".67"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  ></animate>
                </circle>
                <circle cx="12" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin=".33"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  ></animate>
                </circle>
                <circle cx="6" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin="0"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  ></animate>
                </circle>
              </svg>
            )}
          </Button>
        </Flex>
            <Text color="blue" onClick={() => {
  setIsAddAc(false);
  setSignUpOpen(true);
}} className="cursor-pointer hover:underline">
  Create a new account
</Text>

      </Dialog.Content>
    </Dialog.Root>
  );
}
