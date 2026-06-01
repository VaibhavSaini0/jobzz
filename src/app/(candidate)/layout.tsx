"use client";

import { useEffect, useState } from "react";
import HeaderWrapper from "@/components/headers/headerWrapper";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/lodingstate/Loading";

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

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isguest, setIsguest] = useState(false);
  const [company, setCompany] = useState<AppCompany | null>(null);
  const [isuserLoading, setIsuserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/current-user");
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          setCompany(data.company);
          if (data.user.role === "admin") {
            router.push("/profile");
          }
        } else {
          router.push("/");
        }
      } catch {
        setUser(null);
        router.push("/");
      } finally {
        setIsuserLoading(false);
      }
    }
    getUser();
  }, [router]);

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

  if (isuserLoading) {
    return <Loading />;
  }

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
