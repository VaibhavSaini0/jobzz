"use client";

import { useState, useEffect, useContext } from "react";
import BtnLoading from "../lodingstate/BtnLoading";
import { useToast } from "@/context/ToastContext";
import { UserContext } from "@/context/UserContext";
import { profileService } from "@/services/profileService";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Mail,
  User,
  MapPin,
  Phone,
  Sparkles,
  Edit2,
  Check,
} from "lucide-react";

interface JobApplyModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  job: any;
  setIsApplied: (applied: boolean) => void;
}

export default function JobApplyModal({
  isOpen,
  setIsOpen,
  job,
  setIsApplied,
}: JobApplyModalProps) {
  const { user } = useContext(UserContext);
  const { toast } = useToast();

  const [profile, setProfile] = useState<any | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [isloading, setIsloading] = useState(false);

  // Editable fields inline inside apply modal
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [savingContact, setSavingContact] = useState(false);

  // Fetch the candidate profile
  useEffect(() => {
    if (!isOpen) return;

    async function fetchProfile() {
      setLoadingProfile(true);
      try {
        const data = await profileService.getProfile();
        if (data.success && data.data) {
          const p = data.data;
          setProfile(p);
          setTitle(p.title || "");
          setPhone(p.phone || "");
          setLocation(p.location || "");
        }
      } catch (err) {
        console.error(err);
        toast("Error loading profile details.", "error");
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [isOpen, toast]);

  // Handle direct resume PDF upload inside the modal
  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      toast("Only PDF files are allowed", "error");
      return;
    }

    setUploadingPdf(true);
    try {
      const data = await profileService.uploadResumePdf(file);
      if (data.success && data.data) {
        setProfile(data.data);
        toast("Resume PDF uploaded successfully!", "success");
      } else {
        toast(data.message || "Failed to upload PDF", "error");
      }
    } catch (err) {
      console.error(err);
      toast("Failed to upload PDF", "error");
    } finally {
      setUploadingPdf(false);
    }
  }

  // Handle saving inline contact edits
  async function handleSaveContactDetails() {
    setSavingContact(true);
    try {
      const data = await profileService.updateProfile({
        title,
        phone,
        location,
        summary: profile?.summary || "",
        skills: profile?.skills || [],
        experiences: profile?.experiences || [],
        educations: profile?.educations || [],
        projects: profile?.projects || [],
        profileImageUrl: profile?.profileImageUrl || undefined,
      });
      if (data.success && data.data) {
        setProfile(data.data);
        setIsEditingContact(false);
        toast("Profile details updated successfully!", "success");
      } else {
        toast(data.message || "Failed to update profile details", "error");
      }
    } catch {
      toast("Failed to update details.", "error");
    } finally {
      setSavingContact(false);
    }
  }

  // Final job application submission
  async function handleSubmitApplication() {
    if (!profile?.resumePdfUrl) {
      toast("Please upload a resume first to complete your profile.", "error");
      return;
    }

    setIsloading(true);
    try {
      const res = await fetch("/api/job/apply/" + job?.id, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        toast("Applied Successfully.", "success");
        setIsApplied(true);
        setIsOpen(false);
      } else if (data.message === "The user already applied for this job") {
        toast("You have already applied for this job.", "info");
        setIsApplied(true);
        setIsOpen(false);
      } else {
        toast(data.message || "Failed to apply", "error");
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong.", "error");
    } finally {
      setIsloading(false);
    }
  }

  if (!isOpen) return null;

  const isProfileComplete = profile && profile.resumePdfUrl;

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
          max-w-[680px]
          max-h-[85vh]
          overflow-hidden
          rounded-3xl
          border border-card-border/60
          bg-card-bg/95
          backdrop-blur-xl
          shadow-[0_20px_80px_rgba(0,0,0,0.25)]
          p-6
          text-foreground
          flex
          flex-col
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        {/* Subtle Background gradient light overlays */}
        <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 shrink-0 relative z-10 text-left">
          <div>
            <h2 className="text-xl tracking-tight text-foreground font-black m-0">
              Apply for {job?.title}
            </h2>
            <span className="text-sm text-indigo-500 font-semibold block mt-0.5">
              {job?.company?.name || "Corporate Employer"}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer font-bold text-xs px-3 py-1.5 border border-card-border hover:bg-card-border/40 text-text-muted hover:text-foreground rounded-xl transition active:scale-95"
          >
            ✕ Close
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-hidden space-y-4 relative z-10 text-left">
          {loadingProfile ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-text-muted">
              <span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-semibold">Validating application criteria...</span>
            </div>
          ) : !isProfileComplete ? (
            /* INCOMPLETE PROFILE STATE */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-rose-500/5 border border-rose-500/10 p-4.5 rounded-2xl space-y-2">
                <div className="flex items-center gap-2.5 text-rose-500">
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="text-sm font-bold">Profile Incomplete</span>
                </div>
                <span className="text-xs sm:text-sm text-text-muted leading-relaxed block pl-7">
                  To apply for roles, your candidate profile must contain at least a **Resume PDF**. This is a minimum hiring requirement.
                </span>
              </div>

              {/* Direct Upload File Box */}
              <div className="border-2 border-dashed border-card-border/80 rounded-2xl p-6 text-center space-y-3 hover:border-indigo-500/40 transition duration-300 relative bg-background/20">
                {uploadingPdf ? (
                  <div className="flex flex-col items-center justify-center py-2 gap-3">
                    <span className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-indigo-500 font-bold">Uploading resume PDF...</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud size={32} className="text-indigo-500 mx-auto animate-pulse" />
                    <div>
                      <h3 className="text-foreground text-sm font-bold m-0">Upload Resume PDF</h3>
                      <span className="text-[10px] sm:text-xs text-text-muted block mt-1">Accepts only standard PDF files</span>
                    </div>
                    <label className="inline-flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition">
                      Select PDF File
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfUpload}
                        disabled={uploadingPdf}
                        className="hidden"
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* COMPLETE PROFILE STATE - SHOW DETAILS */
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Status Indicator Tag */}
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl">
                <div className="flex items-center gap-2.5 text-emerald-500">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span className="text-sm font-bold">Profile Verified & Ready</span>
                </div>
                <span className="text-xs sm:text-sm text-text-muted block pl-7 mt-0.5">
                  Your candidate details meet all application criteria. Please review below.
                </span>
              </div>

              {/* Profile Details List */}
              <div className="p-4 border border-card-border/60 bg-card-bg/30 space-y-3.5 rounded-2xl relative">
                <div className="flex justify-between items-center border-b border-card-border/50 pb-2">
                  <h3 className="text-foreground flex items-center gap-2 m-0 text-sm font-bold">
                    <User size={14} className="text-indigo-500" />
                    <span>Candidate Profile Details</span>
                  </h3>
                  {!isEditingContact ? (
                    <button
                      onClick={() => setIsEditingContact(true)}
                      className="cursor-pointer font-semibold text-xs flex items-center gap-1 text-indigo-500 hover:underline"
                    >
                      <Edit2 size={12} /> Edit Details
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveContactDetails}
                      disabled={savingContact}
                      className="cursor-pointer font-bold text-xs flex items-center gap-1 text-emerald-500 hover:underline active:scale-95 disabled:opacity-50"
                    >
                      {savingContact ? "..." : <><Check size={12} /> Save</>}
                    </button>
                  )}
                </div>

                <div className="space-y-2.5 pl-1">
                  <div className="flex items-center gap-2.5">
                    <Mail size={13} className="text-indigo-500 shrink-0" />
                    <span className="text-sm text-foreground font-semibold">{user?.name}</span>
                    <span className="text-xs text-text-muted truncate">({user?.email})</span>
                  </div>

                  {!isEditingContact ? (
                    <>
                      {profile?.title && (
                        <div className="flex items-center gap-2.5">
                          <Sparkles size={13} className="text-indigo-500 shrink-0" />
                          <span className="text-xs sm:text-sm text-text-muted truncate">Title: {profile.title}</span>
                        </div>
                      )}

                      {profile?.phone && (
                        <div className="flex items-center gap-2.5">
                          <Phone size={13} className="text-indigo-500 shrink-0" />
                          <span className="text-xs sm:text-sm text-text-muted truncate">Phone: {profile.phone}</span>
                        </div>
                      )}

                      {profile?.location && (
                        <div className="flex items-center gap-2.5">
                          <MapPin size={13} className="text-red-500 shrink-0" />
                          <span className="text-xs sm:text-sm text-text-muted truncate">Location: {profile.location}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    /* INLINE EDIT MODE FORM */
                    <div className="space-y-2 pt-1.5 animate-in fade-in duration-200">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-text-muted font-bold uppercase">Professional Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-input-bg border border-card-border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-foreground"
                          placeholder="e.g. Full Stack Developer"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-text-muted font-bold uppercase">Phone Number</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-input-bg border border-card-border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-foreground"
                          placeholder="e.g. +91 99999 99999"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-text-muted font-bold uppercase">Location / City</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-input-bg border border-card-border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-foreground"
                          placeholder="e.g. Bangalore, India"
                        />
                      </div>
                    </div>
                  )}

                  {profile?.skills && profile.skills.length > 0 && !isEditingContact && (
                    <div className="flex gap-1.5 flex-wrap pt-1.5 max-w-sm">
                      {profile.skills.slice(0, 4).map((skill: string) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-md bg-card-border/50 dark:bg-card-border/30 px-2 py-0.5 text-[10px] font-bold text-text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                      {profile.skills.length > 4 && (
                        <span className="inline-flex items-center rounded-md bg-card-border/50 dark:bg-card-border/30 px-2 py-0.5 text-[10px] font-bold text-text-muted">
                          +{profile.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Current Active Resume Details */}
              <div className="bg-indigo-soft/5 border border-indigo-500/10 p-4.5 rounded-2xl flex justify-between items-center flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="text-indigo-500 shrink-0" size={24} />
                  <div>
                    <span className="text-sm font-bold text-foreground block truncate max-w-[220px]">
                      {profile?.resumePdfName || "resume.pdf"}
                    </span>
                    <span className="text-xs text-text-muted block mt-0.5">Current Resume Attachment</span>
                  </div>
                </div>

                {/* Change Resume Input Trigger */}
                {uploadingPdf ? (
                  <span className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-3" />
                ) : (
                  <label className="inline-flex justify-center items-center bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs px-3 py-2 rounded-lg cursor-pointer transition shadow-sm border border-indigo-500/10">
                    Change Resume
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      disabled={uploadingPdf}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        {!loadingProfile && (
          <div className="flex justify-end mt-4 gap-3 shrink-0 pt-4 border-t border-card-border/30 relative z-10">
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer font-semibold rounded-xl border border-card-border px-4 py-2 text-xs hover:bg-card-border/40 transition text-text-muted active:scale-[0.98]"
            >
              Cancel
            </button>
            {isProfileComplete && (
              <button
                onClick={handleSubmitApplication}
                disabled={isloading || uploadingPdf || isEditingContact}
                className="cursor-pointer font-bold rounded-xl shadow-md bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs transition active:scale-[0.98] disabled:opacity-50"
              >
                {isloading ? <BtnLoading /> : "Submit Application"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
