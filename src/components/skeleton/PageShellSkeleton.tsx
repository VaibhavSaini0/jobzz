import Skeleton from "./Skeleton";

export default function PageShellSkeleton() {
  return (
    <div className="min-h-screen animate-in fade-in duration-300">
      <div className="sticky top-0 z-50 border-b border-card-border/50 bg-header-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <div className="hidden md:flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-24" rounded="xl" />
          </div>
          <Skeleton className="h-9 w-9 md:hidden" rounded="xl" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-96 max-w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-32 w-full" rounded="xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
