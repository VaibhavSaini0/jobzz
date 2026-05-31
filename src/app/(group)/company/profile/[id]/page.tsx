"use client";

import {
  Box,
  Flex,
  Heading,
  Separator,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { job, user, review, company } from "../../../../../../generated/prisma";
import Compreviews from "@/components/Compreviews";
import UserEndComJob from "@/components/cards/UserEndComJob";
import Loading from "@/components/lodingstate/Loading";
import AboutCompany from "@/components/AboutCompany";

type ReviewWithUser = review & {
  user: user;
};

type CompanyWithRelations = company & {
  jobs: job[] | null;
  review: review[] | null;
};

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const [company, setCompany] = useState<CompanyWithRelations | null>(null);
  const [companyJobs, setCompanyJobs] = useState<job[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCompany() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/company/profile/${id}?public=true`);
        const data = await res.json();

        if (data.success) {
          setCompany(data.data as CompanyWithRelations);
          if (data?.data?.jobs) {
            setCompanyJobs(data.data.jobs);
          }
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchCompany();
  }, [id]);

  if (isLoading) {
    return (
      <Box p="5" className="min-h-screen flex items-center justify-center">
        <Loading />
      </Box>
    );
  }

  if (!company) {
    return (
      <Box p="5" className="min-h-screen flex items-center justify-center">
        <Text size="2" color="gray">
          No company information available.
        </Text>
      </Box>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      <Box p="5" className="min-h-screen">
        <Flex justify="between" align="start">
          <Box mr="5" className="w-full">
            <Box mb="4">
              <Heading size="7">{company?.name || "Company Name"}</Heading>
              <Text size="2" color="gray">
                {company?.description || "Company description goes here."}
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
                  <AboutCompany company={company} isLoading={isLoading} />
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
                            <UserEndComJob key={job.id} job={job} />
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
                  <Compreviews companyId={company?.id} isloading={isLoading} />
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}
