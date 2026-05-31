"use client";

import {
  Dialog,
  Text,
  Box,
  Heading,
  Flex,
  Button,
  TextField,
  TextArea,
  Badge,
  Grid,
  Separator,
} from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { Plus, Trash2, Save, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export type ExperienceEntry = { role: string; company: string; duration: string };
export type EducationEntry = { school: string; degree: string; year: string };
export type ProjectEntry = { name: string; description: string; link: string };

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
      const res = await fetch("/api/profile/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          summary,
          location,
          phone,
          website,
          skills,
          experiences: experiences.map((e) => JSON.stringify(e)),
          educations: educations.map((e) => JSON.stringify(e)),
          projects: projects.map((p) => JSON.stringify(p)),
          profileImageUrl: initialData.profileImageUrl || null,
        }),
      });
      const data = await res.json();
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

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content
        style={{
          maxHeight: "85vh",
          maxWidth: "680px",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
        }}
        className="backdrop-blur-md bg-card-bg/95 border border-card-border rounded-2xl shadow-xl"
      >
        <Dialog.Title>
          <Heading size="6" className="tracking-tight">Edit Your Profile</Heading>
        </Dialog.Title>
        <Dialog.Description size="2" className="text-text-muted mb-3">
          Complete each section to maintain a standout candidate profile.
        </Dialog.Description>

        {/* Dynamic Progress Bar */}
        <Box className="w-full bg-card-border/40 h-2 rounded-full overflow-hidden mb-4 relative shrink-0">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300 ease-out rounded-full"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </Box>

        {/* Dynamic Step Tabs */}
        <Flex gap="1" justify="between" className="mb-5 overflow-x-auto pb-2 scrollbar-none border-b border-card-border/40 shrink-0">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                currentStep === s.num
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-background/20 text-text-muted hover:text-foreground hover:bg-background/45"
              }`}
            >
              Step {s.num}: {s.label}
            </button>
          ))}
        </Flex>

        {/* Scrollable Form Body */}
        <Box style={{ overflowY: "auto", flexGrow: 1 }} className="pr-1 scrollbar-thin">
          
          {/* STEP 1: Personal Details */}
          {currentStep === 1 && (
            <Box className="space-y-4 animate-fadeIn">
              <Heading size="4" className="text-indigo-600 dark:text-indigo-400">Personal Details</Heading>
              <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                <Box className="grid gap-1">
                  <Text size="1" weight="bold" className="text-text-muted">PROFESSIONAL TITLE</Text>
                  <TextField.Root
                    placeholder="e.g. Lead Full Stack Developer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Box>
                <Box className="grid gap-1">
                  <Text size="1" weight="bold" className="text-text-muted">LOCATION</Text>
                  <TextField.Root
                    placeholder="e.g. Bangalore, India"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Box>
                <Box className="grid gap-1">
                  <Text size="1" weight="bold" className="text-text-muted">PHONE NUMBER</Text>
                  <TextField.Root
                    placeholder="e.g. +91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Box>
                <Box className="grid gap-1">
                  <Text size="1" weight="bold" className="text-text-muted">PERSONAL WEBSITE</Text>
                  <TextField.Root
                    placeholder="e.g. https://johndoe.dev"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </Box>
              </Grid>
            </Box>
          )}

          {/* STEP 2: Summary & Skills */}
          {currentStep === 2 && (
            <Box className="space-y-5 animate-fadeIn">
              <Heading size="4" className="text-indigo-600 dark:text-indigo-400">Summary & Skills</Heading>
              
              <Box className="grid gap-1">
                <Text size="1" weight="bold" className="text-text-muted font-bold">PROFESSIONAL SUMMARY</Text>
                <TextArea
                  placeholder="Introduce yourself, your technical experience, and key achievements..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="h-28"
                />
              </Box>

              <Separator size="4" className="opacity-20" />

              <Box className="space-y-3">
                <Text size="1" weight="bold" className="text-text-muted font-bold block">SKILLS STACK</Text>
                <Flex gap="1.5" wrap="wrap" className="min-h-[40px] p-2 bg-background/20 rounded-xl border border-card-border/50">
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <Badge
                        key={skill}
                        size="2"
                        color="gray"
                        variant="surface"
                        className="rounded-md flex items-center gap-1.5 py-1 px-2 text-xs"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-red-500 hover:text-red-700 cursor-pointer ml-1 font-bold text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <Text size="1" className="text-text-muted italic self-center">No skills added yet.</Text>
                  )}
                </Flex>
                <Flex gap="2" className="max-w-sm">
                  <TextField.Root
                    placeholder="Add skill (e.g. Next.js)..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    className="flex-grow"
                  />
                  <Button onClick={addSkill} color="indigo" className="cursor-pointer">
                    <Plus size={14} /> Add
                  </Button>
                </Flex>
              </Box>
            </Box>
          )}

          {/* STEP 3: Education */}
          {currentStep === 3 && (
            <Box className="space-y-5 animate-fadeIn">
              <Heading size="4" className="text-indigo-600 dark:text-indigo-400">Education (College / University)</Heading>
              
              <div className="space-y-2">
                {educations.length > 0 ? (
                  educations.map((edu, idx) => (
                    <Flex key={idx} justify="between" align="center" className="p-3.5 bg-background/40 border border-card-border rounded-xl">
                      <Box>
                        <Text className="font-bold text-foreground text-sm block">{edu.degree}</Text>
                        <Text size="1" className="text-text-muted">{edu.school} · {edu.year}</Text>
                      </Box>
                      <Button
                        onClick={() => removeEducation(idx)}
                        variant="ghost"
                        color="red"
                        size="1"
                        className="cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </Flex>
                  ))
                ) : (
                  <Text size="2" className="text-text-muted italic block text-center py-4 bg-background/10 rounded-xl border border-dashed border-card-border/50">
                    No education records added yet. Add one below!
                  </Text>
                )}
              </div>

              <Box className="p-4 bg-background/20 border border-dashed border-card-border rounded-xl space-y-3">
                <Text size="1" weight="bold" className="text-text-muted block font-bold">ADD NEW EDUCATION</Text>
                <Grid columns={{ initial: "1", sm: "3" }} gap="2">
                  <TextField.Root
                    placeholder="Degree (e.g. B.Tech CSE)"
                    value={newDegree}
                    onChange={(e) => setNewDegree(e.target.value)}
                  />
                  <TextField.Root
                    placeholder="School / College"
                    value={newSchool}
                    onChange={(e) => setNewSchool(e.target.value)}
                  />
                  <TextField.Root
                    placeholder="Year (e.g. 2020 - 2024)"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                  />
                </Grid>
                <Button size="1" color="indigo" onClick={addEducation} className="cursor-pointer mt-1">
                  <Plus size={12} /> Add Education
                </Button>
              </Box>
            </Box>
          )}

          {/* STEP 4: Experience */}
          {currentStep === 4 && (
            <Box className="space-y-5 animate-fadeIn">
              <Heading size="4" className="text-indigo-600 dark:text-indigo-400">Work Experience</Heading>
              
              <div className="space-y-2">
                {experiences.length > 0 ? (
                  experiences.map((exp, idx) => (
                    <Flex key={idx} justify="between" align="center" className="p-3.5 bg-background/40 border border-card-border rounded-xl">
                      <Box>
                        <Text className="font-bold text-foreground text-sm block">{exp.role}</Text>
                        <Text size="1" className="text-text-muted">{exp.company} · {exp.duration}</Text>
                      </Box>
                      <Button
                        onClick={() => removeExperience(idx)}
                        variant="ghost"
                        color="red"
                        size="1"
                        className="cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </Flex>
                  ))
                ) : (
                  <Text size="2" className="text-text-muted italic block text-center py-4 bg-background/10 rounded-xl border border-dashed border-card-border/50">
                    No work experience listed yet. Add one below!
                  </Text>
                )}
              </div>

              <Box className="p-4 bg-background/20 border border-dashed border-card-border rounded-xl space-y-3">
                <Text size="1" weight="bold" className="text-text-muted block font-bold">ADD WORK EXPERIENCE</Text>
                <Grid columns={{ initial: "1", sm: "3" }} gap="2">
                  <TextField.Root
                    placeholder="Role (e.g. Software Engineer)"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  />
                  <TextField.Root
                    placeholder="Company"
                    value={newComp}
                    onChange={(e) => setNewComp(e.target.value)}
                  />
                  <TextField.Root
                    placeholder="Duration (e.g. 2022 - Present)"
                    value={newDur}
                    onChange={(e) => setNewDur(e.target.value)}
                  />
                </Grid>
                <Button size="1" color="indigo" onClick={addExperience} className="cursor-pointer mt-1">
                  <Plus size={12} /> Add Experience
                </Button>
              </Box>
            </Box>
          )}

          {/* STEP 5: Projects */}
          {currentStep === 5 && (
            <Box className="space-y-5 animate-fadeIn">
              <Heading size="4" className="text-indigo-600 dark:text-indigo-400">Portfolio Projects</Heading>
              
              <div className="space-y-2">
                {projects.length > 0 ? (
                  projects.map((proj, idx) => (
                    <Flex key={idx} justify="between" align="center" className="p-3.5 bg-background/40 border border-card-border rounded-xl">
                      <Box className="flex-grow pr-4">
                        <Text className="font-bold text-foreground text-sm block">{proj.name}</Text>
                        <Text size="1" className="text-text-muted block">{proj.description}</Text>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-indigo-500 text-xs font-semibold hover:underline block mt-0.5">
                            {proj.link}
                          </a>
                        )}
                      </Box>
                      <Button
                        onClick={() => removeProject(idx)}
                        variant="ghost"
                        color="red"
                        size="1"
                        className="cursor-pointer shrink-0"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </Flex>
                  ))
                ) : (
                  <Text size="2" className="text-text-muted italic block text-center py-4 bg-background/10 rounded-xl border border-dashed border-card-border/50">
                    No portfolio projects listed yet. Add one below!
                  </Text>
                )}
              </div>

              <Box className="p-4 bg-background/20 border border-dashed border-card-border rounded-xl space-y-3">
                <Text size="1" weight="bold" className="text-text-muted block font-bold">ADD NEW PROJECT</Text>
                <Grid columns={{ initial: "1", sm: "2" }} gap="2">
                  <TextField.Root
                    placeholder="Project Name (e.g. Chat App)"
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                  />
                  <TextField.Root
                    placeholder="Project Link (e.g. GitHub URL)"
                    value={newProjLink}
                    onChange={(e) => setNewProjLink(e.target.value)}
                  />
                </Grid>
                <TextField.Root
                  placeholder="Brief description of tech stack and features..."
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                />
                <Button size="1" color="indigo" onClick={addProject} className="cursor-pointer mt-1">
                  <Plus size={12} /> Add Project Record
                </Button>
              </Box>
            </Box>
          )}

        </Box>

        {/* Footer Wizard Controls */}
        <Flex gap="3" justify="between" className="mt-4 border-t border-card-border/50 pt-4 shrink-0">
          <Button variant="soft" color="gray" onClick={() => setIsOpen(false)} className="cursor-pointer" disabled={saving}>
            <X size={16} /> Close
          </Button>

          <Flex gap="2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                color="indigo"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="cursor-pointer"
                disabled={saving}
              >
                <ChevronLeft size={16} /> Back
              </Button>
            )}

            {currentStep < steps.length ? (
              <Button
                variant="solid"
                color="indigo"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="cursor-pointer"
              >
                Next <ChevronRight size={16} />
              </Button>
            ) : (
              <Button
                variant="solid"
                color="indigo"
                onClick={handleSave}
                className="cursor-pointer"
                disabled={saving}
              >
                {saving ? "Saving..." : <><Save size={16} /> Save Profile</>}
              </Button>
            )}
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
