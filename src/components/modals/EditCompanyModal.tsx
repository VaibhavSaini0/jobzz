"use client";

import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

type EditCompanyModalProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  companyId: string;
  initialData: {
    name: string;
    description: string;
    website: string;
    location: string;
    logoUrl: string;
    industry: string;
    companySize: string;
    founded: string;
    phone: string;
    email: string;
  };
  onSaveSuccess: () => void;
};

export default function EditCompanyModal({
  isOpen,
  setIsOpen,
  companyId,
  initialData,
  onSaveSuccess,
}: EditCompanyModalProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [founded, setFounded] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // DB lookup states
  const [dbIndustries, setDbIndustries] = useState<string[]>([]);
  const [dbSizes, setDbSizes] = useState<string[]>([]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const res = await fetch("/api/static-options");
        const data = await res.json();
        if (data.success && data.data) {
          setDbIndustries(data.data.industry || []);
          setDbSizes(data.data.size || []);
        }
      } catch (err) {
        console.error("Failed to load options:", err);
      }
    }
    if (isOpen) {
      loadOptions();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setWebsite(initialData.website || "");
      setLocation(initialData.location || "");
      setLogoUrl(initialData.logoUrl || "");
      setIndustry(initialData.industry || "");
      setCompanySize(initialData.companySize || "");
      setFounded(initialData.founded || "");
      setPhone(initialData.phone || "");
      setEmail(initialData.email || "");
    }
  }, [isOpen, initialData]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast("Company name is required", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/company/profile/${companyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          website,
          location,
          logoUrl,
          industry,
          companySize,
          founded,
          phone,
          email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast("Company profile updated successfully!", "success");
        onSaveSuccess();
        setIsOpen(false);
      } else {
        toast(data.message || "Failed to update profile", "error");
      }
    } catch {
      toast("Error updating company profile", "error");
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      {/* Content */}
      <div
        className="
          relative
          w-full
          max-w-[720px]
          max-h-[85vh]
          overflow-hidden
          rounded-3xl
          border border-card-border/60
          bg-card-bg/95
          backdrop-blur-xl
          shadow-[0_20px_80px_rgba(0,0,0,0.25)]
          p-0
          text-foreground
          flex
          flex-col
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 border-b border-card-border/50 bg-card-bg/90 backdrop-blur-xl px-6 py-5 shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold leading-tight m-0">
                Edit Company Settings
              </h2>
              <span className="text-xs text-text-muted mt-1.5 block">
                Provide corporate details to attract top developer talent.
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-1.5 text-text-muted hover:text-foreground hover:bg-card-border/40 transition-colors cursor-pointer active:scale-95"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
          <div
            className="
              px-6
              py-5
              overflow-y-auto
              max-h-[calc(85vh-150px)]
              space-y-5
              flex-grow
              scrollbar-thin
              text-left
            "
          >
            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground block">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Tech Corporation"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
              />
            </div>

            {/* Tagline / Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground block">
                Company Description / Overview
              </label>
              <textarea
                placeholder="Tell developers about your work culture, missions, and technology stack..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm resize-none"
              />
            </div>

            {/* Grid fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  Website URL
                </label>
                <input
                  type="text"
                  placeholder="https://acme.org"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  Corporate Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bangalore, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  Industry Sector
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-2.5 border border-card-border/60 bg-input-bg text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-xs transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <option value="" disabled>Select Industry...</option>
                  {(dbIndustries.length > 0 ? dbIndustries : [
                    "SaaS (Software as a Service)",
                    "FinTech (Financial Technology)",
                    "Artificial Intelligence (AI)",
                    "Cyber Security",
                    "E-commerce"
                  ]).map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  Company Size
                </label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full p-2.5 border border-card-border/60 bg-input-bg text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-xs transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <option value="" disabled>Select Size...</option>
                  {(dbSizes.length > 0 ? dbSizes : [
                    "1-10 employees (Early Stage)",
                    "11-50 employees (Growth Stage)",
                    "51-200 employees (Mid Market)",
                    "201-500 employees (Scale-up)",
                    "500+ employees (Enterprise)"
                  ]).map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  Founded Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2018"
                  value={founded}
                  onChange={(e) => setFounded(e.target.value)}
                  className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  Logo URL (Direct Link)
                </label>
                <input
                  type="text"
                  placeholder="https://acme.org/logo.png"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  Corporate Email
                </label>
                <input
                  type="email"
                  placeholder="contact@acme.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  Corporate Phone
                </label>
                <input
                  type="text"
                  placeholder="+91 9988776655"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-input-bg border border-card-border rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-card-border/50 shrink-0 bg-card-bg/90 rounded-b-3xl flex justify-end gap-3">
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
                  Saving...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
