"use client";

import Header from "@/components/headers/header";
import { useEffect, useState } from "react";
import HeaderWrapper from "@/components/headers/headerWrapper";
import { UserContext } from "@/context/UserContext";

type AppUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AppCompany = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
};

export default function UserProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isguest, setIsguest] = useState(false);
  const [company, setCompany] = useState<AppCompany | null>(null);
  const [isuserLoading, setIsuserLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/current-user", { credentials: "include" });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          setCompany(data.company);
        }
      } catch {
        setUser(null);
      } finally {
        setIsuserLoading(false);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function checkGuest() {
      try {
        const res = await fetch("/api/guest");
        const data = await res.json();
        setIsguest(Boolean(data.success));
      } catch {
        setIsguest(false);
      }
    }
    checkGuest();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        company,
        setCompany,
        isguest,
        setIsguest,
        isuserLoading,
        setIsuserLoading,
      }}
    >
      <HeaderWrapper />
      {children}
    </UserContext.Provider>
  );
}
