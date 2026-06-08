"use client";

import { UserContext } from "@/context/UserContext";
import { logout } from "@/HelperFun/logout";
import {
  Building2,
  ChevronRight,
  LogOut,
  User,
  UserPen,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
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

  async function handleLogOut(e: React.MouseEvent) {
    e.preventDefault();
    await logout();
    setUser(null);
    setIsServiceOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsServiceOpen(!isServiceOpen)}
        className="cursor-pointer focus:outline-none flex items-center"
      >
        <div className="w-9 h-9 flex items-center justify-center bg-indigo-500 text-white font-extrabold rounded-full shrink-0 shadow-md hover:scale-105 active:scale-95 transition">
          {typeof user?.name === "string" ? user.name[0].toUpperCase() : "U"}
        </div>
      </button>

      {isServiceOpen && (
        <>
          {/* Click-away overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsServiceOpen(false)}
          />
          {/* Popover content card */}
          <div className="absolute right-0 mt-2.5 w-60 p-4 bg-card-bg border border-card-border shadow-2xl rounded-2xl animate-in fade-in slide-in-from-top-3 duration-200 z-50 text-left text-foreground">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-indigo-soft/15 text-indigo-500 font-extrabold rounded-full shrink-0 shadow-sm">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-foreground truncate">
                  {user?.name || "Unknown"}
                </h3>
                <span className="text-xs text-text-muted truncate block mt-0.5">
                  {user?.email || "No email found"}
                </span>
              </div>
            </div>

            <hr className="border-card-border/50 my-3" />

            <div className="space-y-1">
              {user && (
                <>
                  <Link href="/profile" onClick={() => setIsServiceOpen(false)}>
                    <div className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-card-border/30 text-indigo-500 hover:text-indigo-600 font-bold text-xs transition cursor-pointer active:scale-98">
                      <div className="flex items-center gap-2.5">
                        <User size={14} />
                        User Profile
                      </div>
                      <ChevronRight size={14} className="text-indigo-400" />
                    </div>
                  </Link>

                  {user?.role === "admin" && (
                    <Link href="/company/profile" onClick={() => setIsServiceOpen(false)}>
                      <div className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-card-border/30 text-indigo-500 hover:text-indigo-600 font-bold text-xs transition cursor-pointer active:scale-98">
                        <div className="flex items-center gap-2.5">
                          <Building2 size={14} />
                          Company Profile
                        </div>
                        <ChevronRight size={14} className="text-indigo-400" />
                      </div>
                    </Link>
                  )}

                  <Link href="/profile" onClick={() => setIsServiceOpen(false)}>
                    <div className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-card-border/30 text-indigo-500 hover:text-indigo-600 font-bold text-xs transition cursor-pointer active:scale-98">
                      <div className="flex items-center gap-2.5">
                        <UserPen size={14} />
                        Edit Profile
                      </div>
                      <ChevronRight size={14} className="text-indigo-400" />
                    </div>
                  </Link>
                </>
              )}

              {user && (
                <>
                  <div
                    onClick={() => {
                      setIsServiceOpen(false);
                      setIsSwitchAcc(true);
                    }}
                    className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-card-border/30 text-indigo-500 hover:text-indigo-600 font-bold text-xs transition cursor-pointer active:scale-98"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users size={14} />
                      Switch Profile
                    </div>
                    <ChevronRight size={14} className="text-indigo-400" />
                  </div>

                  <div
                    onClick={() => {
                      setIsServiceOpen(false);
                      setIsAddAc(true);
                    }}
                    className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-card-border/30 text-indigo-500 hover:text-indigo-600 font-bold text-xs transition cursor-pointer active:scale-98"
                  >
                    <div className="flex items-center gap-2.5">
                      <UserPlus size={14} />
                      Add account
                    </div>
                    <ChevronRight size={14} className="text-indigo-400" />
                  </div>

                  <div
                    onClick={handleLogOut}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-500/10 text-rose-500 hover:text-rose-600 font-bold text-xs transition cursor-pointer active:scale-98"
                  >
                    <LogOut size={14} />
                    Log out
                  </div>
                </>
              )}

              {!user && (
                <>
                  <div
                    onClick={() => {
                      setIsServiceOpen(false);
                      setOpen(true);
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-card-border/30 text-indigo-500 hover:text-indigo-600 font-bold text-xs transition cursor-pointer active:scale-98"
                  >
                    <LogOut size={14} />
                    Log in
                  </div>
                  <div
                    onClick={() => {
                      setIsServiceOpen(false);
                      setSignUpOpen(true);
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-card-border/30 text-indigo-500 hover:text-indigo-600 font-bold text-xs transition cursor-pointer active:scale-98"
                  >
                    <LogOut size={14} />
                    Sign up
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <AddAccountModal />
      {isSwitchAcc && <SwitchAccModal />}
    </div>
  );
}
