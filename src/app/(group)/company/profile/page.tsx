"use client";

import {
  Box,
  Flex,
  Heading,
  Separator,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CompanyJobCard from "@/components/cards/CompanyJobCard";
import { job, review, company } from "../../../../../generated/prisma";
import Compreviews from "@/components/Compreviews";
import { UserContext } from "@/context/UserContext";
import Loading from "@/components/lodingstate/Loading";
import AboutCompany from "@/components/AboutCompany";
import { isEmployer } from "@/lib/roles";

type CompanyWithRelations = company & {
  jobs: job[] | null;
  review: review[] | null;
};

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { user, company, isuserLoading } = useContext(UserContext);
  const [Jobcompany, setJobCompany] = useState<CompanyWithRelations | null>(null);
  const [companyJobs, setCompanyJobs] = useState<job[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          if (data.data?.jobs) {
            setCompanyJobs(data.data.jobs);
          }
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
  }, [company?.id]);

  return (
    <div className="max-w-7xl mx-auto w-full">
      <Box p="5" className="min-h-screen">
        <Flex justify="between" align="start">
          <Box mr="5" className="w-full">
            <Box mb="4">
              <Heading size="7">{Jobcompany?.name || "Company Name"}</Heading>
              <Text size="2" color="gray">
                {Jobcompany?.description || "Company description goes here."}
              </Text>
            </Box>

            <Tabs.Root defaultValue="about">
              <Tabs.List size="2" mb="4">
                <Tabs.Trigger value="about">About</Tabs.Trigger>
                <Tabs.Trigger value="jobopening">Job Openings</Tabs.Trigger>
                <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
              </Tabs.List>

              <Box>
                <Tabs.Content value="about">
                  <AboutCompany company={Jobcompany} isLoading={isLoading} />
                </Tabs.Content>

                <Tabs.Content value="jobopening">
                  {!isLoading ? (
                    companyJobs && companyJobs.length > 0 ? (
                      <Box>
                        <Heading size="6" mb="3">
                          Open Positions
                        </Heading>
                        <Separator size="4" mb="4" />
                        <Flex direction="column" gap="4">
                          {companyJobs?.map((job) => (
                            <CompanyJobCard key={job.id} job={job} />
                          ))}
                        </Flex>
                      </Box>
                    ) : (
                      <Box>
                        <Heading size="6" mb="3">
                          No Job Found
                        </Heading>
                      </Box>
                    )
                  ) : (
                    <Loading />
                  )}
                </Tabs.Content>

                <Tabs.Content value="reviews">
                  {Jobcompany?.id && (
                    <Compreviews companyId={Jobcompany.id} isloading={isLoading} />
                  )}
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}
