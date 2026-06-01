"use client";

import {
  Box,
  Flex,
  Heading,
  Separator,
  Tabs,
  Text,
  Card,
  Avatar,
  Button,
  Badge,
  Grid,
} from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CompanyJobCard from "@/components/cards/CompanyJobCard";
import Compreviews from "@/components/Compreviews";
import { UserContext } from "@/context/UserContext";
import Loading from "@/components/lodingstate/Loading";
import AboutCompany from "@/components/AboutCompany";
import { isEmployer } from "@/lib/roles";
import {
  Building2,
  Sparkles,
  Globe,
  MapPin,
  Users,
  Edit3,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Star,
  ExternalLink,
} from "lucide-react";
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

  // Modals visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddEmployerOpen, setIsAddEmployerOpen] = useState(false);

  useEffect(() => {
    if (!isuserLoading && user && !isEmployer(user.role)) {
      router.push("/profile");
    }
  }, [user, isuserLoading, router]);

  useEffect(() => {
    async function fetchCompany() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/company/profile/${company?.id}`);
        const data = await res.json();

        if (data.success) {
          setJobCompany(data.data as CompanyWithRelations);
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (company?.id) {
      fetchCompany();
    }
  }, [company?.id, reloadTrigger]);

  if (isuserLoading || isLoading) {
    return <Loading />;
  }

  // Count metrics
  const activeJobsCount = Jobcompany?.jobs?.length || 0;
  const reviewCount = Jobcompany?.review?.length || 0;
  const teamCount = (Jobcompany?.employers?.length || 0) + 1; // including the primary owner

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 text-foreground relative min-h-screen">
      {/* Dynamic cover gradients */}
      <div className="absolute top-[-5%] left-[5%] w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />

      {/* TOP PREMIUM COVER BANNER */}
      <Box className="w-full relative z-10 mb-6">
        <div className="h-52 w-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl relative overflow-hidden shadow-lg border border-indigo-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          {/* Subtle micro grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Circular Logo overlap container */}
        <Flex gap="6" className="flex-col md:flex-row items-center md:items-end px-8 -mt-16 relative z-20">
          <div className="relative group w-32 h-32 rounded-3xl overflow-hidden border-4 border-background bg-card-bg shadow-xl hover:scale-[1.03] transition-all duration-300 flex items-center justify-center shrink-0">
            {Jobcompany?.logoUrl ? (
              <img
                src={Jobcompany.logoUrl}
                alt={Jobcompany.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-indigo-soft/10 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-3xl">
                {Jobcompany?.name ? Jobcompany.name[0].toUpperCase() : "C"}
              </div>
            )}
          </div>

          {/* Details header block */}
          <Flex justify="between" align="end" className="w-full flex-wrap gap-4 pb-2 text-center md:text-left">
            <Box className="space-y-1">
              <Heading size="7" className="text-foreground tracking-tight font-extrabold">
                {Jobcompany?.name || "Corporate Workspace"}
              </Heading>
              <Text size="3" className="text-indigo-500 font-semibold flex items-center gap-1.5 justify-center md:justify-start">
                <Building2 size={16} />
                {Jobcompany?.industry || "Software & Technology"}
              </Text>
            </Box>

            {/* CTA action buttons */}
            <Flex gap="3" align="center" className="shrink-0 justify-center w-full sm:w-auto mt-2 sm:mt-0">
              <Button
                variant="soft"
                color="purple"
                onClick={() => setIsAddEmployerOpen(true)}
                className="cursor-pointer flex items-center gap-1.5 rounded-xl font-semibold shadow-sm px-4 py-2 hover:bg-purple-500/10 transition-colors text-xs sm:text-sm"
              >
                <UserPlus size={14} className="text-purple-500" /> Invite Recruiter
              </Button>
              <Button
                variant="solid"
                color="indigo"
                onClick={() => setIsEditModalOpen(true)}
                className="cursor-pointer flex items-center gap-1.5 rounded-xl font-semibold shadow-md px-4 py-2 hover:bg-indigo-700 transition text-xs sm:text-sm"
              >
                <Edit3 size={14} /> Edit Settings
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* METRIC STATISTICS ROW */}
      <Grid columns={{ initial: "1", sm: "3" }} gap="4" className="mb-6 relative z-10">
        <Card className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
          <Box>
            <Text size="1" color="gray" className="block font-semibold uppercase tracking-wider">Active Openings</Text>
            <Heading size="6" className="text-foreground font-black mt-1">{activeJobsCount} Jobs</Heading>
          </Box>
          <div className="p-3 bg-indigo-500/5 text-indigo-500 rounded-2xl group-hover:scale-110 transition duration-300">
            <Briefcase size={20} />
          </div>
        </Card>

        <Card className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
          <Box>
            <Text size="1" color="gray" className="block font-semibold uppercase tracking-wider">Developer Reviews</Text>
            <Heading size="6" className="text-foreground font-black mt-1">{reviewCount} Reviews</Heading>
          </Box>
          <div className="p-3 bg-indigo-500/5 text-indigo-500 rounded-2xl group-hover:scale-110 transition duration-300">
            <Star size={20} className="text-yellow-500" />
          </div>
        </Card>

        <Card className="p-4 border border-card-border/60 bg-card-bg/60 backdrop-blur-md shadow-sm rounded-2xl flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
          <Box>
            <Text size="1" color="gray" className="block font-semibold uppercase tracking-wider">Recruiting Team</Text>
            <Heading size="6" className="text-foreground font-black mt-1">{teamCount} Members</Heading>
          </Box>
          <div className="p-3 bg-indigo-500/5 text-indigo-500 rounded-2xl group-hover:scale-110 transition duration-300">
            <Users size={20} />
          </div>
        </Card>
      </Grid>

      {/* TWO COLUMN CONTENT LAYOUT */}
      <Flex gap="6" className="flex-col lg:flex-row relative z-10 items-start">
        
        {/* LEFT COLUMN: Corporate Info Sidebar */}
        <Box className="w-full lg:w-[320px] space-y-6 shrink-0">
          <Card className="p-6 border border-card-border bg-card-bg/70 backdrop-blur-md shadow-lg rounded-2xl space-y-4">
            <Heading size="3" className="text-foreground flex items-center gap-2 border-b border-card-border/50 pb-2">
              <Building2 size={16} className="text-indigo-500" />
              <span>Workspace Contacts</span>
            </Heading>
            
            <div className="space-y-4">
              <Flex align="center" gap="3">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <Text size="2" className="text-text-muted truncate">{Jobcompany?.location || "Headquarters not set"}</Text>
              </Flex>
              
              <Flex align="center" gap="3">
                <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
                {Jobcompany?.website ? (
                  <a
                    href={Jobcompany.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 text-sm font-semibold hover:underline flex items-center gap-1 overflow-hidden truncate"
                  >
                    <span className="truncate">{Jobcompany.website.replace(/^https?:\/\//, "")}</span>
                    <ExternalLink size={10} className="shrink-0" />
                  </a>
                ) : (
                  <Text size="2" className="text-text-muted">Website not set</Text>
                )}
              </Flex>

              <Flex align="center" gap="3">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <Text size="2" className="text-text-muted truncate">{Jobcompany?.email || "Support email not set"}</Text>
              </Flex>

              <Flex align="center" gap="3">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                <Text size="2" className="text-text-muted truncate">{Jobcompany?.phone || "Support phone not set"}</Text>
              </Flex>
            </div>
          </Card>
        </Box>

        {/* RIGHT COLUMN: Interactive Tabs Container */}
        <Box className="flex-1 space-y-6 w-full">
          <Tabs.Root defaultValue="about">
            <Tabs.List size="2" className="border-b border-card-border/60">
              <Tabs.Trigger value="about" className="cursor-pointer font-bold text-sm">About Profile</Tabs.Trigger>
              <Tabs.Trigger value="jobopening" className="cursor-pointer font-bold text-sm">Active Job Openings</Tabs.Trigger>
              <Tabs.Trigger value="reviews" className="cursor-pointer font-bold text-sm">Developer Reviews</Tabs.Trigger>
              <Tabs.Trigger value="team" className="cursor-pointer font-bold text-sm">Recruiting Team</Tabs.Trigger>
            </Tabs.List>

            <Box className="mt-6 bg-card-bg/50 border border-card-border p-6 rounded-2xl shadow-sm">
              
              {/* Trigger 1: About */}
              <Tabs.Content value="about">
                <AboutCompany company={Jobcompany} isLoading={false} />
              </Tabs.Content>

              {/* Trigger 2: Openings */}
              <Tabs.Content value="jobopening">
                {Jobcompany?.jobs && Jobcompany.jobs.length > 0 ? (
                  <Box className="space-y-4">
                    <Heading size="4" className="text-foreground border-b border-card-border/50 pb-2">
                      Open Recruiting Positions
                    </Heading>
                    <Flex direction="column" gap="4">
                      {Jobcompany.jobs.map((job) => (
                        <CompanyJobCard key={job.id} job={job} />
                      ))}
                    </Flex>
                  </Box>
                ) : (
                  <Box className="text-center py-10 space-y-2 border border-dashed border-card-border/70 rounded-2xl">
                    <Briefcase size={28} className="text-text-muted mx-auto animate-pulse" />
                    <Heading size="3" className="text-foreground">No Jobs Created Yet</Heading>
                    <Text size="2" className="text-text-muted">Create a job post in your recruiter menu to see it displayed here.</Text>
                  </Box>
                )}
              </Tabs.Content>

              {/* Trigger 3: Reviews */}
              <Tabs.Content value="reviews">
                {Jobcompany?.id && (
                  <Compreviews companyId={Jobcompany.id} isloading={false} />
                )}
              </Tabs.Content>

              {/* Trigger 4: Recruiting Team */}
              <Tabs.Content value="team">
                <Box className="space-y-4">
                  <Heading size="4" className="text-foreground border-b border-card-border/50 pb-2">
                    Recruiter Workspace Teammates
                  </Heading>
                  
                  <div className="space-y-4">
                    {/* Primary Administrator Teammate card */}
                    <Card className="p-4 border border-card-border/60 bg-indigo-soft/5 hover:border-indigo-500/20 transition duration-300">
                      <Flex justify="between" align="center">
                        <Flex align="center" gap="3.5">
                          <Avatar
                            size="3"
                            fallback="A"
                            className="bg-indigo-500 text-white font-extrabold rounded-full"
                          />
                          <div>
                            <Text size="2" weight="bold" className="text-foreground block">
                              Primary Corporate Admin
                            </Text>
                            <Text size="1" className="text-text-muted block">
                              ID: {Jobcompany?.ownerId}
                            </Text>
                          </div>
                        </Flex>
                        <Badge color="indigo" variant="solid" className="rounded-full px-3">
                          Workspace Owner
                        </Badge>
                      </Flex>
                    </Card>

                    {/* Associated recruiters */}
                    {Jobcompany?.employers && Jobcompany.employers.length > 0 ? (
                      Jobcompany.employers.map((employer) => (
                        <Card
                          key={employer.id}
                          className="p-4 border border-card-border/60 bg-card-bg/40 hover:border-indigo-500/20 transition duration-300"
                        >
                          <Flex justify="between" align="center">
                            <Flex align="center" gap="3.5">
                              <Avatar
                                size="3"
                                fallback={employer.name[0].toUpperCase()}
                                className="bg-indigo-soft/10 text-indigo-500 font-extrabold rounded-full"
                              />
                              <div>
                                <Text size="2" weight="bold" className="text-foreground block">
                                  {employer.name}
                                </Text>
                                <Text size="1" className="text-text-muted block">
                                  {employer.email}
                                </Text>
                              </div>
                            </Flex>
                            <Badge color="gray" variant="soft" className="rounded-full px-3">
                              Employer Teammate
                            </Badge>
                          </Flex>
                        </Card>
                      ))
                    ) : null}
                  </div>
                </Box>
              </Tabs.Content>

            </Box>
          </Tabs.Root>
        </Box>

      </Flex>

      {/* Edit Company profile settings Modal */}
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

      {/* Invite Teammate / Recruiter Modal */}
      <AddEmployerModal
        isOpen={isAddEmployerOpen}
        setIsOpen={setIsAddEmployerOpen}
        onSuccess={() => setReloadTrigger((prev) => prev + 1)}
      />

    </div>
  );
}
