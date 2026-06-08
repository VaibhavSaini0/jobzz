"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import { ROLES } from "@/lib/roles";
import Portal from "@/components/Portal";

export default function SignupModal({
  signUpOpen,
  setOpen,
  setSignUpOpen,
}: {
  signUpOpen: boolean;
  setOpen: (val: boolean) => void;
  setSignUpOpen: (val: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>(ROLES.CANDIDATE);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        toast("Signup successful!", "success");
        setSignUpOpen(false);
      } else {
        toast(data.message || "Signup failed.", "error");
      }
    } catch {
      toast("Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  }

  if (!signUpOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
          onClick={() => setSignUpOpen(false)}
        />
        {/* Content */}
        <div className="relative w-full max-w-[450px] p-6 bg-card-bg border border-card-border shadow-2xl rounded-2xl animate-in fade-in zoom-in-95 duration-200 z-10 mx-4">
          <h2 className="text-xl font-bold text-foreground">Create your account</h2>
          <p className="text-sm text-text-muted mt-1 mb-4">
            Join Jobzz as a candidate or employer
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80 block">Name</label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80 block">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
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
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
              />
            </div>

            <div className="flex items-center gap-4 py-1">
              <span className="text-xs font-semibold text-foreground/80">I am a</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-[180px] px-3 py-1.5 bg-input-bg border border-card-border rounded-xl text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                <option value={ROLES.CANDIDATE}>Job Seeker</option>
                <option value={ROLES.EMPLOYER}>Employer</option>
              </select>
            </div>

            <div className="flex flex-row justify-between items-center pt-2 gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setSignUpOpen(false);
                  setOpen(true);
                }}
                className="text-xs font-bold text-indigo-500 hover:text-indigo-600 hover:underline cursor-pointer transition-colors"
              >
                Already have an account? Log in
              </button>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSignUpOpen(false)}
                  className="cursor-pointer px-4 py-2 text-xs font-bold border border-card-border hover:bg-card-border/30 rounded-xl transition text-text-muted active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Sign up"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}
