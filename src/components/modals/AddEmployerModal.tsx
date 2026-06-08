"use client";

import { useState, useEffect } from "react";
import { UserPlus, X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

type AddEmployerModalProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onSuccess: () => void;
};

export default function AddEmployerModal({
  isOpen,
  setIsOpen,
  onSuccess,
}: AddEmployerModalProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast("Name is required", "error");
      return;
    }
    if (!email.trim()) {
      toast("Email is required", "error");
      return;
    }
    if (!password.trim()) {
      toast("Password is required", "error");
      return;
    }
    if (password.length < 6) {
      toast("Password must be at least 6 characters", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/company/employers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast(data.message || "Employer added successfully!", "success");
        onSuccess();
        setIsOpen(false);
      } else {
        toast(data.message || "Failed to add employer", "error");
      }
    } catch {
      toast("Error adding employer", "error");
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      {/* Content */}
      <div className="relative w-full max-w-[460px] p-6 bg-card-bg border border-card-border shadow-2xl rounded-2xl animate-in fade-in zoom-in-95 duration-200 z-10 mx-4 text-left text-foreground">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-foreground m-0">
              Add Recruiter Teammate
            </h2>
            <span className="text-xs text-text-muted mt-1.5 block leading-relaxed">
              Grant backend recruiter permissions to another employee.
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer p-1.5 rounded-full hover:bg-card-border/40 transition-colors text-text-muted hover:text-foreground active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleAdd} className="space-y-4">
          {/* Teammate Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
            />
          </div>

          {/* Teammate Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              Teammate Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
            />
          </div>

          {/* Teammate Temporary Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              Temporary Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              placeholder="Must be at least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-6 border-t border-card-border/50 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={saving}
              className="cursor-pointer rounded-xl font-semibold border border-card-border px-4 py-2 text-xs hover:bg-card-border/40 transition-colors text-text-muted active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md px-4 py-2 text-xs flex items-center gap-1.5 transition active:scale-[0.98] disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin mr-1" />
                  Adding...
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  Add Recruiter
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
