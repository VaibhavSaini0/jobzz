"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import {
  profileService,
  type ExperienceEntry,
  type EducationEntry,
  type ProjectEntry,
} from "@/services/profileService";

export type { ExperienceEntry, EducationEntry, ProjectEntry };

type EditProfileModalProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  initialData: {
    title: string;
    location: string;
    phone: string;
    website: string;
    summary: string;
    skills: string[];
    experiences: ExperienceEntry[];
    educations: EducationEntry[];
    projects: ProjectEntry[];
    profileImageUrl?: string;
  };
  onSaveSuccess: () => void;
};

export default function EditProfileModal({
  isOpen,
  setIsOpen,
  initialData,
  onSaveSuccess,
}: EditProfileModalProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // States for basic details
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [summary, setSummary] = useState("");

  // States for lists
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [newRole, setNewRole] = useState("");
  const [newComp, setNewComp] = useState("");
  const [newDur, setNewDur] = useState("");

  const [educations, setEducations] = useState<EducationEntry[]>([]);
  const [newSchool, setNewSchool] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [newYear, setNewYear] = useState("");

  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [newProjName, setNewProjName] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjLink, setNewProjLink] = useState("");

  // Reset/populate initial data when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle(initialData.title || "");
      setLocation(initialData.location || "");
      setPhone(initialData.phone || "");
      setWebsite(initialData.website || "");
      setSummary(initialData.summary || "");
      setSkills(initialData.skills || []);
      setExperiences(initialData.experiences || []);
      setEducations(initialData.educations || []);
      setProjects(initialData.projects || []);
      setCurrentStep(1); // Default to first step
    }
  }, [isOpen, initialData]);

  // Skills
  function addSkill() {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  }
  function removeSkill(skillToRemove: string) {
    setSkills(skills.filter((s) => s !== skillToRemove));
  }

  // Experiences
  function addExperience() {
    if (newRole.trim() && newComp.trim()) {
      setExperiences([
        ...experiences,
        { role: newRole.trim(), company: newComp.trim(), duration: newDur.trim() || "Present" },
      ]);
      setNewRole("");
      setNewComp("");
      setNewDur("");
    }
  }
  function removeExperience(idx: number) {
    setExperiences(experiences.filter((_, i) => i !== idx));
  }

  // Educations
  function addEducation() {
    if (newSchool.trim() && newDegree.trim()) {
      setEducations([
        ...educations,
        { school: newSchool.trim(), degree: newDegree.trim(), year: newYear.trim() || "N/A" },
      ]);
      setNewSchool("");
      setNewDegree("");
      setNewYear("");
    }
  }
  function removeEducation(idx: number) {
    setEducations(educations.filter((_, i) => i !== idx));
  }

  // Projects
  function addProject() {
    if (newProjName.trim()) {
      setProjects([
        ...projects,
        {
          name: newProjName.trim(),
          description: newProjDesc.trim(),
          link: newProjLink.trim(),
        },
      ]);
      setNewProjName("");
      setNewProjDesc("");
      setNewProjLink("");
    }
  }
  function removeProject(idx: number) {
    setProjects(projects.filter((_, i) => i !== idx));
  }

  async function handleSave() {
    setSaving(true);
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
        profileImageUrl: initialData.profileImageUrl || undefined,
      });
      if (data.success) {
        toast("Profile saved successfully!", "success");
        onSaveSuccess();
        setIsOpen(false);
      } else {
        toast(data.message || "Failed to save profile.", "error");
      }
    } catch {
      toast("Failed to save profile.", "error");
    } finally {
      setSaving(false);
    }
  }

  const steps = [
    { num: 1, label: "Personal" },
    { num: 2, label: "Summary" },
    { num: 3, label: "Education" },
    { num: 4, label: "Experience" },
    { num: 5, label: "Projects" },
  ];

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
        <div className="sticky top-0 z-20 border-b border-card-border/50 bg-card-bg/90 backdrop-blur-xl px-6 py-5 shrink-0 text-left">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold leading-tight m-0 text-foreground">
                Edit Your Profile
              </h2>
              <p className="text-sm text-text-muted mt-1">
                Complete each section to maintain a standout candidate profile.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-1.5 text-text-muted hover:text-foreground hover:bg-card-border/40 transition-colors cursor-pointer active:scale-95"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Sticky Step Wizard Navigation */}
        <div className="px-6 pt-4 pb-2 shrink-0 bg-card-bg/90 border-b border-card-border/30 text-left">
          {/* Dynamic Progress Bar */}
          <div className="w-full bg-card-border/40 h-2 rounded-full overflow-hidden mb-4 relative shrink-0">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>

          {/* Dynamic Step Tabs */}
          <div className="flex justify-between items-center gap-1.5 overflow-x-auto pb-2 scrollbar-jobzz shrink-0">
            {steps.map((s) => (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer active:scale-95 ${
                  currentStep === s.num
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-background/25 text-text-muted hover:text-foreground hover:bg-background/45"
                }`}
              >
                Step {s.num}: {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div
          className="
            px-6
            py-5
            overflow-y-auto
            max-h-[calc(85vh-260px)]
            space-y-5
            flex-grow
            scrollbar-jobzz
            text-left
          "
        >
          {/* STEP 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-indigo-500 dark:text-indigo-400">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">PROFESSIONAL TITLE</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Full Stack Developer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">LOCATION (CITY, COUNTRY)</label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore, India"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">PHONE NUMBER</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">PERSONAL WEBSITE / PORTFOLIO</label>
                  <input
                    type="text"
                    placeholder="e.g. https://johndoe.dev"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Summary & Skills */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-indigo-500 dark:text-indigo-400">Professional Summary & Skills</h3>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">SHORT BIO / SUMMARY</label>
                <textarea
                  placeholder="Outline your tech specialties, leadership strengths, and work goals..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm resize-none"
                />
              </div>

              <hr className="border-card-border/50 my-2" />

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">SKILL STACK</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {skills.length > 0 ? (
                    skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-lg bg-card-border/50 dark:bg-card-border/30 px-2.5 py-1 text-xs font-bold text-text-muted border border-card-border/25 gap-1.5"
                      >
                        {s}
                        <button
                          onClick={() => removeSkill(s)}
                          className="text-rose-500 hover:text-rose-700 font-extrabold ml-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-text-muted italic">No skills added yet.</span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. TypeScript"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    className="flex-grow px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                  />
                  <button
                    onClick={addSkill}
                    className="cursor-pointer px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition active:scale-[0.98]"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Education */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-indigo-500 dark:text-indigo-400">Education Credentials</h3>
              
              <div className="space-y-2">
                {educations.length > 0 ? (
                  educations.map((edu, idx) => (
                    <div key={idx} className="p-3 bg-card-bg/40 border border-card-border rounded-xl flex justify-between items-center">
                      <div>
                        <span className="font-bold text-foreground text-sm block">{edu.degree}</span>
                        <span className="text-xs text-indigo-500 font-medium block mt-0.5">{edu.school} • {edu.year}</span>
                      </div>
                      <button
                        onClick={() => removeEducation(idx)}
                        className="cursor-pointer p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-500/5 rounded-xl transition active:scale-95"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-text-muted italic block text-center py-6 bg-background/10 rounded-xl border border-dashed border-card-border/50">
                    No education credentials listed yet. Add one below!
                  </span>
                )}
              </div>

              <div className="p-4 bg-background/20 border border-dashed border-card-border rounded-2xl space-y-3">
                <span className="text-xs font-bold text-text-muted block">ADD EDUCATION RECORD</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="School (Stanford University)"
                    value={newSchool}
                    onChange={(e) => setNewSchool(e.target.value)}
                    className="px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="Degree (B.S. CS)"
                    value={newDegree}
                    onChange={(e) => setNewDegree(e.target.value)}
                    className="px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="Graduation Year (2022)"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs shadow-sm"
                  />
                </div>
                <button
                  onClick={addEducation}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition active:scale-95"
                >
                  <Plus size={12} /> Add Education Record
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Experience */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-indigo-500 dark:text-indigo-400">Professional Work Experience</h3>
              
              <div className="space-y-2">
                {experiences.length > 0 ? (
                  experiences.map((exp, idx) => (
                    <div key={idx} className="p-3 bg-card-bg/40 border border-card-border rounded-xl flex justify-between items-center">
                      <div>
                        <span className="font-bold text-foreground text-sm block">{exp.role}</span>
                        <span className="text-xs text-indigo-500 font-medium block mt-0.5">{exp.company} • {exp.duration}</span>
                      </div>
                      <button
                        onClick={() => removeExperience(idx)}
                        className="cursor-pointer p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-500/5 rounded-xl transition active:scale-95"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-text-muted italic block text-center py-6 bg-background/10 rounded-xl border border-dashed border-card-border/50">
                    No work history records listed yet. Add one below!
                  </span>
                )}
              </div>

              <div className="p-4 bg-background/20 border border-dashed border-card-border rounded-2xl space-y-3">
                <span className="text-xs font-bold text-text-muted block">ADD WORK EXPERIENCE</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Role (Senior SWE)"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="Company (Google)"
                    value={newComp}
                    onChange={(e) => setNewComp(e.target.value)}
                    className="px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="Duration (2022 - Present)"
                    value={newDur}
                    onChange={(e) => setNewDur(e.target.value)}
                    className="px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs shadow-sm"
                  />
                </div>
                <button
                  onClick={addExperience}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition active:scale-95"
                >
                  <Plus size={12} /> Add Experience
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Projects */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-indigo-500 dark:text-indigo-400">Portfolio Projects</h3>
              
              <div className="space-y-2">
                {projects.length > 0 ? (
                  projects.map((proj, idx) => (
                    <div key={idx} className="p-3.5 bg-card-bg/40 border border-card-border rounded-xl flex justify-between items-center">
                      <div className="flex-grow pr-4">
                        <span className="font-bold text-foreground text-sm block">{proj.name}</span>
                        <span className="text-xs text-text-muted block mt-0.5 leading-relaxed">{proj.description}</span>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 text-xs font-semibold hover:underline block mt-1"
                          >
                            {proj.link}
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => removeProject(idx)}
                        className="cursor-pointer p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-500/5 rounded-xl transition active:scale-95 shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-text-muted italic block text-center py-6 bg-background/10 rounded-xl border border-dashed border-card-border/50">
                    No portfolio projects listed yet. Add one below!
                  </span>
                )}
              </div>

              <div className="p-4 bg-background/20 border border-dashed border-card-border rounded-2xl space-y-3">
                <span className="text-xs font-bold text-text-muted block">ADD NEW PROJECT</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Project Name (Chat App)"
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    className="px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="Project Link (GitHub URL)"
                    value={newProjLink}
                    onChange={(e) => setNewProjLink(e.target.value)}
                    className="px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs shadow-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Brief description of tech stack and features..."
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-input-bg border border-card-border/60 rounded-xl text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs shadow-sm"
                />
                <button
                  onClick={addProject}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition active:scale-95"
                >
                  <Plus size={12} /> Add Project Record
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Wizard Controls */}
        <div className="px-6 py-4 border-t border-card-border/50 shrink-0 bg-card-bg/90 rounded-b-3xl flex justify-between items-center">
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded-xl font-semibold border border-card-border px-4 py-2 text-xs hover:bg-card-border/40 transition-colors text-text-muted active:scale-[0.98] flex items-center gap-1.5"
            disabled={saving}
          >
            <X size={16} /> Close
          </button>

          <div className="flex gap-2">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="cursor-pointer rounded-xl font-semibold border border-indigo-500/15 hover:bg-indigo-500/10 px-4 py-2 text-xs text-indigo-500 transition active:scale-[0.98] flex items-center gap-1.5"
                disabled={saving}
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="cursor-pointer rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md px-4 py-2 text-xs flex items-center gap-1.5 transition active:scale-[0.98]"
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="cursor-pointer rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md px-4 py-2 text-xs flex items-center gap-1.5 transition active:scale-[0.98] disabled:opacity-50"
                disabled={saving}
              >
                {saving ? "Saving..." : <><Save size={16} /> Save Profile</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
