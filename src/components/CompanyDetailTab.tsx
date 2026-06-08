"use client";

import { UserContext } from '@/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import CompanyJobCard from './cards/CompanyJobCard';
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
            <div className="flex justify-between items-start">
                <div className="pt-[20px] w-full text-left">
                    <h1 className="text-3xl font-extrabold text-foreground">{company?.name}</h1>
                    <p className="text-sm text-text-muted mt-1 leading-relaxed">{company?.description}</p>
                    <h2 className="text-xl font-bold text-foreground mt-[20px]">Job Opening</h2>
                    <hr className="border-card-border my-3 w-full" />
                    <div className="flex flex-col gap-5 mt-4">
                        {companyJobs.map((job, index) => (
                            <CompanyJobCard key={index} job={job}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
