import type { Metadata } from "next";
import prismaclient from "@/services/prisma";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await prismaclient.job.findUnique({
    where: { id },
    include: { company: { select: { name: true } } },
  });

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
