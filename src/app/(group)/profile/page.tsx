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
  TextField,
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
  Save,
  X,
  Plus,
  Trash2,
  FileText,
  UploadCloud,
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import CompanyDetailTab from "@/components/CompanyDetailTab";
import Loading from "@/components/lodingstate/Loading";
import { useToast } from "@/context/ToastContext";
import { roleLabel, isEmployer } from "@/lib/roles";
import AIResumeImproveModal from "@/components/AIResumeImproveModal";

type ExperienceEntry = { role: string; company: string; duration: string };

function parseExperience(raw: string): ExperienceEntry {
  try {
    return JSON.parse(raw) as ExperienceEntry;
  } catch {
    return { role: raw, company: "", duration: "" };
  }
}

export default function ProfilePage() {
  const { user, company } = useContext(UserContext);
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
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
  const [newSkill, setNewSkill] = useState("");
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [newRole, setNewRole] = useState("");
  const [newComp, setNewComp] = useState("");
  const [newDur, setNewDur] = useState("");

  useEffect(() => {
    if (user?.name) {
      document.title = `${user.name}'s Profile | Jobzz`;
    } else {
      document.title = "User Profile | Jobzz";
    }
  }, [user]);

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
        }
      } catch {
        toast("Could not load profile.", "error");
      }
    }
    loadResume();
  }, [user, toast]);

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

  async function handleSave() {
    if (!user?.id) return;
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
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsEditing(false);
        toast("Profile saved successfully!", "success");
      } else {
        toast(data.message || "Failed to save profile.", "error");
      }
    } catch {
      toast("Failed to save profile.", "error");
    }
  }

  // Handle skills manipulations
  function addSkill() {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  }

  function removeSkill(skillToRemove: string) {
    setSkills(skills.filter((s) => s !== skillToRemove));
  }

  // Handle experiences manipulations
  function addExperience() {
    if (newRole.trim() && newComp.trim()) {
      setExperiences([
        ...experiences,
        { role: newRole.trim(), company: newComp.trim(), duration: newDur.trim() || "2024" }
      ]);
      setNewRole("");
      setNewComp("");
      setNewDur("");
    }
  }

  function removeExperience(index: number) {
    setExperiences(experiences.filter((_, i) => i !== index));
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
          <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
            <Heading size="3" className="text-foreground border-b border-card-border/50 pb-2">Experience</Heading>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <Flex key={idx} justify="between" align="start" className="group">
                  <Box className="space-y-0.5">
                    <Text className="font-semibold text-foreground text-sm block">{exp.role}</Text>
                    <Text size="1" className="text-text-muted block">{exp.company} · {exp.duration}</Text>
                  </Box>
                  {isEditing && (
                    <button
                      onClick={() => removeExperience(idx)}
                      className="text-red-500 hover:text-red-600 cursor-pointer transition opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </Flex>
              ))}
            </div>

            {isEditing && (
              <Box className="space-y-2 pt-3 border-t border-card-border/50">
                <Text size="1" weight="bold" className="text-text-muted block">ADD EXPERIENCE</Text>
                <TextField.Root
                  placeholder="Role (e.g. Lead Engineer)"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  size="1"
                />
                <TextField.Root
                  placeholder="Company"
                  value={newComp}
                  onChange={(e) => setNewComp(e.target.value)}
                  size="1"
                />
                <TextField.Root
                  placeholder="Duration (e.g. 2022 - 2024)"
                  value={newDur}
                  onChange={(e) => setNewDur(e.target.value)}
                  size="1"
                />
                <Button size="1" color="indigo" onClick={addExperience} className="w-full cursor-pointer mt-1">
                  <Plus size={12} /> Add Experience
                </Button>
              </Box>
            )}
          </Card>

          {/* Skills Card */}
          <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
            <Heading size="3" className="text-foreground border-b border-card-border/50 pb-2">Skills</Heading>
            <Flex gap="2" wrap="wrap">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  size="2"
                  color="gray"
                  variant="surface"
                  className="rounded-md flex items-center gap-1 group"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-red-500 hover:text-red-600 cursor-pointer ml-1 text-xs"
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </Flex>

            {isEditing && (
              <Flex gap="2" className="pt-2 border-t border-card-border/50">
                <TextField.Root
                  placeholder="Add Skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  size="1"
                  className="flex-1"
                />
                <Button size="1" onClick={addSkill} color="indigo" className="cursor-pointer">
                  Add
                </Button>
              </Flex>
            )}
          </Card>
        </Box>

        {/* Right Column: Details & Editing tabs */}
        <Box className="flex-1 space-y-6">
          
          {/* Main Welcome & Header Card */}
          <Card className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
            <Flex justify="between" align="start">
              <Box className="space-y-1.5">
                {isEditing ? (
                  <div className="space-y-3">
                    <Text size="1" weight="bold" className="text-text-muted">PROFILE DETAILS</Text>
                    <TextField.Root
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      size="2"
                      className="w-full max-w-sm"
                    />
                    <TextField.Root
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      size="2"
                      className="w-full max-w-sm"
                    />
                  </div>
                ) : (
                  <>
                    <Heading size="6" className="text-foreground">{user?.name}</Heading>
                    <Text size="3" weight="medium" className="text-indigo-600 dark:text-indigo-400 block">
                      {title}
                    </Text>
                    <Text size="2" className="text-text-muted block">
                      <MapPin size={12} className="inline mr-1 text-red-500" />
                      {location}
                    </Text>
                  </>
                )}
              </Box>

              <Flex gap="2">
                {isEditing ? (
                  <>
                    <Button variant="soft" color="gray" onClick={() => setIsEditing(false)} className="cursor-pointer">
                      <X size={16} /> Cancel
                    </Button>
                    <Button variant="solid" color="indigo" onClick={handleSave} className="cursor-pointer">
                      <Save size={16} /> Save
                    </Button>
                  </>
                ) : (
                  <>
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
                    <Button variant="outline" color="indigo" onClick={() => setIsEditing(true)} className="cursor-pointer flex items-center gap-1">
                      <Edit3 size={16} /> Edit Profile
                    </Button>
                  </>
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
                      {isEditing ? (
                        <TextField.Root
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          size="2"
                          className="flex-1"
                        />
                      ) : (
                        <Text className="text-text-muted text-sm">{phone}</Text>
                      )}
                    </Flex>
                    <Flex align="center" gap="3">
                      <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                      <Text className="text-text-muted text-sm">{user?.email}</Text>
                    </Flex>
                    <Flex align="center" gap="3">
                      <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
                      {isEditing ? (
                        <TextField.Root
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          size="2"
                          className="flex-1"
                        />
                      ) : (
                        <a href={website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                          {website}
                        </a>
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
                    {isEditing ? (
                      <TextField.Root
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Short professional summary"
                      />
                    ) : (
                      <Text className="text-text-muted text-sm leading-relaxed">
                        {summary || "Add a summary to introduce yourself to employers."}
                      </Text>
                    )}
                    <Flex align="center" gap="3">
                      <Building2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <Text className="text-text-muted text-sm">
                        Company: {company?.name || "N/A"}
                      </Text>
                    </Flex>
                  </div>
                </Box>

              </Card>
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

      <AIResumeImproveModal
        isOpen={isAiModalOpen}
        setIsOpen={setIsAiModalOpen}
        onApplySummary={(s) => { setSummary(s); setIsEditing(true); }}
        onApplySkills={(newSkills) => {
          setSkills((prev) => [...new Set([...prev, ...newSkills])]);
          setIsEditing(true);
        }}
      />
    </main>
  );
}
