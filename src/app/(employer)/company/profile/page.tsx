"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loading from "@/components/lodingstate/Loading";
import AboutCompany from "@/components/AboutCompany";
import { isEmployer } from "@/lib/roles";
import { Building2 } from "lucide-react";

// Modular sub-components
import CompanyHeader from "@/components/company/CompanyHeader";
import CompanyContactsCard from "@/components/company/CompanyContactsCard";
import CompanyStatsGrid from "@/components/company/CompanyStatsGrid";
import RecruitingTeamTab from "@/components/company/RecruitingTeamTab";
import CompanyJobCard from "@/components/cards/CompanyJobCard";
import Compreviews from "@/components/Compreviews";

// Reusable Service
import { companyService } from "@/services/companyService";

// Modals
import EditCompanyModal from "@/components/modals/EditCompanyModal";
import AddEmployerModal from "@/components/modals/AddEmployerModal";

type Teammate = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type CompanyWithRelations = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  website: string | null;
  location: string | null;
  logoUrl: string | null;
  industry: string | null;
  companySize: string | null;
  founded: string | null;
  phone: string | null;
  email: string | null;
  jobs: any[] | null;
  review: any[] | null;
  employers: Teammate[] | null;
};

export default function Page() {
  const router = useRouter();
  const { user, company, isuserLoading } = useContext(UserContext);
  const [Jobcompany, setJobCompany] = useState<CompanyWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState<"about" | "jobopening" | "reviews" | "team">("about");

  // Modals visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddEmployerOpen, setIsAddEmployerOpen] = useState(false);

  useEffect(() => {
    if (!isuserLoading && user && !isEmployer(user.role)) {
      router.push("/profile");
    }
  }, [user, isuserLoading, router]);

  useEffect(() => {
    if (!company?.id) {
      setIsLoading(false);
      return;
    }

    async function fetchCompany() {
      setIsLoading(true);
      try {
        const data = await companyService.getCompanyProfile(company!.id);
        if (data.success) {
          setJobCompany(data.data as CompanyWithRelations);
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompany();
  }, [company?.id, reloadTrigger]);

  if (isuserLoading || isLoading) {
    return <Loading />;
  }

  if (!company) {
    return (
      <main className="max-w-4xl mx-auto py-20 px-6 text-center space-y-6 relative min-h-[70vh] flex flex-col items-center justify-center">
        {/* Background glows */}
        <div className="absolute top-[-10%] left-[10%] w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

        <div className="p-8 border border-card-border bg-card-bg/60 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-xl space-y-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-2xl mx-auto border border-indigo-500/20">
            <Building2 size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            No Company Registered Yet
          </h1>
          <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
            To start posting jobs, reviewing developer applications, and managing your team, please register your company first using the <strong>Add Company</strong> button in the navigation header.
          </p>
        </div>
      </main>
    );
  }

  // Count metrics
  const activeJobsCount = Jobcompany?.jobs?.length || 0;
  const reviewCount = Jobcompany?.review?.length || 0;
  const teamCount = (Jobcompany?.employers?.length || 0) + 1; // including primary owner

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 text-foreground relative min-h-screen">
      {/* Dynamic Cover Header Banner Component */}
      <CompanyHeader
        company={Jobcompany}
        onInviteRecruiter={() => setIsAddEmployerOpen(true)}
        onEditSettings={() => setIsEditModalOpen(true)}
      />

      {/* Metrics Statistics Grid Component */}
      <CompanyStatsGrid
        activeJobsCount={activeJobsCount}
        reviewCount={reviewCount}
        teamCount={teamCount}
      />

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 relative z-10 items-start">
        {/* Left Column Contacts Component */}
        <div className="w-full lg:w-[320px] space-y-6 shrink-0">
          <CompanyContactsCard
            location={Jobcompany?.location || null}
            website={Jobcompany?.website || null}
            email={Jobcompany?.email || null}
            phone={Jobcompany?.phone || null}
          />
        </div>

        {/* Right Column Workspace Tabs */}
        <div className="flex-1 space-y-6 w-full">
          <div className="border-b border-card-border/60 flex gap-6 overflow-x-auto scrollbar-hidden">
            {[
              { id: "about", label: "About Profile" },
              { id: "jobopening", label: "Active Job Openings" },
              { id: "reviews", label: "Developer Reviews" },
              { id: "team", label: "Recruiting Team" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`cursor-pointer pb-3 text-sm font-bold border-b-2 transition-all duration-200 whitespace-nowrap active:scale-[0.98] ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-500"
                    : "border-transparent text-text-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-card-bg/50 border border-card-border p-6 rounded-2xl shadow-sm">
            {/* Trigger 1: About */}
            {activeTab === "about" && (
              <AboutCompany company={Jobcompany} isLoading={false} />
            )}

            {/* Trigger 2: Job Openings */}
            {activeTab === "jobopening" && (
              <div>
                {Jobcompany?.jobs && Jobcompany.jobs.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-4">
                      {Jobcompany.jobs.map((job) => (
                        <CompanyJobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-2 border border-dashed border-card-border/70 rounded-2xl">
                    <span className="text-sm text-text-muted">No Jobs Created Yet</span>
                  </div>
                )}
              </div>
            )}

            {/* Trigger 3: Reviews */}
            {activeTab === "reviews" && Jobcompany?.id && (
              <Compreviews companyId={Jobcompany.id} isloading={false} />
            )}

            {/* Trigger 4: Recruiting Team Component */}
            {activeTab === "team" && (
              <RecruitingTeamTab
                ownerId={Jobcompany?.ownerId}
                employers={Jobcompany?.employers}
              />
            )}
          </div>
        </div>
      </div>

      {/* Edit Settings Modal */}
      {Jobcompany && (
        <EditCompanyModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          companyId={Jobcompany.id}
          initialData={{
            name: Jobcompany.name,
            description: Jobcompany.description,
            website: Jobcompany.website || "",
            location: Jobcompany.location || "",
            logoUrl: Jobcompany.logoUrl || "",
            industry: Jobcompany.industry || "",
            companySize: Jobcompany.companySize || "",
            founded: Jobcompany.founded || "",
            phone: Jobcompany.phone || "",
            email: Jobcompany.email || "",
          }}
          onSaveSuccess={() => setReloadTrigger((prev) => prev + 1)}
        />
      )}

      {/* Invite Teammate Modal */}
      <AddEmployerModal
        isOpen={isAddEmployerOpen}
        setIsOpen={setIsAddEmployerOpen}
        onSuccess={() => setReloadTrigger((prev) => prev + 1)}
      />
    </div>
  );
}
