import type { Metadata } from "next";
import { getCachedJobMetadata } from "@/lib/data-cache";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await getCachedJobMetadata(id);

  if (!job) {
    return { title: "Job Not Found" };
  }

  const description = `${job.title} at ${job.company.name} — ${job.job_type} · ${job.location}. ${job.description.slice(0, 140)}...`;

  return {
    title: `${job.title} at ${job.company.name}`,
    description,
    alternates: { canonical: `/jobs/${id}` },
    openGraph: {
      title: `${job.title} | ${job.company.name}`,
      description,
      type: "article",
      url: `/jobs/${id}`,
    },
  };
}

export default function JobDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
