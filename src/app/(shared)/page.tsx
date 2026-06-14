import type { Metadata } from "next";
import { getFeaturedJobs, getPlatformStats } from "@/lib/data-cache";
import HomePage from "@/components/home/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Checkcookie } from "@/HelperFun/Checkcookie";
import { redirect } from "next/navigation";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Find Tech Jobs & Hire Developers",
  description:
    "Jobzz is a modern job portal for developers, designers, and engineers. Browse remote and on-site tech jobs, build your resume profile, apply with AI cover letters, and hire talent.",
  keywords: [
    "tech jobs",
    "developer jobs",
    "remote jobs",
    "software engineer jobs",
    "hire developers",
    "job portal India",
    "Jobzz",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jobzz — Find Tech Jobs & Hire Developers",
    description:
      "Browse live tech openings, build your profile, and apply with AI-assisted cover letters on Jobzz.",
    url: "/",
    type: "website",
  },
};

export default async function Page() {
  const user = await Checkcookie();
  if (user && user.role === "admin") {
    redirect("/profile");
  }

  const [featuredJobs, stats] = await Promise.all([
    getFeaturedJobs(),
    getPlatformStats(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jobzz.dev";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Jobzz",
          url: siteUrl,
          description:
            "Modern job portal connecting tech professionals with hiring companies.",
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/jobs?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Jobzz",
          url: siteUrl,
          logo: `${siteUrl}/file.svg`,
          sameAs: [],
        }}
      />
      <HomePage
        featuredJobs={featuredJobs}
        stats={{
          jobs: stats.jobs,
          companies: stats.companies,
          users: stats.users,
          applications: stats.applications,
        }}
      />
    </>
  );
}
