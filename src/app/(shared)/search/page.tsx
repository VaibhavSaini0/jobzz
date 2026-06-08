// app/(group)/search/page.tsx
import { Suspense } from "react";
import Loading from "@/components/lodingstate/Loading";
import SearchPageContent from "@/components/SearchPageContent";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPageContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
