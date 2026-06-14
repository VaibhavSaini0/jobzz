import Skeleton from "./Skeleton";
import { JobCardSkeletonGrid } from "./JobCardSkeleton";

export default function JobsPageSkeleton() {
  return (
    <div className="max-w-[100vw] min-h-screen py-8 animate-in fade-in duration-300">
      <div className="max-w-7xl m-auto flex flex-col md:flex-row gap-8 px-6">
        <aside className="w-full md:w-64 shrink-0 space-y-4">
          <Skeleton className="h-6 w-24" />
          <div className="p-4 bg-card-bg border border-card-border rounded-2xl space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-9 w-full" rounded="xl" />
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <JobCardSkeletonGrid count={6} />
        </main>
      </div>
    </div>
  );
}
