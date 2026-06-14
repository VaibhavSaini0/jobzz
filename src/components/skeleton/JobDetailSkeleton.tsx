import Skeleton from "./Skeleton";

export default function JobDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-9 w-[85%] max-w-lg" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" rounded="xl" />
          <Skeleton className="h-10 w-32" rounded="xl" />
        </div>
      </div>

      <Skeleton className="h-20 w-full" rounded="xl" />

      <Skeleton className="h-px w-full" rounded="sm" />

      <div className="p-4 bg-card-bg border border-card-border rounded-2xl">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 shrink-0" rounded="full" />
          <Skeleton className="h-6 w-40" />
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="h-7 w-44" />
        <div className="space-y-2 p-5 border border-card-border/40 rounded-2xl">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[92%]" />
          <Skeleton className="h-3 w-[88%]" />
          <Skeleton className="h-3 w-[95%]" />
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="h-7 w-24" />
        <div className="space-y-2.5 p-5 border border-card-border/40 rounded-2xl">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-52" />
        </div>
      </div>
    </div>
  );
}
