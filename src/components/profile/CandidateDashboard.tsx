"use client";

import {
  Mail,
  User,
  Star,
  Phone,
  Globe,
  MapPin,
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
import { roleLabel } from "@/lib/roles";
import {
  type ExperienceEntry,
  type EducationEntry,
  type ProjectEntry,
} from "@/services/profileService";

interface CandidateDashboardProps {
  user: any;
  title: string;
  location: string;
  phone: string;
  website: string;
  summary: string;
  skills: string[];
  experiences: ExperienceEntry[];
  educations: EducationEntry[];
  projects: ProjectEntry[];
  resumePdfUrl: string;
  resumePdfName: string;
  profileImageUrl: string;
  uploadingPdf: boolean;
  uploadingImage: boolean;
  handlePdfUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsEditModalOpen: (open: boolean) => void;
  setIsAiModalOpen: (open: boolean) => void;
}

export default function CandidateDashboard({
  user,
  title,
  location,
  phone,
  website,
  summary,
  skills,
  experiences,
  educations,
  projects,
  resumePdfUrl,
  resumePdfName,
  profileImageUrl,
  uploadingPdf,
  uploadingImage,
  handlePdfUpload,
  handleImageUpload,
  setIsEditModalOpen,
  setIsAiModalOpen,
}: CandidateDashboardProps) {
  return (
    <div className="flex flex-col lg:flex-row relative z-10 items-start gap-6 w-full animate-fadeIn">
      
      {/* LEFT SIDEBAR: Avatar, S3 PDF, Contact, Skills */}
      <div className="w-full lg:w-[340px] space-y-6 shrink-0">
        
        {/* 1. Profile Avatar Card with S3 Hover Upload overlay */}
        <div className="p-6 border border-card-border bg-card-bg/70 backdrop-blur-md shadow-lg rounded-2xl hover:border-indigo-500/20 transition-all duration-300">
          <div className="flex flex-col items-center text-center gap-4">
            
            {/* Interactive Avatar Wrapper */}
            <div className="relative group w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-500/10 hover:border-indigo-500/40 transition duration-300 shadow-xl bg-background flex items-center justify-center">
              {uploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                  <span className="w-6 h-6 border-2 border-t-transparent border-indigo-400 rounded-full animate-spin" />
                </div>
              )}
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt={user?.name || "Avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-indigo-soft/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl uppercase">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
              )}
              
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

            <div className="space-y-1 w-full text-center">
              <h2 className="text-lg font-bold text-foreground tracking-tight m-0">{user?.name}</h2>
              <span className="text-xs text-text-muted block truncate mb-1">{user?.email}</span>
              
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <Sparkles size={11} className="mr-1.5 inline animate-pulse text-indigo-500" />
                {roleLabel(user?.role)}
              </span>
            </div>
          </div>
        </div>

        {/* 2. S3 PDF Resume Card */}
        <div className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2 border-b border-card-border/50 pb-2 m-0">
            <FileText size={16} className="text-indigo-500" />
            <span>Resume PDF</span>
          </h3>
          
          {resumePdfUrl ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-indigo-soft/5 p-3 rounded-xl border border-indigo-500/10">
                <FileText className="text-indigo-500 shrink-0" size={24} />
                <div className="overflow-hidden flex-1">
                  <span className="text-sm font-medium text-foreground truncate block">
                    {resumePdfName || "resume.pdf"}
                  </span>
                  <a
                    href={resumePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 text-xs font-semibold hover:underline block mt-0.5"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
              <label className="block">
                <span className="text-xs text-text-muted cursor-pointer hover:text-indigo-500 hover:border-indigo-500/30 transition block text-center border border-dashed border-card-border rounded-xl p-2.5 bg-background/30 font-medium">
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
              <div className="flex flex-col items-center gap-2 border border-dashed border-card-border rounded-xl p-4 bg-background/20">
                <UploadCloud className="text-text-muted animate-pulse" size={28} />
                <span className="text-xs text-text-muted">No resume uploaded (PDF only)</span>
              </div>
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
        </div>

        {/* 3. Contact Info Card */}
        <div className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2 border-b border-card-border/50 pb-2 m-0">
            <User size={16} className="text-indigo-500" />
            <span>Contact Details</span>
          </h3>
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="text-sm text-text-muted truncate">{phone || "Phone not set"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="text-sm text-text-muted truncate">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span className="text-sm text-text-muted truncate">{location || "Location not set"}</span>
            </div>
            <div className="flex items-center gap-3">
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
                <span className="text-sm text-text-muted">Website not set</span>
              )}
            </div>
          </div>
        </div>

        {/* 4. Skills Stack Card */}
        <div className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2 border-b border-card-border/50 pb-2 m-0">
            <Star size={16} className="text-indigo-500" />
            <span>Skills Stack</span>
          </h3>
          {skills.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-card-border/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-text-muted italic block">No skills listed yet.</span>
          )}
        </div>

      </div>

      {/* RIGHT DETAILS COLUMN: Welcome Header, Summary, Experience, Education, Projects */}
      <div className="flex-1 space-y-6 w-full">
        
        {/* A. Welcome Banner Header Card */}
        <div className="p-6 border border-card-border bg-card-bg/70 backdrop-blur-md shadow-lg rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-row justify-between items-center w-full flex-wrap gap-4">
            <div className="space-y-1.5 w-full md:w-auto text-left">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">CANDIDATE DASHBOARD</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground m-0">{user?.name}</h1>
              <span className="text-base font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent block mt-1">
                {title || "Set Professional Title"}
              </span>
            </div>
            
            {/* Actions */}
            <div className="flex gap-2.5 items-center shrink-0 w-full sm:w-auto justify-center sm:justify-start">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15 shadow-sm px-4 py-2 hover:bg-purple-500/20 transition-colors text-sm active:scale-[0.98]"
              >
                <Sparkles size={14} className="text-purple-500" /> AI Coach
              </button>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md px-4 py-2 transition-all text-sm active:scale-[0.98]"
              >
                <Edit3 size={14} /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* B. Summary Card */}
        <div className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-foreground border-b border-card-border/50 pb-2 flex items-center gap-2 m-0">
            <User size={18} className="text-indigo-500" />
            <span>Professional Summary</span>
          </h3>
          <span className="text-sm text-text-muted leading-relaxed block whitespace-pre-line">
            {summary || "Add a summary in profile editor to introduce your capabilities to employers."}
          </span>
        </div>

        {/* C. Work Experience Timeline Card */}
        <div className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-foreground border-b border-card-border/50 pb-2 flex items-center gap-2 m-0">
            <Briefcase size={18} className="text-indigo-500" />
            <span>Work Experience</span>
          </h3>
          
          {experiences.length > 0 ? (
            <div className="space-y-6 relative pl-4 border-l border-card-border/60 ml-2 mt-2">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative space-y-1">
                  {/* Timeline dot */}
                  <span className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-background ring-4 ring-indigo-500/10" />
                  <h4 className="text-sm sm:text-base font-bold text-foreground tracking-tight m-0">
                    {exp.role}
                  </h4>
                  <span className="text-sm text-indigo-500 font-semibold block">
                    {exp.company}
                  </span>
                  <span className="text-xs text-text-muted block font-medium">
                    {exp.duration}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-sm text-text-muted italic block">No professional experiences listed yet.</span>
          )}
        </div>

        {/* D. Education (College / University) Card */}
        <div className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-foreground border-b border-card-border/50 pb-2 flex items-center gap-2 m-0">
            <GraduationCap size={18} className="text-indigo-500" />
            <span>Education (College / University)</span>
          </h3>
          
          {educations.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {educations.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-background/20 border border-card-border/50 rounded-xl space-y-1.5 hover:border-indigo-500/25 transition-all duration-300"
                >
                  <h4 className="text-sm sm:text-base font-bold text-foreground m-0">{edu.degree}</h4>
                  <span className="text-sm text-indigo-500 font-medium block">{edu.school}</span>
                  <span className="text-xs text-text-muted block">{edu.year}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-sm text-text-muted italic block">No education history listed yet.</span>
          )}
        </div>

        {/* E. Portfolio Projects Card */}
        <div className="p-6 border border-card-border bg-card-bg/60 backdrop-blur-sm shadow-sm rounded-2xl space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-foreground border-b border-card-border/50 pb-2 flex items-center gap-2 m-0">
            <FolderGit2 size={18} className="text-indigo-500" />
            <span>Portfolio Projects</span>
          </h3>
          
          {projects.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-background/25 border border-card-border rounded-xl flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 group hover:shadow-md"
                >
                  <div className="space-y-2">
                    <h4 className="text-sm sm:text-base font-extrabold text-foreground group-hover:text-indigo-500 transition-colors m-0">
                      {proj.name}
                    </h4>
                    <span className="text-sm text-text-muted leading-relaxed block">
                      {proj.description}
                    </span>
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
                </div>
              ))}
            </div>
          ) : (
            <span className="text-sm text-text-muted italic block">No portfolio projects listed yet.</span>
          )}
        </div>

      </div>
    </div>
  );
}
