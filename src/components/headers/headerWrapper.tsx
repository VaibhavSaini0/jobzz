"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import Header from "./header";
import { user } from "../../../generated/prisma";

// Define the shape of context
interface HeaderContextType {
  open: boolean;
  setOpen: (val: boolean) => void;
  signUpOpen: boolean;
  setSignUpOpen: (val: boolean) => void;
  isServiceOpen: boolean;
  setIsServiceOpen: (val: boolean) => void;
  isAddAc: boolean;
  setIsAddAc: (val: boolean) => void;
  isSwitchAcc: boolean;
  setIsSwitchAcc: (val: boolean) => void;
  usersData: user[] | null;
  setUsersData: (val: user[] | null) => void;
}

export const HeaderContext = createContext<HeaderContextType | null>(null);
export default function HeaderWrapper() {
  const [open, setOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isAddAc, setIsAddAc] = useState(false);
  const [isSwitchAcc, setIsSwitchAcc] = useState(false);
const [usersData, setUsersData] = useState<user[] | null>(null);
  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      signUpOpen,
      setSignUpOpen,
      isServiceOpen,
      setIsServiceOpen,
      isAddAc,
      setIsAddAc,
      isSwitchAcc,
      setIsSwitchAcc,
      usersData,
      setUsersData,
    }),
    [open, signUpOpen, isServiceOpen, isAddAc, isSwitchAcc, usersData]
  );

  useEffect(() => {
    async function fetchUsers() {
      // console.log("hello");
      try {
        const res = await fetch("/api/switch", {
          method: "GET",
        });

        const data = await res.json();
        // console.log("data", data);
        if (data?.success && Array.isArray(data.users)) {
          // console.log(data.users)
          setUsersData(data.users);
          // console.log(data.users);
        } else {
          console.warn("No users returned");
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    }
    fetchUsers();
  }, []);
  return (
    <HeaderContext.Provider value={contextValue}>
      <Header />
    </HeaderContext.Provider>
  );
}
