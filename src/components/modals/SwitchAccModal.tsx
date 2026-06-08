"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import SwitchAccDropD from "../dropdowns/SwitchAccDropD";
import { HeaderContext } from "../headers/headerWrapper";
import { UserPlus, UserRound } from "lucide-react";
import Portal from "@/components/Portal";

export default function SwitchAccModal() {
  const { setUser, user, setIsguest } = useContext(UserContext);
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
    try {
      const res = await fetch("/api/guest/add", { method: "GET" });
      const data = await res.json();
      if (data.success) {
        setIsguest(true);
        console.log("guest mode on");
        setIsSwitchAcc(false);
      }
    } catch (err) {
      console.error("Guest mode activation error:", err);
    }
  }

  if (!isSwitchAcc) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
          onClick={() => setIsSwitchAcc(false)}
        />
        
        {/* Content */}
        <div className="relative w-full max-w-[450px] h-[360px] p-5 bg-card-bg border border-card-border shadow-2xl rounded-2xl animate-in fade-in zoom-in-95 duration-200 z-10 mx-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-[70%]">
                <h2 className="text-xl font-bold text-foreground">Switch Account</h2>
                <p className="text-sm text-text-muted mt-1">
                  Choose an account to switch
                </p>
              </div>

              <div className="w-[25%] flex justify-end gap-3.5">
                <div
                  onClick={handleguest}
                  className="p-1.5 rounded-xl hover:bg-card-border/30 flex flex-col items-center cursor-pointer transition active:scale-95"
                  title="Guest Mode"
                >
                  <UserRound className="w-5 h-5 text-indigo-500" />
                  <span className="text-[10px] text-indigo-500 font-bold mt-1">Guest</span>
                </div>

                <div
                  onClick={() => {
                    setIsSwitchAcc(false);
                    setIsAddAc(true);
                  }}
                  className="p-1.5 rounded-xl hover:bg-card-border/30 flex flex-col items-center cursor-pointer transition active:scale-95"
                  title="Add Account"
                >
                  <UserPlus className="w-5 h-5 text-emerald-500" />
                  <span className="text-[10px] text-emerald-500 font-bold mt-1">Add</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hidden pr-1 space-y-3">
            {usersData && usersData.length > 0 ? (
              usersData.map((userdata, idx) => (
                <div
                  key={idx}
                  className="border border-card-border/50 px-3 py-2 rounded-xl hover:border-indigo-500/30 bg-card-bg/40 hover:bg-indigo-500/5 flex items-center justify-between gap-3 transition"
                >
                  <div
                    onClick={() => {
                      handleSwitch(userdata.id);
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  >
                    <div className="w-9 h-9 flex items-center justify-center bg-indigo-soft/10 text-indigo-500 font-extrabold rounded-full shrink-0 shadow-sm">
                      {userdata?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-foreground truncate">
                        {userdata?.name || "Unknown"}
                      </h3>
                      <span className="text-xs text-text-muted truncate block mt-0.5">
                        {userdata?.email || "No email found"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    {userdata.email === user?.email && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                        Active
                      </span>
                    )}
                    <SwitchAccDropD id={userdata.id} setUsersData={setUsersData} />
                  </div>
                </div>
              ))
            ) : (
              <span className="text-sm text-text-muted">No users found.</span>
            )}
          </div>

          <div className="flex justify-end pt-3 border-t border-card-border/50">
            <button
              onClick={() => setIsSwitchAcc(false)}
              className="cursor-pointer px-4 py-2 text-xs font-bold border border-card-border hover:bg-card-border/30 rounded-xl transition text-text-muted active:scale-[0.98]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
