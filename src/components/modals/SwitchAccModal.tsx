"use client";

import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  Text,
  Avatar,
  Box,
  Heading,
  Flex,
  Badge,
} from "@radix-ui/themes";
import { UserContext } from "@/context/UserContext";
import SwitchAccDropD from "../dropdowns/SwitchAccDropD";
import { HeaderContext } from "../headers/headerWrapper";
import { UserPlus, UserRound } from "lucide-react";

export default function SwitchAccModal() {
  const { setUser,user,setIsguest } = useContext(UserContext);
    const headerCtx = useContext(HeaderContext);
  if (!headerCtx) return null;
const {
  setIsSwitchAcc,
  isSwitchAcc,
  usersData,
  setUsersData,
  setIsAddAc
} = headerCtx;
async function handleSwitch(id: string) {
  try {
    const res = await fetch(`/api/switch/${id}`);
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      setTimeout(() => {
        setIsSwitchAcc(false); 
      }, 200); 
    }
  } catch (err) {
    console.log(err);
  }
}
 async function handleguest() {
  const res=await fetch("/api/guest", { method: "GET" });
  if(res){
    setIsguest(true);
    console.log("guest mode on")
    setIsSwitchAcc(false)
  }
 } 
  return (
<Dialog.Root open={isSwitchAcc} onOpenChange={setIsSwitchAcc}>
  <Dialog.Content
    style={{
      maxHeight: "300px",
      maxWidth: "450px",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    }}
  >
 <Box>
      <Flex justify="start">
        <Box className="w-[70%]">
          <Dialog.Title>Switch Account</Dialog.Title>
          <Dialog.Description size="2" mb="3">
            Choose an account to switch
          </Dialog.Description>
        </Box>

        <Box className="w-[25%]">
          <Flex justify="center" gap="4">
            <Box onClick={handleguest} className="p-2  rounded-full relative  flex flex-col items-center">
              <UserRound className="size-7 text-white hover:text-blue-500" />
              <p className="text-blue-500 text-sm mt-1">Guest</p>
            </Box>

            <Box
            onClick={()=>{
              setIsSwitchAcc(false);
              setIsAddAc(true);
            }}
             className="p-2 rounded-full relative flex flex-col items-center cursor-pointer">
              <UserPlus className="size-7 text-white hover:text-green-500" />
              <p className="text-green-400 text-sm mt-1">Add</p>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>

    <Box
      style={{
        overflowY: "auto",
        flexGrow: 1,
        paddingRight: "4px",
      }}
      className="scrollbar-hidden"
    >
      <Flex direction="column" gap="4">
        {usersData && usersData.length > 0 ? (
          usersData.map((userdata, idx) => (
            <Flex
              key={idx}
              className="hover:border-1 px-3 py-1.5 hover:border-gray-500 rounded-md"
              direction="row"
              align="center"
              justify={"between"}
              gap="3"
            >
              <Flex
                onClick={() => {
                  handleSwitch(userdata.id);
                }}
                direction="row"
                align="center"
                gap="3"
              >
                <Avatar
                  size="3"
                  fallback={userdata?.name?.charAt(0).toUpperCase() || "U"}
                  radius="full"
                  src={
                    "https://pbs.twimg.com/profile_images/1337055608613253126/.png"
                  }
                />
                <Box>
                  <Heading size="3" as="h3" color="blue">
                    {userdata?.name || "Unknown"}
                  </Heading>

                  <Text as="div" size="2" color="gray" mb="2">
                    {userdata?.email || "No email found"}
                  </Text>
                </Box>
              </Flex>
              <Flex justify={"start"} gap={"6"} >
                  {(userdata.email==user?.email)&&<Badge color="green">Active</Badge>}
              <SwitchAccDropD id={userdata.id} setUsersData={setUsersData} />
                  </Flex>
            </Flex>
          ))
        ) : (
          <Text size="2" color="gray">
            No users found.
          </Text>
        )}
      </Flex>
    </Box>
  </Dialog.Content>
</Dialog.Root>

  );
}
