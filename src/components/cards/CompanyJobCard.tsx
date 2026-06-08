import { BriefcaseIcon, MapPinIcon } from "lucide-react";
import CompJobCardDropD from "../dropdowns/CompJobCardDropD";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { isEmployer } from "@/lib/roles";
import { useRouter } from "next/navigation";

export default function CompanyJobCard({ job }:{job:any}) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <div className="w-full bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm hover:border-indigo-500/20 transition-all duration-300">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center w-full">
          <h3 className="text-base sm:text-lg font-bold text-foreground">{job.title}</h3>
          <CompJobCardDropD job={job} />
        </div>

        <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-text-muted font-medium">
          <div className="flex items-center gap-1.5">
            <MapPinIcon size={16} className="text-indigo-500" />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>₹{" "+job.salary.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <BriefcaseIcon size={16} className="text-indigo-500" />
            <span>{job.employment_type}</span>
          </div>

          <div className="flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              {job.job_type}
            </span>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-sm text-text-muted leading-relaxed">
            {job.description.length > 150
              ? job.description.slice(0, 150) + "..."
              : job.description}
          </p>
        </div>

        <div className="flex gap-3 mt-3 flex-wrap">
          <a
            href={job.apply_through}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer px-4 py-2 text-xs sm:text-sm bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 rounded-xl font-bold transition active:scale-[0.98]"
          >
            View Application Page
          </a>
          {user && isEmployer(user.role) && (
            <button
              onClick={() => router.push(`/company/applications/${job.id}`)}
              className="cursor-pointer px-4 py-2 text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition active:scale-[0.98]"
            >
              View Applicants
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
