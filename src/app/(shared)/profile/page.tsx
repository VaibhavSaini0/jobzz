"use client";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import Loading from "@/components/lodingstate/Loading";
import { useToast } from "@/context/ToastContext";
import { isEmployer } from "@/lib/roles";
import AIResumeImproveModal from "@/components/AIResumeImproveModal";
import {
  profileService,
  type ExperienceEntry,
  type EducationEntry,
  type ProjectEntry,
} from "@/services/profileService";
import EditProfileModal from "@/components/modals/EditProfileModal";
import CandidateDashboard from "@/components/profile/CandidateDashboard";
import RecruiterDashboard from "@/components/profile/RecruiterDashboard";

function parseExperience(raw: string): ExperienceEntry {
  try {
    return JSON.parse(raw) as ExperienceEntry;
  } catch {
    return { role: raw, company: "", duration: "" };
  }
}

function parseEducation(raw: string): EducationEntry {
  try {
    return JSON.parse(raw) as EducationEntry;
  } catch {
    return { school: raw, degree: "", year: "" };
  }
}

function parseProject(raw: string): ProjectEntry {
  try {
    return JSON.parse(raw) as ProjectEntry;
  } catch {
    return { name: raw, description: "", link: "" };
  }
}

export default function ProfilePage() {
  const { user, company } = useContext(UserContext);
  const { toast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [summary, setSummary] = useState("");
  const [resumePdfUrl, setResumePdfUrl] = useState("");
  const [resumePdfName, setResumePdfName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [educations, setEducations] = useState<EducationEntry[]>([]);
  const [projects, setProjects] = useState<ProjectEntry[]>([]);

  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Load resume/profile details from API
  useEffect(() => {
    async function loadResume() {
      if (!user?.id) return;
      try {
        const data = await profileService.getProfile();
        if (data.success && data.data) {
          const r = data.data;
          setTitle(r.title || "");
          setLocation(r.location || "");
          setPhone(r.phone || "");
          setWebsite(r.website || "");
          setSummary(r.summary || "");
          setSkills(r.skills || []);
          setExperiences((r.experiences || []).map(parseExperience));
          setResumePdfUrl(r.resumePdfUrl || "");
          setResumePdfName(r.resumePdfName || "");
          setProfileImageUrl(r.profileImageUrl || "");
          setEducations((r.educations || []).map(parseEducation));
          setProjects((r.projects || []).map(parseProject));
        }
      } catch {
        toast("Could not load profile.", "error");
      }
    }
    loadResume();
  }, [user, toast, reloadTrigger]);

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
        setResumePdfUrl(data.data.resumePdfUrl || "");
        setResumePdfName(data.data.resumePdfName || "");
        toast("Resume PDF uploaded successfully!", "success");
      } else {
        toast(data.message || "Failed to upload PDF", "error");
      }
    } catch {
      toast("Failed to upload PDF", "error");
    } finally {
      setUploadingPdf(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast("Only image files are allowed", "error");
      return;
    }

    setUploadingImage(true);
    try {
      const data = await profileService.uploadProfileImage(file);
      if (data.success && data.data) {
        setProfileImageUrl(data.data.profileImageUrl);
        toast("Profile picture updated successfully!", "success");
        setReloadTrigger((prev) => prev + 1);
      } else {
        toast(data.message || "Failed to upload image", "error");
      }
    } catch {
      toast("Failed to upload image", "error");
    } finally {
      setUploadingImage(false);
    }
  }

  async function saveFieldDirectly(updates: any) {
    try {
      const data = await profileService.updateProfile({
        title,
        summary,
        location,
        phone,
        website,
        skills,
        experiences: experiences.map((e) => JSON.stringify(e)),
        educations: educations.map((e) => JSON.stringify(e)),
        projects: projects.map((p) => JSON.stringify(p)),
        profileImageUrl,
        ...updates,
      });
      if (data.success) {
        toast("Profile saved successfully!", "success");
        setReloadTrigger((prev) => prev + 1);
      }
    } catch {
      toast("Failed to save profile", "error");
    }
  }

  if (!user) {
    return <Loading />;
  }

  const isUserEmployer = isEmployer(user.role);

  return (
    <main className="max-w-6xl mx-auto py-10 px-4 min-h-screen text-foreground relative">
      {/* Background aesthetics */}
      <div className="absolute top-[-5%] left-[5%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-purple-500/5 blur-[140px] pointer-events-none" />

      {isUserEmployer ? (
        <RecruiterDashboard
          user={user}
          company={company}
          profileImageUrl={profileImageUrl}
          uploadingImage={uploadingImage}
          phone={phone}
          location={location}
          website={website}
          handleImageUpload={handleImageUpload}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      ) : (
        <CandidateDashboard
          user={user}
          title={title}
          location={location}
          phone={phone}
          website={website}
          summary={summary}
          skills={skills}
          experiences={experiences}
          educations={educations}
          projects={projects}
          resumePdfUrl={resumePdfUrl}
          resumePdfName={resumePdfName}
          profileImageUrl={profileImageUrl}
          uploadingPdf={uploadingPdf}
          uploadingImage={uploadingImage}
          handlePdfUpload={handlePdfUpload}
          handleImageUpload={handleImageUpload}
          setIsEditModalOpen={setIsEditModalOpen}
          setIsAiModalOpen={setIsAiModalOpen}
        />
      )}

      {/* Shared Edit Profile Modal Dialog */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={{
          title,
          location,
          phone,
          website,
          summary,
          skills,
          experiences,
          educations,
          projects,
          profileImageUrl,
        }}
        onSaveSuccess={() => setReloadTrigger((prev) => prev + 1)}
      />

      {/* Shared AI Coach Modal */}
      <AIResumeImproveModal
        isOpen={isAiModalOpen}
        setIsOpen={setIsAiModalOpen}
        onApplySummary={(s) => saveFieldDirectly({ summary: s })}
        onApplySkills={(newSkills) => {
          saveFieldDirectly({ skills: [...new Set([...skills, ...newSkills])] });
        }}
      />
    </main>
  );
}
