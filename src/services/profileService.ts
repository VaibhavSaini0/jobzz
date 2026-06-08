/**
 * Profile and Resume client service for encapsulated API requests.
 */

export interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  year: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  link: string;
}

export interface ProfileData {
  id?: string;
  userId?: string;
  title?: string;
  location?: string;
  phone?: string;
  website?: string;
  summary?: string;
  resumePdfUrl?: string;
  resumePdfName?: string;
  profileImageUrl?: string;
  skills?: string[];
  experiences?: string[];
  educations?: string[];
  projects?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const profileService = {
  /**
   * Fetches the current user's profile and resume details.
   */
  async getProfile(): Promise<{ success: boolean; data?: ProfileData; message?: string }> {
    const res = await fetch("/api/profile/resume");
    return res.json();
  },

  /**
   * Updates the candidate's profile/resume fields.
   */
  async updateProfile(updates: Partial<Omit<ProfileData, "experiences" | "educations" | "projects">> & {
    experiences?: string[];
    educations?: string[];
    projects?: string[];
  }): Promise<{ success: boolean; data?: ProfileData; message?: string }> {
    const res = await fetch("/api/profile/resume", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  /**
   * Uploads a candidate's resume PDF file.
   */
  async uploadResumePdf(file: File): Promise<{ success: boolean; data?: ProfileData; message?: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/profile/resume/upload", {
      method: "POST",
      body: formData,
    });
    return res.json();
  },

  /**
   * Uploads a candidate's profile image file.
   */
  async uploadProfileImage(file: File): Promise<{ success: boolean; data?: { profileImageUrl: string }; message?: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/profile/resume/upload-image", {
      method: "POST",
      body: formData,
    });
    return res.json();
  },
};
