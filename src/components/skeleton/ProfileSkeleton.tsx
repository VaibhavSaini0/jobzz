import Skeleton from "./Skeleton";

export default function ProfileSkeleton() {
  return (
    <main className="max-w-6xl mx-auto py-10 px-4 min-h-screen animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-72 shrink-0 space-y-4">
          <Skeleton className="w-32 h-32 mx-auto" rounded="full" />
          <Skeleton className="h-6 w-40 mx-auto" />
          <Skeleton className="h-4 w-52 mx-auto" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-10 w-full" rounded="xl" />
            <Skeleton className="h-10 w-full" rounded="xl" />
          </div>
        </div>

        <div className="flex-1 w-full space-y-6">
          <div className="p-6 bg-card-bg border border-card-border rounded-2xl space-y-3">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[75%]" />
          </div>

          <div className="p-6 bg-card-bg border border-card-border rounded-2xl space-y-3">
            <Skeleton className="h-7 w-24" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-8 w-20" rounded="full" />
              ))}
            </div>
          </div>

          <div className="p-6 bg-card-bg border border-card-border rounded-2xl space-y-4">
            <Skeleton className="h-7 w-36" />
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="space-y-2 pb-4 border-b border-card-border/40 last:border-0">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function ProfileBannerSkeleton() {
  return (
    <div
      className="w-full max-w-4xl mx-auto h-[5.5rem] rounded-2xl border border-card-border/50 bg-card-bg/40 p-4 flex items-center gap-3 animate-in fade-in duration-300"
      aria-hidden
    >
      <Skeleton className="w-10 h-10 shrink-0" rounded="xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-3 w-80 max-w-full" />
      </div>
      <Skeleton className="h-11 w-32 shrink-0 hidden sm:block" rounded="xl" />
    </div>
  );
}
