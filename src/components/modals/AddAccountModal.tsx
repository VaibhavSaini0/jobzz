"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { HeaderContext } from "../headers/headerWrapper";
import Portal from "@/components/Portal";

export default function AddAccountModal() {
  const headerCtx = useContext(HeaderContext);
  if (!headerCtx) return null;

  const { setIsAddAc, isAddAc, setSignUpOpen, setUsersData, usersData } = headerCtx;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);

  async function handleSubmit(e: React.FormEvent) {
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
        setUser(data.user);
        setUsersData([...(usersData || []), data.user]);
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

  if (!isAddAc) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
          onClick={() => setIsAddAc(false)}
        />
        {/* Content */}
        <div className="relative w-full max-w-[450px] p-6 bg-card-bg border border-card-border shadow-2xl rounded-2xl animate-in fade-in zoom-in-95 duration-200 z-10 mx-4">
          <h2 className="text-xl font-bold text-foreground">Add Account</h2>
          <p className="text-sm text-text-muted mt-1 mb-4">
            Enter your credentials below
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80 block">Email</label>
              <input
                type="email"
                required
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80 block">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
              />
            </div>

            {message && (
              <span className={`text-xs font-semibold block ${message.includes("success") ? "text-emerald-500" : "text-rose-500"}`}>
                {message}
              </span>
            )}

            <div className="flex flex-row justify-between items-center pt-2 gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setIsAddAc(false);
                  setSignUpOpen(true);
                }}
                className="text-xs font-bold text-indigo-500 hover:text-indigo-600 hover:underline cursor-pointer transition-colors"
              >
                Create a new account
              </button>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddAc(false)}
                  className="cursor-pointer px-4 py-2 text-xs font-bold border border-card-border hover:bg-card-border/30 rounded-xl transition text-text-muted active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                >
                  {!loading ? (
                    "Add"
                  ) : (
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}
