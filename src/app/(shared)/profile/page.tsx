"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
  Badge,
  Tabs,
} from "@radix-ui/themes";
import {
  Mail,
  User,
  Star,
  Phone,
  Globe,
  MapPin,
  Building2,
  Sparkles,
  Edit3,
  FileText,
  UploadCloud,
  GraduationCap,
  FolderGit2,
  Camera,
  ExternalLink,
  Briefcase,
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import CompanyDetailTab from "@/components/CompanyDetailTab";
import Loading from "@/components/lodingstate/Loading";
import { useToast } from "@/context/ToastContext";
import { roleLabel, isEmployer } from "@/lib/roles";
import AIResumeImproveModal from "@/components/AIResumeImproveModal";
import EditProfileModal, {
  type ExperienceEntry,
  type EducationEntry,
  type ProjectEntry,
} from "@/components/modals/EditProfileModal";

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

  // Load resume from API
  useEffect(() => {
    async function loadResume() {
      if (!user?.id) return;
      try {
        const res = await fetch("/api/profile/resume");
        const data = await res.json();
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
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/profile/resume/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setResumePdfUrl(data.data.resumePdfUrl);
        setResumePdfName(data.data.resumePdfName);
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
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/profile/resume/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
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
          profileImageUrl,
          ...updates,
        }),
      });
      const data = await res.json();
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
        // EMPLOYER LAYOUT
        <Flex gap="8" className="flex-col md:flex-row relative z-10">
          <Box className="w-full md:w-80 space-y-6">
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
              <Flex direction="column" align="center" className="text-center gap-4">
                <Avatar
                  size="7"
                  fallback={
                    typeof user?.name === "string" && user.name.length > 0
                      ? user.name[0].toUpperCase()
                      : "U"
                  }
                  radius="full"
                  className="shadow-inner border-2 border-indigo-500/20 bg-indigo-soft/10 text-indigo-600 dark:text-indigo-400 font-bold"
                />
                <Box className="space-y-1.5">
                  <Heading size="5" className="text-foreground">{user?.name}</Heading>
                  <Text size="2" className="text-text-muted block">{user.email}</Text>
                  <Badge size="2" color="indigo" variant="soft" className="rounded-full mt-1.5">
                    <Sparkles size={12} className="mr-1 inline animate-pulse" />
                    {roleLabel(user.role)}
                  </Badge>
                </Box>
              </Flex>
            </Card>
          </Box>
          <Box className="flex-1 space-y-6">
            <Tabs.Root defaultValue="company">
              <Tabs.List className="border-b border-card-border">
                <Tabs.Trigger value="company" className="cursor-pointer font-semibold text-sm">Company Settings</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="company">
                <div className="mt-4">
                  <CompanyDetailTab />
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </Box>
        </Flex>
      ) : (
        // PREMIUM CANDIDATE DASHBOARD LAYOUT (All Info Grid)
        <Flex gap="6" className="flex-col lg:flex-row relative z-10 items-start">
          
          {/* LEFT SIDEBAR: Avatar, S3 PDF, Contact, Skills */}
          <Box className="w-full lg:w-[340px] space-y-6 shrink-0">
            
            {/* 1. Profile Avatar Card with S3 Hover Upload overlay */}
            <Card className="p-6 border border-card-border bg-card-bg/70 backdrop-blur-md shadow-lg rounded-2xl hover:border-indigo-500/20 transition-all duration-300">
              <Flex direction="column" align="center" className="text-center gap-4">
                
                {/* Interactive Avatar Wrapper */}
                <div className="relative group w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-500/10 hover:border-indigo-500/40 transition duration-300 shadow-xl bg-background flex items-center justify-center">
                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                      <span className="w-6 h-6 border-2 border-t-transparent border-indigo-400 rounded-full animate-spin" />
                    </div>
                  )}
                  <Avatar
                    size="8"
                    src={profileImageUrl || undefined}
                    fallback={
                      typeof user?.name === "string" && user.name.length > 0
                        ? user.name[0].toUpperCase()
                        : "U"
                    }
                    radius="full"
                    className="w-full h-full text-2xl font-bold bg-indigo-soft/10 text-indigo-600 dark:text-indigo-400 object-cover"
                  />
                  
                  {/* S3 Hover Overlay trigger */}
                  <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-white z-10 text-[10px] font-semibold gap-1.5">
                    <Camera size={18} className="text-indigo-400 animate-pulse" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>

                <Box className="space-y-1 w-full">
                  <Heading size="5" className="text-foreground tracking-tight">{user?.name}</Heading>
                  <Text size="2" className="text-text-muted block truncate mb-1">{user?.email}</Text>
                  
                  <Badge size="2" color="indigo" variant="soft" className="rounded-full py-0.5 px-3">
                    <Sparkles size={11} className="mr-1.5 inline animate-pulse text-indigo-500" />
                    {roleLabel(user?.role)}
                  </Badge>
                </Box>
              </Flex>
            </Card>

            {/* 2. S3 PDF Resume Card */}
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
              <Heading size="3" className="text-foreground flex items-center gap-2 border-b border-card-border/50 pb-2">
                <FileText size={16} className="text-indigo-500" />
                <span>Resume PDF</span>
              </Heading>
              
              {resumePdfUrl ? (
                <div className="space-y-3">
                  <Flex align="center" gap="2" className="bg-indigo-soft/5 p-3 rounded-xl border border-indigo-500/10">
                    <FileText className="text-indigo-500 shrink-0" size={24} />
                    <Box className="overflow-hidden flex-1">
                      <Text size="2" weight="medium" className="text-foreground truncate block">
                        {resumePdfName || "resume.pdf"}
                      </Text>
                      <a
                        href={resumePdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 text-xs font-semibold hover:underline block mt-0.5"
                      >
                        Download PDF
                      </a>
                    </Box>
                  </Flex>
                  <label className="block">
                    <span className="text-xs text-text-muted cursor-pointer hover:text-indigo-500 hover:border-indigo-500/30 transition block text-center border border-dashed border-card-border rounded-xl p-2.5 bg-background/30">
                      {uploadingPdf ? "Uploading..." : "Replace PDF Resume"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      disabled={uploadingPdf}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="text-center py-2 space-y-3">
                  <Flex direction="column" align="center" gap="2" className="border border-dashed border-card-border rounded-xl p-4 bg-background/20">
                    <UploadCloud className="text-text-muted animate-pulse" size={28} />
                    <Text size="1" className="text-text-muted">No resume uploaded (PDF only)</Text>
                  </Flex>
                  <label className="block w-full">
                    <span className="w-full text-center block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2 px-4 rounded-xl cursor-pointer transition-colors shadow-md">
                      {uploadingPdf ? "Uploading..." : "Upload Resume PDF"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      disabled={uploadingPdf}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </Card>

            {/* 3. Contact Info Card */}
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
              <Heading size="3" className="text-foreground flex items-center gap-2 border-b border-card-border/50 pb-2">
                <User size={16} className="text-indigo-500" />
                <span>Contact Details</span>
              </Heading>
              <div className="space-y-3.5">
                <Flex align="center" gap="3">
                  <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                  <Text size="2" className="text-text-muted truncate">{phone || "Phone not set"}</Text>
                </Flex>
                <Flex align="center" gap="3">
                  <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                  <Text size="2" className="text-text-muted truncate">{user?.email}</Text>
                </Flex>
                <Flex align="center" gap="3">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <Text size="2" className="text-text-muted truncate">{location || "Location not set"}</Text>
                </Flex>
                <Flex align="center" gap="3">
                  <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
                  {website ? (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 text-sm font-semibold hover:underline flex items-center gap-1 overflow-hidden truncate"
                    >
                      <span className="truncate">{website.replace(/^https?:\/\//, "")}</span>
                      <ExternalLink size={10} className="shrink-0" />
                    </a>
                  ) : (
                    <Text size="2" className="text-text-muted">Website not set</Text>
                  )}
                </Flex>
              </div>
            </Card>

            {/* 4. Skills Stack Card */}
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
              <Heading size="3" className="text-foreground flex items-center gap-2 border-b border-card-border/50 pb-2">
                <Star size={16} className="text-indigo-500" />
                <span>Skills Stack</span>
              </Heading>
              {skills.length > 0 ? (
                <Flex gap="2" wrap="wrap">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      size="2"
                      color="gray"
                      variant="surface"
                      className="rounded-lg font-medium px-2.5 py-1 text-xs border border-card-border/40"
                    >
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              ) : (
                <Text size="1" className="text-text-muted italic">No skills listed yet.</Text>
              )}
            </Card>

          </Box>

          {/* RIGHT DETAILS COLUMN: Welcome Header, Summary, Experience, Education, Projects */}
          <Box className="flex-1 space-y-6 w-full">
            
            {/* A. Welcome Banner Header Card */}
            <Card className="p-6 border border-card-border bg-card-bg/70 backdrop-blur-md shadow-lg rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <Flex justify="between" align="center" className="flex-wrap gap-4">
                <Box className="space-y-1.5">
                  <Text size="1" className="text-indigo-500 font-bold uppercase tracking-wider">CANDIDATE DASHBOARD</Text>
                  <Heading size="6" className="text-foreground tracking-tight font-extrabold">{user?.name}</Heading>
                  <Text size="3" weight="bold" className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent block">
                    {title || "Set Professional Title"}
                  </Text>
                </Box>
                
                {/* Actions */}
                <Flex gap="2.5" align="center" className="shrink-0">
                  <Button
                    variant="soft"
                    color="purple"
                    onClick={() => setIsAiModalOpen(true)}
                    className="cursor-pointer flex items-center gap-1.5 rounded-xl font-semibold shadow-sm px-4 py-2 hover:bg-purple-500/10 transition-colors"
                  >
                    <Sparkles size={14} className="text-purple-500" /> AI Coach
                  </Button>
                  <Button
                    variant="solid"
                    color="indigo"
                    onClick={() => setIsEditModalOpen(true)}
                    className="cursor-pointer flex items-center gap-1.5 rounded-xl font-semibold shadow-md px-4 py-2 hover:bg-indigo-700 transition-all duration-300"
                  >
                    <Edit3 size={14} /> Edit Profile
                  </Button>
                </Flex>
              </Flex>
            </Card>

            {/* B. Summary Card */}
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-3">
              <Heading size="4" className="text-foreground border-b border-card-border/50 pb-2 flex items-center gap-2">
                <User size={18} className="text-indigo-500" />
                <span>Professional Summary</span>
              </Heading>
              <Text size="2" className="text-text-muted leading-relaxed block whitespace-pre-line">
                {summary || "Add a summary in profile editor to introduce your capabilities to employers."}
              </Text>
            </Card>

            {/* C. Work Experience Timeline Card */}
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
              <Heading size="4" className="text-foreground border-b border-card-border/50 pb-2 flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-500" />
                <span>Work Experience</span>
              </Heading>
              
              {experiences.length > 0 ? (
                <div className="space-y-6 relative pl-4 border-l border-card-border/60 ml-2 mt-2">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="relative space-y-1">
                      {/* Timeline dot */}
                      <span className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-background ring-4 ring-indigo-500/10" />
                      <Heading size="3" className="text-foreground font-bold tracking-tight text-sm sm:text-base">
                        {exp.role}
                      </Heading>
                      <Text size="2" className="text-indigo-500 font-semibold block">
                        {exp.company}
                      </Text>
                      <Text size="1" className="text-text-muted block font-medium">
                        {exp.duration}
                      </Text>
                    </div>
                  ))}
                </div>
              ) : (
                <Text size="2" className="text-text-muted italic">No professional experiences listed yet.</Text>
              )}
            </Card>

            {/* D. Education (College / University) Card */}
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
              <Heading size="4" className="text-foreground border-b border-card-border/50 pb-2 flex items-center gap-2">
                <GraduationCap size={18} className="text-indigo-500" />
                <span>Education (College / University)</span>
              </Heading>
              
              {educations.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {educations.map((edu, idx) => (
                    <Box
                      key={idx}
                      className="p-4 bg-background/20 border border-card-border/50 rounded-xl space-y-1.5 hover:border-indigo-500/25 transition-all duration-300"
                    >
                      <Heading size="3" className="text-foreground font-bold text-sm sm:text-base">{edu.degree}</Heading>
                      <Text size="2" className="text-indigo-500 font-medium block">{edu.school}</Text>
                      <Text size="1" className="text-text-muted block">{edu.year}</Text>
                    </Box>
                  ))}
                </div>
              ) : (
                <Text size="2" className="text-text-muted italic">No education history listed yet.</Text>
              )}
            </Card>

            {/* E. Portfolio Projects Card */}
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
              <Heading size="4" className="text-foreground border-b border-card-border/50 pb-2 flex items-center gap-2">
                <FolderGit2 size={18} className="text-indigo-500" />
                <span>Portfolio Projects</span>
              </Heading>
              
              {projects.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {projects.map((proj, idx) => (
                    <Box
                      key={idx}
                      className="p-5 bg-background/25 border border-card-border rounded-xl flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 group hover:shadow-md"
                    >
                      <div className="space-y-2">
                        <Heading size="3" className="text-foreground group-hover:text-indigo-500 transition-colors font-extrabold text-sm sm:text-base">
                          {proj.name}
                        </Heading>
                        <Text size="2" className="text-text-muted leading-relaxed block">
                          {proj.description}
                        </Text>
                      </div>
                      {proj.link && (
                        <div className="mt-4">
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-500 text-xs font-bold hover:underline"
                          >
                            <span>View Live Project</span>
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      )}
                    </Box>
                  ))}
                </div>
              ) : (
                <Text size="2" className="text-text-muted italic">No portfolio projects listed yet.</Text>
              )}
            </Card>

          </Box>
        </Flex>
      )}

      {/* Edit Profile Modal Dialog */}
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
