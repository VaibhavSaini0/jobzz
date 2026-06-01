"use client";
import { UserContext } from "@/context/UserContext";
import { logout } from "@/HelperFun/logout";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  Separator,
  Text,
} from "@radix-ui/themes";
import {
  Building2,
  ChevronRight,
  LogOut,
  User,
  UserCircleIcon,
  UserPen,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import AddAccountModal from "./AddAccountModal";
import SwitchAccModal from "./SwitchAccModal";
import { HeaderContext } from "../headers/headerWrapper";

export default function UserServices() {
  const headerCtx = useContext(HeaderContext);
  if (!headerCtx) return null;
  const {
    setIsServiceOpen,
    setOpen,
    isServiceOpen,
    setIsSwitchAcc,
    setIsAddAc,
    setSignUpOpen,
    isSwitchAcc,
  } = headerCtx;
  const { user, setUser }: { user: any; setUser: (val: any) => void } =
    useContext(UserContext);

  async function handleLogOut(e: any) {
    e.preventDefault();
    await logout();
    setUser(null);
    setIsServiceOpen(false);
    setIsSwitchAcc(true);
  }

  return (
    <div>
      <Popover.Root open={isServiceOpen} onOpenChange={setIsServiceOpen}>
        <Popover.Trigger>
          <button onClick={() => setIsServiceOpen(!isServiceOpen)}>
            <Avatar
              size="3"
              fallback={
                typeof user?.name === "string"
                  ? user.name[0].toUpperCase()
                  : "U"
              }
              radius="full"
            />{" "}
          </button>
        </Popover.Trigger>

        <Popover.Content
          maxWidth="230px"
          style={{
            backgroundColor: "var(--blue-2)",
            border: "1px solid var(--blue-5)",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Flex gap="4">
            <Avatar
              size="3"
              fallback={user?.name?.charAt(0).toUpperCase() || "U"}
              radius="full"
            />
            <Box>
              <Heading size="3" as="h3" color="blue">
                {user?.name || "Unknown"}
              </Heading>
              <Text as="div" size="2" color="gray" mb="2">
                {user?.email || "No email found"}
              </Text>
            </Box>
          </Flex>

          <Separator my="3" size="4" />

          <Box>
            {user && (
              <div>
                <Link href={"/profile"}>
                  <Flex
                    className="hover:border-1 box-border px-3 py-1.5 hover:border-gray-500 rounded-md"
                    justify="between"
                    align="center"
                  >
                    <Text as="div" size="2" color="blue">
                      <Flex gap="3" align="center">
                        <User />
                        User Profile
                      </Flex>
                    </Text>
                    <ChevronRight className="text-[#1eadf5]" />
                  </Flex>
                </Link>

                {user?.role === "admin" && (
                  <Link href={"/company/profile"}>
                    <Flex
                      className="hover:border-1 box-content px-3 py-1.5 hover:border-gray-500 rounded-md"
                      justify="between"
                      align="center"
                    >
                      <Text as="div" size="2" color="blue">
                        <Flex gap="3" align="center">
                          <Building2 />
                          Company Profile
                        </Flex>
                      </Text>
                      <ChevronRight className="text-[#1eadf5]" />
                    </Flex>
                  </Link>
                )}

                <Link href={"/profile"}>
                  <Flex
                    className="hover:border-1 px-3 py-1.5 hover:border-gray-500 rounded-md"
                    justify="between"
                    align="center"
                  >
                    <Text as="div" size="2" color="blue">
                      <Flex gap="3" align="center">
                        <UserPen />
                        Edit Profile
                      </Flex>
                    </Text>
                    <ChevronRight className="text-[#1eadf5]" />
                  </Flex>
                </Link>
              </div>
            )}
            {user && (
              <div>
                <Flex
                  onClick={() => {
                    setIsSwitchAcc(true);
                  }}
                  className="hover:border-1 px-3 py-1.5 hover:border-gray-500 rounded-md"
                  justify="between"
                  align="center"
                >
                  <Text as="div" size="2" color="blue">
                    <Flex gap="3" align="center">
                      <Users />
                      Switch Profile
                    </Flex>
                  </Text>
                  <ChevronRight className="text-[#1eadf5]" />
                </Flex>

                <Flex
                  onClick={() => {
                    setIsAddAc(true);
                  }}
                  className="hover:border-1 px-3 py-1.5 hover:border-gray-500 rounded-md"
                  justify="between"
                  align="center"
                >
                  <Text as="div" size="2" color="blue">
                    <Flex gap="3" align="center">
                      <UserPlus />
                      Add account
                    </Flex>
                  </Text>
                  <ChevronRight className="text-[#1eadf5]" />
                </Flex>

                <Flex
                  onClick={handleLogOut}
                  className="hover:border-1 px-3 py-1.5 hover:border-gray-500 rounded-md"
                  justify="start"
                  align="center"
                >
                  <Text as="div" size="2" color="red">
                    <Flex gap="3" align="center">
                      <LogOut />
                      Log out
                    </Flex>
                  </Text>
                </Flex>
              </div>
            )}
            {!user && (
              <div>
                <Flex
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="hover:border-1 px-3 py-1.5 hover:border-gray-500 rounded-md"
                  justify="start"
                  align="center"
                >
                  <Text as="div" size="2" color="blue">
                    <Flex gap="3" align="center">
                      <LogOut />
                      Log in
                    </Flex>
                  </Text>
                </Flex>
                <Flex
                  onClick={() => {
                    setSignUpOpen(true);
                  }}
                  className="hover:border-1 px-3 py-1.5 hover:border-gray-500 rounded-md"
                  justify="start"
                  align="center"
                >
                  <Text as="div" size="2" color="blue">
                    <Flex gap="3" align="center">
                      <LogOut />
                      Sign up
                    </Flex>
                  </Text>
                </Flex>
              </div>
            )}
          </Box>
        </Popover.Content>
      </Popover.Root>
      <AddAccountModal />
      {isSwitchAcc && <SwitchAccModal />}
    </div>
  );
}
