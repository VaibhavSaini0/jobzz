import { BriefcaseIcon, MapPinIcon } from "lucide-react";

export default function UserEndComJob({ job }:{job:any}) {
  console.log("job", job)
  return (
    <div className="w-full bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm hover:border-indigo-500/20 transition-all duration-300">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center w-full">
          <h3 className="text-base sm:text-lg font-bold text-foreground">{job?.title}</h3>
        </div>

        <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-text-muted font-medium">
          <div className="flex items-center gap-1.5">
            <MapPinIcon size={16} className="text-indigo-500" />
            <span>{job?.location}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>₹{" "+job.salary?.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <BriefcaseIcon size={16} className="text-indigo-500" />
            <span>{job?.employment_type}</span>
          </div>

          <div className="flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              {job?.job_type}
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

        <div className="mt-3">
          <a
            href={`/jobs/${job.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-block px-4 py-2 text-xs sm:text-sm bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 rounded-xl font-bold transition active:scale-[0.98]"
          >
            View Job Details
          </a>
        </div>
      </div>
    </div>
  );
}
