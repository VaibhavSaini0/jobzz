"use client";
import { UserContext } from '@/context/UserContext';
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import { useContext, useEffect, useState } from 'react';
import CompanyJobCard from './cards/CompanyJobCard';
import Loading from './lodingstate/Loading';
import SectionLoader from './lodingstate/SectionLoader';

export default function CompanyDetailTab() {
    const [companyJobs, setCompanyJobs] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const { company } = useContext(UserContext);

    useEffect(() => {
        async function fetchjobs() {
            try{
                setisLoading(true)
                const res = await fetch('/api/company/jobs');
                const data = await res.json();
                const jobs = data.data?.jobs || [];
                if (jobs) {
                    setCompanyJobs(jobs);
                }
            }
            catch(err){
                console.log(err);
            }
            finally{
                setisLoading(false)
            }

            }
            if (company) {
                fetchjobs();
            }
    }, [company]);
if (isLoading) return <SectionLoader/>;
    return (
        <div>
            <Flex justify="between" align="start">
                <Box pt={"20px"}>
                    <Heading size="7">{company?.name}</Heading>
                    <Text size="2" className="text-muted-foreground">{company?.description}</Text>
                    <Heading size="6" mt={"20px"}>Job Opening</Heading>
                    <Separator my="3" size="4" />
                    <Flex direction={"column"} gap={"5"}>
                        {companyJobs.map((job, index) => (
                            <CompanyJobCard key={index} job={job}/>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </div>
    );
}
