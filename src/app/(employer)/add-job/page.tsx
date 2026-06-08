"use client";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import { Sparkles, Loader2, Briefcase, DollarSign, MapPin, Calendar, CheckSquare, Layers } from "lucide-react";

export default function SimpleAddJobForm() {
  const employmentTypes = ["Full-Time", "Part-Time", "Contract"];
  const jobTypes = ["Remote", "On-site", "Hybrid"];
  const applyThroughOptions = ["Manually Apply"];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    employment_type: "",
    job_type: "",
    apply_through: "",
    lastDate: "",
  });

  const { company } = useContext(UserContext);
  const { toast } = useToast();
  const [aiLoading, setAiLoading] = useState(false);
  const [dbLocations, setDbLocations] = useState<string[]>([]);

  useEffect(() => {
    async function loadLocations() {
      try {
        const res = await fetch("/api/static-options");
        const data = await res.json();
        if (data.success && data.data) {
          setDbLocations(data.data.location || []);
        }
      } catch (err) {
        console.error("Failed to load locations:", err);
      }
    }
    loadLocations();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function generateDescription() {
    if (!formData.title.trim()) {
      toast("Enter a job title first", "error");
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/job-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          employment_type: formData.employment_type,
          job_type: formData.job_type,
          companyName: company?.name,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, description: data.data }));
        toast(data.isDemo ? "Demo description generated" : "AI description generated!", "success");
      } else {
        toast(data.message || "Generation failed", "error");
      }
    } catch (error) {
      console.error(error);
      toast("AI generation failed", "error");
    } finally {
      setAiLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !company?.id) {
      toast("Company not found. Please register your company first.", "error");
      return;
    }

    if (!formData.employment_type) {
      toast("Please select an employment type", "error");
      return;
    }
    if (!formData.job_type) {
      toast("Please select a job type", "error");
      return;
    }
    if (!formData.apply_through) {
      toast("Please select an application method", "error");
      return;
    }

    const payload = {
      ...formData,
      salary: Number(formData.salary),
      companyId: company?.id,
    };

    try {
      const res = await fetch("/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit");

      toast("Job posted successfully!", "success");
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        employment_type: "",
        job_type: "",
        apply_through: "",
        lastDate: "",
      });
    } catch (err) {
      console.error("Job Submit Error:", err);
      toast("Error submitting job", "error");
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 min-h-screen text-foreground relative flex items-center justify-center">
      {/* Premium ambient glows */}
      <div className="absolute top-[-5%] left-[5%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-purple-500/5 blur-[140px] pointer-events-none" style={{ animationDuration: '4s' }} />

      <div className="p-8 border border-card-border bg-card-bg/60 backdrop-blur-md shadow-2xl rounded-3xl w-full relative z-10">
        
        {/* Header Title block */}
        <div className="mb-8 text-center space-y-2">
          <span className="text-xs text-indigo-500 font-bold uppercase tracking-widest block">
            Recruiter Workspace
          </span>
          <h1 className="text-3xl text-foreground tracking-tight font-extrabold">
            Post a New Job Opening
          </h1>
          <p className="text-sm text-text-muted max-w-lg mx-auto block leading-relaxed">
            Create a comprehensive job post to attract verified developer talent across our community.
          </p>
        </div>

        <hr className="border-card-border/50 mb-8" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Job Title */}
            <div className="grid gap-1.5 sm:col-span-2">
              <label htmlFor="title" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                <Briefcase size={13} className="text-indigo-500" />
                <span>Job Title <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g. Senior Full Stack Engineer"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border border-card-border/60 bg-background/50 text-foreground rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all focus:border-indigo-500/50"
              />
            </div>

            {/* Salary */}
            <div className="grid gap-1.5">
              <label htmlFor="salary" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                <DollarSign size={13} className="text-indigo-500" />
                <span>Salary (USD / Year) <span className="text-red-500">*</span></span>
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                placeholder="e.g. 120000"
                value={formData.salary}
                onChange={handleChange}
                required
                className="w-full p-3 border border-card-border/60 bg-background/50 text-foreground rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all focus:border-indigo-500/50"
              />
            </div>

            {/* Location Select */}
            <div className="grid gap-1.5">
              <label htmlFor="location" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                <MapPin size={13} className="text-red-500" />
                <span>Office Location <span className="text-red-500">*</span></span>
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-3 border border-card-border/60 bg-background/50 text-foreground rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all focus:border-indigo-500/50 cursor-pointer"
              >
                <option value="" disabled>Choose Location...</option>
                {(dbLocations.length > 0 ? dbLocations : [
                  "Remote (Work from Anywhere)",
                  "Bangalore, India",
                  "San Francisco, USA",
                  "London, UK",
                  "Mumbai, India"
                ]).map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Employment Type */}
            <div className="grid gap-1.5">
              <label htmlFor="employment_type" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                <Layers size={13} className="text-indigo-500" />
                <span>Employment Type <span className="text-red-500">*</span></span>
              </label>
              <select
                id="employment_type"
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                required
                className="w-full p-3 border border-card-border/60 bg-background/50 text-foreground rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all focus:border-indigo-500/50 cursor-pointer"
              >
                <option value="" disabled>Select Type...</option>
                {employmentTypes.map((type) => (
                  <option value={type} key={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div className="grid gap-1.5">
              <label htmlFor="job_type" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                <Briefcase size={13} className="text-indigo-500" />
                <span>Job Type <span className="text-red-500">*</span></span>
              </label>
              <select
                id="job_type"
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                required
                className="w-full p-3 border border-card-border/60 bg-background/50 text-foreground rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all focus:border-indigo-500/50 cursor-pointer"
              >
                <option value="" disabled>Select Job Type...</option>
                {jobTypes.map((type) => (
                  <option value={type} key={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Apply Through */}
            <div className="grid gap-1.5">
              <label htmlFor="apply_through" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                <CheckSquare size={13} className="text-indigo-500" />
                <span>Application Method <span className="text-red-500">*</span></span>
              </label>
              <select
                id="apply_through"
                name="apply_through"
                value={formData.apply_through}
                onChange={handleChange}
                required
                className="w-full p-3 border border-card-border/60 bg-background/50 text-foreground rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all focus:border-indigo-500/50 cursor-pointer"
              >
                <option value="" disabled>Choose Application Method...</option>
                {applyThroughOptions.map((option) => (
                  <option value={option} key={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Last Date to Apply */}
            <div className="grid gap-1.5">
              <label htmlFor="lastDate" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                <Calendar size={13} className="text-indigo-500" />
                <span>Application Deadline</span>
              </label>
              <input
                type="date"
                id="lastDate"
                name="lastDate"
                value={formData.lastDate}
                onChange={handleChange}
                className="w-full p-3 border border-card-border/60 bg-background/50 text-foreground rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all focus:border-indigo-500/50"
              />
            </div>

            {/* Description (with AI Write) */}
            <div className="grid gap-1.5 sm:col-span-2">
              <div className="flex justify-between items-center mb-0.5">
                <label htmlFor="description" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                  <Briefcase size={13} className="text-indigo-500" />
                  <span>Job Description <span className="text-red-500">*</span></span>
                </label>
                <button
                  type="button"
                  onClick={generateDescription}
                  disabled={aiLoading}
                  className="cursor-pointer flex items-center gap-1.5 rounded-xl font-bold px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 transition text-xs shadow-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {aiLoading ? (
                    <Loader2 size={13} className="animate-spin text-purple-500" />
                  ) : (
                    <Sparkles size={13} className="text-purple-500" />
                  )}
                  <span>{aiLoading ? "Writing..." : "AI Write Description"}</span>
                </button>
              </div>
              <textarea
                id="description"
                name="description"
                placeholder="Detail the roles, responsibilities, technical stacks, and expected qualifications..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-4 border border-card-border/60 bg-background/50 text-foreground rounded-2xl h-44 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all focus:border-indigo-500/50 leading-relaxed resize-y"
              />
            </div>
          </div>

          {/* Form Actions */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-4 px-6 rounded-2xl cursor-pointer transition shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 flex items-center justify-center gap-2 hover:scale-[1.01] duration-300 active:scale-95"
          >
            <Sparkles size={15} />
            <span>Publish Job Listing</span>
          </button>
        </form>

      </div>
    </main>
  );
}
