import Skeleton from "./Skeleton";

export default function JobCardSkeleton() {
  return (
    <div className="h-full flex flex-col p-5 bg-card-bg border border-card-border rounded-2xl space-y-4">
      <div className="flex justify-between items-start gap-3">
        <Skeleton className="h-6 w-[70%]" />
        <Skeleton className="h-6 w-[60px] rounded-full" rounded="full" />
      </div>

      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[95%]" />
        <Skeleton className="h-3 w-[98%]" />
        <Skeleton className="h-3 w-[80%]" />
      </div>

      <Skeleton className="h-5 w-[80px] rounded-full" rounded="full" />

      <div className="flex justify-between items-center mt-auto pt-3 border-t border-card-border/30">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 shrink-0" rounded="full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-8 w-[100px]" rounded="xl" />
      </div>
    </div>
  );
}

export function JobCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}
