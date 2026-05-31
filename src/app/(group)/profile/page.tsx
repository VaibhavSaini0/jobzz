"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Tabs,
  Text,
  Badge,
} from "@radix-ui/themes";
import {
  Mail,
  User,
  Star,
  Phone,
  Globe,
  Calendar,
  MapPin,
  Building2,
  Sparkles,
  Edit3,
  FileText,
  UploadCloud,
  GraduationCap,
  FolderGit2,
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
  const [uploadingPdf, setUploadingPdf] = useState(false);
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

  return (
    <main className="max-w-6xl mx-auto py-10 px-4 min-h-screen text-foreground relative">
      {/* Dynamic Glow Blobs */}
      <div className="absolute top-[-5%] left-[10%] w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <Flex gap="8" className="flex-col md:flex-row relative z-10">
        
        {/* Left Column: Avatar & Skills */}
        <Box className="w-full md:w-80 space-y-6">
          
          {/* Main User Card */}
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
                
                {/* Dynamically Styled Developer Tag */}
                <Badge size="2" color="indigo" variant="soft" className="rounded-full mt-1.5">
                  <Sparkles size={12} className="mr-1 inline animate-pulse" />
                  {roleLabel(user.role)}
                </Badge>
              </Box>

              <Separator size="4" className="my-2 bg-card-border opacity-30" />

              <Flex justify="center" gap="1" className="text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </Flex>
            </Flex>
          </Card>

          {/* Resume PDF Card (Candidate Only) */}
          {!isEmployer(user?.role) && (
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
              <Heading size="3" className="text-foreground border-b border-card-border/50 pb-2">Resume PDF</Heading>
              
              {resumePdfUrl ? (
                <div className="space-y-3">
                  <Flex align="center" gap="2" className="bg-indigo-soft/10 p-3 rounded-lg border border-indigo-500/20">
                    <FileText className="text-indigo-600 dark:text-indigo-400" size={24} />
                    <Box className="overflow-hidden flex-1">
                      <Text size="2" weight="medium" className="text-foreground truncate block">
                        {resumePdfName || "resume.pdf"}
                      </Text>
                      <a
                        href={resumePdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 text-xs hover:underline"
                      >
                        Download PDF
                      </a>
                    </Box>
                  </Flex>
                  <label className="block">
                    <span className="text-xs text-text-muted cursor-pointer hover:text-indigo-600 transition block text-center border border-dashed border-card-border rounded-lg p-2 bg-background/50">
                      {uploadingPdf ? "Uploading..." : "Replace Resume PDF"}
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
                <div className="text-center py-4 space-y-3">
                  <Flex direction="column" align="center" gap="2" className="border border-dashed border-card-border rounded-xl p-4 bg-background/40">
                    <UploadCloud className="text-text-muted animate-pulse" size={32} />
                    <Text size="1" className="text-text-muted">No resume uploaded yet (PDF only)</Text>
                  </Flex>
                  <label className="block w-full">
                    <span className="w-full text-center block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2 px-4 rounded-lg cursor-pointer transition">
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
          )}

          {/* Experience / Work Card */}
          {experiences.length > 0 && (
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
              <Heading size="3" className="text-foreground border-b border-card-border/50 pb-2">Experience</Heading>
              <div className="space-y-3">
                {experiences.map((exp, idx) => (
                  <Flex key={idx} justify="between" align="start" className="group">
                    <Box className="space-y-0.5">
                      <Text className="font-semibold text-foreground text-sm block">{exp.role}</Text>
                      <Text size="1" className="text-text-muted block">{exp.company} · {exp.duration}</Text>
                    </Box>
                  </Flex>
                ))}
              </div>
            </Card>
          )}

          {/* Education Card (Candidate Only) */}
          {!isEmployer(user?.role) && educations.length > 0 && (
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
              <Heading size="3" className="text-foreground border-b border-card-border/50 pb-2">
                <Flex align="center" gap="2">
                  <GraduationCap size={18} className="text-indigo-500" />
                  <span>Education</span>
                </Flex>
              </Heading>
              <div className="space-y-3">
                {educations.map((edu, idx) => (
                  <Box key={idx} className="space-y-0.5">
                    <Text className="font-semibold text-foreground text-sm block">{edu.degree}</Text>
                    <Text size="1" className="text-text-muted block">{edu.school} · {edu.year}</Text>
                  </Box>
                ))}
              </div>
            </Card>
          )}

          {/* Skills Card */}
          {skills.length > 0 && (
            <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
              <Heading size="3" className="text-foreground border-b border-card-border/50 pb-2">Skills</Heading>
              <Flex gap="2" wrap="wrap">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    size="2"
                    color="gray"
                    variant="surface"
                    className="rounded-md"
                  >
                    <span>{skill}</span>
                  </Badge>
                ))}
              </Flex>
            </Card>
          )}
        </Box>

        {/* Right Column: Details & Editing tabs */}
        <Box className="flex-1 space-y-6">
          
          {/* Main Welcome & Header Card */}
          <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
            <Flex justify="between" align="start">
               <Box className="space-y-1.5">
                <Heading size="6" className="text-foreground">{user?.name}</Heading>
                <Text size="3" weight="medium" className="text-indigo-600 dark:text-indigo-400 block">
                  {title || "Set Your Professional Title"}
                </Text>
                <Text size="2" className="text-text-muted block">
                  <MapPin size={12} className="inline mr-1 text-red-500" />
                  {location || "Location not set"}
                </Text>
              </Box>

              <Flex gap="2">
                {!isEmployer(user?.role) && (
                  <Button
                    variant="soft"
                    color="purple"
                    onClick={() => setIsAiModalOpen(true)}
                    className="cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles size={16} /> AI Coach
                  </Button>
                )}
                {!isEmployer(user?.role) && (
                  <Button
                    variant="outline"
                    color="indigo"
                    onClick={() => setIsEditModalOpen(true)}
                    className="cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 size={16} /> Edit Profile
                  </Button>
                )}
              </Flex>
            </Flex>
          </Card>

          {/* Interactive Info Tabs */}
          <Tabs.Root defaultValue="about">
            <Tabs.List className="border-b border-card-border">
              <Tabs.Trigger value="about" className="cursor-pointer font-semibold text-sm">About Details</Tabs.Trigger>
              {isEmployer(user?.role) && (
                <Tabs.Trigger value="company" className="cursor-pointer font-semibold text-sm">Company Settings</Tabs.Trigger>
              )}
            </Tabs.List>

            <Tabs.Content value="about">
              <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm grid md:grid-cols-2 gap-8 mt-4 rounded-2xl">
                
                {/* Contact Info Column */}
                <Box className="space-y-4">
                  <Heading size="4" className="text-foreground border-b border-card-border/50 pb-2">
                    Contact Info
                  </Heading>
                  <div className="space-y-3">
                    <Flex align="center" gap="3">
                      <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                      <Text className="text-text-muted text-sm">{phone || "Phone not set"}</Text>
                    </Flex>
                    <Flex align="center" gap="3">
                      <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                      <Text className="text-text-muted text-sm">{user?.email}</Text>
                    </Flex>
                    <Flex align="center" gap="3">
                      <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
                      {website ? (
                        <a href={website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                          {website}
                        </a>
                      ) : (
                        <Text className="text-text-muted text-sm">Website not set</Text>
                      )}
                    </Flex>
                  </div>
                </Box>

                {/* About Column */}
                <Box className="space-y-4">
                  <Heading size="4" className="text-foreground border-b border-card-border/50 pb-2">
                    About
                  </Heading>
                  <div className="space-y-3">
                    <Text className="text-text-muted text-sm leading-relaxed">
                      {summary || "Add a summary to introduce yourself to employers."}
                    </Text>
                    <Flex align="center" gap="3">
                      <Building2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <Text className="text-text-muted text-sm">
                        Company: {company?.name || "N/A"}
                      </Text>
                    </Flex>
                  </div>
                </Box>

              </Card>

              {/* Projects Card (Candidate Only) */}
              {!isEmployer(user?.role) && projects.length > 0 && (
                <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 space-y-4 mt-6 rounded-2xl">
                  <Heading size="4" className="text-foreground border-b border-card-border/50 pb-2">
                    <Flex align="center" gap="2">
                      <FolderGit2 size={20} className="text-indigo-500" />
                      <span>Portfolio Projects</span>
                    </Flex>
                  </Heading>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {projects.map((proj, idx) => (
                      <Box key={idx} className="p-4 bg-background/30 border border-card-border rounded-xl space-y-2 hover:border-indigo-500/20 transition-colors">
                        <Heading size="3" className="text-foreground">{proj.name}</Heading>
                        <Text size="2" className="text-text-muted block leading-relaxed">{proj.description}</Text>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:underline"
                          >
                            View Project
                          </a>
                        )}
                      </Box>
                    ))}
                  </div>
                </Card>
              )}
            </Tabs.Content>
            
            {isEmployer(user?.role) && (
              <Tabs.Content value="company">
                <div className="mt-4">
                  <CompanyDetailTab />
                </div>
              </Tabs.Content>
            )}
          </Tabs.Root>
        </Box>
      </Flex>

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
