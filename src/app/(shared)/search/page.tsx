// app/(group)/search/page.tsx
import { Suspense } from "react";
import { JobCardSkeletonGrid } from "@/components/skeleton";
import SearchPageContent from "@/components/SearchPageContent";

function SearchLoadingFallback() {
  return (
    <main className="max-w-7xl m-auto min-h-screen py-5 px-4">
      <JobCardSkeletonGrid count={9} />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<SearchLoadingFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
