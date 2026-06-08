/**
 * Company client service for encapsulated API requests.
 */
export const companyService = {
  /**
   * Fetches rich company profile details.
   */
  async getCompanyProfile(companyId: string) {
    const res = await fetch(`/api/company/profile/${companyId}`);
    return res.json();
  },

  /**
   * Fetches all jobs posted by the company.
   */
  async getCompanyJobs() {
    const res = await fetch("/api/company/jobs");
    return res.json();
  },

  /**
   * Fetches all applications submitted to the company's jobs.
   */
  async getCompanyApplications() {
    const res = await fetch("/api/company/applications");
    return res.json();
  },

  /**
   * Fetches candidate applications for a specific job ID.
   */
  async getJobApplicants(jobId: string) {
    const res = await fetch(`/api/applicants/${jobId}`);
    return res.json();
  },

  /**
   * Updates a candidate's application pipeline status and review notes.
   */
  async updateApplicationStatus(applicationId: string, status: string, statusNote?: string) {
    const res = await fetch(`/api/applications/${applicationId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, statusNote }),
    });
    return res.json();
  },

  /**
   * Deletes a posted job from the company catalog.
   */
  async deleteJob(jobId: string) {
    const res = await fetch("/api/company/jobs/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job: { id: jobId } }),
    });
    return res.json();
  },
};
