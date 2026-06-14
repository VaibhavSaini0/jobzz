import { JobCardSkeletonGrid } from "@/components/skeleton";

export default function SearchLoading() {
  return (
    <main className="max-w-7xl m-auto min-h-screen py-5 px-4">
      <JobCardSkeletonGrid count={9} />
    </main>
  );
}
